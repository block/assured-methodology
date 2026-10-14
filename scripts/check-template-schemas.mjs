#!/usr/bin/env node
/**
 * Keeps the record templates in public/templates and their JSON Schemas in
 * public/templates/schema in step, and keeps both in step with the method's
 * vocabulary in src/data/priority-matrix.ts.
 *
 *   node scripts/check-template-schemas.mjs     (pnpm check:templates)
 *
 * Each schema (draft 2020-12) describes a filled-in record and names the
 * template it describes in "x-assured-template". Its nodes carry the
 * template's own wording, so the two can be compared mechanically:
 *
 *   x-assured-section       a ## or ### heading, exactly as written
 *   x-assured-prompt        a field: the bullet's label up to the first
 *                           " (", ":", "? " or ". "
 *   x-assured-checkbox      a "- [ ]" item, whitespace-normalized
 *   x-assured-columns       a table's header row, cell by cell
 *   x-assured-list          an open list slot: "bulleted" (a bare "-") or
 *                           "numbered" (bare "1.", "2.", ...)
 *   x-assured-instructions  bullets in a section that instruct rather than
 *                           ask (listed by prompt so they are accounted for)
 *   x-assured-phase         "risk" or "escalation": who owns the section
 *   x-assured-e-rule        the section must state the E rule verbatim
 *   x-assured-clocks        clockDefaults keys whose value must appear in
 *                           the section text, e.g. "4 hours"
 *
 * Checks:
 *   1. Every heading, field, checkbox, table and list slot in the template
 *      has a schema node, and every schema node is still in the template.
 *   2. A field or section the template marks "(optional" is not required.
 *   3. Vocabulary: assured-vocabulary.schema.json's enums equal the arrays
 *      in priority-matrix.ts (verdict axes, status, decision, bands,
 *      ratings, confidence, depth, moves).
 *   4. Exact strings: wherever a field uses a vocabulary enum, every value
 *      (or the def's x-assured-forms) appears in that section of the
 *      template, so the template offers the reader the exact enum strings.
 *   5. Decision ownership: a recommended move is only recorded in a Risk
 *      section; the close-or-escalate decision and its basis only in an
 *      Escalation-decision section. Risk recommends; E decides.
 *   6. Clocks: sections marked x-assured-e-rule state the E rule verbatim;
 *      x-assured-clocks values appear; any "Band" clock table matches the
 *      band clocks (acknowledge wording, and the numbers in each decision).
 *
 * Learner packets (exercise-*.md, facilitator-kit/) are not records and
 * have no schema.
 *
 * Exit codes: 0 in sync, 1 drift found.
 */

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = new URL("..", import.meta.url).pathname;
const TEMPLATES = join(ROOT, "public/templates");
const SCHEMAS = join(TEMPLATES, "schema");
const VOCAB_FILE = "assured-vocabulary.schema.json";

// ------------------------------------------------------------- template parser

const norm = (s) => s.replace(/\s+/g, " ").trim();
const normText = (s) => norm(s).toLowerCase();

/** The prompt key of a field label: up to the first " (", ":", "? " or ". ". */
export function promptOf(label) {
  const text = norm(label);
  let end = text.length;
  for (const [needle, keep] of [
    [" (", 0],
    [":", 0],
    ["? ", 1],
    [". ", 0],
  ]) {
    const i = text.indexOf(needle);
    if (i >= 0 && i + keep < end) end = i + keep;
  }
  if (text.endsWith("?") && end === text.length) return text;
  return text.slice(0, end).trim();
}

/**
 * Parse a Markdown record template into its title and a tree of sections.
 * Each section: { heading, level, optional, text, fields, checkboxes,
 * tables, lists, subsections }. `text` is the section's own text, comments
 * included, without its subsections.
 */
export function parseTemplate(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const doc = { title: "", sections: [] };
  // Bullets between the title and the first ## heading form a preamble
  // section with an empty heading (x-assured-section: "").
  let section = null;
  let preamble = null;
  let parent = null;
  let inComment = false;
  let bullet = null;
  let table = null;

  const target = () => section;
  const closeBullet = () => {
    if (!bullet) return;
    const s = target();
    const text = norm(bullet.lines.join(" "));
    if (/^\[ \] /.test(text)) s.checkboxes.push({ text: norm(text.slice(4)), depth: bullet.depth });
    else if (text === "") s.lists.add("bulleted");
    else s.fields.push({ label: text, prompt: promptOf(text), optional: /\(optional/i.test(text), depth: bullet.depth });
    bullet = null;
  };
  const closeTable = () => {
    if (!table) return;
    target().tables.push(table);
    table = null;
  };
  const newSection = (heading, level) => ({
    heading,
    level,
    optional: /\(optional/i.test(heading),
    text: "",
    fields: [],
    checkboxes: [],
    tables: [],
    lists: new Set(),
    subsections: [],
  });

  for (const raw of lines) {
    const line = raw.replace(/\s+$/, "");
    // Comments: kept in the section text, never parsed as items.
    if (inComment || line.trimStart().startsWith("<!--")) {
      if (section) section.text += ` ${line}`;
      inComment = !line.includes("-->");
      continue;
    }
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      closeBullet();
      closeTable();
      const level = h[1].length;
      if (level === 1) {
        doc.title = norm(h[2]);
        preamble = newSection("", 2);
        section = preamble;
        continue;
      }
      const s = newSection(norm(h[2]), level);
      if (level === 2) {
        doc.sections.push(s);
        parent = s;
      } else if (parent) {
        parent.subsections.push(s);
      } else {
        doc.sections.push(s);
      }
      section = s;
      continue;
    }
    if (!section) continue;
    section.text += ` ${line}`;

    if (line.startsWith("|")) {
      closeBullet();
      const cells = line
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((c) => norm(c));
      if (!table) table = { columns: cells, rows: [] };
      else if (!cells.every((c) => /^:?-{3,}:?$/.test(c))) table.rows.push(cells);
      continue;
    }
    closeTable();

    const b = line.match(/^(\s*)-(?:\s+(.*))?$/);
    if (b) {
      closeBullet();
      bullet = { depth: b[1].length, lines: [b[2] ?? ""] };
      continue;
    }
    if (/^\s*\d+\.\s*$/.test(line)) {
      closeBullet();
      section.lists.add("numbered");
      continue;
    }
    const n = line.match(/^(\s*)\d+\.\s+(.*)$/);
    if (n) {
      closeBullet();
      bullet = { depth: n[1].length, lines: [n[2]] };
      continue;
    }
    if (line.trim() === "") {
      closeBullet();
      continue;
    }
    if (bullet && /^\s+\S/.test(line)) {
      bullet.lines.push(line.trim());
      continue;
    }
    closeBullet();
  }
  closeBullet();
  closeTable();
  if (preamble && (preamble.fields.length || preamble.checkboxes.length || preamble.tables.length || preamble.lists.size)) {
    doc.sections.unshift(preamble);
  }
  return doc;
}

// ------------------------------------------------------------- schema walking

/** The object schema whose properties hold a node's children (arrays: their items). */
const bodyOf = (node) => (node.type === "array" && node.items && !node["x-assured-columns"] ? node.items : node);

/**
 * The annotated nodes inside a section node: sub-sections, fields,
 * checkboxes, tables and lists, each with whether its containing object
 * requires it. Fields may nest (an "Artifact" item holding its "Custody"
 * line), so the walk descends through every node except sub-sections.
 */
function itemsOf(sectionNode) {
  const out = [];
  const visit = (container) => {
    const body = bodyOf(container);
    for (const [key, child] of Object.entries(body.properties ?? {})) {
      const required = (body.required ?? []).includes(key);
      out.push({ key, node: child, required });
      if (child["x-assured-section"] === undefined && child["x-assured-columns"] === undefined) visit(child);
    }
  };
  visit(sectionNode);
  return out;
}

/** Every vocabulary $ref under a node (fields can be objects with parts). */
function refsUnder(node, acc = []) {
  if (!node || typeof node !== "object") return acc;
  if (typeof node.$ref === "string" && node.$ref.startsWith(`${VOCAB_FILE}#/$defs/`)) acc.push(node.$ref.split("/").pop());
  for (const v of Object.values(node)) if (v && typeof v === "object") refsUnder(v, acc);
  return acc;
}

/** String enum values written inline (not through a vocabulary $ref) under a node. */
function inlineEnums(node, acc = []) {
  if (!node || typeof node !== "object") return acc;
  if (Array.isArray(node.enum) && !node.$ref) for (const v of node.enum) if (typeof v === "string") acc.push(v);
  for (const [k, v] of Object.entries(node)) if (k !== "enum" && v && typeof v === "object") inlineEnums(v, acc);
  return acc;
}

/** True when `target` sits inside a sub-section of `sectionNode` (it is checked there). */
function isUnderSubsection(sectionNode, target) {
  let found = false;
  const visit = (container, inSub) => {
    const body = bodyOf(container);
    for (const child of Object.values(body.properties ?? {})) {
      const sub = inSub || child["x-assured-section"] !== undefined;
      if (child === target) found = found || inSub;
      if (child["x-assured-columns"] === undefined) visit(child, sub);
    }
  };
  visit(sectionNode, false);
  return found;
}

// ------------------------------------------------------------- main

async function main() {
  const problems = [];
  const fail = (where, msg) => problems.push(`${where}: ${msg}`);

  // priority-matrix.ts is imported directly (Node 24 strips erasable types).
  const emitWarning = process.emitWarning;
  process.emitWarning = (warning, ...rest) => {
    const text = typeof warning === "string" ? warning : (warning?.message ?? "");
    if (/MODULE_TYPELESS_PACKAGE_JSON|Reparsing as ES module|is not specified/.test(text)) return;
    return emitWarning.call(process, warning, ...rest);
  };
  const pm = await import(new URL("../src/data/priority-matrix.ts", import.meta.url).href);
  process.emitWarning = emitWarning;

  // 3. Vocabulary against priority-matrix.ts.
  const vocab = JSON.parse(readFileSync(join(SCHEMAS, VOCAB_FILE), "utf8"));
  const defs = vocab.$defs ?? {};
  const expectEnum = {
    detectionVerdict: [...pm.DETECTION_VERDICTS],
    activityVerdict: [...pm.ACTIVITY_VERDICTS],
    caseStatus: [...pm.CASE_STATUSES],
    escalationDecision: [...pm.ESCALATION_DECISIONS],
    priorityBand: [...pm.BANDS],
    rating: [...pm.RATINGS],
    confidence: [...pm.CONFIDENCE_LEVELS],
    depthLevel: [...pm.DEPTH_LEVELS],
    recommendedMove: [...new Set(pm.bandClocks.map((b) => b.move))].sort(),
  };
  for (const [name, values] of Object.entries(expectEnum)) {
    const got = defs[name]?.enum;
    const a = name === "recommendedMove" ? [...(got ?? [])].sort() : got;
    if (JSON.stringify(a) !== JSON.stringify(values)) {
      fail(VOCAB_FILE, `$defs.${name}.enum is ${JSON.stringify(got)}; priority-matrix.ts says ${JSON.stringify(values)}`);
    }
  }
  const cellPattern = `^(${pm.RATINGS.join("|")})/(${pm.RATINGS.join("|")})$`;
  if (defs.matrixCell?.pattern !== cellPattern) fail(VOCAB_FILE, `$defs.matrixCell.pattern should be ${cellPattern}`);
  // A def's forms, plus the forms of the defs it references (depth -> depthLevel).
  const formsOf = (name, seen = new Set()) => {
    if (seen.has(name)) return [];
    seen.add(name);
    const def = defs[name] ?? {};
    const own = (def["x-assured-forms"] ?? def.enum ?? []).map(String);
    const inner = [];
    JSON.stringify(def, (k, v) => {
      if (k === "$ref" && typeof v === "string" && v.startsWith("#/$defs/")) inner.push(v.split("/").pop());
      return v;
    });
    return [...own, ...inner.flatMap((n) => formsOf(n, seen))];
  };

  const eRule = normText(pm.E_RULE);
  const clocks = pm.clockDefaults;
  const schemaFiles = readdirSync(SCHEMAS).filter((f) => f.endsWith(".schema.json") && f !== VOCAB_FILE).sort();
  const templateFiles = readdirSync(TEMPLATES).filter((f) => f.endsWith(".md") && !f.startsWith("exercise-")).sort();
  const covered = new Set();

  for (const file of schemaFiles) {
    const schema = JSON.parse(readFileSync(join(SCHEMAS, file), "utf8"));
    const tplName = schema["x-assured-template"];
    if (!tplName) {
      fail(file, 'missing "x-assured-template"');
      continue;
    }
    covered.add(tplName);
    let md;
    try {
      md = readFileSync(join(TEMPLATES, tplName), "utf8");
    } catch {
      fail(file, `template ${tplName} not found`);
      continue;
    }
    if (schema.$schema !== "https://json-schema.org/draft/2020-12/schema") fail(file, "$schema must be draft 2020-12");
    const doc = parseTemplate(md);
    const fullText = normText(md);
    if (schema.title !== doc.title) fail(file, `title "${schema.title}" does not match the template's "# ${doc.title}"`);

    // 1, 2, 4, 5, 6 per section.
    const walk = (tplSections, node, where, parentText, phase) => {
      const kids = itemsOf(node);
      const sectionKids = kids.filter((k) => k.node["x-assured-section"] !== undefined);
      const byHeading = new Map(sectionKids.map((k) => [k.node["x-assured-section"], k]));
      for (const s of tplSections) {
        const k = byHeading.get(s.heading);
        if (!k) {
          fail(`${tplName} ${where}`, `section "${s.heading}" has no schema node`);
          continue;
        }
        byHeading.delete(s.heading);
        if (s.optional && k.required) fail(`${tplName} ${where}`, `section "${s.heading}" is optional in the template but required in the schema`);
        checkSection(s, k.node, `${where} > ${s.heading}`, parentText, phase);
      }
      for (const heading of byHeading.keys()) fail(`${tplName} ${where}`, `schema section "${heading}" is not in the template`);
    };

    const checkSection = (s, node, where, parentText, inheritedPhase) => {
      const text = normText(`${parentText} ${s.text}`);
      const phase = node["x-assured-phase"] ?? inheritedPhase;
      const kids = itemsOf(node).filter((k) => !isUnderSubsection(node, k.node));
      const isFreeText = node.type === "string";
      const hasItems = s.fields.length || s.checkboxes.length || s.tables.length || s.lists.size || s.subsections.length;
      if (isFreeText) {
        if (hasItems) fail(`${tplName} ${where}`, "schema says free text, but the template section has fields, tables or lists");
      } else if (!hasItems && kids.length === 0) {
        fail(`${tplName} ${where}`, 'template section is free text; give it "type": "string"');
      }

      // Fields.
      const instructions = new Set(node["x-assured-instructions"] ?? []);
      const fieldKids = new Map(kids.filter((k) => k.node["x-assured-prompt"] !== undefined).map((k) => [k.node["x-assured-prompt"], k]));
      for (const f of s.fields) {
        if (instructions.has(f.prompt)) {
          instructions.delete(f.prompt);
          continue;
        }
        const k = fieldKids.get(f.prompt);
        if (!k) {
          fail(`${tplName} ${where}`, `field "${f.prompt}" has no schema property (x-assured-prompt)`);
          continue;
        }
        fieldKids.delete(f.prompt);
        if (f.optional && k.required) fail(`${tplName} ${where}`, `field "${f.prompt}" is optional in the template but required in the schema`);
        // 4. Exact strings for vocabulary fields and inline enums.
        for (const ref of refsUnder(k.node)) {
          for (const form of formsOf(ref)) {
            if (!fullText.includes(normText(form))) fail(`${tplName} ${where}`, `field "${f.prompt}" uses ${ref}, but the template never offers "${form}"`);
          }
          checkPhase(ref, phase, `${where} > ${f.prompt}`);
        }
        for (const value of inlineEnums(k.node)) {
          if (!fullText.includes(normText(value))) fail(`${tplName} ${where}`, `field "${f.prompt}" allows "${value}", which the template never offers`);
        }
      }
      for (const p of fieldKids.keys()) fail(`${tplName} ${where}`, `schema field "${p}" is not in the template`);
      for (const p of instructions) fail(`${tplName} ${where}`, `schema instruction "${p}" is not in the template`);

      // Checkboxes.
      const boxKids = new Map(kids.filter((k) => k.node["x-assured-checkbox"] !== undefined).map((k) => [norm(k.node["x-assured-checkbox"]), k]));
      for (const c of s.checkboxes) {
        const k = boxKids.get(c.text);
        if (!k) {
          fail(`${tplName} ${where}`, `checkbox "${c.text.slice(0, 60)}..." has no schema property (x-assured-checkbox)`);
          continue;
        }
        boxKids.delete(c.text);
        for (const ref of refsUnder(k.node)) {
          for (const form of formsOf(ref)) {
            if (!fullText.includes(normText(form))) fail(`${tplName} ${where}`, `checkbox uses ${ref}, but the template never offers "${form}"`);
          }
        }
      }
      for (const t of boxKids.keys()) fail(`${tplName} ${where}`, `schema checkbox "${t.slice(0, 60)}..." is not in the template`);

      // Tables.
      const tableKids = new Map(kids.filter((k) => k.node["x-assured-columns"]).map((k) => [JSON.stringify(k.node["x-assured-columns"]), k]));
      for (const t of s.tables) {
        const key = JSON.stringify(t.columns);
        const k = tableKids.get(key);
        if (!k) {
          fail(`${tplName} ${where}`, `table [${t.columns.join(" | ")}] has no schema property (x-assured-columns)`);
          continue;
        }
        tableKids.delete(key);
        const cols = k.node.items?.properties ?? {};
        const named = Object.values(cols).map((c) => c["x-assured-column"]);
        if (JSON.stringify(named) !== key) fail(`${tplName} ${where}`, `table item properties' x-assured-column ${JSON.stringify(named)} do not match ${key}`);
        for (const ref of refsUnder(k.node)) {
          for (const form of formsOf(ref)) {
            if (!fullText.includes(normText(form))) fail(`${tplName} ${where}`, `table uses ${ref}, but the template never offers "${form}"`);
          }
          checkPhase(ref, phase, `${where} table`);
        }
        for (const value of inlineEnums(k.node)) {
          if (!fullText.includes(normText(value))) fail(`${tplName} ${where}`, `table allows "${value}", which the template never offers`);
        }
        if (t.columns[0] === "Band") checkClockTable(t, where);
      }
      for (const c of tableKids.keys()) fail(`${tplName} ${where}`, `schema table ${c} is not in the template`);

      // Lists.
      const listKids = new Set(kids.filter((k) => k.node["x-assured-list"]).map((k) => k.node["x-assured-list"]));
      for (const l of s.lists) if (!listKids.has(l)) fail(`${tplName} ${where}`, `${l} list slot has no schema property (x-assured-list)`);
      for (const l of listKids) if (!s.lists.has(l)) fail(`${tplName} ${where}`, `schema ${l} list is not in the template`);

      // 6. E rule and clocks.
      if (node["x-assured-e-rule"] && !text.includes(eRule)) fail(`${tplName} ${where}`, "section must state the E rule verbatim (priority-matrix.ts E_RULE)");
      for (const c of node["x-assured-clocks"] ?? []) {
        if (!(c.key in clocks)) fail(`${tplName} ${where}`, `unknown clock "${c.key}"`);
        else if (!text.includes(`${clocks[c.key]} ${c.unit}`)) fail(`${tplName} ${where}`, `expected "${clocks[c.key]} ${c.unit}" (clockDefaults.${c.key})`);
      }

      walk(s.subsections, node, where, `${parentText} ${s.text}`, phase);
    };

    const checkPhase = (ref, phase, where) => {
      if (ref === "recommendedMove" && phase !== "risk") fail(`${tplName} ${where}`, "a recommended move is recorded in a Risk section (Risk recommends)");
      if ((ref === "escalationDecision" || ref === "escalationBasis") && phase !== "escalation") {
        fail(`${tplName} ${where}`, "the close-or-escalate decision is recorded in an Escalation-decision section (E decides)");
      }
    };

    const checkClockTable = (t, where) => {
      const need = {
        P1: { ack: `${clocks.p1NoAckFallbackMinutes} minutes`, decision: "immediately" },
        P2: { ack: `${clocks.p2AcknowledgeMinutes} minutes`, decision: `${clocks.p2DecisionHours} hours` },
        P3: { ack: "queue", decision: `${clocks.p3RescoreHours} hours` },
        P4: { ack: "queue sla", decision: "queue sla" },
      };
      const bands = t.rows.map((r) => r[0]);
      if (JSON.stringify(bands) !== JSON.stringify([...pm.BANDS])) fail(`${tplName} ${where}`, `clock table rows ${JSON.stringify(bands)} should be ${JSON.stringify(pm.BANDS)}`);
      for (const r of t.rows) {
        const clock = pm.bandClocks.find((b) => b.band === r[0]);
        if (!clock) continue;
        if (r[1] !== clock.acknowledge && r[1] !== clock.acknowledgeFull) fail(`${tplName} ${where}`, `${r[0]} acknowledge "${r[1]}" should read "${clock.acknowledgeFull}"`);
        if (!normText(r[1]).includes(need[r[0]].ack)) fail(`${tplName} ${where}`, `${r[0]} acknowledge should include "${need[r[0]].ack}"`);
        if (!normText(r[2] ?? "").includes(need[r[0]].decision)) fail(`${tplName} ${where}`, `${r[0]} decision should include "${need[r[0]].decision}"`);
      }
    };

    walk(doc.sections, schema, "", "", undefined);
  }

  for (const t of templateFiles) if (!covered.has(t)) fail("public/templates", `${t} is a record template with no schema in public/templates/schema`);

  if (problems.length) {
    for (const p of problems) console.error(`check-template-schemas: ${p}`);
    console.error(`check-template-schemas: ${problems.length} problem(s)`);
    process.exit(1);
  }
  console.log(`check-template-schemas: OK (${schemaFiles.length} schemas, vocabulary in step with priority-matrix.ts)`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) await main();

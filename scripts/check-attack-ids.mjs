#!/usr/bin/env node
/**
 * Validate every MITRE ATT&CK identifier on the site against a pinned
 * Enterprise ATT&CK STIX bundle (enterprise-attack.json).
 *
 * For each technique ID (T1234, T1234.001), tactic ID (TA0001) and
 * attack.mitre.org technique or tactic URL under src/content/docs and
 * public/templates, the gate fails when:
 *
 *   - the ID does not exist in the bundle;
 *   - the ID is revoked or deprecated in the bundle, unless the sentence
 *     around it is plainly historical ("formerly", "replaced", "split",
 *     "revoked", "deprecated", "renamed", "stale", "old", "previously");
 *   - a name written next to the ID does not match the bundle. Adjacent
 *     names are read from four shapes the site uses:
 *       T1528 (Steal Application Access Token)     ID, then name in parens
 *       T1136.003, Create Account: Cloud Account   ID, comma or colon, name
 *       Data Encrypted for Impact (T1486)          name, then ID in parens
 *       | Brute Force: Password Spraying | T1110.003 |   table cells
 *     plus "T1685 Disable or Modify Tools" (ID, space, Title Case name).
 *     Only Title Case runs count as a name claim, so prose such as "T1218
 *     on a test host" is not read as a name. A sub-technique name matches
 *     as "Parent: Sub" or as "Sub" alone.
 *
 * The bundle is not vendored and not downloaded by this script. Point
 * ATTACK_STIX_PATH at a local copy (see docs/DEVELOPMENT.md). Without it
 * the script prints SKIP and exits 0, so local builds work offline.
 *
 * Environment:
 *   ATTACK_STIX_PATH     path to enterprise-attack.json (required to run)
 *   ATTACK_VERSION       expected ATT&CK major or major.minor (default "19")
 *   ATTACK_STIX_SHA256   optional; fail if the bundle's SHA-256 differs
 *
 * Usage: node scripts/check-attack-ids.mjs [--list]
 *   --list  print every ID and the adjacent name the parser found, then
 *           exit 0 (works without a bundle; use it to review the parser)
 * Exit codes: 0 pass or SKIP, 1 violations, 2 bundle unreadable or wrong
 * version.
 */

import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { pathToFileURL } from "node:url";
import { walk } from "./lib/jsx-tags.mjs";

const ROOT = new URL("..", import.meta.url).pathname;

/**
 * Deliberate mismatches: places where the page shows a wrong or stale label
 * on purpose, for the reader to catch. Keyed by file suffix, ID and the
 * name as written.
 */
export const INTENTIONAL = [
  // The AI verification exercise plants a pre-v19 tactic label as a defect.
  {
    file: "src/content/docs/ai-triage.mdx",
    id: "TA0005",
    name: "Defense Evasion",
  },
  // The downloadable packet for the same exercise carries the same defect.
  {
    file: "public/templates/exercise-ai-draft-verification.md",
    id: "TA0005",
    name: "Defense Evasion",
  },
];

const HISTORICAL_RE =
  /\b(former(ly)?|replac(ed|es)|revoked|deprecated|renamed|split|stale|old(er)?|previously|retired|pre-v\d+|before v\d+|until v\d+|crosswalk)\b/i;

const ID_RE = /\b(T1\d{3}(?:\.\d{3})?|TA\d{4})\b/g;
const URL_RE =
  /attack\.mitre\.org\/(techniques|tactics)\/(T1\d{3}|TA\d{4})(?:\/(\d{3}))?/g;
const SMALL_WORDS = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "by",
  "for",
  "from",
  "in",
  "of",
  "on",
  "or",
  "the",
  "to",
  "via",
  "with",
]);

/** Decode the few entities the content uses and strip inline tags. */
function plain(s) {
  return s
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#42;/g, "*")
    .replace(/&#126;/g, "~")
    .replace(/&nbsp;/g, " ")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function normName(s) {
  return plain(s)
    .toLowerCase()
    .replace(/[‘’“”"']/g, "")
    .replace(/\s*:\s*/g, ": ")
    .replace(/[\s.]+$/, "")
    .trim();
}

/** True when a run of words reads as a proper name (Title Case). */
export function looksLikeName(s) {
  const words = plain(s).split(/\s+/).filter(Boolean);
  if (!words.length || words.length > 9) return false;
  // Starts with a capitalized word of two or more letters: rules out
  // timestamps ("08:41 (T1059.001)") and bare acronyms such as "ID".
  if (
    !/^[A-Z][A-Za-z-]+/.test(words[0]) ||
    (/^[A-Z]{1,3}$/.test(words[0]) && words.length === 1)
  )
    return false;
  if (/ATT&/.test(s)) return false;
  return words.every((w) => SMALL_WORDS.has(w) || /^[A-Z0-9("]/.test(w));
}

/**
 * Trim a raw claim to the name itself: cut at the next ID ("PowerShell,
 * with T1027.010 ..."), at "in ATT&CK", and drop trailing small words left
 * by a line break or a following clause ("SAML Tokens for the").
 */
export function cleanClaim(text) {
  let t = plain(text)
    .replace(
      /,?\s*(?:\b(?:with|and|or|plus)\s+)?\b(?:T1\d{3}|TA\d{4})\b.*$/,
      "",
    )
    .replace(/\s+in ATT\b.*$/, "")
    .trim();
  for (;;) {
    const words = t.split(" ");
    if (words.length > 1 && SMALL_WORDS.has(words[words.length - 1]))
      t = words.slice(0, -1).join(" ");
    else break;
  }
  return t.replace(/[,:;]\s*$/, "").trim();
}

/** Labels that name an ATT&CK domain, not a technique: "T1660 (Mobile)". */
export const DOMAIN_LABELS = new Set(["Mobile", "ICS", "Enterprise"]);

/** Strings around an ID occurrence that may be a name claim. */
export function adjacentNames(line, index, id, nextLine = "") {
  const out = [];
  // A name may wrap onto the next source line; read through to it.
  const after = `${line.slice(index + id.length)} ${nextLine.trim()}`.trimEnd();
  const before = line.slice(0, index);

  // ID (Name)
  let m = /^\s*\(([^)]{3,90})\)/.exec(after);
  if (m) out.push({ shape: "id (name)", text: m[1] });
  // ID, Name  /  ID: Name   (stop at the closing paren, period, semicolon, pipe or tag)
  m = /^\s*[,:]\s+([A-Z][^.;|()<\n]{2,90}?)(?=\s*(?:[).;|<]|,\s|$))/.exec(
    after,
  );
  if (m) out.push({ shape: "id, name", text: m[1] });
  // ID Name (space, Title Case run)
  m =
    /^ ([A-Z][A-Za-z0-9-]*(?: (?:[A-Z][A-Za-z0-9-]*|or|and|of|for|the|to|via|from|with|in|on|a|an|as|by))*(?:: [A-Z][A-Za-z0-9 -]*)?)/.exec(
      after,
    );
  if (m && !out.length)
    out.push({
      shape: "id name",
      text: m[1].replace(
        / (?:or|and|of|for|the|to|via|from|with|in|on|a|an|as|by)$/,
        "",
      ),
    });
  // Name (ID) / Name (ATT&CK ID)
  m = /([^(),;:.|>]{3,90}?)\s*\((?:ATT&(?:amp;)?CK\s+)?$/.exec(before);
  if (m && /^\s*\)/.test(after))
    out.push({ shape: "name (id)", text: m[1].trim() });
  // Table: | Name | ID |
  if (/\|\s*$/.test(before) && /^\s*(?:,|\|)/.test(after)) {
    const cells = before.split("|").map((c) => c.trim());
    const prev = cells[cells.length - 2];
    if (prev) out.push({ shape: "table", text: prev });
  }
  return out
    .map((c) => ({ ...c, text: cleanClaim(c.text) }))
    .filter(
      (c) => c.text && (DOMAIN_LABELS.has(c.text) || looksLikeName(c.text)),
    );
}

/**
 * The text around an occurrence, for the historical-context test. A window,
 * not the whole line: glossary articles are single long lines of HTML.
 */
function around(line, index, span = 160) {
  return line.slice(Math.max(0, index - span), index + span);
}

/** Every ID occurrence in a text: [{ line, id, names, context }]. */
export function extract(text) {
  const masked = text.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, (m) =>
    m.replace(/[^\n]/g, " "),
  );
  const out = [];
  const lines = masked.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const m of line.matchAll(URL_RE)) {
      const id = m[3] ? `${m[2]}.${m[3]}` : m[2];
      out.push({
        line: i + 1,
        id,
        names: [],
        context: around(line, m.index),
        via: "url",
      });
    }
    // Text IDs: skip the ones that are only path segments of a URL.
    for (const m of line.matchAll(ID_RE)) {
      if (line[m.index - 1] === "/") continue;
      const id = m[1];
      out.push({
        line: i + 1,
        id,
        names: adjacentNames(line, m.index, id, lines[i + 1] ?? ""),
        context: around(line, m.index),
        via: "text",
      });
    }
    // A link to a technique page shares the domain label written beside it:
    // <a href=".../T1660/">ATT&CK T1660 (Mobile)</a>.
    const here = out.filter((o) => o.line === i + 1);
    for (const u of here.filter((o) => o.via === "url")) {
      const label = here.find(
        (o) =>
          o.via === "text" &&
          o.id === u.id &&
          o.names.some((c) => DOMAIN_LABELS.has(c.text)),
      );
      if (label)
        u.names = label.names.filter((c) => DOMAIN_LABELS.has(c.text));
    }
  }
  return out;
}

/** Build { id -> { name, fullName, revoked, deprecated, kind } } from a STIX bundle. */
export function indexBundle(bundle) {
  const objects = bundle.objects ?? [];
  const byId = new Map();
  let version = null;
  for (const o of objects) {
    if (o.type === "x-mitre-collection" && o.x_mitre_version)
      version = o.x_mitre_version;
    if (o.type !== "attack-pattern" && o.type !== "x-mitre-tactic") continue;
    const ref = (o.external_references ?? []).find(
      (r) => r.source_name === "mitre-attack" && r.external_id,
    );
    if (!ref) continue;
    const entry = {
      id: ref.external_id,
      name: o.name,
      kind: o.type === "x-mitre-tactic" ? "tactic" : "technique",
      revoked: o.revoked === true,
      deprecated: o.x_mitre_deprecated === true,
    };
    const prior = byId.get(entry.id);
    // Prefer the live object when a revoked copy shares the ID.
    if (
      !prior ||
      ((prior.revoked || prior.deprecated) &&
        !(entry.revoked || entry.deprecated))
    ) {
      byId.set(entry.id, entry);
    }
  }
  for (const e of byId.values()) {
    if (e.kind === "technique" && e.id.includes(".")) {
      const parent = byId.get(e.id.split(".")[0]);
      e.fullName = parent ? `${parent.name}: ${e.name}` : e.name;
    } else e.fullName = e.name;
  }
  return { byId, version };
}

/** Accepted spellings of an entry's name, normalized. */
function acceptedNames(entry) {
  return [entry.fullName, entry.name].map(normName);
}

/** Does the claimed text name this entry? Prefix match tolerates trailing words. */
export function nameMatches(entry, text, shape) {
  const claim = normName(text);
  const names = acceptedNames(entry);
  if (shape === "name (id)")
    return names.some((n) => claim === n || claim.endsWith(` ${n}`));
  if (names.some((n) => claim === n || claim.startsWith(`${n} `))) return true;
  // Sub-technique shorthand under its parent: "T1566.001 (Attachment)" for
  // Spearphishing Attachment.
  return entry.id.includes(".") && normName(entry.name).endsWith(` ${claim}`);
}

/** Check extracted occurrences against an index; returns { errors, notes }. */
export function check(occurrences, index) {
  const errors = [];
  const notes = [];
  for (const o of occurrences) {
    const where = `${o.file}:${o.line}`;
    const entry = index.byId.get(o.id);
    const historical = HISTORICAL_RE.test(o.context);
    const domain = o.names.find((c) => DOMAIN_LABELS.has(c.text))?.text;
    if (domain && domain !== "Enterprise") {
      notes.push(
        `${where}: ${o.id} is labelled ${domain} ATT&CK; not checked against the Enterprise bundle`,
      );
      continue;
    }
    if (!entry) {
      errors.push(`${where}: ${o.id} does not exist in the pinned bundle`);
      continue;
    }
    if (entry.revoked || entry.deprecated) {
      const state = entry.revoked ? "revoked" : "deprecated";
      if (historical)
        notes.push(
          `${where}: ${o.id} is ${state}; allowed (historical context)`,
        );
      else
        errors.push(
          `${where}: ${o.id} (${entry.name}) is ${state} in the pinned bundle`,
        );
      continue;
    }
    for (const c of o.names) {
      if (DOMAIN_LABELS.has(c.text)) continue;
      if (nameMatches(entry, c.text, c.shape)) continue;
      const intentional = INTENTIONAL.some(
        (x) =>
          o.file.endsWith(x.file) &&
          x.id === o.id &&
          normName(c.text).includes(normName(x.name)),
      );
      if (intentional) {
        notes.push(
          `${where}: ${o.id} "${plain(c.text)}" is a deliberate mismatch (INTENTIONAL list)`,
        );
      } else if (historical) {
        notes.push(
          `${where}: ${o.id} "${plain(c.text)}" differs from "${entry.fullName}"; allowed (historical context)`,
        );
      } else {
        errors.push(
          `${where}: ${o.id} is "${entry.fullName}", but the page says "${plain(c.text)}" (${c.shape})`,
        );
      }
    }
  }
  return { errors, notes };
}

export function targetFiles() {
  const files = walk(join(ROOT, "src/content/docs"), (p) => p.endsWith(".mdx"));
  const templates = join(ROOT, "public/templates");
  if (existsSync(templates))
    files.push(...walk(templates, (p) => /\.(md|mdx)$/.test(p)));
  return files;
}

function collect() {
  const all = [];
  for (const f of targetFiles()) {
    const file = relative(ROOT, f);
    for (const o of extract(readFileSync(f, "utf8"))) all.push({ file, ...o });
  }
  return all;
}

function main() {
  if (process.argv.includes("--list")) {
    const occ = collect();
    for (const o of occ) {
      const names = o.names
        .map((c) => `${c.shape}: "${plain(c.text)}"`)
        .join("; ");
      console.log(
        `${o.file}:${o.line}\t${o.id}\t${o.via}${names ? `\t${names}` : ""}`,
      );
    }
    const ids = new Set(occ.map((o) => o.id));
    const claims = occ.reduce((n, o) => n + o.names.length, 0);
    console.log(
      `check-attack-ids --list: ${occ.length} occurrence(s), ${ids.size} distinct ID(s), ${claims} adjacent name claim(s)`,
    );
    return;
  }

  const path = process.env.ATTACK_STIX_PATH;
  if (!path) {
    console.log(
      "check-attack-ids: SKIP (ATTACK_STIX_PATH is not set). Set it to a local copy of " +
        "enterprise-attack.json, ATT&CK v19.x, to validate technique and tactic IDs and names. " +
        "See docs/DEVELOPMENT.md.",
    );
    return;
  }
  let raw;
  try {
    raw = readFileSync(path);
  } catch (e) {
    console.error(
      `check-attack-ids: cannot read ATTACK_STIX_PATH=${path}: ${e.message}`,
    );
    process.exit(2);
  }
  const wantSha = process.env.ATTACK_STIX_SHA256?.trim().toLowerCase();
  if (wantSha) {
    const got = createHash("sha256").update(raw).digest("hex");
    if (got !== wantSha) {
      console.error(
        `check-attack-ids: bundle SHA-256 is ${got}, expected ${wantSha} (ATTACK_STIX_SHA256)`,
      );
      process.exit(2);
    }
  }
  let index;
  try {
    index = indexBundle(JSON.parse(raw.toString("utf8")));
  } catch (e) {
    console.error(
      `check-attack-ids: ${path} is not a STIX bundle: ${e.message}`,
    );
    process.exit(2);
  }
  const want = process.env.ATTACK_VERSION?.trim() || "19";
  if (
    !index.version ||
    !(index.version === want || index.version.startsWith(`${want}.`))
  ) {
    console.error(
      `check-attack-ids: bundle is ATT&CK ${index.version ?? "(unknown version)"}, expected ${want}.x. ` +
        "Fetch the pinned release or set ATTACK_VERSION.",
    );
    process.exit(2);
  }

  const occ = collect();
  const { errors, notes } = check(occ, index);
  for (const n of notes) console.log(`  note: ${n}`);
  if (errors.length) {
    console.error(
      `check-attack-ids: ${errors.length} problem(s) against ATT&CK v${index.version}:`,
    );
    for (const e of errors) console.error(`  - ${e}`);
    console.error(
      "Fix: correct the ID or the name to match the pinned release, or reword a deliberate " +
        "historical mention so its sentence says so (formerly, replaced, renamed).",
    );
    process.exit(1);
  }
  console.log(
    `check-attack-ids: OK (${occ.length} occurrences, ${new Set(occ.map((o) => o.id)).size} IDs, ATT&CK v${index.version})`,
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) main();

#!/usr/bin/env node
/**
 * Regenerates the glossary registry in src/data/glossary.ts from the four
 * glossary MDX files (C.L.E.A.R., B.A.D., C.A.T. and ASSURED terms). The MDX
 * pages are the source of truth; the registry powers DefineTerm hover
 * tooltips site-wide. Only the record block is generated; the interface and
 * lookupTerm() around it are hand-maintained.
 *
 *   node scripts/extract-glossary.mjs           # rewrite the registry block
 *   node scripts/extract-glossary.mjs --check   # exit 1 if out of sync (CI)
 *
 * Precedence when the same term appears in more than one source:
 * C.L.E.A.R. (the analyst lexicon) wins over ASSURED terms, B.A.D. and C.A.T.
 * (generation order cat → bad → assured → clear, later writes overwrite).
 *
 * B.A.D. actor cards key on the name before the <span> subtitle ("APT29"),
 * and the names listed in the card's data-aliases attribute ("Cozy Bear;
 * Midnight Blizzard") become extra lookup keys with an aliasOf field. An
 * alias that collides with a real term fails the run.
 *
 * Both modes also assert the structure of the MDX sources before emitting:
 * entries the extractor cannot parse, terms defined twice (compared on the
 * normalized key the tooltip lookup uses, so case and hyphen variants
 * collide), empty definitions, duplicate anchor ids, and C.L.E.A.R. terms
 * filed under the wrong letter or out of alphabetical order, and C.A.T. tool
 * cards out of alphabetical order within their section all exit 1 with the
 * offending entries listed. A term defined in two glossaries with different
 * text prints a warning (it does not fail): the precedence chain picks one
 * definition for the tooltip, and the other page drifts unseen.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const paths = {
  clear: join(root, "src/content/docs/glossaries/clear.mdx"),
  bad: join(root, "src/content/docs/glossaries/bad.mdx"),
  cat: join(root, "src/content/docs/glossaries/cat.mdx"),
  // Not extracted into the registry; scanned for duplicate anchor ids only.
  assured: join(root, "src/content/docs/glossaries/assured.mdx"),
  out: join(root, "src/data/glossary.ts"),
};

// Named entities the glossaries use, plus every numeric form (&#36;, &#x2A;),
// which MDX needs for characters such as $ { } * ~ inside <code>.
const decodeEntities = (s) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) =>
      String.fromCodePoint(Number.parseInt(h, 16)),
    )
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");

// Plain text for a tooltip. Simple JSX string expressions ({"{"}, {'}'})
// render as their contents. Tags are removed without inserting a space, so
// "<a ...>AI-assisted triage</a>." stays "AI-assisted triage." (the source's
// own whitespace around inline tags is kept); block boundaries between
// paragraphs never reach here, since every definition is one <p> or <dd>.
const clean = (s) =>
  decodeEntities(
    s
      .replace(/\{"([^"]*)"\}/g, "$1")
      .replace(/\{'([^']*)'\}/g, "$1")
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<[^>]+>/g, ""),
  )
    .replace(/\s+/g, " ")
    .trim();

const entries = new Map(); // key -> { term, definition, source, methodTerm }
const problems = []; // structural drift collected across all source files
const perFileTerms = new Map(); // file -> Map(term -> [source, ...])
const perFileDefs = new Map(); // file -> Map(term -> definition)
const perFileRaw = new Map(); // file -> Map(term -> raw definition markup)
const put = (term, definition, source, file, extra = {}) => {
  const raw = definition;
  term = clean(term);
  definition = clean(definition);
  if (!term || !definition) {
    problems.push(
      `${file}: ${source} entry has an empty ${term ? `definition (term "${term}")` : "term"}`,
    );
    return;
  }
  if (!perFileTerms.has(file)) perFileTerms.set(file, new Map());
  const fileTerms = perFileTerms.get(file);
  fileTerms.set(term, [...(fileTerms.get(term) ?? []), source]);
  if (!perFileDefs.has(file)) perFileDefs.set(file, new Map());
  perFileDefs.get(file).set(term, definition);
  if (!perFileRaw.has(file)) perFileRaw.set(file, new Map());
  perFileRaw.get(file).set(term, raw);
  entries.set(term, { term, definition, source, ...extra });
};

// Extra lookup keys that resolve to an existing entry: actor names from a
// B.A.D. card's data-aliases attribute (other vendors' names for the same
// group), plus retired keys still used by a DefineTerm somewhere in src/.
// Each emits its own record (term = the alias, aliasOf = the entry it
// stands for) so lookups and check-defineterms need no special case.
const aliases = new Map(); // alias -> { of, file }
const addAlias = (alias, of, file) => {
  alias = clean(alias);
  if (!alias) return;
  aliases.set(alias, { of, file });
};
// Retired keys kept resolvable until their DefineTerm uses are renamed.
// Delete a line once `grep -rn 'term="<key>"' src` finds nothing.
const LEGACY_KEYS = {};

// The entry regexes are deliberately loose, so they skip markup they do not
// recognize. Requiring one parsed entry per opening tag turns that silent
// skip into a build failure naming the drifted card. The counters match the
// class as a token so drift in the opening tag itself (a prepended or
// appended class) still shows up as an open-vs-parsed mismatch.
const countMatches = (src, re) => [...src.matchAll(re)].length;
const expectCount = (file, what, src, openRe, parsed) => {
  const open = countMatches(src, openRe);
  if (open !== parsed) {
    problems.push(
      `${file}: ${open} ${what} opening tag(s) but only ${parsed} parsed as entries; ` +
        "an entry's inner markup no longer matches the extractor",
    );
  }
};

// --- C.A.T.: tool cards --------------------------------------------------
const cat = readFileSync(paths.cat, "utf8");
let catParsed = 0;
for (const m of cat.matchAll(
  /<article[^>]*class="cat-tool[^"]*"[^>]*>\s*<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g,
)) {
  put(m[1], m[2], "cat-tool", "cat.mdx");
  catParsed++;
}
expectCount(
  "cat.mdx",
  "cat-tool",
  cat,
  /<article[^>]*class="[^"]*\bcat-tool\b[^"]*"[^>]*>/g,
  catParsed,
);

// --- B.A.D.: terms, actors, campaigns, families, featured animations -----
const bad = readFileSync(paths.bad, "utf8");
// The lookahead pins the h3 to this feature's own text div; without it a
// feature missing its heading would silently borrow the next card's.
let featParsed = 0;
for (const m of bad.matchAll(
  /<div class="bad-feature__text">(?:(?!<\/div>)[\s\S])*?<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g,
)) {
  put(m[1], m[2], "bad-feature", "bad.mdx");
  featParsed++;
}
expectCount(
  "bad.mdx",
  "bad-feature",
  bad,
  /<div[^>]*class="[^"]*\bbad-feature__text\b[^"]*"[^>]*>/g,
  featParsed,
);
const badKinds = [
  ["bad-term", "bad-term"],
  ["bad-actor", "bad-actor"],
  ["bad-campaign", "bad-campaign"],
  ["bad-family", "bad-family"],
];
for (const [cls, source] of badKinds) {
  const re = new RegExp(
    `<article[^>]*class="${cls}[^"]*"[^>]*>\\s*<h3>([\\s\\S]*?)<\\/h3>\\s*<p>([\\s\\S]*?)<\\/p>`,
    "g",
  );
  let parsed = 0;
  for (const m of bad.matchAll(re)) {
    if (cls === "bad-actor") {
      // "APT29 <span>Cozy Bear / Midnight Blizzard</span>": the key is the
      // name before the subtitle. The subtitle mixes other vendors' names
      // with descriptions ("RaaS at scale"), so only the names the card
      // lists in data-aliases become extra lookup keys.
      const name = m[1].split(/<span\b/)[0];
      put(name, m[2], source, "bad.mdx");
      const open = m[0].slice(0, m[0].indexOf(">") + 1);
      const list = open.match(/\bdata-aliases="([^"]*)"/)?.[1] ?? "";
      for (const alias of list.split(";")) {
        if (alias.trim()) addAlias(alias, clean(name), "bad.mdx");
      }
    } else {
      put(m[1], m[2], source, "bad.mdx");
    }
    parsed++;
  }
  expectCount(
    "bad.mdx",
    cls,
    bad,
    new RegExp(`<article[^>]*class="[^"]*\\b${cls}\\b[^"]*"[^>]*>`, "g"),
    parsed,
  );
}

// --- ASSURED terms: the method's own vocabulary ---------------------------
// Each <dd> opens with the definition paragraph, then "Taught in / Recorded
// in" lines; only the first <p> is the tooltip text. The at-anchor span in
// the <dt> is markup and strips out. C.L.E.A.R. carries a summary of most of
// these terms with a "Full entry" pointer here, and wins on collisions so
// existing tooltips keep their analyst-facing wording; the terms only this
// page defines (Desk Card, Receipt, the level names) become lookups.
const assured = readFileSync(paths.assured, "utf8");
let assuredParsed = 0;
for (const m of assured.matchAll(
  /<dt(?:\s[^>]*)?>([\s\S]*?)<\/dt>\s*<dd>\s*<p>([\s\S]*?)<\/p>[\s\S]*?<\/dd>/g,
)) {
  put(m[1], m[2], "assured", "assured.mdx", { methodTerm: true });
  // The "Taught in" lines after the definition carry this entry's
  // cross-glossary pointers; the drift check reads them.
  perFileRaw.get("assured.mdx")?.set(clean(m[1]), m[0]);
  assuredParsed++;
}
const assuredDt = countMatches(assured, /<dt[\s>]/g);
if (assuredParsed !== assuredDt) {
  problems.push(
    `assured.mdx: ${assuredDt} <dt> tag(s) but only ${assuredParsed} parsed; ` +
      "every <dd> must open with its definition <p>",
  );
}

// --- C.L.E.A.R.: definition lists (wins on collisions) --------------------
const clear = readFileSync(paths.clear, "utf8");
let clearParsed = 0;
// <dt> may carry attributes (a per-term id anchor, for instance); <dd> and
// the pairing between them are unchanged. A clear-tag span in the <dt> marks
// a term ASSURED coined or uses in its own sense.
for (const m of clear.matchAll(
  /<dt(?:\s[^>]*)?>([\s\S]*?)<\/dt>\s*<dd>([\s\S]*?)<\/dd>/g,
)) {
  const methodTerm = /\bclear-tag\b/.test(m[1]);
  put(m[1], m[2], "clear", "clear.mdx", methodTerm ? { methodTerm } : {});
  clearParsed++;
}
const dtCount = countMatches(clear, /<dt[\s>]/g);
const ddCount = countMatches(clear, /<dd[\s>]/g);
if (dtCount !== ddCount) {
  problems.push(
    `clear.mdx: ${dtCount} <dt> tag(s) but ${ddCount} <dd> tag(s); every term needs exactly one definition`,
  );
}
if (clearParsed !== dtCount) {
  problems.push(
    `clear.mdx: ${dtCount} <dt> tag(s) but only ${clearParsed} dt/dd pair(s) parsed; ` +
      "a term is missing its definition or has stray markup between <dt> and <dd>",
  );
}

// --- C.L.E.A.R. letter sections: filing, order, and nav parity ------------
// Attribute order and additions are tolerated; only the id and the class
// token are load-bearing. An optional leading "0-9" section is the one home
// for digit-initial terms (2FA, 802.1X), which no A-Z letter can file.
const letterSections = [
  ...clear.matchAll(
    /<section(?=[^>]*\bid="([A-Z]|0-9)")(?=[^>]*\bclass="[^"]*\bclear-section\b[^"]*")[^>]*>([\s\S]*?)<\/section>/g,
  ),
];
const sectionLetters = letterSections.map((m) => m[1]);
for (let i = 1; i < sectionLetters.length; i++) {
  if (sectionLetters[i] <= sectionLetters[i - 1]) {
    problems.push(
      `clear.mdx: letter section "${sectionLetters[i]}" is duplicated or out of order (0-9 first, then A-Z)`,
    );
  }
}
const navLetters = [
  ...clear.matchAll(
    /<a(?=[^>]*\bhref="#([A-Z]|0-9)")(?=[^>]*\bclass="[^"]*\bclear-nav__letter\b[^"]*")[^>]*>/g,
  ),
].map((m) => m[1]);
if (navLetters.join("") !== sectionLetters.join("")) {
  problems.push(
    `clear.mdx: letter nav [${navLetters.join("")}] does not match the letter sections [${sectionLetters.join("")}]`,
  );
}
// Mirrors normalizeKey() in glossary.ts so "Pass-the-Hash" sorts as words.
const sortKey = (t) =>
  t.toLowerCase().replace(/-/g, " ").replace(/\s+/g, " ").trim();

// --- C.A.T. sections: tool cards in alphabetical order --------------------
// Same rule as the C.L.E.A.R. letter sections: within one .cat-section the
// tool headings sort on the normalized key, so a reader scanning a category
// (and the filter's result order) finds a tool where the alphabet says.
for (const [, id, body] of cat.matchAll(
  /<section(?=[^>]*\bclass="[^"]*\bcat-section\b[^"]*")(?=[^>]*\bid="([^"]+)")[^>]*>([\s\S]*?)<\/section>/g,
)) {
  let prev = null;
  for (const h of body.matchAll(
    /<article[^>]*class="[^"]*\bcat-tool\b[^"]*"[^>]*>\s*<h3>([\s\S]*?)<\/h3>/g,
  )) {
    const term = clean(h[1]);
    const key = sortKey(term);
    if (prev && key < prev.key) {
      problems.push(
        `cat.mdx: section "${id}" is out of alphabetical order: "${term}" follows "${prev.term}"`,
      );
    }
    prev = { key, term };
  }
}
let sectionedTerms = 0;
for (const [, letter, body] of letterSections) {
  let prev = null;
  for (const dt of body.matchAll(/<dt(?:\s[^>]*)?>([\s\S]*?)<\/dt>/g)) {
    sectionedTerms++;
    const term = clean(dt[1]);
    const initial = term
      .replace(/^[^0-9A-Za-z]+/, "")
      .charAt(0)
      .toUpperCase();
    const home = /[0-9]/.test(initial) ? "0-9" : initial;
    if (home !== letter) {
      problems.push(
        `clear.mdx: "${term}" is filed under ${letter} but belongs under ${home || '"?"'}`,
      );
    }
    const key = sortKey(term);
    if (prev && key < prev.key) {
      problems.push(
        `clear.mdx: section ${letter} is out of alphabetical order: "${term}" follows "${prev.term}"`,
      );
    }
    prev = { key, term };
  }
}
if (sectionedTerms !== dtCount) {
  problems.push(
    `clear.mdx: ${dtCount - sectionedTerms} term(s) sit outside the letter sections`,
  );
}

// --- Duplicate terms --------------------------------------------------------
// Cross-file repeats of one spelling are the documented precedence chain, but
// a term defined twice inside one glossary is copy drift, except the B.A.D.
// featured animations, each of which deliberately shadows exactly one plain
// card. Terms compare on the normalized key the tooltip lookup uses, so case
// and hyphen variants ("Pass The Hash" beside "Pass-the-Hash") collide here
// instead of shipping two divergent definitions.
for (const [file, fileTerms] of perFileTerms) {
  const byKey = new Map(); // sortKey -> { spellings: [], sources: [] }
  for (const [term, sources] of fileTerms) {
    const rec = byKey.get(sortKey(term)) ?? { spellings: [], sources: [] };
    rec.spellings.push(term);
    rec.sources.push(...sources);
    byKey.set(sortKey(term), rec);
  }
  for (const { spellings, sources } of byKey.values()) {
    if (sources.length < 2) continue;
    const cards = sources.filter((s) => s !== "bad-feature");
    if (
      file === "bad.mdx" &&
      sources.length === 2 &&
      cards.length === 1 &&
      spellings.length === 1
    )
      continue;
    problems.push(
      `${file}: "${spellings.join('" / "')}" is defined ${sources.length} times (${sources.join(", ")})`,
    );
  }
}
// A different spelling of the same normalized key in another file dodges the
// precedence overwrite: both records ship and lookups resolve to whichever
// sorts first. Require one spelling everywhere.
const spellingsByKey = new Map(); // sortKey -> Map(spelling -> [file, ...])
for (const [file, fileTerms] of perFileTerms) {
  for (const term of fileTerms.keys()) {
    const bySpelling = spellingsByKey.get(sortKey(term)) ?? new Map();
    bySpelling.set(term, [...(bySpelling.get(term) ?? []), file]);
    spellingsByKey.set(sortKey(term), bySpelling);
  }
}
for (const bySpelling of spellingsByKey.values()) {
  if (bySpelling.size < 2) continue;
  const detail = [...bySpelling]
    .map(([spelling, files]) => `"${spelling}" (${files.join(", ")})`)
    .join(" vs ");
  problems.push(`one term, two spellings: ${detail}`);
}

// --- Cross-glossary drift (warning) -----------------------------------------
// The same term defined in two glossaries with different text: the tooltip
// shows only the precedence winner, so the other page can drift unseen. A
// C.A.T. "(concept)" card compares against the plain term it describes.
// Warn rather than fail: some overlaps are deliberate (a tool card and the
// analyst concept), and each warning is a prompt to pick one home and link
// to it with a "Full entry" pointer. A pair where one entry already links to
// the other glossary page is that pointer, so it does not warn.
const pageOf = {
  "clear.mdx": "/docs/glossaries/clear/",
  "bad.mdx": "/docs/glossaries/bad/",
  "cat.mdx": "/docs/glossaries/cat/",
  "assured.mdx": "/docs/glossaries/assured/",
};
const driftKey = (t) => sortKey(t.replace(/\s*\(concept\)$/i, ""));
const defsByKey = new Map(); // driftKey -> [{ file, term, definition }]
for (const [file, defs] of perFileDefs) {
  for (const [term, definition] of defs) {
    const k = driftKey(term);
    defsByKey.set(k, [...(defsByKey.get(k) ?? []), { file, term, definition }]);
  }
}
const drift = [];
for (const recs of defsByKey.values()) {
  const files = new Set(recs.map((r) => r.file));
  if (files.size < 2) continue;
  if (new Set(recs.map((r) => r.definition)).size < 2) continue;
  const pointed = recs.some((r) =>
    recs.some(
      (o) =>
        o.file !== r.file &&
        (perFileRaw.get(r.file)?.get(r.term) ?? "").includes(pageOf[o.file]),
    ),
  );
  if (pointed) continue;
  drift.push(recs.map((r) => `"${r.term}" (${r.file})`).join(" vs "));
}

// --- Anchor ids: unique per page -------------------------------------------
// Duplicate ids break the letter/section anchors and any aria references.
// Only ids on HTML and SVG tags (lowercase initial, so <linearGradient>
// counts) are checked: a component prop such as <VendorStatus id="abuse-ch" />
// names data, not a DOM id, and legitimately repeats the card's own id.
const htmlIdRe =
  /<[a-z][a-zA-Z0-9-]*\s(?:[^>"']|"[^"]*"|'[^']*')*?\bid="([^"]+)"/g;
for (const [file, src] of [
  ["cat.mdx", cat],
  ["bad.mdx", bad],
  ["clear.mdx", clear],
  ["assured.mdx", readFileSync(paths.assured, "utf8")],
]) {
  const idCounts = new Map();
  for (const m of src.matchAll(htmlIdRe)) {
    idCounts.set(m[1], (idCounts.get(m[1]) ?? 0) + 1);
  }
  for (const [id, n] of idCounts) {
    if (n > 1) problems.push(`${file}: id "${id}" appears ${n} times`);
  }
}

// --- Aliases: resolve, and never shadow a real entry -----------------------
for (const [legacy, of] of Object.entries(LEGACY_KEYS)) {
  addAlias(legacy, of, "extract-glossary.mjs LEGACY_KEYS");
}
const entryKeys = new Map([...entries.keys()].map((k) => [sortKey(k), k]));
const aliasRecords = new Map(); // alias -> record
for (const [alias, { of, file }] of aliases) {
  const target = entries.get(of);
  if (!target) {
    problems.push(
      `${file}: alias "${alias}" points at "${of}", which is not a term`,
    );
    continue;
  }
  const clash = entryKeys.get(sortKey(alias));
  if (clash) {
    problems.push(
      `${file}: alias "${alias}" (for "${of}") collides with the term "${clash}"; drop the alias or rename one of them`,
    );
    continue;
  }
  aliasRecords.set(alias, { ...target, term: alias, aliasOf: of });
}

if (problems.length > 0) {
  console.error(
    `extract-glossary: ${problems.length} structural problem(s) in the glossary MDX:`,
  );
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

if (drift.length > 0) {
  console.warn(
    `extract-glossary: warning: ${drift.length} term(s) defined differently in two glossaries:`,
  );
  for (const d of drift) console.warn(`  - ${d}`);
}

// --- Emit -----------------------------------------------------------------
// Optional fields are emitted only when set, one per line, so a record stays
// greppable (check-defineterms reads the term and source lines).
for (const [alias, rec] of aliasRecords) entries.set(alias, rec);
const sorted = [...entries.keys()].sort();
const body = sorted
  .map((k) => {
    const e = entries.get(k);
    const lines = [
      `    "term": ${JSON.stringify(e.term)}`,
      `    "definition": ${JSON.stringify(e.definition)}`,
      `    "source": ${JSON.stringify(e.source)}`,
    ];
    if (e.aliasOf) lines.push(`    "aliasOf": ${JSON.stringify(e.aliasOf)}`);
    if (e.methodTerm) lines.push(`    "methodTerm": true`);
    return `  ${JSON.stringify(k)}: {\n${lines.join(",\n")}\n  }`;
  })
  .join(",\n");
const record = `export const glossary: Record<string, GlossaryEntry> = {\n${body}\n};`;

const current = readFileSync(paths.out, "utf8");
const marker =
  /export const glossary: Record<string, GlossaryEntry> = \{[\s\S]*?\n\};/;
if (!marker.test(current)) {
  console.error(
    "extract-glossary: could not find the glossary record in glossary.ts",
  );
  process.exit(2);
}
const next = current.replace(marker, record);

if (process.argv.includes("--check")) {
  if (next !== current) {
    console.error(
      "extract-glossary: src/data/glossary.ts is out of sync with the glossary MDX files.\n" +
        "Run `node scripts/extract-glossary.mjs` and commit the result.",
    );
    process.exit(1);
  }
  console.log(`extract-glossary: in sync (${sorted.length} entries).`);
} else {
  writeFileSync(paths.out, next);
  console.log(
    `extract-glossary: wrote ${sorted.length} entries to src/data/glossary.ts`,
  );
}

#!/usr/bin/env node
/**
 * Regenerates the glossary registry in src/data/glossary.ts from the three
 * glossary MDX files. The MDX pages are the source of truth; the registry
 * powers DefineTerm hover tooltips site-wide.
 *
 *   node scripts/extract-glossary.mjs           # rewrite the registry block
 *   node scripts/extract-glossary.mjs --check   # exit 1 if out of sync (CI)
 *
 * Precedence when the same term appears in more than one source:
 * C.L.E.A.R. (the analyst lexicon) wins over B.A.D. and C.A.T., matching the
 * original generation order (cat → bad → clear, later writes overwrite).
 *
 * Both modes also assert the structure of the MDX sources before emitting:
 * entries the extractor cannot parse, terms defined twice (compared on the
 * normalized key the tooltip lookup uses, so case and hyphen variants
 * collide), empty definitions, duplicate anchor ids, and C.L.E.A.R. terms
 * filed under the wrong letter or out of alphabetical order all exit 1 with
 * the offending entries listed.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const paths = {
  clear: join(root, "src/content/docs/glossaries/clear.mdx"),
  bad: join(root, "src/content/docs/glossaries/bad.mdx"),
  cat: join(root, "src/content/docs/glossaries/cat.mdx"),
  out: join(root, "src/data/glossary.ts"),
};

const decodeEntities = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");

const clean = (s) =>
  decodeEntities(s.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();

const entries = new Map(); // key -> { term, definition, source }
const problems = []; // structural drift collected across all three files
const perFileTerms = new Map(); // file -> Map(term -> [source, ...])
const put = (term, definition, source, file) => {
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
  entries.set(term, { term, definition, source });
};

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
    put(m[1], m[2], source, "bad.mdx");
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

// --- C.L.E.A.R.: definition lists (wins on collisions) --------------------
const clear = readFileSync(paths.clear, "utf8");
let clearParsed = 0;
for (const m of clear.matchAll(
  /<dt>([\s\S]*?)<\/dt>\s*<dd>([\s\S]*?)<\/dd>/g,
)) {
  put(m[1], m[2], "clear", "clear.mdx");
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
let sectionedTerms = 0;
for (const [, letter, body] of letterSections) {
  let prev = null;
  for (const dt of body.matchAll(/<dt>([\s\S]*?)<\/dt>/g)) {
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

// --- Anchor ids: unique per page -------------------------------------------
// Duplicate ids break the letter/section anchors and any aria references.
for (const [file, src] of [
  ["cat.mdx", cat],
  ["bad.mdx", bad],
  ["clear.mdx", clear],
]) {
  const idCounts = new Map();
  for (const m of src.matchAll(/\bid="([^"]+)"/g)) {
    idCounts.set(m[1], (idCounts.get(m[1]) ?? 0) + 1);
  }
  for (const [id, n] of idCounts) {
    if (n > 1) problems.push(`${file}: id "${id}" appears ${n} times`);
  }
}

if (problems.length > 0) {
  console.error(
    `extract-glossary: ${problems.length} structural problem(s) in the glossary MDX:`,
  );
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

// --- Emit -----------------------------------------------------------------
const sorted = [...entries.keys()].sort();
const body = sorted
  .map((k) => {
    const e = entries.get(k);
    return `  ${JSON.stringify(k)}: {\n    "term": ${JSON.stringify(
      e.term,
    )},\n    "definition": ${JSON.stringify(
      e.definition,
    )},\n    "source": ${JSON.stringify(e.source)}\n  }`;
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

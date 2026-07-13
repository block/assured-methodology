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
const put = (term, definition, source) => {
  term = clean(term);
  definition = clean(definition);
  if (!term || !definition) return;
  entries.set(term, { term, definition, source });
};

// --- C.A.T.: tool cards --------------------------------------------------
const cat = readFileSync(paths.cat, "utf8");
for (const m of cat.matchAll(
  /<article class="cat-tool[^"]*"[^>]*>\s*<h4>([\s\S]*?)<\/h4>\s*<p>([\s\S]*?)<\/p>/g
)) {
  put(m[1], m[2], "cat-tool");
}

// --- B.A.D.: terms, actors, campaigns, families, featured animations -----
const bad = readFileSync(paths.bad, "utf8");
for (const m of bad.matchAll(
  /<div class="bad-feature__text">[\s\S]*?<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g
)) {
  put(m[1], m[2], "bad-feature");
}
const badKinds = [
  ["bad-term", "bad-term"],
  ["bad-actor", "bad-actor"],
  ["bad-campaign", "bad-campaign"],
  ["bad-family", "bad-family"],
];
for (const [cls, source] of badKinds) {
  const re = new RegExp(
    `<article class="${cls}[^"]*"[^>]*>\\s*<h4>([\\s\\S]*?)<\\/h4>\\s*<p>([\\s\\S]*?)<\\/p>`,
    "g"
  );
  for (const m of bad.matchAll(re)) put(m[1], m[2], source);
}

// --- C.L.E.A.R.: definition lists (wins on collisions) --------------------
const clear = readFileSync(paths.clear, "utf8");
for (const m of clear.matchAll(/<dt>([\s\S]*?)<\/dt>\s*<dd>([\s\S]*?)<\/dd>/g)) {
  put(m[1], m[2], "clear");
}

// --- Emit -----------------------------------------------------------------
const sorted = [...entries.keys()].sort();
const body = sorted
  .map((k) => {
    const e = entries.get(k);
    return `  ${JSON.stringify(k)}: {\n    "term": ${JSON.stringify(
      e.term
    )},\n    "definition": ${JSON.stringify(
      e.definition
    )},\n    "source": ${JSON.stringify(e.source)}\n  }`;
  })
  .join(",\n");
const record = `export const glossary: Record<string, GlossaryEntry> = {\n${body}\n};`;

const current = readFileSync(paths.out, "utf8");
const marker = /export const glossary: Record<string, GlossaryEntry> = \{[\s\S]*?\n\};/;
if (!marker.test(current)) {
  console.error("extract-glossary: could not find the glossary record in glossary.ts");
  process.exit(2);
}
const next = current.replace(marker, record);

if (process.argv.includes("--check")) {
  if (next !== current) {
    console.error(
      "extract-glossary: src/data/glossary.ts is out of sync with the glossary MDX files.\n" +
        "Run `node scripts/extract-glossary.mjs` and commit the result."
    );
    process.exit(1);
  }
  console.log(`extract-glossary: in sync (${sorted.length} entries).`);
} else {
  writeFileSync(paths.out, next);
  console.log(`extract-glossary: wrote ${sorted.length} entries to src/data/glossary.ts`);
}

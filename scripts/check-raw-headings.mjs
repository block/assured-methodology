#!/usr/bin/env node
/**
 * Raw <h2> gate. A JSX `<h2 id="...">` in MDX renders, but Astro's heading
 * collection never sees it: the section drops out of the "On this page"
 * TOC and rehype-autolink-headings gives it no anchor link. Write section
 * headings as markdown (`## Title`); rehype-slug derives the same kind of
 * id, so in-page links keep working once their targets are updated.
 *
 * Fails when a docs MDX page carries a raw <h2> that is neither exempt nor
 * covered by the baseline below. Fenced code, inline code and MDX comments
 * are ignored, so documenting the pattern does not trip the gate.
 *
 * Exempt for good:
 *   - src/content/docs/glossaries/**: chromeless pages with their own
 *     section navigation and no page TOC.
 *   - The four risk/framework.mdx sections whose ids carry many inbound
 *     deep links (#ratm, #matrix, #mitre, #cvss) and cannot be expressed as
 *     markdown headings under rehype-slug.
 *
 * BASELINE is a ratchet, not an allowance: it records the raw headings that
 * predate the gate (per file), so the build stays green while they are
 * converted. A file may go down, never up, and a file not listed may not
 * start. When a file drops below its baseline the gate says so; lower the
 * number (or delete the line) in the same change.
 *
 * Usage: node scripts/check-raw-headings.mjs
 * Exit codes: 0 pass, 1 new raw headings found.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const DOCS = join(ROOT, "src/content/docs");

const EXEMPT_DIRS = ["src/content/docs/glossaries/"];
const EXEMPT_IDS = {
  "src/content/docs/risk/framework.mdx": ["ratm", "matrix", "mitre", "cvss"],
};

// Raw <h2> headings present when the gate landed (2026-10). Shrink only.
const BASELINE = {
  "src/content/docs/alert/example.mdx": 4,
  "src/content/docs/cases/index.mdx": 4,
  "src/content/docs/documentation/example.mdx": 3,
  "src/content/docs/documentation/index.mdx": 1,
  "src/content/docs/documentation/standards.mdx": 4,
  "src/content/docs/escalation/communication.mdx": 5,
  "src/content/docs/escalation/criteria.mdx": 6,
  "src/content/docs/escalation/example.mdx": 3,
  "src/content/docs/escalation/handoff.mdx": 1,
  "src/content/docs/escalation/preserve.mdx": 2,
  "src/content/docs/escalation/protocols.mdx": 1,
  "src/content/docs/escalation/triage-vs-ir.mdx": 1,
  "src/content/docs/field-reference/tool-families.mdx": 8,
  "src/content/docs/risk/example.mdx": 3,
  "src/content/docs/scope/clocks.mdx": 1,
  "src/content/docs/scope/example.mdx": 3,
  "src/content/docs/scope/regulatory.mdx": 3,
  "src/content/docs/subject/example.mdx": 4,
  "src/content/docs/uncover/example.mdx": 4,
  "src/content/docs/uncover/tooling.mdx": 1,
};

function* walk(dir) {
  for (const name of readdirSync(dir).sort()) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (name.endsWith(".mdx")) yield p;
  }
}

// Blank out code and comments, keeping line breaks so line numbers hold.
const blank = (m) => m.replace(/[^\n]/g, " ");
const strip = (src) =>
  src
    .replace(/^(```|~~~)[\s\S]*?^\1/gm, blank)
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, blank)
    .replace(/<!--[\s\S]*?-->/g, blank)
    .replace(/`[^`\n]*`/g, blank);

const errors = [];
const notes = [];
let seen = 0;
for (const file of walk(DOCS)) {
  const rel = relative(ROOT, file);
  if (EXEMPT_DIRS.some((d) => rel.startsWith(d))) continue;
  const src = strip(readFileSync(file, "utf8"));
  const allowedIds = EXEMPT_IDS[rel] ?? [];
  const hits = [];
  for (const m of src.matchAll(/<h2(?=[\s>/])[^>]*>/g)) {
    const id = m[0].match(/\bid="([^"]+)"/)?.[1];
    if (id && allowedIds.includes(id)) continue;
    hits.push({ line: src.slice(0, m.index).split("\n").length, tag: m[0] });
  }
  seen += hits.length;
  const allowed = BASELINE[rel] ?? 0;
  if (hits.length > allowed) {
    const where = hits.map((h) => `${rel}:${h.line} ${h.tag}`).join("\n    ");
    errors.push(
      `${rel}: ${hits.length} raw <h2> (baseline ${allowed}); use a markdown "## " heading\n    ${where}`,
    );
  } else if (hits.length < allowed) {
    notes.push(
      `${rel}: ${hits.length} raw <h2>, below its baseline of ${allowed}; lower BASELINE in scripts/check-raw-headings.mjs`,
    );
  }
}

for (const n of notes) console.log(`check-raw-headings: note: ${n}`);
if (errors.length > 0) {
  console.error(
    `check-raw-headings: ${errors.length} page(s) gained raw <h2> headings, which drop out of the page TOC:`,
  );
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(
  `check-raw-headings: OK (${seen} raw <h2> left under the baseline; none new)`,
);

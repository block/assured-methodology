#!/usr/bin/env node
/**
 * Stamps the methodology edition into every shipped template. Runs after
 * `astro build` (wired into `pnpm build`) and edits the copies in
 * dist/templates, never the sources in public/templates: the version lives
 * once, in src/data/version.ts, so a release bump cannot leave a template
 * claiming the previous edition.
 *
 * Each template's licence comment gains one line,
 *
 *     Template version: <METHODOLOGY_VERSION>
 *
 * after the "note any changes you make." sentence (or just before the
 * comment closes, if that sentence moves). A reader who downloads a template
 * can then tell which edition of the method it was written against.
 *
 *   node scripts/stamp-templates.mjs              # after astro build
 *   node scripts/stamp-templates.mjs --dir <dir>  # stamp another copy
 *
 * Idempotent: an existing stamp is rewritten, not duplicated, so re-running
 * on the same dist/ is safe. Exits 1 when dist/templates is missing, when
 * the version cannot be read, or when a template has no licence comment.
 */

import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { join, relative, resolve } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const VERSION_FILE = join(ROOT, "src/data/version.ts");
const dirArg = process.argv.indexOf("--dir");
const TEMPLATES =
  dirArg !== -1 && process.argv[dirArg + 1]
    ? resolve(process.argv[dirArg + 1])
    : join(ROOT, "dist/templates");

const fail = (msg) => {
  console.error(`stamp-templates: ${msg}`);
  process.exit(1);
};

const versionMatch = readFileSync(VERSION_FILE, "utf8").match(
  /export const METHODOLOGY_VERSION\s*=\s*"([^"]+)"/,
);
if (!versionMatch)
  fail("could not read METHODOLOGY_VERSION from src/data/version.ts");
const version = versionMatch[1];

if (!existsSync(TEMPLATES))
  fail(`${TEMPLATES} not found; run astro build first`);

function* walk(dir) {
  for (const name of readdirSync(dir).sort()) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (name.endsWith(".md")) yield p;
  }
}

// The licence comment every template opens with (check-engineering-contracts
// pins its wording in public/templates).
const LICENCE = /<!--\s*ASSURED Methodology by[\s\S]*?-->/;
const STAMP_LINE = /\n[ \t]*Template version: [^\n]*?(?=\n| -->)/;
const ANCHOR = "note any changes you make.";

const missing = [];
let stamped = 0;
for (const file of walk(TEMPLATES)) {
  const rel = relative(TEMPLATES, file);
  const src = readFileSync(file, "utf8");
  const m = src.match(LICENCE);
  if (!m) {
    missing.push(rel);
    continue;
  }
  const comment = m[0].replace(STAMP_LINE, "");
  // Match the comment's own continuation indent (five spaces today).
  const indent = comment.match(/\n([ \t]+)\S/)?.[1] ?? "     ";
  const line = `${indent}Template version: ${version}`;
  const at = comment.indexOf(ANCHOR);
  const next =
    at === -1
      ? comment.replace(/\s*-->$/, `\n${line} -->`)
      : `${comment.slice(0, at + ANCHOR.length)}\n${line}${comment.slice(at + ANCHOR.length)}`;
  writeFileSync(
    file,
    src.replace(m[0], () => next),
  );
  stamped++;
}

if (missing.length > 0) {
  fail(
    `${missing.length} template(s) have no licence comment to stamp:\n${missing
      .map((f) => `  - ${f}`)
      .join("\n")}`,
  );
}
if (stamped === 0) fail(`no templates found under ${TEMPLATES}`);
console.log(
  `stamp-templates: stamped ${stamped} template(s) with "Template version: ${version}"`,
);

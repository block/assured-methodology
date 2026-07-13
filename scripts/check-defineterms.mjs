#!/usr/bin/env node
/**
 * Assert that every <DefineTerm term="..."> in src/content resolves against
 * src/data/glossary.ts. A term that fails lookup renders "(definition
 * missing)" in the shipped tooltip, so this belongs in CI next to the
 * glossary parity check (extract-glossary.mjs --check).
 *
 * The resolution rules mirror lookupTerm() in glossary.ts: exact key match,
 * then case-/hyphen-insensitive match, then the singular form. Usages that
 * pass an explicit body (<DefineTerm term="X">definition...</DefineTerm>) or
 * a definition="..." prop supply their own text and are exempt from lookup,
 * but only self-closing/prop detection is possible without a full MDX parse,
 * so explicit-body usages are detected by the tag not being self-closed.
 *
 * Exit codes: 0 all resolve, 1 unresolved terms found.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const CONTENT_DIR = join(ROOT, "src/content");
const GLOSSARY = join(ROOT, "src/data/glossary.ts");

/** Mirrors normalizeKey() in glossary.ts. */
function normalizeKey(s) {
  return s.toLowerCase().replace(/-/g, " ").replace(/\s+/g, " ").trim();
}

function loadGlossaryKeys() {
  const src = readFileSync(GLOSSARY, "utf8");
  // Each record repeats its key in a quoted `term` field (the generator
  // emits `"term": "..."`; a formatter pass may strip the property quotes),
  // so collect from those: one per record, always one string per line.
  const keys = new Set();
  for (const m of src.matchAll(/^\s+"?term"?: "((?:[^"\\]|\\.)*)",?$/gm)) {
    keys.add(m[1].replace(/\\"/g, '"'));
  }
  return keys;
}

function* mdxFiles(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* mdxFiles(p);
    else if (name.endsWith(".mdx")) yield p;
  }
}

function resolves(term, keys, normalizedKeys) {
  if (keys.has(term)) return true;
  const candidates = [normalizeKey(term)];
  if (term.endsWith("s")) candidates.push(normalizeKey(term.slice(0, -1)));
  return candidates.some((c) => normalizedKeys.has(c));
}

const keys = loadGlossaryKeys();
const normalizedKeys = new Set([...keys].map(normalizeKey));
if (keys.size === 0) {
  console.error("check-defineterms: failed to parse any keys from glossary.ts");
  process.exit(1);
}

const failures = [];
let checked = 0;
let exempt = 0;

for (const file of mdxFiles(CONTENT_DIR)) {
  const src = readFileSync(file, "utf8");
  // Match each DefineTerm opening tag and capture its full attribute span so
  // definition="..." and explicit bodies (non-self-closing tags) can be
  // exempted from registry lookup.
  for (const m of src.matchAll(/<DefineTerm\b([^>]*?)(\/?)>/gs)) {
    const attrs = m[1];
    const selfClosing = m[2] === "/";
    const termMatch = attrs.match(/\bterm="((?:[^"\\]|\\.)*)"/);
    if (!termMatch) continue;
    const term = termMatch[1];
    const hasInlineDefinition = /\bdefinition="/.test(attrs);
    if (hasInlineDefinition || !selfClosing) {
      // Explicit definition prop or slotted body: lookup miss is by design.
      exempt++;
      continue;
    }
    checked++;
    if (!resolves(term, keys, normalizedKeys)) {
      const line = src.slice(0, m.index).split("\n").length;
      failures.push({ file: file.replace(ROOT, ""), line, term });
    }
  }
}

if (failures.length > 0) {
  console.error(
    `check-defineterms: ${failures.length} DefineTerm usage(s) do not resolve in glossary.ts:\n`,
  );
  for (const f of failures) {
    console.error(`  ${f.file}:${f.line}  term="${f.term}"`);
  }
  process.exit(1);
}

console.log(
  `check-defineterms: OK. ${checked} lookups resolve against ${keys.size} glossary entries (${exempt} usages carry their own definition).`,
);

#!/usr/bin/env node
/**
 * Double-build byte-identity check. Release attestation requires that a
 * fresh build can be diffed against the deployed artifact, which is only
 * possible when two builds of the same tree are byte-identical.
 *
 * Runs `astro build` twice and compares SHA-256 manifests of dist/. Not in
 * the default `pnpm build` chain (it doubles build time); run it before a
 * release with `pnpm check:determinism`, or in CI as a separate job.
 *
 * Exit codes: 0 byte-identical, 1 differences (lists the varying files —
 * the usual cause is randomness evaluated at build time; see
 * src/lib/stable-id.ts and the Math.random ban in
 * check-engineering-contracts.mjs).
 */

import { execSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, rmSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const DIST = join(ROOT, "dist");

function build(label) {
  // Cold-cache builds: deployment builds from a fresh CI checkout, so that
  // is the attestation scenario. Locally, a build that straddles a cache
  // regime change (source edit or partial cache clear) can differ from the
  // next build on a subset of files before settling (observed 2026-07-16),
  // so every build here starts from the same truly-cold state — all three
  // cache locations cleared, matching CI.
  for (const cache of ["node_modules/.astro", "node_modules/.vite", ".astro"]) {
    rmSync(join(ROOT, cache), { recursive: true, force: true });
  }
  console.log(`check-build-determinism: ${label} (cold cache)...`);
  execSync("npx astro build", { cwd: ROOT, stdio: ["ignore", "ignore", "inherit"] });
}

function manifest() {
  const out = new Map();
  (function walk(dir) {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) walk(p);
      else out.set(relative(DIST, p), createHash("sha256").update(readFileSync(p)).digest("hex"));
    }
  })(DIST);
  return out;
}

build("build 1 of 2");
const a = manifest();
build("build 2 of 2");
const b = manifest();

const diffs = [];
for (const [file, hash] of a) {
  if (!b.has(file)) diffs.push(`only in build 1: ${file}`);
  else if (b.get(file) !== hash) diffs.push(`differs: ${file}`);
}
for (const file of b.keys()) {
  if (!a.has(file)) diffs.push(`only in build 2: ${file}`);
}

if (diffs.length > 0) {
  console.error(diffs.join("\n"));
  console.error(`check-build-determinism: ${diffs.length} difference(s) between consecutive builds.`);
  process.exit(1);
}
console.log(`check-build-determinism: OK (${a.size} files byte-identical across two builds)`);

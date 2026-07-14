#!/usr/bin/env node
/**
 * Keep the Content-Security-Policy header in vercel.json in sync with the
 * inline scripts Astro actually emits into dist/.
 *
 * The header's script-src uses sha256 hashes instead of 'unsafe-inline', so
 * any change to an is:inline script (or a dependency's injected script)
 * would silently break the page on the next deploy. This script hashes
 * every executable inline <script> in dist/**\/*.html and compares the set
 * against the hashes in the header.
 *
 *   node scripts/check-csp.mjs          verify (exit 1 on mismatch)
 *   node scripts/check-csp.mjs --write  rewrite the header's hash list
 *
 * Runs after `astro build` in the build chain, so a stale header fails the
 * build with instructions instead of shipping a broken CSP.
 * <script type="application/ld+json"> blocks are data, not executable, and
 * are not subject to script-src, so they are skipped.
 */

import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const DIST = join(ROOT, "dist");
const VERCEL_JSON = join(ROOT, "vercel.json");

function htmlFiles(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) htmlFiles(p, out);
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

function collectInlineScriptHashes() {
  const hashes = new Map(); // hash -> { preview, count }
  const scriptRe = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  for (const file of htmlFiles(DIST)) {
    const html = readFileSync(file, "utf8");
    for (const m of html.matchAll(scriptRe)) {
      const [, attrs, body] = m;
      if (/\bsrc\s*=/i.test(attrs)) continue;
      if (/application\/ld\+json/i.test(attrs)) continue;
      const hash = `'sha256-${createHash("sha256").update(body, "utf8").digest("base64")}'`;
      const entry = hashes.get(hash) ?? {
        preview: body.trim().slice(0, 60).replace(/\s+/g, " "),
        count: 0,
      };
      entry.count += 1;
      hashes.set(hash, entry);
    }
  }
  return hashes;
}

function main() {
  const write = process.argv.includes("--write");
  const config = JSON.parse(readFileSync(VERCEL_JSON, "utf8"));
  const rule = (config.headers ?? [])
    .flatMap((h) => h.headers ?? [])
    .find((h) => h.key === "Content-Security-Policy");
  if (!rule) {
    console.error("check-csp: no Content-Security-Policy header in vercel.json");
    process.exit(1);
  }

  const directives = rule.value.split(";").map((d) => d.trim());
  const scriptIdx = directives.findIndex((d) => d.startsWith("script-src"));
  if (scriptIdx === -1) {
    console.error("check-csp: CSP header has no script-src directive");
    process.exit(1);
  }

  const built = collectInlineScriptHashes();
  const declared = new Set(
    directives[scriptIdx].match(/'sha256-[^']+'/g) ?? [],
  );
  const missing = [...built.keys()].filter((h) => !declared.has(h));
  const stale = [...declared].filter((h) => !built.has(h));

  if (write) {
    const keep = directives[scriptIdx]
      .split(/\s+/)
      .slice(1)
      .filter((src) => !src.startsWith("'sha256-"));
    directives[scriptIdx] = ["script-src", ...keep, ...[...built.keys()].sort()].join(" ");
    rule.value = directives.join("; ");
    writeFileSync(VERCEL_JSON, `${JSON.stringify(config, null, 2)}\n`);
    console.log(`check-csp: wrote ${built.size} script hashes to vercel.json`);
    return;
  }

  if (missing.length === 0 && stale.length === 0) {
    console.log(
      `check-csp: OK (${built.size} inline scripts, all hashed in vercel.json)`,
    );
    return;
  }
  for (const h of missing) {
    const { preview, count } = built.get(h);
    console.error(`check-csp: MISSING ${h} (x${count}) "${preview}..."`);
  }
  for (const h of stale) {
    console.error(`check-csp: STALE ${h} (no built script matches)`);
  }
  console.error(
    "check-csp: run `node scripts/check-csp.mjs --write` after a build to update vercel.json",
  );
  process.exit(1);
}

main();

#!/usr/bin/env node
/**
 * Validate every internal link in the built site.
 *
 * Walks dist/**\/*.html and checks each internal <a href> against the files
 * Astro actually emitted: page links must resolve to a built HTML file or
 * static asset, and #fragments must match an id on the target page. External
 * links (http, mailto, ...) are out of scope; a checker that hits the network
 * is flaky in CI and belongs in a scheduled job, not the build gate.
 *
 *   node scripts/check-links.mjs   verify (exit 1 on broken links)
 *
 * Run after `astro build`; there is nothing to check before dist/ exists.
 */

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const DIST = join(ROOT, "dist");

function htmlFiles(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) htmlFiles(p, out);
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

/** dist/docs/alert/index.html -> /docs/alert/ */
function urlPathOf(file) {
  const rel = file.slice(DIST.length).replace(/\\/g, "/");
  if (rel.endsWith("/index.html")) return rel.slice(0, -"index.html".length);
  return rel;
}

/** /docs/alert/ or /docs/alert -> the built HTML file, or null */
function pageFileFor(pathname) {
  const clean = pathname.replace(/\/+$/, "");
  const candidates = clean
    ? [join(DIST, clean, "index.html"), join(DIST, `${clean}.html`)]
    : [join(DIST, "index.html")];
  return candidates.find((f) => existsSync(f)) ?? null;
}

function decodeEntities(s) {
  return s
    .replaceAll("&amp;", "&")
    .replaceAll("&#38;", "&")
    .replaceAll("&#x26;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
}

function idsIn(html) {
  const ids = new Set();
  for (const m of html.matchAll(/\bid\s*=\s*("([^"]*)"|'([^']*)')/gi)) {
    ids.add(decodeEntities(m[2] ?? m[3]));
  }
  return ids;
}

function hrefsIn(html) {
  const hrefs = [];
  for (const m of html.matchAll(/<a\b[^>]*\bhref\s*=\s*("([^"]*)"|'([^']*)')/gi)) {
    hrefs.push(decodeEntities(m[2] ?? m[3]));
  }
  return hrefs;
}

function main() {
  if (!existsSync(DIST)) {
    console.error("check-links: dist/ not found; run `astro build` first");
    process.exit(1);
  }

  const files = htmlFiles(DIST);
  const idCache = new Map(); // html file -> Set of ids
  const idsOf = (file) => {
    if (!idCache.has(file)) idCache.set(file, idsIn(readFileSync(file, "utf8")));
    return idCache.get(file);
  };

  const broken = [];
  let checked = 0;
  for (const file of files) {
    const pagePath = urlPathOf(file);
    for (const raw of hrefsIn(readFileSync(file, "utf8"))) {
      // Only same-site navigation is checkable against dist/.
      if (/^[a-z][a-z0-9+.-]*:/i.test(raw) || raw.startsWith("//")) continue;
      checked += 1;

      const [withoutQuery, fragment = null] = raw.split("#", 2);
      const pathname = withoutQuery.split("?", 2)[0];

      // Same-page fragment ("#risk-matrix") or bare "#" (top of page).
      if (pathname === "") {
        if (fragment && !idsOf(file).has(decodeURIComponent(fragment))) {
          broken.push(`${pagePath} -> ${raw} (no id "${fragment}" on this page)`);
        }
        continue;
      }

      if (!pathname.startsWith("/")) {
        broken.push(`${pagePath} -> ${raw} (relative link; use a root-relative path)`);
        continue;
      }

      const target = pageFileFor(pathname);
      if (!target) {
        // Not a page: accept any static asset that exists in dist/.
        if (!existsSync(join(DIST, pathname))) {
          broken.push(`${pagePath} -> ${raw} (no such page or file in dist)`);
        }
        continue;
      }
      if (fragment && !idsOf(target).has(decodeURIComponent(fragment))) {
        broken.push(`${pagePath} -> ${raw} (no id "${fragment}" on target page)`);
      }
    }
  }

  if (broken.length === 0) {
    console.log(`check-links: OK (${checked} internal links across ${files.length} pages)`);
    return;
  }
  for (const b of broken.sort()) console.error(`check-links: BROKEN ${b}`);
  console.error(`check-links: ${broken.length} broken internal links`);
  process.exit(1);
}

main();

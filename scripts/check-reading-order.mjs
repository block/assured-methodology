#!/usr/bin/env node
/**
 * Assert that readingOrder in src/data/navigation.ts stays in sync with the
 * content pages under src/content/docs. readingOrder is the single source of
 * truth for the prev/next pager in ContentPageLayout, so a page missing from
 * it silently ships with no pager and a stale entry points the pager at a
 * dead route. Runs before `astro build` in the build chain so drift fails
 * fast in CI.
 *
 * Route derivation mirrors the glob loader ids that
 * src/pages/docs/[...slug].astro turns into routes: the file path relative
 * to src/content/docs without the .mdx extension, with a trailing "/index"
 * collapsed, unless the frontmatter declares a `slug` override (chapter
 * index pages). The loader also github-slugs each path segment; filenames
 * here are already lowercase kebab-case, so lowercasing is a faithful
 * mirror.
 *
 * Checks:
 *   1. Every content page route is in readingOrder or on the exempt list.
 *   2. Every readingOrder entry resolves to a real content page.
 *   3. readingOrder has no duplicate entries.
 *   4. Exempt routes still exist and are not also in readingOrder, so the
 *      exempt list itself cannot go stale.
 *
 * Exit codes: 0 in sync, 1 drift found.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const DOCS_DIR = join(ROOT, "src/content/docs");
const NAVIGATION = join(ROOT, "src/data/navigation.ts");

// Pages deliberately outside the linear reading arc; they render no pager.
// Routes are listed explicitly so that adding another page outside the arc
// is a conscious decision here, not something a directory-wide rule absorbs.
const EXEMPT_ROUTES = new Set([
  "/docs/glossaries/bad/",
  "/docs/glossaries/cat/",
  "/docs/glossaries/clear/",
]);

function* mdxFiles(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* mdxFiles(p);
    else if (name.endsWith(".mdx")) yield p;
  }
}

/** Mirrors the glob loader's generateId, then wraps it in the /docs/ route. */
function routeForFile(file) {
  const src = readFileSync(file, "utf8");
  const frontmatter = src.match(/^---\n([\s\S]*?)\n---/);
  const slugOverride = frontmatter?.[1].match(
    /^slug:\s*["']?([^"'\n]+)["']?\s*$/m,
  );
  if (slugOverride) return `/docs/${slugOverride[1]}/`;
  const id = relative(DOCS_DIR, file)
    .replace(/\.mdx$/, "")
    .split(sep)
    .map((segment) => segment.toLowerCase())
    .join("/")
    .replace(/\/index$/, "");
  return `/docs/${id}/`;
}

function loadReadingOrder() {
  const src = readFileSync(NAVIGATION, "utf8");
  const block = src.match(/export const readingOrder[^=]*= \[([\s\S]*?)\];/);
  if (!block) return null;
  return [...block[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
}

const readingOrder = loadReadingOrder();
if (!readingOrder || readingOrder.length === 0) {
  console.error(
    "check-reading-order: failed to parse readingOrder from navigation.ts",
  );
  process.exit(1);
}

const failures = [];

const routeToFile = new Map();
for (const file of mdxFiles(DOCS_DIR)) {
  const route = routeForFile(file);
  const rel = file.replace(ROOT, "");
  if (routeToFile.has(route)) {
    failures.push(
      `route ${route} is produced by both ${routeToFile.get(route)} and ${rel}`,
    );
  } else {
    routeToFile.set(route, rel);
  }
}

const orderSet = new Set(readingOrder);

const seen = new Set();
for (const route of readingOrder) {
  if (seen.has(route)) {
    failures.push(`readingOrder lists ${route} more than once`);
  }
  seen.add(route);
  if (!routeToFile.has(route)) {
    failures.push(
      `readingOrder entry ${route} has no content page under src/content/docs`,
    );
  }
}

for (const [route, file] of routeToFile) {
  if (!orderSet.has(route) && !EXEMPT_ROUTES.has(route)) {
    failures.push(
      `${file} (${route}) is neither in readingOrder nor exempt, so it would ship without a prev/next pager`,
    );
  }
}

for (const route of EXEMPT_ROUTES) {
  if (!routeToFile.has(route)) {
    failures.push(
      `exempt route ${route} has no content page; update EXEMPT_ROUTES in scripts/check-reading-order.mjs`,
    );
  }
  if (orderSet.has(route)) {
    failures.push(
      `exempt route ${route} is also in readingOrder; it cannot be both exempt and in the linear arc`,
    );
  }
}

if (failures.length > 0) {
  console.error(
    `check-reading-order: ${failures.length} mismatch(es) between src/content/docs and readingOrder in src/data/navigation.ts:\n`,
  );
  for (const f of failures) {
    console.error(`  ${f}`);
  }
  process.exit(1);
}

console.log(
  `check-reading-order: OK. ${readingOrder.length} readingOrder entries cover ${routeToFile.size} content pages (${EXEMPT_ROUTES.size} exempt).`,
);

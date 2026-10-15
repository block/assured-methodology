#!/usr/bin/env node
/**
 * Assert that the pager sequences in src/data/navigation.ts (readingOrder
 * and groupSequences) stay in sync with the content pages under
 * src/content/docs. They are the single source of truth for the prev/next
 * pager in ContentPageLayout, so a page missing from them silently ships
 * with no pager and a stale entry points the pager at a dead route. Runs before `astro build` in the build chain so drift fails
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
 *   1. Every content page route is in exactly one pager sequence (the
 *      learner spine `readingOrder`, or one of `groupSequences`) or on the
 *      exempt list.
 *   2. Every sequence entry resolves to a real content page.
 *   3. No sequence has duplicate entries, and no page is in two sequences.
 *   4. Exempt routes still exist and are not also in a sequence, so the
 *      exempt list itself cannot go stale.
 *   5. Every href in the primary navigation resolves to a content page.
 *   6. Each readingOrder page's end-of-page call to action points at the
 *      next readingOrder route, so the button a reader follows and the pager
 *      agree. The end CTA is the last <ContinueCard nextHref>, or else the
 *      last primary `assured-cta` link (no `assured-cta--*` modifier) in the
 *      page's last `*-cta` block; a #fragment is ignored. Pages with no end
 *      CTA and the final readingOrder entry are skipped.
 *   7. A chapter's transition page never comes after its quiz in
 *      readingOrder: the transition sets up the next chapter, so placing it
 *      after the quiz breaks the chapter's close.
 *
 * Advisory (prints, never fails): a quoted phrase (8 to 80 characters) in a
 * chapter-quiz key label or explanation that appears on no page up to and
 * including the quiz, only on later readingOrder pages, is flagged as a
 * likely forward reference the learner has not read yet.
 *
 * Exit codes: 0 in sync, 1 drift found.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { isChapterQuiz, parseQuizzes } from "./check-quiz-balance.mjs";

const ROOT = new URL("..", import.meta.url).pathname;
const DOCS_DIR = join(ROOT, "src/content/docs");

// navigation.ts is imported directly (Node 24 strips its erasable types), so
// this script checks the same arrays the layout renders, not a regex parse
// of the file. Silence only the one-time "module type not specified"
// notice that importing a .ts file from a package without "type" prints.
const emitWarning = process.emitWarning;
process.emitWarning = (warning, ...rest) => {
  const text = typeof warning === "string" ? warning : (warning?.message ?? "");
  if (
    /MODULE_TYPELESS_PACKAGE_JSON|Reparsing as ES module|is not specified/.test(
      text,
    ) ||
    rest.some(
      (r) =>
        r === "MODULE_TYPELESS_PACKAGE_JSON" ||
        r?.code === "MODULE_TYPELESS_PACKAGE_JSON",
    )
  )
    return;
  return emitWarning.call(process, warning, ...rest);
};
const { readingOrder, groupSequences } = await import(
  new URL("../src/data/navigation.ts", import.meta.url).href
);
process.emitWarning = emitWarning;

// Pages deliberately outside every pager sequence; they render no pager.
// Routes are listed explicitly so that adding another page outside the arc
// is a conscious decision here, not something a directory-wide rule absorbs.
const EXEMPT_ROUTES = new Set([
  // Hubs: entry points reached from the header, not stops on a pager.
  "/docs/start/",
  "/docs/method/",
  "/docs/operate/",
  "/docs/field-reference/",
  "/docs/teach/",
  "/docs/about/",
  // Site policy page: linked from the About hub and footer, not a stop on
  // the About pager.
  "/docs/about/accessibility/",
  // Case files (Method group): read case by case, not in sequence.
  "/docs/cases/",
  "/docs/cases/case-d/",
  // Field reference: look-up pages reached from the hub and from the
  // chapters that cite them.
  "/docs/glossaries/assured/",
  "/docs/glossaries/bad/",
  "/docs/glossaries/cat/",
  "/docs/glossaries/clear/",
  "/docs/glossaries/acronyms/",
  "/docs/alert/parsing/multi-format/",
  "/docs/alert/parsing/command-line/",
  "/docs/alert/parsing/process-relationships/",
  "/docs/alert/parsing/network/",
  "/docs/alert/parsing/file-system/",
  "/docs/alert/parsing/cloud-identity/",
  "/docs/alert/validation/attack-chains/",
  "/docs/field-reference/telemetry-sources/",
  "/docs/field-reference/tool-families/",
  "/docs/reference/identity-sweep/",
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

if (!Array.isArray(readingOrder) || readingOrder.length === 0) {
  console.error(
    "check-reading-order: readingOrder from src/data/navigation.ts is empty or missing",
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

// Every pager sequence: the learner spine plus the group-local sequences.
const sequences = [
  ["readingOrder", readingOrder],
  ...Object.entries(groupSequences ?? {}).map(([name, order]) => [
    `groupSequences["${name}"]`,
    order,
  ]),
];

// Which sequence claims each route; a route may belong to only one.
const owner = new Map();
for (const [name, order] of sequences) {
  const seen = new Set();
  for (const route of order) {
    if (seen.has(route)) failures.push(`${name} lists ${route} more than once`);
    seen.add(route);
    if (owner.has(route) && owner.get(route) !== name) {
      failures.push(
        `${route} is in both ${owner.get(route)} and ${name}; a page has one pager`,
      );
    }
    owner.set(route, name);
    if (!routeToFile.has(route)) {
      failures.push(
        `${name} entry ${route} has no content page under src/content/docs`,
      );
    }
  }
}

for (const [route, file] of routeToFile) {
  if (!owner.has(route) && !EXEMPT_ROUTES.has(route)) {
    failures.push(
      `${file} (${route}) is in no pager sequence and not exempt; add it to readingOrder or groupSequences in src/data/navigation.ts, or to EXEMPT_ROUTES here`,
    );
  }
}

for (const route of EXEMPT_ROUTES) {
  if (!routeToFile.has(route)) {
    failures.push(
      `exempt route ${route} has no content page; update EXEMPT_ROUTES in scripts/check-reading-order.mjs`,
    );
  }
  if (owner.has(route)) {
    failures.push(
      `exempt route ${route} is also in ${owner.get(route)}; it cannot be both exempt and in a pager sequence`,
    );
  }
}

// Navigation must not point at pages that do not exist. Hub-anchor entries
// ("/docs/field-reference/#reading-telemetry") are checked by their path.
const { primaryNavigation, quickReference } = await import(
  new URL("../src/data/navigation.ts", import.meta.url).href
);
const navHrefs = [];
(function collect(items) {
  for (const item of items) {
    navHrefs.push(item.href);
    if (item.children) collect(item.children);
  }
})([...primaryNavigation, quickReference]);
for (const href of navHrefs) {
  const path = href.split("#")[0];
  if (!routeToFile.has(path)) {
    failures.push(`navigation.ts links ${href}, which has no content page`);
  }
}

// 6. End CTA agrees with the pager.
const pageSource = (route) => {
  const file = routeToFile.get(route);
  return file ? readFileSync(join(ROOT, file), "utf8") : null;
};
function endCta(src) {
  const cards = [
    ...src.matchAll(/<ContinueCard\b[^>]*?\bnextHref=["']([^"']+)["']/g),
  ];
  if (cards.length > 0) return cards.at(-1)[1];
  const blocks = [
    ...src.matchAll(/<div class="[a-z0-9-]*-cta">([\s\S]*?)<\/div>/g),
  ];
  const block = blocks.at(-1);
  if (!block) return null;
  const primary = [...block[1].matchAll(/<a\s[^>]*>/g)]
    .map((m) => m[0])
    .filter((tag) => {
      const classes =
        tag.match(/class=["']([^"']*)["']/)?.[1]?.split(/\s+/) ?? [];
      return (
        classes.includes("assured-cta") &&
        !classes.some((c) => c.startsWith("assured-cta--"))
      );
    });
  return primary.at(-1)?.match(/href=["']([^"']+)["']/)?.[1] ?? null;
}
for (let i = 0; i < readingOrder.length - 1; i++) {
  const route = readingOrder[i];
  const src = pageSource(route);
  if (!src) continue;
  const href = endCta(src);
  if (!href) continue;
  const target = href.split("#")[0];
  if (target !== readingOrder[i + 1]) {
    failures.push(
      `${routeToFile.get(route)} ends with a call to action to ${href}, but the next readingOrder page is ${readingOrder[i + 1]}; point the CTA at the next page or reorder readingOrder`,
    );
  }
}

// 7. Transition before quiz within each chapter.
const position = new Map(readingOrder.map((r, i) => [r, i]));
for (const route of readingOrder) {
  const m = route.match(/^\/docs\/([^/]+)\/transition\/$/);
  if (!m) continue;
  const quiz = `/docs/${m[1]}/quiz/`;
  if (position.has(quiz) && position.get(route) > position.get(quiz)) {
    failures.push(
      `readingOrder puts ${route} after ${quiz}; a chapter's transition comes before its quiz`,
    );
  }
}

// Advisory: quiz keys that quote text the learner has not reached yet.
const normalize = (text) =>
  text
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\s+/g, " ")
    .toLowerCase();
const normalizedPages = readingOrder.map((route) => {
  const src = pageSource(route);
  return src ? normalize(src) : "";
});
const forwardRefs = [];
for (const [i, route] of readingOrder.entries()) {
  const file = routeToFile.get(route);
  if (!file || !isChapterQuiz(file)) continue;
  for (const quiz of parseQuizzes(pageSource(route), file)) {
    for (const item of quiz.items) {
      if (!Array.isArray(item.options)) continue;
      const key = item.options.find((o) => o?.value === item.answer);
      const text = `${key?.label ?? ""} ${key?.why ?? ""} ${item.explanation ?? ""}`;
      for (const q of text.matchAll(
        /[\u201C"]([^\u201C\u201D"]{8,80})[\u201D"]/g,
      )) {
        const phrase = normalize(q[1]).trim();
        if (normalizedPages.slice(0, i).some((p) => p.includes(phrase)))
          continue;
        const later = normalizedPages.findIndex(
          (p, j) => j > i && p.includes(phrase),
        );
        if (later > i) {
          forwardRefs.push(
            `${file}:${item.line} quotes "${q[1]}", which first appears at ${readingOrder[later]}, after the quiz`,
          );
        }
      }
    }
  }
}
for (const w of forwardRefs)
  console.warn(`check-reading-order: advisory: ${w}`);

if (failures.length > 0) {
  console.error(
    `check-reading-order: ${failures.length} mismatch(es) between src/content/docs and src/data/navigation.ts:\n`,
  );
  for (const f of failures) {
    console.error(`  ${f}`);
  }
  process.exit(1);
}

const grouped = sequences.slice(1).reduce((n, [, o]) => n + o.length, 0);
console.log(
  `check-reading-order: OK. ${readingOrder.length} readingOrder entries and ${grouped} group-sequence entries cover ${routeToFile.size} content pages (${EXEMPT_ROUTES.size} exempt); ${navHrefs.length} navigation links resolve.`,
);

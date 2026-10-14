#!/usr/bin/env node
/**
 * Print page-count check for the desk card. /docs/reference is designed to
 * print as a one- or two-page card (src/styles/print.css plus the page's own
 * @media print block in src/styles/pages/root.css). Every new block on the
 * page costs paper, so this check prints the built page to PDF at US Letter
 * and A4 in headless Chromium and fails when either runs past MAX_PAGES.
 *
 * Needs a built dist/ (pnpm build) and a Playwright Chromium
 * (`pnpm exec playwright install chromium`), so it is not part of the
 * default build chain; run it with `pnpm check:print` or as a CI step after
 * the build, next to the browser smoke tests.
 *
 *   node scripts/check-print-pages.mjs              # /docs/reference/
 *   node scripts/check-print-pages.mjs /docs/x/     # another route
 *
 * Exit codes: 0 within budget, 1 over budget, 2 setup problem (no dist/,
 * no browser).
 */

import { existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const DIST = join(ROOT, "dist");
const MAX_PAGES = 2;
const FORMATS = ["Letter", "A4"];
const route = process.argv[2] ?? "/docs/reference/";

const setup = (msg) => {
  console.error(`check-print-pages: ${msg}`);
  process.exit(2);
};

if (!existsSync(join(DIST, "index.html")))
  setup("dist/ not found; run pnpm build first");

let chromium;
try {
  ({ chromium } = await import("@playwright/test"));
} catch {
  setup("@playwright/test is not installed");
}

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
};

// Minimal static server for dist/: the built pages use root-absolute asset
// URLs, so file:// would load them without styles.
const server = createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file = normalize(join(DIST, path));
  if (!file.startsWith(DIST)) {
    res.writeHead(403).end();
    return;
  }
  if (existsSync(file) && statSync(file).isDirectory())
    file = join(file, "index.html");
  if (!existsSync(file)) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, {
    "content-type": TYPES[extname(file)] ?? "application/octet-stream",
  });
  res.end(readFileSync(file));
});
await new Promise((ok) => server.listen(0, "127.0.0.1", ok));
const base = `http://127.0.0.1:${server.address().port}`;

let browser;
try {
  // PRINT_BROWSER_CHANNEL=chrome uses an installed Google Chrome instead of
  // Playwright's bundled Chromium (handy locally).
  browser = await chromium.launch(
    process.env.PRINT_BROWSER_CHANNEL
      ? { channel: process.env.PRINT_BROWSER_CHANNEL }
      : {},
  );
} catch (err) {
  server.close();
  setup(
    `could not launch Chromium (${err.message.split("\n")[0]}); run pnpm exec playwright install chromium`,
  );
}

// Page objects in Chromium's PDF output: "/Type /Page" (not "/Pages").
const countPages = (pdf) =>
  (pdf.toString("latin1").match(/\/Type\s*\/Page(?![s\w])/g) ?? []).length;

const rows = [];
let over = 0;
try {
  const page = await browser.newPage();
  const resp = await page.goto(base + route, { waitUntil: "networkidle" });
  if (!resp?.ok()) {
    throw new Error(
      `${route} returned ${resp ? resp.status() : "no response"}`,
    );
  }
  await page.emulateMedia({ media: "print" });
  for (const format of FORMATS) {
    // preferCSSPageSize: false so @page margins apply but the paper size is
    // the one under test.
    const pdf = await page.pdf({ format, preferCSSPageSize: false });
    const n = countPages(pdf);
    const ok = n >= 1 && n <= MAX_PAGES;
    if (!ok) over++;
    rows.push(`${ok ? "ok  " : "FAIL"} ${route} at ${format}: ${n} page(s)`);
  }
} catch (err) {
  await browser.close();
  server.close();
  setup(err.message);
}
await browser.close();
server.close();

console.log(rows.join("\n"));
if (over > 0) {
  console.error(
    `check-print-pages: ${route} prints past ${MAX_PAGES} page(s); tighten its print rules or move content off the card.`,
  );
  process.exit(1);
}
console.log(
  `check-print-pages: OK (${route} fits ${MAX_PAGES} page(s) at ${FORMATS.join(" and ")})`,
);

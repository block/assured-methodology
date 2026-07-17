#!/usr/bin/env node
/**
 * Computed-contrast regression fixture. The failure class it guards is
 * small-text colors composited over the site's translucent panels at the
 * two extremes of the body gradient: states Lighthouse only catches on
 * whichever pages/states a run happens to visit. This check recomputes
 * every guarded surface from the current source colors on every build.
 *
 * Method (matches WCAG 2.2 and Lighthouse's flattening): sRGB relative
 * luminance per spec; translucent layers flattened with source-over
 * compositing in gamma space; ratio = (L1 + 0.05) / (L2 + 0.05). Each
 * surface is checked over BOTH gradient extremes (#334155 light end,
 * #0f172a dark end) and, where a hover tint exists, through it too.
 *
 * Colors are parsed from the source files, not hardcoded: editing a color
 * re-runs the math against the new value, and a refactor that moves a
 * selector fails loudly instead of silently skipping the check.
 *
 * Exit codes: 0 all surfaces >= 4.5:1, 1 failure (names the surface).
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const THRESHOLD = 4.5;

// Body gradient extremes behind every guarded panel.
const GRADIENT_ENDS = { "light end #334155": hex("#334155"), "dark end #0f172a": hex("#0f172a") };
// Translucent panel shared by EvasionPattern, SubPageHero, and pillar cards.
const PANEL = { rgb: hex("#0f172a"), a: 0.55 };
// EvasionPattern summary hover tint.
const HOVER = { rgb: hex("#f8fafc"), a: 0.03 };

function hex(h) {
  const s = h.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16));
}

// Source-over composite of {rgb, a} onto an opaque background.
function over(bg, layer) {
  return bg.map((c, i) => Math.round(layer.rgb[i] * layer.a + c * (1 - layer.a)));
}

function luminance(rgb) {
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(fg, bg) {
  const [l1, l2] = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
  return (l1 + 0.05) / (l2 + 0.05);
}

function read(rel) {
  return readFileSync(join(ROOT, rel), "utf8");
}

function must(match, what, file) {
  if (!match) {
    console.error(`check-contrast: PARSE FAILURE: could not find ${what} in ${file}; the fixture no longer matches the source. Update scripts/check-contrast.mjs alongside the refactor.`);
    process.exit(1);
  }
  return match;
}

let failures = 0;
const rows = [];

function check(label, fgRGBA, layers) {
  for (const [endName, end] of Object.entries(GRADIENT_ENDS)) {
    let bg = end;
    for (const layer of layers) bg = over(bg, layer);
    // Translucent text composites onto its own background before measuring.
    const fg = fgRGBA.a < 1 ? over(bg, { rgb: fgRGBA.rgb, a: fgRGBA.a }) : fgRGBA.rgb;
    const r = ratio(fg, bg);
    rows.push(`${r >= THRESHOLD ? "ok " : "FAIL"} ${r.toFixed(2).padStart(5)}  ${label} @ ${endName}`);
    if (r < THRESHOLD) failures++;
  }
}

// ---- EvasionPattern: open-state title + toggle use --accent-text
// over the panel; also checked through the summary hover tint. The closed
// title color is checked too (same surface).
{
  const file = "src/components/assured/EvasionPattern.astro";
  const src = read(file);
  const patterns = [...src.matchAll(/\.evasion--(\w+)\s*{[^}]*--accent-text:\s*(#[0-9a-fA-F]{6})/g)];
  must(patterns.length === 4 ? patterns : null, "4 per-pattern --accent-text declarations", file);
  const closed = must(src.match(/\.evasion__title\s*{[^}]*color:\s*(#[0-9a-fA-F]{6})/), ".evasion__title closed-state color", file);
  must(/\.evasion\[open\] \.evasion__title\s*{[^}]*color:\s*var\(--accent-text/.test(src) ? true : null, "open-state title wired to --accent-text", file);
  for (const [, name, color] of patterns) {
    check(`evasion --accent-text (${name}) ${color}`, { rgb: hex(color), a: 1 }, [PANEL]);
    check(`evasion --accent-text (${name}) ${color} +hover`, { rgb: hex(color), a: 1 }, [PANEL, HOVER]);
  }
  check(`evasion closed title ${closed[1]}`, { rgb: hex(closed[1]), a: 1 }, [PANEL]);
}

// ---- SubPageHero: pillar-chip text uses the per-phase *-soft tokens.
// Measured over the hero panel alone (the stricter reading).
{
  const heroFile = "src/components/assured/SubPageHero.astro";
  const hero = read(heroFile);
  must(/--accent-text:\s*var\(--assured-phase-\w+-soft\)/.test(hero) ? true : null, "chip --accent-text mapped to *-soft tokens", heroFile);
  const tokFile = "src/styles/assured.css";
  const tokens = [...read(tokFile).matchAll(/--assured-phase-(\w+)-soft:\s*(#[0-9a-fA-F]{6})/g)];
  must(tokens.length === 7 ? tokens : null, "7 --assured-phase-*-soft tokens", tokFile);
  for (const [, phase, color] of tokens) {
    check(`subpage-hero chip (${phase}) ${color}`, { rgb: hex(color), a: 1 }, [PANEL]);
  }
}

// ---- Pillar index numbers: translucent rgba text over
// the pillar card panel on all seven phase landing pages.
for (const phase of ["alert", "subject", "scope", "uncover", "risk", "escalation", "documentation"]) {
  const file = `src/content/docs/${phase}/index.mdx`;
  const m = must(read(file).match(/\.pillar__num\s*{[^}]*color:\s*rgba\(\s*(\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\s*\)/), ".pillar__num rgba color", file);
  check(`pillar__num (${phase}) rgba(${m[1]},${m[2]},${m[3]},${m[4]})`, { rgb: [+m[1], +m[2], +m[3]], a: +m[4] }, [PANEL]);
}

// ---- Generalized sweep: every translucent `color: rgba(...)` text
// declaration in content and component styles must clear 4.5:1 over the
// standard card panel. Past failures were all instances of this one
// pattern (accent-hued index watermarks), so the class is guarded
// wholesale. Decorative separator glyphs are exempt (SC 1.4.3 pure
// decoration) and listed explicitly so new failures cannot hide.
{
  const EXEMPT = new Set([
    "src/components/Footer.astro", // .site-footer__sep separator glyph
    "src/components/assured/PillNav.astro", // .pillnav__divider separator glyph
  ]);
  const { readdirSync, statSync } = await import("node:fs");
  function* walk(dir) {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) yield* walk(p);
      else if (/\.(mdx|astro)$/.test(name)) yield p;
    }
  }
  for (const dir of ["src/content/docs", "src/components", "src/pages", "src/layouts"]) {
    for (const p of walk(join(ROOT, dir))) {
      const rel = p.slice(ROOT.length);
      if (EXEMPT.has(rel)) continue;
      const text = readFileSync(p, "utf8");
      for (const m of text.matchAll(/(?<![-\w])color:\s*rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(0?\.\d+)\s*\)/g)) {
        const line = text.slice(0, m.index).split("\n").length;
        check(`rgba text ${rel}:${line}`, { rgb: [+m[1], +m[2], +m[3]], a: +m[4] }, [PANEL]);
      }
    }
  }
}

console.log(rows.join("\n"));
if (failures > 0) {
  console.error(`check-contrast: ${failures} surface(s) below ${THRESHOLD}:1; raise the color's contrast rather than relaxing this fixture.`);
  process.exit(1);
}
console.log(`check-contrast: OK (${rows.length} measurements >= ${THRESHOLD}:1)`);

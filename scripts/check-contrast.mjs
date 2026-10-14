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
const GRADIENT_ENDS = {
  "light end #334155": hex("#334155"),
  "dark end #0f172a": hex("#0f172a"),
};
// Translucent panel shared by EvasionPattern and SubPageHero (PillarGrid
// reads the same value from the --assured-panel token).
const PANEL = { rgb: hex("#0f172a"), a: 0.55 };
// EvasionPattern summary hover tint.
const HOVER = { rgb: hex("#f8fafc"), a: 0.03 };

function hex(h) {
  const s = h.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16));
}

// Source-over composite of {rgb, a} onto an opaque background.
function over(bg, layer) {
  return bg.map((c, i) =>
    Math.round(layer.rgb[i] * layer.a + c * (1 - layer.a)),
  );
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

const TOKENS_FILE = "src/styles/assured.css";
const TOKENS_SRC = read(TOKENS_FILE);
// Resolve a hex --assured-* custom property from assured.css.
function token(name) {
  const re = new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})\\b`);
  return must(TOKENS_SRC.match(re), `--${name} hex token`, TOKENS_FILE)[1];
}
const WHITE = { rgb: [255, 255, 255], a: 1 };

function must(match, what, file) {
  if (!match) {
    console.error(
      `check-contrast: PARSE FAILURE: could not find ${what} in ${file}; the fixture no longer matches the source. Update scripts/check-contrast.mjs alongside the refactor.`,
    );
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
    const fg =
      fgRGBA.a < 1 ? over(bg, { rgb: fgRGBA.rgb, a: fgRGBA.a }) : fgRGBA.rgb;
    const r = ratio(fg, bg);
    rows.push(
      `${r >= THRESHOLD ? "ok " : "FAIL"} ${r.toFixed(2).padStart(5)}  ${label} @ ${endName}`,
    );
    if (r < THRESHOLD) failures++;
  }
}

// ---- EvasionPattern: open-state title + toggle use --accent-text
// over the panel; also checked through the summary hover tint. The closed
// title color is checked too (same surface).
{
  const file = "src/components/assured/EvasionPattern.astro";
  const src = read(file);
  // Every pattern in the Props union must declare its own --accent-text.
  const union = must(
    src.match(/type Pattern =([^;]+);/),
    "Pattern union type",
    file,
  )[1];
  const names = [...union.matchAll(/"([\w-]+)"/g)].map((m) => m[1]);
  const patterns = [
    ...src.matchAll(
      /\.evasion--([\w-]+)\s*{[^}]*--accent-text:\s*(#[0-9a-fA-F]{6})/g,
    ),
  ];
  must(
    names.length > 0 &&
      patterns.length === names.length &&
      names.every((n) => patterns.some((p) => p[1] === n))
      ? patterns
      : null,
    `one --accent-text declaration per pattern (${names.join(", ")})`,
    file,
  );
  const closed = must(
    src.match(/\.evasion__title\s*{[^}]*color:\s*(#[0-9a-fA-F]{6})/),
    ".evasion__title closed-state color",
    file,
  );
  must(
    /\.evasion\[open\] \.evasion__title\s*{[^}]*color:\s*var\(--accent-text/.test(
      src,
    )
      ? true
      : null,
    "open-state title wired to --accent-text",
    file,
  );
  for (const [, name, color] of patterns) {
    check(
      `evasion --accent-text (${name}) ${color}`,
      { rgb: hex(color), a: 1 },
      [PANEL],
    );
    check(
      `evasion --accent-text (${name}) ${color} +hover`,
      { rgb: hex(color), a: 1 },
      [PANEL, HOVER],
    );
  }
  check(`evasion closed title ${closed[1]}`, { rgb: hex(closed[1]), a: 1 }, [
    PANEL,
  ]);
}

// ---- SubPageHero: pillar-chip text uses the per-phase *-soft tokens.
// Measured over the hero panel alone (the stricter reading).
{
  const heroFile = "src/components/assured/SubPageHero.astro";
  const hero = read(heroFile);
  must(
    /--accent-text:\s*var\(--assured-phase-\w+-soft\)/.test(hero) ? true : null,
    "chip --accent-text mapped to *-soft tokens",
    heroFile,
  );
  const tokFile = "src/styles/assured.css";
  const tokens = [
    ...read(tokFile).matchAll(
      /--assured-phase-(\w+)-soft:\s*(#[0-9a-fA-F]{6})/g,
    ),
  ];
  must(
    tokens.length === 7 ? tokens : null,
    "7 --assured-phase-*-soft tokens",
    tokFile,
  );
  for (const [, phase, color] of tokens) {
    check(`subpage-hero chip (${phase}) ${color}`, { rgb: hex(color), a: 1 }, [
      PANEL,
    ]);
  }
}

// ---- Pillar cards on the chapter indexes: PillarGrid.astro renders the
// number and the CTA in the phase's -soft token (--pg-accent-soft) over the
// card's panel token. Every phase in the component's Phase union is
// measured, so a new phase or a darker -soft shade fails here. A chapter
// index that still carries hand-written pillar markup (class="pillar__num")
// instead of the component fails too: its color would bypass this check.
{
  const file = "src/components/assured/PillarGrid.astro";
  const src = read(file);
  must(
    /--pg-accent-soft:\s*var\(--assured-phase-\$\{phase\}-soft\)/.test(src)
      ? true
      : null,
    "--pg-accent-soft mapped to the phase's -soft token",
    file,
  );
  for (const sel of ["pillar-grid__num", "pillar-grid__cta"]) {
    must(
      new RegExp(
        `\\.${sel}\\s*{[^}]*(?<![-\\w])color:\\s*var\\(--pg-accent-soft\\)`,
      ).test(src)
        ? true
        : null,
      `.${sel} color wired to --pg-accent-soft`,
      file,
    );
  }
  const panelName = must(
    src.match(/\.pillar-grid__card\s*{[^}]*background:\s*var\(--([\w-]+)\)/),
    ".pillar-grid__card background token",
    file,
  )[1];
  const panelDecl = must(
    TOKENS_SRC.match(
      new RegExp(
        `--${panelName}:\\s*rgba\\(\\s*(\\d+),\\s*(\\d+),\\s*(\\d+),\\s*([\\d.]+)\\s*\\)`,
      ),
    ),
    `--${panelName} rgba token`,
    TOKENS_FILE,
  );
  const panel = {
    rgb: [+panelDecl[1], +panelDecl[2], +panelDecl[3]],
    a: +panelDecl[4],
  };
  const union = must(
    src.match(/type Phase =([^;]+);/),
    "Phase union type",
    file,
  )[1];
  const phases = [...union.matchAll(/"([\w-]+)"/g)].map((m) => m[1]);
  must(phases.length === 7 ? true : null, "7 phases in the Phase union", file);
  for (const phase of phases) {
    const color = token(`assured-phase-${phase}-soft`);
    check(
      `pillar-grid number/cta (${phase}) ${color}`,
      { rgb: hex(color), a: 1 },
      [panel],
    );
  }
  let gridPages = 0;
  for (const phase of [
    "alert",
    "subject",
    "scope",
    "uncover",
    "risk",
    "escalation",
    "documentation",
  ]) {
    const page = `src/content/docs/${phase}/index.mdx`;
    const pageSrc = read(page);
    if (/class="pillar__num"/.test(pageSrc)) {
      rows.push(
        `FAIL   hand-written pillar cards in ${page}; render them with <PillarGrid> so this check measures them`,
      );
      failures++;
    }
    if (/<PillarGrid\b/.test(pageSrc)) gridPages++;
  }
  must(
    gridPages > 0 ? true : null,
    "at least one chapter index rendering <PillarGrid>",
    "src/content/docs/*/index.mdx",
  );
}

// ---- ChapterCard CTA ("Open chapter" link text) uses --accent-text, mapped
// per phase to the -soft tokens. Checked over the resting card (panel plus
// the 0.08 accent wash at its strongest corner) and the hover card (0.7
// panel plus the 0.18 wash).
{
  const file = "src/components/assured/ChapterCard.astro";
  const src = read(file);
  must(
    /\.chapter-card__cta\s*{[^}]*color:\s*var\(--accent-text\)/.test(src)
      ? true
      : null,
    ".chapter-card__cta color wired to --accent-text",
    file,
  );
  const maps = [
    ...src.matchAll(
      /\.chapter-card--(\w+)\s*{\s*--accent:\s*var\(--assured-phase-(\w+)\);\s*--accent-text:\s*var\(--assured-phase-(\w+)-soft\);/g,
    ),
  ];
  must(
    maps.length === 7 ? maps : null,
    "7 per-phase --accent/--accent-text mappings to -soft tokens",
    file,
  );
  for (const [, phase, base, soft] of maps) {
    const fg = { rgb: hex(token(`assured-phase-${soft}-soft`)), a: 1 };
    const wash = hex(token(`assured-phase-${base}`));
    check(`chapter-card cta (${phase}) resting`, fg, [
      PANEL,
      { rgb: wash, a: 0.08 },
    ]);
    check(`chapter-card cta (${phase}) hover`, fg, [
      { rgb: hex("#0f172a"), a: 0.7 },
      { rgb: wash, a: 0.18 },
    ]);
  }
}

// ---- QuizItem option letters. Answered states put white on the -deep
// success/danger tokens (opaque); the resting letter is --assured-text-muted
// on its translucent chip over the option button over the quiz-item panel.
{
  const file = "src/components/assured/QuizItem.astro";
  const src = read(file);
  for (const state of ["correct", "wrong"]) {
    const m = must(
      src.match(
        new RegExp(
          `\\.quiz-item__option\\.is-${state} \\.quiz-item__option-letter\\s*{[^}]*background:\\s*var\\(--(assured-[\\w-]+-deep)\\);[^}]*color:\\s*white`,
        ),
      ),
      `is-${state} letter (white on a -deep token)`,
      file,
    );
    check(`quiz letter is-${state} white on --${m[1]}`, WHITE, [
      { rgb: hex(token(m[1])), a: 1 },
    ]);
  }
  const chip = must(
    src.match(
      /\.quiz-item__option-letter\s*{[^}]*background:\s*rgba\(\s*(\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\s*\);[^}]*color:\s*var\(--([\w-]+)\)/,
    ),
    "resting option-letter chip and color",
    file,
  );
  const option = must(
    src.match(
      /\.quiz-item__option\s*{[^}]*background:\s*rgba\(15, 23, 42, ([\d.]+)\)/,
    ),
    ".quiz-item__option panel",
    file,
  );
  const fg = { rgb: hex(token(chip[5])), a: 1 };
  const chipLayer = { rgb: [+chip[1], +chip[2], +chip[3]], a: +chip[4] };
  check(`quiz letter resting --${chip[5]}`, fg, [
    PANEL,
    { rgb: hex("#0f172a"), a: +option[1] },
    chipLayer,
  ]);
}

// ---- Intro phase numbers: white numerals on an opaque two-stop gradient
// disc; both stops must clear 4.5:1.
{
  const file = "src/content/docs/intro.mdx";
  const src = read(file);
  const m = must(
    src.match(
      /\.intro-phase__num\s*{[^}]*background:\s*linear-gradient\(\s*[\d.]+deg,\s*(#[0-9a-fA-F]{6}),\s*(#[0-9a-fA-F]{6})\s*\);[^}]*color:\s*(white|#fff\b|#ffffff)/,
    ),
    ".intro-phase__num gradient with white text",
    file,
  );
  check(`intro-phase__num white on ${m[1]}`, WHITE, [{ rgb: hex(m[1]), a: 1 }]);
  check(`intro-phase__num white on ${m[2]}`, WHITE, [{ rgb: hex(m[2]), a: 1 }]);
}

// ---- Worked-example accent: --assured-example-soft text on the pink-tinted
// chips (active stepper tab, Show all toggle, Previous/Next, CaseStudy badge).
// Measured over the panel plus the strongest example tint any of those
// components paints behind text.
{
  const soft = { rgb: hex(token("assured-example-soft")), a: 1 };
  const rgbDecl = must(
    TOKENS_SRC.match(/--assured-example-rgb:\s*(\d+),\s*(\d+),\s*(\d+)/),
    "--assured-example-rgb",
    TOKENS_FILE,
  );
  let maxTint = 0;
  for (const file of [
    "src/components/assured/ExampleStepper.astro",
    "src/components/assured/CaseStudy.astro",
  ]) {
    const src = read(file);
    must(
      /color:\s*var\(--assured-example-soft\)/.test(src) ? true : null,
      "--assured-example-soft text",
      file,
    );
    for (const m of src.matchAll(
      /background:\s*rgba\(var\(--assured-example-rgb\),\s*([\d.]+)\)/g,
    ))
      maxTint = Math.max(maxTint, +m[1]);
  }
  check(`example-soft on example tint ${maxTint}`, soft, [
    PANEL,
    { rgb: [+rgbDecl[1], +rgbDecl[2], +rgbDecl[3]], a: maxTint },
  ]);
}

// ---- Base phase hues are for borders and glyphs only: as small text on the
// site's panels they measure 2.97-4.44:1. Any `color:` that names a base
// phase token (not its -soft or -deep shade) or a base phase hex fails.
// Exempt: display-size text (WCAG large text, 3:1), listed by file so a new
// use cannot hide.
{
  // Empty today. .bad-lose__text (the B.A.D. display numeral) used to be
  // listed here; its rule moved to src/styles/pages/glossary-bad.css and now
  // uses var(--assured-danger), so it no longer needs the exemption.
  const LARGE_TEXT_EXEMPT = new Set([]);
  const baseHexes = [
    ...TOKENS_SRC.matchAll(/--assured-phase-(\w+):\s*(#[0-9a-fA-F]{6})/g),
  ].map((m) => m[2].toLowerCase());
  must(
    baseHexes.length === 7 ? true : null,
    "7 base --assured-phase-* tokens",
    TOKENS_FILE,
  );
  const { readdirSync, statSync } = await import("node:fs");
  function* walk(dir) {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) yield* walk(p);
      else if (/\.(mdx|astro|css)$/.test(name)) yield p;
    }
  }
  let offenders = 0;
  for (const dir of [
    "src/content/docs",
    "src/components",
    "src/pages",
    "src/layouts",
    "src/styles",
  ]) {
    for (const p of walk(join(ROOT, dir))) {
      const rel = p.slice(ROOT.length);
      if (LARGE_TEXT_EXEMPT.has(rel)) continue;
      const text = readFileSync(p, "utf8");
      for (const m of text.matchAll(
        /(?<![-\w])color:\s*(var\(--assured-phase-(?:alert|subject|scope|uncover|risk|escalation|documentation)\)|#[0-9a-fA-F]{6}\b)/g,
      )) {
        if (m[1].startsWith("#") && !baseHexes.includes(m[1].toLowerCase()))
          continue;
        const line = text.slice(0, m.index).split("\n").length;
        rows.push(
          `FAIL   base phase hue as text: ${rel}:${line} (${m[1]}); use the -soft token`,
        );
        offenders++;
      }
    }
  }
  failures += offenders;
}

// ---- Generalized sweep: every translucent `color: rgba(...)` text
// declaration in content, component and stylesheet sources (including the
// page stylesheets under src/styles/pages) must clear 4.5:1 over the
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
      else if (/\.(mdx|astro|css)$/.test(name)) yield p;
    }
  }
  for (const dir of [
    "src/content/docs",
    "src/components",
    "src/pages",
    "src/layouts",
    "src/styles",
  ]) {
    for (const p of walk(join(ROOT, dir))) {
      const rel = p.slice(ROOT.length);
      if (EXEMPT.has(rel)) continue;
      const text = readFileSync(p, "utf8");
      for (const m of text.matchAll(
        /(?<![-\w])color:\s*rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(0?\.\d+)\s*\)/g,
      )) {
        const line = text.slice(0, m.index).split("\n").length;
        check(
          `rgba text ${rel}:${line}`,
          { rgb: [+m[1], +m[2], +m[3]], a: +m[4] },
          [PANEL],
        );
      }
    }
  }
}

console.log(rows.join("\n"));
if (failures > 0) {
  console.error(
    `check-contrast: ${failures} surface(s) below ${THRESHOLD}:1; raise the color's contrast rather than relaxing this fixture.`,
  );
  process.exit(1);
}
console.log(
  `check-contrast: OK (${rows.length} measurements >= ${THRESHOLD}:1)`,
);

#!/usr/bin/env node
/**
 * Engineering regression contracts: the component/template counterpart to
 * check-content-contracts.mjs. Each contract pins the load-bearing
 * mechanism of a deliberate fix so a later edit cannot silently
 * reintroduce the defect. Contrast math lives in check-contrast.mjs; this
 * file covers structure and provenance: deterministic ids, no-JS and print
 * fallbacks, keyboard navigation, the components that render from the
 * src/data modules (navigation.ts, priority-matrix.ts) instead of
 * hand-typed copies, and the metadata every shipped template carries.
 * Two style scans run after the contracts: reduced-motion end states for
 * animated elements that start at opacity 0 (page CSS), and raw colors in
 * MDX styles.
 *
 * `flat: true` on a contract collapses whitespace runs in the file before
 * matching, so a template prompt may wrap across lines.
 *
 * Exit codes: 0 all contracts hold, 1 violations found.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;

const CONTRACTS = [
  // deterministic-ids: Math.random() in a component frontmatter mints
  // different IDs every build, breaking the double-build byte-identity
  // gate (verified 2026-07-16: 244/244 dist files identical).
  {
    id: "deterministic-ids",
    file: "src/layouts/ContentPageLayout.astro",
    why: "astro-breadcrumbs defaults its nav id to crypto.randomUUID(); the layout must pass a deterministic one",
    mustContain: ['id={stableId("breadcrumbs", Astro.url.pathname)}'],
  },
  ...["QuizItem", "ChapterCard", "ExampleStepper", "DefineTerm"].map((c) => ({
    id: "deterministic-ids",
    file: `src/components/assured/${c}.astro`,
    why: "component IDs must come from stableId, not Math.random",
    mustContain: ["stableId("],
  })),

  // no-js-print: content reachable without JavaScript and in print.
  {
    id: "no-js-print",
    file: "src/components/assured/QuizItem.astro",
    why: "quiz explanations must render without JS; the unhide rule must sit in @layer base or Tailwind's layered [hidden]!important preflight beats it",
    mustContain: [
      "<noscript>",
      "@layer base",
      ".quiz-item__feedback[hidden] { display: block !important; }",
    ],
  },
  {
    id: "no-js-print",
    file: "src/components/assured/FlipCard.astro",
    why: "inert/aria-hidden must be applied by the bind script, never baked into server HTML (CSS cannot undo inert)",
    mustContain: ['back.toggleAttribute("inert", true)', "<noscript>"],
    mustNotContain: [
      'flip-card__face--back" inert',
      'flip-card__face--back" aria-hidden',
    ],
  },
  {
    id: "no-js-print",
    file: "src/components/assured/AnimatedPhaseDiagram.astro",
    why: "the diagram's final frame must show without IntersectionObserver",
    mustContain: ["<noscript>"],
  },
  {
    id: "no-js-print",
    file: "src/styles/print.css",
    why: "quizzes print linearized (unhide rule in @layer base, see QuizItem contract); flip cards print both faces; the diagram prints its final frame",
    mustContain: [
      ".quiz-item__feedback[hidden]",
      "@layer base",
      ".flip-card__face--back",
      ".anim-item",
    ],
  },
  {
    id: "no-js-print",
    file: "src/components/assured/ExampleStepper.astro",
    why: 'inactive steps ship hidden="until-found" so find-in-page reaches them, and the beforematch handler switches to the matched step',
    mustContain: ["until-found", "beforematch", "assured-stepper-show-all"],
  },
  {
    id: "no-js-print",
    file: "src/components/assured/EvasionPattern.astro",
    why: "closed details panels are opened for printing (and restored after)",
    mustContain: ["beforeprint", "afterprint"],
  },
  {
    id: "no-js-print",
    file: "src/layouts/BaseLayout.astro",
    why: "every closed <details> (Reveal) is opened for printing and restored after; print.css carries the ::details-content no-JS fallback",
    mustContain: [
      'querySelectorAll<HTMLDetailsElement>("details:not([open])")',
      "beforeprint",
      "afterprint",
    ],
  },
  {
    id: "no-js-print",
    file: "src/styles/print.css",
    why: "closed disclosures print without JavaScript where ::details-content is supported",
    mustContain: ["details::details-content"],
  },

  // soft-nav-teardown: ClientRouter keeps document-level listeners alive
  // across navigations, so page-scoped handlers must be torn down on swap.
  {
    id: "soft-nav-teardown",
    file: "src/layouts/BaseLayout.astro",
    why: "the glossary key handlers ('/', '?', 's') must not outlive their page; their cleanups run on astro:before-swap",
    mustContain: [
      "astro:before-swap",
      "__clearGlossaryCleanup",
      "__badGlossaryCleanup",
      "__catGlossaryCleanup",
    ],
  },

  // search-index: tooltip and navigation chrome stay out of the Pagefind index.
  {
    id: "search-index",
    file: "src/components/assured/DefineTerm.astro",
    why: "each tooltip definition is glossary text; indexing it made unrelated pages match term searches",
    mustContain: ['role="tooltip" id={panelId} data-pagefind-ignore'],
  },

  // keyboard-nav: keyboard, voice, and mobile navigation.
  {
    id: "keyboard-nav",
    file: "src/components/Header.astro",
    why: "Escape must dismiss the CSS hover/focus dropdowns",
    mustContain: ["is-dismissed", "Escape"],
  },
  {
    id: "keyboard-nav",
    file: "src/components/Header.astro",
    why: "desktop dropdowns are disclosure buttons (aria-expanded), not :focus-within reveals; Tab walked ~80 dropdown links before reaching content (now ~25 stops)",
    mustContain: [
      "data-menu-disclosure",
      'aria-expanded="false"',
      "data-disclosure-ready",
    ],
    mustNotContain: ["  .header__menu-item:focus-within .header__dropdown {"],
  },
  {
    id: "keyboard-nav",
    file: "src/components/assured/ChapterCard.astro",
    why: "the card link's accessible name must contain the visible 'Read chapter' label (WCAG 2.5.3)",
    mustContain: [
      // biome-ignore lint/suspicious/noTemplateCurlyInString: literal source text
      "aria-labelledby={`${titleId} ${ctaId}`}",
      ".chapter-card__cta::after",
    ],
  },

  {
    id: "keyboard-nav",
    file: "src/components/assured/QuizItem.astro",
    why: "the prompt labels the options group, and per-option rationales are optional data, not markup",
    mustContain: ["aria-labelledby", "why?: string", "stableId("],
  },
  {
    id: "define-term-dedupe",
    file: "src/components/assured/DefineTerm.astro",
    why: "only the first use per page in reading order stays an interactive trigger (dense pages had dozens of tab stops); `always` opts a use out",
    mustContain: ["dedupeDefineTerms(", "always?: boolean"],
  },

  // single-source: chapter chrome renders from src/data/navigation.ts, so a
  // label, question, stage or pillar is typed once.
  {
    id: "single-source-navigation",
    file: "src/components/assured/ChapterHero.astro",
    why: "letter, question, stage overline and pillars come from navigation.ts; the time chip is the Level 2 full-arc range and links to the depth ladder (D13), never an on-shift target",
    mustContain: [
      'from "@/data/navigation"',
      "phaseInfo(phase)",
      "chapterPillars(phase)",
      "timeOnTargetFor(phase)",
      'href="/docs/fast-path/"',
      "Full-arc time (Level 2)",
    ],
    mustNotContain: ["On-shift target"],
  },
  {
    id: "single-source-navigation",
    file: "src/components/assured/AnimatedPhaseDiagram.astro",
    why: "stage and phase names come from navigation.ts (Orient, Investigate, Resolve); the loop draw-in animates the mask path; the final frame shows without JS",
    mustContain: [
      'from "@/data/navigation"',
      'const stages: StageName[] = ["Orient", "Investigate", "Resolve"];',
      "anim-feedback-reveal",
      "<noscript>",
    ],
    mustNotContain: [
      "Preparation",
      "Investigation &amp; Assessment",
      "Resolution &amp; Documentation",
    ],
  },
  {
    id: "single-source-navigation",
    file: "src/components/assured/PuzzleProgress.astro",
    why: 'phase names come from navigation.ts; the accessible name is the full phase name plus " (current phase)"',
    mustContain: ['from "@/data/navigation"', '" (current phase)"'],
  },
  {
    id: "single-source-navigation",
    file: "src/components/assured/PillNav.astro",
    why: "chapter and section pills come from navigation.ts, and an unknown section fails the build instead of rendering an empty row",
    mustContain: ['from "@/data/navigation"', "throw new Error"],
  },
  {
    id: "single-source-navigation",
    file: "src/components/assured/SubPageHero.astro",
    why: "the pillar badge is derived from the page's position in navigation.ts, with companion pages labelled as such",
    mustContain: ["pillarPosition(", "Companion"],
  },
  {
    id: "single-source-navigation",
    file: "src/components/assured/ChapterCard.astro",
    why: "the card takes the phase question as data and renders its CTA whenever it links (the retired 'soon' status cannot hide a live chapter)",
    mustContain: ["question?: string", "{href && ("],
    mustNotContain: ['"soon"', "status?:"],
  },

  // single-source: the matrix, E rule, clocks and verdict enums render from
  // src/data/priority-matrix.ts; the template schemas are checked against it.
  {
    id: "single-source-matrix",
    file: "src/components/assured/PriorityMatrix.astro",
    why: "the matrix table renders from priority-matrix.ts",
    mustContain: ['from "@/data/priority-matrix"'],
  },
  {
    id: "single-source-matrix",
    file: "src/components/assured/EscalationRule.astro",
    why: "the E rule, desk-card line and clocks render from priority-matrix.ts",
    mustContain: [
      'from "@/data/priority-matrix"',
      "E_RULE",
      "DESK_CARD_E_LINE",
    ],
  },
  {
    id: "single-source-matrix",
    file: "scripts/check-template-schemas.mjs",
    why: "the vocabulary schema is checked against priority-matrix.ts, so the template enums cannot drift from the site",
    mustContain: ["src/data/priority-matrix.ts"],
  },
  {
    id: "single-source-templates",
    file: "src/content/docs/documentation/templates.mdx",
    why: "templates render through TemplateEmbed (version, download link, schema) instead of hand-wired ?raw imports",
    mustContain: ["<TemplateEmbed"],
    mustNotContain: ["?raw", 'from "astro:components"'],
  },

  // glossary-eggs: easter eggs are opt-in (default off, and off when
  // storage is unavailable). The three glossary scripts share one switch,
  // eggsEnabled() in glossary-common.ts.
  {
    id: "glossary-eggs",
    file: "src/scripts/glossary-common.ts",
    why: "glossary easter eggs default off; only an explicit 'on' enables them, and unavailable storage means off",
    mustContain: [
      'return localStorage.getItem("assured-eggs") === "on";',
      "return false;",
    ],
    mustNotContain: ['!== "off"', "!== 'off'"],
  },
  ...["bad", "cat", "clear"].map((g) => ({
    id: "glossary-eggs",
    file: `src/scripts/glossary-${g}.ts`,
    why: "each glossary reads the shared eggsEnabled() switch instead of its own storage check",
    mustContain: ["eggsEnabled"],
    mustNotContain: ["assured-eggs"],
  })),

  // template-metadata: decision and provenance metadata in shipped templates.
  {
    id: "template-metadata",
    file: "public/templates/event-report.md",
    why: "the event report opens with the decision header (verdict, priority, confidence, provenance)",
    mustContain: ["## Decision header", "Material AI use", "Prepared at (UTC)"],
  },
  {
    id: "template-metadata",
    file: "public/templates/handoff-packet.md",
    why: "the handoff packet opens with case metadata (case ID, owner, fired criterion, provenance); a downgrade is documented, never silent",
    mustContain: [
      "## Case metadata",
      "Escalation criterion met",
      "Material AI use",
      "documented downgrade",
    ],
    mustNotContain: ["documented departure"],
  },
  {
    id: "template-metadata",
    file: "public/templates/alert-report.md",
    why: "the alert report records material AI use, the intake channel, the reopen link and the key times the metrics read",
    flat: true,
    mustContain: [
      "Material AI use",
      "Reopens case",
      "Intake channel",
      "Received",
      "Decided by, at",
      "Key times",
    ],
  },
  {
    id: "template-metadata",
    file: "public/templates/pattern-close-record.md",
    why: "a Level 0 close records material AI use and the key times",
    flat: true,
    mustContain: [
      "Material AI use",
      "Key times (UTC): detected / acknowledged / verdict / closed / reopened:",
    ],
  },
  {
    id: "template-metadata",
    file: "public/templates/pattern-entry.md",
    why: "a machine-close pattern names its QA sample rate and a tested kill switch with a named owner (D6, D12)",
    flat: true,
    mustContain: [
      "QA sample rate for machine closes",
      "Kill-switch owner (named person), and the date the switch was last tested:",
    ],
  },
  {
    id: "template-metadata",
    file: "public/templates/escalation-checklist.md",
    why: "confidence is recorded beside the cell on the shared high / medium / low rubric (D5)",
    flat: true,
    mustContain: ["with confidence beside it: high / medium / low"],
  },
  {
    id: "template-metadata",
    file: "public/templates/shift-handover.md",
    why: "the shift handover carries a receipt, material AI use and confidence on the shared rubric",
    flat: true,
    mustContain: [
      "Receipt",
      "Material AI use",
      "confidence (high / medium / low, shared rubric)",
    ],
  },
  ...["case-record", "scope-boundary", "subject-summary", "tuning-request"].map(
    (t) => ({
      id: "template-metadata",
      file: `public/templates/${t}.md`,
      why: "every record template states whether AI materially shaped it",
      mustContain: ["Material AI use"],
    }),
  ),
];

// print-layer: the print unhide rules for [hidden] content must sit inside
// an @layer base block, or Tailwind's layered !important preflight wins.
const PRINT_LAYER_SELECTORS = [
  ".quiz-item__feedback[hidden]",
  ".quiz-item__why[hidden]",
  ".stepper__panels [data-step][hidden]",
];

// page-styles: page CSS lives in src/styles/pages/*.css. An inline <style>
// in an MDX page is allowed only where check-contrast.mjs reads a rule from
// the page itself (.intro-phase__num on the introduction) or the page has
// not been migrated yet (listed here so a new one is a decision, not a drift).
const INLINE_STYLE_ALLOWED = new Set([
  "src/content/docs/glossaries/acronyms.mdx",
  "src/content/docs/intro.mdx",
]);

let failures = 0;

// Math.random ban in build-time-evaluated code (deterministic-ids). Astro/MDX
// bodies and frontmatter render at build; anything random there makes the
// output nondeterministic. Client `<script>` blocks and src/scripts/* run
// in the browser and are emitted verbatim, so they stay allowed (the
// glossary easter eggs use runtime randomness deliberately).
function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (p !== join(ROOT, "src/scripts")) yield* walk(p);
    } else if (/\.(astro|ts|tsx|js|mjs|mdx)$/.test(name)) yield p;
  }
}
for (const p of walk(join(ROOT, "src"))) {
  let text = readFileSync(p, "utf8");
  if (/\.(astro|mdx)$/.test(p)) {
    text = text.replace(/<script[\s>][\s\S]*?<\/script>/g, "");
  }
  if (text.includes("Math.random")) {
    console.error(
      `check-engineering-contracts: deterministic-ids in ${p.slice(ROOT.length)}: Math.random in build-time code is banned (breaks build determinism; use src/lib/stable-id.ts)`,
    );
    failures++;
  }
}

// print-layer
{
  const file = "src/styles/print.css";
  const css = readFileSync(join(ROOT, file), "utf8");
  const layered = [];
  for (const m of css.matchAll(/@layer base\s*\{/g)) {
    let depth = 1;
    let i = m.index + m[0].length;
    for (; i < css.length && depth > 0; i++) {
      if (css[i] === "{") depth++;
      else if (css[i] === "}") depth--;
    }
    layered.push(css.slice(m.index, i));
  }
  for (const sel of PRINT_LAYER_SELECTORS) {
    if (!layered.some((block) => block.includes(sel))) {
      console.error(
        `check-engineering-contracts: no-js-print in ${file}: "${sel}" must sit inside an @layer base block (Tailwind's layered [hidden] !important beats an unlayered override)`,
      );
      failures++;
    }
  }
}

// page-styles
for (const p of walk(join(ROOT, "src/content/docs"))) {
  if (!p.endsWith(".mdx")) continue;
  const file = p.slice(ROOT.length);
  if (
    /<style[\s>{]/.test(readFileSync(p, "utf8")) &&
    !INLINE_STYLE_ALLOWED.has(file)
  ) {
    console.error(
      `check-engineering-contracts: page-styles in ${file}: move the inline <style> into src/styles/pages/*.css and import it`,
    );
    failures++;
  }
}

// reduced-motion-end-state: an illustrative animation whose element starts
// at opacity 0 and fades in is invisible to reduced-motion visitors once
// the reduced-motion block stops the animation, unless that block also
// pins it to a visible end state. Scans every page stylesheet for top-level
// rules under an "*-anim" class that set opacity: 0 and an animation, and
// requires a covering selector with a non-zero opacity inside the file's
// @media (prefers-reduced-motion: reduce) block. A covering selector names
// the same "*-anim--x" scope and a class equal to, or a variant of, the
// rule's last class (".bad-dga--3" covers ".bad-dga").
//
// RM_BASELINE recorded the gaps that predated the gate (2026-10); all of
// them now have end states and it is empty. It is a ratchet, not an
// allowance: do not add to it, give the new animation an end state.
const RM_BASELINE = new Set([]);

/** Top-level CSS rules and @media blocks, with comments removed. */
function cssBlocks(css) {
  const src = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const out = [];
  let i = 0;
  while (i < src.length) {
    const open = src.indexOf("{", i);
    if (open === -1) break;
    const head = src.slice(i, open).trim();
    let depth = 1;
    let j = open + 1;
    for (; j < src.length && depth > 0; j++) {
      if (src[j] === "{") depth++;
      else if (src[j] === "}") depth--;
    }
    out.push({ head, body: src.slice(open + 1, j - 1) });
    i = j;
  }
  return out;
}

/** Plain rules inside a block body (one level). */
const rulesIn = (body) =>
  [...body.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => ({
    selectors: m[1]
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean),
    decls: m[2],
  }));

const classesOf = (sel) => [...sel.matchAll(/\.([\w-]+)/g)].map((m) => m[1]);
const visibleOpacity = (decls) => {
  const m = decls.match(/(?:^|;|\s)opacity\s*:\s*([\d.]+)/);
  return m ? Number(m[1]) > 0 : false;
};

const rmNotes = [];
for (const name of readdirSync(join(ROOT, "src/styles/pages")).sort()) {
  if (!name.endsWith(".css")) continue;
  const file = `src/styles/pages/${name}`;
  const blocks = cssBlocks(readFileSync(join(ROOT, file), "utf8"));
  const reduced = blocks
    .filter((b) => /prefers-reduced-motion:\s*reduce/.test(b.head))
    .flatMap((b) => rulesIn(b.body))
    .filter((r) => visibleOpacity(r.decls))
    .flatMap((r) => r.selectors);
  for (const b of blocks) {
    if (b.head.startsWith("@")) continue;
    if (!/(?:^|;|\s)opacity\s*:\s*0(?![.\d])/.test(b.body)) continue;
    if (!/(?:^|;|\s)animation(?:-name)?\s*:/.test(b.body)) continue;
    for (const sel of b.head.split(",").map((x) => x.trim())) {
      const cls = classesOf(sel);
      const scope = cls.find((c) => /-anim--/.test(c));
      if (!scope) continue;
      const last = cls[cls.length - 1];
      const covered = reduced.some((r) => {
        const rc = classesOf(r);
        if (/\[class\*="[\w-]*anim"\]/.test(r) && rc.length === 0) return true;
        return (
          rc.includes(scope) &&
          rc.some((c) => c === last || c.startsWith(`${last}--`))
        );
      });
      const key = `${file} ${sel}`;
      if (covered) {
        if (RM_BASELINE.has(key))
          rmNotes.push(
            `${key} now has a reduced-motion end state; remove it from RM_BASELINE`,
          );
        continue;
      }
      if (RM_BASELINE.has(key)) continue;
      console.error(
        `check-engineering-contracts: reduced-motion-end-state in ${file}: ${sel} starts at opacity:0 and has no reduced-motion end state; reduced-motion users would see nothing`,
      );
      failures++;
    }
  }
}
for (const n of rmNotes) console.log(`check-engineering-contracts: note: ${n}`);

// raw-colors-in-mdx: page colors come from the design tokens and the page
// stylesheets, so a contrast fix lands in one place. A six-digit hex or an
// rgb()/rgba() value in a color, background or border-color declaration in
// an MDX <style> block or style attribute fails. Allowed: the rules
// check-contrast.mjs measures from the page source (.intro-phase__num on
// the introduction). SVG
// presentation attributes (fill=, stroke=) are artwork, not page styles,
// and are not scanned. RAW_COLOR_BASELINE is a shrink-only ratchet for
// pages that predate the gate; every such page is now clean, so it is empty.
const RAW_COLOR_ALLOWED_SELECTORS = [".intro-phase__num"];
const RAW_COLOR_BASELINE = {};
const RAW_COLOR_DECL =
  /(?:^|[;{\s"'])((?:background(?:-color)?|color|border-color)\s*:[^;}"']*?(?:#[0-9a-fA-F]{6}\b|rgba?\([^)]*\)))/g;
for (const p of walk(join(ROOT, "src/content"))) {
  if (!p.endsWith(".mdx")) continue;
  const file = p.slice(ROOT.length);
  const src = readFileSync(p, "utf8");
  const hits = [];
  for (const m of src.matchAll(/<style[\s>{][\s\S]*?<\/style>/g)) {
    for (const r of rulesIn(m[0].replace(/\/\*[\s\S]*?\*\//g, ""))) {
      if (
        r.selectors.every((sel) =>
          RAW_COLOR_ALLOWED_SELECTORS.some((a) => sel.includes(a)),
        )
      )
        continue;
      for (const d of r.decls.matchAll(RAW_COLOR_DECL))
        hits.push(`${r.selectors.join(", ")} { ${d[1].trim()} }`);
    }
  }
  for (const m of src.matchAll(/\bstyle=(?:"([^"]*)"|\{\{([^}]*)\}\})/g)) {
    for (const d of (m[1] ?? m[2]).matchAll(RAW_COLOR_DECL))
      hits.push(`style="${d[1].trim()}"`);
  }
  const allowed = RAW_COLOR_BASELINE[file] ?? 0;
  if (hits.length > allowed) {
    console.error(
      `check-engineering-contracts: raw-colors-in-mdx in ${file}: ${hits.length} raw color declaration(s) (baseline ${allowed}); use a design token or move the rule into src/styles/pages/*.css:\n    ${hits.join("\n    ")}`,
    );
    failures++;
  } else if (hits.length < allowed) {
    console.log(
      `check-engineering-contracts: note: ${file} has ${hits.length} raw color declaration(s), below its baseline of ${allowed}; lower RAW_COLOR_BASELINE`,
    );
  }
}
{
  // Advisory only: raw hex in page stylesheets, a migration backlog toward
  // the design tokens.
  let hex = 0;
  for (const name of readdirSync(join(ROOT, "src/styles/pages")))
    if (name.endsWith(".css"))
      hex += (
        readFileSync(join(ROOT, "src/styles/pages", name), "utf8").match(
          /#[0-9a-fA-F]{6}\b/g,
        ) ?? []
      ).length;
  console.log(
    `check-engineering-contracts: advisory: ${hex} raw six-digit hex value(s) in src/styles/pages/*.css`,
  );
}

for (const c of CONTRACTS) {
  let text;
  try {
    text = readFileSync(join(ROOT, c.file), "utf8");
    if (c.flat) text = text.replace(/\s+/g, " ");
  } catch {
    console.error(
      `check-engineering-contracts: ${c.id} MISSING FILE ${c.file}`,
    );
    failures++;
    continue;
  }
  for (const needle of c.mustContain ?? []) {
    if (!text.includes(needle)) {
      console.error(
        `check-engineering-contracts: ${c.id} in ${c.file}: expected to find "${needle}" (${c.why})`,
      );
      failures++;
    }
  }
  for (const needle of c.mustNotContain ?? []) {
    if (text.includes(needle)) {
      console.error(
        `check-engineering-contracts: ${c.id} in ${c.file}: must not contain "${needle}" (${c.why})`,
      );
      failures++;
    }
  }
}

if (failures > 0) {
  console.error(
    `check-engineering-contracts: ${failures} contract violation(s)`,
  );
  process.exit(1);
}
console.log(
  `check-engineering-contracts: OK (${CONTRACTS.length} contracts + print-layer, page-styles, reduced-motion end states, raw MDX colors and the src/ Math.random ban)`,
);

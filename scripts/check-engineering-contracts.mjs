#!/usr/bin/env node
/**
 * Engineering regression contracts: the component/template counterpart to
 * check-content-contracts.mjs. Each contract pins the load-bearing
 * mechanism of a deliberate fix so a later edit cannot silently
 * reintroduce the defect. Contrast math lives in check-contrast.mjs; this
 * file covers structure and provenance.
 *
 * Exit codes: 0 all contracts hold, 1 violations found.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
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
    mustContain: ["<noscript>", "@layer base", ".quiz-item__feedback[hidden] { display: block !important; }"],
  },
  {
    id: "no-js-print",
    file: "src/components/assured/FlipCard.astro",
    why: "inert/aria-hidden must be applied by the bind script, never baked into server HTML (CSS cannot undo inert)",
    mustContain: ['back.toggleAttribute("inert", true)', "<noscript>"],
    mustNotContain: ['flip-card__face--back" inert', 'flip-card__face--back" aria-hidden'],
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
    mustContain: [".quiz-item__feedback[hidden]", "@layer base", ".flip-card__face--back", ".anim-item"],
  },
  {
    id: "no-js-print",
    file: "src/components/assured/EvasionPattern.astro",
    why: "closed details panels are opened for printing (and restored after)",
    mustContain: ["beforeprint", "afterprint"],
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
    file: "src/components/assured/ChapterCard.astro",
    why: "the card link's accessible name must contain the visible 'Read chapter' label (WCAG 2.5.3)",
    mustContain: ["aria-labelledby={`${titleId} ${ctaId}`}", ".chapter-card__cta::after"],
  },

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
    why: "the handoff packet opens with case metadata (case ID, owner, fired criterion, provenance)",
    mustContain: ["## Case metadata", "Escalation criterion met", "Material AI use"],
  },
];

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
    console.error(`check-engineering-contracts: deterministic-ids in ${p.slice(ROOT.length)}: Math.random in build-time code is banned (breaks build determinism; use src/lib/stable-id.ts)`);
    failures++;
  }
}

for (const c of CONTRACTS) {
  let text;
  try {
    text = readFileSync(join(ROOT, c.file), "utf8");
  } catch {
    console.error(`check-engineering-contracts: ${c.id} MISSING FILE ${c.file}`);
    failures++;
    continue;
  }
  for (const needle of c.mustContain ?? []) {
    if (!text.includes(needle)) {
      console.error(`check-engineering-contracts: ${c.id} in ${c.file}: expected to find "${needle}" (${c.why})`);
      failures++;
    }
  }
  for (const needle of c.mustNotContain ?? []) {
    if (text.includes(needle)) {
      console.error(`check-engineering-contracts: ${c.id} in ${c.file}: must not contain "${needle}" (${c.why})`);
      failures++;
    }
  }
}

if (failures > 0) {
  console.error(`check-engineering-contracts: ${failures} contract violation(s)`);
  process.exit(1);
}
console.log(`check-engineering-contracts: OK (${CONTRACTS.length} contracts + src/ Math.random ban)`);

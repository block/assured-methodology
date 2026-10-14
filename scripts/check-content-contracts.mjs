#!/usr/bin/env node
/**
 * Content-contract regression checks. Each contract pins the load-bearing
 * sentence of a deliberate methodology decision so a later edit cannot
 * silently reverse it. A failure names the contract to consult before
 * changing the assertion: the contract is the decision's acceptance
 * criterion, not a style preference.
 *
 * Two kinds of contract:
 *
 * 1. Text pins (CONTRACTS below): mustContain / mustNotContain / ordered
 *    strings in one file. Used where the decision lives in prose.
 * 2. Data contracts (the check* functions further down): where a data
 *    module is the single source (src/data/priority-matrix.ts,
 *    navigation.ts, cases.ts, vendors.ts), the contract asserts the data
 *    itself and that the pages render from it, instead of pinning a copy
 *    of the sentence on every page. Node 24 strips the modules' erasable
 *    types, so they are imported directly.
 *
 * Plus site-wide scans: retired vocabulary ("break-glass rule" outside its
 * former-name pointers, "within the shift", "inconclusive"), the D8 verdict
 * enum on every record template, personal-circumstance indicators on
 * analyst-facing pages, the B.A.D. glossary's grid gates, prose punctuation
 * (no em dash, no "**Label**, text" comma splice), the age of every
 * techVerified stamp, and the README's glossary term count.
 *
 * Scope: content rules and case facts. Component, accessibility and
 * build-reproducibility rules live in check-engineering-contracts.mjs,
 * check-contrast.mjs and check-build-determinism.mjs; quiz key hygiene in
 * check-quiz-balance.mjs; reserved example names in check-reserved-names.mjs;
 * template schemas in check-template-schemas.mjs.
 *
 * Exit codes: 0 all contracts hold, 1 violations found.
 */

import { existsSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { findTags, walk } from "./lib/jsx-tags.mjs";

// Node prints a MODULE_TYPELESS_PACKAGE_JSON notice when a .ts data module
// is imported from a package without "type"; it is noise here.
const emitWarning = process.emitWarning;
process.emitWarning = (warning, ...rest) => {
  const text = typeof warning === "string" ? warning : (warning?.message ?? "");
  if (
    /MODULE_TYPELESS_PACKAGE_JSON|Reparsing as ES module|is not specified/.test(
      text,
    )
  )
    return;
  return emitWarning.call(process, warning, ...rest);
};

const ROOT = new URL("..", import.meta.url).pathname;
const DOCS = join(ROOT, "src/content/docs");
const TEMPLATES = join(ROOT, "public/templates");

const read = (rel) => readFileSync(join(ROOT, rel), "utf8");
const rel = (abs) => relative(ROOT, abs);
/** Collapse every whitespace run (line wraps in templates and MDX) to one space. */
const flat = (s) => s.replace(/\s+/g, " ");
const importData = (p) =>
  import(new URL(`../src/data/${p}`, import.meta.url).href);

/**
 * mustContain: every string must appear in the file.
 * mustNotContain: no string may appear.
 * ordered: [earlier, later] — both must appear, in that order.
 */
const CONTRACTS = [
  /* ---------------- Provenance and related work ---------------- */
  {
    id: "development-evidence",
    file: "src/content/docs/development.mdx",
    why: "the provenance page must preserve the AUSPICED history, the empirical-evidence limit, and the falsification criteria",
    mustContain: [
      "The first attempt was **AUSPICED**",
      "has not yet been evaluated through a controlled or comparative study",
      "Investigation Theory",
      "What would count against ASSURED",
      "The Analyst Mindset",
    ],
  },
  {
    id: "auspiced-expansion",
    file: "src/content/docs/development.mdx",
    why: "per the October 2023 draft, AUSPICED's E was Enrichment; it named no escalation phase",
    mustContain: ["| E | Enrichment |"],
    mustNotContain: ["| E | Escalation |"],
  },
  {
    id: "related-work-investigation-theory",
    file: "src/content/docs/positioning.mdx",
    why: "the related-work map must credit Investigation Theory and avoid a universal absence claim",
    mustContain: [
      "Investigation Theory and Chris Sanders's public work",
      "a universal claim that no other methodology exists cannot",
    ],
    mustNotContain: [
      "no widely adopted, named, freely available, public methodology specific to event triage exists",
    ],
  },
  {
    id: "related-work-current-comparators",
    file: "src/content/docs/positioning.mdx",
    why: "SANS DAIR is the nearest public comparator (free CC BY 4.0 book), and SEC450 carries its current title",
    mustContain: [
      "DAIR",
      "dynamicincidentresponse.com",
      "SEC450: AI-Enabled Security Operations: Hands-on Investigation, Detection, and Automation",
      "ISO/IEC 27035",
      "CERT/SEI",
    ],
  },
  {
    id: "standards-crosswalk",
    file: "src/content/docs/standards-mapping.mdx",
    why: "the crosswalk keeps its core rows (CSF 2.0 DE.AE-08, ISO 27001 A.5.25, the 800-61r3 Verify and Triage step) and its version pins, and never states the matrix as impact x urgency",
    mustContain: ["DE.AE-08", "A.5.25", "Verify and Triage", "version-pins"],
    mustNotContain: ["impact × urgency"],
  },
  {
    id: "homepage-promise",
    file: "src/pages/index.astro",
    why: "Uncover delivers a confidence-labeled timeline, not a root cause; the Escalation decision is close-or-escalate, not only a handoff",
    mustContain: ["confidence-labeled timeline"],
    mustNotContain: ["root cause", "Hand it off cleanly"],
  },
  {
    id: "reading-time",
    file: "src/content/docs/intro.mdx",
    why: "the reading-time claim is measured (about 9 hours straight through at 230 wpm, quizzes excluded)",
    mustContain: ["about 9 hours"],
  },

  /* ---------------- AI: drafts, governance, the admission gate (D6) ---------------- */
  {
    id: "ai-admission-gate",
    file: "src/content/docs/ai-triage.mdx",
    why: "AI use requires the admission gate before any workflow guidance; the governed tier replaces the old absolutes",
    ordered: [
      ["## Before the first prompt: the admission gate", "## The phase map"],
    ],
    mustContain: [
      '<a id="governed-automation"></a>',
      // Gate 5 closes the outbound channels a read-only assistant can use,
      // checks the tool and MCP supply chain, and requires permission-aware
      // retrieval (D6); gate 6 logs every tool call as case activity.
      "5. **Least privilege, no outbound channel:**",
      "no web fetches, rendered links or remote images",
      "tool and MCP servers inventoried",
      "retrieval limited to what the asking analyst may see",
      "prompts, retrieved context, tool calls and outputs logged as case activity",
      "No outbound channel from a session that reads the case",
    ],
    mustNotContain: ["never delegated, in any tooling generation"],
  },
  {
    id: "ai-governance",
    file: "src/content/docs/ai-governance.mdx",
    why: "accountability is never delegated; execution may be, at Level 0 parity, under the governed-automation controls",
    mustContain: [
      "Accountability is never delegated. Execution may be, at",
      "## Level 0 parity: when a machine may close",
      "## The admission gate, from the gate owner's side",
    ],
  },

  /* ---------------- Alert ---------------- */
  {
    id: "verdict-taxonomy",
    file: "src/content/docs/alert/example.mdx",
    why: "the Cursor case is a benign true positive, not a false positive",
    mustContain: ["benign true positive"],
  },
  {
    id: "case-fact-anchors",
    file: "src/content/docs/alert/example.mdx",
    why: "the replay follows the sign-in by ~16 minutes (08:47:19 to 09:03:12)",
    mustContain: ["sixteen minutes after her normal corporate sign-in"],
  },
  {
    id: "detection-taxonomy",
    file: "src/content/docs/alert/detection-mechanisms.mdx",
    why: "detection families are multi-label; the label is a prior",
    mustContain: ["plural on purpose"],
  },
  {
    id: "cloud-identity-semantics",
    file: "src/content/docs/alert/parsing/cloud-identity.mdx",
    why: "mfaAuthenticated=false is what AWS saw, not a fact about MFA",
    mustContain: ["as far as AWS saw it", "accessKeyId"],
  },
  {
    id: "phishing-credential-exposure",
    file: "src/content/docs/alert/parsing/cloud-identity.mdx",
    why: "D17: reaching the credential step of a kit makes the user credential-exposed until reset, revoke and MFA review",
    mustContain: [
      "credential-exposed until the password is reset, sessions are revoked and MFA methods are reviewed",
    ],
  },
  {
    id: "network-inference",
    file: "src/content/docs/alert/parsing/network.mdx",
    why: "containment is a criteria decision, not inevitable",
    mustNotContain: ["when, not if"],
  },

  /* ---------------- Subject (D16) ---------------- */
  {
    id: "insider-escalation",
    file: "src/content/docs/subject/insider-analysis.mdx",
    why: "confirmed harm escalates without waiting for stream agreement",
    mustContain: ["harm triggers the response"],
    mustNotContain: ["Neither stream is enough alone"],
  },
  {
    id: "insider-privacy",
    file: "src/content/docs/subject/insider-analysis.mdx",
    why: "D16: analysts record observable technical activity; HR-held context arrives only through the insider-risk route",
    mustContain: [
      "Analysts record observable technical activity",
      "HR-held context reaches the case only through the insider-risk route",
    ],
  },
  {
    id: "phishing-credential-exposure",
    file: "src/content/docs/subject/four-dimensions.mdx",
    why: "D17, as the Subject chapter states it",
    mustContain: [
      "credential-exposed until the password is reset, sessions are revoked, and MFA methods are reviewed",
    ],
  },

  /* ---------------- Scope ---------------- */
  {
    id: "regulatory-scope",
    file: "src/content/docs/scope/regulatory.mdx",
    why: "GDPR reach is Article 3's three nexus tests, routed to the DPO; awareness is a reasonable degree of certainty, not confirmation",
    mustContain: [
      "Article 3",
      "not automatically",
      "reasonable degree of certainty",
    ],
  },
  {
    id: "verdict-taxonomy",
    file: "src/content/docs/scope/regulatory.mdx",
    why: "the Cursor case is a benign true positive on every page",
    mustNotContain: ["Cursor false-positive", "Cursor false positive"],
  },
  {
    id: "california-breach-clock",
    file: "src/content/docs/scope/regulatory.mdx",
    why: "SB 446 (since 2026-01-01): 30 calendar days to notify residents; the old no-fixed-clock reading is retired",
    mustContain: ["30 calendar days", "SB 446"],
    mustNotContain: ["There is no fixed clock", "most expedient time possible"],
  },
  {
    id: "california-breach-clock",
    file: "src/content/docs/scope/clocks.mdx",
    why: "the clock card dates its law, states the California 30-day and 15-day clocks, and sends the reader to counsel",
    mustContain: [
      "Law as of",
      "30 calendar days",
      "15 calendar days",
      "within 24 hours",
      "verify with counsel",
    ],
    mustNotContain: ["There is no fixed clock", "most expedient time possible"],
  },

  /* ---------------- Uncover ---------------- */
  {
    id: "independent-evidence-close",
    file: "src/content/docs/uncover/example.mdx",
    why: "the AWS case must not close on the subject's self-attestation",
    mustContain: ["confirmed policy/control violation"],
  },
  {
    id: "independent-evidence-close",
    file: "src/content/docs/uncover/quiz.mdx",
    why: "the matching quiz item keys on the violation verdict",
    mustContain: ['answer="violation"'],
  },
  {
    id: "attack-v19",
    file: "src/content/docs/uncover/mitre.mdx",
    why: "ATT&CK v19: Stealth kept TA0005; Defense Impairment is TA0112",
    mustContain: ["The 15 tactics", "TA0112"],
  },
  {
    id: "attack-v19",
    file: "src/content/docs/uncover/example.mdx",
    why: "the finance-case cookie replay maps to T1550.004",
    mustContain: ["T1550.004"],
  },
  {
    id: "case-a-lure",
    file: "src/content/docs/uncover/example.mdx",
    why: "Case A is a paste-and-run lure: explorer.exe is the parent, delivery is T1566.002 then T1204.004, and the retired macro chain does not return",
    mustContain: ["T1566.002", "T1204.004", "explorer.exe"],
    mustNotContain: ["7zFM.exe", "winword.exe", "T1553.005", "T1059.005"],
  },
  {
    id: "stopping-rule",
    file: "src/content/docs/uncover/correlation.mdx",
    why: "a dry thread needs the four checks, not just two empty pivots",
    mustContain: [
      "Before you call a thread dry",
      "Two empty pivots plus these four checks",
    ],
  },
  {
    id: "case-fact-anchors",
    file: "src/content/docs/uncover/correlation.mdx",
    why: "the timeline demo quotes the canonical finance case",
    mustContain: ["laptop-finance-09", "09:11:41"],
    mustNotContain: ["FIN-LT-0219", "09:11:38"],
  },

  /* ---------------- Risk (D1, D5, D7) ---------------- */
  {
    id: "risk-scales",
    file: "src/content/docs/risk/framework.mdx",
    why: "unexamined evidence is low confidence, not low likelihood; exactly three overrides; a high-impact case never idles on uncertainty; the case is the unit of work",
    mustContain: [
      "Unknown is not Low",
      "Exactly three overrides",
      "High-impact case never idles on uncertainty",
      "The case, not the alert, is the unit of work",
    ],
  },
  {
    id: "risk-scales",
    file: "src/content/docs/risk/impact-likelihood.mdx",
    why: "the scale page states the same rule",
    mustContain: ["unknown is not Low"],
  },
  {
    id: "gdpr-awareness",
    file: "src/content/docs/risk/example.mdx",
    why: "the GDPR clock starts at awareness (a reasonable degree of certainty), not at a confirmed breach",
    mustNotContain: ["awareness of a confirmed breach"],
  },

  /* ---------------- Escalation decision (D2, D3, D15) ---------------- */
  {
    id: "decision-contract",
    file: "src/content/docs/escalation/criteria.mdx",
    why: "asset profile alone tightens the clock; it does not trip the escalation tripwire. Criterion 1 is confirmed malicious activity not fully contained by a control",
    mustContain: [
      "asset profile alone",
      "The escalation tripwire",
      '<span id="tripwire"></span>',
      "<EscalationRule",
    ],
  },
  {
    id: "decision-contract",
    file: "public/templates/escalation-checklist.md",
    why: "the checklist carries the same high-impact confirmation rule",
    mustContain: ["asset profile alone", "escalation tripwire"],
  },
  {
    id: "attack-v19",
    file: "public/templates/escalation-checklist.md",
    why: "the retired Defense Evasion tactic name must not resurface",
    mustContain: ["defense impairment"],
    mustNotContain: ["defense evasion", "Defense Evasion"],
  },
  {
    id: "depth-ladder",
    file: "src/content/docs/fast-path.mdx",
    why: "D10: the Level 2 trigger is plausible access by the activity under review, not reachability; D7: the case is the unit of work",
    mustContain: [
      "regulated data plausibly accessed by the activity under review",
      "the case is the unit of work",
    ],
  },

  /* ---------------- Documentation and templates (D8) ---------------- */
  {
    id: "level0-eligibility",
    file: "public/templates/pattern-close-record.md",
    why: "Level 0 closes require the provable three-check eligibility gate",
    mustContain: ["Eligibility gate", "Unknown fails the gate"],
  },
  {
    id: "level0-eligibility",
    file: "public/templates/pattern-entry.md",
    why: "the pattern library entry schema ships with the methodology",
    mustContain: ["Owner (person or team accountable"],
  },
  {
    id: "verdict-taxonomy",
    file: "public/templates/alert-report.md",
    why: "triage outcome records two axes: detection correctness x disposition",
    mustContain: ["Two axes", "benign true"],
  },
  {
    id: "suppression-tuple",
    file: "public/templates/tuning-request.md",
    why: "D11: a benign-close suppression is keyed to a tuple, never to signer and install path alone",
    mustContain: ["Never signer and install path alone"],
  },
  {
    id: "verdict-taxonomy",
    file: "src/content/docs/documentation/templates.mdx",
    why: "the template guide uses the D8 vocabulary: no 'inconclusive', no bare 'benign /' disposition",
    mustNotContain: ["inconclusive", "Inconclusive", "benign /"],
  },
  {
    id: "exercise-evidence",
    file: "src/content/docs/exercises.mdx",
    why: '"cannot determine yet" is a graded answer, not a dodge',
    mustContain: ["cannot determine yet"],
  },

  /* ---------------- Case D ---------------- */
  {
    id: "case-d-facts",
    file: "src/content/docs/cases/case-d.mdx",
    why: "Case D closes as a false positive (data) with the activity undetermined; later edits must not quietly resolve it",
    mustContain: [
      "CASE-2026-0923-004",
      "05:48:44",
      "| Verdict | Detection: false positive (data), at 08:19. Activity: undetermined, at close |",
      "**Verdict:** detection, false positive (data); activity, undetermined; status, closed.",
    ],
  },

  /* ---------------- Version ---------------- */
  {
    id: "version-display-rule",
    file: "src/data/version.ts",
    why: "the edition-vs-semver display rule stays documented at the source",
    mustContain: ["Display rule"],
  },
];

// Computed contract: the README version badge must track package.json, the
// source of truth for the released version, so the repo's front door never
// misstates which methodology version is current.
const pkgVersion = JSON.parse(read("package.json")).version;
CONTRACTS.push({
  id: "readme-version-badge",
  file: "README.md",
  why: `the README badge must show the released version (${pkgVersion} per package.json)`,
  mustContain: [`Version-${pkgVersion}-blue.svg`],
});

// Computed contract: CITATION.cff carries the version twice (top level and
// preferred-citation, which GitHub's "Cite this repository" renders when
// present). Both must match package.json so generated citations are exact.
CONTRACTS.push({
  id: "citation-version",
  file: "CITATION.cff",
  why: `both CITATION.cff version fields must be ${pkgVersion} per package.json`,
  mustContain: [`\nversion: ${pkgVersion}\n`, `\n  version: ${pkgVersion}\n`],
});

/* ------------------------------------------------------------------ */
/* Runner helpers                                                      */
/* ------------------------------------------------------------------ */

let failures = 0;
let dataContracts = 0;
const fail = (id, file, msg) => {
  console.error(`check-content-contracts: ${id} in ${file}: ${msg}`);
  failures++;
};
const warn = (id, file, msg) =>
  console.warn(`check-content-contracts: WARN ${id} in ${file}: ${msg}`);

function runTextContracts() {
  for (const c of CONTRACTS) {
    let text;
    try {
      text = read(c.file);
    } catch {
      console.error(`check-content-contracts: ${c.id} MISSING FILE ${c.file}`);
      failures++;
      continue;
    }
    for (const needle of c.mustContain ?? []) {
      if (!text.includes(needle))
        fail(c.id, c.file, `expected to find "${needle}" (${c.why})`);
    }
    for (const needle of c.mustNotContain ?? []) {
      if (text.includes(needle))
        fail(c.id, c.file, `must not contain "${needle}" (${c.why})`);
    }
    for (const [earlier, later] of c.ordered ?? []) {
      const a = text.indexOf(earlier);
      const b = text.indexOf(later);
      if (a === -1 || b === -1 || a > b)
        fail(
          c.id,
          c.file,
          `"${earlier}" must appear before "${later}" (${c.why})`,
        );
    }
  }
}

/** Drop JS/TS comments so a source note about a retired term does not count as a use. */
const stripComments = (s) =>
  s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

/**
 * Every file a reader or adopter receives as prose: docs pages, templates,
 * components, layouts, pages and data modules (comments stripped), plus
 * the README.
 */
function sitewideFiles() {
  const pick = (re) => (p) => re.test(p);
  return [
    ...walk(DOCS, pick(/\.mdx?$/)),
    ...walk(TEMPLATES, pick(/\.(md|json)$/)),
    ...walk(join(ROOT, "src/components"), pick(/\.astro$/)),
    ...walk(join(ROOT, "src/layouts"), pick(/\.astro$/)),
    ...walk(join(ROOT, "src/pages"), pick(/\.(astro|ts)$/)),
    ...walk(join(ROOT, "src/data"), pick(/\.ts$/)),
    join(ROOT, "README.md"),
  ].map((abs) => {
    const raw = readFileSync(abs, "utf8");
    return {
      file: rel(abs),
      text: /\.ts$/.test(abs) ? stripComments(raw) : raw,
    };
  });
}

/** Line number of a character offset. */
const lineAt = (s, i) => s.slice(0, i).split("\n").length;

/** GitHub-style heading slug, close enough for the hand-written headings here. */
const slug = (h) =>
  h
    .replace(/<[^>]+>/g, "")
    .replace(/\{[^}]*\}/g, "")
    .replace(/[*_`]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/ /g, "-");

/** The .mdx file behind a /docs/... route, or null. */
function docFor(route) {
  const path = route.replace(/^\/docs\/?/, "").replace(/\/$/, "");
  for (const f of [`${path}.mdx`, `${path}/index.mdx`]) {
    if (existsSync(join(DOCS, f))) return `src/content/docs/${f}`;
  }
  return null;
}

/** Does the page define this anchor (an id attribute or a heading slug)? */
function hasAnchor(text, hash) {
  if (new RegExp(`\\bid=["']${hash}["']`).test(text)) return true;
  return [...text.matchAll(/^#{2,4} (.+)$/gm)].some((m) => slug(m[1]) === hash);
}

/* ------------------------------------------------------------------ */
/* Data contract: the matrix, the E rule and the clocks (D2, D3, D8, D9) */
/* ------------------------------------------------------------------ */

async function checkPriorityMatrix() {
  const id = "priority-matrix-doctrine";
  const file = "src/data/priority-matrix.ts";
  dataContracts++;
  const pm = await importData("priority-matrix.ts");
  const eq = (what, got, want) => {
    if (JSON.stringify(got) !== JSON.stringify(want))
      fail(
        id,
        file,
        `${what} is ${JSON.stringify(got)}, doctrine says ${JSON.stringify(want)}`,
      );
  };

  eq(
    "E_RULE",
    pm.E_RULE,
    "Escalate if a criterion is confirmed or the matrix places the case at P1 or P2. At P3, keep working to the named re-score trigger, then close or escalate. Close at P4. Record the cell either way.",
  );
  eq(
    "DESK_CARD_E_LINE",
    pm.DESK_CARD_E_LINE,
    "criterion confirmed, or P1/P2 → escalate through the tier the protocol names · P3 → keep working to the named re-score trigger, then decide · P4 → documented close, a first-class verdict · either way, the reasoning goes in the record.",
  );

  // Default clocks (D9): P1 15-minute no-ack fallback; P2 acknowledged in
  // 15 minutes and escalated within 4 hours; P3 re-scored within 24 hours,
  // High/Low within hours.
  eq(
    "clockDefaults.p1NoAckFallbackMinutes",
    pm.clockDefaults.p1NoAckFallbackMinutes,
    15,
  );
  eq(
    "clockDefaults.p2AcknowledgeMinutes",
    pm.clockDefaults.p2AcknowledgeMinutes,
    15,
  );
  eq("clockDefaults.p2DecisionHours", pm.clockDefaults.p2DecisionHours, 4);
  eq("clockDefaults.p3RescoreHours", pm.clockDefaults.p3RescoreHours, 24);
  eq(
    "bandClocks (band, move, acknowledge, decision)",
    pm.bandClocks.map((b) => [b.band, b.move, b.acknowledge, b.decision]),
    [
      [
        "P1",
        "escalate",
        "Page immediately; no-ack fallback at 15 minutes",
        "Escalate immediately, warm handoff",
      ],
      ["P2", "escalate", "Within 15 minutes", "Escalate within 4 hours"],
      [
        "P3",
        "keep-working",
        "Queue",
        "Re-score within 24 hours on a named trigger (High/Low: within hours)",
      ],
      ["P4", "close", "Queue SLA", "Documented close within the queue SLA"],
    ],
  );
  if (!/adopters tune/i.test(pm.CLOCKS_ARE_DEFAULTS))
    fail(id, file, "CLOCKS_ARE_DEFAULTS must say adopters tune the clocks");

  // The matrix: Impact x Likelihood, nine cells, standard bands.
  eq(
    "matrix bands (row-major, impact H/M/L x likelihood H/M/L)",
    pm.matrixCells.map((m) => `${m.impact}/${m.likelihood}=${m.band}`),
    [
      "High/High=P1",
      "High/Medium=P2",
      "High/Low=P3",
      "Medium/High=P2",
      "Medium/Medium=P3",
      "Medium/Low=P4",
      "Low/High=P3",
      "Low/Medium=P4",
      "Low/Low=P4",
    ],
  );

  // The escalation tripwire (D3): any confirmed criterion is P1 from any
  // phase; contained-by-control never trips it; the E rule's moves.
  for (const m of pm.matrixCells) {
    const t = pm.decide({
      impact: m.impact,
      likelihood: m.likelihood,
      criterionConfirmed: true,
    });
    if (t.band !== "P1" || t.basis !== "escalation tripwire")
      fail(
        id,
        file,
        `decide(${m.impact}/${m.likelihood}, criterion confirmed) must be P1 on the escalation tripwire`,
      );
    const c = pm.decide({
      impact: m.impact,
      likelihood: m.likelihood,
      criterionConfirmed: true,
      containedByControl: true,
    });
    if (c.band !== m.band)
      fail(
        id,
        file,
        `contained-by-control at ${m.impact}/${m.likelihood} must keep the cell's band (${m.band}), not ${c.band}`,
      );
  }
  eq(
    "escalationCriteria[0].title",
    pm.escalationCriteria[0]?.title,
    "Confirmed malicious activity not fully contained by a control",
  );
  eq(
    "overrideRules names",
    pm.overrideRules.map((o) => o.name),
    ["Escalation tripwire", "High-impact clock", "De-escalation is explicit"],
  );
  if (!/High on the shared confidence rubric/.test(pm.CONFIRMED_DEFINITION))
    fail(
      id,
      file,
      "CONFIRMED_DEFINITION must define confirmed as High on the shared confidence rubric",
    );
  if (!/does not decide/.test(pm.DECISION_OWNERSHIP.risk))
    fail(
      id,
      file,
      "DECISION_OWNERSHIP.risk must say Risk recommends and does not decide (D1)",
    );

  // Verdict vocabulary (D8).
  eq(
    "DETECTION_VERDICTS",
    [...pm.DETECTION_VERDICTS],
    ["true positive", "false positive (logic)", "false positive (data)"],
  );
  eq(
    "ACTIVITY_VERDICTS",
    [...pm.ACTIVITY_VERDICTS],
    [
      "malicious",
      "policy violation",
      "authorized (benign true positive)",
      "benign-confirmed",
      "undetermined",
    ],
  );
  if (
    !pm.CASE_STATUSES.includes("merged into case") ||
    pm.ACTIVITY_VERDICTS.includes("merged into case")
  )
    fail(id, file, '"merged into case" is a status, not a disposition');

  // No rendered string from this module may carry the retired clock wording.
  const strings = JSON.stringify([
    pm.matrixCells,
    pm.bandClocks,
    pm.overrideRules,
    pm.escalationCriteria,
    pm.E_RULE,
    pm.E_RULE_CLOSE_NOTE,
    pm.E_RULE_EARLY_EXITS,
    pm.DESK_CARD_E_LINE,
    pm.TRIPWIRE_RULE,
    pm.CONTAINED_BY_CONTROL,
    pm.CONFIRMED_DEFINITION,
  ]);
  if (/within the shift/i.test(strings))
    fail(
      id,
      file,
      '"within the shift" is retired; P2 escalates within 4 hours',
    );
  if (/break-glass/i.test(strings))
    fail(
      id,
      file,
      'rendered strings say "escalation tripwire", never "break-glass"',
    );

  // Surfaces that render from the module, and the one that still copies it.
  const renderers = [
    [
      "src/content/docs/risk/framework.mdx",
      [
        "<PriorityMatrix",
        '<EscalationRule show={["rule"]}',
        '<EscalationRule show={["clocks"]}',
      ],
      ['class="matrix-grid"', 'class="clock-table"'],
    ],
    [
      "src/content/docs/escalation/criteria.mdx",
      ['<EscalationRule show={["rule"]}', '<EscalationRule show={["clocks"]}'],
      ['class="e-rule"'],
    ],
    [
      "src/content/docs/glossaries/assured.mdx",
      ['<EscalationRule show={["rule"]}', '<EscalationRule show={["clocks"]}'],
      [],
    ],
    [
      "src/content/docs/reference.mdx",
      [
        '<PriorityMatrix variant="compact"',
        '<EscalationRule show={["clocks"]}',
      ],
      [],
    ],
  ];
  for (const [f, must, mustNot] of renderers) {
    const t = read(f);
    for (const n of must)
      if (!t.includes(n))
        fail(id, f, `must render from priority-matrix.ts: expected "${n}"`);
    for (const n of mustNot)
      if (t.includes(n))
        fail(id, f, `must not hand-copy the matrix or clocks ("${n}")`);
  }
  const ref = flat(read("src/content/docs/reference.mdx"));
  if (!ref.includes(pm.DESK_CARD_E_LINE))
    fail(
      id,
      "src/content/docs/reference.mdx",
      "the desk card's Decide line must equal DESK_CARD_E_LINE in priority-matrix.ts",
    );

  // The crosswalk values appear on the glossary that teaches them.
  const assured = read("src/content/docs/glossaries/assured.mdx");
  for (const row of pm.VERDICT_CROSSWALK)
    for (const v of row.values)
      if (!assured.includes(v))
        fail(
          id,
          "src/content/docs/glossaries/assured.mdx",
          `verdict crosswalk value "${v}" (${row.platform}) missing`,
        );
}

/* ------------------------------------------------------------------ */
/* Data contract: phases, questions and stages from navigation (D14, D15) */
/* ------------------------------------------------------------------ */

async function checkNavigation() {
  const id = "chapter-navigation";
  const file = "src/data/navigation.ts";
  dataContracts++;
  const { phases } = await importData("navigation.ts");

  // Stages (D14): Orient (A, S, S) · Investigate (U, R) · Resolve (E, D).
  const stages = phases.map((p) => `${p.letter}:${p.stage}`).join(" ");
  const wantStages =
    "A:Orient S:Orient S:Orient U:Investigate R:Investigate E:Resolve D:Resolve";
  if (stages !== wantStages)
    fail(id, file, `stages are "${stages}", doctrine says "${wantStages}"`);

  // The Escalation decision chapter (D15).
  const e = phases.find((p) => p.phase === "escalation");
  if (e?.name !== "Escalation decision")
    fail(
      id,
      file,
      `escalation chapter name is "${e?.name}", must be "Escalation decision"`,
    );
  if (e?.question !== "Close or escalate, and who needs to know?")
    fail(id, file, `escalation anchor question is "${e?.question}"`);
  if (e?.href !== "/docs/escalation/")
    fail(id, file, "the escalation chapter URL stays /docs/escalation/");

  // Every chapter hero takes its letter, question and pillars from
  // navigation: the index page passes the phase and nothing that overrides them.
  for (const p of phases) {
    const f = docFor(p.href);
    if (!f) {
      fail(id, file, `no page for ${p.href}`);
      continue;
    }
    const heroes = findTags(read(f), "ChapterHero");
    if (heroes.length !== 1) {
      fail(id, f, `expected exactly one <ChapterHero>, found ${heroes.length}`);
      continue;
    }
    const props = heroes[0].props;
    if (props.phase !== p.phase)
      fail(
        id,
        f,
        `<ChapterHero phase="${props.phase}"> must be phase="${p.phase}"`,
      );
    for (const k of ["question", "letter", "pillars", "pieceNumber"])
      if (k in props)
        fail(
          id,
          f,
          `<ChapterHero> must not pass ${k}; it comes from navigation.ts`,
        );
  }
  const hero = read("src/components/assured/ChapterHero.astro");
  for (const n of [
    "Astro.props.question ?? info.question",
    "chapterPillars(phase)",
    // The overline's source text, matched literally (not a template).
    // biome-ignore lint/suspicious/noTemplateCurlyInString: literal source text
    "${info.stage} stage",
  ])
    if (!hero.includes(n))
      fail(
        id,
        "src/components/assured/ChapterHero.astro",
        `must derive from navigation.ts: expected "${n}"`,
      );

  // Surfaces that list all seven questions render them from navigation
  // (phaseInfo(...).question) or state them exactly as navigation does.
  for (const f of [
    "src/content/docs/reference.mdx",
    "src/content/docs/documentation/closure.mdx",
    "src/pages/index.astro",
  ]) {
    const t = flat(read(f));
    for (const p of phases)
      if (
        !t.includes(p.question) &&
        !t.includes(`phaseInfo("${p.phase}").question`)
      )
        fail(
          id,
          f,
          `${p.name}'s anchor question must come from navigation.ts ("${p.question}")`,
        );
  }

  // Retired chapter question and stage labels, site-wide.
  const retired = [
    [
      "Who needs to know, and with what context?",
      'the Escalation decision\'s question is now "Close or escalate, and who needs to know?"',
    ],
    ["Preparation & Context", "stages are Orient, Investigate and Resolve"],
    ["Preparation &amp; Context", "stages are Orient, Investigate and Resolve"],
    ["Preparation and Context", "stages are Orient, Investigate and Resolve"],
    [
      "Investigation &amp; Assessment",
      "stages are Orient, Investigate and Resolve",
    ],
    [
      "Investigation and Assessment",
      "stages are Orient, Investigate and Resolve",
    ],
    [
      "Resolution &amp; Documentation",
      "stages are Orient, Investigate and Resolve",
    ],
    [
      "Resolution and Documentation",
      "stages are Orient, Investigate and Resolve",
    ],
  ];
  for (const { file: f, text } of sitewideFiles()) {
    for (const [needle, why] of retired)
      if (text.includes(needle))
        fail(id, f, `must not contain "${needle}" (${why})`);
  }
}

/* ------------------------------------------------------------------ */
/* Data contract: the case files (cases.ts)                           */
/* ------------------------------------------------------------------ */

async function checkCases() {
  const id = "case-files";
  const file = "src/data/cases.ts";
  dataContracts++;
  const pm = await importData("priority-matrix.ts");
  const { cases } = await importData("cases.ts");
  const keys = cases.map((c) => c.key).join("");
  if (keys !== "ABCD")
    fail(id, file, `cases are ${keys}, expected A, B, C and D`);

  const escalationExample = read("src/content/docs/escalation/example.mdx");
  for (const c of cases) {
    const where = `${file} (${c.label})`;
    if (!pm.DETECTION_VERDICTS.includes(c.verdict.detection))
      fail(
        id,
        where,
        `detection verdict "${c.verdict.detection}" is not in the D8 enum`,
      );
    if (!pm.ACTIVITY_VERDICTS.includes(c.verdict.activity))
      fail(
        id,
        where,
        `activity verdict "${c.verdict.activity}" is not in the D8 enum`,
      );
    if (!pm.CASE_STATUSES.includes(c.verdict.status))
      fail(id, where, `status "${c.verdict.status}" is not a case status`);

    // The band follows the matrix unless the escalation tripwire made it P1.
    const cell = pm.parseCellKey(c.priority.cell);
    if (!cell) {
      fail(id, where, `cell "${c.priority.cell}" is not Impact/Likelihood`);
    } else if (/^Escalation tripwire/.test(c.priority.basis)) {
      if (c.priority.band !== "P1")
        fail(id, where, "an escalation-tripwire case is P1 whatever the cell");
    } else if (c.priority.band !== pm.bandFor(cell.impact, cell.likelihood)) {
      fail(
        id,
        where,
        `band ${c.priority.band} does not match the ${c.priority.cell} cell (${pm.bandFor(cell.impact, cell.likelihood)}) and no tripwire is recorded`,
      );
    }
    // The E rule: P1/P2 escalate, P4 closes, P3 is decided at its trigger.
    const move = c.decision.move;
    if (["P1", "P2"].includes(c.priority.band) && move !== "escalate")
      fail(
        id,
        where,
        `${c.priority.band} must escalate under the E rule, not ${move}`,
      );
    if (c.priority.band === "P4" && move !== "close")
      fail(id, where, `P4 closes under the E rule, not ${move}`);
    if ((move === "escalate") !== (c.verdict.status === "escalated"))
      fail(
        id,
        where,
        `decision "${move}" and status "${c.verdict.status}" disagree`,
      );

    // Every stop points at a page and an anchor that exist.
    for (const s of c.stops) {
      const [route, hash] = s.href.split("#");
      const f = docFor(route);
      if (!f) fail(id, where, `stop ${s.href}: no such page`);
      else if (hash && !hasAnchor(read(f), hash))
        fail(id, where, `stop ${s.href}: ${f} has no #${hash}`);
    }
    // The case ID is the same on the long form.
    const longForm = c.page ? read(docFor(c.page) ?? "") : escalationExample;
    if (!longForm.includes(c.caseId))
      fail(
        id,
        where,
        `case ID ${c.caseId} does not appear on ${c.page ?? "src/content/docs/escalation/example.mdx"}`,
      );
    if (c.page) {
      const t = read(docFor(c.page));
      for (const v of [c.verdict.detection, c.verdict.activity])
        if (!t.includes(v))
          fail(id, where, `verdict "${v}" does not appear on ${c.page}`);
    }
    if (c.packet && !existsSync(join(ROOT, "public", c.packet)))
      fail(id, where, `packet ${c.packet} does not exist under public/`);
  }
}

/* ------------------------------------------------------------------ */
/* Data contract: vendor status (vendors.ts)                          */
/* ------------------------------------------------------------------ */

async function checkVendors() {
  const id = "vendor-status";
  const file = "src/data/vendors.ts";
  dataContracts++;
  const { vendors } = await importData("vendors.ts");
  const seen = new Set();
  for (const v of vendors) {
    if (seen.has(v.id)) fail(id, file, `duplicate id "${v.id}"`);
    seen.add(v.id);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(v.asOf))
      fail(id, file, `${v.id}: asOf "${v.asOf}" is not YYYY-MM-DD`);
  }
  // A renamed tool's C.A.T. card names it by at least one former name, so a
  // reader who knows only the old name still finds the card.
  const catFile = "src/content/docs/glossaries/cat.mdx";
  const cat = read(catFile).replace(/&amp;/g, "&");
  const byId = new Map(vendors.map((v) => [v.id, v]));
  for (const m of cat.matchAll(
    /<article\b[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/article>/g,
  )) {
    const v = byId.get(m[1]);
    if (
      v?.status === "renamed" &&
      v.formerNames.length &&
      !v.formerNames.some((n) => m[2].includes(n))
    )
      fail(
        id,
        catFile,
        `#${m[1]} is renamed in vendors.ts but its card names none of ${JSON.stringify(v.formerNames)}`,
      );
  }
  // Every <VendorStatus id> resolves (the component throws, this says where).
  for (const abs of walk(join(ROOT, "src"), (p) => /\.(mdx|astro)$/.test(p))) {
    const t = readFileSync(abs, "utf8");
    for (const m of t.matchAll(/<VendorStatus\b[^>]*\bid="([^"]+)"/g))
      if (!byId.has(m[1]))
        fail(
          id,
          rel(abs),
          `<VendorStatus id="${m[1]}"> has no vendors.ts entry`,
        );
  }
}

/* ------------------------------------------------------------------ */
/* Site-wide vocabulary (D3, D8, D9) and the record templates          */
/* ------------------------------------------------------------------ */

/** Templates that record a verdict: each carries both D8 axes, exactly. */
const RECORD_TEMPLATES = [
  "alert-report.md",
  "case-record.md",
  "event-report.md",
  "handoff-packet.md",
  "pattern-close-record.md",
  "risk-verdict.md",
  "tuning-request.md",
];

async function checkVocabulary() {
  dataContracts++;
  const pm = await importData("priority-matrix.ts");
  const files = sitewideFiles();

  // "break-glass rule" survives only as a former-name pointer.
  for (const { file, text } of files) {
    for (const m of text.matchAll(/break-glass rule/gi)) {
      const ctx = text.slice(Math.max(0, m.index - 120), m.index + 140);
      if (!/former/i.test(ctx))
        fail(
          "escalation-tripwire",
          `${file}:${lineAt(text, m.index)}`,
          'say "escalation tripwire"; "break-glass rule" appears only as the former name',
        );
    }
    if (/within the shift/i.test(text))
      fail(
        "p2-clock",
        file,
        '"within the shift" is retired: P2 escalates within 4 hours',
      );
    if (/invoice-records(?:\.|\[\.\])com/.test(text))
      fail(
        "case-fact-anchors",
        file,
        "the Case A lure domain is invoice-records[.]example (reserved), never .com",
      );
  }

  // The new name is where readers look for it.
  for (const f of [
    "src/content/docs/escalation/criteria.mdx",
    "src/content/docs/risk/framework.mdx",
    "src/content/docs/glossaries/assured.mdx",
    "src/content/docs/glossaries/clear.mdx",
    "public/templates/escalation-checklist.md",
    "public/templates/handoff-packet.md",
    "public/templates/event-report.md",
  ])
    if (!/escalation tripwire/i.test(read(f)))
      fail("escalation-tripwire", f, 'expected "escalation tripwire"');
  for (const f of [
    "src/content/docs/glossaries/assured.mdx",
    "src/content/docs/glossaries/clear.mdx",
  ])
    if (!read(f).includes("Break-glass rule (former name)"))
      fail(
        "escalation-tripwire",
        f,
        'the glossary keeps the "Break-glass rule (former name)" pointer',
      );
  if (
    !read("src/content/docs/glossaries/assured.mdx").includes(
      'id="break-glass-rule"',
    )
  )
    fail(
      "escalation-tripwire",
      "src/content/docs/glossaries/assured.mdx",
      "the old #break-glass-rule anchor must keep working",
    );

  // Templates: no retired verdict words, and every record template carries
  // the D8 enum strings verbatim (line wraps allowed).
  for (const abs of walk(TEMPLATES, (p) => /\.md$/.test(p))) {
    const f = rel(abs);
    const t = readFileSync(abs, "utf8");
    if (/inconclusive/i.test(t))
      fail(
        "verdict-taxonomy",
        f,
        '"inconclusive" is not a verdict; use "undetermined"',
      );
    if (/\bbenign \//.test(t))
      fail(
        "verdict-taxonomy",
        f,
        'a bare "benign /" disposition is not in the D8 vocabulary',
      );
  }
  for (const name of RECORD_TEMPLATES) {
    const f = `public/templates/${name}`;
    const t = flat(read(f));
    for (const v of [...pm.DETECTION_VERDICTS, ...pm.ACTIVITY_VERDICTS])
      if (!t.includes(v))
        fail(
          "verdict-taxonomy",
          f,
          `record template must carry the D8 enum string "${v}" (priority-matrix.ts)`,
        );
  }
}

/* ------------------------------------------------------------------ */
/* Insider privacy (D16): no personal-circumstance indicators         */
/* ------------------------------------------------------------------ */

const PERSONAL_INDICATORS = [
  /\bdivorc\w*/i,
  /\bmoney troubles?\b/i,
  /\bfinancial (?:distress|difficult\w*|hardship|troubles?|problems?|pressures?)\b/i,
  /\b(?:in|into|personal|gambling|mounting|heavy|has|have|owes?) debts?\b/i,
  /\bmedical (?:leave|conditions?|history|issues?|problems?|records?|appointments?|diagnos\w*)\b/i,
  /\b(?:is|was|been|seems?|seemed|looks?|looked|very|really) stressed\b/i,
  /\bunder (?:a lot of )?stress\b/i,
  /\b(?:personal|emotional|family|financial) stress\b/i,
];

/**
 * Exercise and assessment stimulus may quote a personal circumstance, but
 * only where the same material tells the learner to keep it out of the
 * case. `marker` must appear in `markerFile` (default: the file itself).
 */
const STIMULUS_EXEMPT = [
  {
    file: "src/content/docs/exercises.mdx",
    marker:
      "Not into the case: the divorce, the stress, or any other personal circumstance",
  },
  {
    file: "public/templates/exercise-insider-departure.md",
    marker: "The discipline being trained is what the SOC records",
  },
  {
    file: "src/content/docs/subject/quiz.mdx",
    marker: "personal circumstances the SOC should never hold",
  },
  {
    file: "src/content/docs/teaching.mdx",
    marker: "Nothing about the personal circumstance.",
  },
  {
    file: "public/templates/facilitator-kit/pre-assessment-forms.md",
    marker: "Nothing about the personal circumstance.",
    markerFile: "src/content/docs/teaching.mdx",
  },
];

function checkPersonalCircumstances() {
  const id = "insider-privacy";
  dataContracts++;
  const exempt = new Map(STIMULUS_EXEMPT.map((e) => [e.file, e]));
  for (const e of STIMULUS_EXEMPT)
    if (!read(e.markerFile ?? e.file).includes(e.marker))
      fail(
        id,
        e.file,
        `exempt as exercise stimulus only while ${e.markerFile ?? "it"} tells the learner to exclude the circumstance ("${e.marker}")`,
      );
  const files = [
    ...walk(DOCS, (p) => /\.mdx$/.test(p)),
    ...walk(TEMPLATES, (p) => /\.md$/.test(p)),
    join(ROOT, "src/data/cases.ts"),
  ];
  for (const abs of files) {
    const f = rel(abs);
    if (exempt.has(f)) continue;
    const t = readFileSync(abs, "utf8");
    for (const re of PERSONAL_INDICATORS) {
      const m = re.exec(t);
      if (m)
        fail(
          id,
          `${f}:${lineAt(t, m.index)}`,
          `personal-circumstance indicator "${m[0]}": analysts record observable technical activity; HR-held context reaches the case only through the insider-risk route`,
        );
    }
  }
}

/* ------------------------------------------------------------------ */
/* B.A.D. glossary gates                                               */
/* ------------------------------------------------------------------ */

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function checkBadGlossary() {
  const id = "glossary-bad-grids";
  const file = "src/content/docs/glossaries/bad.mdx";
  dataContracts++;
  const text = read(file);
  const lines = text.split("\n");
  const collator = new Intl.Collator("en", {
    sensitivity: "base",
    numeric: true,
  });
  const plain = (s) =>
    s
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&[a-z]+;/g, "")
      .trim();

  // Cards sit one per line inside each grid <div>; the grid closes at the
  // </div> with the opening tag's indentation.
  const grids = [];
  let grid = null;
  for (const [i, line] of lines.entries()) {
    const open = line.match(
      /^(\s*)<div class="bad-(terms|families|actors|campaigns)">/,
    );
    if (open) {
      grid = { kind: open[2], indent: open[1], line: i + 1, cards: [] };
      grids.push(grid);
      continue;
    }
    if (!grid) continue;
    if (line.startsWith(`${grid.indent}</div>`)) {
      grid = null;
      continue;
    }
    for (const m of line.matchAll(
      /<article\b[^>]*class="bad-(?:term|family|actor|campaign)\b[^"]*"[^>]*>([\s\S]*?)<\/article>/g,
    )) {
      grid.cards.push({
        name: plain(m[1].match(/<h3[^>]*>([\s\S]*?)<\/h3>/)?.[1] ?? ""),
        signal: /class="bad-signal"/.test(m[1]),
        line: i + 1,
      });
    }
  }
  const inGrids = grids.reduce((n, g) => n + g.cards.length, 0);
  const allCards = (
    text.match(/<article\b[^>]*class="bad-(?:term|family|actor|campaign)\b/g) ??
    []
  ).length;
  if (grids.length === 0)
    fail(id, file, "no card grids found (has the markup changed?)");
  if (inGrids !== allCards)
    fail(
      id,
      file,
      `${allCards - inGrids} card(s) sit outside a recognized grid, or span lines`,
    );
  for (const g of grids) {
    for (let i = 1; i < g.cards.length; i++) {
      const [a, b] = [g.cards[i - 1], g.cards[i]];
      if (collator.compare(a.name, b.name) > 0)
        fail(
          id,
          `${file}:${b.line}`,
          `"${b.name}" must sort before "${a.name}" (cards are alphabetical within each grid; bad-${g.kind} at line ${g.line})`,
        );
    }
    for (const c of g.cards) {
      if (!c.name) fail(id, `${file}:${c.line}`, "card has no <h3> title");
      if (!c.signal)
        fail(
          id,
          `${file}:${c.line}`,
          `"${c.name}" has no .bad-signal triage line`,
        );
    }
  }

  // The review stamp: techVerified frontmatter, and the footer's "last
  // reviewed <Month YYYY>" names the same month.
  const stamp = text.match(/^techVerified:\s*"?(\d{4})-(\d{2})-(\d{2})"?\s*$/m);
  if (!stamp) {
    fail(id, file, 'frontmatter must carry techVerified: "YYYY-MM-DD"');
    return;
  }
  const month = `${MONTHS[Number(stamp[2]) - 1]} ${stamp[1]}`;
  const footer = text.match(
    /last reviewed ((?:January|February|March|April|May|June|July|August|September|October|November|December) \d{4})/,
  );
  if (!footer)
    fail(id, file, 'the footer must say "last reviewed <Month YYYY>"');
  else if (footer[1] !== month)
    fail(
      id,
      file,
      `footer says last reviewed ${footer[1]}, techVerified says ${month}`,
    );
  // Age (a warning at 180 days, a failure at 365) is checked for every
  // stamped page by checkTechVerified() below.
}

/* ------------------------------------------------------------------ */
/* Prose punctuation: no em dash, no bold-label comma splice           */
/* ------------------------------------------------------------------ */

/**
 * Rendered prose a reader sees: docs MDX, templates, the site's pages and
 * the README. Code (fenced blocks, inline code) and JS comments (MDX
 * {/* *\/} blocks, // and /* *\/ in frontmatter and <script>) are blanked
 * first, keeping line breaks so reported line numbers hold. HTML comments
 * stay in: in a downloaded template they are instructions the adopter reads.
 */
function proseFiles() {
  const pick = (re) => (p) => re.test(p);
  const pages = walk(join(ROOT, "src/pages"), pick(/\.astro$/)).filter(
    (p) => relative(join(ROOT, "src/pages"), p).split("/").length === 1,
  );
  return [
    ...walk(DOCS, pick(/\.mdx$/)),
    ...walk(TEMPLATES, pick(/\.md$/)),
    ...pages,
    join(ROOT, "README.md"),
  ].map((abs) => ({ file: rel(abs), text: readFileSync(abs, "utf8") }));
}

const blankKeepLines = (m) => m.replace(/[^\n]/g, " ");
function stripCode(text, file) {
  let t = text
    .replace(/^(```|~~~)[\s\S]*?^\1/gm, blankKeepLines)
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, blankKeepLines)
    .replace(/`[^`\n]*`/g, blankKeepLines);
  if (file.endsWith(".astro")) {
    t = t
      .replace(/^---\n[\s\S]*?\n---/, blankKeepLines)
      .replace(/<script[\s>][\s\S]*?<\/script>/g, blankKeepLines)
      .replace(/<style[\s>][\s\S]*?<\/style>/g, blankKeepLines);
  }
  if (file.endsWith(".mdx")) {
    t = t
      .replace(/^import .*$/gm, blankKeepLines)
      .replace(/<script[\s>][\s\S]*?<\/script>/g, blankKeepLines);
  }
  return t;
}

const LABEL_SPLICE =
  /^\s*(?:[-*]|\d+\.)\s+\*\*[^*]+\*\*, |<(?:li|p)><strong>[^<]+<\/strong>, /;

function checkProse() {
  dataContracts++;
  for (const { file, text } of proseFiles()) {
    const lines = stripCode(text, file).split("\n");
    lines.forEach((line, i) => {
      if (line.includes("\u2014"))
        fail(
          "prose-punctuation",
          `${file}:${i + 1}`,
          "em dash (U+2014): use a colon, parentheses or a period",
        );
      if (LABEL_SPLICE.test(line))
        fail(
          "prose-punctuation",
          `${file}:${i + 1}`,
          "use a colon after a bold label, not a comma",
        );
    });
  }
}

/* ------------------------------------------------------------------ */
/* techVerified: every stamped page, site-wide                         */
/* ------------------------------------------------------------------ */

const TECH_WARN_DAYS = 180;
const TECH_FAIL_DAYS = 365;

/**
 * A page that names fast-moving products carries techVerified in its
 * frontmatter. Over 180 days old it warns; over 365 it fails, because a
 * year-old "last checked" date on vendor, law or ATT&CK claims is no longer
 * a statement anyone should rely on. Re-verify and move the stamp (the
 * currency review in GOVERNANCE.md). bad.mdx's footer-month rule is
 * checked separately in checkBadGlossary().
 */
function checkTechVerified() {
  dataContracts++;
  const now = Date.now();
  for (const abs of walk(DOCS, (p) => /\.mdx$/.test(p))) {
    const file = rel(abs);
    const fm = readFileSync(abs, "utf8").match(/^---\n([\s\S]*?)\n---/);
    const line = fm?.[1].match(/^techVerified:\s*(.*)$/m);
    if (!line) continue;
    const d = line[1].match(/^"?(\d{4})-(\d{2})-(\d{2})"?\s*$/);
    if (!d) {
      fail("tech-verified", file, 'techVerified must be "YYYY-MM-DD"');
      continue;
    }
    const days = Math.floor(
      (now - Date.UTC(+d[1], +d[2] - 1, +d[3])) / 86400000,
    );
    const stamp = `${d[1]}-${d[2]}-${d[3]}`;
    if (days < -1)
      fail("tech-verified", file, `techVerified ${stamp} is in the future`);
    else if (days > TECH_FAIL_DAYS)
      fail(
        "tech-verified",
        file,
        `techVerified ${stamp} is ${days} days old (limit ${TECH_FAIL_DAYS}); re-verify the page's technology claims and move the stamp`,
      );
    else if (days > TECH_WARN_DAYS)
      warn(
        "tech-verified",
        file,
        `techVerified ${stamp} is ${days} days old; re-verify soon (fails at ${TECH_FAIL_DAYS})`,
      );
  }
}

/* ------------------------------------------------------------------ */
/* README glossary term count                                          */
/* ------------------------------------------------------------------ */

/**
 * The README states the glossary size in words ("nearly 1,000 terms"). The
 * registry grows, so pin the figure to it: "nearly N" must be at most N and
 * within 10% below it, "about N" within 5% either way, "over N" above N and
 * within 20%, and a bare number exact.
 */
async function checkReadmeTermCount() {
  dataContracts++;
  const { glossary } = await importData("glossary.ts");
  const count = Object.keys(glossary).length;
  const text = read("README.md");
  const m = text.match(
    /define (nearly|about|around|over|more than )?\s*([\d,]+) terms/,
  );
  if (!m) {
    fail(
      "readme-term-count",
      "README.md",
      'expected "define <qualifier> N terms" in the glossary paragraph',
    );
    return;
  }
  const n = Number(m[2].replace(/,/g, ""));
  const q = (m[1] ?? "").trim();
  const ok =
    q === "nearly"
      ? count <= n && count >= n * 0.9
      : q === "about" || q === "around"
        ? Math.abs(count - n) <= n * 0.05
        : q === "over" || q === "more than"
          ? count > n && count <= n * 1.2
          : count === n;
  if (!ok)
    fail(
      "readme-term-count",
      "README.md",
      `README says "${m[0]}", but src/data/glossary.ts has ${count} entries; update the figure`,
    );
}

/* ------------------------------------------------------------------ */

runTextContracts();
await checkPriorityMatrix();
await checkNavigation();
await checkCases();
await checkVendors();
await checkVocabulary();
checkPersonalCircumstances();
checkBadGlossary();
checkProse();
checkTechVerified();
await checkReadmeTermCount();

if (failures > 0) {
  console.error(`check-content-contracts: ${failures} contract violation(s)`);
  process.exit(1);
}
console.log(
  `check-content-contracts: OK (${CONTRACTS.length} text contracts across ${new Set(CONTRACTS.map((c) => c.file)).size} files, ${dataContracts} data and site-wide contracts)`,
);

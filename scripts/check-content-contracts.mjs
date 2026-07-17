#!/usr/bin/env node
/**
 * Content-contract regression checks. Each contract pins the load-bearing
 * sentence of a deliberate methodology decision so a later edit cannot
 * silently reverse it. A failure names the contract to consult before
 * changing the assertion: the contract is the decision's acceptance
 * criterion, not a style preference.
 *
 * Scope: content rules (the decision contract, verdict taxonomy, and
 * eligibility gates) plus case-fact anchors and the version-display rule.
 * Component, accessibility, and build-reproducibility rules live in
 * check-engineering-contracts.mjs, check-contrast.mjs, and
 * check-build-determinism.mjs.
 *
 * Exit codes: 0 all contracts hold, 1 violations found.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;

/**
 * mustContain: every string must appear in the file.
 * mustNotContain: no string may appear.
 * ordered: [earlier, later] — both must appear, in that order.
 */
const CONTRACTS = [
  {
    id: "ai-admission-gate",
    file: "src/content/docs/ai-triage.mdx",
    why: "AI use requires the admission gate before any workflow guidance",
    ordered: [
      ["## Before the first prompt: the admission gate", "## The phase map"],
    ],
  },
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
    id: "decision-contract",
    file: "src/content/docs/escalation/criteria.mdx",
    why: "asset profile alone tightens the clock; it does not break glass",
    mustContain: ["asset profile alone"],
  },
  {
    id: "decision-contract",
    file: "public/templates/escalation-checklist.md",
    why: "the checklist carries the same high-impact confirmation rule",
    mustContain: ["asset profile alone"],
  },
  {
    id: "insider-escalation",
    file: "src/content/docs/subject/insider-analysis.mdx",
    why: "confirmed harm escalates without waiting for stream agreement",
    mustContain: ["harm triggers the response"],
    mustNotContain: ["Neither stream is enough alone"],
  },
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
    id: "cloud-identity-semantics",
    file: "src/content/docs/alert/parsing/cloud-identity.mdx",
    why: "mfaAuthenticated=false is what AWS saw, not a fact about MFA",
    mustContain: ["as far as AWS saw it", "accessKeyId"],
  },
  {
    id: "network-inference",
    file: "src/content/docs/alert/parsing/network.mdx",
    why: "containment is a criteria decision, not inevitable",
    mustNotContain: ["when, not if"],
  },
  {
    id: "regulatory-scope",
    file: "src/content/docs/scope/regulatory.mdx",
    why: "GDPR reach is Article 3's three nexus tests, routed to the DPO",
    mustContain: ["Article 3", "not automatically"],
  },
  {
    id: "attack-v19",
    file: "src/content/docs/uncover/mitre.mdx",
    why: "ATT&CK v19: Stealth kept TA0005; Defense Impairment is TA0112",
    mustContain: ["The 15 tactics", "TA0112"],
  },
  {
    id: "attack-v19",
    file: "public/templates/escalation-checklist.md",
    why: "the retired Defense Evasion tactic name must not resurface",
    mustContain: ["defense impairment"],
    mustNotContain: ["defense evasion", "Defense Evasion"],
  },
  {
    id: "attack-v19",
    file: "src/content/docs/uncover/example.mdx",
    why: "the finance-case cookie replay maps to T1550.004",
    mustContain: ["T1550.004"],
  },
  {
    id: "verdict-taxonomy",
    file: "src/content/docs/alert/example.mdx",
    why: "the Cursor case is a benign true positive, not a false positive",
    mustContain: ["benign true positive"],
  },
  {
    id: "verdict-taxonomy",
    file: "public/templates/alert-report.md",
    why: "triage outcome records two axes: detection correctness x disposition",
    mustContain: ["Two axes", "benign true"],
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
    id: "exercise-evidence",
    file: "src/content/docs/exercises.mdx",
    why: "\"cannot determine yet\" is a graded answer, not a dodge",
    mustContain: ["cannot determine yet"],
  },
  {
    id: "detection-taxonomy",
    file: "src/content/docs/alert/detection-mechanisms.mdx",
    why: "detection families are multi-label; the label is a prior",
    mustContain: ["plural on purpose"],
  },
  {
    id: "case-fact-anchors",
    file: "src/content/docs/uncover/correlation.mdx",
    why: "the timeline demo quotes the canonical finance case",
    mustContain: ["laptop-finance-09", "09:11:41"],
    mustNotContain: ["FIN-LT-0219", "09:11:38"],
  },
  {
    id: "case-fact-anchors",
    file: "src/content/docs/alert/example.mdx",
    why: "the replay follows the sign-in by ~16 minutes (08:47:19 to 09:03:12)",
    mustContain: ["sixteen minutes after her normal corporate sign-in"],
  },
  {
    id: "version-display-rule",
    file: "src/data/version.ts",
    why: "the edition-vs-semver display rule stays documented at the source",
    mustContain: ["Display rule"],
  },
];

let failures = 0;

for (const c of CONTRACTS) {
  let text;
  try {
    text = readFileSync(join(ROOT, c.file), "utf8");
  } catch {
    console.error(`check-content-contracts: ${c.id} MISSING FILE ${c.file}`);
    failures++;
    continue;
  }
  for (const needle of c.mustContain ?? []) {
    if (!text.includes(needle)) {
      console.error(
        `check-content-contracts: ${c.id} in ${c.file}: expected to find "${needle}" (${c.why})`,
      );
      failures++;
    }
  }
  for (const needle of c.mustNotContain ?? []) {
    if (text.includes(needle)) {
      console.error(
        `check-content-contracts: ${c.id} in ${c.file}: must not contain "${needle}" (${c.why})`,
      );
      failures++;
    }
  }
  for (const [earlier, later] of c.ordered ?? []) {
    const a = text.indexOf(earlier);
    const b = text.indexOf(later);
    if (a === -1 || b === -1 || a > b) {
      console.error(
        `check-content-contracts: ${c.id} in ${c.file}: "${earlier}" must appear before "${later}" (${c.why})`,
      );
      failures++;
    }
  }
}

if (failures > 0) {
  console.error(`check-content-contracts: ${failures} contract violation(s)`);
  process.exit(1);
}
console.log(
  `check-content-contracts: OK (${CONTRACTS.length} contracts across ${new Set(CONTRACTS.map((c) => c.file)).size} files)`,
);

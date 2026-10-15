/**
 * The priority matrix, the E rule, the escalation criteria and the band
 * clocks: the single source for every surface that states them.
 *
 * Surfaces that render from this file:
 * - PriorityMatrix.astro: the impact-by-likelihood table (risk/framework.mdx
 *   in full, reference.mdx compact)
 * - EscalationRule.astro: the E rule and the default clocks per band
 *   (escalation/criteria.mdx, risk/framework.mdx#clocks, reference.mdx)
 * - public/templates/schema/assured-vocabulary.schema.json: the enums every
 *   template schema uses. scripts/check-template-schemas.mjs imports this
 *   file and fails when the two drift.
 *
 * Ownership, as the method states it: Risk produces the cell, the band, the
 * confidence and a recommended move; the Escalation decision (E) makes and
 * records the close-or-escalate decision. Early exits (a Level 0 close, an
 * escalation tripwire fired from any phase) are early E decisions.
 *
 * Tuning: the clock values in `clockDefaults` are defaults an adopter tunes
 * to their staffing and paging model. Every clock string below is built
 * from them, so changing one number changes every rendered table. Keep the
 * ordering and the semantics (P1 interrupts, P2 moves within hours, P3
 * waits against a named trigger, P4 closes on the queue).
 *
 * This file uses only erasable TypeScript (no enums, no namespaces) so the
 * Node scripts can import it directly.
 */

/* ------------------------------------------------------------------ */
/* Scales                                                              */
/* ------------------------------------------------------------------ */

/** Impact and likelihood ratings, highest first. */
export type Rating = "High" | "Medium" | "Low";
export const RATINGS: readonly Rating[] = ["High", "Medium", "Low"];

/** Priority bands. A priority scale (how fast someone must act), not a severity taxonomy. */
export type Band = "P1" | "P2" | "P3" | "P4";
export const BANDS: readonly Band[] = ["P1", "P2", "P3", "P4"];

/**
 * Analytic confidence, on the single rubric at
 * /docs/documentation/standards/#confidence. Lower case, as the templates
 * write it. Recorded beside the cell, never folded into likelihood.
 */
export type Confidence = "high" | "medium" | "low";
export const CONFIDENCE_LEVELS: readonly Confidence[] = [
  "high",
  "medium",
  "low",
];

/** Depth ladder levels (fast path). A case moves up, never down mid-case. */
export type DepthLevel = 0 | 1 | 2;
export const DEPTH_LEVELS: readonly DepthLevel[] = [0, 1, 2];

/** The E rule's move for a band, when no criterion is confirmed. */
export type Move = "escalate" | "keep-working" | "close";

/* ------------------------------------------------------------------ */
/* Tunable clock defaults (D9)                                         */
/* ------------------------------------------------------------------ */

export interface ClockDefaults {
  /** P1: minutes before the no-acknowledgment fallback pages the next person. */
  p1NoAckFallbackMinutes: number;
  /** P2: minutes to acknowledge. */
  p2AcknowledgeMinutes: number;
  /** P2: hours to the escalation decision. Replaces the old "within the shift". */
  p2DecisionHours: number;
  /** P3: hours to the re-score on a named trigger. */
  p3RescoreHours: number;
  /** P3 at High impact / Low likelihood: the tightened high-impact clock, in hours. */
  highImpactRescoreHours: number;
}

export const clockDefaults: ClockDefaults = {
  p1NoAckFallbackMinutes: 15,
  p2AcknowledgeMinutes: 15,
  p2DecisionHours: 4,
  p3RescoreHours: 24,
  highImpactRescoreHours: 4,
};

const c = clockDefaults;

/* ------------------------------------------------------------------ */
/* The matrix: Impact x Likelihood                                     */
/* ------------------------------------------------------------------ */

export interface MatrixCell {
  impact: Rating;
  likelihood: Rating;
  band: Band;
  /** The default action, as the framework page states it. */
  action: string;
  /** Short label for the desk card ("P3, high-impact clock"). */
  short: string;
  /** Accessible label, also the narrow-screen cell label. */
  label: string;
}

const cell = (
  impact: Rating,
  likelihood: Rating,
  band: Band,
  action: string,
  short: string = band,
): MatrixCell => ({
  impact,
  likelihood,
  band,
  action,
  short,
  label: `${impact} impact, ${likelihood} likelihood`,
});

/** Row-major: impact High, Medium, Low; likelihood High, Medium, Low. */
export const matrixCells: readonly MatrixCell[] = [
  cell("High", "High", "P1", "Escalate immediately."),
  cell("High", "Medium", "P2", `Escalate within ${c.p2DecisionHours} hours.`),
  cell(
    "High",
    "Low",
    "P3",
    "Keep working on the high-impact clock: re-score within hours, then close or escalate.",
    "P3, high-impact clock",
  ),
  cell("Medium", "High", "P2", `Escalate within ${c.p2DecisionHours} hours.`),
  cell(
    "Medium",
    "Medium",
    "P3",
    `Keep working; re-score within ${c.p3RescoreHours} hours on a named trigger, then close or escalate.`,
  ),
  cell("Medium", "Low", "P4", "Documented close within the queue SLA."),
  cell(
    "Low",
    "High",
    "P3",
    "Confirm containment, then close: a real but low-impact finding. Remediate cheaply; if it recurs, fix the preventive control (block, patch, harden), not the detection.",
    "P3, confirm and close",
  ),
  cell("Low", "Medium", "P4", "Light investigation, then documented close."),
  cell("Low", "Low", "P4", "Document and close."),
];

/** The cell for an impact and likelihood pair. */
export const cellFor = (impact: Rating, likelihood: Rating): MatrixCell => {
  const found = matrixCells.find(
    (m) => m.impact === impact && m.likelihood === likelihood,
  );
  if (!found)
    throw new Error(`priority-matrix: no cell for ${impact}/${likelihood}`);
  return found;
};

/** The band for an impact and likelihood pair, before overrides. */
export const bandFor = (impact: Rating, likelihood: Rating): Band =>
  cellFor(impact, likelihood).band;

/** The "High/Medium" notation the records use for a cell. */
export const cellKey = (impact: Rating, likelihood: Rating): string =>
  `${impact}/${likelihood}`;

/** Parse "High/Low" (any case, optional spaces) back into a pair. */
export const parseCellKey = (
  key: string,
): { impact: Rating; likelihood: Rating } | null => {
  const m = key.trim().match(/^(high|medium|low)\s*\/\s*(high|medium|low)$/i);
  if (!m) return null;
  const norm = (s: string) =>
    (s[0].toUpperCase() + s.slice(1).toLowerCase()) as Rating;
  return { impact: norm(m[1]), likelihood: norm(m[2]) };
};

/* ------------------------------------------------------------------ */
/* Band clocks                                                         */
/* ------------------------------------------------------------------ */

export interface BandClock {
  band: Band;
  /** The E rule's move for this band when no criterion is confirmed. */
  move: Move;
  /** Desk-card wording (reference.mdx). */
  acknowledge: string;
  decision: string;
  /** Full wording (risk/framework.mdx#clocks). */
  acknowledgeFull: string;
  decisionFull: string;
  /** One line on what the band means operationally (escalation/criteria.mdx). */
  meaning: string;
}

export const bandClocks: readonly BandClock[] = [
  {
    band: "P1",
    move: "escalate",
    acknowledge: `Page immediately; no-ack fallback at ${c.p1NoAckFallbackMinutes} minutes`,
    decision: "Escalate immediately, warm handoff",
    acknowledgeFull: `Page immediately; no-acknowledgment fallback at ${c.p1NoAckFallbackMinutes} minutes`,
    decisionFull: "Escalate immediately, with a warm handoff",
    meaning:
      "IR owns it. Page, hold the warm handoff in minutes, and let the packet complete in parallel. Any confirmed criterion lands here, whatever the cell.",
  },
  {
    band: "P2",
    move: "escalate",
    acknowledge: `Within ${c.p2AcknowledgeMinutes} minutes`,
    decision: `Escalate within ${c.p2DecisionHours} hours`,
    acknowledgeFull: `Within ${c.p2AcknowledgeMinutes} minutes`,
    decisionFull: `Escalate within ${c.p2DecisionHours} hours`,
    meaning:
      "Escalate on the P2 clock with a complete handoff packet. IR attention, not a war room.",
  },
  {
    band: "P3",
    move: "keep-working",
    acknowledge: "Queue",
    decision: `Re-score within ${c.p3RescoreHours} hours on a named trigger (High/Low: within hours)`,
    acknowledgeFull: "Queue",
    decisionFull: `Re-score within ${c.p3RescoreHours} hours on a named trigger (High/Low: within hours, ${c.highImpactRescoreHours} by default), then close or escalate`,
    meaning:
      "The case stays with triage under active work. Name the finding that would raise or lower it, work to that re-score trigger, then close or escalate.",
  },
  {
    band: "P4",
    move: "close",
    acknowledge: "Queue SLA",
    decision: "Documented close within the queue SLA",
    acknowledgeFull: "Queue SLA",
    decisionFull: "Documented close within the queue SLA",
    meaning: "A documented close that passes the closure check.",
  },
];

export const clockFor = (band: Band): BandClock => {
  const found = bandClocks.find((b) => b.band === band);
  if (!found) throw new Error(`priority-matrix: no clock for ${band}`);
  return found;
};

/** The sentence every clock table carries. */
export const CLOCKS_ARE_DEFAULTS =
  "These are defaults. Adopters tune them to their staffing and paging model; keep the ordering and the semantics.";

/* ------------------------------------------------------------------ */
/* The E rule (D2) and the desk-card line                              */
/* ------------------------------------------------------------------ */

export const E_RULE =
  "Escalate if a criterion is confirmed or the matrix places the case at P1 or P2. At P3, keep working to the named re-score trigger, then close or escalate. Close at P4. Record the cell either way.";

export const E_RULE_CLOSE_NOTE =
  "A documented close is a first-class verdict, held to the same evidence standard as an escalation.";

export const E_RULE_EARLY_EXITS =
  "Early exits are early Escalation decisions: a Level 0 close, or an escalation tripwire fired in Alert, Subject, Scope, or Uncover, is recorded in the same decision fields with its time.";

/** The desk card's E line (reference.mdx). */
export const DESK_CARD_E_LINE =
  "criterion confirmed, or P1/P2 → escalate through the tier the protocol names · P3 → keep working to the named re-score trigger, then decide · P4 → documented close, a first-class verdict · either way, the reasoning goes in the record.";

/** Who owns what. */
export const DECISION_OWNERSHIP = {
  risk: "Risk produces the impact rating, the likelihood rating, the analytic confidence, the matrix cell, the priority (P1 to P4) and a recommended move. Risk recommends; it does not decide.",
  escalation:
    "The Escalation decision makes and records the close-or-escalate decision.",
} as const;

/* ------------------------------------------------------------------ */
/* Escalation criteria and the escalation tripwire (D3)               */
/* ------------------------------------------------------------------ */

export interface EscalationCriterion {
  n: 1 | 2 | 3 | 4;
  /** Anchor id on /docs/escalation/criteria/. */
  id: "malicious" | "high-impact" | "lateral" | "campaign";
  title: string;
  /** One line, as the criteria page's category cards state it. */
  summary: string;
  href: string;
}

export const escalationCriteria: readonly EscalationCriterion[] = [
  {
    n: 1,
    id: "malicious",
    title: "Confirmed malicious activity not fully contained by a control",
    summary:
      "Attacker behavior established at High confidence that no control has fully stopped. Triage moves into containment posture.",
    href: "/docs/escalation/criteria/#malicious",
  },
  {
    n: 2,
    id: "high-impact",
    title: "High impact / business-critical",
    summary:
      "Confirmed malicious or unauthorized activity touching systems essential to operations, regulated data, or revenue. Escalates before the evidence picture is complete.",
    href: "/docs/escalation/criteria/#high-impact",
  },
  {
    n: 3,
    id: "lateral",
    title: "Lateral movement or exfiltration",
    summary:
      "Advanced compromise stage. Containment timing becomes urgent because blast radius is growing.",
    href: "/docs/escalation/criteria/#lateral",
  },
  {
    n: 4,
    id: "campaign",
    title: "Ongoing or widespread campaign",
    summary:
      "Multiple hosts, users, or organizations. Coordinated activity demanding organization-level response.",
    href: "/docs/escalation/criteria/#campaign",
  },
];

/** What "confirmed" means, everywhere a criterion is checked. */
export const CONFIRMED_DEFINITION =
  "Confirmed means the claim behind the criterion reaches High on the shared confidence rubric. Below High, the claim is a suspicion, and suspicion refines Scope.";

/** The escalation tripwire (formerly the break-glass rule). */
export const TRIPWIRE_RULE =
  "Any criterion confirmed makes the case P1 whatever the cell, from any phase, and it escalates immediately.";

/** The contained-by-control path. */
export const CONTAINED_BY_CONTROL =
  "Activity a control verifiably blocked or quarantined, with no execution or follow-on evidence, is not criterion 1. Record it at P3 or P4 on its matrix cell and propose it as a pattern-entry candidate. It does not page IR.";

/** The three override rules, in the order they apply. */
export const overrideRules = [
  {
    n: 1,
    name: "Escalation tripwire",
    effect: "Any criterion confirmed: P1, whatever the cell, from any phase.",
    href: "/docs/risk/framework/#overrides",
  },
  {
    n: 2,
    name: "High-impact clock",
    effect: `High/Low re-scores within hours (${c.highImpactRescoreHours} by default), not ${c.p3RescoreHours}. A "Low" that is really missing evidence is Unknown: likelihood reads Medium at minimum, confidence reads Low, and the case reads High/Medium, P2.`,
    href: "/docs/risk/framework/#overrides",
  },
  {
    n: 3,
    name: "De-escalation is explicit",
    effect:
      "A priority moves down only with a named reason and the same notification an upgrade gets. A confirmed criterion is the receiving owner's to downgrade, not the triage analyst's.",
    href: "/docs/risk/framework/#overrides",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Decision helper                                                     */
/* ------------------------------------------------------------------ */

export interface DecisionInput {
  impact: Rating;
  likelihood: Rating;
  /** Any escalation criterion confirmed (High confidence). */
  criterionConfirmed?: boolean;
  /**
   * Activity a control blocked or quarantined with no execution or follow-on
   * evidence. Never trips criterion 1; the cell stands (record at P3 or P4).
   */
  containedByControl?: boolean;
}

export interface Decision {
  cell: MatrixCell;
  /** The band after the escalation tripwire. */
  band: Band;
  move: Move;
  /** Why: "escalation tripwire" or "matrix cell". */
  basis: "escalation tripwire" | "matrix cell";
  clock: BandClock;
}

/**
 * Apply the matrix and the E rule. The high-impact clock and an explicit
 * de-escalation change a clock or carry a named reason; they do not change
 * the band this returns, so callers record them separately.
 */
export const decide = ({
  impact,
  likelihood,
  criterionConfirmed = false,
  containedByControl = false,
}: DecisionInput): Decision => {
  const m = cellFor(impact, likelihood);
  const tripped = criterionConfirmed && !containedByControl;
  const band: Band = tripped ? "P1" : m.band;
  const clock = clockFor(band);
  return {
    cell: m,
    band,
    move: clock.move,
    basis: tripped ? "escalation tripwire" : "matrix cell",
    clock,
  };
};

/* ------------------------------------------------------------------ */
/* Verdict vocabulary (D8): exact strings for templates and records    */
/* ------------------------------------------------------------------ */

export const DETECTION_VERDICTS = [
  "true positive",
  "false positive (logic)",
  "false positive (data)",
] as const;
export type DetectionVerdict = (typeof DETECTION_VERDICTS)[number];

export const ACTIVITY_VERDICTS = [
  "malicious",
  "policy violation",
  "authorized (benign true positive)",
  "benign-confirmed",
  "undetermined",
] as const;
export type ActivityVerdict = (typeof ACTIVITY_VERDICTS)[number];

/** "Merged into case" is a status, not a disposition. */
export const CASE_STATUSES = [
  "closed",
  "escalated",
  "merged into case",
] as const;
export type CaseStatus = (typeof CASE_STATUSES)[number];

/** The recorded Escalation decision. */
export const ESCALATION_DECISIONS = ["close", "escalate"] as const;
export type EscalationDecision = (typeof ESCALATION_DECISIONS)[number];

/**
 * Crosswalk to two common platforms' classification fields, as the
 * C.L.E.A.R. verdict entry states it. Platform values are coarser than the
 * two axes: map the ASSURED verdict to the platform value, never back.
 */
export const VERDICT_CROSSWALK = [
  {
    platform: "Microsoft Sentinel",
    field: "Incident classification",
    values: ["True Positive", "Benign Positive", "False Positive"],
    mapping: {
      "True Positive":
        "true positive; activity malicious (or policy violation)",
      "Benign Positive":
        "true positive; activity authorized (benign true positive)",
      "False Positive": "false positive (logic) or false positive (data)",
    },
  },
  {
    platform: "Microsoft Defender XDR",
    field: "Incident classification",
    values: [
      "True positive",
      "Informational, expected activity",
      "False positive",
    ],
    mapping: {
      "True positive":
        "true positive; activity malicious (or policy violation)",
      "Informational, expected activity":
        "true positive; activity authorized (benign true positive)",
      "False positive": "false positive (logic) or false positive (data)",
    },
  },
] as const;

/**
 * Time budgets per phase: the single source of truth for "how long should
 * this take?" copy.
 *
 * Two surfaces render from this file:
 * - the intro's "Time per phase, by experience level" table (all columns)
 * - each chapter hero's "On-shift target" chip (the `experienced` column,
 *   ChapterHero's default via `timeOnTargetFor`)
 *
 * Values are display strings so ranges like "< 2 min" stay expressible.
 */

export type PhaseKey =
  | "alert"
  | "subject"
  | "scope"
  | "uncover"
  | "risk"
  | "escalation"
  | "documentation";

export interface TimeBudget {
  phase: PhaseKey;
  letter: string;
  label: string;
  /** New analyst, 0-6 months. */
  newAnalyst: string;
  /** Experienced analyst, 1-3 years. */
  experienced: string;
  /** Expert analyst, 3+ years. */
  expert: string;
}

export const timeBudgets: TimeBudget[] = [
  {
    phase: "alert",
    letter: "A",
    label: "Alert",
    newAnalyst: "10–20 min",
    experienced: "3–8 min",
    expert: "< 2 min",
  },
  {
    phase: "subject",
    letter: "S",
    label: "Subject",
    newAnalyst: "20–40 min",
    experienced: "8–15 min",
    expert: "3–10 min",
  },
  {
    phase: "scope",
    letter: "S",
    label: "Scope",
    newAnalyst: "15–30 min",
    experienced: "5–12 min",
    expert: "2–8 min",
  },
  {
    phase: "uncover",
    letter: "U",
    label: "Uncover",
    newAnalyst: "45–120 min",
    experienced: "20–45 min",
    expert: "10–30 min",
  },
  {
    phase: "risk",
    letter: "R",
    label: "Risk",
    newAnalyst: "15–30 min",
    experienced: "5–12 min",
    expert: "2–8 min",
  },
  {
    phase: "escalation",
    letter: "E",
    label: "Escalation",
    newAnalyst: "15–25 min",
    experienced: "5–10 min",
    expert: "3–8 min",
  },
  {
    phase: "documentation",
    letter: "D",
    label: "Documentation",
    newAnalyst: "25–45 min",
    experienced: "10–20 min",
    expert: "5–12 min",
  },
];

/** End-to-end totals row for the intro table. */
export const timeBudgetTotals = {
  newAnalyst: "~2.5–5 hr",
  experienced: "~55–120 min",
  expert: "~25–80 min",
};

/** The hero chip's default: the experienced-analyst range. */
export const timeOnTargetFor = (phase: PhaseKey): string => {
  const row = timeBudgets.find((b) => b.phase === phase);
  return row ? row.experienced : "";
};

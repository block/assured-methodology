/**
 * Time budgets per phase: the single source of truth for "how long should
 * this take?" copy.
 *
 * Two surfaces render from this file:
 * - the fast path's "Time per phase, by experience level" table, all
 *   columns (/docs/fast-path/#time-per-phase-by-experience-level)
 * - each chapter hero's "Full-arc time (Level 2)" chip (the `experienced`
 *   column, ChapterHero's default via `timeOnTargetFor`)
 *
 * Every range is the time for a full Level 2 investigation of the phase.
 * Most alerts close faster, at Level 0 or 1 of the depth ladder
 * (/docs/fast-path/), so these are diagnostic ranges, not quotas.
 *
 * Provenance: practitioner estimates from running the method on live
 * queues, not measured values. Treat them as a starting point to calibrate
 * against a team's own case records, and change the copy that cites them
 * if they are ever replaced with measured figures.
 *
 * Ranges are stored as numeric minutes; the display strings and the
 * end-to-end totals are derived from them, so the totals row cannot drift
 * from the per-phase rows. A minimum of 0 renders as "< max min".
 */

export type PhaseKey =
  | "alert"
  | "subject"
  | "scope"
  | "uncover"
  | "risk"
  | "escalation"
  | "documentation";

/** A time range in whole minutes. */
export interface MinuteRange {
  min: number;
  max: number;
}

interface TimeBudgetRow {
  phase: PhaseKey;
  letter: string;
  /** Phase name as readers see it (matches phases in navigation.ts). */
  label: string;
  /** New analyst, 0-12 months. */
  newAnalyst: MinuteRange;
  /** Experienced analyst, 1-3 years. */
  experienced: MinuteRange;
  /** Senior analyst, 3+ years. Shown as "Senior". */
  expert: MinuteRange;
}

export interface TimeBudget {
  phase: PhaseKey;
  letter: string;
  label: string;
  newAnalyst: string;
  experienced: string;
  expert: string;
  /** The numeric ranges the strings above are rendered from. */
  minutes: Pick<TimeBudgetRow, "newAnalyst" | "experienced" | "expert">;
}

const rows: TimeBudgetRow[] = [
  {
    phase: "alert",
    letter: "A",
    label: "Alert",
    newAnalyst: { min: 10, max: 20 },
    experienced: { min: 3, max: 8 },
    expert: { min: 0, max: 2 },
  },
  {
    phase: "subject",
    letter: "S",
    label: "Subject",
    newAnalyst: { min: 20, max: 40 },
    experienced: { min: 8, max: 15 },
    expert: { min: 3, max: 10 },
  },
  {
    phase: "scope",
    letter: "S",
    label: "Scope",
    newAnalyst: { min: 15, max: 30 },
    experienced: { min: 5, max: 12 },
    expert: { min: 2, max: 8 },
  },
  {
    phase: "uncover",
    letter: "U",
    label: "Uncover",
    newAnalyst: { min: 45, max: 120 },
    experienced: { min: 20, max: 45 },
    expert: { min: 10, max: 30 },
  },
  {
    phase: "risk",
    letter: "R",
    label: "Risk",
    newAnalyst: { min: 15, max: 30 },
    experienced: { min: 5, max: 12 },
    expert: { min: 2, max: 8 },
  },
  {
    phase: "escalation",
    letter: "E",
    label: "Escalation decision",
    newAnalyst: { min: 15, max: 25 },
    experienced: { min: 5, max: 10 },
    expert: { min: 3, max: 8 },
  },
  {
    phase: "documentation",
    letter: "D",
    label: "Documentation",
    newAnalyst: { min: 25, max: 45 },
    experienced: { min: 10, max: 20 },
    expert: { min: 5, max: 12 },
  },
];

/** "3–8 min", or "< 2 min" when the range starts at zero. */
export const formatRange = ({ min, max }: MinuteRange): string =>
  min === 0 ? `< ${max} min` : `${min}–${max} min`;

const roundTo = (value: number, step: number): number =>
  Math.round(value / step) * step;

/**
 * An approximate total: minutes rounded to the nearest 5, or hours rounded
 * to the nearest half hour once the rounded maximum passes 120 minutes.
 */
export const formatTotal = ({ min, max }: MinuteRange): string => {
  const maxMinutes = roundTo(max, 5);
  if (maxMinutes <= 120) return `~${roundTo(min, 5)}–${maxMinutes} min`;
  const hours = (m: number) => String(roundTo(m / 60, 0.5));
  return `~${hours(min)}–${hours(max)} hr`;
};

export const timeBudgets: TimeBudget[] = rows.map((r) => ({
  phase: r.phase,
  letter: r.letter,
  label: r.label,
  newAnalyst: formatRange(r.newAnalyst),
  experienced: formatRange(r.experienced),
  expert: formatRange(r.expert),
  minutes: {
    newAnalyst: r.newAnalyst,
    experienced: r.experienced,
    expert: r.expert,
  },
}));

const sum = (key: "newAnalyst" | "experienced" | "expert"): MinuteRange =>
  rows.reduce(
    (acc, r) => ({ min: acc.min + r[key].min, max: acc.max + r[key].max }),
    { min: 0, max: 0 },
  );

/**
 * End-to-end totals row for the fast-path time table, summed from the rows
 * above (today 145–310, 56–122 and 25–78 minutes).
 */
export const timeBudgetTotals = {
  newAnalyst: formatTotal(sum("newAnalyst")),
  experienced: formatTotal(sum("experienced")),
  expert: formatTotal(sum("expert")),
};

/** The hero chip's default: the experienced-analyst, full-arc range. */
export const timeOnTargetFor = (phase: PhaseKey): string => {
  const row = timeBudgets.find((b) => b.phase === phase);
  return row ? row.experienced : "";
};

/** The new-analyst range for the same phase (shown beside the default). */
export const newAnalystTimeFor = (phase: PhaseKey): string => {
  const row = timeBudgets.find((b) => b.phase === phase);
  return row ? row.newAnalyst : "";
};

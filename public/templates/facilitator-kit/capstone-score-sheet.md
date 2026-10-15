# Capstone score sheet and agreement worksheet

<!-- ASSURED Methodology by Timothy Zilber, © Block, Inc., CC BY 4.0
     (https://creativecommons.org/licenses/by/4.0/). Reuse and adapt freely
     with attribution; note any changes you make.
     ASSURED facilitator kit, rater sheet
     (https://assured-methodology.vercel.app/docs/teaching/kit). One sheet
     per rater per script. Fill it alone; do not look at the other rater's
     sheet until both are handed to the coordinator. -->

## Part 1 · One rater, one script

- Candidate code:
- Rater ID:
- Did you teach this candidate? (yes / no):
- Scored at (UTC):

Score each item 1 (earned) or 0 (not earned) against the scoring guide.
When unsure, score 0 and write why: the reason is what calibration fixes.

| # | Item (short form) | Score (1 / 0) | Evidence in the script, or why not |
| --- | --- | --- | --- |
| 1 | TP; activity undetermined at Alert |  |  |
| 2 | Level 2 at intake, gate reason (decision item) |  |  |
| 3 | Actor = holder of rkim's session |  |  |
| 4 | Fingerprint vs CHG-5530; comment untrusted |  |  |
| 5 | Authorization contradicted (key, window, no amendment) |  |  |
| 6 | Entities, with the fingerprint as a sweep target |  |  |
| 7 | Lookback on rkim; sweep of db-pay-01, -02, -04 |  |  |
| 8 | Regulated data as a Scope flag, no clock claimed |  |  |
| 9 | Ledger with the rkim-early alternative open |  |  |
| 10 | db-pay-03 read as discovery, unexplained by the alternative |  |  |
| 11 | Matching comment as a lead: CHG-5530 access log |  |  |
| 12 | Impact High |  |  |
| 13 | Likelihood High, confidence per claim |  |  |
| 14 | High/High: P1 (decision item) |  |  |
| 15 | Escalates before the inject, route named (decision item) |  |  |
| 16 | Preservation first; reversible vs awaiting approval |  |  |
| 17 | Handoff sections 1, 5, 6 with confidence labels |  |  |
| 18 | Section 8 open questions with query or contact |  |  |
| 19 | Feedback item that fires at 01:16 or a VPN prevention item |  |  |
| 20 | Post-inject update correct |  |  |

- Total (0-20):
- Decision items 2, 14 and 15 all earned? (yes / no):
- Disqualifier triggered? (none, or which one, quoting the script):
- Result (pass: at least 15, all three decision items, no disqualifier):

**Close-note rubric on section 1 (feedback only, not scored):** verdict on
both axes / every claim cites an artifact / confidence labeled / gaps named
with a reopen or upgrade condition / next action clear. Mark each pass or
fail for the debrief.

## Part 2 · Two raters, one script (the coordinator fills this)

| # | Rater A | Rater B | Agree? |
| --- | --- | --- | --- |
| 1-20 | (copy from Part 1) | (copy from Part 1) |  |

- Items agreed (of 20):
- Item agreement (items agreed ÷ 20):
- Decision items and disqualifier identical? (yes / no):
- Action: at 17 of 20 or more, with identical decision items and
  disqualifier, reconcile the split items by discussion. Below 17, or on any
  decision-item or disqualifier split, a third rater who did not teach the
  cohort scores the script before discussion.
- Raw totals kept: A ___ · B ___ · reconciled ___

## Part 3 · The cohort (the coordinator fills this once all scripts are in)

Pool every item rating from every script, before reconciliation.

| | Rater B scored 1 | Rater B scored 0 | Row total |
| --- | --- | --- | --- |
| Rater A scored 1 | a = | b = | a + b = |
| Rater A scored 0 | c = | d = | c + d = |
| Column total | a + c = | b + d = | N = |

- Observed agreement: po = (a + d) ÷ N
- Chance agreement: pe = [(a + b) ÷ N] × [(a + c) ÷ N] + [(c + d) ÷ N] ×
  [(b + d) ÷ N]
- Cohen's kappa: κ = (po − pe) ÷ (1 − pe)

**Worked example.** Six scripts × 20 items, N = 120. a = 69, b = 9, c = 3,
d = 39. po = 108 ÷ 120 = 0.90. Rater A scored 1 on 78 (0.65), rater B on 72
(0.60), so pe = 0.65 × 0.60 + 0.35 × 0.40 = 0.53. κ = (0.90 − 0.53) ÷ 0.47 ≈
0.79: above the 0.60 floor, just short of the 0.80 aim.

**Reading the result.** Report both numbers. Below κ = 0.60, the cohort's
scores are not usable: find the items with the most splits, rewrite their
wording in the grid, and re-score from the scripts (do not average). When
nearly every script earns an item, kappa can read low even with high raw
agreement, so look at the item-level splits before rewriting anything.

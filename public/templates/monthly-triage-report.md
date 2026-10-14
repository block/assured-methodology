# Monthly triage report

<!-- ASSURED Methodology by Timothy Zilber, © Block, Inc., CC BY 4.0
     (https://creativecommons.org/licenses/by/4.0/). Reuse and adapt freely
     with attribution; note any changes you make.
     ASSURED measuring triage
     (https://assured-methodology.vercel.app/docs/measuring-triage).
     One page, the same shape every month. Every number uses the formula,
     window and source field written down with the baseline; if a formula
     changed this month, say so in the header. Team-level only: this report
     never carries a per-analyst ranking or a per-analyst speed figure.
     Times are medians (p50) and 90th percentiles (p90), not means. Where a
     denominator is below about twenty, give the count and list the cases. -->

## Header

- Month and team:
- Prepared by, and reviewed with (the SOC lead; IR for the receiver-judged
  metrics):
- Data window (UTC) and the record sources it was drawn from:
- Formula changes since last month ("none", or what changed and why):
- Baseline date (the Stage 2 baseline these numbers compare against):

## 1. Volume and capacity

<!-- Capacity: analyst-hours demanded = cases reaching a person x sum of
     (level share x minutes at that level) / 60. Analyst-hours available =
     analyst-shifts x productive hours per shift (state the assumption). -->

- Alerts received:
- Cases opened (after grouping), and alerts per case:
- Machine closes (on machine-close entries):
- Cases reaching a person:
- Level mix of cases closed (Level 0 / Level 1 / Level 2, and machine as its
  own line):
- Analyst-hours demanded, and the minutes per level used:
- Analyst-hours available, and the productive hours per shift assumed:
- Uninvestigated share (alerts closed with no disposition / alerts received):

## 2. Flow

| Measure | P1 | P2 | P3 | P4 |
| --- | --- | --- | --- | --- |
| Time to acknowledge, p50 / p90 |  |  |  |  |
| SLA-breach rate (count / cases in band) |  |  |  |  |

| Measure | Level 0 | Level 1 | Level 2 |
| --- | --- | --- | --- |
| Time to verdict, p50 / p90 |  |  |  |

- Time to escalate (P1 and P2), p50 / p90:
- Every P1 this month: case ID, first criterion confirmed (UTC), paged
  (UTC), interval, and one line on any delay:

## 3. Quality, each beside its pair

<!-- Read each row with its pair. A number without its pair is not reported. -->

| Metric | This month | Last month | Baseline | Read with | Note |
| --- | --- | --- | --- | --- | --- |
| Receipt fill rate |  |  |  | (precondition for the next two) |  |
| Escalation acceptance (yes; partially on its own line) |  |  |  | Missed incidents |  |
| Handoff rework (top packet section named) |  |  |  | Time to escalate |  |
| Handback rate by reason; de-escalation rate |  |  |  | SLA-breach rate |  |
| Reopen rate, 30 days (cases closed last month) |  |  |  | Level mix, time to verdict |  |
| Close-note quality (share passing all five; weakest check; sample n) |  |  |  | Level mix |  |
| Verdict agreement on blind re-triage (activity verdict, band, decision; kappa; n) |  |  |  | Close-note quality |  |

## 4. Detection health (the five noisiest rules, rolling 30 days)

| Rule and version | Alerts | Precision | Actionability | Benign TP share | FP (logic) | FP (data) | Open tuning requests |
| --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |

- Tuning cycle time, p50 (request opened to change merged):
- Exceptions past expiry (count, and the rules they sit on):

## 5. Fast-path health

- Level 0 reversal rate on the re-verification sample (reversed / sampled),
  and every entry suspended this month:
- Re-verification coverage (entries with a close re-verified / entries with
  closes; should be 100 percent):
- Pattern entries past review date (should be zero):
- Close-rate anomalies (entries outside their normal close volume or host
  spread), and what the Level 2 review found:
- Machine-close entries active, their closes, their reversal and miss rates,
  and kill-switch tests:
- Tuning requests filed from benign-close findings, and closed:

## 6. AI split

<!-- Unassisted = Material AI use "none". AI-assisted = the field names an
     assistant. Machine-executed = closed by automation on a machine-close
     entry. Leave a cell blank rather than estimate it. -->

| Metric | Unassisted | AI-assisted | Machine-executed |
| --- | --- | --- | --- |
| Reopen rate |  |  |  |
| Missed incidents (count) |  |  |  |
| Close-note quality |  |  |  |
| Level 0 reversal rate |  |  |  |

- Draft correction rate (AI-drafted sections changed materially / reviewed):
- Citation validity (claims whose evidence link resolves / claims checked):
- Regression-set false-benign rate per alert class, and the model, prompt or
  tool change that triggered the last run:

## 7. Every missed incident and every reopen

| Case ID | What surfaced it (reopen, IR review, hunt, red team) | Which phase's deliverable would have caught it | Action taken |
| --- | --- | --- | --- |
|  |  |  |  |

## 8. Work items

<!-- At least one. A review that produces no work item is a meeting, not a
     steering input. -->

| Item | Metric that produced it | Owner | Due | Status of last month's items |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

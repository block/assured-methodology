# Case record

<!-- ASSURED Methodology by Timothy Zilber, © Block, Inc., CC BY 4.0
     (https://creativecommons.org/licenses/by/4.0/). Reuse and adapt freely
     with attribution; note any changes you make.
     ASSURED: the living case record, one section per phase
     (https://assured-methodology.vercel.app/docs/documentation/templates).
     The case, not the alert, is the unit of work: one record per case,
     opened at Alert and filled phase by phase. Each phase's section is that
     phase's handoff; the escalation handoff packet and the event report are
     assembled from this record, not written from scratch. At Level 1 most
     sections are a line or two (the alert report is the usual Level 1
     record); at Level 2, attach the full phase templates where this record
     points to them. Entries lock at handoff or close; corrections are
     appended with author, time and reason, never overwritten. Fields marked
     (optional) can be left out when they do not apply. -->

## Case metadata

- Case ID: CASE-YYYYMMDD-NNN
- Member alert IDs (every alert grouped into this case; the riskiest member
  sets the level):
- Related incident ID (only if declared): INC-YYYYMMDD-NNN
- Case owner (analyst), and IR owner once the escalation tripwire fires:
- Depth level (0 / 1 / 2), and any upward moves with their reason (a case
  moves up the ladder, never down):
- Distribution (optional: TLP, the Traffic Light Protocol, and any
  need-to-know limits):
- Material AI use (assistant and version, and which sections began as AI
  drafts; "none" if unassisted):

## A: Alert

- Detected (UTC), detection source, and rule (name, ID, and version):
- Intake channel (detection / user report / external notification /
  bug-bounty report / hunt finding / provider escalation / internal
  referral):
- Claim (what the rule or report says), and whether it happened:
- Detection axis (true positive / false positive (logic) / false positive
  (data)), provisional at this phase:
- Alternatives to test (each benign or malicious explanation, named):
- Regulatory flag as written (data reached, or only reachable):

## S: Subject

<!-- Level 2: attach the Subject handoff (subject-summary.md). Analysts
     record observable technical activity only. -->

- Entities on the map (each with type, classification and per-dimension
  verdict, cleared ones included; type: user / service account / host or
  device / application or OAuth grant / session or token / resource /
  artifact / network identifier / threat; classification: primary /
  secondary / downstream / originating threat):
- Insider posture (activity mapped to the Insider Threat Matrix, or "none
  observed"):

## S: Scope

<!-- Level 2: attach the Scope boundary statement (scope-boundary.md).
     Level 1: these three lines are Scope. -->

- Window and its anchor event (UTC), with the retention check:
- Subject, and what is excluded (with the reason):
- Regulatory tags (candidate awareness timestamp UTC, owner engaged at UTC)
  and named gaps:

## U: Uncover

### Hypothesis ledger

<!-- One row per hypothesis weighed. Provenance: the source and query (or
     artifact ID) behind each deciding item, so the next analyst can re-run
     it. -->

| Hypothesis | Status (leading / rejected / open) | Deciding evidence | Source and query (provenance) | Confidence |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

- ATT&CK techniques, if mapped (with the ATT&CK version, e.g. Enterprise v19):
- Preserved (what, hash or reference, at UTC):

## R: Risk

<!-- Level 2: the full Risk verdict block (risk-verdict.md). Risk recommends;
     it does not decide close or escalate. -->

- Impact (H/M/L), the higher of asset criticality and business impact:
- Likelihood that the activity is malicious or unauthorized (H/M/L):
- Confidence in that judgment (high / medium / low, shared rubric):
- Matrix cell (impact / likelihood) and priority (P1-P4), or the confirmed
  criterion that set P1:
- Recommended move:

## E: Escalation decision

<!-- Escalate if a criterion is confirmed or the matrix places the case at P1
     or P2. At P3, keep working to the named re-score trigger, then close or
     escalate. Close at P4. Record the cell either way. A Level 0 close or an
     escalation-tripwire escalation from an earlier phase is an early
     Escalation decision, recorded here. -->

- Decision (close / escalate), decided by, at (UTC):
- Basis (confirmed criterion under the escalation tripwire / matrix cell /
  operational route such as capacity), with one line of rationale:
- Handed to (receiving owner), accepted by, at (UTC), if escalated:
- Closure check, if closed (no criterion confirmed or suspected; the cell
  allows it; no persistence or credential access seen; the case's own
  alternatives checked clean; gaps bounded):

## D: Documentation

- Final verdict, detection axis (true positive / false positive (logic) /
  false positive (data)):
- Final verdict, activity axis (malicious / policy violation / authorized
  (benign true positive) / benign-confirmed / undetermined):
- Status (closed / escalated / merged into case), with related case or
  incident IDs:
- Reopen conditions (required for benign and authorized closes):
- Key times (UTC): detected / acknowledged / verdict / escalated or closed /
  contained / reopened:
- Event report (link), closure review (reviewer, outcome, at UTC):
- Next action (tuning request, pattern-entry proposal, or "nothing further",
  with the reason):

## Actions log

<!-- One row per action, every phase. Actor is a named human, an automated
     system (SOAR or platform automation, EDR, IAM), or an AI agent (product
     and version, plus the human who authorized the action). -->

| Timestamp (UTC) | Phase | Actor | Action taken | Rationale | Outcome / result |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

# Alert report

<!-- ASSURED Methodology by Timothy Zilber, © Block, Inc., CC BY 4.0
     (https://creativecommons.org/licenses/by/4.0/). Reuse and adapt freely
     with attribution; note any changes you make.
     ASSURED documentation: the core alert reporting template, used for
     Level 1 cases (https://assured-methodology.vercel.app/docs/documentation/templates).
     Universal core fields; add specialized fields per event type
     (phishing, credential compromise, ransomware, ...) as needed. Fields
     marked (optional) can be left out when they do not apply. -->

## Event title and identifier

- Title:
- Case ID: CASE-YYYYMMDD-NNN
- Related incident ID (only if declared): INC-YYYYMMDD-NNN
- Reopens case (optional: the prior case ID, when this alert reopens a
  closed case):
- Analyst:
- Depth level (0 / 1 / 2), and any upward moves with their reason (a case
  moves up the ladder, never down):
- Grouped alerts (optional: every member alert ID, when several alerts form
  this one case; the riskiest member sets the level):
- Distribution (optional: TLP, the Traffic Light Protocol, and any
  need-to-know limits):
- Regulatory flags (optional: data classes plausibly involved, candidate
  awareness timestamp, owner engaged):
- Material AI use (assistant and version, and which sections began as AI
  drafts; "none" if unassisted):

## Detection timestamp and source

- Detected (UTC):
- Local time (optional):
- Detection source (tool or control, e.g. EDR / SIEM / CSPM):
- Detection rule (name, ID, and version):
- Intake channel (detection / user report / external notification /
  bug-bounty report / hunt finding / provider escalation / internal
  referral) and source grade (optional):
- Received (UTC): when the report or notice reached the organization, when
  it reached the SOC, and who received it:

## Activity summary

<!-- The observable behavior that triggered the alert. Specific indicators
     and anomalies, technical but readable. Defang indicators in prose.
     Label each claim's confidence (high / medium / low, shared rubric). -->

## Initial triage outcome

<!-- Two axes: detection (true positive / false positive (logic) /
     false positive (data)) and activity (malicious / policy violation /
     authorized (benign true positive) / benign-confirmed / undetermined),
     with a concise justification grounded in observable behavior and
     detection logic. A correct detection of authorized behavior is a
     benign true positive, not a false positive. When no rule fired, the
     report is the detection: a report whose claim holds is a true
     positive; a misread report is a false positive (logic); a notice built
     on bad data is a false positive (data). -->

- Classification, detection axis:
- Classification, activity axis:
- Justification:

### Hypothesis ledger (optional)

| Hypothesis | Status (leading / rejected / open) | Deciding evidence | Confidence |
| --- | --- | --- | --- |
|  |  |  |  |

- ATT&CK techniques, if mapped (with the ATT&CK version, e.g. Enterprise v19):

## Affected systems

<!-- Endpoints, accounts, infrastructure involved, with business context:
     function, criticality, ownership. -->

-

## Risk assessment

<!-- Impact is the higher of asset criticality and business impact.
     Likelihood is how probable it is that the activity is malicious or
     unauthorized; confidence is your analytic confidence in that judgment.
     Unexamined evidence means low confidence, not low likelihood. -->

- Impact (H/M/L):
- Likelihood (H/M/L):
- Confidence in the likelihood judgment (high / medium / low):
- Matrix cell (impact / likelihood) and priority (P1-P4):
- Recommended move (close, escalate, or keep working to a named re-score
  trigger):

## Actions taken

<!-- One row per action. Timestamps in UTC. Actor is a named human, an
     automated system (SOAR or platform automation, EDR, IAM), or an AI
     agent (product and version, plus the human who authorized the action). -->

| Timestamp (UTC) | Actor | Action taken | Rationale | Outcome / result |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Escalation decision and final disposition

<!-- Escalate if a criterion is confirmed or the matrix places the case at P1
     or P2. At P3, keep working to the named re-score trigger, then close or
     escalate. Close at P4. Record the cell either way. -->

- Escalated: yes / no; to whom, and why (or why not):
- Decided by, at (UTC):
- Escalation basis, if escalated (confirmed criterion under the escalation
  tripwire / matrix cell at P1 or P2 / operational route such as capacity):
- Closure justification, if closed (the closure check: no criterion confirmed
  or suspected; the cell allows it; no persistence or credential access seen;
  the case's own alternatives checked clean; gaps bounded):
- Gaps, and the condition that would reopen the case:
- Final disposition, both axes, and status (closed / escalated / merged into case):
- Key times (UTC): detected / acknowledged / verdict / escalated or closed /
  reopened:
- Next action (tuning request, pattern-entry proposal, handoff, or "nothing
  further", with the reason):

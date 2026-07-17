# Escalation handoff packet

<!-- ASSURED escalation: the nine-section handoff packet
     (https://assured-methodology.vercel.app/docs/escalation/handoff).
     Target: the whole packet is readable in five minutes. -->

## Case metadata

<!-- The packet identifies itself before it explains itself: which case, who
     wrote it, when, who owns the next action, and why it escalated. The
     criterion is the canonical category that fired (confirmed malicious
     activity / high impact / lateral movement or exfiltration / ongoing
     campaign) under the break-glass rule, or the triage-matrix cell that
     mandated escalation (e.g. High/Medium: P2, within shift). -->

- Case ID:
- Prepared by (triage analyst):
- Prepared at (UTC):
- Handed to (receiving team, and the named owner of the next action):
- Escalation criterion met (canonical category or matrix cell), with a
  one-line rationale citing the confirming evidence:
- Material AI use (assistant and version, and which sections began as AI
  drafts; "none" if unassisted):

## 1. Case summary

<!-- One paragraph. What happened, what is known, what the triage analyst
     recommends. -->

## 2. Timeline

<!-- Sequential events with timestamps: both adversary actions and analyst
     actions (when notified, what was checked, when escalated). -->

| Timestamp (UTC) | Actor | Action taken | Rationale | Outcome / result |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## 3. Entities

<!-- Primary and secondary entities with their assessment results: the
     Subject and Scope output. -->

-

## 4. Evidence chain

<!-- The Uncover narrative, with sources, queries used, and MITRE technique
     mappings. -->

## 5. Risk verdict

<!-- The four RATM dimensions, reduced to impact and likelihood, then the
     combined priority and recommended response. -->

- RATM asset criticality (H/M/L):
- RATM threat actor intent (H/M/L):
- RATM exploitation & scope (H/M/L):
- RATM business impact (H/M/L):
- Impact (criticality + business impact):
- Likelihood (intent + exploitation, weighted by evidence quality):
- Priority:
- Recommended response:

## 6. Containment actions taken

<!-- What was already done (host isolated, account disabled, ...) AND what
     was deliberately not done, and why. -->

-

## 7. Artifacts

<!-- Relevant log excerpts, IoCs, hashes, screenshots, queries, attached or
     linked so the next analyst does not have to re-derive them. For each
     artifact, record its custody / preservation state: where the original
     lives, its identifying hash, and who has handled it so far. -->

- Artifact:
  - Custody / preservation state:

## 8. Open questions

<!-- What triage could not resolve and would have pursued next. The IR team
     picks up from this list. -->

-

## 9. Communication record

<!-- Who has been notified so far, on which channel, when. Prevents duplicate
     notifications and starts the audit trail for regulatory reporting. -->

| Time (UTC) | Who was notified | Channel | By whom |
| --- | --- | --- | --- |
|  |  |  |  |

# Event report

<!-- ASSURED documentation: the nine-section event report
     (https://assured-methodology.vercel.app/docs/documentation/standards#format).
     This is the closure-time record, written for the future reader. It is a
     different artifact from the escalation handoff packet; when a packet
     exists, map it in per the crosswalk on the Standards page. -->

## Decision header

<!-- The authoritative close-out, above the nine sections: who decided what,
     at what priority and confidence, when, and how the draft was produced.
     Verdict axes as in the Level 0 pattern-close record. Detection
     correctness: did the rule correctly detect the behavior it looks for?
     Activity disposition: benign-confirmed / authorized / malicious /
     undetermined; a correct detection of benign behavior is a benign true
     positive, not a false positive. Confidence uses the shared high / medium /
     low rubric on the Standards page; between levels, round down. -->

- Final verdict, detection correctness:
- Final verdict, activity disposition (one line of justification):
- Priority at close (P1-P4), with the matrix cell (e.g. High/Medium) or named
  override (break-glass, high-impact clock, documented downgrade) that
  produced it:
- Evidence confidence (high / medium / low):
- Open uncertainty (what remains unresolved at close; "none" must be earned):
- Prepared by (analyst):
- Prepared at (UTC):
- Material AI use (assistant and version, and which sections began as AI
  drafts; "none" if unassisted):

## 1. Event overview

<!-- Who, what, when, where, how, at a glance. -->

- Alert identifier:
- Detection date/time (UTC):
- Affected system or environment:
- Plain-language description of observed behavior:
- Current status: resolved / ongoing / escalated

## 2. Timeline of events

<!-- Chronological breakdown: initial alert, investigative actions with UTC
     timestamps, response measures, phase transitions, delays or decision
     points, final resolution. -->

| Timestamp (UTC) | Actor | Action taken | Rationale | Outcome / result |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## 3. Origin and scope

<!-- How the event originated and its impact radius, as established at
     triage: initial access vector as observed, adversary TTPs, affected
     systems / identities, lateral movement, privilege escalation, data
     exposure, evidence references. For escalated cases, link IR's
     root-cause analysis; do not restate it. -->

## 4. Actions taken

<!-- Investigative procedures, containment measures, remediation tasks:
     tools or methods used, responsible individual or team, outcome of each
     action. -->

-

## 5. Business impact

<!-- Technical detail translated into organizational consequence:
     operational disruption, financial impact, regulatory implications,
     reputational effects, SLA violations, external communications. -->

## 6. Indicators of compromise

<!-- Network indicators (IPs, domains, URLs), host-based indicators (files,
     registry keys), email indicators, each with confidence levels and
     recommended detection logic. List the MITRE ATT&CK technique chain here
     too, labeled as behavior (TTPs), not as indicators. -->

-

## 7. Lessons learned

<!-- Detection gaps, process inefficiencies, response challenges,
     communication breakdowns, successful tactics, technology limitations. -->

-

## 8. Post-event recommendations

<!-- Specific, actionable improvements with ownership and timelines. Carry
     forward any open questions from the handoff packet that were not
     resolved by close. -->

-

## 9. Appendices and evidence

<!-- Log excerpts (sanitized as needed), snapshots, tool outputs, the
     communication record preserved verbatim, related case references,
     external intelligence reports, chain-of-custody documentation. -->

-

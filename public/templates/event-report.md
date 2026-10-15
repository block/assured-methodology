# Event report

<!-- ASSURED Methodology by Timothy Zilber, © Block, Inc., CC BY 4.0
     (https://creativecommons.org/licenses/by/4.0/). Reuse and adapt freely
     with attribution; note any changes you make.
     ASSURED documentation: the nine-section event report
     (https://assured-methodology.vercel.app/docs/documentation/standards#format).
     This is the closure-time record, written for the future reader. It is a
     different artifact from the escalation handoff packet; when a packet
     exists, map it in per the crosswalk on the Standards page. Fields marked
     (optional) can be left out when they do not apply. -->

## Decision header

<!-- The authoritative close-out, above the nine sections: who decided what,
     at what priority and confidence, when, and how the draft was produced.
     Detection axis: true positive / false positive (logic) / false positive
     (data). Activity axis: malicious / policy violation / authorized (benign
     true positive) / benign-confirmed / undetermined. A correct detection of
     authorized behavior is a benign true positive, not a false positive.
     "Merged into case" is a status, not a verdict. Confidence uses the shared
     high / medium / low rubric on the Standards page; between levels, round
     down. -->

- Bottom line (2-3 plain-language sentences for a non-technical reader: what
  happened, what it means for the business, what is still open):
- Final verdict, detection (true positive / false positive (logic) /
  false positive (data)):
- Final verdict, activity (malicious / policy violation / authorized (benign
  true positive) / benign-confirmed / undetermined, one line of
  justification):
- Escalation decision (close or escalate), who decided, and when (UTC):
- Status (closed / escalated / merged into case), with related case or
  incident IDs:
- Priority at close (P1-P4), with the matrix cell (e.g. High/Medium) or named
  override (escalation tripwire, high-impact clock, documented downgrade)
  that produced it:
- Confidence in the final verdict (high / medium / low, shared rubric; round
  down). Other claims carry their own labels where they appear, e.g. each
  claim in section 3 and each indicator in section 6:
- Depth level worked (0 / 1 / 2), and any upward moves with their reason:
- Open uncertainty (what remains unresolved at close; "none" must be earned):
- Reopen conditions (observable triggers that would revisit this verdict;
  required for benign and authorized closes):
- Key times (UTC): detected / acknowledged / verdict / escalated or closed /
  contained / reopened:
- Distribution (TLP, the Traffic Light Protocol, and any need-to-know
  limits, e.g. insider cases):
- Notification clocks (optional: yes / no; if yes, fill the regulatory flags
  block below):
- Prepared by (analyst):
- Prepared at (UTC):
- Material AI use (assistant and version, and which sections began as AI
  drafts; "none" if unassisted):

### Regulatory flags (optional, when regulated data is plausibly involved)

<!-- Each regulatory or contractual clock that may apply. Triage records the
     candidate start; the regime's owner decides whether the clock started. -->

| Regime | Data class and trigger observed | Candidate awareness or trigger timestamp (UTC) | Owner engaged (who), at (UTC) | Owner's decision |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

- Estimated affected individuals and their jurisdictions (if known):
- Preservation or legal-hold status and scope (who authorized it, and when, UTC):
- Counsel handling instructions (labeling, channel, distribution), if any:

## 1. Event overview

<!-- Who, what, when, where, how, at a glance. -->

- Alert identifier (or the case ID and every member alert ID):
- Detection date/time (UTC):
- Affected system or environment:
- Plain-language description of observed behavior:
- Status: closed / escalated / merged into case (related case or incident IDs):

## 2. Timeline of events

<!-- Chronological breakdown starting at the earliest known adversary
     activity, not at the alert: initial alert, investigative actions with
     UTC timestamps, response measures, phase transitions, delays or decision
     points, final resolution. Keep delays visible; do not smooth the
     timeline in hindsight. Name each row's source and its confidence. -->

| Timestamp (UTC) | Actor | Action taken | Rationale | Source | Confidence | Outcome / result |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |

## 3. Origin and scope

<!-- How the event originated and its impact radius, as established at
     triage: initial access vector as observed, adversary TTPs, affected
     systems / identities, lateral movement, privilege escalation, data
     exposure, evidence references, each claim with its own confidence
     label. For escalated cases, link IR's root-cause analysis; do not
     restate it. -->

### Scope (optional)

<!-- Type each entity as the Subject handoff does: user / service account /
     host or device / application or OAuth grant / session or token /
     resource / artifact / network identifier / threat. -->

- Entities in scope, time window and lookback (each entity with its type):
- Deliberately out of scope, and the observation that would have pulled
  each in:
- Reachable but not shown to be touched (Scope flags; regulated data that
  was plausibly accessed goes in the regulatory flags block):
- Visibility gaps (sources missing, retention limits, pending vendor data):

### Hypothesis ledger (optional)

<!-- The hypotheses the investigation weighed, and how each ended, with the
     source and query (or artifact ID) behind each deciding item. -->

| Hypothesis | Status (leading / rejected / open) | Deciding evidence | Source and query (provenance) | Confidence |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## 4. Actions taken

<!-- Investigative procedures, containment measures, remediation tasks:
     tools or methods used, responsible individual or team, outcome of each
     action. Record what was preserved before any containment, and the IR or
     owner approval for any non-reversible action. -->

-

## 5. Business impact

<!-- Technical detail translated into organizational consequence:
     operational disruption, financial impact, regulatory implications,
     reputational effects, SLA violations, external communications. -->

## 6. Indicators and observables

<!-- Every entry carries a disposition and a confidence. Defang indicators in
     prose (hxxp, [.]). Known-good entries go to the allowlist or
     warninglist, never to the IOC feed. The MITRE ATT&CK technique chain
     rides here, labeled as behavior (TTPs), not as indicators; state the
     ATT&CK version the chain was mapped against (e.g. Enterprise v19). -->

| Indicator or observable | Type | Disposition (malicious / suspicious / known-good) | Confidence | Detection logic | TLP |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

- ATT&CK chain (version):

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

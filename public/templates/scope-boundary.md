# Scope boundary statement

<!-- ASSURED Methodology by Timothy Zilber, © Block, Inc., CC BY 4.0
     (https://creativecommons.org/licenses/by/4.0/). Reuse and adapt freely
     with attribution; note any changes you make.
     ASSURED Scope: the boundary statement
     (https://assured-methodology.vercel.app/docs/scope/transition).
     One page, written at the end of Scope and pinned above Uncover's query
     window. It answers eight questions, so an analyst joining mid-case knows
     what is in, what is out, and what Uncover is looking for. Level 2 gets
     the full statement. At Level 1, Scope is three lines in the alert report
     instead: the window and its anchor; the subject and what is excluded;
     any regulatory flag and named gap. Level 0 has no Scope step.
     The boundary moves only with a recorded justification: append to the
     change log at the end, never overwrite. Fields marked (optional) can be
     left out when they do not apply. -->

- Case ID:
- Prepared by (analyst), at (UTC):
- Subject handoff it starts from (link):
- Material AI use (assistant and version, and which sections began as AI
  drafts; "none" if unassisted):

## 1. Threat type

<!-- Selects the playbooks and the data sources Uncover reaches for first. -->

- Threat type (e.g. phishing-driven intrusion, credential misuse, cloud key
  exposure, insider data movement):
- Playbook, and the data sources Uncover queries first:

## 2. Windows

<!-- All times UTC. Each window names the anchor event it is measured from
     (the alert, the earliest known activity, an entity's last known-good
     point) and passes a retention check: the oldest data the window needs
     against each source's retention. A window a source cannot cover is a
     named gap in section 4. -->

| Window | From (UTC) | To (UTC) | Anchor event | Entities it applies to | Retention check (source, retention, covers yes / no) |
| --- | --- | --- | --- | --- | --- |
| Primary |  |  |  |  |  |
| Extended |  |  |  |  |  |
| Forward (watch) |  |  |  |  |  |

## 3. Entities and sweeps

<!-- Every entity Subject put on the map gets a category, a depth and a
     one-line justification. Primary: full depth. Secondary: a baseline
     check. Downstream: inside the boundary as a system the subject can
     reach, logs pinned, no profile of its own. Originating threat: tracked
     as adversary infrastructure, not as an internal identity. Out of scope:
     the reason, and the observation that would pull it in. Type, as in the
     Subject handoff: user / service account / host or device / application
     or OAuth grant / session or token / resource / artifact / network
     identifier / threat. -->

| Entity | Type | Category (primary / secondary / downstream / originating threat / out of scope) | Depth | Justification | What would change its category |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

### Sweeps

<!-- A sweep is a bounded query, not "check everything": which indicator or
     behavior, across which population, over which window, with a written
     stop condition. Each hit becomes a primary or secondary entity. A sweep
     is a snapshot, so re-run it before Uncover hands off. -->

| Sweep (indicator or behavior) | Population | Window | Stop condition | Run at (UTC) | Result | Re-run at (UTC) |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |

## 4. Constraints

### Data sources and named gaps

<!-- A source the SOC cannot see is a gap, not an out-of-scope decision.
     Name what each gap hides and what is being done about it. -->

- Sources in use (source, and the window it covers):
- Gaps (source or population not visible, what it hides, and the request or
  workaround):

### Requests in flight

| Request (logs, vendor data, owner question, legal hold) | Sent to | Sent at (UTC) | Expected by (UTC) | Status |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

### Regulatory tags

<!-- "Can reach" is enough to tag the case. Triage records the facts a clock
     may start from; the regime's owner (privacy, legal, compliance) decides
     whether and when it started. Some clocks start at awareness (a
     reasonable degree of certainty that personal data was compromised), not
     at confirmation, so record the candidate timestamps now. -->

| Regime (candidate) | Data class in reach or touched | Candidate discovery timestamp (UTC) | Candidate awareness timestamp (UTC) | Owner engaged (who) | Owner engaged at (UTC) |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## 5. Open questions for Uncover

<!-- Each question maps to a query Uncover can run. Cover initial access,
     extent of compromise, persistence (including OAuth consent grants,
     mailbox rules, new MFA methods or devices, IDE extensions and MCP
     servers), lateral movement, data movement, and intent. -->

| Open question | Query or source that answers it | Priority |
| --- | --- | --- |
|  |  |  |

## 6. Escalation posture

<!-- A confirmed criterion fires the escalation tripwire from any phase;
     suspicion only refines Scope. If the tripwire has fired, say so: IR owns
     the case, and Uncover runs as scoping support under IR's clock. -->

- Escalation tripwire (not fired / fired: criterion, at UTC, IR owner):
- Containment status (what is contained, by whom, verified how):
- Findings that would fire the tripwire (each criterion still open as a
  suspicion, and the evidence that would confirm it):

## 7. Preservation

<!-- Preserve before you contain. Record what is held, hashed or paused, so
     Uncover knows what still exists. -->

- Held or exported (artifact or source, hash or reference, at UTC):
- Rotation or cleanup paused (source, until when):

## 8. Time box

<!-- Sized from the Scope time guidance. At the checkpoint, Uncover
     converges, re-scopes, or pulls in a peer or tiers up (reported as
     "still investigating", with the open hypotheses and what was checked).
     A lapsed time box is not an IR trigger: escalation to IR runs on the
     criteria and the matrix, not on elapsed time. When the tripwire has
     already fired, the escalation decision is not on this clock. -->

- First convergence checkpoint (UTC):
- Converge, re-scope, or pull in a peer or tier up deadline (UTC):

## Boundary changes

<!-- Append, never overwrite. Each change carries the three-line
     justification: evidence, risk, required actions. An entity the evidence
     clears leaves the boundary the same way, with its reason. -->

| Changed at (UTC) | Entity or window | In or out | Evidence | Risk | Required actions | By |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |

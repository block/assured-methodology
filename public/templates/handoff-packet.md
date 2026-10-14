# Escalation handoff packet

<!-- ASSURED Methodology by Timothy Zilber, © Block, Inc., CC BY 4.0
     (https://creativecommons.org/licenses/by/4.0/). Reuse and adapt freely
     with attribution; note any changes you make.
     ASSURED escalation: the nine-section handoff packet
     (https://assured-methodology.vercel.app/docs/escalation/handoff).
     Target: the case summary plus the Risk verdict give the receiver the
     picture in five minutes; the remaining sections are navigated by heading.
     Fields marked (optional) can be left out when they do not apply. -->

## Case metadata

<!-- The packet identifies itself before it explains itself: which case, who
     wrote it, when, who owns the next action, and why it escalated. The
     escalation basis is one of three routes: a canonical criterion confirmed
     (confirmed malicious activity not fully contained by a control / high
     impact / lateral movement or exfiltration / ongoing campaign) under the
     escalation tripwire, which makes the case P1; the triage-matrix cell
     (e.g. High/Medium: P2, escalate within 4 hours); or an operational route
     such as capacity. Confirmed means High on the shared confidence rubric. -->

- Case ID:
- Prepared by (triage analyst):
- Prepared at (UTC):
- Handed to (receiving team, and the named owner of the next action):
- Why escalated (Escalation criterion met under the escalation tripwire, the
  matrix cell at P1 or P2, or an operational route), with a one-line
  rationale citing the confirming evidence:
- Depth level at handoff (0 / 1 / 2), and any upward moves with their reason:
- Distribution restrictions (TLP, the Traffic Light Protocol, and any
  need-to-know limits):
- Insider route (yes / no; if yes, case visibility restricted, routed through
  the insider-risk process, the subject's manager and team not notified):
- Regulatory flags (yes / no; if yes, fill the block below):
- Material AI use (assistant and version, and which sections began as AI
  drafts; "none" if unassisted):

### Regulatory flags (optional, when regulated data is plausibly involved)

<!-- Each regulatory or contractual clock that may apply (e.g. GDPR Art. 33,
     a state breach law, PCI DSS, a contract). Triage records the candidate
     start; the regime's owner (privacy, legal, compliance) decides whether
     the clock started. -->

| Regime | Data class and trigger observed | Candidate awareness or trigger timestamp (UTC) | Owner engaged (who), at (UTC) | Owner's decision |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

- Estimated affected individuals and their jurisdictions (if known):
- Preservation or legal-hold status and scope (who authorized it, and when, UTC):
- Counsel handling instructions (labeling, channel, distribution), if any:

### P1 page (optional, P1 only)

<!-- On a P1, page first and let the packet complete in parallel. -->

- Paged (who, channel, time UTC):
- Acknowledged at (UTC), or no-ack fallback used at 15 minutes:
- Warm handoff held (call or bridge, time UTC):

### Receipt (filled by the receiver)

- Accepted by (name), at (UTC):
- Escalation warranted? (yes / no / partially, one line why):
- Rework requested (packet sections missing or re-investigated; "none"):

## 1. Case summary

<!-- One paragraph. What happened, what is known, what the triage analyst
     recommends. Label each claim's confidence (high / medium / low). -->

## 2. Timeline

<!-- Sequential events with timestamps, starting from the earliest known
     activity: both adversary actions and analyst actions (when notified,
     what was checked, when escalated, when each containment action ran).
     Name each row's source and its confidence label. -->

| Timestamp (UTC) | Actor | Action taken | Source | Confidence | Outcome / result |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## 3. Entities

<!-- Primary and secondary entities with their assessment results: the
     Subject and Scope output. Type each entity as the Subject handoff does:
     user / service account / host or device / application or OAuth grant /
     session or token / resource / artifact / network identifier / threat.
     Analysts record observable technical activity. HR-held context reaches
     the case only through the insider-risk route, and never as
     analyst-collected notes. -->

- Entities (each with type, role, criticality, privilege, and assessment):
- Scope boundary (entities in, time window and lookback):
- Deliberately out of scope, and the observation that would pull each in:
- Reachable but not shown to be touched (Scope flags, e.g. regulated stores
  the subject can reach):
- Visibility gaps (sources missing, retention limits, pending vendor data):

## 4. Evidence chain

<!-- The Uncover narrative, with sources and queries used. Hypotheses tested:
     the leading hypothesis, the alternatives tested and rejected (each with
     the evidence that decided it), and any still open. MITRE ATT&CK technique
     mappings with the ATT&CK version used (e.g. Enterprise v19). -->

- Leading hypothesis:
- Alternatives tested and rejected (with deciding evidence):
- Alternatives still open:
- ATT&CK techniques (version):

### Hypothesis ledger

<!-- One row per hypothesis the investigation weighed. Provenance: name the
     source and query (or artifact ID) behind each deciding item, so the
     receiver can re-run it. Label the confidence of each step. -->

| Hypothesis | Status (leading / rejected / open) | Deciding evidence | Source and query (provenance) | Confidence |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## 5. Risk verdict

<!-- The four RATM (Risk-Based Alert Triage Matrix) dimensions, reduced to
     impact and likelihood. Impact is the higher of asset criticality and
     business impact. Likelihood is how probable it is that the activity is
     malicious or unauthorized; confidence is your analytic confidence in
     that judgment on the shared rubric. Unexamined evidence means low
     confidence, not low likelihood. -->

- Verdict, detection axis (true positive / false positive (logic) /
  false positive (data)):
- Verdict, activity axis (malicious / policy violation / authorized (benign
  true positive) / benign-confirmed / undetermined):
- RATM asset criticality (H/M/L):
- RATM business impact (H/M/L):
- RATM threat actor intent (H/M/L):
- RATM exploitation & scope (H/M/L):
- Impact (the higher of asset criticality and business impact):
- Likelihood that the activity is malicious or unauthorized (H/M/L):
- Confidence in that judgment (high / medium / low, shared rubric), and what
  would change it:
- Matrix cell (impact / likelihood) and priority (P1-P4), or the confirmed
  criterion that set P1:
- Override applied, if any (escalation tripwire, high-impact clock,
  documented downgrade), with reason:
- Recommended move:
- Open questions that would move this verdict (each also listed in section 8):

## 6. Containment actions taken

<!-- Preserve before you contain: list what was preserved first (volatile
     evidence, the artifacts a containment action would destroy). Then what
     was already done, each with its time and how it was verified. Triage
     executes only reversible pre-authorized actions; credential resets and
     OAuth grant revocations need IR or owner approval unless the protocol
     lists them for this scenario. Then what was deliberately not done, and
     why, and which actions await IR's approval. -->

- Preserved first:
- Done (time UTC, how verified):
- Deliberately not done, and why:
- Awaiting IR approval:

## 7. Artifacts

<!-- Relevant log excerpts, IoCs, hashes, screenshots, queries, attached or
     linked so the next analyst does not have to re-derive them. Defang
     indicators in prose. For each artifact, record its custody /
     preservation state: where the original lives, its identifying hash, and
     who has handled it so far. -->

- Artifact:
  - Custody / preservation state:

### Evidence at risk

<!-- Each source with its retention window and export status, and whether
     volatile evidence (memory) was captured. -->

- Source, retention window, exported (yes / no):

## 8. Open questions

<!-- What triage could not resolve and would have pursued next, each with the
     query or contact that would settle it. The IR team picks up from this
     list. -->

-

## 9. Communication record

<!-- Who has been notified so far, by whom, on which channel, when, what they
     were told (one line), and any decision they made. Prevents duplicate
     notifications and starts the audit trail for regulatory reporting. -->

| Time (UTC) | Who was notified | Channel | By whom | What they were told | Decision made |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

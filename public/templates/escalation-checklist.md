# Escalation-criteria checklist

<!-- ASSURED Methodology by Timothy Zilber, © Block, Inc., CC BY 4.0
     (https://creativecommons.org/licenses/by/4.0/). Reuse and adapt freely
     with attribution; note any changes you make.
     ASSURED escalation criteria
     (https://assured-methodology.vercel.app/docs/escalation/criteria).
     Run this list at every phase, not only at the Escalation decision. Any
     CONFIRMED box escalates the case immediately under the escalation
     tripwire: the case is P1 whatever the matrix cell; page the incident
     response (IR) lead, preserve what containment would destroy, start the
     warm handoff, and let the remaining phases complete under IR's clock.
     Suspicion (unconfirmed) refines Scope and re-runs the loop instead.
     Where this list and the criteria page differ in wording, the criteria
     page is the reference. -->

- Case ID:
- Checked by, in which phase, at (UTC):

Mark each box [S] suspected or [C] confirmed. Confirmed means the claim
behind the box reaches High on the shared confidence rubric: direct evidence
from a source trusted for that kind of claim, corroborated by an independent
source, with the leading benign alternative tested and ruled out. A single
threat-intelligence match, an ATT&CK mapping, or asset value alone never
confirms.

## 1. Confirmed malicious activity not fully contained by a control

- [ ] Verified malicious infrastructure: IPs or domains tied to known C2 (command and control), phishing, or attacker infrastructure in threat-intelligence sources, corroborated by host or identity telemetry showing what the connection did (a listing alone is a lead)
- [ ] Malware indicators: file hashes matching documented malware or unauthorized tools with verified malicious functionality, plus a second source showing the file ran or was staged to run
- [ ] Exploitation evidence: attacker tools or exploits executed, consistent with known malware families or attacker profiles
- [ ] ATT&CK-mapped behavior outside any sanctioned change, in tactics such as privilege escalation, persistence, or defense impairment (ATT&CK v19), corroborated by an independent source (benign administration maps to ATT&CK routinely; the mapping names the behavior, it does not prove malice)

Contained by a control: malicious activity a control verifiably blocked or
quarantined, with no execution and no follow-on evidence (no persistence,
credential exposure, or spread), is not criterion 1. Verify the control
held, record the case at P3 or P4 on its matrix cell, and propose it as a
pattern-entry candidate. It does not page IR. Any execution or follow-on
activity means it was not fully contained, and the tripwire applies.

## 2. High impact / business-critical systems affected

Confirmed here means confirmed malicious or unauthorized activity touching one
of these asset classes; the asset profile alone does not confirm the criterion.

- [ ] Production systems directly supporting revenue or customer experience
- [ ] Regulated data repositories: personally identifiable information (PII), protected health information (PHI), or payment card data (mandatory breach-notification clocks may apply)
- [ ] Cloud infrastructure hosting critical workloads, especially with privileged access or broad connections to organizational data
- [ ] Identity and access infrastructure: domain controllers, identity providers (IdPs), public key infrastructure (PKI), secrets management, VPN and remote-access gateways
- [ ] Security and recovery infrastructure: endpoint detection and response (EDR), security information and event management (SIEM), backup consoles (tampering blinds detection or removes the ability to recover)
- [ ] Systems whose disruption causes substantial operational, financial, or reputational harm

Once confirmed, escalate before the evidence picture is complete; nobody waits
to quantify blast radius on a crown jewel. An unconfirmed case on these assets
instead runs the Risk framework's override rules: when evidence is missing,
likelihood reads Medium (unknown is not Low) and the case is P2, escalate
within 4 hours; when the evidence was examined and leans benign, it continues
at P3 on the tightened high-impact clock (re-score within hours, not 24).

## 3. Lateral movement or exfiltration

- [ ] Attacker-driven expansion: the activity has reached a second host, account, or service beyond the original subject, and the benign explanations for the hop (sanctioned administration, automation) have been ruled out
- [ ] Data staging observed: unusual or password-protected archives, collection folders, large internal transfers
- [ ] Outbound transfer to external or anomalous destinations, measured against the host's own baseline, especially destinations the organization does not sanction
- [ ] Credential dumping followed by credential use, or credential use that crosses a trust boundary (new segment, new tenant, new privilege tier)

Blast radius is growing; containment timing is now urgent.

## 4. Ongoing or widespread campaign

- [ ] Multiple hosts or users showing the same or related activity
- [ ] The same lure, infrastructure, or artifact appearing across teams or business units
- [ ] A password spray that produced at least one successful authentication, or that targets the organization specifically (custom username lists, your naming convention)
- [ ] Variant churn: the same behavior from samples with different hashes on multiple hosts within days
- [ ] External intelligence reporting an active campaign targeting the organization or sector, matched to a local artifact (an indicator, lure, or technique seen here), not the report alone
- [ ] Coordinated timing that suggests an operator, not an opportunistic one-off

## Decision

Escalate if a criterion is confirmed or the matrix places the case at P1 or
P2. At P3, keep working to the named re-score trigger, then close or
escalate. Close at P4. Record the cell either way.

- Any box CONFIRMED, in any phase: the case is P1 whatever the cell; escalate now under the escalation tripwire.
- Boxes suspected but not confirmed: record the suspicion, refine Scope, and continue the loop with the criterion named as an open question.
- No box confirmed: the matrix cell decides. P1 or P2 → escalate (P2 within 4 hours, with a complete handoff packet). P3 → keep working to the named re-score trigger, then close or escalate. P4 → documented close, a first-class verdict.
- Operational routes (no criterion required): capacity (a single analyst who cannot both watch the queue and work the case). Name the route in the handoff.
- Insider route: if the subject is an employee or contractor and the activity suggests intentional harm, restrict case visibility, do not notify the subject's manager or team, and route the case through the insider-risk process (legal, then HR). Analysts record observable technical activity only; HR-held context reaches the case only through the insider-risk route, never as analyst-collected notes.
- [ ] Regulatory flags and candidate awareness timestamps recorded; owners engaged.
- Cell recorded (impact / likelihood, with confidence beside it: high / medium / low), and the reasoning:

On escalation, preserve before you contain: volatile evidence and the
artifacts a containment action would destroy come first. Pre-authorized
actions are reversible only; credential resets and OAuth grant revocations
need IR or owner approval unless the protocol lists them for the scenario.

### Closure check (before a documented close)

- [ ] No escalation criterion confirmed, or open as a suspicion
- [ ] The cell allows it: P4, or a P3 whose named re-score trigger came back clean
- [ ] No persistence or credential access observed in the evidence examined
- [ ] The case's own alternatives checked clean
- [ ] Gaps bounded: each named, with the reopen triggers written down

### Priority clocks

Default clocks from the Risk triage matrix; adopters tune them to their
staffing and paging model.

| Band | Acknowledge | Decision |
| --- | --- | --- |
| P1 | Page immediately; no-acknowledgment fallback at 15 minutes | Escalate immediately with a warm handoff; the packet completes in parallel |
| P2 | Within 15 minutes | Escalate within 4 hours, with a complete packet |
| P3 | Queue | Investigate to closure or re-score within 24 hours on a named trigger (High/Low runs the tightened high-impact clock: within hours) |
| P4 | Queue SLA | Documented close within the queue SLA |

De-escalation is legitimate: a priority moves down with a named reason and
the same stakeholder notification the upgrade got.

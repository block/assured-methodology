# Escalation-criteria checklist

<!-- ASSURED escalation criteria
     (https://assured-methodology.vercel.app/docs/escalation/criteria).
     Run this list at every phase, not only at E. Any CONFIRMED box
     escalates the case immediately under the break-glass rule: page the
     IR lead, start the warm handoff, and let the remaining phases
     complete under IR's clock. Suspicion (unconfirmed) refines Scope and
     re-runs the loop instead. -->

## 1. Confirmed malicious activity

- [ ] Verified malicious infrastructure: IPs or domains tied to known C2, phishing, or attacker infrastructure in threat-intelligence sources
- [ ] Malware indicators: file hashes matching documented malware or unauthorized tools with verified malicious functionality
- [ ] Exploitation evidence: attacker tools or exploits executed, consistent with known malware families or attacker profiles
- [ ] ATT&CK correlation: techniques mapped to tactics such as privilege escalation, persistence, or defense impairment, corroborated by more than one data point

## 2. High impact / business-critical systems affected

Confirmed here means confirmed malicious or unauthorized activity touching one
of these asset classes; the asset profile alone does not confirm the criterion.

- [ ] Production systems directly supporting revenue or customer experience
- [ ] Regulated data repositories: PII, PHI, or payment card data in reach (mandatory breach-notification clocks may apply)
- [ ] Cloud infrastructure hosting critical workloads, especially with privileged access or broad connections to organizational data
- [ ] Identity and access infrastructure: domain controllers, IdP, PKI, secrets management
- [ ] Systems whose disruption causes substantial operational, financial, or reputational harm

Once confirmed, escalate before the evidence picture is complete; nobody waits
to quantify blast radius on a crown jewel. An unconfirmed case on these assets
instead runs the Risk framework's override rules: missing-evidence uncertainty
floors at P2 (within shift); benign-leaning evidence continues at P3 on the
tightened high-impact clock (hours, not 24).

## 3. Lateral movement or exfiltration

- [ ] The activity has touched a second host, account, or service beyond the original subject
- [ ] Data staging observed: unusual archives, collection folders, large internal transfers
- [ ] Outbound transfer to external or anomalous destinations
- [ ] Credential use that crosses a trust boundary (new segment, new tenant, new privilege tier)

Blast radius is growing; containment timing is now urgent.

## 4. Ongoing or widespread campaign

- [ ] Multiple hosts or users showing the same or related activity
- [ ] The same lure, infrastructure, or artifact appearing across teams or business units
- [ ] External intelligence reporting an active campaign targeting the organization or sector
- [ ] Coordinated timing that suggests an operator, not an opportunistic one-off

## Decision

- Any box CONFIRMED, in any phase: escalate now (break-glass). Priority is P1 on break-glass confirmation.
- Boxes suspected but not confirmed: record the suspicion, refine Scope, and continue the loop with the criterion named as an open question.
- No boxes checked at the Escalation phase: the case is a candidate for a documented close; the verdict and reasoning still get the full record.

Priority clocks (from the Risk triage matrix): P1 escalate immediately with a
warm handoff; P2 escalate within the shift with a complete packet; P3
investigate to closure or re-score within 24 hours with a named trigger for
raising priority (High/Low runs the tightened high-impact clock: hours, not
24); P4 document and close in the standard queue. De-escalation
is legitimate: a priority moves down with a named reason and the same
stakeholder notification the upgrade got.

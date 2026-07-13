# Alert report

<!-- ASSURED documentation — the core alert reporting template
     (https://assured-methodology.vercel.app/docs/documentation/templates).
     Universal core fields; add specialized fields per event type
     (phishing, credential compromise, ransomware, ...) as needed. -->

## Event title and identifier

- Title:
- ID: INC-YYYYMMDD-NNN

## Detection timestamp and source

- Detected (UTC):
- Local time (optional):
- Detection source (tool or control, e.g. EDR / SIEM / CSPM):

## Activity summary

<!-- The observable behavior that triggered the alert. Specific indicators
     and anomalies, technical but readable. -->

## Initial triage outcome

<!-- True positive / false-positive / inconclusive — with a concise
     justification grounded in observable behavior and detection logic. -->

- Classification:
- Justification:

## Affected systems

<!-- Endpoints, accounts, infrastructure involved — with business context:
     function, criticality, ownership. -->

-

## Actions taken

<!-- One row per action. Timestamps in UTC. Actor is a named human or an
     automated system (SOAR, EDR, IAM platform). -->

| Timestamp (UTC) | Actor | Action taken | Rationale | Outcome / result |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Escalation decision and final disposition

- Escalated: yes / no — to whom, and why (or why not):
- Final disposition: benign / confirmed malicious / merged into incident:

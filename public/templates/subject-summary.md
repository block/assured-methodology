# Subject handoff

<!-- ASSURED Methodology by Timothy Zilber, © Block, Inc., CC BY 4.0
     (https://creativecommons.org/licenses/by/4.0/). Reuse and adapt freely
     with attribution; note any changes you make.
     ASSURED Subject: the seven-section handoff to Scope
     (https://assured-methodology.vercel.app/docs/subject/transition).
     Under one page, and mostly structured selection from Subject's notes,
     not new writing. At Level 2, write all seven sections. At Level 1,
     Subject and Scope run as one sweep and the handoff is a few lines in the
     alert report. A clean verdict is recorded as carefully as a dirty one,
     and a clean Subject never moves a case back down a level. Subject closes
     nothing on its own: the close happens at the Escalation decision. -->

## 1. Investigation header

- Case ID:
- Alert ID (or every member alert ID, for a grouped case):
- Analyst:
- Prepared at (UTC):
- Summary (two sentences: what the alert claims, and what Subject found):
- Escalation tripwire (not fired / fired: criterion, at UTC), and who owns
  the case (the SOC, or IR once the tripwire has fired):
- Depth level (0 / 1 / 2), and any upward moves with their reason:
- Material AI use (assistant and version, and which sections began as AI
  drafts; "none" if unassisted):

## 2. Entity inventory

<!-- One row per identity examined, cleared ones included: a silent gap is
     not a verdict. Type: user / service account / host or device /
     application or OAuth grant / session or token / resource / artifact /
     network identifier / threat. Classification: primary / secondary / downstream /
     originating threat. Each of the four dimensions reads "anomalous" (with
     one line why), "examined and cleared", or "not examined" (and why). -->

| Entity | Type | Classification | Authentication | Authorization | Behavior | Relationships |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |

## 3. Confidence summary

<!-- For each implicated entity: the verdict, the baseline behind it, and a
     label on the shared confidence rubric (high / medium / low; between
     levels, round down). Unexamined evidence means low confidence, not a
     clean verdict. -->

| Entity | Verdict | Baseline behind it (source, period) | Confidence (high / medium / low) |
| --- | --- | --- | --- |
|  |  |  |  |

## 4. Open questions

<!-- Each one an explicit Uncover target, phrased so a query can answer it. -->

-

## 5. Recommended scope parameters

<!-- Subject's recommendation is Scope's first draft, not its decision. -->

- Window per entity, anchored to its last known-good point (UTC):
- Environmental boundary, including what is out and why:
- Lateral-movement candidates (hosts, accounts or services the entities can
  reach and that a sweep should cover):

## 6. Insider posture

<!-- Analysts record observable technical activity. HR-held context reaches
     the case only through the insider-risk route, and never as
     analyst-collected notes. Personal context stays with the
     insider-program owner, HR and legal; it never enters this handoff. -->

- Activity mapped to the Insider Threat Matrix, or "none observed":
- Insider-program referral (exists: yes / no; if yes, its holder only):

## 7. Regulatory flags

<!-- Some clocks start at awareness, not at confirmation. Triage records the
     candidate timestamp; the regime's owner decides whether a clock
     started. Scope's regulatory check starts from this section. -->

- Alert's flag as written (data reached, or only reachable):
- Data classes in reach:
- Timestamp of reasonable cause (UTC), and the owner engaged (who, at UTC):

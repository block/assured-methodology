# Anchor exemplars: Exercise 2 (the consent grant in the migration window)

<!-- ASSURED Methodology by Timothy Zilber, © Block, Inc., CC BY 4.0
     (https://creativecommons.org/licenses/by/4.0/). Reuse and adapt freely
     with attribution; note any changes you make.
     ASSURED facilitator kit, grader material
     (https://assured-methodology.vercel.app/docs/teaching/kit). -->

**For graders.** Three synthetic write-ups of Exercise 2, scored against the
exercise's 10-point grid and annotated. The model answer is the key on the
exercises page (https://assured-methodology.vercel.app/docs/exercises).

**Bands.** Strong: 9-10 points. Passing: 7-8 points and no disqualifier.
Failing: below 7, or any disqualifier. The disqualifiers for this exercise:
the write-up asserts the app ID was verified, or routes waves 4 and 5 to
Level 0 or Level 1.

---

## Anchor 2A · Strong (10 / 10)

> **Alert.** The rule did its job: an unverified-publisher app received
> tenant-level consent. Detection true positive. The activity axis is open
> and heading toward a benign true positive (authorized), not a false
> positive, because the logic matched what it describes. Level 2 from
> intake: only an admin can consent to Sites.FullControl.All tenant-wide,
> and adm-jkoh is a privileged identity, which fails the Level 0 gate.
>
> **Subject → Uncover.** Verified against the artifacts: executor (adm-jkoh
> on the ticket and the consent), window (10:02 inside 09:00-17:00), source
> range (198.51.100.32/28 on both), ceremony (interactive, MFA, corporate
> device). But the range comes from the vendor's own doc, so the match shows
> vendor infrastructure, not that this app is the vendor's app. Cannot be
> satisfied from the packet: the app ID against CloudShift's registered
> application (first locally, against the app consented in waves 1 and 2,
> then the vendor's onboarding doc), a "was it you" message to adm-jkoh out
> of band, CHG-4182's approver for "was it allowed", and the runbook for the
> expected site collections. The display name is attacker-choosable, and
> Microsoft ships a first-party tool with the same name.
>
> **Risk.** Impact if hostile: High, full control (read, write, delete,
> change permissions) on every reachable site collection, standing through
> offline_access. Likelihood Medium until the app-ID check and adm-jkoh's
> confirmation return: unexamined is never Low; low confidence on the app's
> identity. High/Medium: P2, escalate within 4 hours unless the checks return
> first. If both come back clean: likelihood Low, high confidence, High/Low,
> P3 on the tightened clock, then a documented close as detection true
> positive, activity authorized. Not close-on-sight: the ticket is a claim
> about the change system, not about this consent event.
>
> **Escalation decision → Documentation.** An expected-change record linked
> to CHG-4182, not a pattern entry: adm-jkoh can never be worked below
> Level 2. Re-verified every wave: the consenting principal against that
> wave's ticket executor, and the app ID against the vendor's registered app.
> Inherited: the vendor source range, re-checked against the vendor doc
> quarterly.

**Annotation.** All ten grid items earned. What makes it strong: the
circularity is named in one sentence, the local app-ID check comes before
anyone outside the SOC is contacted, and the Risk paragraph carries both
branches (pending and clean) with their cells, so the reader knows exactly
what moves the case.

---

## Anchor 2B · Passing (7 / 10)

> **Alert.** True positive: the app did get consent. Not a false positive;
> this is heading for a benign true positive if the migration checks out.
> Level 2 because adm-jkoh is an admin.
>
> **Subject → Uncover.** Checked: adm-jkoh is the executor on both, the
> consent is inside the window, the IP range matches the vendor's range, and
> the consent used MFA on a corporate device. Still need: the app's ID
> compared with CloudShift's registered app ID (from the vendor or their
> onboarding doc), because anyone can name an app "SharePoint Migration
> Manager". And I would message adm-jkoh on a separate channel to confirm it
> was them.
>
> **Risk.** If hostile, impact High: the app has full control of the sites
> and keeps access through refresh tokens. Likelihood Medium for now, low
> confidence on the app identity, so High/Medium, P2, 4-hour clock. If the
> app ID matches and adm-jkoh confirms, likelihood drops to Low, High/Low,
> P3, then close as a benign true positive.
>
> **Escalation decision → Documentation.** Write an expected-change record
> for CHG-4182 with the checklist for waves 4 and 5. They stay at Level 2
> because adm-jkoh is privileged. Re-check the app ID each wave.

**Annotation.** Earned: 1, 2, 3, 5, 7, 8, 9 (7 points). Missed: (4) the
source-range match is listed as a verification with no note that the vendor
supplied the range, which is the circular-corroboration trap the packet
plants; (6) adm-jkoh confirming "it was me" settles who acted, not whether
it was allowed, and no independent authorizer (the ticket's approver) is
named; (10) only one of the two re-verified fields is named, and the
principal-against-executor check is missing. The calibration point is item
7: "full control of the sites" earns it, because the grid asks for full
control rather than read access, not for the four verbs.

---

## Anchor 2C · Failing (disqualified; 1 / 10 before the disqualifier)

> **Alert.** This is a false positive: the change ticket shows a sanctioned
> migration, so the rule fired on legitimate activity. We should tune it to
> skip apps under an approved change.
>
> **Subject → Uncover.** Ticket executor matches, window matches, IP range
> matches the vendor doc, and the app identity was confirmed as CloudShift's
> migration app. Everything lines up.
>
> **Risk.** Impact Medium (the app is reading files, not changing them).
> Likelihood Low. Medium/Low: P4, close.
>
> **Escalation decision → Documentation.** Write pattern entry PTN-NEW
> "CloudShift migration consent" so waves 4 and 5 close at Level 0 in five
> minutes: discriminators are the ticket number, the vendor IP range and
> adm-jkoh as the consenting account.

**Annotation.** Disqualified on both counts: the app identity "was
confirmed" with nothing in the packet showing that check (the invented
fact), and waves 4 and 5 are routed to Level 0 on a privileged identity.
Before the disqualifier it earns 1 point: item 3, with three verifications
named (executor, window, range), and nothing else. Item 1 fails on the
false-positive label, and the tuning request it implies would weaken a rule
that worked. Item 7 fails because impact is scored on what the app has done
so far (reading) instead of on what the grant allows (full control). The
pattern entry's discriminators are the debrief point: "there was a ticket"
will eventually close the real thing.

# Anchor exemplars: Exercise 1 (the print server's new scheduled task)

<!-- ASSURED Methodology by Timothy Zilber, © Block, Inc., CC BY 4.0
     (https://creativecommons.org/licenses/by/4.0/). Reuse and adapt freely
     with attribution; note any changes you make.
     ASSURED facilitator kit, grader material
     (https://assured-methodology.vercel.app/docs/teaching/kit). -->

**For graders.** Three synthetic write-ups of Exercise 1, scored against the
exercise's 10-point grid and annotated. They are anchors, not model answers:
the model answer is the key on the exercises page
(https://assured-methodology.vercel.app/docs/exercises). Use them in the
15-minute grader calibration on the kit page: score an anchor yourself with
the annotations covered, then compare.

**Bands.** Strong: 9-10 points. Passing: 7-8 points and no disqualifier.
Failing: below 7, or any disqualifier. The disqualifier for this exercise:
the write-up asserts the decoded command, the ticket-search result or the
nature of the transfer as fact.

---

## Anchor 1A · Strong (10 / 10)

> **Alert.** Rule-based detection on event 4698: a service account created a
> scheduled task. The payload is truncated in the alert; the first characters
> decode (base64, UTF-16LE) to "$wc=Ne", which fits "New-Object
> Net.WebClient" but proves nothing yet. First evidence request: the full
> TaskContent from the 4698 event. Heaviest artifact: the type 10 logon at
> 03:24, because the 90-day baseline has svc-printmgmt on prt-01 as service
> logons only. The 03:22 type 3 is off-baseline too.
>
> **Subject.** svc-printmgmt is the credential. Candidates: (a) an admin
> using it, (b) automation on wkst-hr-22, (c) an attacker holding it. (b) is
> out: automation runs as type 3 or 5, and nothing in the baseline is
> RemoteInteractive. (a) vs (c) stays open until the change-ticket search and
> one message to the owning team. Working subject: whoever was interactive on
> wkst-hr-22 at 03:24. Authentication abnormal, authorization unestablished,
> behavior abnormal, relationships now two hosts and one service identity.
>
> **Scope.** prt-01, svc-printmgmt, wkst-hr-22, and wkst-hr-22's assigned
> user as a separate entity. Window 03:00 to now; 7-day lookback on
> wkst-hr-22 for how the credential got there. Out for now: other print
> servers and hosts svc-printmgmt can reach; any authentication from either
> host inside the window pulls them in.
>
> **Uncover.** Full TaskContent; EDR on wkst-hr-22; EDR on prt-01 since 03:22;
> domain auth for svc-printmgmt and from wkst-hr-22; proxy history for
> files-cdn-sync.example; change management. bytes_out = 2.1 MB means prt-01
> sent data, so "downloader or uploader?" is open. Ledger: leading,
> hands-on-keyboard from a compromised workstation with the task as
> persistence; surviving alternative, undocumented weekend maintenance:
> cannot determine yet.
>
> **Risk.** Impact High: interactive access on a print server reachable from
> most of the fleet, Spooler as SYSTEM. Likelihood Medium, confidence medium:
> independent artifacts, one alternative untested. Upgrade triggers: decode
> is a downloader or uploader; empty ticket search; owner denies the session.
> High/Medium: P2, escalate within 4 hours.
>
> **Escalation decision.** No criterion confirmed: lateral movement needs the
> admin alternative dead first, and exfiltration needs the decode or the
> destination. Escalate on the cell, P2, 4-hour clock; tripwire primed on the
> three triggers. Preserve the 4698 event data and proxy record first.
>
> **Documentation.** Summary: "First RemoteInteractive logon on record for
> svc-printmgmt, from wkst-hr-22 to prt-01 at 03:24 UTC Sunday, after a
> network logon at 03:22, against a 90-day baseline of service logons only.
> At 03:41 the account created a task named to resemble a Windows component,
> running hidden-window encoded PowerShell; at 03:44 prt-01 sent 2.1 MB to
> files-cdn-sync.example, absent from its baseline. Assessed with medium
> confidence as hands-on-keyboard use of the account from wkst-hr-22, the
> task as persistence; low confidence on what the task runs until the full
> command is decoded. The maintenance alternative is open pending the ticket
> search and the owning team. Escalated on the matrix, P2 (High/Medium), on
> the 4-hour clock; the decode, the ticket search and destination
> intelligence are the tripwire triggers." Feedback: alert on any
> interactive or RemoteInteractive logon, or any logon from a non-baseline
> source, by an account in the service-account inventory group; it would
> have fired at 03:22.

**Annotation.** Every grid item earned: (1) decode as hypothesis with the
TaskContent request; (2) type 10 with the baseline; (3) (b) eliminated on
logon type; (4) (a) and (c) open with both checks; (5) the assigned user
scoped; (6) 7-day lookback; (7) Medium with label and triggers; (8) P2 on
the cell and the clock; (9) no criterion, with the lateral-movement reason;
(10) a rule that fires at 03:22. What makes it strong rather than passing:
the transfer direction is read, the alternative is named with its checks
instead of dismissed, and every "not yet" has the query that ends it.

---

## Anchor 1B · Passing (7 / 10)

> **Alert.** Scheduled task by a service account, event 4698. The command is
> encoded so I would decode it first; the alert only shows the start, and it
> looks like the usual WebClient download idiom, so I need the full command
> before saying more. Most important artifact: the RDP logon, since the
> account has never done that before.
>
> **Subject.** The service account was used by someone on wkst-hr-22. Could be
> an admin, could be an attacker; automation seems unlikely at 3 a.m. on a
> Sunday. Need the change tickets and to ask the print team.
>
> **Scope.** prt-01, svc-printmgmt, wkst-hr-22 and its user. Window from
> 03:00. Leaving out the other print servers unless the account shows up on
> them.
>
> **Uncover.** Decode the full command, EDR on both hosts, domain logs for the
> account, proxy for the domain, change tickets. Leading: attacker using
> stolen creds. Alternative: admin doing maintenance, still open until the
> ticket search and the print team answer.
>
> **Risk.** Impact High (server, service account). Likelihood Medium, medium
> confidence, because the maintenance alternative is untested; goes to High
> if the decode is malicious or nobody owns the session. High/Medium = P2,
> escalate within 4 hours.
>
> **Escalation decision.** Nothing confirmed yet: the hop could still be an
> admin, so it is not lateral movement until that is ruled out. Escalating on
> P2. If the decode comes back as a downloader I page IR straight away.
>
> **Documentation.** Summary: service account svc-printmgmt RDP'd into prt-01
> from wkst-hr-22 at 03:24 for the first time in 90 days and created a hidden
> encoded PowerShell task at 03:41; 2.1 MB went to a new domain at 03:44.
> Likely hands-on-keyboard (medium confidence); command not yet decoded.
> Escalated P2. Feedback: alert on 4698 tasks with encoded PowerShell.

**Annotation.** Earned: 1, 2, 4, 5, 7, 8, 9 (7 points). Missed: (3) "automation
seems unlikely at 3 a.m." eliminates (b) on time of day, not on logon type,
and an automation job at 03:00 is ordinary; (6) no lookback on wkst-hr-22,
so the question of when the credential was taken is never priced; (10) the
feedback item targets the same 4698 event that already fired, nineteen
minutes after the earliest signal. The calibration point in this anchor is
item 2: "the account has never done that before" is the baseline argument in
plain words, so it earns the point; graders who withheld it for missing the
phrase "90-day baseline" are grading vocabulary, not reasoning. No
disqualifier: the downloader is held as "looks like", and the
transfer is reported, not characterized.

---

## Anchor 1C · Failing (disqualified; 0 / 10)

> **Alert.** Base64 PowerShell decodes to New-Object Net.WebClient, so this is
> a downloader. The task name is fake (UpdateHealth), classic persistence.
>
> **Subject.** svc-printmgmt is compromised.
>
> **Scope.** svc-printmgmt and every server it can log on to, plus all print
> servers. Window: today.
>
> **Uncover.** The downloader pulled 2.1 MB from files-cdn-sync, which is the
> second stage. There is no change ticket for Sunday so maintenance is ruled
> out. The account moved from wkst-hr-22 to prt-01, which is lateral movement.
>
> **Risk.** Impact High. Likelihood High: downloader plus lateral movement.
> High/High P1.
>
> **Escalation decision.** Criteria confirmed: malicious activity and lateral
> movement. Escalation tripwire, P1, page IR.
>
> **Documentation.** svc-printmgmt was compromised and used to move laterally
> to prt-01 and download a second-stage payload. Disable the account now.

**Annotation.** Disqualified three times over: the decode is asserted from
six characters, the empty ticket search is invented ("there is no change
ticket"), and the transfer is called a download when bytes_out says prt-01
sent it. No grid item is earned even before the disqualifier: the RDP hop
appears only as "lateral movement", never as the heaviest artifact against
its baseline; the subject stops at the account; scope takes every reachable
server with no lookback; likelihood High, P1 and two confirmed criteria all
rest on the invented facts; and there is no confidence label or detection
item. What it gets right (impact High, the task name read as masquerading)
is worth saying in the debrief, because the failure is not ignorance: the
conclusion was written first and the artifacts were read to fit it.
"Disable the account now" also skips preservation and breaks printing
before IR decides.

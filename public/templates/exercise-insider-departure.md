# Exercise 6: The resignation week

<!-- ASSURED Methodology by Timothy Zilber, © Block, Inc., CC BY 4.0
     (https://creativecommons.org/licenses/by/4.0/). Reuse and adapt freely
     with attribution; note any changes you make.
     ASSURED hands-on exercise, learner packet
     (https://assured-methodology.vercel.app/docs/exercises). -->

**Insider · less guidance · 30-45 minutes.** Work every task in writing
before you open the answer key. The key, with the traps planted in this
packet and a scoring grid, is on the exercises page:
https://assured-methodology.vercel.app/docs/exercises

All names, hosts and repositories in this packet are fictional.

## Briefing

Wednesday 2026-07-08, 09:15 UTC. A data loss prevention (DLP) alert is in
the queue, and an email has just arrived in the SOC mailbox. The
source-control audit log and the exception register are yours to pull.

```
DLP alert, 09:02:47 UTC (overnight batch scan)
  rule:      Source code uploaded to personal cloud storage (rule-dlp-code-personal)
  severity:  High
  user:      pnair (software engineer, payments platform)
  host:      lt-eng-311 (managed laptop)
  channel:   browser upload to a consumer cloud-storage tenant
  content:   1.8 GB in 3 archives; classifier "source code"; repository names
             payments-core, payments-ledger, fraud-rules
  activity:  2026-07-07 21:04-22:10 UTC
```

```
Source-control audit log excerpt, pnair, 2026-07-07
  20:41-20:58  clone  14 repositories (payments-*, ledger-*, fraud-*)
  90-day baseline: pnair commits to payments-core and payments-api only;
  no clone of the other 12 repositories on record
```

```
Exception register, search result
  pnair: no approved exception for personal storage or code export
```

```
Email to the SOC mailbox, 09:11 UTC, from pnair's manager
  "Priya resigned on Monday. She has been going through a hard divorce
   and has seemed really stressed. Can you pull everything she has done
   on her laptop this month and send it to me?"
```

## Tasks

Four tasks, few hints. The discipline being trained is what the SOC records
about a person, and what it does not.

1. **Alert → Subject.** What do the artifacts confirm, and what do they not?
   Write the one sentence about the subject that the case record carries.

2. **The email.** What goes into the case, what does not, and what do you
   send back?

3. **Risk → Escalation decision.** Score impact and likelihood, name any
   confirmed criterion, and say which route the escalation takes.

4. **Containment.** What does triage do now, and what does it deliberately
   not do?

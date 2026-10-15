# Case D: The burst that never happened

<!-- ASSURED Methodology by Timothy Zilber, © Block, Inc., CC BY 4.0
     (https://creativecommons.org/licenses/by/4.0/). Reuse and adapt freely
     with attribution; note any changes you make.
     ASSURED case file, learner packet
     (https://assured-methodology.vercel.app/docs/cases/case-d).
     Facilitators: release each artifact set only after the learners have
     written their answers to the tasks before it. -->

**Full arc · Level 1 · 45-60 minutes.** The worked answer is the Case D page:
https://assured-methodology.vercel.app/docs/cases/case-d. Do not open it
until you have written every answer below.

All names, hosts, domains and addresses in this packet are fictional.
External addresses come from the documentation ranges (RFC 5737), and the
subject's handle is pseudonymized.

## Briefing

Wednesday 2026-09-23, 08:06 UTC. You are the day-shift Tier 1 analyst. One
High-severity identity alert is at the top of your queue. In this SOC, P2
identity cases escalate to the Tier 2 on-call, who decides whether to engage
IR; P3 and P4 cases stay with Tier 1. Your shift ends at 16:00 UTC.

## Artifact set 1 (08:06 UTC)

```
SIEM alert ALERT-2026-0923-0117, created 08:02:31 UTC
  rule:      Burst of failed sign-ins followed by success
             (rule-idp-burst-success, v2)
  logic:     20 or more failed sign-ins for one account within 10 minutes,
             then a successful sign-in for that account within 10 minutes
  severity:  High
  account:   akowalski@corp.example
  events:    32 failed, 1 successful; @timestamp 08:01:04 to 08:01:58 (54 s)
  sources:   203.0.113.163 (3), 198.51.100.0/26 (29), 192.0.2.24 (1)
```

```
Three of the 33 events, raw against normalized
  published (IdP event time)  @timestamp (SIEM)      event.ingested         outcome
  2026-09-23T00:44:12Z        2026-09-23T08:01:04Z   2026-09-23T08:01:06Z   failure: blocked by device policy
  2026-09-23T05:48:44Z        2026-09-23T08:01:41Z   2026-09-23T08:01:43Z   failure: password accepted, MFA not completed
  2026-09-23T07:58:12Z        2026-09-23T08:01:57Z   2026-09-23T08:01:58Z   success
```

```
IdP log connector, health log
  00:41:07  poll failed: 401 Unauthorized (client secret expired); repeats every 60 s
  07:59:30  client secret renewed (platform engineer, morning health check)
  08:01:04  backlog fetched: 7 h 19 min of tenant sign-in events, delivered in 54 s

Parser change record
  idp-signin parser v2.3, deployed 2026-09-17: moved to the normalized schema;
  @timestamp now taken from the batch receipt time, not the event's "published" field

IdP audit log, connector app registration and log-export settings, last 30 days
  no changes; client secret created 2025-09-23 00:41:07 with a one-year expiry
```

### Tasks: Alert

1. Write the detection verdict using the exact values (true positive, false
   positive (logic), false positive (data)), its confidence on the shared
   rubric, and the evidence behind it.
2. Can the case close now? Write one sentence on why or why not.
3. Who do you tell about the pipeline, when, and on which artifact? What
   waits until the case has a verdict?
4. What do you preserve before anything is re-ingested, and why?
5. Set the depth level and justify it against the ladder's entry criteria.

## Artifact set 2 (08:26 UTC)

```
Identity directory and entitlements, akowalski
  role:        facilities planner, Workplace team
  admin roles: none
  data access: no standing access to any store the data inventory classifies
               as regulated
  MFA methods: one authenticator app on her registered personal iPhone
               (push with number matching), registered 2025
  devices:     laptop-workplace-12 (managed, compliant);
               personal iPhone (registered, app-protection and compliance policy)
  baseline:    30 days of sign-ins from 192.0.2.24 (corporate VPN egress) and
               198.51.100.0/26 (her mobile carrier), 06:30-15:30 UTC
```

```
Sign-in log, akowalski, sorted by the IdP's own event time (UTC)
  2026-09-22 21:40     MDM: iPhone missed check-in past grace period;
                       marked non-compliant
  21:52 to 07:47       about every 15 min, 198.51.100.0/26, iPhone mail app:
                       token refresh blocked by device-compliance policy
                       (29 of these fall between 00:41 and 08:01)
  05:46:58, 05:47:31   203.0.113.163 (hosting provider, AS64510, first seen for
                       the tenant), unregistered device, Windows, Chrome:
                       invalid password
  05:48:44             203.0.113.163, same device: password accepted; push with
                       number matching sent; not completed; expired 05:49:44;
                       no token issued
  07:58:12             192.0.2.24, laptop-workplace-12: success, device-bound
                       phishing-resistant credential
```

### Tasks: Subject and Scope

6. Split the 33 events into strands. Give each strand an entity verdict with
   its confidence, and say which strand the case is now about.
7. Write the Scope boundary: primary and secondary entities, the historical
   window, the forward watch, and anything the overnight outage does to what
   "no other alerts" can mean.

## Artifact set 3 (08:48 to 09:30 UTC)

```
Pivots
  203.0.113.163, IdP + VPN + mail gateway + web proxy, 30 days:
    only the three events above
  Threat intelligence: hosting-provider range; no TIP hits; no passive DNS names
  akowalski, 14 days: no MFA method or device changes, no consent grants, no
    mailbox rule changes, no success from outside the baseline
  Mail gateway, 14 days: no delivered credential-phishing verdicts; no clicks
    on rewritten links later convicted
  EDR, laptop-workplace-12, 14 days: no infostealer detections; no reads of the
    browser credential store by non-browser processes
  Tenant policy: legacy authentication blocked, no exclusions for akowalski;
    VPN requires a device certificate plus IdP sign-in

Callbacks
  09:12  call to the number in the identity directory: voicemail
  09:21  her manager, by phone: she is flying home from an off-site conference
         in a city one hour ahead of UTC and lands at about 17:00 UTC
```

### Tasks: Uncover and Risk

8. Write the hypothesis ledger for the 05:46 to 05:49 attempts: at least two
   hypotheses, one of them the most plausible benign one, each with evidence
   for and against and a status.
9. Name one pivot that could have decided between your two leading
   hypotheses, and say what it showed.
10. Does the accepted password send you back to Scope? What do you check?
11. Score the case: impact, likelihood, confidence, cell, priority, and the
    recommended move. If you recommend keeping it, name the re-score
    triggers, the forward watch, and what is awaiting whose approval.

## Artifact set 4 (10:27 UTC)

In the worked case, the first scoring at 09:40 was Medium/High, P2, and the
case was escalated at 09:46. Tier 2 returned this receipt.

```
Receipt, CASE-2026-0923-004
  Accepted by and at:    Tier 2 on-call, 09:58 UTC, for review
  Escalation warranted:  No. Handed back to Tier 1 at 10:27 UTC.
  Reason:                Cell not supported by the evidence. Likelihood is High
                         on the absence of her answer, and the evidence examined
                         points both ways. Missing evidence sets a floor
                         (Medium, confidence Low); it is not a reason for High.
                         Medium/Medium is P3, inside the Tier 1 mandate.
  Rework requested:      5 (Risk verdict): re-score.
                         8 (Open questions): name the re-score triggers and the
                         forward watch; a P3 without a trigger is a parked case.
                         6 (Containment): say that nothing was contained, and why.
  Priority:              P2 to P3 for the reason above; shift lead told at 10:29.
```

### Tasks: Escalation decision

12. Compare your task 11 answer with the receipt. Where do you agree, and
    where not?
13. Who must be told of the downgrade, and why?
14. Write the Escalation decision you record at 10:44.
15. Write the 16:00 shift-handover line for this case.

## Artifact set 5 (13:08 to 17:58 UTC)

```
13:08  Re-run of identity detections over 00:41-08:01 on corrected event
       time (parser v2.3.1 live at 12:34): rule-idp-burst-success does not
       fire; no other identity detection fires in the window
17:42  akowalski calls the SOC. The evening analyst calls her back on the
       directory number. In her words: she tried to check her flight and
       calendar on her own laptop at the hotel early that morning; does not
       remember whether it worked or seeing an approval request; the laptop is
       a Windows machine and she uses Chrome. Nobody can say quickly how the
       hotel's Wi-Fi reaches the internet.
17:51  With her agreement she changes her password on laptop-workplace-12; her
       sessions are revoked; MFA methods reviewed: one authenticator,
       unchanged since 2025
17:58  iPhone checks in to MDM, compliant; blocked refreshes stop
```

### Tasks: Risk, Escalation decision and Documentation

16. Re-score the case. If the priority moves, write the reason and who is
    told.
17. Write the activity verdict using the exact values (malicious, policy
    violation, authorized (benign true positive), benign-confirmed,
    undetermined) and its confidence. Why not the value one step more
    certain?
18. Run the closure check, one finding per item. List the gaps and the
    reopen triggers, with an owner and an expiry for the watch.
19. Should the case move up to Level 2 instead of closing? Answer in two
    sentences.
20. List every finding the case produced, where each one is routed, and on
    which artifact. Is a new detection for the 05:48 attempt justified by
    this case? Why or why not?

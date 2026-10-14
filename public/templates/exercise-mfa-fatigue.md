# Exercise 4: The push that finally said yes

<!-- ASSURED Methodology by Timothy Zilber, © Block, Inc., CC BY 4.0
     (https://creativecommons.org/licenses/by/4.0/). Reuse and adapt freely
     with attribution; note any changes you make.
     ASSURED hands-on exercise, learner packet
     (https://assured-methodology.vercel.app/docs/exercises). -->

**Identity · Level 1 at intake · 30-45 minutes.** Work every task in writing
before you open the answer key. The key, with the traps planted in this
packet and a scoring grid, is on the exercises page:
https://assured-methodology.vercel.app/docs/exercises

All names, accounts and addresses in this packet are fictional.

## Briefing

Thursday 2026-05-14, 22:49 UTC. You pick up one identity alert. The account
belongs to mtorres, a sales account manager with no administrative roles. At
22:53 the helpdesk forwards you a chat transcript.

```
IdP alert, 22:48:12 UTC
  rule:      MFA fatigue: repeated push denials followed by approval (rule-mfa-fatigue)
  severity:  Medium
  account:   mtorres (Sales, no admin roles)
  pushes:    14 denied 22:31-22:40, 1 approved 22:41:06
  source IP: 203.0.113.140 (hosting-provider ASN, first seen for this tenant)
```

```
Sign-in and audit log excerpt, mtorres, 22:30-22:49 UTC
  22:41:06  sign-in success  203.0.113.140  password + push approved  new device, browser
  22:44:30  audit            authentication method added: authenticator app,
                             device "iPhone 15", registered from 203.0.113.140
  22:46:52  sign-in success  203.0.113.140  file-storage app  session token issued
  30-day baseline: mtorres signs in from 192.0.2.10 (corporate VPN egress), 07:00-19:00 UTC;
  one registered authenticator (registered 2025-11-03)
```

```
Helpdesk chat, 22:52 UTC (opened by mtorres)
  mtorres: my phone kept buzzing with sign-in approvals for like ten minutes,
           I finally hit approve to make it stop. is that bad?
```

## Tasks

1. **Alert.** Did the rule do its job? Write the verdict on both axes as far
   as the alert alone supports it, and the depth level you start at.

2. **Subject → Scope.** Who holds the session that began at 22:41? What does
   the helpdesk message settle, and what can it not settle? Which entities
   go in scope?

3. **Escalation decision.** Is a criterion confirmed? If so, which one, on
   what evidence, and from which phase does the case escalate? Record the
   matrix cell as well.

4. **Containment.** List, in order, what triage does before IR picks up, and
   what waits for IR or owner approval.

# Exercise 8: The certutil that downloaded nothing

<!-- ASSURED Methodology by Timothy Zilber, © Block, Inc., CC BY 4.0
     (https://creativecommons.org/licenses/by/4.0/). Reuse and adapt freely
     with attribution; note any changes you make.
     ASSURED hands-on exercise, learner packet
     (https://assured-methodology.vercel.app/docs/exercises). -->

**Genuine false positive · Level 1 · 20-30 minutes.** Work every task in
writing before you open the answer key. The key, with the traps planted in
this packet and a scoring grid, is on the exercises page:
https://assured-methodology.vercel.app/docs/exercises

All names, hosts and paths in this packet are fictional.

## Briefing

Friday 2026-09-11, 06:05 UTC. A High-severity endpoint alert on a monitoring
server. Detection engineering changed this rule yesterday.

```
EDR alert, 06:00:14 UTC
  rule:     LOLBin download: certutil URL cache (rule-lolbin-certutil, v4)
  logic:    process name = certutil.exe AND command line matches (?i)certutil.*url
  severity: High
  host:     ops-mon-03 (monitoring server, standard criticality)
  user:     svc-certcheck
  command:  certutil.exe -verifystore Root "URL Filter Root CA"
  parent:   powershell.exe -File C:\Ops\cert-expiry-check.ps1  (scheduled task "CertExpiryCheck")
```

```
EDR detail, certutil.exe (PID 4412), 06:00:14-06:00:15 UTC
  network connections: none
  files written:       none
  exit code:           0
  history:             the same command line runs daily at 06:00 from this task (180 days on record)
```

```
Rule change record, rule-lolbin-certutil
  v3: command line contains "-urlcache" (case-insensitive)
  v4: regex (?i)certutil.*url, "to catch /urlcache and other variants"
      deployed 2026-09-10 15:20 UTC
```

## Tasks

1. **Alert.** What does the rule claim happened? Did it happen? Write the
   verdict on both axes, and say why it is not a benign true positive.

2. **Subject → Risk.** What level does this run at, what cell does it land
   in, and why is a pattern entry the wrong tool?

3. **Documentation.** Write the tuning request: what goes in it, and what is
   the risk of the change you propose?

4. **Escalation decision.** Close or escalate, and which reopen condition
   goes in the record?

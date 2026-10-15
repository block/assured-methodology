# Capstone: The bastion's new key

<!-- ASSURED Methodology by Timothy Zilber, © Block, Inc., CC BY 4.0
     (https://creativecommons.org/licenses/by/4.0/). Reuse and adapt freely
     with attribution; note any changes you make.
     ASSURED facilitator kit, capstone candidate packet
     (https://assured-methodology.vercel.app/docs/teaching/kit). The scoring
     guide is a separate facilitator file; candidates never receive it. -->

**Unguided full arc · 90 minutes · solo · scored blind.**

Candidate code: ________ (write the code, never your name, on every page)

All names, hosts, addresses and identifiers in this packet are fictional.

## Rules

- Work alone and in writing. No conferring.
- Open book: the ASSURED site, the templates and your own notes. No AI
  assistant.
- There are no phase-by-phase questions. Work the case the way you would on
  shift, and write down what each phase produced.
- Record the time (UTC, case clock) of every decision you make. The case
  clock starts at 01:24 UTC; treat every artifact below as available at
  01:24 when you ask for it.
- Part of the case arrives later. The facilitator hands it to you during the
  session. Do not wait for it: decide on what you have.

## What you hand in

1. **Phase notes:** Alert, Subject, Scope, Uncover, Risk, Escalation
   decision and Documentation, each with its output (a verdict, a boundary, a
   ledger, a cell, a decision, a record), and the time of each decision.
2. **The record:** if you escalate, a handoff packet using the nine-section
   template
   (https://assured-methodology.vercel.app/templates/handoff-packet.md); if
   you close, an event report
   (https://assured-methodology.vercel.app/templates/event-report.md). Fill
   every section that applies; label the confidence of every claim.
3. **After the late artifact:** an update of no more than 200 words saying
   what changed, which sections of your record you amended, and why.

## Briefing

Wednesday 2026-09-23, 01:24 UTC. You are the night-shift analyst. One alert
is in the queue.

```
EDR alert, 01:16:40 UTC
  rule:        SSH authorized_keys modified for privileged account
               (rule-ssh-authkeys)
  severity:    Medium
  host:        jmp-02 (Linux bastion, 10.40.1.12)
  file:        /home/deploy-ops/.ssh/authorized_keys   (1 line appended)
  process:     tee -a /home/deploy-ops/.ssh/authorized_keys
               <- sudo <- bash (pts/1) <- sshd: rkim
  appended:    ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIM7c...  ci-runner-07
  fingerprint: SHA256:9fQeV2bN0sLr8cWm1xYhA4uJ7tP3dK6gZ5oE2iRkT2c
               (computed by the EDR from the appended line)
```

## Artifacts

```
Asset and identity inventory (source system for the eligibility gate)
  jmp-02:       criticality crown-jewel (the only administrative path into
                the payments database subnet)
  deploy-ops:   shared automation account; holds the standing SSH key that
                db-pay-01 to db-pay-04 accept; sudo (NOPASSWD) on those
                four hosts; privileged
  db-pay-03:    criticality crown-jewel; payments ledger database;
                data inventory class: regulated (payment card data,
                PCI DSS scope)
  rkim:         platform engineer; member of platform-admins (privileged)
  ci-runner-07: status "provisioning" (CHG-5530); no address assigned yet
```

```
jmp-02 auth.log, 2026-09-23 (UTC)
  00:58:12  sshd[20411]: Accepted publickey for rkim from 10.40.2.17
            port 51022 ssh2: ED25519
            SHA256:Hk7pR3vQ9mZ2xW5nB8cL1tY4fJ6sD0gA3eU7iK9oP2q
  01:16:31  sudo: rkim : TTY=pts/1 ; PWD=/home/rkim ; USER=deploy-ops ;
            COMMAND=/usr/bin/tee -a /home/deploy-ops/.ssh/authorized_keys
  01:29:02  sshd[20977]: Accepted publickey for deploy-ops from 10.40.2.17
            port 51388 ssh2: ED25519
            SHA256:9fQeV2bN0sLr8cWm1xYhA4uJ7tP3dK6gZ5oE2iRkT2c
  90-day baseline:
    deploy-ops logs in only from 10.40.9.0/24 (the CI runner subnet), with
    the keys registered for ci-runner-01 to ci-runner-06
    rkim logs in on weekdays between 08:00 and 18:30 UTC; sudo to
    deploy-ops twice, both inside change windows (CHG-5102, CHG-5317)
```

```
VPN gateway, sessions for rkim, 2026-09-23 (UTC)
  00:51:03  session start  source 203.0.113.58
            (hosting-provider ASN, first seen for rkim)
            MFA: push approved
            device: unregistered (device posture is not enforced for this
            VPN profile)
            assigned address 10.40.2.17
  30-day baseline: source 192.0.2.88 (residential ISP), weekdays
  07:40-18:30 UTC, registered device lt-ops-118
```

```
Change-management system, search: jmp-02, last 30 days
  CHG-5530  "Onboard ci-runner-07 to deploy-ops on jmp-02"
            status:     approved, scheduled
            window:     Wednesday 2026-09-23 22:00-23:59 UTC
            executor:   rkim          approver: jdiaz (platform lead)
            key to add: ssh-ed25519, comment "ci-runner-07",
                        fingerprint
                        SHA256:Lq4wX8mR2vN5bT1cY7hJ3kP9sD6fG0aZ4eU8iO2nW8c
            amendments: none (last updated 2026-09-21 16:02 UTC)
  Emergency changes touching jmp-02 or deploy-ops, last 7 days: none
```

```
EDR, db-pay-03, 2026-09-23 01:29-01:40 UTC
  01:29:47  sshd: Accepted publickey for deploy-ops from 10.40.1.12
            (jmp-02), deploy-ops standing key
  01:30:05  id
  01:30:09  sudo -l
  01:30:40  cat /etc/postgresql/14/main/pg_hba.conf
  01:31:22  ls -la /var/backups/pg/
  01:34:10  session closed
  No database client process. No file read under /var/backups/pg/.
  No outbound connection other than the SSH session.
  90-day baseline: deploy-ops sessions on db-pay-03 run the deploy
  pipeline's migration script only, from jmp-02, inside change windows
```

## Notes

Use this space and as many extra pages as you need. Write your candidate
code on each one.

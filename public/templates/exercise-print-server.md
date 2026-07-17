# Exercise 1: The print server's new scheduled task

<!-- ASSURED hands-on exercise, learner packet
     (https://assured-methodology.vercel.app/docs/exercises).
     Full arc, guided, 60-90 minutes. Write every answer before
     opening the key; the key lives on the exercises page. -->

## Briefing

Sunday, 03:41 UTC. You are the on-shift analyst. One alert is in the queue.

```
SIEM alert, 03:41:02 UTC
  rule:      Scheduled task created by service account (rule-4698-svc)
  severity:  Medium
  host:      prt-01 (Windows Server 2019, print services)
  event:     4698 (scheduled task created)
  task name: \Microsoft\Windows\UpdateHealth
  action:    powershell.exe -NoP -W Hidden -EncodedCommand JAB3AGMAPQBOAGUA...
  principal: svc-printmgmt
```

Pulling the host's authentication log and the proxy log for context:

```
Authentication log excerpt, prt-01
  03:22:17  4624  logon type 3 (network)            svc-printmgmt  from 10.20.8.114 (wkst-hr-22)
  03:24:05  4624  logon type 10 (RemoteInteractive)  svc-printmgmt  from 10.20.8.114 (wkst-hr-22)
  90-day baseline: svc-printmgmt appears on prt-01 as a service logon only;
  no interactive or RDP logons on record
```

```
Proxy log excerpt
  03:44:51  prt-01  CONNECT files-cdn-sync[.]net:443  allowed  bytes_out=2.1 MB
  90-day baseline: prt-01 outbound is Windows Update and print-vendor telemetry only
```

## Tasks

Work each phase in order, in writing.

1. **Alert.** State the claim the rule makes, and which detection mechanism
   this is. What is your first parsing action on the alert payload? Which of
   the three artifacts carries the most validation weight, and why?

2. **Subject.** The named principal is a service account. Who acted? List the
   candidate answers and the evidence that discriminates between them. Run the
   four dimensions on what you decide the subject is.

3. **Scope.** Draw the initial boundary: entities, time window, and lookback.
   Name one thing you are deliberately leaving out of scope, and the
   observation that would pull it in.

4. **Uncover.** List the sources you would pull, in order, with the question
   each answers. What are the two questions your timeline must answer before
   Risk can score this? Where does your hypothesis ledger stand: leading
   hypothesis, and the strongest surviving alternative?

5. **Risk.** Score impact and likelihood separately, one paragraph of
   justification each. What does the matrix say?

6. **Escalation.** Which canonical criteria are confirmed by a supplied
   artifact, and which are one query away? When does escalation fire, and
   under which rule?

7. **Documentation.** Write the record's summary paragraph. Then write one
   detection-engineering feedback item this case earns, and say which event
   it targets.

<!-- The answer key, with the traps planted in this packet, is on
     https://assured-methodology.vercel.app/docs/exercises -->

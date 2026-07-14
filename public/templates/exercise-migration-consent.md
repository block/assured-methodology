# Exercise 2: The consent grant in the migration window

<!-- ASSURED hands-on exercise, learner packet
     (https://assured-methodology.vercel.app/docs/exercises).
     Full arc, less guidance, 45-60 minutes. Write every answer before
     opening the key; the key lives on the exercises page. -->

## Briefing

Tuesday, 10:05 UTC. The queue hands you an identity alert.

```
IdP alert, 10:05:33 UTC
  rule:      OAuth consent granted to unverified publisher (rule-oauth-unv)
  severity:  High
  account:   adm-jkoh (IT administration)
  app:       "SharePoint Migration Manager"   publisher: unverified
  scopes:    Sites.FullControl.All, offline_access
  consent:   10:02:14 UTC, interactive, MFA satisfied, corporate device
```

```
Tenant audit excerpt, 10:00-10:40 UTC
  10:12-10:38  bulk file reads by app "SharePoint Migration Manager"
               ~14,000 items across 6 site collections
               source IP range: 198.51.100.32/28
```

```
Change-management system, search result
  CHG-4182  "SharePoint tenant migration, wave 3 of 5"
            window: Tuesday 09:00-17:00 UTC
            executed by: adm-jkoh
            vendor: CloudShift Migrations Ltd
            vendor doc: migration traffic sources 198.51.100.32/28
```

## Tasks

Fewer hints than Exercise 1, on purpose. The discipline being trained is
verification.

1. **Alert.** The rule fired on exactly what its logic describes. What kind
   of verdict is still open, and what vocabulary names it?

2. **Subject → Uncover.** The change ticket looks like it explains
   everything. List every claim in the ticket you can independently verify
   against the two log artifacts, and verify each one. Then list the checks
   the artifacts CANNOT satisfy, and where you would go for each.

3. **Risk.** Write the verdict paragraph, including what stops this from
   being a close-on-sight.

4. **Escalation → Documentation.** There are two more migration waves
   scheduled. What artifact should this close produce so waves 4 and 5 cost
   five minutes instead of an hour, and which two fields in it must be
   re-verified every wave rather than assumed?

<!-- The answer key, with the traps planted in this packet, is on
     https://assured-methodology.vercel.app/docs/exercises -->

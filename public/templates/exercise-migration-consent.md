# Exercise 2: The consent grant in the migration window

<!-- ASSURED Methodology by Timothy Zilber, © Block, Inc., CC BY 4.0
     (https://creativecommons.org/licenses/by/4.0/). Reuse and adapt freely
     with attribution; note any changes you make.
     ASSURED hands-on exercise, learner packet
     (https://assured-methodology.vercel.app/docs/exercises). -->

**Full arc · less guidance · 45-60 minutes.** Work every task in writing
before you open the answer key. The key, with the traps planted in this
packet and a scoring grid, is on the exercises page:
https://assured-methodology.vercel.app/docs/exercises

All names, addresses and organizations in this packet are fictional.

## Briefing

Tuesday, 10:05 UTC. The queue hands you an identity alert. Per the migration
runbook, IT revokes the vendor app's grant at the end of each wave, so every
wave starts with a fresh consent.

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

Same seven phases, fewer hints than Exercise 1, on purpose. The discipline
being trained is verification.

1. **Alert.** Did the rule do its job? What verdict type is still open, and
   which C.L.E.A.R. glossary term names it?

2. **Subject → Uncover.** The change ticket looks like it explains
   everything. List every claim in the ticket you can independently verify
   against the two log artifacts, and verify each one. Then list the checks
   the artifacts CANNOT satisfy, and where you would go for each.

3. **Risk.** Write the Risk assessment paragraph: impact, likelihood with its
   confidence, the matrix cell and priority, and the recommended move.
   Include what stops this from being a close-on-sight.

4. **Escalation decision → Documentation.** There are two more migration
   waves scheduled. What artifact should this close produce so waves 4 and 5
   start from a written verification checklist instead of from scratch, and
   which two fields in it must be re-verified every wave rather than
   assumed? (Check first: what is the lowest rung of the depth ladder this
   subject can ever be worked at, and why?)

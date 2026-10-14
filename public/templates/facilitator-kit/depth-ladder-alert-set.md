# Depth-ladder alert set: ten alerts, one level each

<!-- ASSURED Methodology by Timothy Zilber, © Block, Inc., CC BY 4.0
     (https://creativecommons.org/licenses/by/4.0/). Reuse and adapt freely
     with attribution; note any changes you make.
     ASSURED facilitator kit, learner sheet for Session 1
     (https://assured-methodology.vercel.app/docs/teaching/kit). The key is
     on that page. -->

**25 minutes. Work alone, in writing.** For each alert, write the depth level
you start the case at (0, 1 or 2) and one line naming the fact that decides
it. The rules are on the fast-path page:
https://assured-methodology.vercel.app/docs/fast-path

You are not deciding whether each alert is malicious. You are deciding how
much process each case earns before anyone knows.

All names, addresses and domains on this sheet are fictional. Every pattern
entry below is approved by a second person and inside its review date unless
the alert says otherwise. Inventory lines come from the asset and identity
inventory, the source system for the eligibility gate.

## 1

```
DNS alert, 05:07:22 UTC
  rule:     Query to uncategorized domain (rule-dns-uncat)
  host:     kiosk-lobby-02 (group: lobby-kiosks)
  query:    content-refresh.kiosk-vendor.example
Pattern entry PTN-022 v2 "Lobby kiosk content refresh"
  discriminators: host in lobby-kiosks; query is exactly
  content-refresh.kiosk-vendor.example; 05:00-05:15 UTC
Inventory, kiosk-lobby-02: criticality standard; local kiosk account only,
  no privileged roles; no regulated data in reach (verified 2026-08-30)
Pattern volume today: 6 closes, normal range 5-8
```

## 2

```
DNS alert, 14:31:09 UTC
  rule:     Query to uncategorized domain (rule-dns-uncat)
  host:     kiosk-lobby-02 (group: lobby-kiosks)
  query:    content-refresh.kiosk-vendor.example
Pattern entry PTN-022 v2 and inventory: as in alert 1
```

## 3

```
IdP alert, 07:12:40 UTC
  rule:     Impossible travel (rule-idp-travel)
  account:  ahassan (member of Global Administrators)
  sign-ins: 06:58 from the corporate VPN egress; 07:12 from a
            commercial VPN provider's address
Pattern entry PTN-040 v1 "Staff on the approved commercial VPN"
  discriminators: second sign-in from the approved provider's published
  ranges; device is managed and compliant
  (both discriminators match)
```

## 4

```
EDR alert, 10:44:03 UTC
  rule:     Office application spawned PowerShell (rule-office-ps)
  severity: High
  host:     lt-sales-112 (managed laptop)
  user:     bnguyen (Sales, no admin roles)
  process:  WINWORD.EXE -> powershell.exe -NoP -EncodedCommand ...
Inventory: criticality standard; no regulated data in reach
No pattern entry for this rule
```

## 5

```
EDR alert, 02:15:51 UTC
  rule:     New service installed (rule-svc-install)
  host:     dc-02 (group: domain-controllers)
  service:  the EDR vendor's updater, signed, installed by the
            monthly agent-update job
Pattern entry PTN-005 v4 "Monthly EDR agent update"
  (every discriminator matches)
Inventory, dc-02: criticality crown-jewel
```

## 6

```
Proxy alert, 11:20:37 UTC
  rule:     Unusual outbound volume to code host (rule-proxy-codehost)
  host:     release-runner-03 (group: ci-runners)
  dest:     code-host.example:443, 340 MB out
Inventory, release-runner-03: holds the release-signing key and
  repository-write scope
No pattern entry for this rule
```

## 7

```
SIEM alert, 09:03:12 UTC
  rule:     Service account logon from a new source host (rule-svc-newsrc)
  account:  svc-reportgen (non-human, no privileged roles)
  source:   app-rpt-05 (new reporting server, added last week)
  target:   app-rpt-01, logon type 3 (network)
Inventory, svc-reportgen: standing read access to hr-db-01
  (data inventory class: regulated, employee personal data)
Nothing in the alert or the target's logs shows a query to hr-db-01
No pattern entry for this rule
```

## 8

```
Database activity alert, 16:47:30 UTC
  rule:     Bulk read outside baseline (rule-db-bulk)
  account:  dsilva (Finance analyst, no admin roles)
  database: cust-db-02 (data inventory class: regulated, customer
            personal data)
  query:    SELECT * FROM customers  (412,000 rows returned)
  baseline: dsilva queries aggregated views only, never raw tables
```

## 9

```
Two alerts, same host and user, 13:05-13:09 UTC (grouped into one case)
  A. 13:05:14  rule-browser-update: unsigned helper spawned by the browser
               updater on lt-ops-207 (user mokafor, no admin roles)
               Pattern entry PTN-012 v3 "Browser updater helper"
               (every discriminator matches; gate passes from inventory)
  B. 13:08:51  rule-archive-staging: 3 password-protected archives created
               in the user's temp folder on lt-ops-207
               No pattern entry for this rule
```

## 10

```
EDR alert, 03:30:02 UTC
  rule:     Scheduled script from temp path (rule-task-temp)
  host:     lt-eng-090 (user tlee, no admin roles)
Pattern entry PTN-019 v2 "Developer toolchain self-update"
  (every discriminator matches; gate passes from inventory)
Pattern volume tonight: 41 closes across 37 hosts, 29 of them never
  seen in this pattern before; normal range 2-6 closes a night
```

## Your answers

| # | Level (0 / 1 / 2) | The fact that decides it |
| --- | --- | --- |
| 1 |  |  |
| 2 |  |  |
| 3 |  |  |
| 4 |  |  |
| 5 |  |  |
| 6 |  |  |
| 7 |  |  |
| 8 |  |  |
| 9 |  |  |
| 10 |  |  |

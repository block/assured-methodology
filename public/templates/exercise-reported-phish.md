# Exercise 7: The report button

<!-- ASSURED Methodology by Timothy Zilber, © Block, Inc., CC BY 4.0
     (https://creativecommons.org/licenses/by/4.0/). Reuse and adapt freely
     with attribution; note any changes you make.
     ASSURED hands-on exercise, learner packet
     (https://assured-methodology.vercel.app/docs/exercises). -->

**User-reported phish · grouped case · 30-45 minutes.** Work every task in
writing before you open the answer key. The key, with the traps planted in
this packet and a scoring grid, is on the exercises page:
https://assured-methodology.vercel.app/docs/exercises

All names, hosts and domains in this packet are fictional.

## Briefing

Monday 2026-08-17, 09:48 UTC. Three users reported the same email through
the report button, and the reported-phish queue grouped the reports into one
case.

```
Reported-phish case, 09:46 UTC (3 reports grouped)
  subject:   "Action required: your mailbox storage is full"
  sender:    it-support@mail-quota-notice[.]example
             SPF pass, DKIM pass (d=mail-quota-notice[.]example)
  link:      hxxps://portal-sso-check[.]example/owa/login (rewritten by the URL-protection service)
  reporters: jbell 09:39, lgomez 09:41, tchen 09:44
```

```
Message trace, 08:57-08:58 UTC
  delivered to 23 mailboxes, all in Customer Support; 0 quarantined
```

```
URL-protection click log, portal-sso-check[.]example
  09:12:41  aokafor  allowed  (verdict at click time: unknown)
  09:30:02  verdict updated: phishing (credential harvest)
  09:37:15  jbell    blocked  (verdict: phishing)
```

```
Proxy log (TLS inspection on), 09:00-09:48 UTC, requests to portal-sso-check[.]example
  09:12:43  laptop-cs-17 (aokafor)  GET   /owa/login   200
  09:13:20  laptop-cs-17 (aokafor)  POST  /owa/login   302 -> the real corporate webmail
  no requests from any other host
```

```
IdP sign-in log, aokafor, 08:30-09:48 UTC
  08:41:10  sign-in success  192.0.2.10 (corporate VPN egress)  MFA satisfied
  no other sign-ins
```

## Tasks

1. **Alert.** One case or three? The verdict on both axes for the reported
   message, and the depth level.

2. **Scope.** Who is in scope, and on what evidence? Work jbell and aokafor
   separately.

3. **Escalation decision.** Is a criterion confirmed for anyone? Which path
   does each clicker take, and what cell do you record?

4. **Documentation.** List the actions in order, and write the one line the
   record carries about aokafor's status.

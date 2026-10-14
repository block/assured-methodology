# Alert report variant: phishing

<!-- ASSURED Methodology by Timothy Zilber, © Block, Inc., CC BY 4.0
     (https://creativecommons.org/licenses/by/4.0/). Reuse and adapt freely
     with attribution; note any changes you make.
     ASSURED documentation: an event-type variant of the core alert report
     (https://assured-methodology.vercel.app/docs/documentation/templates).
     This file is an add-on, not a replacement: paste these sections into the
     core alert report (alert-report.md) after "Activity summary". The core's
     fields do not change. Defang every indicator (hxxps, [.]). Do not open
     the lure link or detonate the attachment outside a sandbox: a URL in a
     live phish is attacker infrastructure. Fields marked (optional) can be
     left out when they do not apply. -->

## Message

- Subject line (quoted, defanged if it carries an indicator):
- Message ID, and received at (UTC):
- Sender: header From (display name and address), envelope sender
  (return-path), reply-to:
- Authentication results (SPF / DKIM / DMARC, with the signing domain):
- How it arrived (gateway detection, user report, or both; for a user
  report, the reporters and when each reported):
- Grouped reports (optional: every report or alert ID merged into this case):

## Recipients and delivery path

<!-- From the message trace, not from the reports: reporters are a sample of
     the recipients, never the whole list. -->

- Recipients (count, and the list or the query that produces it):
- Delivered / quarantined / junked (counts):
- Delivery path (gateway, rewriting or detonation services, the verdict at
  delivery):
- Purged (count, at UTC, by whom; recipients the purge could not reach):

## URL and attachment verdicts

<!-- Record the verdict at delivery and the verdict now: a URL that had no
     reputation at delivery often turns malicious later. -->

| URL or attachment (defanged; filename and SHA-256 for a file) | Verdict at delivery | Verdict now, and its source | Sandbox or detonation result (optional) |
| --- | --- | --- | --- |
|  |  |  |  |

## Click and open evidence

<!-- One row per recipient who interacted. A click allowed by the URL
     service, a proxy request, and a POST to the lure page are different
     facts from different sources; record each. Any user who reached the
     credential step of a phishing kit is credential-exposed until the
     password is reset, sessions are revoked and MFA methods are reviewed. -->

| Recipient | Host | Clicked at (UTC), allowed or blocked | Page requests seen (source) | Credential step reached (yes / no / unknown) | Follow-on sign-ins or execution |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

- Credential-exposed users, and the status of each (password reset, sessions
  revoked, MFA methods reviewed, each with time UTC):
- Recipients who did not interact, and the evidence (click log and proxy
  coverage; a user off the proxy is a gap, not a clean result):

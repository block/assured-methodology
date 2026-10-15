# Alert report variant: identity compromise

<!-- ASSURED Methodology by Timothy Zilber, © Block, Inc., CC BY 4.0
     (https://creativecommons.org/licenses/by/4.0/). Reuse and adapt freely
     with attribution; note any changes you make.
     ASSURED documentation: an event-type variant of the core alert report
     (https://assured-methodology.vercel.app/docs/documentation/templates).
     This file is an add-on, not a replacement: paste these sections into the
     core alert report (alert-report.md) after "Activity summary". The core's
     fields do not change. A privileged identity always fails the Level 0
     eligibility gate and routes to Level 2. Fields marked (optional) can be
     left out when they do not apply. -->

## Identity and sessions

- Account (sign-in name, human or non-human, owner, roles and privilege):
- Session IDs and token types in play (session cookie, refresh token, access
  token, app-side session), each with issued at (UTC):
- Baseline (usual networks, devices, hours, client apps; source and period):

## Sign-in chain

<!-- Every sign-in for the account across the window, not only the one the
     rule saw. A session that began elsewhere and was replayed shows up as a
     token use with no matching interactive sign-in. -->

| Time (UTC) | Source IP and ASN | Device and client app | Authentication method | Result | Session or correlation ID |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## MFA ceremony

- Prompts sent, denied and approved (counts, times UTC), and whether number
  matching or another verified-push method was in force:
- Authentication methods or devices registered or changed in the window
  (method, device, registered from, at UTC):
- The user's own account of the prompts (channel and time UTC; an
  out-of-band statement settles "was it you", not what the session did):

## Consent grants and mailbox changes

| Change (OAuth consent grant, mailbox rule, forwarding, delegate) | Detail (app and publisher, scopes; rule conditions and action) | Made by, from where | At (UTC) | Still in force (yes / no) |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Revocation order

<!-- Preserve before you contain: export the sign-in, audit and mailbox
     records first. Then the reversible pre-authorized actions (revoke
     sessions and refresh tokens, block sign-in). Revoking at the identity
     provider does not end a session an application already issued, so ask
     each app owner to end app-side sessions. Credential resets, removal of
     an attacker-registered method, and OAuth grant revocation need IR or
     owner approval unless the protocol lists them for this scenario. -->

| Step | Action | Pre-authorized or approved by (who) | Done at (UTC) | Verified how |
| --- | --- | --- | --- | --- |
| 1 | Preserve (records exported, with hashes) |  |  |  |
| 2 | Sessions and refresh tokens revoked; sign-in blocked |  |  |  |
| 3 | App-side sessions ended (each app, its owner) |  |  |  |
| 4 | Password reset |  |  |  |
| 5 | MFA methods reviewed; attacker-registered methods removed |  |  |  |
| 6 | Consent grants and mailbox rules removed (after export) |  |  |  |

- Credential-exposure status (exposed until the password is reset, sessions
  are revoked and MFA methods are reviewed; each with time UTC):

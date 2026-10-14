# Capstone scoring guide: The bastion's new key

<!-- ASSURED Methodology by Timothy Zilber, © Block, Inc., CC BY 4.0
     (https://creativecommons.org/licenses/by/4.0/). Reuse and adapt freely
     with attribution; note any changes you make.
     ASSURED facilitator kit, capstone key and scoring guide
     (https://assured-methodology.vercel.app/docs/teaching/kit).
     FACILITATOR AND RATERS ONLY. This file is public on the site, so for an
     assessed cohort re-skin the case first (see the last section). -->

**For the facilitator and the two raters.** This file holds the late
artifact (the inject), the key, the 20-point grid, the decision items, the
disqualifiers and the re-skinning rules. The blind-scoring protocol and the
agreement target are on the kit page.

## The inject

Hand this to each candidate once they have recorded an Escalation decision
and its time (from minute 45 of the capstone), and to everyone else at
minute 60. Do not explain it.

```
Late artifact. Phone call to rkim, on the mobile number held in the HR
directory, 02:06 UTC (call placed and recorded by the on-shift analyst)

  rkim: "That wasn't me. I've been asleep. A push came in around one and I
         think I hit approve half-awake. CHG-5530 is tonight at ten, and I
         haven't even generated the runner key yet."
```

## The key

**Alert.** Rule-based detection (file integrity on a privileged account's
authorized_keys). Detection true positive: a line was appended. Activity
undetermined at Alert. The first parsing action is the fingerprint, not the
comment: the comment "ci-runner-07" is attacker-choosable text. Depth:
Level 2 at intake, twice over: deploy-ops is privileged automation and
jmp-02 is crown-jewel. Both fail the eligibility gate.

**Subject.** The account on the alert is rkim, but an account is a
credential. The subject is whoever holds rkim's VPN session from
203.0.113.58. Candidates: (a) rkim, doing the change early from a commercial
VPN on a personal device; (b) someone else holding rkim's password and
approving or bypassing the push. Four dimensions: authentication abnormal
(first-seen hosting ASN, unregistered device, 00:51 against a daytime
baseline); authorization not established and contradicted (the appended
fingerprint is not CHG-5530's, the window is 22:00 tonight, no amendment or
emergency change exists); behavior abnormal (the new key is used from the
same address that added it 13 minutes later, not from a CI runner, then
reaches db-pay-03); relationships rkim → deploy-ops → db-pay-03.

**Scope.** In: rkim's identity (sessions, MFA methods, recent password and
method changes), the VPN session, jmp-02, deploy-ops and every key in its
authorized_keys, db-pay-03, the new fingerprint as a sweep target, and
CHG-5530 itself (the actor knew the ticket's comment). Window: 00:45 UTC to
now; lookback of at least 30 days on rkim's sign-ins and MFA changes and on
203.0.113.58 across the tenant. Sweep, not expansion: deploy-ops logins to
db-pay-01, -02 and -04 since 01:16, and the new fingerprint on every host
that logs SSH. Regulated data: in reach and approached (pg_hba.conf read,
backup directory listed), not shown to be read: a Scope flag. No candidate
awareness timestamp yet; the observation that would start one is a database
client session or a read under /var/backups/pg/. Deliberately out: the CI
runner fleet and the other platform-admins accounts, until the sweep shows
203.0.113.58 or the fingerprint against them.

**Uncover.** Ledger. Leading: an unauthorized party using rkim's
credentials added a persistent key to deploy-ops and ran discovery toward
the payments database. Alternative: rkim, early and sloppy. The alternative
does not explain the discovery on db-pay-03 (reading pg_hba.conf and
listing backups is not runner onboarding), which weakens it but does not
kill it; only rkim, reached on a channel the actor cannot hold (the phone
number on file, not chat or email), settles "was it you". Sources the
packet does not hold, each named with its question: the change system's
access log for CHG-5530 (who read the ticket), rkim's IdP sign-ins and MFA
events, auth logs for db-pay-01 to -04, the live process tree on jmp-02.

**Risk.** Impact High: crown-jewel bastion, privileged automation with sudo
on the payments database hosts. Likelihood High that the activity is
malicious or unauthorized: unauthorized on artifact evidence. Confidence is
labeled per claim: high that the change is unauthorized (the change record,
a source trusted for authorization, contradicts the EDR fingerprint and the
auth.log time; amendments and emergency changes checked: none); medium that
it is malicious (one alternative open). Cell High/High: P1.

**Escalation decision.** P1, escalate immediately, without waiting for the
call to rkim. Two routes reach it and either earns the point when named
with its evidence: criterion 2 confirmed (unauthorized activity touching a
business-critical asset, at High on the shared rubric) under the escalation
tripwire, from the phase where the fingerprint comparison landed; or the
matrix cell High/High. A P1 cell escalates whatever the confidence label
says. Preserve before you contain: copy and hash authorized_keys as it is
now (with its modification time), export auth.log, the VPN session record
and both EDR timelines, and capture the live process tree on jmp-02 before
any session is killed. Reversible actions the protocol may pre-authorize:
terminate rkim's VPN session, revoke rkim's IdP sessions, block rkim's
sign-in. Commenting out the appended line after preservation is reversible
too; take it only where the protocol lists it, otherwise it is IR's first
decision on the bridge. Awaiting IR or owner approval: deleting the key,
rotating deploy-ops's standing key, resetting rkim's password and reviewing
MFA methods.

**Documentation.** The handoff packet names the route, carries the cell
anyway, labels confidence per claim, lists what was preserved first and what
was deliberately not done, and puts the open checks in section 8 with the
query or contact for each. Feedback: alert when a key is appended to a
privileged account's authorized_keys and its fingerprint is not in an
approved change record, or the time is outside the change window (it would
have fired at 01:16 with the reason attached); enforce device posture and
number matching on the VPN profile that privileged engineers use.

**After the inject.** rkim's statement, recorded with channel and time,
settles "was it you": no. With it, the benign alternative is dead, and
criterion 1 (confirmed malicious activity not fully contained by a control)
is confirmed at High: the attacker's key is still in place. The activity
verdict moves from undetermined to malicious. rkim is credential-exposed
until the password is reset, sessions are revoked and MFA methods are
reviewed; the half-awake push approval is the prevention finding (number
matching). The statement does not settle what the actor did; the logs do.
The packet update touches sections 1, 2, 4, 5 and 9, and section 8 gains
the question of how the password was obtained.

## Traps planted

- **The label:** the comment "ci-runner-07" matches the ticket; the
  fingerprint does not.
- **Deference:** a real, approved ticket with the right executor radiates
  authorization for the wrong key at the wrong time.
- **Severity:** Medium on the alert, P1 in the matrix.
- **Waiting for certainty:** the call to rkim feels like the thing to wait
  for. The cell is already P1.
- **The quiet database:** no data read reads as "nothing happened" when the
  actor holds a persistent route to all four payments hosts.

## The grid (20 points, one each)

Alert

1. Detection true positive; activity undetermined at Alert.
2. **Decision item.** Level 2 at intake, with the gate reason (privileged
   automation, crown-jewel host, or both).

Subject

3. The actor is whoever holds rkim's session from 203.0.113.58, not rkim by
   default and not deploy-ops.
4. The appended key's fingerprint compared with CHG-5530's, with the comment
   named as untrustworthy.
5. Authorization recorded as contradicted: wrong key, outside the window, no
   amendment or emergency change.

Scope

6. Entities: rkim's identity and VPN session, jmp-02, deploy-ops and its
   authorized_keys, db-pay-03, and the new fingerprint as a sweep target.
7. A lookback on rkim's identity, and a sweep of deploy-ops logins on
   db-pay-01, -02 and -04 since 01:16.
8. Regulated data recorded as a Scope flag (in reach, not shown read), with
   the observation that would start a clock; no awareness timestamp claimed.

Uncover

9. A ledger with the leading hypothesis and the rkim-early alternative held
   open, with the independent-channel check that settles it.
10. The db-pay-03 activity read as discovery without data access, and noted
    as something the benign alternative does not explain.
11. The matching comment read as a lead: someone read CHG-5530, and its
    access log is a source.

Risk

12. Impact High on the crown-jewel path and privileged automation.
13. Likelihood High, with confidence labeled per claim (high for
    unauthorized, medium for malicious, or equivalent wording).
14. **Decision item.** Cell High/High: P1.

Escalation decision

15. **Decision item.** Escalates immediately, recorded before the inject,
    naming the route with its evidence (criterion 2 under the escalation
    tripwire, or the P1 cell).
16. Preservation before containment, with authorized_keys copied and hashed
    before any edit; reversible actions separated from those awaiting
    approval.

Documentation

17. Handoff packet sections 1, 5 and 6 complete, with per-claim confidence.
18. Section 8 lists the open questions, each with its query or contact.
19. One feedback item that would have fired at 01:16 or earlier, or a
    prevention item for the VPN profile.

After the inject

20. Criterion 1 confirmed at High, activity malicious, rkim credential-
    exposed until reset, revocation and MFA review; the statement recorded
    with channel and time and used only for "was it you".

## Disqualifiers

Any one fails the script whatever the points:

- The case is closed, or held below P1 before the inject (P2 or P3 "pending
  rkim").
- Before the inject, the script asserts as fact that rkim did or did not
  make the change.
- The appended key is deleted, or deploy-ops's key rotated, before
  preservation.
- The record carries anything about rkim beyond observable technical
  activity and rkim's recorded statement.

## Pass mark

At least 15 of 20, all three decision items (2, 14, 15) earned, and no
disqualifier. A script can be strong on Documentation and still fail on a
decision item: the capstone checks the decision first.

## Re-skinning for an assessed cohort

This key is public. For an assessed cohort, change the surface and keep the
invariants, then have both raters re-derive the key before the session.

Keep:

- a privileged automation identity on a crown-jewel path, so the case is
  Level 2 at intake;
- an approved change whose label matches the activity and whose identifying
  field (fingerprint, application ID, hash) does not, with amendments
  checked;
- activity outside the change window, from a first-seen source;
- discovery on a regulated store without a read, so the regulatory flag is
  a Scope flag and not a clock;
- a P1 cell before any confirmation of malice, and a late inject from the
  account owner on an independent channel that confirms it.

Change: the platform (Linux bastion, cloud role, identity provider app),
every name, address, time and identifier, the order of the artifacts, and
which artifact carries the mismatch.

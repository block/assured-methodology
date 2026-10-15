# Anchor exemplars: Exercise 3 (the Level 0 drill)

<!-- ASSURED Methodology by Timothy Zilber, © Block, Inc., CC BY 4.0
     (https://creativecommons.org/licenses/by/4.0/). Reuse and adapt freely
     with attribution; note any changes you make.
     ASSURED facilitator kit, grader material
     (https://assured-methodology.vercel.app/docs/teaching/kit). -->

**For graders.** Three synthetic attempts at the Level 0 drill, scored
against the exercise's grid: five pass/fail checks on the timed part, then
five timer-off points. The filled model record is in the key on the
exercises page (https://assured-methodology.vercel.app/docs/exercises).

**Bands.** Strong: all five timed checks pass and 4-5 timer-off points.
Passing: all five timed checks pass and 3 timer-off points. Failing: any
timed check fails, fewer than 3 timer-off points, or the disqualifier: any
gate check or discriminator filled from memory instead of from an artifact.

---

## Anchor 3A · Strong (timed 5 / 5; timer-off 5 / 5; 3 min 40 s)

> **Gate first.** Not crown-jewel: criticality standard (asset inventory,
> ci-build-14). Not privileged or sensitive-capability automation: ephemeral
> runner, read-only repo token, no deploy, signing, secret or write scopes
> (asset inventory). No regulated data: build artifacts only (asset
> inventory). Entry constraint: tag ephemeral-runner / nonprivileged,
> verified 2026-09-02 (asset inventory). Entry review date 2026-11-30, after
> the drill date 2026-10-06: current.
>
> **Discriminators.** D1 group ci-build-agents (alert and inventory). D2 java
> (bazel server) with clang workers (alert process tree). D3
> cache.buildcache-vendor.example:443, exact match to the entry. D4 02:47
> UTC, inside 01:30-04:30.
>
> **Record.** PTN-017 v3. Detection true positive; activity benign-confirmed,
> nightly CI load per PTN-017 v3. Escalation criteria checked: none.
> Material AI use: none. Volume request to detection engineering, keyed to
> the exact tuple, with an owner, an expiry tied to the review date and
> re-fire triggers.
>
> **Timer off.** Signing runner: gate fails on capability, enters at Level 2,
> not Level 1. xmrig as top process: confirm the binary and the destination;
> a confirmed miner nothing stopped is criterion 1, so the escalation
> tripwire fires from inside the Level 0 check. Destination with a
> lookalike suffix: fails the exact match. The same alert at 14:00: a
> schedule anomaly outside D4. The same alert on wkst-hr-22: not in the
> group, so the pattern does not apply at all.

**Annotation.** Every check passes, every timer-off point earned, and the
record went from blank to complete inside four minutes with each field
citing its source. Strong attempts are often shorter than passing ones: the
analyst reads the inventory once and copies values instead of describing
them.

---

## Anchor 3B · Passing (timed 5 / 5; timer-off 3 / 5; 4 min 55 s)

> **Gate.** Criticality standard; runner is ephemeral with a read-only token
> and no deploy/signing/secret/write scopes; build artifacts only. All from
> the asset inventory for ci-build-14. Tag ephemeral-runner / nonprivileged
> verified 2026-09-02. PTN-017 review date 2026-11-30 is after today.
>
> **Discriminators.** Group ci-build-agents ✓. Process tree rooted in bazel
> server with clang workers ✓. Destination cache.buildcache-vendor.example
> exactly ✓. 02:47 in window ✓.
>
> **Record.** PTN-017 v3; true positive, benign-confirmed; criteria checked:
> none.
>
> **Timer off.** Signing runner: fails the gate, so Level 1. xmrig: fails D2,
> moves up the ladder. Lookalike suffix: not an exact match, fails D3. 14:00:
> outside the window, fails D4. Other host: not in the group, pattern does
> not apply.

**Annotation.** All five timed checks pass, with five seconds to spare: every
gate line names its source once for the group, which is acceptable. Timer
off earns 3 of 5. Missed: the signing runner goes to Level 2, not Level 1,
because a runner holding signing keys is privileged automation and Level 1
requires ordinary privilege; and xmrig is not just a ladder move, because a
confirmed miner no control stopped is a confirmed criterion and the
escalation tripwire fires. Both misses are the same misconception, "depth
and urgency are one decision", and that is the debrief point. The missing
volume request is not on this grid; note it as feedback.

---

## Anchor 3C · Failing (disqualified; 6 min 30 s)

> **Gate.** Build agent, not crown-jewel, not privileged (CI runners don't
> hold anything sensitive here), no regulated data. Pass.
>
> **Discriminators.** ci-build-agents ✓, bazel ✓, build-cache vendor ✓,
> night window ✓.
>
> **Record.** PTN-017. Benign. Closed.

**Annotation.** Disqualified: the privilege check is filled from belief
("CI runners don't hold anything sensitive here") instead of from the
inventory artifact sitting in the packet, and no gate line names a source.
Timed checks 1, 2, 3, 4 and 5 all fail: no source on the gate; the entry
constraint, its verification date and the review date are never checked;
"build-cache vendor ✓" records a feeling about the destination, not the
observed string and an exact match; the verdict is one word on one axis
with no entry version; and the record ran past five minutes. The
discriminator that rusts first is D3, and this attempt shows it rusting:
"the destination looked right" and "the destination equals the entry's
named endpoint" feel identical at queue speed. Because the timed part
failed, the timer-off part is not scored.

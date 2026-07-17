# Exercise 3: The Level 0 drill

<!-- ASSURED hands-on exercise, learner packet
     (https://assured-methodology.vercel.app/docs/exercises).
     Fast path, timed: 5 minutes. Set the timer before reading the
     artifacts. The key lives on the exercises page. -->

## Briefing

One recurring alert, one pattern-library entry, one decision, five minutes.

```
EDR alert, 02:47:10 UTC
  rule:      Possible cryptomining: sustained CPU >90% for 30m
             + persistent outbound TLS to non-allowlisted host
  host:      ci-build-14 (group: ci-build-agents)
  process:   bazel (build toolchain), CPU 96% sustained
  outbound:  cache.buildcache-vendor.io:443, persistent, 41 min
```

```
Pattern library entry PTN-017: "Nightly CI compile load on build agents"
  owner: detection-engineering    review date: current
  eligibility constraint: applies only to hosts inventory-tagged
    "ephemeral-runner / nonprivileged"; never to runners holding deploy,
    signing, secret, or repository-write capability
  discriminators:
    1. host is a member of group ci-build-agents
    2. top process is the build toolchain (bazel or gradle)
    3. outbound destination is the vendor build-cache endpoint named in this
       entry (cache.buildcache-vendor.io)
    4. activity falls in the nightly pipeline window, 01:30-04:30 UTC
```

```
Asset inventory, ci-build-14
  group:        ci-build-agents
  criticality:  standard (not crown-jewel)
  capability:   ephemeral container runner; scoped read-only repo token;
                no deploy, signing, secret-store, or repository-write scopes
  tag:          ephemeral-runner / nonprivileged   (verified: current quarter)
  data class:   build artifacts only; no regulated data in reach
```

## Task

Decide whether this alert qualifies for a Level 0 close.

- If it does: fill the five fields of the pattern-close record
  (pattern-close-record.md), checking the eligibility gate and each
  discriminator against the artifacts, not from memory.
- If it does not: name the gate check or discriminator that failed and the
  level the case moves to.

Then, timer off: write one sentence for each discriminator describing the
alert that would fail it, and one for the eligibility gate.

<!-- The answer key, with the trap being drilled, is on
     https://assured-methodology.vercel.app/docs/exercises -->

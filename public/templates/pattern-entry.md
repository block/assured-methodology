# Pattern-library entry

<!-- ASSURED fast path (https://assured-methodology.vercel.app/docs/fast-path).
     One entry per documented known-benign pattern. An entry earns Level 0
     closes only while it is current: past the review date, closes against it
     move to Level 1 until the owner re-verifies. "I've seen this before" is
     not a pattern; this file is. -->

## Identity

- Pattern ID (e.g. PTN-NNN):
- Name (one line: the benign behavior this documents):
- Owner (person or team accountable for the entry's correctness):
- Created (UTC date):
- Review date (entry is invalid for Level 0 after this date):

## The behavior

- The benign activity, described concretely:
- The threat it mimics (what the detection is actually hunting):
- Alert rules or detections this pattern typically fires:

## Discriminators

<!-- The checks that distinguish the benign behavior from the threat it
     mimics. Each must be checkable against alert fields or a source system
     at queue speed, and exact: "destination string equals the entry's named
     endpoint", not "destination looks right". -->

1.
2.
3.

## Eligibility constraints

<!-- The global Level 0 gate still applies to every close against this entry:
     non-crown-jewel subject, no privileged identity or sensitive-capability
     automation, no regulated data in reach, each proven from its source.
     Record here any narrower constraint this pattern adds, e.g. "applies only
     to hosts in group X" or "never applies to release-signing runners". -->

-

## History

- Alerts closed against this entry (running count or query link):
- False-close reviews (date and outcome, when a close against this entry was
  later found wrong):
- Tuning feedback filed:

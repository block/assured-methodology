# Pattern-library entry

<!-- ASSURED Methodology by Timothy Zilber, © Block, Inc., CC BY 4.0
     (https://creativecommons.org/licenses/by/4.0/). Reuse and adapt freely
     with attribution; note any changes you make.
     ASSURED fast path (https://assured-methodology.vercel.app/docs/fast-path).
     One entry per documented known-benign pattern, governed like code: a
     second person approves it, every change gets a new version, and every
     Level 0 close cites the version it matched. An entry earns Level 0
     closes only while it is current: past the review date, or after an
     invalidation trigger, closes against it move to Level 1 until the owner
     re-verifies. "I've seen this before" is not a pattern; this file is. -->

## Identity

- Pattern ID (e.g. PTN-NNN):
- Name (one line: the benign behavior this documents):
- Owner (person or team accountable for the entry's correctness):
- Approver (a second person, not the author, who reviewed this version):
- Version, and what changed from the previous version:
- Created (UTC date):
- Review date (the entry's expiry: invalid for Level 0 after this date; by
  default every 90 days):

## The behavior

- The benign activity, described concretely:
- The threat it mimics (what the detection is actually hunting):
- Linked detections (rule name and ID @ version) this pattern typically fires:
- Expected volume (closes per week, and the host or identity spread), and the
  threshold above which a spike forces review:
- Evidence basis (the cases, vendor documentation, or change records that
  established the behavior as benign):

## Discriminators

<!-- The checks that distinguish the benign behavior from the threat it
     mimics. Each must be checkable against alert fields or a source system
     at queue speed, and exact: "destination string equals the entry's named
     endpoint", not "destination looks right". Prefer fields an attacker
     cannot cheaply forge: exact destination match, parent process tree,
     extension or plugin ID, directory group membership. Names, paths and
     ports are cheap to fake. Signer and install path are table stakes, not
     discriminators: they do not vouch for code a signed host runs
     (extensions, plugins, MCP servers, package-manager scripts). Where the
     entry backs a suppression, key it to the exact tuple (tool version,
     extension or plugin ID, destination set), never to signer and install
     path alone. Never derive an entry from content belonging to the event
     under investigation (its own logs, messages, or tickets); the evidence
     basis comes from cases already closed and verified. -->

1.
2.
3.

## Known mimicry and blind spots

- How an attacker would imitate this pattern, and which discriminator still
  catches the imitation:
- Validation test (how to generate an imitation the discriminators must
  catch; run it at each review):
- Blind spots (what these discriminators cannot see):

## Eligibility constraints

<!-- The global Level 0 gate still applies to every close against this entry:
     non-crown-jewel subject, no privileged identity or sensitive-capability
     automation, no regulated data in reach, each proven from its source.
     A privileged identity always fails the gate and routes to Level 2,
     however routine the activity. Record here any narrower constraint this
     pattern adds, e.g. "applies only to hosts in group X" or "never applies
     to release-signing runners". -->

-

## Governance

- Recurrence threshold (e.g. three Level 0 closes on the same entity in
  seven days force a Level 1 review):
- Invalidation triggers (any of these forces immediate re-review; closes move
  to Level 1 meanwhile): linked rule changed, asset group re-tagged, observed
  abuse of the pattern, and for AI-matched entries a model, prompt or tool
  version change; other:
- Reversal threshold (confirmed false closes that suspend the entry
  automatically until the owner re-reviews it; by default, one):
- Machine-close flag (default off). Turn it on only when every box holds:
  - [ ] this entry, at this version, carries the flag with the approver's
        sign-off
  - [ ] discriminators are evaluated by code, not by a reader
  - [ ] the eligibility gate is enforced by code on every close
  - [ ] humans QA-sample the machine closes (rate and reviewer named)
  - [ ] reversal and miss rates are tracked for this entry
  - [ ] a kill switch exists, with a named owner
- QA sample rate for machine closes (share of closes a human reviews, and
  the reviewer; "not applicable" while the flag is off):
- Kill-switch owner (named person), and the date the switch was last
  tested:

## History

- Alerts closed against this entry (running count or query link):
- Audit-sample results (date, closes sampled, false closes found):
- False-close reviews (date and outcome, when a close against this entry was
  later found wrong):
- Version history (version, date, author, approver, change):
- Tuning feedback filed:

# Governance

ASSURED is a maintainer-led project. This document describes who decides
what, how the methodology is versioned, and what a release involves.

## Roles

- **Maintainer**: Timothy Zilber ([tzilber@block.xyz](mailto:tzilber@block.xyz)).
  Reviews and merges all changes, owns releases, and holds the accuracy bar
  described in [CONTRIBUTING.md](CONTRIBUTING.md).
- **Contributors**: anyone, through issues and pull requests. Accuracy
  reports with primary sources are the highest-value contribution and are
  often merged as-is.

## Decision process

- **Factual disputes are settled by primary sources**: the MITRE technique
  page, the CFR section, the RFC, the vendor documentation. Whoever brings
  the better source wins, including against the maintainer.
- **Methodology-substance changes** (the seven-phase structure, phase
  doctrine, the depth ladder, escalation criteria) start as an issue for
  discussion before any pull request. The maintainer decides after
  discussion; the reasoning is recorded in the issue.
- **Everything else** (corrections, copy, site code) goes straight to a pull
  request.

## Versioning

The methodology carries a version, stamped in the site footer and recorded
in [CHANGELOG.md](CHANGELOG.md):

- **Major** versions change what the methodology *is*: the phase structure,
  a phase's core doctrine, or the meaning of an existing deliverable.
  Adopters who built training or tooling on the previous major version
  should expect rework.
- **Minor** versions add or improve content without changing existing
  doctrine: new pages, new patterns, new worked examples, expanded rules.
- Corrections and copy edits ship continuously and are batched into the next
  minor release's changelog entry rather than versioned individually.

## Releases

A release is: the version updated in `src/data/version.ts` (the site footer
stamp) and `CITATION.cff`, a dated entry in `CHANGELOG.md`, and a git tag.
There is no fixed cadence; releases happen when accumulated changes are
worth an adopter's attention.

## Block open source

This project follows the
[Block Open Source Project governance](https://github.com/block/.github/blob/main/GOVERNANCE.md).

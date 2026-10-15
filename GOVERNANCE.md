# Governance

ASSURED is a maintainer-led project. This document describes who decides
what, how the methodology is versioned, and what a release involves.

## Roles

- **Maintainer**: Timothy Zilber ([tzilber@block.xyz](mailto:tzilber@block.xyz);
  GitHub [@tzilber-sq](https://github.com/tzilber-sq)), listed in
  [MAINTAINERS.md](MAINTAINERS.md).
  Reviews and merges all changes, owns releases, and holds the accuracy bar
  described in [CONTRIBUTING.md](CONTRIBUTING.md).
- **Contributors**: anyone, through issues and pull requests. Accuracy
  reports with primary sources are the highest-value contribution and are
  often applied as written.

## Decision process

- **Factual disputes are settled by primary sources**: the MITRE technique
  page, the CFR section, the RFC, the vendor documentation. Whoever brings
  the better source wins, including against the maintainer. The maintainer
  adjudicates source disputes and records the reasoning in the issue;
  contributors may appeal to the Block Open Source Governance Committee
  ([open-source-governance@block.xyz](mailto:open-source-governance@block.xyz)),
  which has final authority.
- **Methodology-substance changes** (the seven-phase structure, phase
  doctrine, the depth ladder, escalation criteria) start as an issue for
  discussion before any pull request. The maintainer decides after
  discussion; the reasoning is recorded in the issue.
- **Everything else** (corrections, copy, site code) goes straight to a pull
  request.
- **Maintainer availability**: if the maintainer is unavailable for 60 days,
  the Block Open Source Governance Committee appoints an interim maintainer.

## Versioning

The methodology carries a version, stamped in the site footer and recorded
in [CHANGELOG.md](CHANGELOG.md):

- **Major** versions change what the methodology *is*: the phase structure,
  a phase's core doctrine, or the meaning of an existing deliverable.
  Adopters who built training or tooling on the previous major version
  should expect rework.
- **Minor** versions add or improve content without changing existing
  doctrine: new pages, new patterns, new worked examples, expanded rules.
- **Patch** versions (1.2.x) cover corrections and copy edits. They are cut
  at least monthly when `main` has unreleased changes, so the live site never
  drifts far from a citable version.

Releases through 1.2.0 were a stabilization period: 1.2.0 changed doctrine
(the two-axis verdict, the decision contract, insider escalation, mandatory
template headers) but shipped as a minor, and its CHANGELOG entry records
that. After 1.2.0 the major rule above applies as written, and each
doctrine change links the issue where it was discussed.

## Standards and regulatory watchlist

These sources change what the site states as current. Each row is checked
on its review date and whenever the source publishes; a change ships as a
patch, or as a minor when doctrine changes. Standards and frameworks are
reviewed quarterly; the items `scope/clocks.mdx` marks "Status to watch"
are reviewed monthly.

| Source | What changes on the site | Where | Next review |
|---|---|---|---|
| MITRE ATT&CK (next release after v19.2) | Technique and tactic IDs and names, the pinned bundle | `ATTACK_VERSION` and `ATTACK_STIX_URL` in `.github/workflows/ci.yml`, the standards-mapping version pins, the B.A.D. "last reviewed" lines | 2026-10-31, then 2027-01-13 |
| NIST CSF 2.0 and SP 800-61r3 | Outcome IDs and the crosswalk rows | `standards-mapping.mdx` | 2027-01-13 |
| ISO/IEC 27035 parts, ISO/IEC 27001 A.5.24 to A.5.28 | Edition pins and control mapping | `standards-mapping.mdx` | 2027-01-13 |
| SANS DAIR book editions, the SEC450 course title | Comparator descriptions and titles | `positioning.mdx`, `standards-mapping.mdx` | 2027-01-13 |
| CIRCIA final rule | Whether its 72-hour and 24-hour clocks are in force | `scope/clocks.mdx` (Status to watch) | 2026-11-13 |
| EU Digital Omnibus changes to GDPR Art. 33 | The 72-hour clock and the notify threshold | `scope/clocks.mdx` (Status to watch) | 2026-11-13 |
| UK Cyber Security and Resilience Bill | A 24-hour initial notice under the NIS regime | `scope/clocks.mdx` (Status to watch) | 2026-11-13 |
| SEC agenda on Item 1.05 and Regulation S-K | The 8-K four-business-day clock | `scope/clocks.mdx` (Status to watch) | 2026-11-13 |
| NIS2 national transposition, DORA, the Cyber Resilience Act | Recipients, thresholds and application dates | `scope/clocks.mdx`, `scope/regulatory.mdx` | 2027-01-13 |
| HIPAA Security Rule final rule, the next PCI DSS version | Safeguard and notification wording | `scope/clocks.mdx`, `scope/regulatory.mdx` | 2027-01-13 |
| US state breach laws, including California Civ. Code 1798.82 | Numeric deadlines and AG-notice thresholds | `scope/clocks.mdx` | 2027-01-13 |
| EU AI Act application dates, NIST AI RMF and AI 600-1, MITRE ATLAS, the OWASP LLM and Agentic Top 10 | The dated AI standards and law crosswalk | `ai-governance.mdx` | 2027-01-13 |
| Vendor and product status | Renames, acquisitions, deprecations and shutdowns | `src/data/vendors.ts` (rendered by `VendorStatus`) | 2027-01-13 |

The first dates run from the current "Law as of" date on the clock card
(13 October 2026). Move a row's date forward when its review is done.

## Releases

A release is: `package.json` version, `src/data/version.ts` (the site footer
stamp), `CITATION.cff` and the README badge bumped together (the build fails
if README and `package.json` disagree), a dated `CHANGELOG.md` entry, an
annotated tag `vX.Y.Z`, and a GitHub Release.
There is no fixed cadence; releases happen when accumulated changes are
worth an adopter's attention.

## Currency review

Four times a year the maintainer re-verifies the technology claims, with
the April and October passes timed to MITRE ATT&CK releases. The first pass
runs against ATT&CK v20 (expected late October 2026). Each pass:

1. Re-point `scripts/check-attack-ids.mjs` at the new Enterprise ATT&CK
   bundle (see [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)) and fix what
   fails.
2. Re-check every `src/data/vendors.ts` entry whose `asOf` date is older
   than the last pass.
3. Re-check the as-of dates on `scope/regulatory.mdx` and
   `scope/clocks.mdx` (see below).
4. Move the `techVerified` stamp on each page re-verified. The build warns
   when a stamp is more than 180 days old and fails at 365.
5. Bump `CONTENT_LAST_REVIEWED` in `src/data/version.ts`.
6. Work through the watchlist rows that are due.

Record the pass in `CHANGELOG.md` under Unreleased.

### Regulatory review cadence

Each quarter, as part of the pass, a maintainer re-verifies
`scope/regulatory.mdx` and `scope/clocks.mdx` against primary sources and
updates their "Law as of" lines and `techVerified` dates. The items those
pages mark "Status to watch" get a lighter monthly check: has the proposal
become law, or the rule been published? Where a changed fact can be stated
firmly, add or update a pin in `scripts/check-content-contracts.mjs` (as
the `california-breach-clock` contract does), so a later edit cannot
silently undo it.

## Block open source

This project follows the
[Block Open Source Project governance](https://github.com/block/.github/blob/main/GOVERNANCE.md).

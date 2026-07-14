# Changelog

Notable changes to the ASSURED methodology and its site. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); version numbers
follow the policy in [GOVERNANCE.md](GOVERNANCE.md). The current version is
stamped in the site footer.

## [1.1.0] - 2026-07-13

The review release: a full independent technical and editorial review of the
methodology, followed by a fix wave that touched every chapter.

### Added

- **The fast path**: the depth ladder (Level 0 pattern close, Level 1
  standard triage, Level 2 full investigation) that reconciles the seven-phase
  arc with real queue volumes, plus copy-ready artifacts (five-field close,
  alert-report template, handoff-packet skeleton).
- **AI-assisted triage**: a phase-by-phase map of what an AI assistant drafts
  and what the analyst decides, verification discipline for AI-drafted work,
  AI-agent identities as subjects, and AI-abuse patterns in the queue.
- Real chapter quizzes with scenario-based questions and explanations.
- Missing methodology rules across Subject, Uncover, Risk, Escalation, and
  Documentation (evidence-confidence labels, boundary ratchets, closure
  criteria, and others surfaced by the review).
- Cloud-identity attack patterns (token replay, device-code phishing, AiTM
  session theft) and Kerberos/AD delegation coverage in Subject.
- A "Cloud and identity logs" parsing page (CloudTrail record anatomy, role
  chains, the IMDS pattern, IdP sign-in logs) and macOS parsing coverage
  (launchd lineage, signature chains, notarization) so the Alert chapter can
  parse its own macOS worked example.
- A "Correlation and the timeline" pillar in Uncover: join keys and their
  traps, clock-skew rules, the running confidence-labeled timeline, the
  hypothesis ledger, and stopping rules. Plus XDR, ITDR, CDR, and
  sandbox/detonation families in the Uncover tool catalog.
- Verified external citations (CISA, MITRE ATT&CK, NVD, vendor research) on
  160 fact-bearing entries in the B.A.D. glossary.
- CI hardening: type checking, an internal link checker, a CSP-hash check
  wired into the build, Dependabot, and community files (code of conduct,
  contributing guide, issue templates, security policy).
- Versioning and governance: this changelog, `CITATION.cff`, a real
  `GOVERNANCE.md`, and the version stamp in the site footer.

### Changed

- Licensing split: code under MIT, methodology content under CC BY 4.0;
  fonts replaced with self-hosted OFL-licensed families.
- The regulatory-boundaries page rebuilt against primary sources (HIPAA, PCI
  DSS, GDPR, SEC, state breach-notification law).
- Accuracy corrections across all seven chapters and the three glossaries:
  MITRE technique mappings, detection-mechanism descriptions, tool and
  threat-actor currency, WannaCry and other case details.
- Accessibility pass to WCAG 2.1 AA: landmarks, contrast, keyboard access to
  interactive components, reduced-motion support.
- Mobile presentation, information architecture, navigation, typography, and
  design-token consolidation.
- Parsing subtree restructured around an honest taxonomy: one normalization
  layer (the former multi-format and schema pages, merged) plus five
  behavioral surfaces; the command-line page rebuilt around the actual
  decode workflow (UTF-16LE, abbreviated flags, the 4688 command-line gap).

### Fixed

- Worked-example continuity: the two threaded cases (finance-team phishing,
  Cursor IDE false positive) now carry consistent entities, timestamps, and
  verdicts through all seven chapters.
- Deployment identity (canonical Vercel domain), SEO metadata, structured
  data, server-side redirects, and site search.

## [1.0.0] - 2026-05-15

Initial complete public release: seven chapters (Alert, Subject, Scope,
Uncover, Risk, Escalation, Documentation), each with concept pages, a worked
example, a quiz, and a transition; three glossaries (B.A.D., C.A.T.,
C.L.E.A.R.); two threaded cases; site search.

[1.1.0]: https://github.com/block/assured-methodology/releases/tag/v1.1.0
[1.0.0]: https://github.com/block/assured-methodology/releases/tag/v1.0.0

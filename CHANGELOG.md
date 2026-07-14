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
- A third threaded case on every chapter's worked example: a SaaS-tenant
  token theft (AiTM phishing, session replay, inbox-hiding rule, OAuth
  consent persistence) investigated entirely from identity and tenant logs,
  escalated mid-investigation under the break-glass rule. SaaS audit logs
  and Kubernetes audit logs added to the Uncover data-source catalog.
- Verified external citations (CISA, MITRE ATT&CK, NVD, vendor research) on
  160 fact-bearing entries in the B.A.D. glossary.
- CI hardening: type checking, an internal link checker, a CSP-hash check
  wired into the build, Dependabot, and community files (code of conduct,
  contributing guide, issue templates, security policy).
- Versioning and governance: this changelog, `CITATION.cff`, a real
  `GOVERNANCE.md`, and the version stamp in the site footer.
- A printable one-page reference: the seven phases with anchor question,
  deliverable, and exit decision each, the escalation-criteria checklist
  (also downloadable as a Markdown template), the depth ladder, and the
  memory hooks. Plus a site-wide print stylesheet so any page prints
  black-on-white without navigation chrome.
- A "Where ASSURED sits" positioning page engaging the related work:
  NIST 800-61r3, SANS PICERL and SEC450, Crafting the InfoSec Playbook,
  the Blue Team Handbook, MITRE's 11 Strategies and ATT&CK, OODA, ACH,
  the Diamond Model, and OSCAR, plus the NCSC "Assured" name-adjacency
  note.
- Glossary depth: thirteen working-vocabulary terms in C.L.E.A.R. (the
  full confusion matrix, blast radius, dwell time, playbook and runbook,
  enrichment, tuning, suppression, detection engineering, BEC,
  pretexting), plus XDR as a concept and Sigma, YARA, Velociraptor, KAPE,
  plaso, and Volatility in the C.A.T. catalog. Business-email-compromise
  investigation guidance added to the Uncover email data source.
- A "Cognitive traps in triage" page: the eight thinking errors that bend
  triage verdicts (anchoring, confirmation bias, tunnel vision,
  availability, automation bias, the pattern reflex, sunk cost, and
  deference), each with its tell and the methodology device that counters
  it. The "what a less experienced analyst could miss" callouts now run
  through all seven chapters' worked examples.
- Chapter-quiz completion now persists in the browser: finishing a chapter
  quiz records it locally (localStorage, nothing leaves the device) and the
  seven-phase progress strip shows a completion tick on that phase; the
  quiz's "Start over" clears the record.
- A training pack: three hands-on exercise packets (a full-arc print-server
  intrusion, a benign-true-positive consent case, a timed Level 0 drill)
  with artifacts, phased tasks, sealed answer keys, and downloadable
  learner versions, plus a "Teaching ASSURED" facilitator guide with three
  delivery formats, a four-session workshop plan, exercise-running
  mechanics, a close-note rubric, and the common-misconception list.
- An "Adopting ASSURED in your SOC" guide for team leads: a five-stage
  rollout arc (pilot, baseline, train, reconcile tooling, operate), seven
  triage-quality metrics that pair decision quality with speed (escalation
  acceptance, reopen rate, missed incidents, handoff rework, time-in-phase,
  pattern-library health, close-note quality), a four-level maturity model,
  and the duty list the SOC lead owns.

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
- The chapter easter-egg engine now ships as one cached, bundled script
  instead of being inlined into every content page, trimming roughly 13 KB
  from each page's HTML.
- Style rules duplicated verbatim across content pages (outcome rows, pillar
  and card grids, worked-example steps, download pills) moved to one shared
  stylesheet; per-chapter color variants stay page-local.
- C.L.E.A.R. glossary cleanup: 38 generic IT and business dictionary entries
  removed (Enterprise, Framework, IntelliSense, ROI, and similar) and 54
  definitions rewritten to their security meaning as used in triage, most
  notably Process, User, Domain, and API. Every hover-tooltip on the site
  still resolves.
- Parsing subtree restructured around an honest taxonomy: one normalization
  layer (the former multi-format and schema pages, merged) plus five
  behavioral surfaces; the command-line page rebuilt around the actual
  decode workflow (UTF-16LE, abbreviated flags, the 4688 command-line gap).
- Altitude honesty pass: Tier 3 redefined as senior technical escalation
  with incident command as a separate function; program-level content
  (telemetry principles, the intel pipeline, dark-web monitoring, insider
  mitigations, UEBA implementation, court-grade forensics) explicitly
  scoped to program designers vs. the on-shift analyst; the Scope
  infrastructure page's tool grid replaced with three visibility questions
  and a link to the Uncover catalog; threat-intel coverage deduplicated
  across Uncover via cross-links.

### Fixed

- The glossary jump-navs actually pin while scrolling on larger screens (their
  position: sticky never engaged) and sit below the site header instead of
  underneath it; on phones, where the wrapped rows would cover much of the
  viewport, they scroll with the page. Jump and deep-link landings offset
  themselves past the pinned nav, whose height varies as its rows wrap, so
  the target heading is never hidden underneath it.
- The glossary ambient background layer (grid overlay plus each theme's
  motion ornament) renders again: a stacking rule matched it by mistake and
  collapsed it to zero height on all three glossaries.
- Glossary filter inputs meet the 16px floor below which iOS Safari zooms the
  page on focus, and small touch controls (chapter pill nav, glossary nav
  pills, the easter-egg toggle) get a 44px touch-target floor on touch devices.
- The search modal sizes itself to the dynamic viewport on iOS so its bottom
  edge is not hidden behind Safari's toolbar, and its scroll no longer chains
  to the page behind it.
- The B.A.D. glossary pauses off-screen animated art (roughly 165 elements
  animated continuously for the life of the page), cutting main-thread work,
  scroll jank, and battery drain on phones.
- Internal links use the trailing-slash form Vercel actually serves, removing
  a 308 redirect from every page navigation. Astro dev now rejects the bare
  form and the link checker enforces it at build time.
- The Vercel deploy is pinned to the repo's own build command, so the search
  index is always generated, and Pagefind's immutable search assets ship with
  long-lived cache headers.
- The mobile navigation menu scrolls within the sticky header. Its 81 links
  previously extended thousands of pixels past the viewport with no way to
  reach anything below the first screenful.
- The browser Back button no longer goes dead after visiting a worked-example
  page: the example stepper and the table of contents now preserve the
  view-transition router's history state instead of nulling it.
- Long unbreakable tokens (registry paths, encoded command lines, dotted log
  fields) wrap inside inline code, callouts, and quiz prompts instead of
  forcing whole-page sideways panning on phones. This fixes horizontal
  overflow on eight pages at phone widths.
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

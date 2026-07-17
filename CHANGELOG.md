# Changelog

Notable changes to the ASSURED methodology and its site. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); version numbers
follow the policy in [GOVERNANCE.md](GOVERNANCE.md). The current version is
stamped in the site footer.

## [1.2.0] - 2026-07-16

The assurance release: a full accuracy, accessibility, and release-assurance
pass across every chapter, the shipped templates, and the site, with each
fix pinned by a regression gate in the build.

### Added

- AI-assisted triage now opens with a mandatory admission gate: data
  classification, provider approval, and tool authorization must all pass
  before any AI use on a case, with an explicit non-AI path when they don't.
- Level 0 eligibility is enforceable in the shipped record: the pattern
  close record carries a three-check eligibility gate (an unknown fails it),
  a new pattern-entry template establishes owner and review date for every
  library pattern, and the timed drill now proves the gate with an
  inventory artifact.
- Decision and provenance metadata in the shipped templates: the event
  report opens with a decision header (two-axis verdict, priority with the
  matrix cell or named override, confidence, author, UTC time, material AI
  use) and the handoff packet opens with case metadata (case ID, owner, the
  fired escalation criterion with rationale, AI use).
- A four-check stopping rule for correlation (pivot validity, coverage,
  alternatives considered, consequence of being wrong), replacing the bare
  "two empty pivots" heuristic.
- Regression gates in the build: 22 content contracts and 14
  engineering contracts pin the load-bearing sentence or mechanism of every
  fix, a contrast gate recomputes 112 WCAG measurements from the live
  source colors, and a release-time determinism gate proves two cold-cache
  builds are byte-identical.

### Changed

- Risk, likelihood, and Escalation now form one deterministic decision
  contract: a single reduction from impact and likelihood to action, with
  three named overrides (a confirmed escalation criterion, the high-impact
  clock-tightening rule, and the unknown-is-not-Low rule), aligned across
  the risk framework, the escalation criteria, the quick reference, and the
  escalation checklist template.
- Verdict vocabulary is two-axis (detection correctness crossed with
  activity disposition), retiring bare "false positive" as a closure label;
  the Cursor IDE threaded case is relabeled a benign true positive through
  all seven chapters.
- Insider-threat guidance no longer waits for streams to agree: confirmed
  harm escalates on act, asset, and impact regardless of HR context, and
  the two-stream agreement rule is restricted to behavioral-only
  enforcement decisions.
- The AWS regulated-data worked example closes on independent evidence
  (CloudTrail, access analysis) instead of subject self-attestation, and
  its quiz is re-keyed to match.
- ATT&CK mappings brought current with v19 and verified against the
  primary sources: session-cookie replay remapped to T1550.004, retired
  tactic naming removed, taxonomy references updated.
- Cloud-identity and network parsing lessons separate observation from
  inference: provider-aware field semantics with federation caveats, named
  benign twins for each suspicious pattern, and decisive follow-up queries;
  containment language is criteria-driven rather than presumed.
- Regulatory summaries corrected against primary sources: GDPR territorial
  scope routed through the Article 3 nexus tests to DPO/counsel, SEC
  retention duties scoped to Rule 2-06's actual reach, legal hold framed as
  counsel-directed.
- Detection-family taxonomy is multi-label with a local calibration
  checklist; exercise answer keys are artifact-traceable, grade "cannot
  determine yet" as a correct answer where the artifacts run out, and
  penalize asserting beyond the evidence.
- Glossary accuracy: BigFix attributed to HCL, Cuckoo sandbox dating fixed,
  an unsupported password-reuse statistic dropped, the APT definition
  aligned across glossaries.

### Fixed

- Normal-size text over the page gradient and card surfaces now clears the
  WCAG 4.5:1 contrast floor everywhere it was failing: evasion-pattern
  accents, hero soft text, chapter watermark numerals across seventeen
  pages, and the 404 page.
- Quiz explanations, flip-card backs, and the phase diagram are fully
  readable without JavaScript and in print; this pass caught and fixed a
  Tailwind cascade-layer inversion that had silently disabled the quiz
  print/no-JS fallback while the rules sat present in the CSS.
- Keyboard and voice navigation: Escape dismisses the header dropdowns,
  chapter-card accessible names contain their visible "Read chapter" label,
  and the progress-strip labels render unclipped at 320px.
- Builds are byte-for-byte reproducible: five sources of per-build random
  IDs (component ID mints and the breadcrumb nav) replaced with
  deterministic equivalents, so a release can be attested against its
  source.
- Dependency advisories reduced from thirteen to six via version-scoped
  overrides; the remaining six sit in dev-server/SSR code paths that are
  unreachable in the fully prerendered static deployment.
- Threaded-case continuity: localized timeline, terminology, and handoff
  drift corrected across the three cases (~30 pages), with the case facts
  now pinned by build contracts.

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
- Two more build gates: the reading order that drives every page's
  previous/next pager must cover exactly the content pages that exist, and
  the glossary source must be structurally sound (no empty entries, no term
  defined twice within one glossary or spelled two ways anywhere, matched
  term markup, and every C.L.E.A.R. entry filed under the right letter in
  alphabetical order). Either failing now fails the build naming the exact
  file and entry.

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
- The linear reading arc flows section-to-section: the Alert chapter's
  thirteen subsection reference pages step out of the previous/next pager
  (they are reached from their section pages and render no pager of their
  own), so reading straight through no longer detours into deep reference
  material.
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
- The heading outline is now real on every page: about a thousand card titles
  sat at h4 directly under h2 section heads (51 pages skipped a level, which
  screen-reader users navigate by), and are now h3 with their rendered look
  pinned unchanged. The glossary data extraction reads the new tags in
  lockstep.
- The table of contents follows the page content in DOM order, so keyboard
  and screen-reader users reach the chapter before the link rail, and it
  lists only the chapter's section headings.
- Contrast lifts on text over the page gradient's light band: the pager's
  Previous/Next direction labels and the quiz progress labels now clear the
  4.5:1 floor, as does the C.L.E.A.R. filter placeholder.
- Pages print faithfully: gradient-clipped headlines no longer print as blank
  space (the transparent text fill now flips to dark ink in print), and
  worked-example steppers print every step instead of only the selected one.
  The same all-steps fallback applies when JavaScript is off.
- The search modal's close button meets the 44px touch floor, glossary filter
  focus rings survive forced-colors mode, and the evasion-pattern disclosure
  headers use valid summary markup.
- The desktop nav had outgrown its breakpoint: fifteen top-level links
  painted over the search and GitHub controls at almost every desktop width.
  The five guide pages (Fast path, AI triage, Cognitive traps, Quick
  reference, Where ASSURED sits) now fold into a Guides dropdown, restoring
  the eleven-item row the 1350px breakpoint was calibrated for.
- Laptops get the desktop navigation instead of the phone menu: the
  eleven-link header now fits from 1240px up, using tighter spacing and an
  icon-only search trigger at laptop widths (1240 to 1449px), with the full
  search label returning at 1450px. The hamburger menu is reserved for
  phones and tablets.
- The progress strip on a quiz's own page ticks the moment the chapter quiz
  completes instead of after a reload; quiz-completion storage now lives in
  one shared module read by both the quiz and the strip.
- The first worked case on all seven example pages now appears in the table
  of contents and its scroll spy; its only heading lived inside the card
  component, invisible to the TOC.
- The Training and Glossaries dropdowns no longer open with an "overview"
  row that mislabeled a child page as a chapter intro and duplicated its
  link; in the mobile menu those groups render as plain labels instead of
  links for the same reason.
- The header highlights the section you are in even when the page is not
  the section's own hub: Guides, Training, and Glossaries now mark
  themselves current for every child page.
- The Alert dropdown lists its three sections like every other chapter
  instead of every subsection page; subsection navigation stays on the
  section pages themselves. The mobile menu now matches, and its section
  rows stay highlighted while reading a subsection.
- The CDE and PFI hover tooltips on the regulatory-boundaries page show
  their definitions for the first time; the term text passed as slot
  children had always replaced the definition body. The DefineTerm doc
  comment now describes the real precedence (slot, then definition prop,
  then glossary lookup).
- Copy that still said "two cases" after Case C landed now counts all
  three: the Alert transition and example pages, the Documentation
  templates pointer, and CONTRIBUTING's case-study ask. The Scope example
  callout, which sits above Case C on its page, now says "two cases so
  far".
- Glossary hero ledes are no longer a paragraph nested inside a paragraph;
  the browser auto-closed the wrapper and dropped the theme tint on the
  visible text.
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
- The favicon is the ASSURED puzzle mark on the site's slate tile instead of
  the Astro starter rocket, shipped at every size browsers ask for: SVG,
  multi-size ICO, Apple touch icon, and web-app manifest icons for Android
  home screens.
- The 404 page points lost visitors at the introduction and the quick
  reference instead of dead-ending, and tells search engines not to index it
  (Vercel serves the underlying /404.html file with a 200 status, which had
  left it indexable).

## [1.0.0] - 2026-05-15

Initial complete public release: seven chapters (Alert, Subject, Scope,
Uncover, Risk, Escalation, Documentation), each with concept pages, a worked
example, a quiz, and a transition; three glossaries (B.A.D., C.A.T.,
C.L.E.A.R.); two threaded cases; site search.

[1.2.0]: https://github.com/block/assured-methodology/releases/tag/v1.2.0
[1.1.0]: https://github.com/block/assured-methodology/releases/tag/v1.1.0
[1.0.0]: https://github.com/block/assured-methodology/releases/tag/v1.0.0

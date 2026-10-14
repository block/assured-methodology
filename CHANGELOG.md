# Changelog

Notable changes to the ASSURED methodology and its site. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); version numbers
follow the policy in [GOVERNANCE.md](GOVERNANCE.md). The current version is
stamped in the site footer.

## [Unreleased]

The doctrine release. The decision model, the verdict vocabulary, the
escalation tripwire, the priority clocks and the automation rules all
change, so a team that built runbooks, training or tooling on 1.2.0 has
rework to do. Under the rules in [GOVERNANCE.md](GOVERNANCE.md) these
changes make the next release a major version. The rest of the release
restructures the site around tasks, adds the pages and templates an
operating SOC asked for, and corrects every claim that failed a fresh
check against primary sources.

From this release on, each substantive entry names the observation that
prompted it, as the Development and evidence page promises.

### Breaking for adopters

These change what the method says, not only where it says it. Update
runbooks, training material, record templates and any tooling that parses
ASSURED records.

- **Risk recommends; the Escalation decision decides.** Risk now produces
  the impact rating, the likelihood rating, the analytic confidence, the
  matrix cell, a priority (P1 to P4) and a recommended move. The
  Escalation decision phase makes and records the close-or-escalate call.
  A Level 0 close or a tripwire escalation from an earlier phase is an
  early Escalation decision, recorded in the same E fields.
  Prompted by: the Risk chapter, the introduction and a Risk quiz key gave
  three different answers to who decides, so a record could not show who
  had.
- **Likelihood and confidence are separate fields.** Likelihood is how
  probable it is that the activity is malicious or unauthorized (High,
  Medium, Low); confidence is the analytic confidence in that judgment, on
  the single rubric in Documentation standards, which the tripwire, the
  matrix record and the handoff packet now all share. The matrix stays
  Impact by Likelihood, with confidence recorded beside the cell, and
  "unknown is not Low" still holds. The split follows ICD 203.
  Prompted by: likelihood was defined three ways across the Risk pages, and
  one definition fused probability with evidence quality, so every
  well-evidenced case landed in a P1 cell.
- **The break-glass rule is now the escalation tripwire, with a materiality
  test.** "Confirmed" means supported at High confidence on the rubric.
  Criterion 1 reads "confirmed malicious activity not fully contained by a
  control". Activity a control blocked or quarantined, with no execution
  or follow-on evidence, is recorded at P3 or P4 as a pattern-entry
  candidate and does not page IR. Any criterion confirmed this way still
  makes the case P1 from any phase. "Break-glass" now keeps only its
  industry meaning (emergency-access accounts); the old name stays in the
  glossaries as a former name, and the old anchors still resolve.
  Prompted by: an EDR-quarantined commodity download met criterion 1 and
  paged IR at P1, "confirmed" had no threshold, and analysts reading
  "break-glass" in an Entra ID alert met two meanings for one word.
- **One escalation rule, and a clock for every priority band.** Escalate
  if a criterion is confirmed or the matrix places the case at P1 or P2.
  At P3, keep working to the named re-score trigger, then close or
  escalate. Close at P4. Record the cell either way; a documented close
  remains a first-class verdict. Default clocks, which adopters tune: P1
  pages immediately with a no-acknowledgment fallback at 15 minutes; P2 is
  acknowledged within 15 minutes and escalated within 4 hours; P3 is
  re-scored within 24 hours on a named trigger; P4 closes within the queue
  SLA. "Within the shift" is gone everywhere.
  Prompted by: the desk card told a P2 case with no confirmed criterion to
  escalate and to close at once, and "within the shift" meant anything
  from 8 to 12 hours.
- **The case, not the alert, is the unit of work.** Alerts on the same
  entity and window, or under one vendor incident ID, form one case. The
  case's depth level is set by its riskiest member, and a grouped case
  never closes at Level 0 if any member fails eligibility.
  Prompted by: the depth ladder was defined per alert, so a correlated
  burst could close member by member at Level 0.
- **One verdict vocabulary on two axes.** Detection: true positive, false
  positive (logic), false positive (data). Activity: malicious, policy
  violation, authorized (benign true positive), benign-confirmed,
  undetermined. "Merged into case" is a status, not a disposition, and a
  benign true positive is never called a false positive. The same strings
  appear on every template, schema, card and quiz, and the ASSURED terms
  glossary carries a crosswalk to the Microsoft Sentinel and Defender XDR
  classifications.
  Prompted by: the fast path, the alert report and an Escalation quiz key
  used three different label sets, and one of them called the Case B
  benign true positive a false positive.
- **The depth ladder is narrower at the top and stricter at the bottom.**
  The Level 2 trigger reads "crown-jewel subject, privileged identity, or
  regulated data plausibly accessed by the activity under review";
  reachability alone is a Scope flag. Privileged identities always fail
  the Level 0 eligibility gate and route to Level 2. Pattern-library
  entries are governed like code: second-person approval, version history,
  invalidation triggers (a rule change, observed abuse), a machine-close
  flag, and a reversal threshold that suspends the entry automatically.
  Each chapter index shows the phase at Levels 0, 1 and 2, and the chapter
  time chip reads "Full-arc time (Level 2)".
  Prompted by: "regulated data in reach" made nearly every mailbox a Level
  2 case; an exercise key closed a privileged account's tenant-wide admin
  consent at Level 0; and the chapter chip read as a per-alert target.
- **A governed automation tier replaces "never delegated".**
  Accountability is never delegated; execution may be, at Level 0 parity.
  A machine may close a case only when a documented pattern entry carries
  the machine-close flag, discriminators are evaluated by code, the
  eligibility gate is enforced, people sample the closes, reversal and
  miss rates are tracked, and a kill switch and a named owner exist. AI
  assistants stay advisory above that line. Admission gate 5 now also
  closes the outbound channels a read-only assistant can use (rendered
  links and images, URL fetches), checks the tool and MCP supply chain,
  and requires permission-aware retrieval.
  Prompted by: the absolutes "never delegated, in any tooling generation"
  and "cannot close alerts" did not describe the automated closes teams
  already run, and left those closes ungoverned.
- **Benign-close suppressions are scoped and expire.** A suppression is
  keyed to a tuple (tool version, extension or plugin ID, destination set)
  and carries an expiry, an owner and re-fire triggers; it is never keyed
  to signer and install path alone. A signer and path do not clear code
  running inside a signed host (IDE extensions, MCP servers,
  package-manager scripts), and Case B gains an extension and MCP
  inventory step.
  Prompted by: Case B's feedback proposed suppressing on the signed
  editor binary, which is exactly what a malicious extension runs inside.
- **Stages are Orient, Investigate and Resolve.** Orient (A, S, S),
  Investigate (U, R), Resolve (E, D). The groups are always "stages",
  never "phases", and never "preparation".
  Prompted by: the Documentation chapter called the groups phases and
  named the first one "preparation", which is NIST's and PICERL's word for
  pre-incident readiness.
- **The E chapter is the Escalation decision.** Its anchor question is
  "Close or escalate, and who needs to know?", and its index leads with
  the documented close before escalation and the handoff packet. The
  letter and the /docs/escalation/ URLs are unchanged.
  Prompted by: the chapter landing page never mentioned closing, although
  most triaged cases close there.
- **Analysts record technical activity, not personal circumstances.**
  HR-held context reaches a case only through the insider-risk route,
  never as analyst-collected notes. Personal-circumstance indicators
  (stress, debt, medical or marital events) are removed from analyst
  pages, handoffs and templates.
  Prompted by: the Subject transition asked analysts for "stress
  indicators" while the insider-analysis page said the SOC does not
  collect behavioral signals, and the indicator list carried privacy and
  discrimination exposure.
- **Reaching a phishing kit's credential step means credential exposure.**
  Such a user is credential-exposed until the password is reset, sessions
  are revoked and MFA methods are reviewed. The rule sits in Scope's
  entity rules and the identity-persistence sweep.
  Prompted by: Case C cleared a second user who had abandoned the fake
  sign-in page at the MFA prompt, after an adversary-in-the-middle kit had
  already relayed her password.
- **Preserve before you contain.** A preservation step (volatile evidence
  and the artifacts the containment action destroys) comes before any
  pre-authorized containment. Pre-authorized actions are reversible only;
  non-reversible ones, such as a credential reset or an OAuth grant
  revocation, need IR or owner approval unless the protocol lists them for
  that scenario.
  Prompted by: triage was authorized to isolate hosts and revoke sessions
  before IR arrived, with no order of volatility and no preserve-first
  step anywhere in the method.

#### Migrating 1.2 records

Map each 1.2 value to its replacement when you update runbooks, parsers or
saved queries.

| In a 1.2 record | Becomes |
|---|---|
| Alert report detection "correct" | true positive |
| Alert report detection "incorrect" | false positive (logic) or false positive (data) |
| Activity "malicious" or "confirmed malicious" | malicious |
| Activity "benign" | benign-confirmed, or authorized (benign true positive) when the activity was sanctioned |
| Activity "inconclusive" | undetermined |
| "Merged into incident" | status "merged into case" (a status, not a disposition) |
| Field "Classification:" | "Classification, detection axis:" and "Classification, activity axis:" |
| "Final disposition: benign / confirmed malicious / merged into incident" | "Final disposition, both axes, and status (closed / escalated / merged into case)" |
| "Break-glass rule" | escalation tripwire |
| "Within the shift" (P2) | within 4 hours |
| Chapter "Escalation" | "Escalation decision" (the /docs/escalation/ URL is unchanged) |
| Stage "Preparation & Context" | Orient (with Investigate and Resolve for the other two stages) |

### Added

#### Methodology

- Standards mapping (/docs/standards-mapping/): CSF 2.0 / SP 800-61r3,
  ISO/IEC 27035-1:2023 and ISO/IEC 27001:2022 A.5.24-A.5.28, SANS DAIR,
  CERT/SEI 2004 and FIRST v2.1, operational neighbors, and version pins.
  For each framework it names the phase that does the work, the outcome
  or control it serves, and the record an auditor can sample.
  Prompted by: control owners and auditors ask which framework obligations
  the triage process satisfies, and the related-work map did not answer
  that.
- Case D (/docs/cases/case-d/): a fourth end-to-end case covering a false
  positive (data), an unresolved P3 with named re-score triggers, a Tier 2
  handback and an undetermined close, with a learner packet
  (templates/exercise-case-d.md). A Case files hub (/docs/cases/)
  introduces all four cases.
  Prompted by: none of the three earlier cases showed a parser fault, a
  held P3 or an honest undetermined close.
- New method pages: Intake beyond detections (/docs/alert/intake/: reported
  phishing, external notifications, disclosure reports, hunt findings,
  provider escalations, internal referrals about a person),
  Non-human identities and cloud roles (/docs/subject/non-human-identities/),
  Regulatory clock card (/docs/scope/clocks/), Preserve before you contain
  (/docs/escalation/preserve/), and Talking to people during triage
  (/docs/escalation/communication/).
- New operating pages: Measuring triage (/docs/measuring-triage/),
  Governing automated triage and AI agents (/docs/ai-governance/), Triage
  and detection engineering (/docs/detection-feedback/), and Shift handover
  and operating variants (/docs/operating-variants/).
- New reference pages: the Identity-persistence sweep
  (/docs/reference/identity-sweep/), Telemetry sources and Tool families
  under Field reference, the ASSURED terms glossary (the method's own
  vocabulary, including the verdict crosswalk), and an Acronyms index
  generated from the site's own definitions.
- New teaching pages: Telemetry labs (/docs/labs/) and the Facilitator kit
  and capstone (/docs/teaching/kit/), with session checklists, anchor
  exercises, a depth-ladder alert set, pre-assessment forms and a scored
  capstone in public/templates/facilitator-kit/.
  Prompted by: the teaching rubric contradicted its own model answer, and
  with no anchor exemplars two instructors could score the same packet
  differently.
- Templates: alert reports for identity and phishing alerts, a case
  record, a closure review, a risk verdict, a scope boundary, a subject
  summary, a shift handover, a tuning request and a monthly triage report;
  new exercises (AI draft verification, Case D, a certutil false positive,
  a leaked cloud key, an insider departure, MFA fatigue, a reported
  phish). Every downloaded template is stamped with a "Template version"
  line at build time, and the in-page template viewer shows the same
  version.
- JSON Schemas for every record template (public/templates/schema/),
  including a shared vocabulary schema for the verdict, case-status,
  priority, matrix-cell, confidence and depth-level enums.
- A "Development and evidence" page documenting the author's path into
  event triage, the AUSPICED precursor, the structural redesign into
  ASSURED, applied use in the Lateral Work Program, the practitioner design
  loop, current evidence limits, and a concrete validation roadmap.
  Prompted by: a July 2026 public critique that the site said nothing about
  how ASSURED was created or tested.
- Investigation Theory and Chris Sanders's public research in the
  related-work map, including the derivation method behind the
  Ambiguity-Driven Convergence model and the 2021 dissertation *The
  Analyst Mindset*.
  Prompted by: the same critique, which pointed out that the related-work
  claims omitted his prior work.
- A falsification section on the development page ("What would count
  against ASSURED") naming the observations that would force the
  teachability, phase-decomposition, depth-ladder, and generalization
  claims to change.
- A plain conflict-of-interest statement and an account of how early
  feedback reached the framework: no systematic log, mentee
  clarifications folded in while teaching, and daily use on the author's
  own case queue.
- The program's approximate scale (around a dozen participants) and the
  dated development timeline, from the October 2023 AUSPICED draft through
  the 2026 releases.
- An Anki-ready CSV of the chapter quiz items
  (templates/assured-quiz-items.csv): prompt and options on the front, the
  key and its explanation on the back, tagged by chapter, for spaced
  review.

#### Site and engineering

- Task hubs: Start here (/docs/start/), The method (/docs/method/), Operate
  (/docs/operate/), Field reference (/docs/field-reference/), Teach and
  train (/docs/teach/) and About (/docs/about/).
- Shared data sources that pages render instead of copying: the priority
  matrix and escalation rule (src/data/priority-matrix.ts), the case facts
  (src/data/cases.ts), a dated vendor and product status register with a
  source for every renamed, acquired, deprecated or defunct entry
  (src/data/vendors.ts), and the acronym index (src/data/acronyms.ts).
  Components built on them: CaseFile, EscalationRule, PhaseAtAGlance,
  PriorityMatrix, SevenQuestions, TemplateEmbed and VendorStatus. Pages
  that name fast-moving products record when their technical claims were
  last checked (`techVerified`).
  Prompted by: the priority matrix, the case timelines and the verdict
  lists each existed in several hand-maintained copies that had drifted
  apart.
- Build gates, all wired into `pnpm build` or CI: ATT&CK IDs and names
  checked against a pinned Enterprise ATT&CK release; quiz key position and
  length balance; reserved example names (`.example` domains and
  documentation IP ranges) in case material; raw `<h2>` headings that drop
  out of the page outline; templates kept in step with their schemas and
  the vocabulary; the acronym index kept in step with the content; and a
  template version stamp applied to the built copies. Outside the build: a
  desk-card print page-count check, unit tests for the gate scripts,
  Playwright smoke and axe accessibility tests against the built site, and
  a weekly external-link job that opens a tracking issue instead of
  failing a build. docs/DEVELOPMENT.md documents all of them.
  Prompted by: 68 of 70 chapter quiz keys sat at B or C, case material used
  registrable domains, and ATT&CK IDs and template verdict lists had
  drifted from their sources with nothing to catch it.
- A build gate that fails when the README version badge disagrees with
  package.json, plus contract pins for the corrected AUSPICED expansion
  and the falsification section.
  Prompted by: the badge read 1.1.0 for months after 1.2.0 shipped.
- More gates. In `pnpm build`: em dashes and bold-label comma splices in
  the docs pages, templates, site pages and README; a `techVerified` age
  check on every stamped page (a warning at 180 days, a failure at 365);
  every end-of-page call to action matching the pager; each chapter
  transition sitting before its quiz in the reading order; animations that
  start invisible keeping a visible reduced-motion end state; raw colors in
  MDX styles; the README term count tracking the glossary registry; and an
  Anki-ready CSV of the chapter quiz items kept in step with the quizzes.
  In CI: a dependency review on pull requests, a build-determinism job on
  `main`, a browser test that the header's nav groups open and close from
  the keyboard, and two advisory steps that report without failing the run
  (HTML validation of the built site and the desk-card print budget).
- GOVERNANCE.md gains a standards and regulatory watchlist with review
  dates, a quarterly currency review timed to ATT&CK releases, and a
  regulatory review cadence. docs/DEVELOPMENT.md gains a quarterly
  dependency-majors check, and docs/RESEARCH-LOG.md keeps the long-form
  development history that the Development and evidence page summarizes.

### Changed

#### Methodology

- How ASSURED compares now maps ASSURED against SANS DAIR, ISO/IEC 27035,
  the CERT/SEI incident-management process and FIRST's CSIRT Services
  Framework, and links the Standards mapping crosswalk.
- The threaded cases are rebuilt where they taught the wrong move. Case A
  opens with a fake-invoice page that talks a finance analyst into pasting a
  PowerShell download cradle into the Run dialog, and records that the
  tripwire was met at the end of Alert and nobody paged, so it teaches what a
  missed tripwire costs. Case B uses reserved names, adds the extension, MCP
  and workspace-task inventory and the agent-command check, and scopes its
  suppression to a tuple. Case C's adversary-in-the-middle timeline is
  causally consistent (the replayed session is the one minted through the
  proxy after the click), the tripwire fires at the end of Alert, and identity
  containment runs in order: preserve, contain reversibly, verify, then the
  approved non-reversible steps.
- Replaced the universal absence claim in "Where ASSURED sits" with a
  narrower, inspectable contribution claim: ASSURED is one open, named,
  versioned operational workflow with explicit phase outputs and a
  close-or-escalate boundary.
  Prompted by: established frameworks already include triage at the
  program level, which the old claim denied.
- Corrected the AUSPICED record against the surviving October 2023 draft:
  the E stood for Enrichment, not Escalation, the precursor named no
  escalation or risk stage, and it never reached testing; the redesign
  table now maps all eight original parts.
  Prompted by: re-reading the original draft while writing the
  development page.
- Strengthened the validation roadmap: the scoring rubric will be frozen
  publicly before any pre/post assessment, and at least one scorer will
  come from outside the program.
  Prompted by: the conflict of interest the development page now states.
- Recast outcome wording in the README tagline and the introduction's
  framing callout as design intent, and adopted Sanders's own
  "vendor-agnostic" phrasing in the related-work map.

#### Site and engineering

- The site is organized by task. The header menu offers Start here, Method,
  Operate, Field reference, Teach and train, and About; the homepage groups
  the seven chapters by stage and shows each phase's question under its
  title. Attack chains, telemetry sources, tool families and the
  identity-persistence sweep sit under Field reference.
  Prompted by: the menu listed chapters only, so the operating, reference
  and teaching pages were hard to find from it.
- Pages merged, moved or retitled. The four detection-mechanism subpages
  (signature, anomaly, rule, behavioral) merged into "How detections work"
  (/docs/alert/detection-mechanisms/). Baseline comparison merged into
  Alert validation (anchors #baseline-comparison and
  #when-the-baseline-lies). Asset and user criticality moved from Alert to
  Scope (/docs/scope/criticality/). Retitled: "Reading any alert" (parsing),
  "Close or escalate: the criteria", "Escalation decision: Close or
  escalate", "How ASSURED compares" (positioning), "What a benign close
  teaches", "The priority matrix", "Transition to the Escalation
  decision", "Choosing tools", and C.L.E.A.R. as the core analyst
  vocabulary. Every removed URL redirects (with and without the trailing
  slash) in vercel.json, and the parsing and attack-chain pages keep their
  URLs.
- Expanded the README author history and linked the public provenance and
  evidence record; later trimmed the README bio to the author's role and
  the Block relationship (ASSURED is Block open source, not an official
  Block security standard), leaving the full history on the Development
  and evidence page.
- Front door and contributor docs brought in line with 1.2.0 doctrine: one
  project name ("ASSURED: a methodology for security event triage") across
  the README, CITATION.cff, and package.json; the README calls the Cursor
  case a benign true positive, compares ASSURED with NIST SP 800-61, SANS
  PICERL, and DAIR without the overclaim, shows each phase's anchor
  question, adds a "Using ASSURED" section, and drops emoji from headings.
  CONTRIBUTING.md documents every build gate, a writing style guide, and
  the conduct and governance routes; GOVERNANCE.md adds an appeal path,
  interim-maintainer succession, a patch-version policy, and the full
  release definition; MAINTAINERS.md is new. CITATION.cff's preferred
  citation now carries the version and release date.
- Methodology questions route to the Suggestion issue template (GitHub
  Discussions is not enabled); CODEOWNERS names the maintainer's actual
  account; the issue forms gain a site-version field and an assistive-tech
  field, and the pull request checklist covers typecheck, sources, the
  doctrine-change issue rule, the changelog, and screenshots.
- Site stack upgraded from Astro 5.18.1 to Astro 7.3.8 (Vite 8), with
  @astrojs/mdx 8. Markdown and MDX stay on the unified remark/rehype
  pipeline through @astrojs/markdown-remark, so heading anchors and every
  deep link are unchanged; `compressHTML` stays `true` rather than Astro 7's
  new whitespace-stripping default. Content-collection schemas import `z`
  from `astro/zod` (Zod 4).
  Prompted by: ten published Astro 5 advisories with no 5.x fix (see
  Security).
- Node.js pinned to 24 LTS: `package.json` engines `24.x`, a new `.nvmrc`,
  and CI reads the version from `.nvmrc`. The README and CONTRIBUTING.md
  prerequisites match, and CONTRIBUTING.md covers Node 25 and later, which
  no longer bundle Corepack.
  Prompted by: Node 20, the old engines floor, reached end of life on
  2026-04-30.
- pnpm 12.11.2 (from 10.11.1). pnpm settings moved from `package.json` to
  `pnpm-workspace.yaml`, which pnpm 11 and later require: the security
  overrides, a three-day `minimumReleaseAge` delay before a newly published
  version can resolve, and an explicit `allowBuilds` list for dependency
  install scripts.
- TypeScript 6 (from 5.9; `baseUrl` dropped from tsconfig.json),
  @types/node aligned to Node 24, and Biome 2.5.15.
- Header navigation follows the WAI-ARIA disclosure pattern: each section
  link is one Tab stop, and a separate chevron button opens its dropdown
  (Enter or Space; Escape closes it and returns focus). Reaching the page
  content from the top now takes about 25 Tab stops instead of 81.
  Prompted by: a keyboard walk-through that needed 81 Tab presses to reach
  the first paragraph.
- Collapsed Reveal sections open for printing and close again afterwards;
  browsers without JavaScript print them expanded through a
  `::details-content` rule.
- Search results no longer match tooltip definitions, breadcrumbs, or
  chapter navigation: those blocks are excluded from the Pagefind index.
- The Content-Security-Policy script hashes in `vercel.json` are
  regenerated for the Astro 7 output.
- The footer's "Content last reviewed" date is 2026-10-13.
- Accessibility target restated as WCAG 2.2 AA (CONTRIBUTING.md and the
  axe smoke tests). 2.4.11 Focus Not Obscured was checked by tabbing
  through the glossaries and chapter pages at desktop and phone widths,
  against the sticky header and the pinned glossary navs. One gap remains:
  on the B.A.D. glossary at desktop width, a citation link near the top of
  the window can take focus while fully under the pinned section nav.

### Deprecated

- "Break-glass rule" as the name of the escalation rule. It survives only
  as a former-name glossary entry and as anchor ids, so existing links keep
  working; use "escalation tripwire".

### Removed

- The separate detection-mechanism subpages, the baseline-comparison page
  and the Alert-chapter criticality page (merged or moved; see Changed).
- Personal-circumstance indicators from analyst-facing pages, handoffs and
  templates (see Breaking for adopters).
- The "never delegated, in any tooling generation" and "cannot close
  alerts" absolutes (replaced by the governed automation tier).

### Fixed

#### Methodology

- 761 corrections from a fresh check of every page, template and glossary
  entry against current primary sources (attack.mitre.org, NIST, EUR-Lex,
  eCFR, state statutes, SEC and CISA filings, vendor documentation, RFCs)
  as of 2026-10-06: 10 critical, 213 major, 464 minor and 74 nit.
  Prompted by: the footer still said the content was last reviewed in
  July 2026, while laws, products and ATT&CK had moved since.
- The ten critical corrections, each of which taught a move that would go
  wrong on a real queue: Case C's impossible session timeline; Case C's
  delayed escalation framed as the tripwire working; the criteria and the
  matrix disagreeing about what makes a case P1; an exercise key closing a
  privileged admin consent at Level 0; data leak and data breach glossary
  entries implying that accidental exposure is not a breach; the close rule
  contradicting the P2 clock; the GDPR 72-hour clock said to start at
  confirmation rather than awareness; California breach notice described as
  having no fixed clock (SB 446 now requires notice within 30 calendar days of
  discovery); Case B treating a valid signature as clearance for code running
  inside the signed host; and analyst-collected personal-circumstance
  indicators in insider cases.
- The other 751 corrections, by category:
  - decision doctrine, phase boundaries, verdict vocabulary and
    terminology consistency: 142;
  - technical artifacts and telemetry (detection, identity, cloud): 103;
  - overclaims, statistics and citations: 92;
  - threaded cases, worked examples and exercises: 86;
  - technology names and vendor status: 86;
  - regulatory and legal: 41;
  - MITRE ATT&CK techniques and tactics: 41;
  - threat actors and malware: 38;
  - quiz keys and exercise answers: 38;
  - standards and frameworks: 25;
  - glossary definitions (B.A.D. and C.L.E.A.R.): 23;
  - templates, site code, governance and build: 19;
  - AI-assisted triage: 8;
  - insider risk: 6;
  - the Documentation chapter: 3.
- Current references throughout: NIST SP 800-61r3 (April 2025) replaces
  the withdrawn r2; SANS SEC450's current title; DAIR's 2026 open book;
  California SB 446; GDPR awareness as the EDPB defines it; and renamed,
  acquired or retired products marked with their dated status and source.
- Fictional domains and IP addresses in case material use reserved names
  (`.example` domains, the RFC 5737 and RFC 3849 documentation ranges).
- Reading-time figures: a straight read of the chapters is about 9 hours;
  a careful first read of the whole site is about 10 to 14 hours.

#### Site and engineering

- The README version badge, stale at 1.1.0 since the 1.2.0 release.
- Leaving the C.L.E.A.R., B.A.D., or C.A.T. glossary through in-site
  navigation no longer leaves its keyboard handler attached to later pages.

### Security

- Re-assessed dependency advisories as of 2026-10-13. Ten GitHub advisories
  affected astro 5.18.1 and none had a 5.x fix, including five published
  after 1.2.0 (GHSA-4g3v-8h47-v7g6, GHSA-7pw4-f3q4-r2p2,
  GHSA-f48w-9m4c-m7f5, GHSA-376h-93r7-7g6f, and the critical
  GHSA-26w7-cxv4-gfx2, patched only in 7.2.8 and later). Each required
  request-time rendering, base-path routing on a server, or astro:assets
  image optimization, none of which this prerendered static build uses, so
  none was reachable on the live site. The Astro 7.3.8 upgrade removes them
  all.
- `pnpm audit` goes from 41 advisories (1 critical, 24 high, 12 moderate,
  4 low; astro, sharp, devalue, fast-uri, svgo, postcss, nanoid, js-yaml,
  smol-toml, esbuild, and others) to none. The `vite` override is removed
  because Astro 7 ships Vite 8; the js-yaml, mdast-util-to-hast, and
  smol-toml overrides remain as guards.
- SECURITY.md treats content-integrity problems (harmful commands in
  shipped templates, cited domains that changed hands) as security reports,
  links Block's safe-harbor terms and the governance escalation contact,
  and commits to acknowledgment within 5 business days.

## [1.2.0] - 2026-07-16

The assurance release: a full accuracy, accessibility, and release-assurance
pass across every chapter, the shipped templates, and the site, with each
fix pinned by a regression gate in the build.

### Breaking for adopters

Note added 2026-10-13: by the rules in GOVERNANCE.md, the doctrine changes
below would make this a major release. It shipped as 1.2.0 during the
pre-2.0 stabilization period and is not renumbered; from here on, doctrine
changes follow the major rule. Update runbooks, training, and tooling for:

- the two-axis verdict, which retires bare "false positive" as a closure
  label;
- the Risk, likelihood, and Escalation decision contract with three named
  overrides;
- insider escalation on act, asset, and impact regardless of HR context;
- the mandatory decision header in the event report and case metadata in
  the handoff packet.

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
- Set the canonical Vercel domain and added SEO metadata, structured data,
  server-side redirects, and site search.
- The favicon is the ASSURED puzzle mark on the site's slate tile instead of
  the Astro starter rocket, shipped at every size browsers ask for: SVG,
  multi-size ICO, Apple touch icon, and web-app manifest icons for Android
  home screens.

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
- Worked-example continuity: the two original threaded cases
  (finance-team phishing, Cursor IDE false positive) now carry consistent
  entities, timestamps, and verdicts through all seven chapters. (The third
  case, added in this release, was written to the same conventions.)
- The 404 page points lost visitors at the introduction and the quick
  reference instead of dead-ending, and tells search engines not to index it
  (Vercel serves the underlying /404.html file with a 200 status, which had
  left it indexable).

## [1.0.0] - 2026-05-15

Initial complete public release: seven chapters (Alert, Subject, Scope,
Uncover, Risk, Escalation, Documentation), each with concept pages, a worked
example, a quiz, and a transition; three glossaries (B.A.D., C.A.T.,
C.L.E.A.R.); two threaded cases; site search.

[Unreleased]: https://github.com/block/assured-methodology/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/block/assured-methodology/releases/tag/v1.2.0
[1.1.0]: https://github.com/block/assured-methodology/releases/tag/v1.1.0
[1.0.0]: https://github.com/block/assured-methodology/releases/tag/v1.0.0

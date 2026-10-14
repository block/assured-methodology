# Contributing to ASSURED

Thanks for helping improve the methodology. This project is a teaching
resource for security analysts; the bar for every contribution is the same
bar the content sets for itself: practical, evidence-based, and accurate
enough to survive review by a skeptical practitioner.

## What to contribute

The highest-value areas, in rough priority order:

1. **Technical accuracy**: MITRE technique mappings, regulatory citations,
   detection-mechanism descriptions. If something on the site is wrong,
   an issue with a citation is a great contribution on its own; use the
   *Content correction* issue template.
2. **Content refinement**: sharpen wording, fix factual drift, update tool
   references as the vendor landscape shifts.
3. **Case studies**: worked examples beyond the three threaded cases,
   in areas like container and Kubernetes intrusions, software supply
   chain, and ransomware precursors.
4. **Glossary entries**: current threat actors, recent campaigns, new SOC
   tooling.
5. **Quiz items**: application-grade questions that test methodology
   fluency on fresh scenarios, not acronym recall.

Claims need support. Support every claim with a source or technical
rationale; in teaching content, an unsupported assertion is a defect, not a
style choice.

## Getting set up

Requirements: Node.js 24 LTS (the version in `.nvmrc`; `package.json`
engines pins `24.x`, and CI reads `.nvmrc`) and [pnpm](https://pnpm.io/). The
exact pnpm version is pinned in `package.json`'s `packageManager` field. On
Node 24, run `corepack enable` and it is picked up automatically; Node 25 and
later no longer bundle Corepack, so install it first (`npm i -g corepack`) or
install pnpm directly.

```bash
nvm use         # or fnm/volta: reads .nvmrc
corepack enable
pnpm install
pnpm dev        # local dev server
pnpm build      # full production build: every gate below, astro, pagefind
pnpm preview    # serve the built site (search only works on a built site)
```

pnpm settings (security overrides, the supply-chain release-age delay, and
which dependency install scripts may run) live in `pnpm-workspace.yaml`, not
in `package.json`.

## What the build checks (and how to fix each failure)

`pnpm build` runs these gates in order and stops at the first failure. CI
also runs `pnpm typecheck` (`astro check`) and `pnpm lint`.

| Gate | Script | When it fails |
|---|---|---|
| Glossary registry | `extract-glossary.mjs --check` | `src/data/glossary.ts` is out of date: run `pnpm glossary` (see below). |
| Tooltip resolution | `check-defineterms.mjs` | A `<DefineTerm>` names a term that is not in the registry: fix the spelling or add the term to a glossary. |
| Content contracts | `check-content-contracts.mjs` | A pinned sentence or fact changed, or a site-wide prose rule broke (an em dash, a bold label followed by a comma, a retired term, a `techVerified` stamp over a year old). The failure names the contract id; read its `why` in the script before changing either the sentence or the contract. |
| Engineering contracts | `check-engineering-contracts.mjs` | A component lost a behavior the site relies on (keyboard, print, no-JS, search-index), an animation that starts invisible has no reduced-motion end state, or an MDX style uses a raw color. Read the contract's `why`. |
| Contrast | `check-contrast.mjs` | A color pair falls below WCAG 2.2 AA. Use the design tokens rather than raw colors. |
| Reading order | `check-reading-order.mjs` | A new page is missing from `readingOrder` in `src/data/navigation.ts` (add it there or to the script's exempt list), a page's end-of-page call to action no longer points at the next page in `readingOrder`, or a chapter transition sits after its quiz. |
| Quiz balance | `check-quiz-balance.mjs` | A quiz's answer key clusters in one position, or the key is the longest option too often: reorder the options (do not reword the values) until the distribution passes. |
| Quiz CSV | `export-quiz-csv.mjs --check` | `public/templates/assured-quiz-items.csv` no longer matches the chapter quizzes: run `pnpm quiz:csv`. |
| Reserved names | `check-reserved-names.mjs` | A case narrative, exercise or template uses a registrable domain or a public IP: use `.example`/`.test` names (RFC 2606) and the RFC 5737 / RFC 3849 documentation ranges. |
| ATT&CK IDs | `check-attack-ids.mjs` | An ATT&CK ID does not exist in the pinned Enterprise bundle, is revoked or deprecated outside a plainly historical sentence, or the name beside it does not match. Locally it prints SKIP unless `ATTACK_STIX_PATH` points at `enterprise-attack.json`; CI pins v19.2. |
| Raw headings | `check-raw-headings.mjs` | A JSX `<h2 id=...>` is used in MDX: write it as a markdown `##` heading so it reaches the TOC and gets an anchor. |
| Template schemas | `check-template-schemas.mjs` | A template in `public/templates`, its JSON Schema in `public/templates/schema`, or the vocabulary in `src/data/priority-matrix.ts` disagree: change all three together. |
| Acronym index | `build-acronyms.mjs --check` | `src/data/acronyms.ts` is stale: run `pnpm acronyms`. |
| Template stamp | `stamp-templates.mjs` (after `astro build`) | Writes the Template version line into `dist/templates`; fails only if a template lost its license comment. |
| Links | `check-links.mjs` | A link is broken, or an internal link lacks its trailing slash: internal links end in `/`. |
| CSP | `check-csp.mjs` | An inline script changed, so its hash no longer matches `vercel.json`: run `node scripts/check-csp.mjs --write`. |

Outside the build, `pnpm check:print` (desk card page count), `pnpm test:gates` (gate unit tests) and `pnpm test:e2e` (Playwright and axe) run in CI. [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) describes each gate and CI job in full.

`pnpm check:determinism` builds twice and confirms the output is
byte-identical; run it when you touch build configuration or anything that
renders IDs.

## The glossary pipeline

The hover tooltips (`<DefineTerm>`) resolve against
`src/data/glossary.ts`, which is **generated**; do not edit it by hand.
The sources of truth are the three glossary pages:

- `src/content/docs/glossaries/bad.mdx`: B.A.D. (Behaviors, Adversaries,
  Damage: attack techniques, threat actors, campaigns, malware families)
- `src/content/docs/glossaries/cat.mdx`: C.A.T. (Cybersecurity Applications
  & Tools: named vendor products mapped to the category they belong to)
- `src/content/docs/glossaries/clear.mdx`: C.L.E.A.R. (Common Lexicon of
  Essential Analyst References: the core triage vocabulary)

After editing any of them, regenerate and verify:

```bash
pnpm glossary          # regenerate src/data/glossary.ts
pnpm glossary:check    # assert the registry matches the MDX
pnpm check:terms       # assert every <DefineTerm> on the site resolves
```

CI runs both checks on every pull request, and `pnpm build` runs them too.

## Writing for ASSURED

The corpus follows house conventions; contributions that drift from them
usually come back for revision.

- **Voice**: second person for procedure ("pull the process tree"), plain
  declaratives for concepts. US spelling.
- **Punctuation**: use a colon, parentheses, or a period rather than an em
  dash, and a colon after a bold label (`**Label**: text`, not
  `**Label**, text`). The content-contract gate fails on either.
- **Terms**: wrap a glossary term in `<DefineTerm term="..." />` on its first
  use on a page, not on every use.
- **Headings**: one h1 per page (from frontmatter); h3 sits under h2, never
  directly under h1.
- **No emoji icons** in new markup; components use stroke SVG icons.
- **Case facts are canonical**: the four cases carry fixed entities,
  timestamps, and verdicts, held in `src/data/cases.ts` and pinned by
  content contracts. Check that file and the chapter examples before
  editing case details.
- **Accessibility**: the target is WCAG 2.2 AA. Interactive components must
  work by keyboard and without JavaScript, and must print legibly.

Components available in MDX (`src/components/assured/`):

- `Callout`: an aside (`variant` info, warn, danger, puzzle, takeaway).
- `KeyTakeaway`: the closing summary of a section.
- `Reveal`: a collapsible block for examples or deep dives (`summary`
  required); it opens automatically for print.
- `DefineTerm`: an inline glossary tooltip.
- `FlipCard`: a recall prompt with the answer on the back.
- `CaseStudy`: a titled scenario block.
- `StrengthsLimitations`: a two-column strengths and limitations list.
- `ExampleStepper`, `Quiz` / `QuizItem`: the worked-example and quiz pages.

## Before you open a PR

```bash
pnpm lint       # biome
pnpm typecheck  # astro check
pnpm build      # must pass (runs every gate listed above)
```

Keep PRs scoped to one concern. For content changes, note your sources in
the PR description; for regulatory or vendor claims, link the primary
source (the CFR section, the MITRE technique page, the vendor doc).

## Licensing of contributions

The repository is dual-licensed, and your contribution lands under the
license that governs what you touched:

- **Code** (components, layouts, styles, scripts, config): [MIT](LICENSE)
- **Content** (`src/content/` and `public/templates/`): [CC BY 4.0](LICENSE-CONTENT)

By submitting a pull request you agree to license your contribution under
the corresponding license. Block's organization-wide
[contribution guidelines](https://github.com/block/.github/blob/main/CONTRIBUTING.md)
also apply, including any contributor license agreement they require; the
maintainer will tell you on your pull request if one is needed.

## Code of conduct

Everyone participating in this project agrees to the
[Code of Conduct](CODE_OF_CONDUCT.md). Concerns about the maintainer, or
anything you would rather not raise with the maintainer, can go to the
Block Open Source Governance Committee at
[open-source-governance@block.xyz](mailto:open-source-governance@block.xyz).

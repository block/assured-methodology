# Developing the ASSURED site

This page covers the build gates, the tests, the CI jobs and dependency upkeep. For what to contribute and how to write for the site, see [CONTRIBUTING.md](../CONTRIBUTING.md). The long-form history of how the method was developed is in [RESEARCH-LOG.md](RESEARCH-LOG.md).

## Prerequisites

- Node 24 (the major in `.nvmrc`; `package.json` `engines` says the same).
- pnpm, at the version in the `packageManager` field of `package.json`.

```sh
pnpm install --frozen-lockfile
pnpm dev        # local server with hot reload
pnpm build      # every pre-build gate, astro build, link check, pagefind, CSP check
pnpm preview    # serve the built dist/
```

## Fast gates

These run in `pnpm build` before `astro build`, in this order, and stop at the first failure. Each one also has its own script, so you can run it alone.

| Gate | Script | Run alone | Fails when |
|---|---|---|---|
| Glossary registry | `extract-glossary.mjs --check` | `pnpm glossary:check` | `src/data/glossary.ts` no longer matches the glossary MDX. Run `pnpm glossary`. |
| Tooltip resolution | `check-defineterms.mjs` | `pnpm check:terms` | A `<DefineTerm>` names a term the registry does not have. |
| Content and engineering contracts | `check-content-contracts.mjs`, `check-engineering-contracts.mjs` | `pnpm check:contracts` | A pinned fact or behavior changed, or a site-wide rule broke. Read the contract's `why` first. See [Site-wide rules](#site-wide-rules). |
| Contrast | `check-contrast.mjs` | `pnpm check:contrast` | A guarded color pair falls below WCAG 2.2 AA. |
| Reading order | `check-reading-order.mjs` | `pnpm check:reading-order` | A page is missing from `readingOrder` in `src/data/navigation.ts`, an end-of-page call to action does not point at the next page in `readingOrder`, or a chapter transition comes after its quiz. |
| Quiz balance | `check-quiz-balance.mjs` | `pnpm check:quiz` | See [Quiz balance](#quiz-balance). |
| Quiz CSV | `export-quiz-csv.mjs --check` | `pnpm quiz:csv` (regenerates) | `public/templates/assured-quiz-items.csv` no longer matches the chapter quizzes. |
| Reserved names | `check-reserved-names.mjs` | `pnpm check:reserved-names` | See [Reserved names](#reserved-names). |
| ATT&CK IDs | `check-attack-ids.mjs` | `pnpm check:attack-ids` | See [ATT&CK IDs](#attck-ids). Skips without a local bundle. |
| Raw headings | `check-raw-headings.mjs` | `pnpm check:headings` | A docs page gains a JSX `<h2>`, which drops out of the page TOC. Its `BASELINE` only shrinks. |
| Template schemas | `check-template-schemas.mjs` | `pnpm check:templates` | A template, its JSON Schema and `src/data/priority-matrix.ts` disagree. |
| Acronym index | `build-acronyms.mjs --check` | `pnpm check:acronyms` | `src/data/acronyms.ts` is stale. Run `pnpm acronyms`. |

After `astro build`, `stamp-templates.mjs` writes the template version into `dist/templates`, `check-links.mjs` checks every internal link and anchor in `dist/`, and `check-csp.mjs` checks the inline-script hashes in `vercel.json`. `pnpm check:determinism` builds twice and compares the output; it is not in the build chain because it doubles build time.

### Site-wide rules

`check-content-contracts.mjs` also runs these scans on every build:

- **Prose punctuation.** No em dash (U+2014), and no bold label followed by a comma at the start of a list item or paragraph (`- **Label**, text`, `<li><strong>Label</strong>, text`), in `src/content/docs/**/*.mdx`, `public/templates/**/*.md`, `src/pages/*.astro` and `README.md`. Code fences, inline code and comments are skipped. Use a colon.
- **Verification age.** Every page whose frontmatter carries `techVerified` warns when the stamp is more than 180 days old and fails at 365. Re-verify the page's technology claims and move the stamp (see the currency review in [GOVERNANCE.md](../GOVERNANCE.md)).
- **README term count.** The README's glossary figure ("about 1,000 terms") must match the number of entries in `src/data/glossary.ts`: "about N" within 5%, "nearly N" up to 10% below N, "over N" up to 20% above it.
- **Retired vocabulary**, the verdict enums, the case facts and the vendor register, as described in the script's header.

`check-engineering-contracts.mjs` adds two style scans:

- **Reduced motion.** In `src/styles/pages/*.css`, an animated element under an `*-anim` class whose base rule sets `opacity: 0` needs a visible end state in the file's `@media (prefers-reduced-motion: reduce)` block; otherwise reduced-motion users see nothing. `RM_BASELINE` lists the gaps that predate the gate; it only shrinks.
- **Raw colors in MDX.** A six-digit hex or `rgb()`/`rgba()` value in a `color`, `background` or `border-color` declaration in an MDX `<style>` block or `style` attribute fails. The `.pillar__num` and `.intro-phase__num` rules that `check-contrast.mjs` measures are allowed; `RAW_COLOR_BASELINE` lists pages that predate the gate. The count of raw hex values in `src/styles/pages/*.css` is printed as an advisory.

### Quiz balance

`scripts/check-quiz-balance.mjs` reads every `<Quiz>` and `<QuizItem>` under `src/content/docs`: the seven chapter quizzes, the glossary self-checks and the in-page quizzes. It fails when:

- an item's `answer` is not one of its option values, option values repeat, an item has fewer than 3 or more than 5 options, or the prompt or explanation is empty;
- one answer position (A, B, C, D) holds more than 35% of the keys, across the chapter quizzes combined or within any single quiz of 8 or more items;
- the key is the strictly longest option in more than 40% of items, on the same two scopes.

Quizzes under 8 items are listed in the output but not position-gated: at five items, one key swings the share by 20 points. To fix a failure, reorder options rather than rename option values, so explanations that refer to an option by content stay right. `--json` prints the full distribution.

### Reserved names

`scripts/check-reserved-names.mjs` scans the case material: every `example.mdx`, `transition.mdx` and `quiz.mdx`, `exercises.mdx`, `fast-path.mdx` and everything under `public/templates/`. It refangs defanged indicators (`[.]`, `hxxp`) and then fails on:

- a domain on a real TLD, unless it is `example.com`, `example.net` or `example.org` (RFC 2606), a subdomain of one, or on the script's `DOMAIN_ALLOWLIST`;
- an IPv4 address outside the documentation ranges (RFC 5737: `192.0.2.0/24`, `198.51.100.0/24`, `203.0.113.0/24`) and the private and special-use ranges;
- an IPv6 address outside `2001:db8::/32` (RFC 3849) and the local ranges.

Names under `.example`, `.test`, `.invalid`, `.localhost`, `.local` and `.internal` always pass. Link targets (`href="..."`, Markdown `](...)`) are treated as references and skipped.

Invented infrastructure takes a reserved name. Add a real domain to `DOMAIN_ALLOWLIST` only when the real destination is the point of the case (Case B's vendor endpoints, for example), with a comment saying so. `--all` runs the same scan over every page as an advisory survey.

### ATT&CK IDs

`scripts/check-attack-ids.mjs` finds every technique ID (`T1234`, `T1234.001`), tactic ID (`TA0001`) and `attack.mitre.org` technique or tactic URL in the content and templates, and checks each against a pinned Enterprise ATT&CK STIX bundle. It fails when an ID does not exist, is revoked or deprecated, or sits next to a name that does not match the release. It reads names in these shapes: `T1528 (Steal Application Access Token)`, `T1136.003, Create Account: Cloud Account`, `Data Encrypted for Impact (T1486)`, `T1685 Disable or Modify Tools`, and a name in the table cell before the ID. Only Title Case runs count as names, so prose after an ID is not read as one. A sub-technique matches as `Parent: Sub` or as `Sub` alone.

Two kinds of mismatch are allowed and printed as notes:

- **Historical mentions.** A revoked ID or old name in a sentence that says it is historical ("formerly", "replaced", "renamed", "split", "stale", "old").
- **Deliberate defects.** Entries on the script's `INTENTIONAL` list, such as the stale tactic label the AI verification exercise plants for the reader to catch.

IDs labelled `(Mobile)` or `(ICS)` are skipped, because the bundle is Enterprise only.

The bundle is not in the repository. Without `ATTACK_STIX_PATH` the script prints `SKIP` and exits 0, so offline builds still work. CI fetches the pinned bundle in its own job (see below). To run the check locally, fetch the same file:

```sh
mkdir -p ~/.cache/attack
curl --fail --location --output ~/.cache/attack/enterprise-attack-19.2.json \
  https://raw.githubusercontent.com/mitre-attack/attack-stix-data/6cda5ad8462c79e14fbb872f4e09059b18e0cfc4/enterprise-attack/enterprise-attack-19.2.json
shasum -a 256 ~/.cache/attack/enterprise-attack-19.2.json

ATTACK_STIX_PATH=~/.cache/attack/enterprise-attack-19.2.json pnpm check:attack-ids
```

The URL is pinned to the commit behind the `v19.2` tag of [mitre-attack/attack-stix-data](https://github.com/mitre-attack/attack-stix-data), so its content cannot change. The file is about 54 MB. MITRE also publishes each release under `enterprise-attack/enterprise-attack-<version>.json` on the default branch, and the unversioned `enterprise-attack/enterprise-attack.json` always tracks the latest release. Do not use the unversioned file for the gate.

Environment variables:

| Variable | Meaning |
|---|---|
| `ATTACK_STIX_PATH` | Path to the bundle. Required to run the check. |
| `ATTACK_VERSION` | Expected release, `19` (the default) or `19.2`. The script reads `x_mitre_version` from the bundle's collection object and exits 2 on a mismatch. |
| `ATTACK_STIX_SHA256` | Optional. Exits 2 if the file's SHA-256 differs. |

`--list` prints every ID and the name the parser read next to it, without a bundle. Use it to review what the gate will check.

**Moving to a new ATT&CK release.** The site records the version every mapping was made against, so a release bump is a content change, not only a pin change:

1. Read MITRE's release notes and the crosswalk for the new version.
2. Fetch the new versioned bundle and run the check with `ATTACK_VERSION` set to it. Fix every ID and name it reports, and update the "Enterprise v19" mentions the content uses as its version record.
3. Update `ATTACK_VERSION` and `ATTACK_STIX_URL` in the `attack-ids` job of `.github/workflows/ci.yml` (pin the URL to the commit behind the new tag: `gh api repos/mitre-attack/attack-stix-data/git/ref/tags/<tag>`, then dereference the tag object), and the default in the script.

## Tests

### Gate unit tests

```sh
pnpm test:gates
```

`tests/scripts/*.test.mjs` runs on `node:test` with no build, browser or network. It covers the three gates above and the small MDX tag reader they share (`scripts/lib/jsx-tags.mjs`). The ATT&CK tests use a hand-written mini bundle in `tests/fixtures/attack-mini.json`.

### Browser smoke and accessibility tests

`tests/smoke.spec.ts` runs Playwright with `@axe-core/playwright` against one page per template type: the home page, the introduction, a chapter index, a worked example, a chapter quiz, a glossary and the desk reference. Each page must return 200, have one `<h1>` and a `<main id="main">`, log no console errors, and have no serious or critical axe violations at WCAG 2.2 AA (moderate and minor ones are attached to the test as annotations). Four behavior tests cover the skip link, a header navigation group (Enter opens it, Escape closes it and returns focus to its button), the search dialog (open, then Escape) and the quiz (a right answer and a wrong one).

The tests run against the built site through `astro preview`, so build first. Browsers are a separate one-time download:

```sh
pnpm exec playwright install chromium   # add --with-deps on Linux
pnpm build
pnpm test:e2e
```

`playwright.config.ts` starts `astro preview` on `127.0.0.1:4321` (set `PREVIEW_PORT` to change it) and reuses a preview server that is already running. Failure traces land in `test-results/`.

## CI

`.github/workflows/ci.yml` runs on every pull request and on pushes to `main`:

| Job | What it does |
|---|---|
| `verify` | Lint, type check, every fast gate as a labelled step, gate unit tests, and `pnpm build` (which runs the link check). Uploads `dist/` for the browser job. |
| `attack-ids` | Fetches the pinned ATT&CK bundle and runs `check-attack-ids.mjs` against it. |
| `browser` | Downloads `dist/`, installs Chromium, runs the Playwright and axe tests, the desk-card print check (`pnpm check:print`) and HTML validation of the built pages (`html-validate`, configured in `.htmlvalidate.json`). The print check and HTML validation are advisory (`continue-on-error`) until the desk card fits two pages and a clean validation baseline is recorded; then drop the flag. Uploads traces when a test fails. |
| `determinism` | On pushes to `main` only: `pnpm run check:determinism`, which builds twice and compares the output byte for byte. |
| `dependency-review` | On pull requests only: `actions/dependency-review-action` flags newly added dependencies with known vulnerabilities. |

`.github/workflows/external-links.yml` checks every external URL in the content, templates and top-level Markdown files with [lychee](https://github.com/lycheeverse/lychee) each Monday, and on demand from the Actions tab. It never fails a build. While links are broken it keeps one open issue titled "External link report" up to date, and it closes that issue when every link resolves again. Reserved example names and the site's own URL are excluded, and HTTP 403 and 429 count as reachable, because several standards bodies and vendors refuse automated clients.

Every third-party action is pinned to a full commit SHA with the release tag in a comment. Dependabot proposes updates to both.

## Dependency majors

Dependabot opens minor and patch updates as one weekly group and majors as separate pull requests. It cannot notice a major it never proposes: when a peer-dependency range blocks the upgrade, no pull request appears and the site quietly falls behind (Astro 5 sat unsupported this way). So once a quarter, alongside the currency review in [GOVERNANCE.md](../GOVERNANCE.md), the maintainer listed in [MAINTAINERS.md](../MAINTAINERS.md):

1. Runs `pnpm outdated --long` and reads the majors column.
2. Checks the release pages for Astro, Node.js LTS (the `.nvmrc` major), pnpm and TypeScript, including each one's support window.
3. Opens an upgrade issue for every major the site is behind, with what blocks it.
4. Records the review date in `CHANGELOG.md` under Unreleased.

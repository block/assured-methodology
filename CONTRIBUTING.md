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
   in areas like cloud-native intrusions and supply chain.
4. **Glossary entries**: current threat actors, recent campaigns, new SOC
   tooling.
5. **Quiz items**: application-grade questions that test methodology
   fluency on fresh scenarios, not acronym recall.

Claims need support. The content teaches; unsupported assertions are
defects, not style choices.

## Getting set up

Requirements: Node.js 20+ and [pnpm](https://pnpm.io/) (the exact version is
pinned in `package.json`'s `packageManager` field; `corepack enable` picks it
up automatically).

```bash
pnpm install
pnpm dev        # local dev server
pnpm build      # full production build: glossary checks + astro + pagefind
pnpm preview    # serve the built site (search only works on a built site)
```

## The glossary pipeline

The hover tooltips (`<DefineTerm>`) resolve against
`src/data/glossary.ts`, which is **generated**; do not edit it by hand.
The sources of truth are the three glossary pages:

- `src/content/docs/glossaries/bad.mdx` (behaviors, actors, campaigns)
- `src/content/docs/glossaries/cat.mdx` (tool categories)
- `src/content/docs/glossaries/clear.mdx` (core terms)

After editing any of them, regenerate and verify:

```bash
pnpm glossary          # regenerate src/data/glossary.ts
pnpm glossary:check    # assert the registry matches the MDX
pnpm check:terms       # assert every <DefineTerm> on the site resolves
```

CI runs both checks on every pull request, and `pnpm build` runs them too.

## Before you open a PR

```bash
pnpm lint       # biome
pnpm build      # must pass (includes the glossary and tooltip checks)
```

Keep PRs scoped to one concern. For content changes, note your sources in
the PR description; for regulatory or vendor claims, link the primary
source (the CFR section, the MITRE technique page, the vendor doc).

## Licensing of contributions

The repository is dual-licensed, and your contribution lands under the
license that governs what you touched:

- **Code** (components, layouts, styles, scripts, config): [MIT](LICENSE)
- **Content** (`src/content/`): [CC BY 4.0](LICENSE-CONTENT)

By submitting a pull request you agree to license your contribution under
the corresponding license.

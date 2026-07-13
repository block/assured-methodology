# ASSURED Cybersecurity Methodology

> **A structured, repeatable methodology for security analysts to triage, investigate, and document events with clarity, context, and confidence.**

[![Code License: MIT](https://img.shields.io/badge/Code-MIT-yellow.svg)](LICENSE)
[![Content License: CC BY 4.0](https://img.shields.io/badge/Content-CC%20BY%204.0-lightgrey.svg)](LICENSE-CONTENT)
[![Documentation](https://img.shields.io/badge/Documentation-Live-blue.svg)](https://assured-methodology.vercel.app)
[![Contributors Welcome](https://img.shields.io/badge/Contributors-Welcome-green.svg)](#-contributing)

**📖 Live site: [assured-methodology.vercel.app](https://assured-methodology.vercel.app)**

## 🔍 What is ASSURED?

ASSURED is a methodology for **security event triage** — the work between an alert firing and the decision to close it or escalate it to incident response. IR frameworks like NIST 800-61 and SANS PICERL describe what to do once you already know what you are looking at; ASSURED structures the work before that, which most analysts otherwise learn informally on the job.

It is written as a teachable course: seven chapters, each with concept pages, a worked example, a quiz, and a transition into the next phase.

## 📋 The Framework

| Phase | Chapter | What it covers |
|-------|---------|----------------|
| **A** | Alert | Detection mechanisms (signature, anomaly, rule, behavioral), validation, alert parsing |
| **S** | Subject | Entity identification: four dimensions, entity types, behavioral framework, insider analysis |
| **S** | Scope | Investigation boundaries: regulatory, time, entity, infrastructure |
| **U** | Uncover | Evidence gathering: data sources, threat intelligence, MITRE ATT&CK, tooling |
| **R** | Risk | Impact × likelihood assessment and the false-positive-as-finding doctrine |
| **E** | Escalation | Criteria, protocols, triage-vs-IR boundary, the 9-section handoff packet |
| **D** | Documentation | Standards, templates, pitfalls, closure and downstream uses |

Two threaded cases run through every chapter's worked example: a finance-team phishing intrusion that escalates to IR, and a Cursor IDE false positive that closes at triage. The same methodology produces both verdicts.

Three themed glossaries support the chapters: **B.A.D.** (threat actors, campaigns, malware), **C.A.T.** (vendor and platform vocabulary), and **C.L.E.A.R.** (the analyst lexicon) — around 670 terms, surfaced inline via hover tooltips.

## 🚀 Getting Started

Prerequisites: Node.js 20.3+ (or 22+) and [pnpm](https://pnpm.io/).

```bash
git clone https://github.com/block/assured-methodology.git
cd assured-methodology
pnpm install
pnpm dev        # develop at http://localhost:4321
pnpm build      # production build + Pagefind search index
pnpm preview    # serve the production build (required for search)
```

## 📁 Project Structure

```
src/
├── content/docs/        # All methodology content (MDX): intro, 7 chapters, 3 glossaries
├── components/assured/  # Teaching components (ChapterHero, FlipCard, ExampleStepper,
│                          DefineTerm, PillNav, Quiz, Callout, ...)
├── data/glossary.ts     # Term registry powering DefineTerm tooltips
├── layouts/             # BaseLayout, ContentPageLayout
├── pages/               # index, 404, docs/[...slug]
└── styles/              # global.css, assured.css, glossary.css, breadcrumbs.css
```

**Stack:** [Astro 5](https://astro.build/) + MDX, [Tailwind CSS 4](https://tailwindcss.com/), [Pagefind](https://pagefind.app/) client-side search (⌘K), TypeScript, [Biome](https://biomejs.dev/).

## 🤝 Contributing

Contributions are welcome. Fork, branch, make your change, verify with `pnpm build && pnpm preview`, and open a pull request. High-value areas:

- **Technical accuracy** — MITRE technique mappings, regulatory citations, detection-mechanism descriptions
- **Content refinement** — sharpen wording, fix factual drift, update tool references as the vendor landscape shifts
- **Case studies** — worked examples beyond the two threaded cases (cloud-native intrusions, identity-provider abuse, supply chain)
- **Glossary entries** — current threat actors, recent campaigns, new SOC tooling
- **Quiz items** — application-grade questions that test methodology fluency on fresh scenarios

Keep the tone practical and evidence-based, and support claims with technical rationale — the content teaches; unsupported assertions are defects.

## 🌐 Deployment

The site deploys on **Vercel** at [assured-methodology.vercel.app](https://assured-methodology.vercel.app), building automatically from `main`. `vercel.json` supplies response headers and trailing-slash behavior; `astro.config.ts` sets the canonical `site` URL. The output is fully static and can be served from any web server.

## 📄 License

This repository uses a dual license:

- **Code** — components, layouts, styles, scripts, and build configuration — is licensed under the [MIT License](LICENSE).
- **Content** — the methodology text under `src/content/` (chapters, worked examples, quizzes, and glossaries) — is licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](LICENSE-CONTENT).

## 👨‍💻 About the Author

**Timothy Zilber** is a security engineer specializing in event triage and incident response. ASSURED grew out of his experience mentoring analysts through a workplace lateral-development program: teaching event triage exposed the lack of a clear, repeatable methodology for it — existing frameworks covered incident response at a high level but not the alert-by-alert analysis work that precedes it. ASSURED is the structured method that came out of years of iterating on that training, shared here so the gap he had to cross informally is easier for the next analyst.

- 💼 **LinkedIn**: [timothy-zilber](https://linkedin.com/in/timothy-zilber)
- 📧 **Email**: [tzilber@block.xyz](mailto:tzilber@block.xyz)

## 📞 Support

- **Content or technical issues**: open a GitHub issue
- **Methodology questions**: use GitHub Discussions
- **Collaboration**: contact the author directly

## 🔗 Related Resources

- [MITRE ATT&CK](https://attack.mitre.org/)
- [NIST SP 800-61 (Incident Response)](https://csrc.nist.gov/pubs/sp/800/61/r3/final)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [CIS Controls](https://www.cisecurity.org/controls/)

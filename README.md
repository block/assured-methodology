# ASSURED Cybersecurity Methodology

> **A structured, repeatable methodology for security analysts to triage, investigate, and document events with clarity, context, and confidence.**

[![Version](https://img.shields.io/badge/Version-1.1.0-blue.svg)](CHANGELOG.md)
[![Code License: MIT](https://img.shields.io/badge/Code-MIT-yellow.svg)](LICENSE)
[![Content License: CC BY 4.0](https://img.shields.io/badge/Content-CC%20BY%204.0-lightgrey.svg)](LICENSE-CONTENT)
[![Documentation](https://img.shields.io/badge/Documentation-Live-blue.svg)](https://assured-methodology.vercel.app)
[![Contributors Welcome](https://img.shields.io/badge/Contributors-Welcome-green.svg)](#-contributing)

**📖 Live site: [assured-methodology.vercel.app](https://assured-methodology.vercel.app)**

## 🔍 What is ASSURED?

ASSURED is a methodology for **security event triage**: the work between an alert firing and the decision to close it or escalate it to incident response. IR frameworks like NIST 800-61 and SANS PICERL describe what to do once you already know what you are looking at; ASSURED structures the work before that, which most analysts otherwise learn informally on the job.

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

Three threaded cases run through every chapter's worked example: a finance-team phishing intrusion that escalates to IR, a Cursor IDE false positive that closes at triage, and a SaaS-tenant token theft with no endpoint evidence that escalates mid-investigation. The same methodology produces all three verdicts.

Three themed glossaries support the chapters: **B.A.D.** (threat actors, campaigns, malware), **C.A.T.** (vendor and platform vocabulary), and **C.L.E.A.R.** (the analyst lexicon). They total around 670 terms, surfaced inline via hover tooltips.

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

Contributions are welcome. Fork, branch, make your change, verify with `pnpm build && pnpm preview`, and open a pull request; [CONTRIBUTING.md](CONTRIBUTING.md) has the full setup and the glossary-regeneration workflow. High-value areas:

- **Technical accuracy**: MITRE technique mappings, regulatory citations, detection-mechanism descriptions
- **Content refinement**: sharpen wording, fix factual drift, update tool references as the vendor landscape shifts
- **Case studies**: worked examples beyond the three threaded cases (container and Kubernetes intrusions, supply chain, ransomware)
- **Glossary entries**: current threat actors, recent campaigns, new SOC tooling
- **Quiz items**: application-grade questions that test methodology fluency on fresh scenarios

Keep the tone practical and evidence-based, and support claims with technical rationale: the content teaches; unsupported assertions are defects.

## 🌐 Deployment

The site deploys on **Vercel** at [assured-methodology.vercel.app](https://assured-methodology.vercel.app), building automatically from `main`. `vercel.json` supplies response headers and trailing-slash behavior; `astro.config.ts` sets the canonical `site` URL. The output is fully static and can be served from any web server.

## 📄 License

This repository uses a dual license:

- **Code** (components, layouts, styles, scripts, and build configuration) is licensed under the [MIT License](LICENSE).
- **Content**, the methodology text under `src/content/` (chapters, worked examples, quizzes, and glossaries), is licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](LICENSE-CONTENT).

## 📌 Versioning & Citation

The methodology is versioned: the current version is stamped in the site footer, releases are recorded in [CHANGELOG.md](CHANGELOG.md), and the bump rules (what counts as a major vs. minor change) live in [GOVERNANCE.md](GOVERNANCE.md). To cite ASSURED in training material, research, or documentation, use [CITATION.cff](CITATION.cff) (GitHub renders it as APA/BibTeX under "Cite this repository").

## 🧭 Development and evidence

The public [Development and evidence](https://assured-methodology.vercel.app/docs/development/) page records the framework's provenance: the author's path into event triage, the AUSPICED precursor and why it was replaced, the redesign into ASSURED, its use in a workplace lateral-development program, and the limits of the evidence available today. ASSURED is practice-derived and in active use; it has not yet been evaluated through a controlled or comparative study.

## 👨‍💻 About the Author

**Timothy Zilber** is a security engineer specializing in event triage and incident response. After leaving the Army, he moved through IT support, network engineering in support of the Defense Information Systems Agency, and physical security systems administration before entering security operations through mentorship and an hour-a-day lateral-work arrangement. He later created a formal Lateral Work Program to make that kind of supervised opportunity available to others.

ASSURED began during parental leave after the birth of his second child, while he was comparing incident-response literature with the alert-by-alert work of event triage. Its first form, AUSPICED, did not hold up as a complete workflow and was replaced by the seven-phase ASSURED structure. Timothy now teaches ASSURED through the Lateral Work Program and maintains it as an open practitioner methodology.

- 💼 **LinkedIn**: [timothy-zilber](https://linkedin.com/in/timothy-zilber)
- 📧 **Email**: [tzilber@block.xyz](mailto:tzilber@block.xyz)

## 📞 Support

- **Content or technical issues**: [open a GitHub issue](https://github.com/block/assured-methodology/issues/new/choose)
- **Methodology questions**: use [GitHub Discussions](https://github.com/block/assured-methodology/discussions)
- **Collaboration**: contact the author directly

## 🔗 Related Resources

- [MITRE ATT&CK](https://attack.mitre.org/)
- [NIST SP 800-61 (Incident Response)](https://csrc.nist.gov/pubs/sp/800/61/r3/final)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [CIS Controls](https://www.cisecurity.org/controls/)

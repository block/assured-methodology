# ASSURED Cybersecurity Methodology

> **A comprehensive, scalable framework for security analysts to triage, investigate, and document events with clarity, context, and confidence.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Documentation](https://img.shields.io/badge/Documentation-Live-blue.svg)](#)
[![Contributors Welcome](https://img.shields.io/badge/Contributors-Welcome-green.svg)](#contributing)

## 🔍 What is ASSURED?

The ASSURED methodology is a structured, systematic approach to cybersecurity event triage and investigation designed for modern security operations centers (SOCs). Built by practitioners for practitioners, it provides a comprehensive framework that transforms raw security alerts into actionable intelligence through systematic analysis, validation, and documentation processes.

### Core Philosophy

ASSURED recognizes that effective cybersecurity requires more than just detection, it demands systematic analysis, contextual understanding, and structured decision-making. The methodology bridges the gap between automated detection systems and human analytical expertise, ensuring that security teams can respond to threats with precision, confidence, and operational efficiency.

## 📋 The ASSURED Framework

| Phase | Focus Area | Key Objectives |
|-------|------------|----------------|
| **A** | **Alert** | Understanding detection mechanisms and trigger conditions |
| **S** | **Subject** | Entity identification and behavioral analysis |
| **S** | **Scope** | Defining investigation boundaries and impact assessment |
| **U** | **Uncover** | Deep dive analysis and threat hunting |
| **R** | **Risk** | Risk quantification and business impact evaluation |
| **E** | **Escalation** | Response planning and stakeholder communication |
| **D** | **Documentation** | Comprehensive record keeping and knowledge transfer |

### Key Principles

- **Systematic Analysis**: Each phase builds upon the previous, ensuring comprehensive coverage
- **Context-Driven Decisions**: Business context and risk assessment guide all analytical decisions
- **Evidence-Based Investigation**: All conclusions supported by verifiable technical evidence
- **Scalable Framework**: Adaptable to organizations of all sizes and complexity levels
- **Continuous Improvement**: Methodology evolves with threat landscape and operational insights

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/block/assured-methodology.git
cd assured-methodology

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Navigate to `http://localhost:4321` to view the documentation locally.

### Production Build

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 📁 Project Structure

```
assured-methodology/
├── src/
│   ├── content/docs/                # Documentation content (MDX)
│   │   ├── intro.mdx                # Methodology introduction
│   │   ├── alert/                   # A. Alert chapter
│   │   │   ├── index.mdx, example.mdx, quiz.mdx, transition.mdx
│   │   │   ├── detection-mechanisms.mdx + /signature, /anomaly, /rule, /behavioral
│   │   │   ├── validation.mdx + /baseline-comparison, /attack-chains, /criticality
│   │   │   └── parsing.mdx + /command-line, /process-relationships, /network,
│   │   │                       /file-system, /schema, /multi-format
│   │   ├── subject/                 # S. Subject chapter (four-dimensions,
│   │   │                              entity-types, behavioral-framework,
│   │   │                              insider-analysis, example, quiz, transition)
│   │   ├── scope/                   # S. Scope chapter (regulatory, time, entity,
│   │   │                              infrastructure, example, quiz, transition)
│   │   ├── uncover/                 # U. Uncover chapter (data-sources,
│   │   │                              threat-intelligence, mitre, tooling,
│   │   │                              example, quiz, transition)
│   │   ├── risk/                    # R. Risk chapter (framework, impact-likelihood,
│   │   │                              false-positive, example, quiz, transition)
│   │   ├── escalation/              # E. Escalation chapter (criteria, protocols,
│   │   │                              triage-vs-ir, handoff, example, quiz, transition)
│   │   ├── documentation/           # D. Documentation chapter (standards,
│   │   │                              templates, pitfalls, example, quiz, closure)
│   │   └── glossaries/              # Three themed glossaries
│   │       ├── bad.mdx              # B.A.D. — Behaviors, Adversaries, Damage
│   │       ├── cat.mdx              # C.A.T. — Cybersecurity Applications & Tools
│   │       └── clear.mdx            # C.L.E.A.R. — analyst lexicon
│   ├── components/
│   │   ├── assured/                 # Methodology-specific components
│   │   │                              (ChapterHero, FlipCard, ExampleStepper,
│   │   │                              DefineTerm, PillNav, Quiz, Callout, etc.)
│   │   ├── Header.astro, Brand.astro, HeadSEO.astro,
│   │   ├── SimpleTableOfContents.astro, SiteSearch.astro
│   ├── content/config.ts            # Content collection schema
│   ├── data/
│   │   ├── glossary.ts              # Term registry (~670 entries, auto-extracted)
│   │   └── navigation.ts            # Site navigation tree
│   ├── layouts/                     # BaseLayout, ContentPageLayout
│   ├── lib/utils.ts                 # Path + active-state helpers
│   ├── pages/
│   │   ├── index.astro              # Home
│   │   ├── 404.astro
│   │   └── docs/[...slug].astro     # Dynamic doc route
│   └── styles/                      # global.css, assured.css, glossary.css,
│                                       breadcrumbs.css
├── public/
│   ├── _headers                     # Defense-in-depth response headers
│   │                                  (for hosts that honor _headers)
│   └── (static assets)
├── .github/workflows/deploy.yaml    # GitHub Pages auto-deploy on push to main
├── astro.config.ts                  # Astro + MDX + icon + Pagefind config
├── biome.json                       # Linter/formatter config
└── package.json
```

### What's published

All seven chapters and three glossaries are live. Each chapter includes:

- **Concept pages** — the pillar topics
- **A worked example** with two threaded cases (a finance-team phishing intrusion that escalates to IR, and a Cursor IDE Empyre-pattern false positive that closes at triage)
- **A quiz** for self-assessment
- **A transition page** that hands off to the next chapter

| Phase | Chapter | What it covers |
|-------|---------|----------------|
| **A** | Alert | Detection mechanisms (signature, anomaly, rule, behavioral), validation, parsing |
| **S** | Subject | Four dimensions (auth, authz, behavior, relationships), entity types, behavioral framework, insider analysis |
| **S** | Scope | Regulatory, time, entity, and infrastructure boundaries |
| **U** | Uncover | Data sources, threat intelligence, MITRE ATT&CK, tool integration |
| **R** | Risk | RATM, P.A.C.E., impact and likelihood, the false-positive page |
| **E** | Escalation | Criteria, protocols, the triage-vs-IR distinction, the 9-section handoff packet |
| **D** | Documentation | Standards, templates, pitfalls, closure and downstream uses |

## 🛠️ Technology Stack

- **[Astro 5](https://astro.build/)** + **[MDX](https://mdxjs.com/)** — Static site generator and authoring format
- **[Tailwind CSS 4](https://tailwindcss.com/)** — CSS-based config (no `tailwind.config.js`)
- **[Pagefind](https://pagefind.app/)** — Fully client-side search (⌘K from anywhere)
- **[TypeScript](https://www.typescriptlang.org/)** — Type-safe development
- **[Biome](https://biomejs.dev/)** — Linter and formatter
- **rehype-slug + rehype-autolink-headings + remark-gfm** — Heading anchors, GFM tables/lists
- **[astro-icon](https://www.astroicon.dev/)** — Iconify integration

## 🤝 Contributing

We welcome contributions from the cybersecurity community to enhance and expand the ASSURED methodology. Your expertise helps make this framework more comprehensive, practical, and valuable for security professionals worldwide.

### How to Contribute

1. **Fork the repository** and create a feature branch
2. **Review existing content** to understand the methodology structure
3. **Make your changes** following our style guidelines
4. **Test your changes** locally before submitting
5. **Submit a pull request** with a clear description of your contribution

### Contribution Areas

- **Content refinement**: Sharpen wording, fix factual drift, update tool references as the SOC vendor landscape changes
- **Case studies**: Add real-world worked examples beyond the two threaded cases (cloud-native intrusions, identity-provider abuse, supply-chain compromises)
- **Glossary entries**: Add terms to B.A.D. / C.A.T. / C.L.E.A.R. — particularly current threat actors, recent campaigns, and new SOC tooling
- **Quiz items**: Application-grade questions that test methodology fluency on fresh scenarios
- **Technical accuracy**: Review MITRE technique mappings, regulatory citations, and detection-mechanism descriptions
- **Visual design**: Component and animation polish; new interactive teaching aids
- **Pedagogy**: Suggestions on chapter ordering, scaffolding, or sections that read too theoretical

### Style Guidelines

- **Professional Tone**: Maintain technical accuracy with accessible language
- **Practical Focus**: Emphasize actionable guidance over theoretical concepts
- **Visual Consistency**: Use established design patterns and components
- **Evidence-Based**: Support recommendations with technical rationale
- **Comprehensive Coverage**: Ensure thorough treatment of each topic

### Development Workflow

```bash
# Create a new branch for your contribution
git checkout -b feature/your-contribution-name

# Make your changes and test locally
pnpm dev

# Build and verify production build
pnpm build
pnpm preview

# Commit and push your changes
git add .
git commit -m "feat: your contribution description"
git push origin feature/your-contribution-name
```

## 📚 Documentation Features

- **Two-case threading.** A real intrusion (finance-team phishing → P1 escalation to IR) and a false positive (Cursor IDE Empyre-pattern → close at triage) run through every chapter's working example. The same methodology produces both verdicts; the worked examples show how.
- **Pagefind site search.** Press ⌘K from any page. Fully client-side, no server required, ~6,500 words indexed.
- **DefineTerm hover glossary.** Hover or tap any underlined term to see the definition inline, pulled from a 670-entry registry. Auto-positions to stay inside the viewport.
- **Interactive components.** FlipCards for paired concepts, ExampleStepper for multi-step walkthroughs, Reveal blocks for progressive disclosure, per-chapter quizzes that score on first-try correctness.
- **Themed glossaries.** B.A.D. (dark crimson) for threat actors, campaigns, and malware. C.A.T. (defender blue) for the vendor and platform vocabulary. C.L.E.A.R. (indigo) for the analyst lexicon.
- **9-section handoff packet.** The triage analyst's deliverable, including a communication record so IR knows who has been notified.
- **MITRE ATT&CK + CVSS** mapping woven through Alert, Subject, Uncover, and Risk.
- **Responsive + accessible.** Mobile-first layout. `prefers-reduced-motion` respected on every animation. View transitions via Astro's `ClientRouter`.

## 🌐 Deployment

The documentation is designed for easy deployment on modern hosting platforms:

- **Vercel** (Recommended): Automatic deployments from GitHub
- **Netlify**: Simple drag-and-drop deployment
- **GitHub Pages**: Free hosting with GitHub Actions
- **Self-hosted**: Static file serving on any web server

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Security practitioners who contributed real-world insights
- Open source community for foundational technologies
- Industry frameworks that informed methodology development
- Beta testers and early adopters who provided valuable feedback

## 👨‍💻 About the Author

**Timothy Zilber** developed the ASSURED methodology out of both personal experience and a deep passion for empowering others in the cybersecurity field. 
His journey reflects the very challenges this framework seeks to solve: breaking into a highly competitive industry without clear pathways or structured guidance.

### The Journey That Created ASSURED

**Breaking Through Barriers**: Like many aspiring professionals, Timothy faced significant challenges when first trying to enter the cybersecurity field. Lacking direct experience, he turned to his company’s Detection and Response Team (DART), where he secured a short-term mentorship. 
This experience proved pivotal, providing practical exposure to real-world investigations and bridging the gap between theory and practice.

**Hands-On Learning**: Building on that foundation, Timothy approached the manager of the Monitoring and Triage team, proposing to volunteer one hour per day with the team while completing his college degree. 
Over eight months of consistent, hands-on work, he honed critical skills in event triage and analysis, ultimately earning a full-time role on the team after graduation.

**Identifying the Gap**: Shortly after joining the team full-time, Timothy took paternity leave following the birth of his second child. 
During this time, he immersed himself in security literature and industry frameworks, only to discover a glaring gap: Event Triage was often mentioned but rarely explored in depth. 
Existing methodologies emphasized incident response at a high level but lacked the detailed, repeatable process analysts need to confidently and efficiently investigate alerts.

**Giving Back**: Grateful for the mentorship that opened doors for him, Timothy became determined to create similar opportunities for others. 
He redesigned the original mentorship initiative into what is now known as the Lateral Work Program, expanding access and making structured cybersecurity career development available to employees across the organization.

As he mentored others, Timothy encountered a recurring challenge: there was no clear, repeatable methodology for teaching event triage. 
Analysts struggled to approach investigations systematically, which often led to inconsistent outcomes. 
This challenge sparked the earliest foundations of what would become the ASSURED methodology, as Timothy began experimenting with structured, step-by-step training techniques to give his mentees the clarity and confidence they needed.

**ASSURED Emerges**: The convergence of these two forces, mentorship-driven innovation and the recognition of an industry-wide gap, gave rise to ASSURED. 
Through years of iteration, real-world application, and refinement based on feedback from trainees and peers, Timothy shaped ASSURED into a structured, repeatable methodology for event triage. 
Today, it serves as both a teaching framework and an operational guide, empowering analysts to conduct investigations that are quick, thorough, and consistent, while fostering skill development and professional growth.

### Professional Impact

**Current Role**: Security Engineer specializing in Event Triage and Incident Response
**Program Leadership**: Co-Creator and lead trainer of the Lateral Work Program, fostering skill development and mentorship across the organization 
**Methodology Success**: ASSURED has been successfully adopted by program participants, improving investigation speed, accuracy, and analyst confidence
**Community Focus**: Dedicated to breaking down barriers to entry in cybersecurity by promoting mentorship, structured learning, and hands-on experience

**Connect & Collaborate:**
- 💼 **LinkedIn**: [Connect for professional networking](https://linkedin.com/in/timothy-zilber)
- 📧 **Email**: [Reach out for methodology discussions](mailto:tzilber@block.xyz)

*ASSURED represents more than a methodology, it's a testament to the power of mentorship, structured learning, and addressing real gaps in cybersecurity practice. This framework is shared with the community to help others navigate the challenges Timothy once faced, ensuring that event triage receives the systematic attention it deserves.*

## 📞 Support

- **Documentation Issues**: Open a GitHub issue for content problems
- **Technical Support**: Check existing issues or create a new one
- **Methodology Questions**: Use GitHub Discussions for methodology-related questions
- **Contribution Help**: Review contributing guidelines or ask in discussions
- **Author Contact**: Reach out directly for methodology guidance or collaboration opportunities

## 🔗 Related Resources

- [MITRE ATT&CK Framework](https://attack.mitre.org/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [SANS Incident Response Process](https://www.sans.org/white-papers/incident-response/)
- [CIS Controls](https://www.cisecurity.org/controls/)

---

**Built with ❤️ by the cybersecurity community for the cybersecurity community.**
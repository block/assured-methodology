# ASSURED Cybersecurity Methodology

> **A comprehensive, scalable framework for security analysts to triage, investigate, and document events with clarity, context, and confidence.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Documentation](https://img.shields.io/badge/Documentation-Live-blue.svg)](#)
[![Contributors Welcome](https://img.shields.io/badge/Contributors-Welcome-green.svg)](#contributing)

## 🔍 What is ASSURED?

The ASSURED methodology is a structured, systematic approach to cybersecurity event triage and investigation designed for modern security operations centers (SOCs). Built by practitioners for practitioners, it provides a comprehensive framework that transforms raw security alerts into actionable intelligence through systematic analysis, validation, and documentation processes.

### Core Philosophy

ASSURED recognizes that effective cybersecurity requires more than just detection—it demands systematic analysis, contextual understanding, and structured decision-making. The methodology bridges the gap between automated detection systems and human analytical expertise, ensuring that security teams can respond to threats with precision, confidence, and operational efficiency.

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
│   ├── content/docs/           # Documentation content
│   │   ├── alert/             # Alert phase methodology
│   │   │   ├── index.mdx      # Alert overview and framework
│   │   │   ├── detection-mechanisms.mdx
│   │   │   ├── validation.mdx
│   │   │   ├── parsing.mdx
│   │   │   └── transition.mdx
│   │   ├── subject/           # Subject phase methodology
│   │   │   ├── index.mdx      # Subject overview
│   │   │   ├── four-dimensions.mdx
│   │   │   ├── entity-types.mdx
│   │   │   ├── behavior.mdx
│   │   │   └── transition.mdx
│   │   ├── scope/             # Scope phase (future)
│   │   ├── uncover/           # Uncover phase (future)
│   │   ├── risk/              # Risk assessment (future)
│   │   ├── escalation/        # Escalation procedures (future)
│   │   ├── documentation/     # Documentation templates (future)
│   │   ├── glossary/          # Terminology and definitions (future)
│   │   └── intro.mdx          # Methodology introduction
│   ├── components/            # Reusable UI components
│   │   ├── docs/             # Documentation-specific components
│   │   ├── ui/               # Base UI components
│   │   └── block/            # Content block components
│   ├── layouts/              # Page layout templates
│   ├── styles/               # Global CSS and styling
│   └── data/                 # Configuration and navigation data
├── public/                   # Static assets
├── astro.config.ts          # Astro configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── package.json             # Dependencies and scripts
```

### Content Organization

- **`/alert/`**: Complete methodology for alert analysis, including detection mechanisms, validation frameworks, parsing techniques, and transition planning
- **`/subject/`**: Entity-centric investigation approaches, behavioral analysis, and relationship mapping (in development)
- **`/scope/`**: Investigation boundary definition and impact assessment (planned)
- **`/uncover/`**: Advanced threat hunting and deep dive analysis techniques (planned)
- **`/risk/`**: Risk quantification and business impact evaluation (planned)
- **`/escalation/`**: Response planning and stakeholder communication (planned)
- **`/documentation/`**: Templates and best practices for incident documentation (planned)
- **`/glossary/`**: Comprehensive terminology and definition repository (planned)

## 🛠️ Technology Stack

- **[Astro](https://astro.build/)**: Static site generator with MDX support
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework
- **[MDX](https://mdxjs.com/)**: Markdown with JSX components for rich content
- **[TypeScript](https://www.typescriptlang.org/)**: Type-safe development
- **Responsive Design**: Mobile-first approach with modern UI/UX principles

## 🎯 Current Status

### ✅ Completed Phases

- **Alert Phase**: Comprehensive methodology including:
  - Detection mechanism analysis (Signature-based, Anomaly-based, Rule-based, Behavioral Analytics)
  - Multi-dimensional validation frameworks
  - Advanced parsing techniques and data standardization
  - Transition planning to Subject phase

### 🚧 In Development

- **Subject Phase**: Entity-focused investigation including:
- **Scope Phase**: Investigation boundary definition
- **Uncover Phase**: Advanced threat hunting techniques
- **Risk Assessment**: Business impact evaluation
- **Escalation Procedures**: Response planning and communication
- **Documentation Templates**: Standardized reporting frameworks

## 🤝 Contributing

We welcome contributions from the cybersecurity community to enhance and expand the ASSURED methodology. Your expertise helps make this framework more comprehensive, practical, and valuable for security professionals worldwide.

### How to Contribute

1. **Fork the repository** and create a feature branch
2. **Review existing content** to understand the methodology structure
3. **Make your changes** following our style guidelines
4. **Test your changes** locally before submitting
5. **Submit a pull request** with a clear description of your contribution

### Contribution Areas

- **Content Enhancement**: Improve existing methodology sections
- **New Phase Development**: Contribute to incomplete phases (Scope, Uncover, Risk, etc.)
- **Case Studies**: Add real-world examples and scenarios
- **Technical Accuracy**: Review and improve technical content
- **Visual Design**: Enhance UI/UX and visual presentation
- **Documentation**: Improve clarity, examples, and practical guidance

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

- **Interactive Navigation**: Structured table of contents with active section highlighting
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Search Functionality**: Quick access to specific topics and terminology
- **Visual Components**: Enhanced content presentation with cards, grids, and callouts
- **Code Examples**: Practical implementation examples and templates
- **Cross-References**: Linked content for easy navigation between related topics

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

**ASSURED Emerges**: The convergence of these two forces—mentorship-driven innovation and the recognition of an industry-wide gap—gave rise to ASSURED. 
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

*ASSURED represents more than a methodology—it's a testament to the power of mentorship, structured learning, and addressing real gaps in cybersecurity practice. This framework is shared with the community to help others navigate the challenges Timothy once faced, ensuring that event triage receives the systematic attention it deserves.*

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

*Last updated: September 2025*
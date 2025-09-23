// Navigation items configuration
interface NavItem {
  title: string;
  href: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}
export const mainNavigation: NavGroup[] = [
  {
    title: "Main Navigation",
    items: [
      {
        title: "Intro",
        href: "/docs/intro"
      },
      {
        title: "Alert",
        href: "/docs/alert"
      },
      {
        title: "Subject",
        href: "/docs/subject"
      },
      {
        title: "Scope",
        href: "/docs/scope"
      },
      {
        title: "Uncover",
        href: "/docs/uncover"
      },
      {
        title: "Risk",
        href: "/docs/risk"
      },
      {
        title: "Escalation",
        href: "/docs/escalation"
      },
      {
        title: "Documentation",
        href: "/docs/documentation"
      },
      {
        title: "Glossary",
        href: "/docs/glossaries/bad"
      }
    ],
  }
];

export const docsNavigation: NavGroup[] = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        href: "/docs/intro",
      },
    ],
  },
  {
    title: "Phase 1: Preparation & Contextualization",
    items: [
      {
        title: "A: Alert - Understanding Detection Logic",
        href: "/docs/alert",
      },
      {
        title: "  → Detection Mechanisms",
        href: "/docs/alert/detection-mechanisms",
      },
      {
        title: "  → Alert Validation",
        href: "/docs/alert/validation",
      },
      {
        title: "  → Parsing Alerts",
        href: "/docs/alert/parsing",
      },
      {
        title: "  → Transition to Subject Phase",
        href: "/docs/alert/transition",
      },
      {
        title: "S: Subject - Identifying Key Entities",
        href: "/docs/subject",
      },
      {
        title: "  → Four Dimensions of Analysis",
        href: "/docs/subject/four-dimensions",
      },
      {
        title: "  → Entity Types and Analysis",
        href: "/docs/subject/entity-types",
      },
      {
        title: "  → Transition to Scope Phase",
        href: "/docs/subject/transition",
      },
      {
        title: "S: Scope - Defining Investigation Boundaries",
        href: "/docs/scope",
      },
    ],
  },
  {
    title: "Phase 2: Investigation & Assessment",
    items: [
      {
        title: "U: Uncover - The Investigation",
        href: "/docs/uncover",
      },
      {
        title: "R: Risk - Identifying Risk",
        href: "/docs/risk",
      },
    ],
  },
  {
    title: "Phase 3: Resolution & Documentation",
    items: [
      {
        title: "E: Escalation - Triage to Broader Response",
        href: "/docs/escalation",
      },
      {
        title: "D: Documentation - Consistency",
        href: "/docs/documentation",
      },
    ],
  },
  {
    title: "Reference Materials",
    items: [
      {
        title: "B.A.D. Glossary",
        href: "/docs/glossaries/bad",
      },
      {
        title: "C.A.T. Glossary",
        href: "/docs/glossaries/cat",
      },
      {
        title: "C.L.E.A.R. Glossary",
        href: "/docs/glossaries/clear",
      },
    ],
  },
];



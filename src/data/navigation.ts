/**
 * Navigation configuration.
 *
 * `status: "soon"` marks a chapter as in-progress so the UI can render
 * a "Coming Soon" badge instead of pretending the link works.
 */

export type NavStatus = "live" | "soon";

export interface NavItem {
  title: string;
  href: string;
  status?: NavStatus;
  children?: NavItem[];
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const mainNavigation: NavGroup[] = [
  {
    title: "Main Navigation",
    items: [
      { title: "Introduction", href: "/docs/intro", status: "live" },
      { title: "Fast path", href: "/docs/fast-path", status: "live" },
      { title: "AI triage", href: "/docs/ai-triage", status: "live" },
      { title: "Quick reference", href: "/docs/reference", status: "live" },
      {
        title: "Alert",
        href: "/docs/alert",
        status: "live",
        children: [
          {
            title: "Detection mechanisms",
            href: "/docs/alert/detection-mechanisms",
            status: "live",
            children: [
              {
                title: "Signature-based detection",
                href: "/docs/alert/detection-mechanisms/signature",
                status: "live",
              },
              {
                title: "Anomaly-based detection",
                href: "/docs/alert/detection-mechanisms/anomaly",
                status: "live",
              },
              {
                title: "Rule-based detection",
                href: "/docs/alert/detection-mechanisms/rule",
                status: "live",
              },
              {
                title: "Behavioral analytics",
                href: "/docs/alert/detection-mechanisms/behavioral",
                status: "live",
              },
            ],
          },
          {
            title: "Alert validation",
            href: "/docs/alert/validation",
            status: "live",
            children: [
              {
                title: "Baseline comparison",
                href: "/docs/alert/validation/baseline-comparison",
                status: "live",
              },
              {
                title: "Attack chains and correlation",
                href: "/docs/alert/validation/attack-chains",
                status: "live",
              },
              {
                title: "Asset and user criticality",
                href: "/docs/alert/validation/criticality",
                status: "live",
              },
            ],
          },
          {
            title: "Parsing alerts",
            href: "/docs/alert/parsing",
            status: "live",
            children: [
              {
                title: "Formats and normalization",
                href: "/docs/alert/parsing/multi-format",
                status: "live",
              },
              {
                title: "Command line analysis",
                href: "/docs/alert/parsing/command-line",
                status: "live",
              },
              {
                title: "Process relationships",
                href: "/docs/alert/parsing/process-relationships",
                status: "live",
              },
              {
                title: "Network correlation",
                href: "/docs/alert/parsing/network",
                status: "live",
              },
              {
                title: "File system activity",
                href: "/docs/alert/parsing/file-system",
                status: "live",
              },
              {
                title: "Cloud and identity logs",
                href: "/docs/alert/parsing/cloud-identity",
                status: "live",
              },
            ],
          },
          {
            title: "Working example",
            href: "/docs/alert/example",
            status: "live",
          },
          { title: "Chapter quiz", href: "/docs/alert/quiz", status: "live" },
          {
            title: "Transition to Subject",
            href: "/docs/alert/transition",
            status: "live",
          },
        ],
      },
      {
        title: "Subject",
        href: "/docs/subject",
        status: "live",
        children: [
          {
            title: "Four dimensions",
            href: "/docs/subject/four-dimensions",
            status: "live",
          },
          {
            title: "Entity types",
            href: "/docs/subject/entity-types",
            status: "live",
          },
          {
            title: "Behavioral framework",
            href: "/docs/subject/behavioral-framework",
            status: "live",
          },
          {
            title: "Insider analysis",
            href: "/docs/subject/insider-analysis",
            status: "live",
          },
          {
            title: "Working example",
            href: "/docs/subject/example",
            status: "live",
          },
          { title: "Chapter quiz", href: "/docs/subject/quiz", status: "live" },
          {
            title: "Transition to Scope",
            href: "/docs/subject/transition",
            status: "live",
          },
        ],
      },
      {
        title: "Scope",
        href: "/docs/scope",
        status: "live",
        children: [
          {
            title: "Regulatory boundaries",
            href: "/docs/scope/regulatory",
            status: "live",
          },
          {
            title: "Time boundaries",
            href: "/docs/scope/time",
            status: "live",
          },
          {
            title: "Entity boundaries",
            href: "/docs/scope/entity",
            status: "live",
          },
          {
            title: "Infrastructure boundaries",
            href: "/docs/scope/infrastructure",
            status: "live",
          },
          {
            title: "Working example",
            href: "/docs/scope/example",
            status: "live",
          },
          { title: "Chapter quiz", href: "/docs/scope/quiz", status: "live" },
          {
            title: "Transition to Uncover",
            href: "/docs/scope/transition",
            status: "live",
          },
        ],
      },
      {
        title: "Uncover",
        href: "/docs/uncover",
        status: "live",
        children: [
          {
            title: "Data sources",
            href: "/docs/uncover/data-sources",
            status: "live",
          },
          {
            title: "Correlation and the timeline",
            href: "/docs/uncover/correlation",
            status: "live",
          },
          {
            title: "Threat intelligence",
            href: "/docs/uncover/threat-intelligence",
            status: "live",
          },
          {
            title: "MITRE ATT&CK",
            href: "/docs/uncover/mitre",
            status: "live",
          },
          {
            title: "Tool integration",
            href: "/docs/uncover/tooling",
            status: "live",
          },
          {
            title: "Working example",
            href: "/docs/uncover/example",
            status: "live",
          },
          { title: "Chapter quiz", href: "/docs/uncover/quiz", status: "live" },
          {
            title: "Transition to Risk",
            href: "/docs/uncover/transition",
            status: "live",
          },
        ],
      },
      {
        title: "Risk",
        href: "/docs/risk",
        status: "live",
        children: [
          {
            title: "Impact and likelihood",
            href: "/docs/risk/impact-likelihood",
            status: "live",
          },
          { title: "Framework", href: "/docs/risk/framework", status: "live" },
          {
            title: "The value of a false positive",
            href: "/docs/risk/false-positive",
            status: "live",
          },
          {
            title: "Working example",
            href: "/docs/risk/example",
            status: "live",
          },
          { title: "Chapter quiz", href: "/docs/risk/quiz", status: "live" },
          {
            title: "Transition to Escalation",
            href: "/docs/risk/transition",
            status: "live",
          },
        ],
      },
      {
        title: "Escalation",
        href: "/docs/escalation",
        status: "live",
        children: [
          {
            title: "Criteria for escalation",
            href: "/docs/escalation/criteria",
            status: "live",
          },
          {
            title: "Internal and external protocols",
            href: "/docs/escalation/protocols",
            status: "live",
          },
          {
            title: "Triage vs. incident response",
            href: "/docs/escalation/triage-vs-ir",
            status: "live",
          },
          {
            title: "The handoff packet",
            href: "/docs/escalation/handoff",
            status: "live",
          },
          {
            title: "Working example",
            href: "/docs/escalation/example",
            status: "live",
          },
          {
            title: "Chapter quiz",
            href: "/docs/escalation/quiz",
            status: "live",
          },
          {
            title: "Transition to Documentation",
            href: "/docs/escalation/transition",
            status: "live",
          },
        ],
      },
      {
        title: "Documentation",
        href: "/docs/documentation",
        status: "live",
        children: [
          {
            title: "Standards",
            href: "/docs/documentation/standards",
            status: "live",
          },
          {
            title: "Templates",
            href: "/docs/documentation/templates",
            status: "live",
          },
          {
            title: "Pitfalls",
            href: "/docs/documentation/pitfalls",
            status: "live",
          },
          {
            title: "Working example",
            href: "/docs/documentation/example",
            status: "live",
          },
          {
            title: "Chapter quiz",
            href: "/docs/documentation/quiz",
            status: "live",
          },
          {
            title: "Methodology complete",
            href: "/docs/documentation/closure",
            status: "live",
          },
        ],
      },
      {
        title: "Glossaries",
        href: "/docs/glossaries/bad",
        status: "live",
        children: [
          {
            title: "B.A.D. Glossary",
            href: "/docs/glossaries/bad",
            status: "live",
          },
          {
            title: "C.A.T. Glossary",
            href: "/docs/glossaries/cat",
            status: "live",
          },
          {
            title: "C.L.E.A.R. Glossary",
            href: "/docs/glossaries/clear",
            status: "live",
          },
        ],
      },
    ],
  },
];

/**
 * Canonical linear reading order for the docs. Single source of truth for
 * the prev/next pager rendered by ContentPageLayout. Hrefs must match entry
 * routes. Pages outside the linear arc (glossaries) are deliberately absent
 * and render no pager.
 */
export const readingOrder: string[] = [
  "/docs/intro",
  "/docs/fast-path",
  "/docs/ai-triage",
  "/docs/reference",
  "/docs/alert",
  "/docs/alert/detection-mechanisms",
  "/docs/alert/detection-mechanisms/signature",
  "/docs/alert/detection-mechanisms/anomaly",
  "/docs/alert/detection-mechanisms/rule",
  "/docs/alert/detection-mechanisms/behavioral",
  "/docs/alert/validation",
  "/docs/alert/validation/baseline-comparison",
  "/docs/alert/validation/attack-chains",
  "/docs/alert/validation/criticality",
  "/docs/alert/parsing",
  "/docs/alert/parsing/multi-format",
  "/docs/alert/parsing/command-line",
  "/docs/alert/parsing/process-relationships",
  "/docs/alert/parsing/network",
  "/docs/alert/parsing/file-system",
  "/docs/alert/parsing/cloud-identity",
  "/docs/alert/example",
  "/docs/alert/quiz",
  "/docs/alert/transition",
  "/docs/subject",
  "/docs/subject/four-dimensions",
  "/docs/subject/entity-types",
  "/docs/subject/behavioral-framework",
  "/docs/subject/insider-analysis",
  "/docs/subject/example",
  "/docs/subject/quiz",
  "/docs/subject/transition",
  "/docs/scope",
  "/docs/scope/regulatory",
  "/docs/scope/time",
  "/docs/scope/entity",
  "/docs/scope/infrastructure",
  "/docs/scope/example",
  "/docs/scope/quiz",
  "/docs/scope/transition",
  "/docs/uncover",
  "/docs/uncover/data-sources",
  "/docs/uncover/correlation",
  "/docs/uncover/threat-intelligence",
  "/docs/uncover/mitre",
  "/docs/uncover/tooling",
  "/docs/uncover/example",
  "/docs/uncover/quiz",
  "/docs/uncover/transition",
  "/docs/risk",
  "/docs/risk/impact-likelihood",
  "/docs/risk/framework",
  "/docs/risk/false-positive",
  "/docs/risk/example",
  "/docs/risk/quiz",
  "/docs/risk/transition",
  "/docs/escalation",
  "/docs/escalation/criteria",
  "/docs/escalation/protocols",
  "/docs/escalation/triage-vs-ir",
  "/docs/escalation/handoff",
  "/docs/escalation/example",
  "/docs/escalation/quiz",
  "/docs/escalation/transition",
  "/docs/documentation",
  "/docs/documentation/standards",
  "/docs/documentation/templates",
  "/docs/documentation/pitfalls",
  "/docs/documentation/example",
  "/docs/documentation/quiz",
  "/docs/documentation/closure",
];

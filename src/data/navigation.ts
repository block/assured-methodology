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
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const mainNavigation: NavGroup[] = [
  {
    title: "Main Navigation",
    items: [
      { title: "Home",          href: "/",                   status: "live" },
      { title: "Introduction",  href: "/docs/intro",         status: "live" },
      { title: "Alert",         href: "/docs/alert",         status: "live" },
      { title: "Subject",       href: "/docs/subject",       status: "soon" },
      { title: "Scope",         href: "/docs/scope",         status: "soon" },
      { title: "Uncover",       href: "/docs/uncover",       status: "soon" },
      { title: "Risk",          href: "/docs/risk",          status: "soon" },
      { title: "Escalation",    href: "/docs/escalation",    status: "soon" },
      { title: "Documentation", href: "/docs/documentation", status: "soon" },
    ],
  },
];

export const docsNavigation: NavGroup[] = [
  {
    title: "Start here",
    items: [
      { title: "Introduction", href: "/docs/intro", status: "live" },
    ],
  },
  {
    title: "Phase 1: Preparation and context",
    items: [
      { title: "A · Alert",                            href: "/docs/alert",                            status: "live" },
      { title: "   → Detection mechanisms",            href: "/docs/alert/detection-mechanisms",       status: "live" },
      { title: "      • Signature-based",              href: "/docs/alert/detection-mechanisms/signature",  status: "live" },
      { title: "      • Anomaly-based",                href: "/docs/alert/detection-mechanisms/anomaly",    status: "live" },
      { title: "      • Rule-based",                   href: "/docs/alert/detection-mechanisms/rule",       status: "live" },
      { title: "      • Behavioral analytics",         href: "/docs/alert/detection-mechanisms/behavioral", status: "live" },
      { title: "   → Alert validation",                href: "/docs/alert/validation",                 status: "live" },
      { title: "      • Baseline comparison",          href: "/docs/alert/validation/baseline-comparison",  status: "live" },
      { title: "      • Attack chains",                href: "/docs/alert/validation/attack-chains",        status: "live" },
      { title: "      • Asset and user criticality",   href: "/docs/alert/validation/criticality",          status: "live" },
      { title: "   → Parsing alerts",                  href: "/docs/alert/parsing",                    status: "live" },
      { title: "      • Multi-format standardization", href: "/docs/alert/parsing/multi-format",       status: "live" },
      { title: "      • Command line analysis",        href: "/docs/alert/parsing/command-line",       status: "live" },
      { title: "      • Process relationships",        href: "/docs/alert/parsing/process-relationships", status: "live" },
      { title: "      • Network correlation",          href: "/docs/alert/parsing/network",            status: "live" },
      { title: "      • File system activity",         href: "/docs/alert/parsing/file-system",        status: "live" },
      { title: "      • Schema normalization",         href: "/docs/alert/parsing/schema",             status: "live" },
      { title: "   → Transition to Subject",           href: "/docs/alert/transition",                 status: "live" },
      { title: "   → Chapter quiz",                    href: "/docs/alert/quiz",                       status: "live" },
      { title: "S · Subject",                          href: "/docs/subject",                          status: "soon" },
      { title: "S · Scope",                            href: "/docs/scope",                            status: "soon" },
    ],
  },
  {
    title: "Phase 2: Investigation and assessment",
    items: [
      { title: "U · Uncover", href: "/docs/uncover", status: "soon" },
      { title: "R · Risk",    href: "/docs/risk",    status: "soon" },
    ],
  },
  {
    title: "Phase 3: Resolution and documentation",
    items: [
      { title: "E · Escalation",    href: "/docs/escalation",    status: "soon" },
      { title: "D · Documentation", href: "/docs/documentation", status: "soon" },
    ],
  },
  {
    title: "Reference",
    items: [
      { title: "B.A.D. Glossary",     href: "/docs/glossaries/bad",   status: "soon" },
      { title: "C.A.T. Glossary",     href: "/docs/glossaries/cat",   status: "soon" },
      { title: "C.L.E.A.R. Glossary", href: "/docs/glossaries/clear", status: "soon" },
    ],
  },
];

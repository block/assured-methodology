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
      { title: "Subject",       href: "/docs/subject",       status: "live" },
      { title: "Scope",         href: "/docs/scope",         status: "live" },
      { title: "Uncover",       href: "/docs/uncover",       status: "live" },
      { title: "Risk",          href: "/docs/risk",          status: "live" },
      { title: "Escalation",    href: "/docs/escalation",    status: "live" },
      { title: "Documentation", href: "/docs/documentation", status: "live" },
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
      { title: "S · Subject",                          href: "/docs/subject",                          status: "live" },
      { title: "   → Four dimensions",                 href: "/docs/subject/four-dimensions",          status: "live" },
      { title: "   → Entity types",                    href: "/docs/subject/entity-types",             status: "live" },
      { title: "   → Behavioral framework",            href: "/docs/subject/behavioral-framework",     status: "live" },
      { title: "   → Insider analysis",                href: "/docs/subject/insider-analysis",         status: "live" },
      { title: "   → Working example",                 href: "/docs/subject/example",                  status: "live" },
      { title: "   → Chapter quiz",                    href: "/docs/subject/quiz",                     status: "live" },
      { title: "   → Transition to Scope",             href: "/docs/subject/transition",               status: "live" },
      { title: "S · Scope",                            href: "/docs/scope",                            status: "live" },
      { title: "   → Regulatory boundaries",           href: "/docs/scope/regulatory",                 status: "live" },
      { title: "   → Time boundaries",                 href: "/docs/scope/time",                       status: "live" },
      { title: "   → Entity boundaries",               href: "/docs/scope/entity",                     status: "live" },
      { title: "   → Infrastructure boundaries",       href: "/docs/scope/infrastructure",             status: "live" },
      { title: "   → Working example",                 href: "/docs/scope/example",                    status: "live" },
      { title: "   → Chapter quiz",                    href: "/docs/scope/quiz",                       status: "live" },
      { title: "   → Transition to Uncover",           href: "/docs/scope/transition",                 status: "live" },
    ],
  },
  {
    title: "Phase 2: Investigation and assessment",
    items: [
      { title: "U · Uncover",                          href: "/docs/uncover",                          status: "live" },
      { title: "   → Data sources",                    href: "/docs/uncover/data-sources",             status: "live" },
      { title: "   → Threat intelligence",             href: "/docs/uncover/threat-intelligence",      status: "live" },
      { title: "   → MITRE ATT&CK",                    href: "/docs/uncover/mitre",                    status: "live" },
      { title: "   → Tool integration",                href: "/docs/uncover/tooling",                  status: "live" },
      { title: "   → Working example",                 href: "/docs/uncover/example",                  status: "live" },
      { title: "   → Chapter quiz",                    href: "/docs/uncover/quiz",                     status: "live" },
      { title: "   → Transition to Risk",              href: "/docs/uncover/transition",               status: "live" },
      { title: "R · Risk",                             href: "/docs/risk",                             status: "live" },
      { title: "   → Framework",                       href: "/docs/risk/framework",                   status: "live" },
      { title: "   → Impact and likelihood",           href: "/docs/risk/impact-likelihood",           status: "live" },
      { title: "   → The value of a false positive",   href: "/docs/risk/false-positive",              status: "live" },
      { title: "   → Working example",                 href: "/docs/risk/example",                     status: "live" },
      { title: "   → Chapter quiz",                    href: "/docs/risk/quiz",                        status: "live" },
      { title: "   → Transition to Escalation",        href: "/docs/risk/transition",                  status: "live" },
    ],
  },
  {
    title: "Phase 3: Resolution and documentation",
    items: [
      { title: "E · Escalation",                       href: "/docs/escalation",                       status: "live" },
      { title: "   → Criteria for escalation",         href: "/docs/escalation/criteria",              status: "live" },
      { title: "   → Internal and external protocols", href: "/docs/escalation/protocols",             status: "live" },
      { title: "   → Triage vs. incident response",    href: "/docs/escalation/triage-vs-ir",          status: "live" },
      { title: "   → The handoff packet",              href: "/docs/escalation/handoff",               status: "live" },
      { title: "   → Working example",                 href: "/docs/escalation/example",               status: "live" },
      { title: "   → Chapter quiz",                    href: "/docs/escalation/quiz",                  status: "live" },
      { title: "   → Transition to Documentation",     href: "/docs/escalation/transition",            status: "live" },
      { title: "D · Documentation",                    href: "/docs/documentation",                    status: "live" },
      { title: "   → Standards",                       href: "/docs/documentation/standards",          status: "live" },
      { title: "   → Templates",                       href: "/docs/documentation/templates",          status: "live" },
      { title: "   → Pitfalls",                        href: "/docs/documentation/pitfalls",           status: "live" },
      { title: "   → Working example",                 href: "/docs/documentation/example",            status: "live" },
      { title: "   → Chapter quiz",                    href: "/docs/documentation/quiz",               status: "live" },
      { title: "   → Methodology complete",            href: "/docs/documentation/closure",            status: "live" },
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

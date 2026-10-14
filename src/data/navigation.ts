/**
 * Navigation: the single source for the header, the chapter PillNavs, the
 * chapter-hero pillars, SubPageHero pillar numbering, the hub pages and the
 * prev/next pager. Labels live here once; pages read them instead of
 * copying them.
 *
 * - `title` is the full label (header, mobile menu, hub lists).
 * - `shortTitle` is the compact label (PillNav pills, chapter-hero pillars).
 * - `kind` marks a chapter child's role. Pillars are numbered ("Pillar 2 of
 *   5"); companions sit beside the pillars without a number; example,
 *   transition, quiz and closure are the chapter tail.
 *
 * Erasable TypeScript only (interfaces and type aliases, no enums or
 * runtime-only syntax): scripts/check-reading-order.mjs imports this file
 * directly with Node's type stripping.
 */

export type PhaseKey =
  | "alert"
  | "subject"
  | "scope"
  | "uncover"
  | "risk"
  | "escalation"
  | "documentation";

export type NavKind =
  | "pillar"
  | "companion"
  | "example"
  | "transition"
  | "quiz"
  | "closure";

export interface NavItem {
  title: string;
  href: string;
  /** Compact label for PillNav pills and chapter-hero pillars. */
  shortTitle?: string;
  /** One line for hub pages and header dropdowns. */
  description?: string;
  kind?: NavKind;
  /** Set on the seven chapter entries. */
  phase?: PhaseKey;
  letter?: string;
  /** Header and mobile menus list this item's children in place, under the
   *  item's title as a small group heading, instead of a single link. */
  expandInMenu?: boolean;
  children?: NavItem[];
}

export type StageName = "Orient" | "Investigate" | "Resolve";

export interface PhaseInfo {
  phase: PhaseKey;
  letter: string;
  /** Chapter name as readers see it. */
  name: string;
  href: string;
  /** The anchor question the phase answers. */
  question: string;
  stage: StageName;
}

/** The seven phases, in order. Stages: Orient (A, S, S) · Investigate (U, R)
 *  · Resolve (E, D). */
export const phases: PhaseInfo[] = [
  {
    phase: "alert",
    letter: "A",
    name: "Alert",
    href: "/docs/alert/",
    question: "What fired, and why?",
    stage: "Orient",
  },
  {
    phase: "subject",
    letter: "S",
    name: "Subject",
    href: "/docs/subject/",
    question: "Who is involved?",
    stage: "Orient",
  },
  {
    phase: "scope",
    letter: "S",
    name: "Scope",
    href: "/docs/scope/",
    question: "Where are the lines?",
    stage: "Orient",
  },
  {
    phase: "uncover",
    letter: "U",
    name: "Uncover",
    href: "/docs/uncover/",
    question: "What does the evidence say?",
    stage: "Investigate",
  },
  {
    phase: "risk",
    letter: "R",
    name: "Risk",
    href: "/docs/risk/",
    question: "How bad is it, and how confident are we?",
    stage: "Investigate",
  },
  {
    phase: "escalation",
    letter: "E",
    name: "Escalation decision",
    href: "/docs/escalation/",
    question: "Close or escalate, and who needs to know?",
    stage: "Resolve",
  },
  {
    phase: "documentation",
    letter: "D",
    name: "Documentation",
    href: "/docs/documentation/",
    question: "What did we decide, and what did we learn?",
    stage: "Resolve",
  },
];

export const phaseInfo = (phase: PhaseKey): PhaseInfo =>
  phases.find((p) => p.phase === phase) as PhaseInfo;

/** Example, transition and quiz, in reading order (quiz after transition). */
const chapterTail = (phase: PhaseKey, nextName: string): NavItem[] => [
  {
    title: "Working example",
    shortTitle: "Working example",
    href: `/docs/${phase}/example/`,
    kind: "example",
  },
  {
    title: `Transition to ${nextName}`,
    shortTitle: "Transition",
    href: `/docs/${phase}/transition/`,
    kind: "transition",
  },
  {
    title: "Chapter quiz",
    shortTitle: "Chapter quiz",
    href: `/docs/${phase}/quiz/`,
    kind: "quiz",
  },
];

const chapters: NavItem[] = [
  {
    title: "Alert",
    href: "/docs/alert/",
    phase: "alert",
    letter: "A",
    description: "What fired, and why?",
    children: [
      {
        title: "Other intake",
        shortTitle: "Other intake",
        href: "/docs/alert/intake/",
        kind: "companion",
        description:
          "Cases no rule raised: user reports, external notices, hunts and referrals.",
      },
      {
        title: "How detections work",
        shortTitle: "How detections work",
        href: "/docs/alert/detection-mechanisms/",
        kind: "pillar",
        description:
          "Signature, anomaly, rule and behavioral logic, organized by how each one fails.",
      },
      {
        title: "Alert validation: four validation checks",
        shortTitle: "Validation checks",
        href: "/docs/alert/validation/",
        kind: "pillar",
        description:
          "The four checks, the strategies that feed them, and black-box alerts.",
      },
      {
        title: "Reading any alert",
        shortTitle: "Reading any alert",
        href: "/docs/alert/parsing/",
        kind: "pillar",
        description:
          "The checklist for reading any alert's telemetry; links out to Reading telemetry.",
      },
      ...chapterTail("alert", "Subject"),
    ],
  },
  {
    title: "Subject",
    href: "/docs/subject/",
    phase: "subject",
    letter: "S",
    description: "Who is involved?",
    children: [
      {
        title: "Four dimensions",
        shortTitle: "Four dimensions",
        href: "/docs/subject/four-dimensions/",
        kind: "pillar",
      },
      {
        title: "Entity types",
        shortTitle: "Entity types",
        href: "/docs/subject/entity-types/",
        kind: "pillar",
      },
      {
        title: "Non-human identities",
        shortTitle: "Non-human identities",
        href: "/docs/subject/non-human-identities/",
        kind: "pillar",
      },
      {
        title: "Behavioral framework",
        shortTitle: "Behavioral framework",
        href: "/docs/subject/behavioral-framework/",
        kind: "pillar",
      },
      {
        title: "Insider analysis",
        shortTitle: "Insider analysis",
        href: "/docs/subject/insider-analysis/",
        kind: "pillar",
      },
      ...chapterTail("subject", "Scope"),
    ],
  },
  {
    title: "Scope",
    href: "/docs/scope/",
    phase: "scope",
    letter: "S",
    description: "Where are the lines?",
    children: [
      {
        title: "Regulatory boundaries",
        shortTitle: "Regulatory",
        href: "/docs/scope/regulatory/",
        kind: "pillar",
      },
      {
        title: "Regulatory clock card",
        shortTitle: "Clocks",
        href: "/docs/scope/clocks/",
        kind: "companion",
      },
      {
        title: "Time boundaries",
        shortTitle: "Time",
        href: "/docs/scope/time/",
        kind: "pillar",
      },
      {
        title: "Entity boundaries",
        shortTitle: "Entity",
        href: "/docs/scope/entity/",
        kind: "pillar",
      },
      {
        title: "Asset and user criticality",
        shortTitle: "Criticality",
        href: "/docs/scope/criticality/",
        kind: "companion",
      },
      {
        title: "Infrastructure boundaries",
        shortTitle: "Infrastructure",
        href: "/docs/scope/infrastructure/",
        kind: "pillar",
      },
      ...chapterTail("scope", "Uncover"),
    ],
  },
  {
    title: "Uncover",
    href: "/docs/uncover/",
    phase: "uncover",
    letter: "U",
    description: "What does the evidence say?",
    children: [
      {
        title: "Data sources",
        shortTitle: "Data sources",
        href: "/docs/uncover/data-sources/",
        kind: "pillar",
      },
      {
        title: "Correlation and the timeline",
        shortTitle: "Correlation & timeline",
        href: "/docs/uncover/correlation/",
        kind: "pillar",
      },
      {
        title: "Threat intelligence",
        shortTitle: "Threat intelligence",
        href: "/docs/uncover/threat-intelligence/",
        kind: "pillar",
      },
      {
        title: "MITRE ATT&CK",
        shortTitle: "MITRE ATT&CK",
        href: "/docs/uncover/mitre/",
        kind: "pillar",
      },
      {
        title: "Choosing tools",
        shortTitle: "Choosing tools",
        href: "/docs/uncover/tooling/",
        kind: "pillar",
      },
      ...chapterTail("uncover", "Risk"),
    ],
  },
  {
    title: "Risk",
    href: "/docs/risk/",
    phase: "risk",
    letter: "R",
    description: "How bad is it, and how confident are we?",
    children: [
      {
        title: "Impact and likelihood",
        shortTitle: "Impact + likelihood",
        href: "/docs/risk/impact-likelihood/",
        kind: "pillar",
      },
      {
        title: "The priority matrix",
        shortTitle: "Priority matrix",
        href: "/docs/risk/framework/",
        kind: "pillar",
      },
      {
        title: "What a benign close teaches",
        shortTitle: "Benign closes",
        href: "/docs/risk/false-positive/",
        kind: "pillar",
      },
      ...chapterTail("risk", "the Escalation decision"),
    ],
  },
  {
    title: "Escalation decision",
    href: "/docs/escalation/",
    phase: "escalation",
    letter: "E",
    description: "Close or escalate, and who needs to know?",
    children: [
      {
        title: "Close or escalate: the criteria",
        shortTitle: "Criteria",
        href: "/docs/escalation/criteria/",
        kind: "pillar",
      },
      {
        title: "Internal and external protocols",
        shortTitle: "Protocols",
        href: "/docs/escalation/protocols/",
        kind: "pillar",
      },
      {
        title: "Talking to people during triage",
        shortTitle: "Talking to people",
        href: "/docs/escalation/communication/",
        kind: "companion",
      },
      {
        title: "Triage vs. incident response",
        shortTitle: "Triage vs. IR",
        href: "/docs/escalation/triage-vs-ir/",
        kind: "pillar",
      },
      {
        title: "Preserve before you contain",
        shortTitle: "Preserve first",
        href: "/docs/escalation/preserve/",
        kind: "pillar",
      },
      {
        title: "The handoff packet",
        shortTitle: "The handoff packet",
        href: "/docs/escalation/handoff/",
        kind: "pillar",
      },
      ...chapterTail("escalation", "Documentation"),
    ],
  },
  {
    title: "Documentation",
    href: "/docs/documentation/",
    phase: "documentation",
    letter: "D",
    description: "What did we decide, and what did we learn?",
    children: [
      {
        title: "Standards",
        shortTitle: "Standards",
        href: "/docs/documentation/standards/",
        kind: "pillar",
      },
      {
        title: "Templates",
        shortTitle: "Templates",
        href: "/docs/documentation/templates/",
        kind: "pillar",
      },
      {
        title: "Pitfalls",
        shortTitle: "Pitfalls",
        href: "/docs/documentation/pitfalls/",
        kind: "pillar",
      },
      {
        title: "Working example",
        shortTitle: "Working example",
        href: "/docs/documentation/example/",
        kind: "example",
      },
      {
        title: "Chapter quiz",
        shortTitle: "Chapter quiz",
        href: "/docs/documentation/quiz/",
        kind: "quiz",
      },
      {
        title: "Methodology complete",
        shortTitle: "Closure",
        href: "/docs/documentation/closure/",
        kind: "closure",
      },
    ],
  },
];

/** Reading telemetry: the Field reference home of the per-source parsing
 *  pages. Their URLs stay under /docs/alert/parsing/ (bookmarks and inbound
 *  links keep working); the group lives here, not in the Alert chapter. */
const readingTelemetry: NavItem = {
  title: "Reading telemetry",
  href: "/docs/field-reference/#reading-telemetry",
  description:
    "How to read each source an alert can come from, from formats and normalization to cloud identity logs.",
  children: [
    {
      title: "Formats and normalization",
      shortTitle: "Formats and normalization",
      href: "/docs/alert/parsing/multi-format/",
    },
    {
      title: "Command line analysis",
      shortTitle: "Command line",
      href: "/docs/alert/parsing/command-line/",
    },
    {
      title: "Process relationships",
      shortTitle: "Process relationships",
      href: "/docs/alert/parsing/process-relationships/",
    },
    {
      title: "Network correlation",
      shortTitle: "Network",
      href: "/docs/alert/parsing/network/",
    },
    {
      title: "File system activity",
      shortTitle: "File system",
      href: "/docs/alert/parsing/file-system/",
    },
    {
      title: "Cloud and identity logs",
      shortTitle: "Cloud and identity",
      href: "/docs/alert/parsing/cloud-identity/",
    },
  ],
};

const glossaries: NavItem = {
  title: "Glossaries",
  href: "/docs/glossaries/assured/",
  expandInMenu: true,
  description:
    "The method's own terms, plus threat, tool and core analyst vocabularies.",
  children: [
    {
      title: "ASSURED terms",
      shortTitle: "ASSURED",
      href: "/docs/glossaries/assured/",
      description:
        "Every term the method coined or uses in its own sense, with the record field it lands in.",
    },
    {
      title: "Threats and adversaries (B.A.D.)",
      shortTitle: "B.A.D.",
      href: "/docs/glossaries/bad/",
      description:
        "Techniques, malware families, actors and campaigns, in lifecycle order.",
    },
    {
      title: "Tools and platforms (C.A.T.)",
      shortTitle: "C.A.T.",
      href: "/docs/glossaries/cat/",
      description:
        "Security tools and platforms: what each one sees, and what it misses in triage.",
    },
    {
      title: "Core analyst vocabulary (C.L.E.A.R.)",
      shortTitle: "C.L.E.A.R.",
      href: "/docs/glossaries/clear/",
      description: "The general security vocabulary every analyst needs.",
    },
    {
      title: "Acronyms",
      shortTitle: "Acronyms",
      href: "/docs/glossaries/acronyms/",
      description:
        "Every abbreviation the site uses, A to Z, linked to where it is defined.",
    },
  ],
};

/** Primary navigation: six header groups. The desk card (Quick reference)
 *  also gets its own persistent header button; see `quickReference`. */
export const primaryNavigation: NavItem[] = [
  {
    title: "Start here",
    href: "/docs/start/",
    description:
      "The introduction, the paths through the site, and the desk card.",
    children: [
      {
        title: "Introduction",
        href: "/docs/intro/",
        description:
          "What ASSURED is, the seven questions, and how a case moves through them.",
      },
      {
        title: "Choose your path",
        href: "/docs/start/",
        description:
          "Routes for the analyst on shift, the learner, the SOC lead, the teacher and the detection engineer.",
      },
      {
        title: "Quick reference",
        href: "/docs/reference/",
        description: "The one-page desk card for live triage.",
      },
    ],
  },
  {
    title: "Method",
    href: "/docs/method/",
    description:
      "The seven phases, the case files, and the cognitive traps that bend judgment.",
    children: [
      ...chapters,
      {
        title: "Case files",
        href: "/docs/cases/",
        description:
          "Cases A to D end to end: timeline, artifacts, verdict, and what would have changed it.",
        children: [
          {
            title: "Case D: the burst that never happened",
            shortTitle: "Case D",
            href: "/docs/cases/case-d/",
          },
        ],
      },
      {
        title: "Cognitive traps",
        href: "/docs/cognitive-traps/",
        description:
          "The biases that bend triage judgment, analyst sustainability, and the countermeasures.",
      },
    ],
  },
  {
    title: "Operate",
    href: "/docs/operate/",
    description:
      "Running ASSURED on a real queue: depth, shifts, AI, metrics, detection feedback and rollout.",
    children: [
      {
        title: "Fast path",
        href: "/docs/fast-path/",
        description:
          "The depth ladder, pattern library and eligibility gate for triage at volume.",
      },
      {
        title: "Shift handover and operating variants",
        shortTitle: "Operating variants",
        href: "/docs/operating-variants/",
        description:
          "Shift changes, MSSP and MDR models, and the one-person SOC.",
      },
      {
        title: "AI in triage",
        shortTitle: "AI triage",
        href: "/docs/ai-triage/",
        description:
          "Drafts and decisions: what an assistant may assemble and what stays the analyst's.",
      },
      {
        title: "Governing automated triage",
        shortTitle: "AI governance",
        href: "/docs/ai-governance/",
        description:
          "Level 0 parity, the admission gate, agent evaluation and the deskilling policy.",
      },
      {
        title: "Measuring triage",
        shortTitle: "Measuring triage",
        href: "/docs/measuring-triage/",
        description:
          "The metric set, how each one gets gamed, capacity math and a monthly report.",
      },
      {
        title: "Detection feedback",
        shortTitle: "Detection feedback",
        href: "/docs/detection-feedback/",
        description:
          "What triage and detection engineering owe each other, and the tuning request.",
      },
      {
        title: "Adopting ASSURED",
        shortTitle: "Adoption",
        href: "/docs/adoption/",
        description:
          "Rollout, roles and maturity for a SOC taking on the method.",
      },
    ],
  },
  {
    title: "Field reference",
    href: "/docs/field-reference/",
    description:
      "Look-up material for the desk: telemetry, sources, tools, sweeps and glossaries.",
    children: [
      readingTelemetry,
      {
        title: "Attack chains and correlation",
        shortTitle: "Attack chains",
        href: "/docs/alert/validation/attack-chains/",
        description:
          "Common multi-stage chains and how single alerts fit into them.",
      },
      {
        title: "Telemetry sources",
        shortTitle: "Telemetry sources",
        href: "/docs/field-reference/telemetry-sources/",
        description:
          "Per-source cards: what each source records, retention, and its blind spots.",
      },
      {
        title: "Tool families",
        shortTitle: "Tool families",
        href: "/docs/field-reference/tool-families/",
        description:
          "What SIEM, EDR, XDR, ITDR and the other families can and cannot see.",
      },
      {
        title: "Identity-persistence sweep",
        shortTitle: "Identity sweep",
        href: "/docs/reference/identity-sweep/",
        description:
          "The checklist for any identity an attacker held, per identity provider.",
      },
      glossaries,
    ],
  },
  {
    title: "Teach and train",
    href: "/docs/teach/",
    description: "Exercises, labs, the teaching guide and the facilitator kit.",
    children: [
      {
        title: "Hands-on exercises",
        shortTitle: "Exercises",
        href: "/docs/exercises/",
        description:
          "Paper exercises with answer keys, from Level 0 drills to full cases.",
      },
      {
        title: "Telemetry labs",
        shortTitle: "Labs",
        href: "/docs/labs/",
        description:
          "One lab per phase on free public attack telemetry, then a blind-scored capstone.",
      },
      {
        title: "Teaching ASSURED",
        shortTitle: "Teaching",
        href: "/docs/teaching/",
        description:
          "Sessions, routing with a pre-assessment, and assessment design.",
      },
      {
        title: "Facilitator kit",
        shortTitle: "Facilitator kit",
        href: "/docs/teaching/kit/",
        description:
          "Checklists, exemplar sets, grader calibration and the capstone.",
      },
    ],
  },
  {
    title: "About",
    href: "/docs/about/",
    description:
      "How ASSURED compares, how it maps to standards, and what the evidence shows so far.",
    children: [
      {
        title: "How ASSURED compares",
        shortTitle: "How it compares",
        href: "/docs/positioning/",
        description:
          "Where ASSURED sits next to incident-response frameworks and SOC models.",
      },
      {
        title: "Standards mapping",
        shortTitle: "Standards",
        href: "/docs/standards-mapping/",
        description:
          "NIST, ISO, SANS DAIR, CERT and FIRST, with the evidence an auditor can sample.",
      },
      {
        title: "Development and evidence",
        shortTitle: "Evidence",
        href: "/docs/development/",
        description:
          "What is established, what is not, and the planned evaluation.",
      },
      {
        title: "Accessibility",
        shortTitle: "Accessibility",
        href: "/docs/about/accessibility/",
        description:
          "The WCAG 2.2 AA target, what is checked, known gaps, and how to report a barrier.",
      },
    ],
  },
];

/** The persistent header button for on-shift readers. */
export const quickReference: NavItem = {
  title: "Quick reference",
  href: "/docs/reference/",
  description: "The one-page desk card.",
};

/* ------------------------------------------------------------------ */
/* Lookups                                                            */
/* ------------------------------------------------------------------ */

const normalize = (href: string): string => {
  const path = href.split("#")[0];
  return path.endsWith("/") ? path : `${path}/`;
};

function* walk(
  items: NavItem[],
  parent?: NavItem,
): Generator<[NavItem, NavItem | undefined]> {
  for (const item of items) {
    yield [item, parent];
    if (item.children) yield* walk(item.children, item);
  }
}

/** First nav entry for an href (fragment-insensitive). */
export const findNavItem = (href: string): NavItem | undefined => {
  for (const [item] of walk(primaryNavigation)) {
    if (item.href === href) return item;
  }
  const target = normalize(href);
  for (const [item] of walk(primaryNavigation)) {
    if (!item.href.includes("#") && normalize(item.href) === target)
      return item;
  }
  return undefined;
};

/** The navigation ancestors of an href, outermost first (the item itself
 *  excluded). Breadcrumbs use it, so a page whose URL sits under one chapter
 *  but whose nav home is elsewhere (the Reading telemetry pages under
 *  /docs/alert/parsing/, for example) shows where the navigation files it. */
export const navTrail = (href: string): NavItem[] => {
  const target = normalize(href);
  const search = (
    items: NavItem[],
    trail: NavItem[],
  ): NavItem[] | undefined => {
    for (const item of items) {
      if (!item.href.includes("#") && normalize(item.href) === target)
        return trail;
      if (item.children) {
        const found = search(item.children, [...trail, item]);
        if (found) return found;
      }
    }
    return undefined;
  };
  return search(primaryNavigation, []) ?? [];
};

/** Compact label for an href: shortTitle, else title. */
export const navLabel = (href: string): string | undefined => {
  const item = findNavItem(href);
  return item ? (item.shortTitle ?? item.title) : undefined;
};

export const chapterNav = (phase: PhaseKey): NavItem =>
  chapters.find((c) => c.phase === phase) as NavItem;

/** A chapter's pillars and companions, in reading order. */
export const chapterPages = (phase: PhaseKey): NavItem[] =>
  (chapterNav(phase).children ?? []).filter(
    (c) => c.kind === "pillar" || c.kind === "companion",
  );

/** A chapter's numbered pillars only. */
export const chapterPillars = (phase: PhaseKey): NavItem[] =>
  (chapterNav(phase).children ?? []).filter((c) => c.kind === "pillar");

/** Example, transition, quiz (and Documentation's closure), in reading order. */
export const chapterTailPages = (phase: PhaseKey): NavItem[] =>
  (chapterNav(phase).children ?? []).filter(
    (c) => c.kind && c.kind !== "pillar" && c.kind !== "companion",
  );

/** Position of a pillar page in its chapter, for "Pillar N of M". */
export const pillarPosition = (
  href: string,
): { index: number; total: number; phase: PhaseKey } | undefined => {
  const target = normalize(href);
  for (const chapter of chapters) {
    const pillars = chapterPillars(chapter.phase as PhaseKey);
    const i = pillars.findIndex((p) => normalize(p.href) === target);
    if (i >= 0) {
      return {
        index: i + 1,
        total: pillars.length,
        phase: chapter.phase as PhaseKey,
      };
    }
  }
  return undefined;
};

/**
 * Position of a page among its navigation group's children, for pages that
 * are not chapter pillars (the Reading telemetry pages, for example):
 * "NN of MM". Only plain groups count: a chapter's children are numbered by
 * pillarPosition instead, and a group whose children carry a kind is a
 * chapter-like sequence, not a numbered set.
 */
export const groupPosition = (
  href: string,
): { index: number; total: number; group: NavItem } | undefined => {
  const target = normalize(href);
  for (const [item, parent] of walk(primaryNavigation)) {
    if (!parent?.children || parent.phase) continue;
    if (item.href.includes("#") || normalize(item.href) !== target) continue;
    const siblings = parent.children.filter((c) => !c.href.includes("#"));
    if (siblings.some((c) => c.kind || c.children)) continue;
    const i = siblings.findIndex((c) => normalize(c.href) === target);
    if (i >= 0) return { index: i + 1, total: siblings.length, group: parent };
  }
  return undefined;
};

/** True when an href points at one of the page's breadcrumb ancestors
 *  (fragment-insensitive), i.e. a link the breadcrumbs already carry.
 *  Mirrors ContentPageLayout: the navigation trail when the page is in the
 *  navigation, otherwise the page's URL path. */
export const isInTrail = (pageHref: string, href: string): boolean => {
  const target = normalize(href);
  const trail = navTrail(pageHref);
  if (trail.length > 0 || findNavItem(pageHref)) {
    return trail.some((item) => normalize(item.href) === target);
  }
  const segments = normalize(pageHref).split("/").filter(Boolean);
  return segments
    .slice(0, -1)
    .some((_, i) => `/${segments.slice(0, i + 1).join("/")}/` === target);
};

/* ------------------------------------------------------------------ */
/* Reading order                                                      */
/* ------------------------------------------------------------------ */

/**
 * The learner spine: the linear prev/next pager rendered by
 * ContentPageLayout. Hrefs must match entry routes. The method comes
 * first; the guides that compress or operate it follow Documentation.
 * Every chapter runs pillars, working example, transition, then quiz, so
 * the quiz can assess what the transition teaches.
 */
export const readingOrder: string[] = [
  "/docs/intro/",
  "/docs/alert/",
  "/docs/alert/intake/",
  "/docs/alert/detection-mechanisms/",
  "/docs/alert/validation/",
  "/docs/alert/parsing/",
  "/docs/alert/example/",
  "/docs/alert/transition/",
  "/docs/alert/quiz/",
  "/docs/subject/",
  "/docs/subject/four-dimensions/",
  "/docs/subject/entity-types/",
  "/docs/subject/non-human-identities/",
  "/docs/subject/behavioral-framework/",
  "/docs/subject/insider-analysis/",
  "/docs/subject/example/",
  "/docs/subject/transition/",
  "/docs/subject/quiz/",
  "/docs/scope/",
  "/docs/scope/regulatory/",
  "/docs/scope/clocks/",
  "/docs/scope/time/",
  "/docs/scope/entity/",
  "/docs/scope/criticality/",
  "/docs/scope/infrastructure/",
  "/docs/scope/example/",
  "/docs/scope/transition/",
  "/docs/scope/quiz/",
  "/docs/uncover/",
  "/docs/uncover/data-sources/",
  "/docs/uncover/correlation/",
  "/docs/uncover/threat-intelligence/",
  "/docs/uncover/mitre/",
  "/docs/uncover/tooling/",
  "/docs/uncover/example/",
  "/docs/uncover/transition/",
  "/docs/uncover/quiz/",
  "/docs/risk/",
  "/docs/risk/impact-likelihood/",
  "/docs/risk/framework/",
  "/docs/risk/false-positive/",
  "/docs/risk/example/",
  "/docs/risk/transition/",
  "/docs/risk/quiz/",
  "/docs/escalation/",
  "/docs/escalation/criteria/",
  "/docs/escalation/protocols/",
  "/docs/escalation/communication/",
  "/docs/escalation/triage-vs-ir/",
  "/docs/escalation/preserve/",
  "/docs/escalation/handoff/",
  "/docs/escalation/example/",
  "/docs/escalation/transition/",
  "/docs/escalation/quiz/",
  "/docs/documentation/",
  "/docs/documentation/standards/",
  "/docs/documentation/templates/",
  "/docs/documentation/pitfalls/",
  "/docs/documentation/example/",
  "/docs/documentation/quiz/",
  "/docs/documentation/closure/",
  "/docs/cognitive-traps/",
  "/docs/fast-path/",
  "/docs/ai-triage/",
  "/docs/reference/",
  "/docs/exercises/",
];

/**
 * Group-local pagers for pages off the learner spine. A page appears in at
 * most one of readingOrder and these sequences. Pages in neither (hubs,
 * Field reference, glossaries, case files) are listed explicitly in
 * scripts/check-reading-order.mjs and render no pager.
 */
export const groupSequences: Record<string, string[]> = {
  Operate: [
    "/docs/operating-variants/",
    "/docs/ai-governance/",
    "/docs/measuring-triage/",
    "/docs/detection-feedback/",
    "/docs/adoption/",
  ],
  "Teach and train": ["/docs/labs/", "/docs/teaching/", "/docs/teaching/kit/"],
  About: [
    "/docs/positioning/",
    "/docs/standards-mapping/",
    "/docs/development/",
  ],
};

/** The sequence (spine or group) a page belongs to, if any. */
export const sequenceFor = (
  pagePath: string,
): { name: string; order: string[] } | undefined => {
  if (readingOrder.includes(pagePath))
    return { name: "Reading order", order: readingOrder };
  for (const [name, order] of Object.entries(groupSequences)) {
    if (order.includes(pagePath)) return { name, order };
  }
  return undefined;
};

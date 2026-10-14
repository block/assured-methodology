/**
 * The case files: structured facts for the four end-to-end cases, so the
 * hub, the case summary cards and the chapter examples' "previously" lines
 * read one source instead of re-telling each other.
 *
 * Cases A, B and C are threaded through the seven chapter example pages;
 * each page carries an anchor per case (#case-a, #case-b, #case-c). Case D
 * has its own page, /docs/cases/case-d/, and its stops point at that page's
 * sections.
 *
 * Rendered by CaseFile.astro and src/content/docs/cases/index.mdx. All
 * names, hosts, addresses and identifiers are fictional (reserved domains,
 * RFC 5737 addresses). All times are UTC.
 *
 * When a chapter example changes a fact listed here, change it here in the
 * same edit; the example pages are the long form, this file is the record.
 */

import type {
  ActivityVerdict,
  Band,
  CaseStatus,
  DetectionVerdict,
  EscalationDecision,
} from "@/data/priority-matrix";
import type { PhaseKey } from "@/data/time-budgets";

export type CaseKey = "A" | "B" | "C" | "D";

export interface CaseStop {
  phase: PhaseKey;
  /** Where the long form lives: a chapter example anchor, or a Case D section. */
  href: string;
  /** Time on the analyst's clock when this stop ends (UTC), if the case pins it. */
  at?: string;
  /** One or two sentences: what the phase found and decided. */
  summary: string;
}

export interface CaseFileData {
  key: CaseKey;
  /** Anchor slug used on the chapter example pages and the hub. */
  slug: "case-a" | "case-b" | "case-c" | "case-d";
  label: `Case ${CaseKey}`;
  title: string;
  /** One-line premise. */
  premise: string;
  /** Calendar date of the case (UTC), ISO. */
  date: string;
  caseId: string;
  alertId?: string;
  incidentId?: string;
  /** Depth on the ladder, including any upward move. */
  depth: string;
  verdict: {
    detection: DetectionVerdict;
    activity: ActivityVerdict;
    status: CaseStatus;
  };
  priority: {
    /** Band at the Escalation decision. */
    band: Band;
    /** Matrix cell at Risk, as "Impact/Likelihood". */
    cell: string;
    /** How the band was reached, in one line. */
    basis: string;
    /** The clock the band ran on. */
    clock: string;
  };
  decision: {
    move: EscalationDecision;
    /** Time of the Escalation decision (UTC), "HH:MM". */
    at: string;
    summary: string;
  };
  /** What the case teaches that the others do not. */
  teaches: string;
  /** Records the case produced. */
  artifacts: string[];
  /** What would have changed the verdict or the outcome (hedged where it is a counterfactual). */
  turningPoints: string[];
  /** Its thread through the chapters, in phase order. */
  stops: CaseStop[];
  /** A standalone case page, if the case has one. */
  page?: string;
  /** A learner packet to work the case cold, if one ships. */
  packet?: string;
}

const ex = (phase: PhaseKey, slug: string) => `/docs/${phase}/example/#${slug}`;

export const cases: readonly CaseFileData[] = [
  {
    key: "A",
    slug: "case-a",
    label: "Case A",
    title: "The finance-team phishing intrusion",
    premise:
      "A fake invoice page talks a finance analyst into pasting a PowerShell download cradle into the Run dialog, and the stolen browser session is replayed against the cloud finance reporting platform while the case is still being worked.",
    date: "2026-03-03",
    caseId: "CASE-2026-0303-007",
    alertId: "ALERT-2026-0303-0191",
    incidentId: "INC-2026-0303-001",
    depth:
      "Level 1, then Level 2 in Uncover (regulated data plausibly accessed by the replayed session)",
    verdict: {
      detection: "true positive",
      activity: "malicious",
      status: "escalated",
    },
    priority: {
      band: "P1",
      cell: "High/High",
      basis:
        "Escalation tripwire: criterion 1 confirmed at 09:24, at the end of Alert; criteria 2 and 3 confirmed at 11:05",
      clock:
        "P1: page immediately. Declared at 14:00, 4 hours 36 minutes after the tripwire was met",
    },
    decision: {
      move: "escalate",
      at: "14:00",
      summary:
        "Escalate to IR as a P1: page, warm handoff on IR's bridge, preservation, then reversible containment. The decision came 4 hours 36 minutes late.",
    },
    teaches:
      "The late P1: a confirmed criterion pages from the phase that confirms it, not after the loop finishes.",
    artifacts: [
      "Nine-section handoff packet (complete 14:40)",
      "Event report, linked to IR's report",
      "Detection-gap feedback: the rule's network leg read only the web proxy",
    ],
    turningPoints: [
      "Paging at 09:24, with preservation and containment by about 09:35, would very likely have made the 10:41 replay fail, because the sessions would have been revoked and sign-in blocked.",
      "An IR-approved purge in that window would likely have removed the message before the second finance user followed its link at 10:52.",
      "The replay found at 11:05 added criteria 2 and 3. It was not the trigger: the trigger was already met at 09:24.",
    ],
    stops: [
      {
        phase: "alert",
        href: ex("alert", "case-a"),
        at: "09:24",
        summary:
          "The execution chain is confirmed at High confidence: criterion 1 is met and the escalation tripwire should fire. The record flags it; nobody pages.",
      },
      {
        phase: "subject",
        href: ex("subject", "case-a"),
        at: "09:38",
        summary:
          "dlin, laptop-finance-09 and dlin's federated cloud identity are primary. Sign-ins are clean as of 09:33, and the tokens are presumed exposed.",
      },
      {
        phase: "scope",
        href: ex("scope", "case-a"),
        at: "09:50",
        summary:
          "Regulated data in reach is flagged and compliance is engaged at 09:45. The boundary records that the page was not sent.",
      },
      {
        phase: "uncover",
        href: ex("uncover", "case-a"),
        at: "13:05",
        summary:
          "11:05: the replayed session from 198.51.100.23 is found and criteria 2 and 3 are confirmed. A second laptop ran the same chain off-network and raised no alert.",
      },
      {
        phase: "risk",
        href: ex("risk", "case-a"),
        at: "13:55",
        summary:
          "High/High, P1, confidence High. Recommends: escalate now, preserve first, then reversible containment.",
      },
      {
        phase: "escalation",
        href: ex("escalation", "case-a"),
        at: "14:00",
        summary:
          "Escalate to IR. Paged at 14:01, acknowledged at 14:08, preservation 14:10 to 14:19, hosts isolated and sessions revoked 14:20 to 14:21.",
      },
      {
        phase: "documentation",
        href: ex("documentation", "case-a"),
        summary:
          "The triage-side event report is finalized and linked to IR's report; the detection gap goes to detection engineering.",
      },
    ],
  },
  {
    key: "B",
    slug: "case-b",
    label: "Case B",
    title: "The Cursor IDE Empire-pattern alert",
    premise:
      "An EDR behavioral rule first written for an Empire-family agent fires when the Cursor IDE's extension host opens encrypted connections from a developer's managed macOS laptop.",
    date: "2026-03-11",
    caseId: "CASE-20260311-017",
    depth:
      "Level 2 (crown-jewel access by the activity plausible until credential-path reads were ruled out)",
    verdict: {
      detection: "true positive",
      activity: "authorized (benign true positive)",
      status: "closed",
    },
    priority: {
      band: "P3",
      cell: "High/Low",
      basis:
        "Matrix cell: High impact (SSH keys reach the build environment), Low likelihood, High confidence",
      clock:
        "P3 on the high-impact clock: a four-hour forward watch, 14:03 to 18:03, as the named re-score trigger",
    },
    decision: {
      move: "close",
      at: "18:08",
      summary:
        "Documented close after the forward watch came back clean, through the five-item closure check. The SOC manager approved the High-impact close at 18:10.",
    },
    teaches:
      "The benign true positive: a correct detection of authorized activity, closed durably and fixed on the context side, not by loosening the rule.",
    artifacts: [
      "Event report under the decision header, with known-good indicators",
      "Alert-enrichment request (extension ID, child command line, destination set)",
      "Draft pattern entry PTN-031, keyed to the exact tuple",
    ],
    turningPoints: [
      "A helper child running code from outside the app bundle, or an extension not on the approved list, or a new MCP server configuration, or an agent command with no matching user prompt.",
      "A destination outside the vendor allowlist, or a Cursor binary with a signature that is not Anysphere's.",
      "Reads of credential paths, or LaunchAgent, LaunchDaemon or login-item writes, or the same behavior on a non-developer host.",
    ],
    stops: [
      {
        phase: "alert",
        href: ex("alert", "case-b"),
        at: "14:08",
        summary:
          "A signed, notarized chain; allowlisted destinations; a child running a script from inside the app bundle. No criterion confirmed or suspected; depth set to Level 2.",
      },
      {
        phase: "subject",
        href: ex("subject", "case-b"),
        at: "14:22",
        summary:
          "The installed version and hash match the vendor release. The user's SSH reach into the build environment drives impact; the extension layer stays open.",
      },
      {
        phase: "scope",
        href: ex("scope", "case-b"),
        at: "14:30",
        summary:
          "A narrow boundary, one extension-layer check, a count-only fleet query, and the four-hour forward watch that becomes the P3 trigger.",
      },
      {
        phase: "uncover",
        href: ex("uncover", "case-b"),
        at: "15:02",
        summary:
          "Extension, MCP and workspace-task inventory clean, and the agent's commands trace to the user's prompt; eleven peer Macs on the same build show the same behavior. Verdict ready at High confidence.",
      },
      {
        phase: "risk",
        href: ex("risk", "case-b"),
        at: "15:10",
        summary:
          "High impact, Low likelihood, High confidence: High/Low, P3 on the high-impact clock. Recommends: keep working to the forward watch, then close if clean.",
      },
      {
        phase: "escalation",
        href: ex("escalation", "case-b"),
        at: "18:08",
        summary:
          "15:11: the P3 hold is recorded. 18:05: the watch is clean and the cell unchanged. 18:08: documented close; no containment, so no handoff packet.",
      },
      {
        phase: "documentation",
        href: ex("documentation", "case-b"),
        summary:
          "The event report is finalized; the enrichment request and draft entry PTN-031 go to detection engineering, and the rule logic stays unchanged.",
      },
    ],
  },
  {
    key: "C",
    slug: "case-c",
    label: "Case C",
    title: "The replayed session on the mail tenant",
    premise:
      "An adversary-in-the-middle phishing kit captures a customer-success lead's session cookie; the session is replayed from a VPS to hide payment mail with an inbox rule and to consent a mail-reading OAuth app.",
    date: "2026-03-12",
    caseId: "CASE-20260312-022",
    depth: "Level 2",
    verdict: {
      detection: "true positive",
      activity: "malicious",
      status: "escalated",
    },
    priority: {
      band: "P1",
      cell: "High/High",
      basis:
        "Escalation tripwire: criterion 1 confirmed at 09:22, at the end of Alert; high-impact and exfiltration criteria confirmed at 10:08",
      clock:
        "P1: paged at 09:22, IR acknowledged at 09:28, inside the 15-minute fallback",
    },
    decision: {
      move: "escalate",
      at: "09:22",
      summary:
        "An early Escalation decision on the escalation tripwire: page IR, preserve, contain reversibly and verify, then the IR-approved resets. Initial packet at 09:28, complete packet at 10:24.",
    },
    teaches:
      "Ordered identity containment: preserve, contain reversibly, verify, then the approved non-reversible steps.",
    artifacts: [
      "Initial packet at the warm handoff (09:28) and the complete nine-section packet (10:24)",
      "Item-level message list to compliance (10:22)",
      "Event report, linked to IR's case",
    ],
    turningPoints: [
      "An alert on an MFA-satisfied sign-in from a hosting network within two minutes of a recorded link click would have fired at 08:53, ten minutes before the replay.",
      "A standalone alert on a session re-presented from a new network with no authentication ceremony would have paged at 09:03; a consent-grant alert for unverified publishers would have fired at 09:09.",
      "The control gaps go to IR's recommendations: push MFA that is not phishing-resistant, no token protection or compliant-device requirement, and user consent open to unverified publishers.",
    ],
    stops: [
      {
        phase: "alert",
        href: ex("alert", "case-c"),
        at: "09:22",
        summary:
          "A session minted through a hosting address 56 seconds after the click, then replayed from a VPS: criterion 1 confirmed, and the escalation tripwire fires at the end of Alert.",
      },
      {
        phase: "subject",
        href: ex("subject", "case-c"),
        at: "09:44",
        summary:
          "Scoping support under IR. A second user's password was relayed through the same proxy, MFA not completed; containment verified at 09:31.",
      },
      {
        phase: "scope",
        href: ex("scope", "case-c"),
        at: "09:58",
        summary:
          "Four primary entities, the inbox rule as an artifact, the CRM downstream. Compliance engaged with 09:22 on record as the candidate awareness time.",
      },
      {
        phase: "uncover",
        href: ex("uncover", "case-c"),
        at: "10:16",
        summary:
          "About 1,800 messages read by the app, billing threads included, and two payment searches. High-impact and exfiltration criteria confirmed and sent to IR at 10:08.",
      },
      {
        phase: "risk",
        href: ex("risk", "case-c"),
        at: "10:20",
        summary:
          "High/High, P1, and P1 by criterion. Recommends app blocking, consent restricted to verified publishers, and phishing-resistant MFA.",
      },
      {
        phase: "escalation",
        href: ex("escalation", "case-c"),
        at: "09:22",
        summary:
          "Records the 09:22 escalation, the two packet passes and the communication record, kept off the compromised mail tenant.",
      },
      {
        phase: "documentation",
        href: ex("documentation", "case-c"),
        summary:
          "The triage-side record closes and links to IR's open case; compliance works from the message list.",
      },
    ],
  },
  {
    key: "D",
    slug: "case-d",
    label: "Case D",
    title: "The burst that never happened",
    premise:
      "A seven-hour identity-log backlog arrives in 54 seconds and fires a password-burst rule; under the data error sits one real, unexplained sign-in attempt that carried the user's current password.",
    date: "2026-09-23",
    caseId: "CASE-2026-0923-004",
    alertId: "ALERT-2026-0923-0117",
    depth: "Level 1 throughout",
    verdict: {
      detection: "false positive (data)",
      activity: "undetermined",
      status: "closed",
    },
    priority: {
      band: "P4",
      cell: "Medium/Low",
      basis:
        "P2 on the first scoring (09:40), handed back by Tier 2 (10:27), P3 on named triggers (10:41), P4 on re-score (18:06)",
      clock:
        "P3: re-score within 24 hours on named triggers, then P4: documented close within the queue SLA",
    },
    decision: {
      move: "close",
      at: "18:20",
      summary:
        "Documented close with the activity verdict still undetermined: gaps named, the exposure removed (password changed), reopen triggers written.",
    },
    teaches:
      "The data false positive, the open P3, the handback, and a close on an undetermined verdict.",
    artifacts: [
      "Alert report with the hypothesis ledger and both priority changes",
      "Tier 2 handback receipt and the shift-handover line",
      "Tuning request DE-0418 (parser fix and connector-lag alert)",
    ],
    turningPoints: [
      "The phone's blocked refreshes coming from 203.0.113.163 would have put her phone and the 05:46 device on one network: benign-confirmed by mid-morning, without the P3.",
      'A plain "no, I didn\'t try to sign in anywhere" would have made likelihood High on evidence: Medium/High, P2, escalate within 4 hours, with the password change first.',
      "An approved push, a second password success or an MFA method added from a new address would have confirmed criterion 1, and the escalation tripwire would have made the case P1.",
    ],
    page: "/docs/cases/case-d/",
    packet: "/templates/exercise-case-d.md",
    stops: [
      {
        phase: "alert",
        href: "/docs/cases/case-d/#alert-an-arrival-not-a-burst",
        at: "08:19",
        summary:
          "Event time against ingest time shows an arrival, not a burst: false positive (data) at High confidence. The activity question stays open.",
      },
      {
        phase: "subject",
        href: "/docs/cases/case-d/#subject-and-scope-one-sweep",
        summary:
          "Three strands: her phone blocked by policy, her laptop's normal success, and three attempts from a new hosting address, the third with her current password.",
      },
      {
        phase: "scope",
        href: "/docs/cases/case-d/#subject-and-scope-one-sweep",
        summary:
          "One identity, one indicator, a 24-hour forward watch, and a written boundary on evidence quality: every identity rule was blind, then mistimed, overnight.",
      },
      {
        phase: "uncover",
        href: "/docs/cases/case-d/#uncover-the-one-question",
        summary:
          "Who typed her password at 05:48? The ledger keeps two hypotheses open; the user is unreachable until evening.",
      },
      {
        phase: "risk",
        href: "/docs/cases/case-d/#risk-second-pass-p3-on-named-triggers",
        at: "10:41",
        summary:
          "First pass read missing evidence as High (P2). After the handback: Medium/Medium, confidence Low, P3 on three named triggers.",
      },
      {
        phase: "escalation",
        href: "/docs/cases/case-d/#escalation-decision-a-documented-close-undetermined",
        at: "18:20",
        summary:
          "The P2 escalation comes back with a reason; at 18:06 the re-score reads Medium/Low, P4, and the case closes undetermined through the closure check.",
      },
      {
        phase: "documentation",
        href: "/docs/cases/case-d/#documentation-what-one-false-positive-found",
        summary:
          "The pipeline fix, the connector-lag alert, the re-run of the blind window, and the handback counted by reason in the monthly report.",
      },
    ],
  },
];

export const caseByKey = (key: CaseKey): CaseFileData => {
  const found = cases.find((c) => c.key === key);
  if (!found) throw new Error(`cases: no case ${key}`);
  return found;
};

/** The stop for one case in one phase, for "previously" lines on chapter pages. */
export const caseStop = (key: CaseKey, phase: PhaseKey): CaseStop | undefined =>
  caseByKey(key).stops.find((s) => s.phase === phase);

/** Hub anchor for a case on /docs/cases/. */
export const caseHubHref = (key: CaseKey): string =>
  `/docs/cases/#${caseByKey(key).slug}`;

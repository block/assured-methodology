/**
 * Auto-generated glossary registry.
 * Sources: clear.mdx, assured.mdx, bad.mdx, cat.mdx. Extracted via
 * scripts/extract-glossary.mjs. Edit the source MDX files, then run
 * `node scripts/extract-glossary.mjs`. Only the `glossary` record is
 * generated; this interface and lookupTerm() are maintained by hand.
 */

export interface GlossaryEntry {
  term: string;
  definition: string;
  source:
    | "clear"
    | "assured"
    | "bad-term"
    | "bad-actor"
    | "bad-campaign"
    | "bad-family"
    | "bad-feature"
    | "cat-tool";
  /** Set on an alias record: the entry this name stands for (a B.A.D.
   *  actor's other vendor name, or a retired key). */
  aliasOf?: string;
  /** A term ASSURED coined or uses in its own sense (the ASSURED terms
   *  glossary, or a C.L.E.A.R. entry carrying the method tag). */
  methodTerm?: boolean;
}

export const glossary: Record<string, GlossaryEntry> = {
  "AD CS Abuse": {
    "term": "AD CS Abuse",
    "definition": "Abusing misconfigured Active Directory Certificate Services templates or enrollment endpoints (the ESC1 to ESC8 family) to obtain a certificate that authenticates as another user, often a domain admin. Certificates outlive password resets, so revoke them during remediation.",
    "source": "bad-term"
  },
  "AI Agent": {
    "term": "AI Agent",
    "definition": "An AI system, usually built on a large language model, that plans and takes multi-step actions through tools: running queries, reading mailboxes, calling APIs, executing commands. In triage it is both a helper and a subject. As a helper, its tool access makes it attack surface, since text it reads can carry instructions (prompt injection, in the B.A.D. glossary). As a subject, an agent with delegated access is a non-human identity whose actions need the same Subject analysis as any service account. See AI-assisted triage. See Governing automated triage.",
    "source": "clear"
  },
  "AI Agent Abuse": {
    "term": "AI Agent Abuse",
    "definition": "Hijacking or misusing an AI agent's tool access (mail, files, code execution, APIs) so it acts for the attacker, usually through prompt injection in content it reads, a poisoned tool or MCP server, or stolen agent credentials. The agent's permissions become the attacker's, and its actions look like normal automation.",
    "source": "bad-term"
  },
  "AI SOC agents (concept)": {
    "term": "AI SOC agents (concept)",
    "definition": "Software agents that take an alert, gather context through connected tools, and propose or record a verdict without an analyst driving each step.",
    "source": "cat-tool"
  },
  "AI/ML (Artificial Intelligence / Machine Learning)": {
    "term": "AI/ML (Artificial Intelligence / Machine Learning)",
    "definition": "Machine learning has long powered anomaly and UEBA detections. Since 2023, large language models (LLMs) and AI agents also summarize alerts, draft queries and propose verdicts. ASSURED's rule: accountability is never delegated. An assistant drafts and the analyst decides; a machine may close a case only at Level 0 parity, under a governed pattern entry. Verify every specific an LLM supplies, and treat an assistant with tool access as attack surface. See AI-assisted triage. See Governing automated triage.",
    "source": "clear"
  },
  "APT10": {
    "term": "APT10",
    "definition": "Chinese state-sponsored group associated with global IP theft. Its Cloud Hopper campaign targeted managed service providers (MSPs) to compromise downstream customers. It has focused on healthcare, defense, aerospace and technology, using RedLeaves, custom loaders, spear-phishing, credential theft, and cloud-service abuse aligned with China's economic and military goals.",
    "source": "bad-actor"
  },
  "APT28": {
    "term": "APT28",
    "definition": "Linked to Russia's GRU and known for aggressive operations: credential harvesting, malware deployment, and destructive attacks against political and military targets. Tied to the 2016 DNC breach and many NATO-related campaigns. It uses zero-days and weaponized Office documents, and is noisier and more direct than APT29; a primary actor in Russian hybrid warfare.",
    "source": "bad-actor"
  },
  "APT29": {
    "term": "APT29",
    "definition": "Sophisticated espionage group associated with Russia's SVR, built for stealth and long-term access. It targets governments, think tanks, healthcare and vaccine researchers. It is the group behind the SolarWinds SUNBURST compromise (tracked by Mandiant as UNC2452 until it was merged into APT29 in April 2022). Custom malware, living-off-the-land and well-crafted spear-phishing let its operations go undetected for months. As Midnight Blizzard (Microsoft's name), it breached Microsoft's own corporate email in 2023-2024 by password-spraying a legacy test tenant.",
    "source": "bad-actor"
  },
  "APT33": {
    "term": "APT33",
    "definition": "Iranian government-linked group targeting aerospace, energy, and critical infrastructure. It mixes espionage with destructive tooling: ATT&CK links it to the StoneDrill wiper and, tentatively, to the 2019 DEADWOOD wiper (since adopted by Agrius), and industry reporting has suspected ties to later Shamoon waves. Its phishing has used fake aviation job postings. As Peach Sandstorm (Microsoft), it ran password-spray campaigns against thousands of organizations from 2023 and deployed the custom Tickler backdoor in 2024.",
    "source": "bad-actor"
  },
  "APT35": {
    "term": "APT35",
    "definition": "Iranian group conducting espionage against academics, human rights activists, and government entities through phishing, fake social personas and credential harvesting. It is known for impersonating journalists and think tanks, has supported Iran's surveillance and foreign intelligence collection for over a decade, and is still active.",
    "source": "bad-actor",
    "aliasOf": "Charming Kitten"
  },
  "APT44": {
    "term": "APT44",
    "definition": "Destructive GRU unit behind the 2015 / 2016 Ukraine power grid attacks (BlackEnergy, Industroyer) and the global NotPetya wiper. Its tools include VPNFilter, KillDisk and Cyclops Blink. It specializes in industrial control system and operational technology (ICS/OT) disruption, hybrid warfare, and psychological operations aligned with Russian military objectives.",
    "source": "bad-actor",
    "aliasOf": "Sandworm"
  },
  "AS-REP Roasting": {
    "term": "AS-REP Roasting",
    "definition": "Requesting Kerberos authentication data for accounts that have pre-authentication disabled, then cracking it offline to recover the password.",
    "source": "bad-term"
  },
  "ASSURED Methodology": {
    "term": "ASSURED Methodology",
    "definition": "A structured approach to security event triage in seven phases (Alert, Subject, Scope, Uncover, Risk, Escalation decision, Documentation), grouped into three stages: Orient (A, S, S), Investigate (U, R) and Resolve (E, D). It pairs the phases with the fast path's depth ladder (Level 0, 1, 2), so routine cases close quickly and risky ones get the full arc; with the RATM for scoring risk; and with pre-committed escalation criteria and the escalation tripwire. The unit of work is the case, not the alert. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "ATT&CK Procedure": {
    "term": "ATT&CK Procedure",
    "definition": "The specific way a particular adversary or tool implemented a technique in the wild, as recorded in ATT&CK's procedure examples: the actual command line, the exact registry key. Procedures are the most specific layer of TTPs, the easiest for a defender to match, and the easiest for an attacker to change.",
    "source": "clear"
  },
  "ATT&CK Tactic": {
    "term": "ATT&CK Tactic",
    "definition": "An adversary goal in an ATT&CK matrix, the \"why\" behind a technique: Initial Access, Execution, Persistence, Stealth, Exfiltration, Impact and the rest. Enterprise ATT&CK v19 has 15 tactics, with IDs in the form TA0001. Tactics are an unordered set; a real intrusion may skip or revisit them.",
    "source": "clear"
  },
  "ATT&CK Technique": {
    "term": "ATT&CK Technique",
    "definition": "How an adversary achieves a tactic's goal, such as T1059 Command and Scripting Interpreter. Many techniques have sub-techniques that name a specific variant, written T####.### (T1059.001 is PowerShell). A technique can serve more than one tactic. Mapping an alert to a technique names the behavior; it does not score it.",
    "source": "clear"
  },
  "AWS CloudTrail": {
    "term": "AWS CloudTrail",
    "definition": "Records API activity in an AWS account: the audit trail for security and forensic work. Management events are on by default (90 days in Event history); data events such as S3 object reads and Lambda invokes must be enabled on a trail or event data store.",
    "source": "cat-tool"
  },
  "AWS Security Hub": {
    "term": "AWS Security Hub",
    "definition": "AWS service that aggregates findings from GuardDuty, Inspector, Macie and partner tools and runs posture checks against security standards across accounts.",
    "source": "cat-tool"
  },
  "AWS VPC Flow Logs": {
    "term": "AWS VPC Flow Logs",
    "definition": "Per-interface records of accepted and rejected IP traffic in a VPC: addresses, ports, protocol, bytes, packets and action. The cloud's NetFlow.",
    "source": "cat-tool"
  },
  "Abnormal AI": {
    "term": "Abnormal AI",
    "definition": "API-based email security that models normal sender and recipient behavior to catch business email compromise, vendor fraud and account takeover in cloud mailboxes.",
    "source": "cat-tool"
  },
  "Abuse.ch": {
    "term": "Abuse.ch",
    "definition": "Malware-infrastructure tracking project (a research project at Bern University of Applied Sciences; Spamhaus is its primary data licensee). Platforms: MalwareBazaar (samples), URLhaus (malware URLs), ThreatFox (indicators of compromise, IOCs), Feodo Tracker (botnet command-and-control, C2), SSLBL (malicious certificates and JA3) and YARAify, plus a unified Hunting search. Free for commercial and non-commercial use; the APIs take a free personal Auth-Key.",
    "source": "cat-tool"
  },
  "AbuseIPDB": {
    "term": "AbuseIPDB",
    "definition": "Community database of IP addresses reported for abuse (scanning, brute force, spam), with report counts, categories and a confidence-of-abuse score.",
    "source": "cat-tool"
  },
  "Account Enumeration": {
    "term": "Account Enumeration",
    "definition": "Discovering valid usernames, either externally by probing authentication responses (Reconnaissance, T1589) or internally by listing domain/cloud accounts after access (Discovery, T1087).",
    "source": "bad-term"
  },
  "Account Takeover": {
    "term": "Account Takeover",
    "definition": "Adversary gains unauthorized control of a user's account using stolen credentials or session tokens to impersonate the user.",
    "source": "bad-term"
  },
  "Acronis Cyber Protect (formerly Cyber Backup)": {
    "term": "Acronis Cyber Protect (formerly Cyber Backup)",
    "definition": "Backup with integrated anti-malware; blockchain-based notarization and broad workload coverage.",
    "source": "cat-tool"
  },
  "Actionability": {
    "term": "Actionability",
    "definition": "Alerts whose activity verdict is malicious or policy violation, divided by alerts with a verdict. Beside precision, it separates rules that need exceptions or enrichment from rules that need logic fixes. Detection engineering's per-rule variant counts fires that needed any action beyond the close. See Measuring triage.",
    "source": "clear"
  },
  "Active Directory": {
    "term": "Active Directory",
    "definition": "Microsoft's on-premises directory service: domains, users, groups, Group Policy and Kerberos/NTLM authentication for Windows estates.",
    "source": "cat-tool"
  },
  "Acunetix": {
    "term": "Acunetix",
    "definition": "Automated web vulnerability scanner for SQL injection (SQLi), cross-site scripting (XSS), misconfig, and modern-web/SPA technologies.",
    "source": "cat-tool"
  },
  "Admiralty Code": {
    "term": "Admiralty Code",
    "definition": "A two-character grading scheme for intelligence: a letter for source reliability (A, completely reliable, to E, unreliable, with F for cannot be judged) and a number for information credibility (1, confirmed by other sources, to 5, improbable, with 6 for cannot be judged). A B2 report comes from a usually reliable source and is probably true. Grade before acting, and record the grade with the indicator.",
    "source": "clear"
  },
  "Admission Gate": {
    "term": "Admission Gate",
    "definition": "In ASSURED, the seven organizational checks an AI assistant must pass before any case data reaches it, from an approved provider and data boundaries to least privilege with no outbound channel and a recorded human authorization. If any check is unapproved or unknown, the work follows the non-AI path. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Advanced Persistent Threat (APT)": {
    "term": "Advanced Persistent Threat (APT)",
    "definition": "A sophisticated, well-resourced adversary, often state-sponsored, that gains and maintains prolonged, covert unauthorized access to a network while avoiding detection. The term names the actor; the campaign it runs is APT activity. Vendors track the same group under different names: numbered APT groups for well-established actors, and provisional labels such as Mandiant's UNC clusters or Microsoft's Storm- names for activity not yet tied to a known group.",
    "source": "bad-term"
  },
  "Adversary Emulation Plan": {
    "term": "Adversary Emulation Plan",
    "definition": "A step-by-step replay of one threat group's documented procedures, used to test detections and produce realistic telemetry, such as the Center for Threat-Informed Defense's APT29 plan. See Telemetry labs.",
    "source": "clear"
  },
  "Adversary-in-the-Middle (AiTM)": {
    "term": "Adversary-in-the-Middle (AiTM)",
    "definition": "A phishing technique in which a kit relays the victim's real sign-in through an attacker-run proxy, capturing the password and the session cookie the identity provider issues after MFA. The attacker then replays the cookie from their own infrastructure, so MFA is satisfied once, by the victim, and never asked again. Push, SMS and OTP factors do not stop it; phishing-resistant factors (FIDO2 security keys, passkeys) do, because they are bound to the real site's origin. Triage tells: a sign-in from a hosting ASN minutes after the user's own, the same session presented from two networks, and a newly registered lookalike domain in the click path. ATT&CK T1557, ATT&CK T1539.",
    "source": "clear"
  },
  "Adware": {
    "term": "Adware",
    "definition": "Malware that displays unwanted advertisements, often bundled with legitimate software. Advanced adware can harvest data or serve as a delivery mechanism for more serious malware.",
    "source": "bad-term"
  },
  "Agenda": {
    "term": "Agenda",
    "definition": "Ransomware-as-a-service operation, also called Agenda, active since at least 2022, with Go and later Rust encryptors for Windows, Linux and VMware ESXi. Its June 2024 attack on Synnovis, a pathology provider to London NHS hospitals, halted blood testing and forced postponed operations and appointments. Several trackers ranked it the most active ransomware brand of 2025, helped by affiliates arriving from disrupted operations.",
    "source": "bad-actor",
    "aliasOf": "Qilin"
  },
  "Agentic AI": {
    "term": "Agentic AI",
    "definition": "Describes an AI system that plans and takes multi-step actions through tools (running queries, calling APIs, writing to systems) toward a goal, rather than answering a single prompt. Agentic triage tools enrich, query and draft verdicts on their own. In ASSURED they stay advisory above Level 0 parity, and their tool access is attack surface. See AI Agent and AI-assisted triage.",
    "source": "clear"
  },
  "AiTM Phishing": {
    "term": "AiTM Phishing",
    "definition": "Adversary-in-the-middle phishing: a kit proxies the real login page, so the victim completes their own password and MFA prompts while the proxy captures the resulting session cookie.",
    "source": "bad-term"
  },
  "Akira": {
    "term": "Akira",
    "definition": "Ransomware operation active since March 2023 that hits small and mid-sized organizations across most sectors. CISA's advisory, updated in November 2025, lists its usual ways in: VPNs without MFA, and exploitation of Cisco ASA and FTD (CVE-2020-3259, CVE-2023-20269), SonicWall (CVE-2024-40766) and Veeam backup servers (CVE-2023-27532, CVE-2024-40711). It encrypts Windows, Linux and VMware ESXi hosts, added Nutanix AHV in 2025, and practices double extortion.",
    "source": "bad-actor"
  },
  "Alert": {
    "term": "Alert",
    "definition": "An automated notification produced when detection logic decides an event might be malicious, anomalous, or in violation of policy. The detection engine's hypothesis, not a verdict; the analyst makes the call.",
    "source": "clear"
  },
  "Alert De-duplication": {
    "term": "Alert De-duplication",
    "definition": "Consolidating identical or related alerts into one queue item so the same activity is not triaged twice. ASSURED goes further: alerts that share an entity and time window, a campaign indicator or a vendor incident ID form one case, and the case is the unit of work. See Case.",
    "source": "clear"
  },
  "Alert Fatigue": {
    "term": "Alert Fatigue",
    "definition": "The loss of attention that sets in when analysts face more alerts than they can judge carefully: checks get skipped and real intrusions get waved through as noise. The fixes are upstream (tuning, grouping alerts into cases, a governed Level 0 path), not exhortation. A rising close rate on one rule with ever-shorter close notes is an early sign.",
    "source": "clear"
  },
  "Alert Parsing": {
    "term": "Alert Parsing",
    "definition": "Parsing applied to an alert: breaking it into its fields (user, host, process, command line, time) before judging it. See Parsing.",
    "source": "clear"
  },
  "Alert Validation": {
    "term": "Alert Validation",
    "definition": "The Alert-phase step that asks whether the detection's reasons are supported by the evidence around it, before the analyst commits investigation time. Outcomes: likely true positive (proceed), benign true positive (document the authorized context), false positive (route to tuning), or cannot tell yet (proceed with the gap recorded).",
    "source": "clear"
  },
  "Alerting and Detection Strategy (ADS)": {
    "term": "Alerting and Detection Strategy (ADS)",
    "definition": "Palantir's documentation framework for a single detection (2017, MIT-licensed), in nine sections: Goal, Categorization, Strategy Abstract, Technical Context, Blind Spots and Assumptions, False Positives, Validation, Priority and Response. Alert reads it as the detection logic. An ADS describes one rule; a pattern entry is a governed close decision with discriminators, an owner and a second approver. See Standards mapping.",
    "source": "clear"
  },
  "Amazon CloudWatch": {
    "term": "Amazon CloudWatch",
    "definition": "Monitoring and observability for AWS resources and applications; metrics, logs, alarms, automation hooks.",
    "source": "cat-tool"
  },
  "Amazon GuardDuty": {
    "term": "Amazon GuardDuty",
    "definition": "AWS-native threat detection; analyzes CloudTrail management events, VPC Flow Logs, and Route 53 Resolver DNS logs (plus optional protection plans) to raise findings. A detection layer, not the audit record.",
    "source": "cat-tool"
  },
  "Amazon Security Lake": {
    "term": "Amazon Security Lake",
    "definition": "AWS service that centralizes security logs (CloudTrail, VPC Flow Logs, Route 53, Security Hub findings and third-party sources) into an S3-based data lake normalized to OCSF.",
    "source": "cat-tool"
  },
  "Analysis of Competing Hypotheses (ACH)": {
    "term": "Analysis of Competing Hypotheses (ACH)",
    "definition": "A structured analytic technique from Richards Heuer's Psychology of Intelligence Analysis (CIA, 1999): list every reasonable hypothesis, score each piece of evidence against all of them, and favor the hypothesis with the least evidence against it rather than the most evidence for it. ASSURED's hypothesis ledger is a lightweight form of it. See Cognitive traps.",
    "source": "clear"
  },
  "Analyst Burnout": {
    "term": "Analyst Burnout",
    "definition": "Exhaustion from sustained alert volume, night shifts and high-stakes calls. In triage it shows up as shortened investigations, skipped documentation, and attrition that takes institutional memory with it. Treat it as an operational risk, measured through queue load and shift patterns and fixed with tuning and staffing, not as a personal failing.",
    "source": "clear"
  },
  "Anchor Exemplar": {
    "term": "Anchor Exemplar",
    "definition": "A written example of work at a known score, annotated against the grading grid, used to calibrate graders before they score. See Anchor exemplars.",
    "source": "clear"
  },
  "Anchoring": {
    "term": "Anchoring",
    "definition": "A cognitive trap: over-weighting the first piece of information (the alert name, the vendor severity, the first hypothesis) and adjusting too little as evidence arrives. It bites in Alert and carries everywhere. Counter: write down the leading alternative explanation before testing the first. At a shift change or an escalation it takes the form of handoff anchoring: the receiver inherits the sender's story as a finding. See Cognitive traps.",
    "source": "clear"
  },
  "Anomali ThreatStream": {
    "term": "Anomali ThreatStream",
    "definition": "Commercial TIP: collects, analyzes, and prioritizes threat data with enrichment and risk scoring; integrates with existing security stacks.",
    "source": "cat-tool"
  },
  "Anomaly": {
    "term": "Anomaly",
    "definition": "An observation that deviates from an established baseline. Anomalies are statistical, not inherently malicious; an analyst still has to decide whether the deviation matters.",
    "source": "clear"
  },
  "Anomaly-Based Detection": {
    "term": "Anomaly-Based Detection",
    "definition": "One of the four detection families ASSURED teaches: the engine learns a baseline and alerts on deviations from it. It can catch activity no signature describes, at the price of firing on legitimate change. Ask what baseline the engine used and how long it had to learn. See Anomaly-based detection.",
    "source": "clear"
  },
  "Ansible": {
    "term": "Ansible",
    "definition": "Open-source automation for config management, deployment, and orchestration via YAML playbooks.",
    "source": "cat-tool"
  },
  "Ansible Automation Platform (formerly Ansible Tower)": {
    "term": "Ansible Automation Platform (formerly Ansible Tower)",
    "definition": "Red Hat's enterprise Ansible: automation controller (web UI/API, RBAC, scheduling) over playbooks; upstream project is AWX.",
    "source": "cat-tool"
  },
  "Any.Run": {
    "term": "Any.Run",
    "definition": "Interactive malware sandbox with behavioral and network analysis. Free-tier submissions and reports are public; use a private plan or an internal sandbox (CAPEv2) for anything from a targeted intrusion or containing internal data.",
    "source": "cat-tool"
  },
  "AnyDesk": {
    "term": "AnyDesk",
    "definition": "Commercial remote-desktop application, widely used for IT support and widely abused for hands-on-keyboard access.",
    "source": "cat-tool"
  },
  "App Password": {
    "term": "App Password",
    "definition": "A legacy per-application password for clients that cannot do modern authentication or MFA. On Microsoft Entra ID a password reset does not revoke it, so the sweep lists and removes app passwords explicitly. See Identity-persistence sweep.",
    "source": "clear"
  },
  "Application Programming Interface (API)": {
    "term": "Application Programming Interface (API)",
    "definition": "An interface a service exposes for programmatic access, typically authenticated with keys, tokens, or certificates instead of an interactive login. In cloud and SaaS triage the API audit log is often the only record of what a stolen credential actually did, since an attacker holding a valid key or token never touches a login page and sidesteps login-centric controls such as MFA.",
    "source": "clear"
  },
  "Application Shimming": {
    "term": "Application Shimming",
    "definition": "Abuses the Windows Application Compatibility Infrastructure (shims) to inject malicious code or maintain persistence. An ATT&CK Persistence and Privilege Escalation technique.",
    "source": "bad-term"
  },
  "Application-Layer Protocol": {
    "term": "Application-Layer Protocol",
    "definition": "A protocol at the top of the network stack that applications speak directly: HTTP, DNS, SMTP, SMB. Triage cares because adversaries tunnel command-and-control and exfiltration through these common protocols to blend with legitimate traffic, which is why destination and payload matter more than port alone.",
    "source": "clear"
  },
  "Archive Collected Data": {
    "term": "Archive Collected Data",
    "definition": "Compressing and often password-protecting collected files (7-Zip, WinRAR, tar) before exfiltration, which shrinks transfers and hides content from inspection.",
    "source": "bad-term"
  },
  "Arcserve UDP": {
    "term": "Arcserve UDP",
    "definition": "Unified data protection with replication, HA, and ransomware-resistant immutable storage.",
    "source": "cat-tool"
  },
  "Arctic Wolf": {
    "term": "Arctic Wolf",
    "definition": "MDR provider with its own Aurora platform and a named \"concierge\" security team per customer.",
    "source": "cat-tool"
  },
  "Arkime": {
    "term": "Arkime",
    "definition": "Open-source full-packet-capture indexing and search system (formerly Moloch): stores PCAP and session metadata so analysts can search and pull the exact packets of a session.",
    "source": "cat-tool"
  },
  "Artifacts": {
    "term": "Artifacts",
    "definition": "Traces that activity leaves on a system: prefetch and Amcache entries, registry keys, shell and browser history, log records, files in temporary folders. Uncover uses them to reconstruct what ran when live telemetry did not capture it. Many are overwritten quickly, so collect the volatile ones first (see Order of Volatility).",
    "source": "clear"
  },
  "Asset": {
    "term": "Asset",
    "definition": "Something the organization owns, depends on, or is accountable for: data, a system, an identity, a credential, or a service. An asset's criticality is what turns a generic alert into a prioritized one.",
    "source": "clear"
  },
  "Asset Criticality": {
    "term": "Asset Criticality",
    "definition": "The level of importance or sensitivity of an asset, which determines the level of protection it requires. In ASSURED, asset criticality is one of the four RATM dimensions; with business impact it sets the impact axis (impact is the higher of the two). Score the highest-value asset in confirmed reach, not just the entry point. See the priority matrix.",
    "source": "clear"
  },
  "Assumed-Role Session": {
    "term": "Assumed-Role Session",
    "definition": "In AWS, the temporary STS credentials issued when a principal assumes a role. Using one session to assume another role is role chaining, which caps the session at one hour. Trace the chain back through CloudTrail to the original principal. See Non-human identities and cloud roles.",
    "source": "clear"
  },
  "Atomic Red Team": {
    "term": "Atomic Red Team",
    "definition": "Open-source library of small, ATT&CK-mapped tests that reproduce individual techniques so teams can check whether detections fire.",
    "source": "cat-tool"
  },
  "Attack Chain": {
    "term": "Attack Chain",
    "definition": "The sequence of steps an attacker takes from initial access to their objective. Lockheed Martin's Cyber Kill Chain models it as seven ordered phases. MITRE ATT&CK's tactics are an unordered set of adversary goals that a real intrusion may skip or revisit, and the Unified Kill Chain merges the two views. Either lens lets defenders intervene at any link, not only the first.",
    "source": "clear"
  },
  "Attack Patterns": {
    "term": "Attack Patterns",
    "definition": "Recurring ways adversaries reach a goal, described independently of any one tool. MITRE's CAPEC catalogs them for application attacks, and ATT&CK techniques play the same role for intrusions. Naming the pattern behind an alert tells the analyst which follow-on activity to look for.",
    "source": "clear"
  },
  "Attack Vector": {
    "term": "Attack Vector",
    "definition": "The entry point an attacker uses to reach a target: a phishing email, an exposed RDP port, a third-party vendor with trusted access, a misconfigured cloud bucket. Each vector implies a different control to harden.",
    "source": "clear"
  },
  "Attorney-Client Privilege and Work Product": {
    "term": "Attorney-Client Privilege and Work Product",
    "definition": "Two legal protections for investigation material: privilege covers confidential communications with counsel for legal advice, and work product covers materials prepared at counsel's direction in anticipation of litigation. Facts are never privileged, and marking a document \"privileged\" does not create the protection; broad distribution can waive it. Record facts in full, keep legal conclusions out of the record, and follow counsel's instructions once counsel directs the investigation. See Writing for discovery.",
    "source": "clear"
  },
  "Attribute-Based Access Control (ABAC)": {
    "term": "Attribute-Based Access Control (ABAC)",
    "definition": "Access decisions computed from attributes of the user, the resource and the context (department, data classification, device compliance, location) rather than from role membership alone. Conditional Access policies are the form analysts meet most. To explain a grant or a denial, pull the attribute values as they were at the event time.",
    "source": "clear"
  },
  "Authentication": {
    "term": "Authentication",
    "definition": "Proving who you are to a system: a password, a hardware token, a biometric, a certificate. Distinct from authorization, which is what that identity is then allowed to do.",
    "source": "clear"
  },
  "Authorization": {
    "term": "Authorization",
    "definition": "Deciding what an authenticated identity may do: which resources, which actions, under which conditions. Distinct from authentication, which proves who the identity is. In Subject analysis authorization is its own dimension: a correctly authenticated user doing something their role should not allow is an authorization finding. See Four Dimensions.",
    "source": "clear"
  },
  "Automation": {
    "term": "Automation",
    "definition": "Technology that performs security tasks with little human intervention: enrichment, correlation, routing, containment actions and, under governance, closes. In ASSURED, accountability is never delegated; execution may be, at Level 0 parity, when the pattern entry carries a machine-close flag, code evaluates the discriminators and the eligibility gate, humans sample the closes, reversal and miss rates are tracked, and a kill switch and a named owner exist. See the fast path.",
    "source": "clear"
  },
  "Automation Bias": {
    "term": "Automation Bias",
    "definition": "The tendency to accept a machine's output (an AI assistant's summary, a SOAR enrichment, a vendor severity) without checking it, and to miss what it left out. The more fluent the output, the stronger the pull. In ASSURED the analyst verifies an assistant's specifics against raw telemetry before they reach the record. See Cognitive traps.",
    "source": "clear"
  },
  "Autonomous System Number (ASN)": {
    "term": "Autonomous System Number (ASN)",
    "definition": "A globally unique number identifying a network routed under a single operator, such as an ISP, cloud provider, or hosting company. During enrichment the ASN behind an IP address tells the analyst who operates it, which is how a connection resolves to a residential ISP, a corporate egress, or a hosting range with a reputation for abuse.",
    "source": "clear"
  },
  "Autopsy": {
    "term": "Autopsy",
    "definition": "Open-source forensics platform on The Sleuth Kit; timeline analysis, keyword search, file carving, media analysis.",
    "source": "cat-tool"
  },
  "Availability Bias": {
    "term": "Availability Bias",
    "definition": "Judging how likely an explanation is by how easily an example comes to mind, such as last week's incident or a recent headline. It bites in Subject and Risk. Counter: check the base rate in your own data before scoring.",
    "source": "clear"
  },
  "Awareness (GDPR)": {
    "term": "Awareness (GDPR)",
    "definition": "The moment a GDPR controller becomes aware of a personal-data breach, which starts the 72-hour clock to notify the supervisory authority (Art. 33). The EDPB treats awareness as a reasonable degree of certainty that a security incident has compromised personal data (Guidelines 9/2022), not final confirmation. A short investigation to establish that is allowed, but the clock does not wait for the case to close, so record the awareness timestamp in the case.",
    "source": "clear"
  },
  "Azure Activity Log": {
    "term": "Azure Activity Log",
    "definition": "Azure's subscription-level control-plane log: who created, changed or deleted which resource, and role assignments.",
    "source": "cat-tool"
  },
  "BITSAdmin": {
    "term": "BITSAdmin",
    "definition": "A command-line tool for Background Intelligent Transfer Service (BITS) jobs, deprecated in favor of PowerShell's BITS cmdlets but still present on Windows. Defenders watch it because attackers use BITS jobs to download payloads and persist (ATT&CK T1197). Tell: bitsadmin /transfer jobs pulling from external URLs, or a job set to run a program when its transfer completes.",
    "source": "clear"
  },
  "Backdoors": {
    "term": "Backdoors",
    "definition": "Malicious code that provides unauthorized access to a compromised system, bypassing normal authentication. Often installed post-exploitation to maintain persistent remote control.",
    "source": "bad-term"
  },
  "Banker Trojans": {
    "term": "Banker Trojans",
    "definition": "Malware designed to steal banking credentials and financial information by intercepting login sessions, injecting fake forms, or logging keystrokes. Often targets online banking and payment systems.",
    "source": "bad-term"
  },
  "Base-Rate Neglect": {
    "term": "Base-Rate Neglect",
    "definition": "A cognitive trap: judging how likely an explanation is from how well the evidence fits it, while ignoring how common it is to begin with. A detection that is 99% accurate on behavior that is benign 999 times in 1,000 still produces mostly false alarms. It bites in Risk. Counter: ask how often this alert, on this population, has turned out malicious before. See Cognitive traps.",
    "source": "clear"
  },
  "Base64 Encoding": {
    "term": "Base64 Encoding",
    "definition": "A binary-to-text encoding using 64 printable characters, common in legitimate data transfer and in attacker payloads. It hides nothing from an analyst who decodes it. Tells: PowerShell's -EncodedCommand carries Base64 of UTF-16LE text (decoded, every other byte is a null), and long Base64 blobs in command lines, scripts or DNS labels are worth decoding before judging.",
    "source": "clear"
  },
  "Baselining": {
    "term": "Baselining",
    "definition": "Measuring what normal looks like for a user, host, service or rule over time: logon hours, destinations, data volumes, process trees, alert rates. Anomaly detection and Subject's behavior dimension are only as good as the baseline, and a baseline built while an attacker was present treats the attacker as normal.",
    "source": "clear"
  },
  "Beaconing": {
    "term": "Beaconing",
    "definition": "Periodic network communication from an infected host to a C2 server. Legitimate software beacons too (updaters, telemetry and EDR agents), so baseline known-good cadences before you pivot.",
    "source": "bad-term"
  },
  "Behavior Analytics": {
    "term": "Behavior Analytics",
    "definition": "Analysis of user and system behavior patterns to find deviations that may indicate a threat. Usually delivered as UEBA; see User and Entity Behavior Analytics (UEBA).",
    "source": "clear"
  },
  "Behavioral Drift": {
    "term": "Behavioral Drift",
    "definition": "Gradual change in what normal looks like for a user or system: a new role, a new project, or an attacker moving slowly. Baselines that retrain continuously absorb drift, malicious drift included, so a slow change may never alert. When activity looks normal only recently, compare it against an older baseline window.",
    "source": "clear"
  },
  "Belkasoft X Forensic (also known as Belkasoft Evidence Center X)": {
    "term": "Belkasoft X Forensic (also known as Belkasoft Evidence Center X)",
    "definition": "DFIR suite for computer, mobile, drone, vehicle and cloud forensics; parses encrypted containers and RAM dumps.",
    "source": "cat-tool"
  },
  "Benign Positive": {
    "term": "Benign Positive",
    "definition": "Microsoft Sentinel's classification for an alert that fired correctly on activity that turned out to be expected. Defender XDR's equivalent is Informational, expected activity. Both map to ASSURED's true positive, authorized (benign true positive). See Benign True Positive.",
    "source": "clear"
  },
  "Benign True Positive": {
    "term": "Benign True Positive",
    "definition": "An alert that fired on exactly the activity its detection logic describes, where that activity turns out to be authorized or expected in the local context: a red-team exercise, an admin's sanctioned use of a dual-use tool, a scanner doing its job. In the verdict record it is a true positive on the detection axis and authorized on the activity axis. The detection worked; the context clears it. Distinct from a false positive, where the logic matched something it should not have, so never record it as one. The close does not tune the rule, which is healthy. It feeds context instead: a pattern-entry proposal, or a scoped, expiring exception keyed to the tool version, extension or plugin ID and destination set, with an owner and re-fire triggers. Platform labels differ: Microsoft Sentinel calls this verdict Benign Positive, and Defender XDR calls it Informational, expected activity. Full entry: ASSURED terms.",
    "source": "clear"
  },
  "Benign-Confirmed": {
    "term": "Benign-Confirmed",
    "definition": "In ASSURED, the activity-axis verdict for activity where nothing harmful or policy-relevant happened, and the evidence shows it. With authorized, the only activity verdict that can close at Level 0. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "BeyondTrust": {
    "term": "BeyondTrust",
    "definition": "Privileged access management; just-in-time access, password vaulting, session monitoring, endpoint privilege management, and remote-support tooling.",
    "source": "cat-tool"
  },
  "BigFix": {
    "term": "BigFix",
    "definition": "Endpoint management platform automating patching, compliance, and security configuration at scale. Developed by BigFix, Inc.; acquired by IBM in 2010 and by HCL in 2019.",
    "source": "cat-tool"
  },
  "Binary Obfuscation": {
    "term": "Binary Obfuscation",
    "definition": "Code is deliberately scrambled, encrypted, or disguised to make analysis harder and evade static analysis engines.",
    "source": "bad-term"
  },
  "Binary Padding": {
    "term": "Binary Padding",
    "definition": "Adds non-functional data or junk code to malware files to change their hash, inflate them past scanner size limits, and avoid signature-based detection.",
    "source": "bad-term"
  },
  "Bitdefender GravityZone": {
    "term": "Bitdefender GravityZone",
    "definition": "EDR with behavior analysis, anti-exploit, root-cause analysis, and policy-based remediation.",
    "source": "cat-tool"
  },
  "BlackCat / ALPHV": {
    "term": "BlackCat / ALPHV",
    "definition": "Sophisticated ransomware-as-a-service operation, one of the first to use Rust, making detection and analysis harder. Highly customizable Windows / Linux payloads, double extortion with leak-site shaming. Successor to BlackMatter in the DarkSide lineage; ties to REvil are affiliate overlap, not direct succession. Defunct: the FBI disrupted ALPHV in December 2023, and in March 2024 the operators exit-scammed their affiliates after Change Healthcare's reported $22M ransom payment, posting a fake law-enforcement seizure notice. Its affiliates moved to other RaaS programs.",
    "source": "bad-family"
  },
  "Blast Radius": {
    "term": "Blast Radius",
    "definition": "The set of systems, identities, and data an incident can plausibly reach from its current foothold: everything the compromised entity can touch, authenticate to, or influence. Scope draws boundaries around it, lateral movement grows it, and containment exists to stop it growing.",
    "source": "clear"
  },
  "Blind Scoring": {
    "term": "Blind Scoring",
    "definition": "Scoring work without knowing whose it is or when in the course it was written, so expectations do not move the score. See Blind scoring with two raters.",
    "source": "clear"
  },
  "BloodHound": {
    "term": "BloodHound",
    "definition": "Graph tool that maps attack paths through Active Directory and Entra ID (group memberships, sessions, ACLs, delegation) to privileged targets; free Community Edition and commercial Enterprise.",
    "source": "cat-tool"
  },
  "BlueKeep (CVE-2019-0708)": {
    "term": "BlueKeep (CVE-2019-0708)",
    "definition": "Critical RDP vulnerability allowing remote code execution without authentication on older Windows versions. \"Wormable\": it could in principle self-propagate like WannaCry, though no worm ever appeared (in-the-wild use from late 2019 was human-operated coin mining). Microsoft fixed it in the May 2019 Patch Tuesday and took the rare step of also patching out-of-support XP and Server 2003. Highlighted the danger of exposing RDP directly to the internet.",
    "source": "bad-term"
  },
  "Bootkits": {
    "term": "Bootkits",
    "definition": "Malware that tampers with the boot chain so it runs before the OS loads. On legacy BIOS systems that means the MBR/VBR; on UEFI systems it means boot files in the EFI System Partition (ATT&CK T1542.003). BlackLotus (2023) was the first publicly known UEFI bootkit to bypass Secure Boot on fully updated Windows 11. Firmware implants (e.g., MoonBounce, CosmicStrand) go further and live in SPI flash, where they survive disk wipes and replacement, so remediation may require reflashing firmware, not just reimaging.",
    "source": "bad-term"
  },
  "Border Gateway Protocol (BGP)": {
    "term": "Border Gateway Protocol (BGP)",
    "definition": "The routing protocol that exchanges reachability information between the autonomous systems that make up the internet. Security-relevant because BGP hijacks and route leaks can silently redirect traffic through attacker-controlled networks, so a connection's destination is not always where the packets actually went.",
    "source": "clear"
  },
  "Boss of the SOC (BOTS)": {
    "term": "Boss of the SOC (BOTS)",
    "definition": "Splunk's blue-team capture-the-flag event and its public datasets: pre-indexed Splunk data from a fictional company, with questions answered by searching it. Version 3 (March 2020) covers Windows, network, AWS and Microsoft 365 telemetry and is released under CC0.",
    "source": "cat-tool"
  },
  "Botnet": {
    "term": "Botnet",
    "definition": "A network of infected machines (bots) controlled by an attacker through a central server or peer-to-peer relays, used for DDoS, spam, credential stuffing, proxying, and more.",
    "source": "bad-term"
  },
  "Break-glass Account": {
    "term": "Break-glass Account",
    "definition": "An emergency-access account kept outside normal sign-in controls (often excluded from MFA or Conditional Access, with its credentials sealed) for use when the normal admin path is broken. Because it bypasses controls, every sign-in should alert, and one that no declared emergency explains is treated as a privileged-identity compromise until shown otherwise. Not the escalation tripwire, which was formerly called the break-glass rule.",
    "source": "clear"
  },
  "Break-glass rule (former name)": {
    "term": "Break-glass rule (former name)",
    "definition": "The former name of the escalation tripwire: a confirmed escalation criterion makes the case P1 and escalates it immediately, from any phase. Renamed so that \"break-glass\" keeps its industry meaning, the emergency-access accounts used when the normal admin path is broken. See Escalation Tripwire and Escalation criteria. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Bring Your Own Device (BYOD)": {
    "term": "Bring Your Own Device (BYOD)",
    "definition": "Letting staff use personally owned devices for work. A BYOD device usually has no EDR and little logging, so evidence comes from the identity provider, MAM and the apps rather than the device. Treat a sign-in from an unmanaged device as a visibility gap, not as clean.",
    "source": "clear"
  },
  "Bring Your Own Vulnerable Driver (BYOVD)": {
    "term": "Bring Your Own Vulnerable Driver (BYOVD)",
    "definition": "Loading a legitimately signed but vulnerable kernel driver, then exploiting it to kill EDR processes or disable kernel protections from ring 0. The most common EDR-killer technique in 2025-2026 ransomware. Microsoft's vulnerable driver blocklist prevents many known drivers.",
    "source": "bad-term"
  },
  "Brute Force": {
    "term": "Brute Force",
    "definition": "Trying many passwords against one account until one works; defeated by lockout and rate limits.",
    "source": "bad-term"
  },
  "Bug Bounty": {
    "term": "Bug Bounty",
    "definition": "A vulnerability disclosure program that pays researchers for valid reports, run directly or through a platform. A report is an intake channel: verify the flaw, then look for anyone else who exploited it. See Vulnerability Disclosure Program (VDP).",
    "source": "clear"
  },
  "Bulletproof Hosting (BPH)": {
    "term": "Bulletproof Hosting (BPH)",
    "definition": "Hosting services known for ignoring abuse complaints and allowing malicious activities to operate with minimal risk of takedown. Traffic to a known BPH network is a strong risk multiplier during triage. CISA and partners published dedicated mitigation guidance in November 2025.",
    "source": "bad-term"
  },
  "Burp Suite": {
    "term": "Burp Suite",
    "definition": "Web application security tooling: intercepting proxy, scanning, manual pentest tools, and extensions.",
    "source": "cat-tool"
  },
  "Business Associate (HIPAA)": {
    "term": "Business Associate (HIPAA)",
    "definition": "A person or vendor that creates, receives, maintains or transmits protected health information on a covered entity's behalf, under a business associate agreement (BAA). After discovering a breach of unsecured PHI, a business associate notifies the covered entity without unreasonable delay and no later than 60 days after discovery (45 CFR 164.410); the covered entity then owns notice to individuals and regulators. When the SOC works for a vendor, the BAA decides who is told first.",
    "source": "clear"
  },
  "Business Continuity": {
    "term": "Business Continuity",
    "definition": "An organization's capacity to keep critical operations running during and after a disruptive incident such as a ransomware outbreak or a destructive attack. In triage, a credible threat to business continuity is part of what raises an alert's risk rating and escalation urgency.",
    "source": "clear"
  },
  "Business Email Compromise (BEC)": {
    "term": "Business Email Compromise (BEC)",
    "definition": "Phishing's no-payload variant: an email impersonating an executive, vendor, or counterparty that asks the recipient to move money or change payment details. With no attachment to detonate and no link to rewrite, gateway verdicts stay quiet; the evidence lives in lookalike domains, display-name and reply-to mismatches, and hijacked threads sent from a compromised counterparty's real mailbox. Consistently among the costliest crime types by reported losses in the FBI IC3 Internet Crime Reports (about $3 billion in the 2025 report).",
    "source": "clear"
  },
  "Business Logic Abuse": {
    "term": "Business Logic Abuse",
    "definition": "Exploiting flaws in an application's workflow rather than its code: replaying a single-use coupon, skipping a payment step, or abusing a password-reset flow to take over an account. Every request looks valid on its own, so signature-based controls rarely fire; the signal is a sequence that the business process should not allow.",
    "source": "bad-term"
  },
  "C2 Framework": {
    "term": "C2 Framework",
    "definition": "A commercial or open-source toolkit that provides implants, listeners and operator consoles for hands-on-keyboard intrusions: Cobalt Strike, Sliver, Havoc, Mythic, Brute Ratel C4. Malleable profiles let operators reshape traffic to imitate legitimate services, so detection keys on implant behavior and beacon shape rather than fixed signatures.",
    "source": "bad-term"
  },
  "CAPEv2": {
    "term": "CAPEv2",
    "definition": "Open-source automated malware sandbox descended from Cuckoo, with payload extraction (unpacked binaries, configs) and anti-evasion work; self-hosted, so samples stay in house.",
    "source": "cat-tool"
  },
  "CERT-In Directions": {
    "term": "CERT-In Directions",
    "definition": "India's 2022 directions requiring listed cyber incidents to be reported to CERT-In within 6 hours of noticing them, among other duties such as log retention. See Notification clocks.",
    "source": "clear"
  },
  "CISA Advisories": {
    "term": "CISA Advisories",
    "definition": "U.S. Cybersecurity and Infrastructure Security Agency advisories on vulnerabilities and active threats, with mitigation guidance.",
    "source": "cat-tool"
  },
  "CISA KEV": {
    "term": "CISA KEV",
    "definition": "The Known Exploited Vulnerabilities catalog: CVEs CISA has evidence of being exploited in the wild, each with a remediation due date for U.S. federal agencies.",
    "source": "cat-tool"
  },
  "CNAPP, CSPM and CDR (concept)": {
    "term": "CNAPP, CSPM and CDR (concept)",
    "definition": "Cloud security categories: CSPM checks configuration against policy, CDR detects live threats in cloud control planes and workloads, and a CNAPP combines them with workload protection and code scanning.",
    "source": "cat-tool"
  },
  "COM Hijacking": {
    "term": "COM Hijacking",
    "definition": "A persistence technique that abuses Windows Component Object Model (COM) registry entries to hijack the execution flow of legitimate applications.",
    "source": "bad-term"
  },
  "California Consumer Privacy Act (CCPA)": {
    "term": "California Consumer Privacy Act (CCPA)",
    "definition": "California's consumer privacy law (Cal. Civ. Code §1798.100 et seq.), as amended by the CPRA and enforced by the California Privacy Protection Agency and the Attorney General. It governs how for-profit businesses that do business in California and meet its thresholds handle California residents' personal information, wherever the business is located. It gives consumers a private right of action for breaches of certain unencrypted, unredacted personal information caused by a failure to maintain reasonable security (§1798.150). Breach notification sits in a separate statute, Civ. Code §1798.82, which applies to any business operating in California regardless of CCPA thresholds. Since 1 January 2026 (SB 446), notice to affected residents is due within 30 calendar days of discovery or notification of the breach. Delay is allowed only for law-enforcement needs or as necessary to determine scope and restore system integrity. When more than 500 residents are notified, a sample notice goes to the Attorney General within 15 calendar days of notifying them. A business holding data it does not own must notify the owner immediately on discovery (§1798.82(b)).",
    "source": "clear"
  },
  "Call-Back Verification": {
    "term": "Call-Back Verification",
    "definition": "Confirming a caller or an instruction by calling a number you looked up from a trusted source, never the number supplied in the contact. See Talking to people during triage.",
    "source": "clear"
  },
  "Callback Phishing": {
    "term": "Callback Phishing",
    "definition": "An email with no link or attachment (a fake invoice or subscription renewal) that tells the victim to call a phone number. The call center then talks them into installing remote-access software. Defeats link and attachment scanning entirely.",
    "source": "bad-term"
  },
  "Cambridge Analytica": {
    "term": "Cambridge Analytica",
    "definition": "Political consulting firm that improperly harvested data from 87 million Facebook users via a quiz app; the scandal broke in 2018. Psychological profiling and micro-targeted ads aimed at influencing votes, most prominently the 2016 U.S. election (the UK ICO's investigation later concluded its role in Brexit had been overstated). Not a traditional cyberattack, but it exposed serious flaws in data privacy and third-party app oversight and triggered global debate about surveillance capitalism and election interference. Direct consequences included a record $5 billion FTC penalty against Facebook (July 2019) and the UK ICO's maximum £500,000 fine under pre-GDPR law. GDPR itself was adopted in 2016 and became applicable on May 25, 2018, about ten weeks after the story broke.",
    "source": "bad-campaign"
  },
  "Capstone": {
    "term": "Capstone",
    "definition": "In the ASSURED teaching kit, an unguided full-arc case scored blind against a fixed grid, with a late inject. See The capstone.",
    "source": "clear"
  },
  "Carbon Black": {
    "term": "Carbon Black",
    "definition": "EDR and application-control line (Carbon Black Cloud, EDR and App Control), long known for unfiltered process and file-event recording.",
    "source": "cat-tool"
  },
  "Carbonite": {
    "term": "Carbonite",
    "definition": "Cloud-based backup and DR for SMBs; encrypted transmission, hybrid backup, ransomware features.",
    "source": "cat-tool"
  },
  "Cardholder Data Environment (CDE)": {
    "term": "Cardholder Data Environment (CDE)",
    "definition": "The system components, people and processes that store, process or transmit cardholder data or sensitive authentication data, plus system components with unrestricted connectivity to them (PCI DSS). Connected-to and security-impacting systems are in PCI scope but are not part of the CDE. An alert touching the CDE sets the regulatory flag in Scope.",
    "source": "clear"
  },
  "Case": {
    "term": "Case",
    "definition": "In ASSURED, the unit of work: one or more alerts grouped because they share an entity and time window, a campaign indicator or a vendor incident ID. The riskiest member sets the case's depth level, and a grouped case never closes at Level 0 if any member fails eligibility. The activity verdict, priority and Escalation decision are recorded once per case; each member alert keeps its own detection-axis verdict. See Correlated cases. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Cellebrite": {
    "term": "Cellebrite",
    "definition": "Mobile-device extraction and analysis suite (Inseyets, which includes UFED) covering a wide range of phones and apps.",
    "source": "cat-tool"
  },
  "Censys": {
    "term": "Censys",
    "definition": "Internet-wide asset discovery via continuous scanning; SSL/TLS, services, and attack-surface monitoring.",
    "source": "cat-tool"
  },
  "Chain of Custody": {
    "term": "Chain of Custody",
    "definition": "The documented, unbroken record of who collected a piece of evidence, when, how, and every hand it passed through since, with hashes that show it was not altered. Triage starts the chain the moment it exports a log, captures memory or saves an email: record the source, the time, the tool and the hash in the case. Evidence without a chain is harder to use in legal, HR or regulatory proceedings. See Preserve before you contain.",
    "source": "clear"
  },
  "Chainsaw": {
    "term": "Chainsaw",
    "definition": "Open-source command-line tool that hunts through Windows event logs (EVTX) and other artifacts with Sigma rules and built-in detections.",
    "source": "cat-tool"
  },
  "Change Healthcare": {
    "term": "Change Healthcare",
    "definition": "February 2024 ransomware attack on the largest U.S. health-claims clearinghouse by an ALPHV/BlackCat affiliate. Entry came through a Citrix remote-access portal protected by a stolen password and no MFA. Claims processing and pharmacy payments stalled nationwide for weeks; the company paid a reported $22M ransom, and the data of roughly 190 million people was exposed, the largest healthcare breach on record. ALPHV then exit-scammed the affiliate.",
    "source": "bad-campaign"
  },
  "Charming Kitten": {
    "term": "Charming Kitten",
    "definition": "Iranian group conducting espionage against academics, human rights activists, and government entities through phishing, fake social personas and credential harvesting. It is known for impersonating journalists and think tanks, has supported Iran's surveillance and foreign intelligence collection for over a decade, and is still active.",
    "source": "bad-actor"
  },
  "Cisco Meraki MV / MT": {
    "term": "Cisco Meraki MV / MT",
    "definition": "Cloud-managed smart cameras and environmental and door sensors in the Meraki dashboard; camera and door-sensor events can corroborate physical presence. Cisco's legacy video-surveillance and IPICS products were retired in January 2026.",
    "source": "cat-tool"
  },
  "Cisco Secure Malware Analytics (formerly Threat Grid)": {
    "term": "Cisco Secure Malware Analytics (formerly Threat Grid)",
    "definition": "Cloud sandbox combining behavior analysis with threat intelligence for advanced-malware investigation.",
    "source": "cat-tool"
  },
  "Cisco Umbrella": {
    "term": "Cisco Umbrella",
    "definition": "Cloud-delivered DNS-layer security; blocks malicious domains at resolution time and logs every lookup per identity. Now sold as part of Cisco Secure Access; Cisco has announced end of life for the standalone Umbrella SIG and DNS offers.",
    "source": "cat-tool"
  },
  "Citrix Bleed (CVE-2023-4966)": {
    "term": "Citrix Bleed (CVE-2023-4966)",
    "definition": "Memory over-read in Citrix NetScaler ADC and Gateway that leaks valid session tokens, letting attackers hijack already-authenticated sessions and skip passwords and MFA. Exploited as a zero-day from August 2023 and then by LockBit affiliates. Patching did not end the exposure: stolen sessions stayed valid until every session was killed.",
    "source": "bad-term"
  },
  "Cl0p": {
    "term": "Cl0p",
    "definition": "Russian-speaking extortion group (TA505/FIN11-adjacent) that industrialized mass exploitation of file-transfer software: Accellion FTA (2020-21), GoAnywhere MFT (2023), MOVEit Transfer (2023), which alone touched 2,700+ organizations, and Cleo Harmony/VLTrader/LexiCom (2024). In late 2025 an extortion wave under the Cl0p brand followed zero-day exploitation of Oracle E-Business Suite (CVE-2025-61882), though Google/Mandiant had not formally attributed the intrusions. Cl0p began as ransomware in 2019, but these campaigns skip encryption in favor of pure data-theft extortion at scale: one zero-day monetized across thousands of victims at once.",
    "source": "bad-actor"
  },
  "Clear Windows Event Logs": {
    "term": "Clear Windows Event Logs",
    "definition": "Wiping Windows event logs (wevtutil cl, Clear-EventLog) to destroy evidence. T1685.005 in ATT&CK v19; previously T1070.001. Event 1102 (Security log cleared) and 104 (System log cleared) are themselves high-signal alerts.",
    "source": "bad-term"
  },
  "Click Fraud Malware": {
    "term": "Click Fraud Malware",
    "definition": "Malware that simulates user clicks on advertisements to generate fraudulent revenue. Often run on compromised systems in large volumes to exploit pay-per-click ad platforms.",
    "source": "bad-term"
  },
  "ClickFix (fake CAPTCHA / paste-and-run)": {
    "term": "ClickFix (fake CAPTCHA / paste-and-run)",
    "definition": "A lure that tells the user to press Win+R (or open a terminal) and paste an attacker command, usually mshta or PowerShell, to \"verify they are human\" or \"fix\" an error; the user executes it themselves.",
    "source": "bad-term"
  },
  "Closure Check": {
    "term": "Closure Check",
    "definition": "In ASSURED, the five conditions a documented close must meet: no criterion confirmed or open as a suspicion; the cell allows it; no persistence or credential access in the evidence examined; the case's own alternatives checked clean; every gap named, with reopen triggers. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Cloud Hopper": {
    "term": "Cloud Hopper",
    "definition": "Widespread espionage campaign by China's APT10 targeting MSPs globally. Compromising MSPs gave attackers stealthy access to customer networks across aerospace, finance, manufacturing, and healthcare. Credential theft, custom malware, and RATs. Victims often unaware due to the trusted MSP position. A textbook example of supply-chain compromise for espionage. The actor is profiled above under APT10.",
    "source": "bad-campaign"
  },
  "Cloud Security Posture Management (CSPM)": {
    "term": "Cloud Security Posture Management (CSPM)",
    "definition": "Tools that continuously compare cloud configuration against policy and benchmarks: public storage buckets, over-broad roles, disabled logging. A CSPM finding describes exposure, not activity; pair it with control-plane audit logs to learn whether anyone used the misconfiguration.",
    "source": "clear"
  },
  "Cloudflare Cloudforce One": {
    "term": "Cloudflare Cloudforce One",
    "definition": "Cloudflare's threat-research team and intelligence service; produces actionable indicators, campaign tracking, and disruption support against active adversaries.",
    "source": "cat-tool"
  },
  "Cloudflare One": {
    "term": "Cloudflare One",
    "definition": "Cloudflare's SSE platform: secure web gateway, zero-trust network access, cloud access security broker (CASB) and DNS filtering delivered from its edge network.",
    "source": "cat-tool"
  },
  "Cobalt Strike": {
    "term": "Cobalt Strike",
    "definition": "Commercial adversary-simulation framework (sold by Fortra) whose cracked copies were heavily abused by APTs, ransomware gangs and commodity malware: Beacon C2, fileless injection, lateral movement, credential harvesting. Historically delivered by loaders such as TrickBot and BazarLoader (both retired around 2022). Fortra reports an 80% drop in unauthorized copies after a 2023 court order won with Microsoft and Health-ISAC and the June 2024 Operation Morpheus takedown of 593 servers, and actors increasingly use alternatives such as Sliver. Beacon's sleep/jitter check-in pattern is still the reference beaconing signature.",
    "source": "bad-family"
  },
  "Code Injection": {
    "term": "Code Injection",
    "definition": "Untrusted input that an application's interpreter executes as code (eval, template engines, dynamic SQL or shell construction). In malware-analysis usage the same phrase often means process injection; see Process Injection. When it happens in an internet-facing application, ATT&CK maps the intrusion to T1190 Exploit Public-Facing Application.",
    "source": "bad-term"
  },
  "Cognitive Trap": {
    "term": "Cognitive Trap",
    "definition": "A predictable reasoning error that pushes an analyst toward the wrong verdict while feeling like good judgment: anchoring, confirmation bias, availability bias, automation bias, deference, premature closure, sunk cost. ASSURED counters them with structure (pre-committed escalation criteria, a hypothesis ledger, peer validation) rather than willpower. See Cognitive traps.",
    "source": "clear"
  },
  "Cohesity": {
    "term": "Cohesity",
    "definition": "Data security and backup platform (DataProtect, NetBackup) with immutable snapshots, anomaly detection on backup change rates, and clean-room recovery.",
    "source": "cat-tool"
  },
  "Collection": {
    "term": "Collection",
    "definition": "ATT&CK tactic: gathering the data the attacker came for (file shares, mailboxes, screenshots, keystrokes) before exfiltration. Archive tools such as 7-Zip or WinRAR creating large password-protected archives are a common tell.",
    "source": "bad-term"
  },
  "Colonial Pipeline": {
    "term": "Colonial Pipeline",
    "definition": "May 2021 ransomware incident attributed to DarkSide that hit the IT systems of one of the largest fuel pipeline operators in the U.S. The company preemptively shut down operations, causing East Coast shortages. Initial access came through a compromised VPN password. A $4.4M ransom was paid and partly recovered by the U.S. government. Spurred new cybersecurity mandates for pipeline operators.",
    "source": "bad-campaign"
  },
  "Command Line": {
    "term": "Command Line",
    "definition": "In SOC analysis, the argument string a process was launched with. Often the load-bearing forensic field on an EDR alert because it reveals what the process was actually told to do.",
    "source": "clear"
  },
  "Command Line Analysis": {
    "term": "Command Line Analysis",
    "definition": "Reading a process's command line for what it was told to do: the binary, its flags, encoded or obfuscated arguments, and the paths and URLs it names. See Command Line, and command-line parsing for the method.",
    "source": "clear"
  },
  "Command and Control (C2)": {
    "term": "Command and Control (C2)",
    "definition": "The channel an attacker uses to send commands to compromised systems and receive results or stolen data (ATT&CK tactic TA0011). It usually hides in common protocols or trusted cloud services, so rhythm and destination give it away, not the port.",
    "source": "bad-term"
  },
  "Command and Scripting Interpreter": {
    "term": "Command and Scripting Interpreter",
    "definition": "Using legitimate command-line shells or scripting environments to execute commands: PowerShell and cmd.exe on Windows, bash and zsh on Linux and macOS, Python, JavaScript, and AppleScript.",
    "source": "bad-term"
  },
  "Command-Line Obfuscation": {
    "term": "Command-Line Obfuscation",
    "definition": "Malicious commands hidden using encoding (Base64), string concatenation, or misleading syntax to bypass command-line monitoring.",
    "source": "bad-term"
  },
  "Common Event Format (CEF)": {
    "term": "Common Event Format (CEF)",
    "definition": "A log format that originated at ArcSight (now OpenText ESM): a syslog-style line with a pipe-delimited header (vendor, product, version, signature ID, name, severity) and key-value extensions. Many network and security appliances still emit it. Severity and field use vary by vendor, so read the device's mapping before trusting a normalized field.",
    "source": "clear"
  },
  "Common Vulnerabilities and Exposures (CVE)": {
    "term": "Common Vulnerabilities and Exposures (CVE)",
    "definition": "The public catalog of disclosed vulnerabilities, each with an identifier such as CVE-2021-44228, run by MITRE under CISA sponsorship with many numbering authorities. A CVE ID names a bug; it does not say how dangerous it is. Severity comes from CVSS, and urgency from known exploitation (CISA KEV) and exploit probability (EPSS). See the priority matrix.",
    "source": "clear"
  },
  "Common Vulnerability Scoring System (CVSS)": {
    "term": "Common Vulnerability Scoring System (CVSS)",
    "definition": "FIRST's standard for scoring a vulnerability's technical severity from 0 to 10; version 4.0 (2023) is current, and 3.1 scores are still common. Severity is not risk: CVSS knows nothing about your exposure or whether the bug is being exploited. Check CISA KEV and EPSS for urgency, and the asset's criticality for impact.",
    "source": "clear"
  },
  "Communication Record": {
    "term": "Communication Record",
    "definition": "In ASSURED, section 9 of the handoff packet and the matching part of a closure record: who was told what, by whom, on which channel and when, including contacts deliberately not made. See Talking to people during triage.",
    "source": "clear",
    "methodTerm": true
  },
  "Commvault": {
    "term": "Commvault",
    "definition": "Unified data management; backup, archive, governance, and SaaS-app protection with AI analytics.",
    "source": "cat-tool"
  },
  "Commvault Threatwise (formerly TrapX)": {
    "term": "Commvault Threatwise (formerly TrapX)",
    "definition": "Deception and threat detection with decoys across endpoints, networks, and cloud. TrapX Security acquired by Commvault, 2022; rebranded as Threatwise.",
    "source": "cat-tool"
  },
  "Compliance": {
    "term": "Compliance",
    "definition": "Adherence to the laws, standards and frameworks an organization is bound by. See Regulatory Compliance and Regulatory Requirements for what it changes in triage.",
    "source": "clear"
  },
  "Compromised Credentials": {
    "term": "Compromised Credentials",
    "definition": "Usernames and passwords exposed, stolen, or leaked, enabling attackers to gain unauthorized access to systems or services.",
    "source": "bad-term"
  },
  "Compromised Host": {
    "term": "Compromised Host",
    "definition": "A system under attacker control, often used for lateral movement, staging malware, or maintaining persistence within a network.",
    "source": "bad-term"
  },
  "Computer Security Incident Response Team (CSIRT)": {
    "term": "Computer Security Incident Response Team (CSIRT)",
    "definition": "The team that owns incident response once an incident is declared; also called a CIRT or IRT, and at national level often a CERT. In ASSURED it is the IR that escalation hands to: triage owns the case until the CSIRT accepts the handoff packet.",
    "source": "clear"
  },
  "Confabulation": {
    "term": "Confabulation",
    "definition": "NIST's term for what is commonly called AI hallucination: confidently stated output that is false or unsupported by the input. See Hallucination.",
    "source": "clear"
  },
  "Confidence Rubric": {
    "term": "Confidence Rubric",
    "definition": "In ASSURED, the single scale for analytic confidence, used by Subject's entity verdicts, Uncover's evidence chain, Risk's record and the handoff packet. High: direct evidence from a source trusted for that kind of claim, corroborated independently, with plausible alternatives tested and ruled out. Medium: single-source evidence or strong inference, with nothing contradicting it. Low: circumstantial or incomplete evidence, with material gaps open. Label each claim, not the case, and round down when between levels. Confidence sits beside likelihood and never replaces it. See the confidence rubric. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Configuration Management Database (CMDB)": {
    "term": "Configuration Management Database (CMDB)",
    "definition": "A database of an organization's systems and services (configuration items) and the relationships between them; during triage an analyst queries it to learn what an alerting system actually is: its owner, business role, criticality, and dependencies. A stale CMDB is a common reason a scoping question takes hours instead of minutes.",
    "source": "clear"
  },
  "Confirmation Bias": {
    "term": "Confirmation Bias",
    "definition": "Searching for, and weighting, evidence that supports the hypothesis already held, while explaining away what contradicts it. It bites hardest in Uncover, where the analyst chooses every query. Counter: for each hypothesis, name the observation that would refute it and run that query too.",
    "source": "clear"
  },
  "Confirmed": {
    "term": "Confirmed",
    "definition": "In ASSURED, supported at High confidence on the confidence rubric. A confirmed escalation criterion fires the escalation tripwire and makes the case P1 from any phase. Below High the claim is a suspicion, and suspicion refines Scope instead of escalating. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Confirmed Reach": {
    "term": "Confirmed Reach",
    "definition": "In ASSURED, the footprint rule for impact: asset criticality is scored on the most valuable asset the activity has confirmed reach to, not just the entry point. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "ConnectWise ScreenConnect": {
    "term": "ConnectWise ScreenConnect",
    "definition": "Remote-support and access platform common among managed service providers; also a frequent ransomware entry and persistence tool.",
    "source": "cat-tool"
  },
  "Contained by Control": {
    "term": "Contained by Control",
    "definition": "In ASSURED, the path for malicious activity a control blocked or quarantined, with no execution or follow-on evidence: the case is recorded at P3 or P4 and becomes a pattern-entry candidate, not a page to IR. Any sign of execution or follow-on activity takes the case off this path, and if a criterion is then confirmed, the escalation tripwire applies. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Containers": {
    "term": "Containers",
    "definition": "A lightweight workload isolation unit that shares the host operating system's kernel instead of running its own, making its isolation boundary weaker than a virtual machine's. For triage, containers mean ephemeral evidence: a compromised container can be torn down and rescheduled before anyone looks at it, so telemetry shipped off the container is often all that remains.",
    "source": "clear"
  },
  "Containment": {
    "term": "Containment",
    "definition": "The incident-response phase between detection and eradication: isolate the affected hosts, revoke the compromised credentials, block the C2 destinations, freeze the situation so it stops getting worse while the investigation continues. In triage, preservation comes first: capture the volatile evidence and the artifacts a containment action would destroy, then take only the reversible actions the protocol pre-authorizes. Non-reversible actions, such as a credential reset or an OAuth grant revocation, need IR or owner approval unless the protocol lists them as pre-authorized for that scenario.",
    "source": "clear"
  },
  "Containment Authorization Matrix": {
    "term": "Containment Authorization Matrix",
    "definition": "In a managed-service arrangement, the per-customer list of which pre-authorized actions the provider may take, on which asset classes, with which preservation step, and who approves anything non-reversible. See What the customer must supply.",
    "source": "clear"
  },
  "Conti": {
    "term": "Conti",
    "definition": "One of the most prolific ransomware groups before disbanding in 2022. It ran a centralized structure, a professional affiliate model, and human-operated intrusions, using Cobalt Strike and TrickBot for movement. Internal chat-log leaks in 2022 exposed its structure, operations, and finances. Many former members moved to BlackCat or Royal; Royal later rebranded as BlackSuit, whose infrastructure law enforcement seized in July 2025.",
    "source": "bad-family"
  },
  "Continuous Access Evaluation (CAE)": {
    "term": "Continuous Access Evaluation (CAE)",
    "definition": "A Microsoft Entra ID capability, based on the OpenID Continuous Access Evaluation Profile, that lets supporting services reject an access token within minutes of a critical event such as session revocation, account disable or password reset, instead of honoring it until it expires. It decides how fast containment takes effect: an app without CAE support keeps accepting a stolen access token until it expires, a random 60 to 90 minutes by default on Microsoft Entra ID.",
    "source": "clear"
  },
  "Controller and Processor (GDPR)": {
    "term": "Controller and Processor (GDPR)",
    "definition": "The two GDPR roles for an organization handling personal data. The controller decides the purposes and means of processing and owns the Art. 33 notification to the supervisory authority; the processor acts on the controller's instructions and notifies the controller without undue delay after becoming aware of a breach (Art. 33(2) of the GDPR). Which role your organization holds for the affected data decides whose 72-hour clock is running. See General Data Protection Regulation (GDPR).",
    "source": "clear"
  },
  "Corelight": {
    "term": "Corelight",
    "definition": "Commercial NDR built on Zeek and Suricata: sensors produce Zeek logs and Suricata alerts, plus detections and smart PCAP.",
    "source": "cat-tool"
  },
  "Cortex AgentiX": {
    "term": "Cortex AgentiX",
    "definition": "Palo Alto Networks' agentic automation platform, positioned as the next generation of Cortex XSOAR: AI agents that plan and run security workflows with human approval points.",
    "source": "cat-tool"
  },
  "Cortex Cloud (formerly Prisma Cloud)": {
    "term": "Cortex Cloud (formerly Prisma Cloud)",
    "definition": "Palo Alto Networks' CNAPP plus cloud detection and response (CDR): posture management, IaC scanning, workload runtime protection and cloud threat detection on the Cortex platform. Launched in 2025 as the next generation of Prisma Cloud; existing Prisma Cloud customers are being upgraded to it.",
    "source": "cat-tool"
  },
  "Cortex XSIAM": {
    "term": "Cortex XSIAM",
    "definition": "Palo Alto Networks' SOC platform: SIEM-style ingestion, XDR analytics, built-in SOAR automation and attack-surface data on one data store. The migration path offered to former QRadar SaaS customers.",
    "source": "cat-tool"
  },
  "Cortex XSOAR": {
    "term": "Cortex XSOAR",
    "definition": "Palo Alto Networks' SOAR (formerly Demisto, acquired 2019): case management, threat-intel management, playbook automation, and 900+ prebuilt integration packs. Palo Alto now markets Cortex AgentiX as its next generation (AI-agent automation), and SOAR is also built into Cortex XSIAM.",
    "source": "cat-tool"
  },
  "Cozy Bear": {
    "term": "Cozy Bear",
    "definition": "Sophisticated espionage group associated with Russia's SVR, built for stealth and long-term access. It targets governments, think tanks, healthcare and vaccine researchers. It is the group behind the SolarWinds SUNBURST compromise (tracked by Mandiant as UNC2452 until it was merged into APT29 in April 2022). Custom malware, living-off-the-land and well-crafted spear-phishing let its operations go undetected for months. As Midnight Blizzard (Microsoft's name), it breached Microsoft's own corporate email in 2023-2024 by password-spraying a legacy test tenant.",
    "source": "bad-actor",
    "aliasOf": "APT29"
  },
  "Credential": {
    "term": "Credential",
    "definition": "Whatever the system accepts as proof of identity: a password, an API key, an OAuth token, a Kerberos ticket, an NTLM hash. Credentials are the highest-value loot in most intrusions; their theft is usually the pivot point.",
    "source": "clear"
  },
  "Credential Dumping": {
    "term": "Credential Dumping",
    "definition": "Extracting credentials (hashes, tokens, tickets) from a compromised system's memory or files.",
    "source": "bad-term"
  },
  "Credential Stuffing": {
    "term": "Credential Stuffing",
    "definition": "Automated injection of stolen username-password pairs into login forms, relying on credential reuse.",
    "source": "bad-term"
  },
  "Credential Theft": {
    "term": "Credential Theft",
    "definition": "Stealing login information (passwords, hashes, tokens, session cookies) through phishing, infostealers, keyloggers, memory dumping, or system exploitation. An umbrella term: Credential Dumping, Token Theft and AiTM Phishing on this page describe the specific methods.",
    "source": "bad-term"
  },
  "Credential-Exposed": {
    "term": "Credential-Exposed",
    "definition": "In ASSURED, the status of any user who reached the credential step of a phishing kit. They stay credential-exposed until the password is reset, sessions are revoked and MFA methods are reviewed; stopping at the MFA prompt rules out session theft, not credential theft. See Identity-persistence sweep. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Cribl": {
    "term": "Cribl",
    "definition": "Data routing and processing for observability pipelines; filter, enrich, and reduce log data before forwarding.",
    "source": "cat-tool"
  },
  "Critical Infrastructure": {
    "term": "Critical Infrastructure",
    "definition": "Systems and services whose disruption would endanger public safety, economic stability, or national security: power, water, healthcare, financial services, telecommunications, and similar sectors. The United States designates 16 critical infrastructure sectors. PPD-21 (2013) set the list; NSM-22 (April 2024) rescinded and replaced PPD-21, kept the 16 sectors, and names CISA as national coordinator. Federal policy here is under review, so check for later revisions. Organizations in these sectors face heightened nation-state targeting and sector-specific incident-reporting obligations.",
    "source": "clear"
  },
  "CrowdStrike Charlotte AI": {
    "term": "CrowdStrike Charlotte AI",
    "definition": "CrowdStrike's generative-AI assistant and agentic triage in the Falcon platform: answers questions in natural language, writes queries and triages detections.",
    "source": "cat-tool"
  },
  "CrowdStrike Counter Adversary Operations": {
    "term": "CrowdStrike Counter Adversary Operations",
    "definition": "CrowdStrike's combined threat-intelligence and managed-hunting organization; publishes adversary profiles under its animal-themed naming (for example SCATTERED SPIDER).",
    "source": "cat-tool"
  },
  "CrowdStrike Falcon": {
    "term": "CrowdStrike Falcon",
    "definition": "Cloud-native EDR platform; combines behavioral analytics, threat intel, and ML on a single sensor.",
    "source": "cat-tool"
  },
  "CrowdStrike Falcon Identity Protection": {
    "term": "CrowdStrike Falcon Identity Protection",
    "definition": "CrowdStrike's ITDR module, sold within Falcon Next-Gen Identity Security: monitors Active Directory and Entra ID authentication for credential misuse, privilege escalation and lateral movement, and can enforce MFA on risky logons.",
    "source": "cat-tool"
  },
  "CrowdStrike Query Language (CQL)": {
    "term": "CrowdStrike Query Language (CQL)",
    "definition": "The pipe-based query language of Falcon LogScale and Falcon's Advanced Event Search.",
    "source": "cat-tool"
  },
  "Crypters / Packers": {
    "term": "Crypters / Packers",
    "definition": "Tooling that uses encryption or obfuscation to hide malicious code and evade antivirus. Not malicious on their own but commonly paired with trojans, RATs, or ransomware.",
    "source": "bad-term"
  },
  "Cryptojacker": {
    "term": "Cryptojacker",
    "definition": "Malware that mines cryptocurrency on someone else's compute: hijacked servers, cloud instances created with stolen keys, or containers. The signal is sustained high CPU or GPU, connections to mining pools, and unexpected cloud spend.",
    "source": "bad-term"
  },
  "Cuckoo Sandbox": {
    "term": "Cuckoo Sandbox",
    "definition": "Open-source automated malware analysis running suspect files in VMs and capturing behavior. The original project's final release was 2.0.7 (2019) and it is no longer maintained; community successors (CAPEv2, Cuckoo3) carry the approach forward.",
    "source": "cat-tool"
  },
  "Custom Encryption Protocols": {
    "term": "Custom Encryption Protocols",
    "definition": "Non-standard encryption schemes that wrap malicious traffic to avoid detection by DPI or SSL/TLS inspection.",
    "source": "bad-term"
  },
  "Custom Protocols over Non-Standard Ports": {
    "term": "Custom Protocols over Non-Standard Ports",
    "definition": "Known protocols on ports they are not normally paired with (HTTPS on 8088, SSH on 443), or fully custom protocols (a home-grown binary C2 protocol over raw TCP), chosen to slip past detection that expects known service behavior.",
    "source": "bad-term"
  },
  "Cyber Incident Reporting for Critical Infrastructure Act (CIRCIA)": {
    "term": "Cyber Incident Reporting for Critical Infrastructure Act (CIRCIA)",
    "definition": "A 2022 US law that will require covered critical-infrastructure entities to report covered cyber incidents to CISA within 72 hours of reasonably believing one occurred, and ransom payments within 24 hours of making them. The duties take effect only when CISA's final rule does, so check its current status before relying on the clocks.",
    "source": "clear"
  },
  "Cyber Resilience Act (CRA)": {
    "term": "Cyber Resilience Act (CRA)",
    "definition": "EU Regulation 2024/2847 on products with digital elements. Since 11 September 2026, manufacturers report actively exploited vulnerabilities and severe incidents affecting their products through ENISA's Single Reporting Platform: an early warning within 24 hours and a notification within 72 hours. See Notification clocks.",
    "source": "clear"
  },
  "CyberArk": {
    "term": "CyberArk",
    "definition": "Privileged access management: vaulting and rotating privileged credentials, session recording, secrets and machine-identity management. Acquired by Palo Alto Networks (February 2026); the platform is being rebranded Idira. In triage, its session recordings and vault checkout logs show who used a privileged credential and when.",
    "source": "cat-tool"
  },
  "CyberChef": {
    "term": "CyberChef",
    "definition": "Browser-based \"cyber Swiss army knife\" from GCHQ for decoding, decompressing, parsing and transforming data with chained recipes.",
    "source": "cat-tool"
  },
  "CyberTrap": {
    "term": "CyberTrap",
    "definition": "Deception platform with realistic traps and decoys to misdirect attackers and surface intrusion attempts.",
    "source": "cat-tool"
  },
  "Cybereason": {
    "term": "Cybereason",
    "definition": "EDR/XDR focused on endpoint visibility, malware detection, IR, and deep process-tree forensics. Now part of LevelBlue; Cybereason research is being combined with LevelBlue SpiderLabs.",
    "source": "cat-tool"
  },
  "Cynet AutoXDR": {
    "term": "Cynet AutoXDR",
    "definition": "XDR platform for small-to-mid SOCs combining endpoint, network and user analytics with automated investigation and remediation playbooks and a bundled MDR service; marketed as Cynet All-in-One.",
    "source": "cat-tool"
  },
  "DCSync": {
    "term": "DCSync",
    "definition": "Impersonating a domain controller and asking a real one to replicate password data, which returns the hash of any account, krbtgt included. Requires replication rights, so it follows a domain-admin-level compromise.",
    "source": "bad-term"
  },
  "DFARS 252.204-7012": {
    "term": "DFARS 252.204-7012",
    "definition": "The US Department of Defense contract clause for safeguarding covered defense information. Cyber incidents affecting it are reported to DoD through DIBNet within 72 hours of discovery, and images of the affected systems are preserved for at least 90 days. See Notification clocks.",
    "source": "clear"
  },
  "DFIR ORC": {
    "term": "DFIR ORC",
    "definition": "Open-source Windows forensic-artifact collector from ANSSI (France's national cyber agency); gathers a configurable artifact set for offline post-compromise analysis.",
    "source": "cat-tool"
  },
  "DLL Injection": {
    "term": "DLL Injection",
    "definition": "Injecting a Dynamic Link Library into a target process to execute malicious code within that process's context.",
    "source": "bad-term"
  },
  "DLL Search Order Hijacking": {
    "term": "DLL Search Order Hijacking",
    "definition": "A DLL-hijacking technique that places a malicious DLL where an application looks for libraries before the legitimate location, so a trusted, signed binary loads attacker code. Attackers use it for persistence, privilege escalation, and to hide execution inside a trusted process. Current ATT&CK groups it with side-loading, phantom-DLL hijacking, DLL redirection, and DLL substitution under ATT&CK T1574.001 \"DLL\" (mapped in v19 to Stealth and Execution). Side-loading is the sibling variant: the attacker plants a legitimate application next to the malicious DLL and runs it. Detected by watching for DLLs, especially unsigned ones loaded by signed binaries, that load from application or user-writable directories instead of their expected system paths.",
    "source": "clear"
  },
  "DNS Tunneling": {
    "term": "DNS Tunneling",
    "definition": "Abusing DNS to encapsulate and exfiltrate data or create covert C2, bypassing traditional network controls.",
    "source": "bad-term"
  },
  "DPRK Remote IT Workers": {
    "term": "DPRK Remote IT Workers",
    "definition": "North Korean operatives who get hired as remote IT contractors under stolen or fabricated identities (Microsoft: Jasper Sleet), then earn salaries for the regime, steal data, and sometimes extort the employer. A hiring and insider-risk scenario as much as an intrusion. See Lazarus Group.",
    "source": "bad-term"
  },
  "Darktrace": {
    "term": "Darktrace",
    "definition": "Network detection and response vendor (also email, cloud, and OT) whose Behavioral Defense Platform models per-device and per-user behavior to flag anomalies; its autonomous response capability (originally branded Antigena) can block connections on its own. Treat its model-breach alerts as anomaly detections that need corroboration.",
    "source": "cat-tool"
  },
  "Data Breach": {
    "term": "Data Breach",
    "definition": "A security incident that results in unauthorized access to, or accidental or unlawful loss, alteration, destruction or disclosure of, protected data. Whether an event is legally a breach (and starts a notification clock) is for privacy or legal counsel to decide, not the analyst. Scale is irrelevant, and accidental disclosures can qualify. See Scope > Regulatory.",
    "source": "bad-term"
  },
  "Data Exfiltration": {
    "term": "Data Exfiltration",
    "definition": "Deliberate and unauthorized transfer of data from a system or network to an external location (ATT&CK tactic TA0010). The covert routes, sometimes called data leakage channels, include the C2 channel itself, cloud storage, DNS tunneling and other protocol tunnels; each has its own entry on this page.",
    "source": "bad-term"
  },
  "Data Exposure": {
    "term": "Data Exposure",
    "definition": "Data left accessible without proper controls, often due to misconfigurations like open cloud storage, unsecured APIs, or an application revealing internal details or user data. Information disclosure is the matching vulnerability class (CWE-200): a system reveals internal details, metadata or user data to someone not entitled to it. Exposure is a condition, not proof of access: check the access logs before you call it theft.",
    "source": "bad-term"
  },
  "Data Harvesting": {
    "term": "Data Harvesting",
    "definition": "Automated or bulk collection of data via scrapers, malware, or scripts, often used for profiling, fraud, or resale.",
    "source": "bad-term"
  },
  "Data Leak": {
    "term": "Data Leak",
    "definition": "Informal term for data exposed outside its intended boundary, often accidentally (misdirected email, public bucket). An accidental leak of personal data or protected health information (PHI) can still be a reportable breach, so escalate it the same way. Not the same as extortion leak sites, where stolen data is published deliberately. See Scope > Regulatory.",
    "source": "bad-term"
  },
  "Data Loss Prevention (DLP)": {
    "term": "Data Loss Prevention (DLP)",
    "definition": "Controls that inspect data in motion, at rest or in use, and alert on or block sensitive content leaving approved channels: email, web uploads, removable media, cloud sync. A DLP alert names a policy match, not intent; triage asks what the data was, where it went, and whether the destination was sanctioned.",
    "source": "clear"
  },
  "Data Protection Officer (DPO)": {
    "term": "Data Protection Officer (DPO)",
    "definition": "The role GDPR (Art. 37-39) requires of some controllers and processors to advise on and monitor data-protection compliance and to act as the contact point for supervisory authorities. In triage, the DPO or privacy lead decides whether a personal-data breach is notifiable; the SOC supplies the facts and the awareness timestamp.",
    "source": "clear"
  },
  "Data Retention": {
    "term": "Data Retention",
    "definition": "How long logs, telemetry, and other records are kept before they roll off or are purged. Retention windows bound every investigation: if the intrusion began before the oldest retained log, the earliest attacker activity cannot be reconstructed from logs and may be recoverable only through host or disk forensics, if at all.",
    "source": "clear"
  },
  "Data Staging": {
    "term": "Data Staging",
    "definition": "Collected data consolidated in one place before exfiltration (a local directory, a file share, or a cloud instance), often compressed and encrypted into archives (T1560). Staging reduces the number of outbound connections. A multi-gigabyte .7z or .rar appearing in ProgramData, %TEMP% or a share root is one of the best pre-exfiltration detection opportunities. Splitting transfers to stay under thresholds is a separate technique (T1030).",
    "source": "bad-term"
  },
  "Data-Theft Extortion": {
    "term": "Data-Theft Extortion",
    "definition": "Stealing data and demanding payment to keep it off a leak site, with no encryption at all (Cl0p's file-transfer campaigns are the defining example). There may be no ransomware alert, so the exfiltration itself is the incident.",
    "source": "bad-term"
  },
  "De-escalation": {
    "term": "De-escalation",
    "definition": "In ASSURED, the explicit path back down: a priority moves down only with a named reason in the case and the same stakeholder notification an upgrade would get. A confirmed criterion is downgraded only by the receiving owner, after receipt. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Dead Drop Resolver (DDR)": {
    "term": "Dead Drop Resolver (DDR)",
    "definition": "Malware fetches a pointer, usually an encoded domain or IP, from content posted on a legitimate service (Pastebin, GitHub, a social-media profile) and then connects to the real C2 server it points to. The legitimate site hides the C2 address from static analysis and lets the operator rotate infrastructure. Pivot on whatever the host connects to next. If the commands themselves are read from the web service, that is T1102.002 (bidirectional) or T1102.003 (one-way).",
    "source": "bad-term"
  },
  "Debugger Evasion": {
    "term": "Debugger Evasion",
    "definition": "Malware checks whether a debugger is attached (IsDebuggerPresent, timing checks) and changes behavior or exits so analysts cannot step through it.",
    "source": "bad-term"
  },
  "Deception Technology": {
    "term": "Deception Technology",
    "definition": "Decoys planted where no legitimate user should go: honeypot hosts, honeytoken credentials, canary files, fake cloud keys. Any interaction is suspicious by design, which makes deception alerts among the highest-fidelity a SOC receives. Check first whether an authorized scanner or admin tool touched the decoy.",
    "source": "clear"
  },
  "Deep Packet Inspection (DPI)": {
    "term": "Deep Packet Inspection (DPI)",
    "definition": "Inspecting the full contents of network packets, payload included, rather than only headers and flow metadata. This is what lets a network sensor see the actual request, file, or command inside the traffic, though pervasive encryption steadily shrinks what it can read.",
    "source": "clear"
  },
  "Deepfake": {
    "term": "Deepfake",
    "definition": "Synthetic audio, video or images generated to impersonate a real person. In triage it defeats \"I recognized the voice\" or \"I saw them on the call\" as identity proof for help-desk resets and payment approvals; verify through a separate, known channel instead. See AI-assisted triage.",
    "source": "clear"
  },
  "Deepfake Impersonation": {
    "term": "Deepfake Impersonation",
    "definition": "Using AI-generated voice or video to pose as a real person (an executive, IT staff, a job candidate) on a call or video meeting. In early 2024 an employee of the engineering firm Arup in Hong Kong paid out about US$25 million after a video call on which every other participant was a deepfake. ATT&CK v19.2 tracks the content creation as Generate Content: Audio-Visual Content (T1683.002).",
    "source": "bad-term"
  },
  "Defense Impairment": {
    "term": "Defense Impairment",
    "definition": "ATT&CK tactic: breaking security mechanisms, pipelines, and tooling so defenders cannot see or trust what is happening: disabling security tools such as endpoint detection and response (EDR) agents (EDR killers, BYOVD), modifying firewalls, and tampering with logging and trust controls. Created in ATT&CK v19 (April 2026) when Defense Evasion was split; the old T1562 Impair Defenses techniques now sit here, chiefly as T1685 Disable or Modify Tools. Pre-ransomware EDR killing is among the highest-signal events an analyst can catch.",
    "source": "bad-term"
  },
  "Defense in Depth": {
    "term": "Defense in Depth",
    "definition": "Layering multiple overlapping controls at the network, endpoint, identity, and monitoring levels so that a single control failing does not mean compromise; also called security in depth. For triage it means one layer's alert can usually be corroborated or refuted with telemetry from another layer.",
    "source": "clear"
  },
  "Deference": {
    "term": "Deference",
    "definition": "A cognitive trap (authority bias, social proof): accepting a verdict because of who gave it (a senior analyst, a vendor severity, the previous shift) rather than what the evidence shows. It bites in verdicts and documentation. Counter: the record states the evidence for a verdict, never only its source.",
    "source": "clear"
  },
  "Delayed Execution": {
    "term": "Delayed Execution",
    "definition": "Malware deliberately waits (sleep calls, scheduled tasks, ping loops, API hammering) before acting, so automated sandboxes time out before they see malicious behaviour. ATT&CK T1678 Delay Execution; also called time-based evasion. Waiting for user input such as mouse clicks or a document closing is a separate check, T1497.002 User Activity Based Checks.",
    "source": "bad-term"
  },
  "Depth Ladder": {
    "term": "Depth Ladder",
    "definition": "In ASSURED, the per-case choice of how much process a case gets: Level 0 (pattern close, about five minutes), Level 1 (standard triage, about 15 to 45 minutes) or Level 2 (the full arc of seven phases). Depth is chosen at intake and only ratchets up within a case; depth and urgency are separate decisions, so a confirmed criterion escalates from any level. See the fast path. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Desk Card": {
    "term": "Desk Card",
    "definition": "The whole method on one printable page: what each phase asks and produces, the matrix and clocks, the escalation checklist, the confidence rubric, the depth ladder and the closure review. It reminds; the chapters teach.",
    "source": "assured",
    "methodTerm": true
  },
  "Deskilling": {
    "term": "Deskilling",
    "definition": "The slow loss of analysis skill in analysts who only verify AI drafts, which also weakens the kill switch, since it assumes a team that can work the queue unassisted. ASSURED counters it with an unassisted rotation and a quarterly unassisted QA sample. See The deskilling policy.",
    "source": "clear"
  },
  "Detection Engineering": {
    "term": "Detection Engineering",
    "definition": "The discipline of building, testing, tuning, and retiring detection logic as an engineered product: version-controlled rules, measured false-positive rates, coverage mapped against ATT&CK. The portable rule formats analysts meet in alerts are Sigma (log detections) and YARA (file and memory patterns), both in the C.A.T. glossary. Triage feeds it every time a close records why an alert was right or wrong; a SOC without that feedback loop is running detections nobody maintains.",
    "source": "clear"
  },
  "Detection Logic": {
    "term": "Detection Logic",
    "definition": "The rule, model, or heuristic that decides whether a given input fires an alert. The logic that produced the alert matters as much as the alert it produced; two engines can name the same alert for very different reasons.",
    "source": "clear"
  },
  "Detection Mechanism": {
    "term": "Detection Mechanism",
    "definition": "The kind of detection logic that produced an alert. ASSURED teaches four families (signature, anomaly, rule-based, behavioral), and real detections often combine more than one. Machine-learning classifiers sit beside them as a sibling: a trained model scores the input and, like anomaly detection, rarely explains itself. Naming the mechanism tells the analyst what the engine could and could not see, which sets how far to trust the alert.",
    "source": "clear"
  },
  "Detection Strategy (ATT&CK)": {
    "term": "Detection Strategy (ATT&CK)",
    "definition": "Since ATT&CK v18 (October 2025), the per-technique detection object (DET ID), made of platform-specific analytics (AN IDs) built on data components. It replaced the older data-source mapping.",
    "source": "clear"
  },
  "Detection-as-Code": {
    "term": "Detection-as-Code",
    "definition": "Keeping detection rules, exceptions and parsers in version control, with peer review and automated tests before deployment: the benign sample must stop firing and the malicious sample must still fire. See How a request becomes a change.",
    "source": "clear"
  },
  "Device Code Phishing": {
    "term": "Device Code Phishing",
    "definition": "Tricking a user into entering an attacker-generated device code on the real Microsoft or other IdP sign-in page, which hands the attacker tokens for the user's account. No fake site and no password capture are involved. Used at scale by Storm-2372 from 2024. Blocking the device code flow where it is not needed is the main control.",
    "source": "bad-term"
  },
  "Device Registration": {
    "term": "Device Registration",
    "definition": "Registering an attacker-controlled device to a compromised account so access survives a password change: as a new MFA method (an authenticator app or phone number), or as a registered or joined device in the identity provider or MDM, which can satisfy device-based Conditional Access and, in Microsoft Entra ID, obtain a Primary Refresh Token. Storm-2372 and Scattered Spider have both used it. An ATT&CK Persistence technique.",
    "source": "bad-term"
  },
  "Diamond Model": {
    "term": "Diamond Model",
    "definition": "An intrusion-analysis model (Caltagirone, Pendergast and Betz, 2013) that describes every event by four connected features: adversary, capability, infrastructure and victim. Pivoting from one vertex to the others (from a C2 IP to the malware that uses it, then to other victims) is how analysts grow an indicator into a picture of the activity.",
    "source": "clear"
  },
  "Diamond and Sapphire Tickets": {
    "term": "Diamond and Sapphire Tickets",
    "definition": "Stealthier relatives of the golden ticket that start from a real TGT. A diamond ticket decrypts a legitimately issued TGT with the krbtgt key and edits its privilege data; a sapphire ticket goes further and embeds a real privileged user's privilege data obtained through Kerberos delegation (S4U2self). Because a genuine ticket request happened, the usual 'service ticket with no TGT' check misses them.",
    "source": "bad-term"
  },
  "Digital Forensics": {
    "term": "Digital Forensics",
    "definition": "Forensics applied to computers, networks, cloud services and mobile devices; in a SOC the two terms name the same discipline. See Forensics.",
    "source": "clear"
  },
  "Digital Operational Resilience Act (DORA)": {
    "term": "Digital Operational Resilience Act (DORA)",
    "definition": "The EU regulation (2022/2554), applying since January 2025, on ICT risk at financial entities and their critical ICT providers. Major ICT-related incidents go to the competent authority in stages: an initial notification within 4 hours of classifying the incident as major and no later than 24 hours after becoming aware of it, an intermediate report within 72 hours, and a final report within one month. The regulation's classification criteria, not the SOC's severity label, decide what is major.",
    "source": "clear"
  },
  "Digital Signatures": {
    "term": "Digital Signatures",
    "definition": "Cryptographic proof that signed data came from the holder of a private key and was not altered since. On a binary (Authenticode, Apple Developer ID) the signature says who built it, not whether what it does is benign: signing certificates get stolen and abused, and a signed host such as an IDE runs unsigned third-party code. Check the signer, the certificate's validity at signing time, and revocation.",
    "source": "clear"
  },
  "Dirty COW (CVE-2016-5195)": {
    "term": "Dirty COW (CVE-2016-5195)",
    "definition": "Linux kernel privilege escalation via a race condition in the copy-on-write handling of memory mappings. An unprivileged process with read access to a file can race the COW path to write the underlying page, modifying files it should only be able to read, including system binaries owned by root. Discovered after an in-the-wild exploit was captured against a Linux server; later weaponized by Android malware (ZNIU) to root devices. Impacted a wide range of distributions and Android.",
    "source": "bad-term"
  },
  "Disable or Modify Tools": {
    "term": "Disable or Modify Tools",
    "definition": "Stopping, uninstalling, or crippling security tools: killing EDR processes (often with EDR killers such as AvNeutralizer or through BYOVD), tampering with AMSI (Antimalware Scan Interface) or ETW (Event Tracing for Windows), adding Defender exclusions, or stopping log forwarders. Replaced T1562 Impair Defenses in ATT&CK v19. Pre-ransomware EDR killing is among the highest-signal events an analyst can catch; a host that suddenly stops reporting is a finding, not a gap.",
    "source": "bad-term"
  },
  "Disaster Recovery": {
    "term": "Disaster Recovery",
    "definition": "The capability to restore systems and data after a destructive incident, most often tested by ransomware. Attackers deliberately disable it first, so alerts showing backup deletion, shadow copy removal, or tampering with recovery tooling warrant immediate escalation.",
    "source": "clear"
  },
  "Discovery": {
    "term": "Discovery",
    "definition": "ATT&CK tactic: learning the environment after access (whoami, net group \"Domain Admins\", nltest, AdFind, BloodHound, cloud role enumeration). A burst of enumeration commands from one account or host is one of the earliest hands-on-keyboard signals.",
    "source": "bad-term"
  },
  "Discovery (HIPAA)": {
    "term": "Discovery (HIPAA)",
    "definition": "Under the HIPAA Breach Notification Rule, a breach counts as discovered on the first day it is known to the covered entity, or would have been known with reasonable diligence, by any workforce member or agent other than the person who committed it (45 CFR 164.404(a)(2)). Discovery starts the 60-day outer limit for notifying individuals, so the triage record's first-knowledge timestamp matters.",
    "source": "clear"
  },
  "Discriminator": {
    "term": "Discriminator",
    "definition": "In ASSURED, a named, checkable fact that separates a documented benign pattern from its malicious lookalike. A Level 0 close requires every discriminator in the pattern entry to check out against its source system; one failure moves the case to Level 1. See the fast path. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Documented Close": {
    "term": "Documented Close",
    "definition": "In ASSURED, a first-class verdict, not the absence of an escalation, held to the same evidence standard. It passes the closure check, names its open uncertainty and writes its reopen conditions. Most triaged cases end here. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Domain": {
    "term": "Domain",
    "definition": "Either a DNS name like example.com that identifies internet infrastructure, or a Windows Active Directory domain, the identity and authentication boundary attackers aim to own; context makes the sense clear. As an indicator, a DNS domain's age, registrar, and reputation are among the first pivots in triage.",
    "source": "clear"
  },
  "Domain Admin": {
    "term": "Domain Admin",
    "definition": "One of the three most privileged built-in groups in Windows Active Directory, alongside Enterprise Admins and the domain's built-in Administrators group: full administrative control over every domain-joined host, every domain user, and the directory itself. Treat a Domain Admin compromise as a forest compromise, not a domain compromise. The forest, not the domain, is the security boundary, and an admin in a child domain can reach the forest root (for example, by forging SID-History for Enterprise Admins, ATT&CK T1134.005). Scope every Tier-0 identity (DCSync rights, AD CS admins, Entra Connect sync accounts), not only Domain Admins.",
    "source": "clear"
  },
  "Domain Controller": {
    "term": "Domain Controller",
    "definition": "A server that hosts the Active Directory database (NTDS.dit, including every account's password hashes) and runs the Kerberos KDC for its domain. It is Tier 0: an attacker with DC-level access, or replication rights used via DCSync, owns the domain. Any unexpected interactive logon, new service or replication request involving a DC warrants escalation.",
    "source": "clear"
  },
  "Domain Depth": {
    "term": "Domain Depth",
    "definition": "The number of subdomain levels beneath the registered domain in a fully qualified domain name; a.b.example.com has a depth of two below example.com. Depth is a triage feature: DNS tunneling and machine-generated phishing infrastructure tend to produce long subdomain chains, while most legitimate names stay shallow.",
    "source": "clear"
  },
  "Domain Fronting": {
    "term": "Domain Fronting",
    "definition": "Disguises the true destination of HTTPS traffic by routing through a legitimate front-facing domain: the DNS lookup and TLS SNI name an allowed domain on a CDN, while the HTTP Host header inside the encryption names the attacker's domain on the same CDN. Many major CDNs now reject the mismatch, so it is less common than it was.",
    "source": "bad-term"
  },
  "Domain Generation Algorithm": {
    "term": "Domain Generation Algorithm",
    "definition": "Instead of a hardcoded C2 domain, the malware computes a fresh list each day (or hour) from a seed. The attacker registers just one of the generated names. The malware tries them all; only the registered one resolves. Static blocklists lag behind because the candidate names change continuously. Researchers who reverse-engineer a DGA can predict and pre-block future names (registries locked every Conficker A domain this way in 2009), but per-victim seeds and thousands of candidates a day make that hard to repeat. The more reliable signal is the search itself: bursts of NXDOMAIN (no such domain) responses for random-looking names. Wordlist DGAs that string real words together are harder to spot by entropy alone.",
    "source": "bad-feature"
  },
  "Domain Generation Algorithm (DGA)": {
    "term": "Domain Generation Algorithm (DGA)",
    "definition": "Algorithm generating many domain names on the fly, making C2 connections hard to block via static domain blocklists.",
    "source": "bad-term"
  },
  "Domain Name System (DNS)": {
    "term": "Domain Name System (DNS)",
    "definition": "The distributed system that resolves human-readable names to IP addresses. For an analyst it is one of the richest telemetry sources available: nearly every connection begins with a query, so DNS logs surface C2 lookups, tunneling, DGA noise, and newly registered domains that other data misses.",
    "source": "clear"
  },
  "Domain Name System Exfiltration": {
    "term": "Domain Name System Exfiltration",
    "definition": "Moving data out by encoding it into DNS queries, usually as subdomain labels sent to a domain whose authoritative server the attacker runs. It works wherever DNS reaches the internet. Tells: long, high-entropy labels, many unique subdomains of one domain, unusual record types such as TXT, and query volume far above the host's baseline. See Domain Depth and Entropy Scoring.",
    "source": "clear"
  },
  "Domain Trusts": {
    "term": "Domain Trusts",
    "definition": "Authentication relationships between Active Directory domains that let identities in one domain access resources in another. Attackers enumerate and abuse trusts to extend a compromise across domain and forest boundaries, which makes the trust map a lateral-movement map.",
    "source": "clear"
  },
  "Domain-based Message Authentication, Reporting, and Conformance (DMARC)": {
    "term": "Domain-based Message Authentication, Reporting, and Conformance (DMARC)",
    "definition": "An email authentication policy protocol built on SPF and DKIM: the domain owner publishes in DNS how receivers should treat mail that fails alignment (monitor, quarantine, or reject) and where to send reports. Alignment is the point: DMARC checks that the domain in the visible From: header matches the domain SPF or DKIM authenticated. Now specified in RFC 9989 (2026), which replaced RFC 7489. During phishing triage, a DMARC failure on mail claiming to come from a trusted domain is strong spoofing evidence.",
    "source": "clear"
  },
  "DomainKeys Identified Mail (DKIM)": {
    "term": "DomainKeys Identified Mail (DKIM)",
    "definition": "An email authentication method in which the sending infrastructure signs selected message headers and a hash of the body with a private key, and receivers verify the signature against a public key published in the signing domain's DNS. A valid signature shows the signing domain took responsibility for the message and that the signed content arrived unaltered; it says nothing about whether the content is safe.",
    "source": "clear"
  },
  "Double Extortion": {
    "term": "Double Extortion",
    "definition": "Encrypting a victim's systems and stealing data, then threatening to publish it on a leak site if the ransom is not paid. Popularized by Maze in late 2019 and now standard; some crews skip encryption entirely (data-theft-only extortion). Restoring from backup does not end the incident, because the stolen data is still out there.",
    "source": "bad-term"
  },
  "DragonForce": {
    "term": "DragonForce",
    "definition": "Ransomware operation that appeared in late 2023 with encryptors built from leaked LockBit and Conti code. In March 2025 it rebranded as a \"cartel\" that lets affiliates run attacks under their own brands on its infrastructure. Its encryptor was used in the April 2025 Marks & Spencer attack, where Scattered Spider carried out the intrusion, and it claimed the Co-op attack the same month.",
    "source": "bad-actor"
  },
  "Dridex": {
    "term": "Dridex",
    "definition": "Banking Trojan evolved into a modular platform for credential theft, lateral movement, and ransomware delivery. Historically spread via Office macro attachments, a vector Microsoft sharply reduced by blocking internet-sourced macros by default from 2022. Injects into browsers to harvest banking credentials. Used to deploy Locky and BitPaymer. Associated with Evil Corp, which has relied on it less since about 2020 as it moved to its own ransomware and then LockBit; treat a new Dridex sighting as notable rather than routine.",
    "source": "bad-family"
  },
  "Drive-by Download": {
    "term": "Drive-by Download",
    "definition": "Compromise triggered by visiting a malicious or compromised site. The classic form was a silent browser exploit served by an exploit kit. Today it is usually a fake browser update or fake CAPTCHA that persuades the user to download or paste-and-run something (SocGholish, ClickFix). Fully silent exploit chains still exist but are rare and mostly used in targeted watering-hole attacks.",
    "source": "bad-term"
  },
  "Droppers and Loaders": {
    "term": "Droppers and Loaders",
    "definition": "A dropper carries its payload inside itself; a downloader/loader fetches it from the network. Both exist to get a follow-on payload (stealer, C2 implant, ransomware) running, and in practice the terms are often used interchangeably. Notable families: Emotet, ZLoader, SmokeLoader, IcedID, Bumblebee, Latrodectus, HijackLoader, GootLoader, SocGholish. Europol's Operation Endgame (May 2024 onward, with further phases through 2026) has repeatedly disrupted this ecosystem, but operators tend to rebuild or move to new families.",
    "source": "bad-term"
  },
  "Druva": {
    "term": "Druva",
    "definition": "SaaS-delivered data protection for endpoints (via the installed inSync client), SaaS apps such as Microsoft 365 and Google Workspace, and data center and cloud workloads; backups live in Druva's cloud rather than on customer-run backup storage.",
    "source": "cat-tool"
  },
  "Duo": {
    "term": "Duo",
    "definition": "MFA, device trust, and contextual access; widely used for remote access and SaaS protection.",
    "source": "cat-tool"
  },
  "Dwell Time": {
    "term": "Dwell Time",
    "definition": "The interval between initial compromise and detection, measured per incident and tracked as a program metric. The reason retention windows matter (\"did this start before the alert?\") is that dwell time is routinely longer than anyone's comfort. Mandiant's M-Trends 2026 puts the global median at 14 days (up from 11), but espionage and North Korean IT-worker intrusions had a median of 122 days. The median hides a long tail, and that tail is what retention windows must cover.",
    "source": "clear"
  },
  "Dynamic Link Library (DLL)": {
    "term": "Dynamic Link Library (DLL)",
    "definition": "A Windows shared library whose code is loaded into a process's address space at runtime. Module-load telemetry matters in triage because attackers run code inside trusted processes by supplying their own DLLs through injection, sideloading, or search-order hijacking.",
    "source": "clear"
  },
  "Dynamic Resolution / Fallback Channels": {
    "term": "Dynamic Resolution / Fallback Channels",
    "definition": "Ways an implant finds its C2 when the primary address is blocked: computed domains (DGA), rotating DNS answers (fast flux), or a built-in list of backup domains and protocols it falls back to (sometimes called callback domain rotation). Blocklisting one address rarely ends the session; hunt for the next destination the host tries.",
    "source": "bad-term"
  },
  "E Rule": {
    "term": "E Rule",
    "definition": "In ASSURED, the Escalation decision's one rule: escalate if a criterion is confirmed or the matrix places the case at P1 or P2. At P3, keep working to the named re-score trigger, then close or escalate. Close at P4. Record the cell either way. See The E rule. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "E-ISAC": {
    "term": "E-ISAC",
    "definition": "Electricity sector ISAC; threat intel, IR support, and risk analysis tailored to grid operators.",
    "source": "cat-tool"
  },
  "ECS": {
    "term": "ECS",
    "definition": "Elastic Common Schema: open field-naming specification (source.ip, process.command_line, user.name) used across Elastic data; contributed to OpenTelemetry semantic conventions.",
    "source": "cat-tool"
  },
  "ES|QL and EQL": {
    "term": "ES|QL and EQL",
    "definition": "Elastic's query languages: ES|QL is a piped query language for search and aggregation; EQL (Event Query Language) expresses ordered sequences of events.",
    "source": "cat-tool"
  },
  "ETW (Event Tracing for Windows)": {
    "term": "ETW (Event Tracing for Windows)",
    "definition": "Windows' kernel and user-mode tracing framework; many EDR sensors and Sysmon-like tools consume its providers.",
    "source": "cat-tool"
  },
  "Elastic Security": {
    "term": "Elastic Security",
    "definition": "Unified security on the Elastic Stack; endpoint protection, prebuilt detections, and customizable monitoring.",
    "source": "cat-tool"
  },
  "Electron Framework": {
    "term": "Electron Framework",
    "definition": "A framework for building desktop applications from web technologies; Slack, VS Code, and Cursor are Electron apps. It matters in triage because Electron apps legitimately spawn helper processes with long vendor-standard command lines and sometimes disabled sandboxes. That looks like post-exploitation tooling, but it is normal. The real tell is lineage: a helper, or a helper's child, whose lineage does not trace back to its own app's main process. Extension hosts legitimately launch children of their own (language servers, agent runtimes, git), so judge each child by its identity, signature and path.",
    "source": "clear"
  },
  "Eligibility Gate": {
    "term": "Eligibility Gate",
    "definition": "In ASSURED, the three checks a case's subject must pass before a Level 0 close, each proven from its source system: not a crown-jewel asset; not a privileged identity, and not automation with deploy, signing, secrets or repository-write capability; no regulated data in reach. Unknown fails the gate. A failed item moves the case up the ladder, and a crown-jewel subject or privileged identity goes straight to Level 2. See the fast path. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "EmPyre / Empire": {
    "term": "EmPyre / Empire",
    "definition": "Open-source post-exploitation framework with a Python server: PowerShell agents for Windows and Python agents for Linux/macOS (EmPyre, the former Python project, was merged into Empire 2.0). The original project was discontinued and its repository archived in January 2020; BC Security maintains the active fork, which adds C#, IronPython and Go agents. Originally a red-team tool, adopted by various actors. Encrypted C2, evasion techniques, in-memory execution. Less common in the wild than Cobalt Strike, but its presence in a compromise should be treated as a high-risk indicator.",
    "source": "bad-family"
  },
  "Email Attachment Exploit": {
    "term": "Email Attachment Exploit",
    "definition": "Malware or exploit code embedded in an email attachment that runs when the user opens it, either through a document vulnerability (Follina, the Equation Editor bug) or by persuading the user to enable content or run a file. ATT&CK files it under Spearphishing Attachment (T1566.001).",
    "source": "bad-term"
  },
  "Email Hiding Rules (Inbox Rules)": {
    "term": "Email Hiding Rules (Inbox Rules)",
    "definition": "Mailbox rules an attacker creates in a compromised account to move, mark as read or delete the messages the owner should not see: security alerts, replies from a payment contact, anything containing words such as \"invoice\", \"wire\" or \"hacked\". Common in business email compromise. A forwarding rule that copies mail to an outside address is the collection side of the same trick (T1114.003). Both live in the mailbox and survive a password reset.",
    "source": "bad-term"
  },
  "Email-based C2": {
    "term": "Email-based C2",
    "definition": "Using SMTP/IMAP or a cloud mail API to send or receive commands and data, hidden in attachments or content that blends with business traffic.",
    "source": "bad-term"
  },
  "Emotet": {
    "term": "Emotet",
    "definition": "Banking trojan turned modular loader botnet; for years the dominant initial-access delivery vehicle, dropping TrickBot, QakBot, and ultimately ransomware. Spread via thread-hijacked phishing with macro documents. Taken down by law enforcement in January 2021, resurfaced later that year, and was targeted again by Operation Endgame in May 2024. Its playbook still defines the loader-botnet ecosystem.",
    "source": "bad-family"
  },
  "Encoded Payloads": {
    "term": "Encoded Payloads",
    "definition": "Payloads encoded or encrypted (Base64, XOR) to hide true content until runtime, evading static detection.",
    "source": "bad-term"
  },
  "Encrypted Web Uploads": {
    "term": "Encrypted Web Uploads",
    "definition": "Data uploaded over HTTPS to cloud storage or attacker-controlled servers, so content inspection sees only encrypted traffic. Volume, destination age and the uploading process are the signals.",
    "source": "bad-term"
  },
  "Endpoint": {
    "term": "Endpoint",
    "definition": "A device that runs an operating system and applications and connects to the network: workstation, laptop, server, virtual machine, phone, tablet. Endpoints are where execution-based tradecraft (malware, scripts, hands-on-keyboard commands) shows up, which is why EDR exists. Identity, SaaS and cloud-control-plane attacks, and attacks on network appliances that cannot run EDR, may never touch one, so endpoint silence is not proof of absence.",
    "source": "clear"
  },
  "Endpoint Detection and Response (EDR)": {
    "term": "Endpoint Detection and Response (EDR)",
    "definition": "Agents that record process, file, registry, network and module-load activity on endpoints, detect suspicious behavior, and let responders isolate hosts or kill processes remotely. EDR telemetry is the backbone of endpoint triage. Know its blind spots: unmanaged and BYOD devices, appliances that cannot run an agent, and identity or SaaS activity that never touches a host. A missing or silent agent is a finding.",
    "source": "clear"
  },
  "Enrichment": {
    "term": "Enrichment",
    "definition": "Adding context to a raw alert or indicator before or during triage: reputation and registration data (RDAP, formerly WHOIS) for an IP or domain, owner and criticality for an asset, role and department for a user, a sandbox verdict for a file. Automated enrichment is what SOAR pipelines do best; the analyst's judgment starts where the enrichment stops answering the question.",
    "source": "clear"
  },
  "Entity": {
    "term": "Entity",
    "definition": "Any discrete actor or object that evidence can attach to during an investigation: a user account, a host, a process, an IP address, a domain, a file. Triage decomposes an alert into its entities and asks what each one was doing; the same idea gives UEBA its E.",
    "source": "clear"
  },
  "Entropy Scoring": {
    "term": "Entropy Scoring",
    "definition": "Measuring how random a string or file looks (Shannon entropy). High entropy suggests encryption, compression or machine-generated names: DGA domains, packed binaries, encrypted payloads. It is a prompt, not a verdict: CDN hostnames, cloud object IDs and Base64 also score high.",
    "source": "clear"
  },
  "Environment Checks": {
    "term": "Environment Checks",
    "definition": "Malware inspects its environment for VM or sandbox artifacts before running (T1497), sometimes called virtual environment awareness: system checks such as disk size, drivers and MAC prefixes (T1497.001), user-activity checks such as mouse movement (T1497.002), and time-based checks such as uptime or sped-up sleeps (T1497.003). Checking for an attached debugger is the separate technique T1622 Debugger Evasion. A sample that is silent in the sandbox but active on the endpoint is evidence of evasion, not innocence.",
    "source": "bad-term"
  },
  "Ephemeral Computing": {
    "term": "Ephemeral Computing",
    "definition": "Infrastructure that exists only as long as its task: containers, serverless functions, and autoscaled instances created and destroyed on demand. It matters in triage because the evidence dies with the workload; unless telemetry was shipped off the resource while it lived, there is nothing left to examine by the time the alert is read.",
    "source": "clear"
  },
  "Equifax breach": {
    "term": "Equifax breach",
    "definition": "2017 breach exposing PII (SSNs, birth dates, addresses) for 147 million Americans. Caused by failure to patch Apache Struts (CVE-2017-5638). Attackers operated undetected for roughly 76 days. Handling and disclosure drew widespread criticism. Resulted in a historic $700M settlement and regulatory reforms focused on data protection.",
    "source": "bad-campaign"
  },
  "Eradication": {
    "term": "Eradication",
    "definition": "The incident-response phase that removes the attacker's presence: malware, persistence, backdoor accounts, rogue OAuth grants, compromised credentials. It belongs to IR, after containment. Triage's contribution is the record: every persistence mechanism and identity found in Uncover goes into the handoff packet so eradication does not miss one.",
    "source": "clear"
  },
  "Escalation Acceptance": {
    "term": "Escalation Acceptance",
    "definition": "Escalations the receiver marks as warranted, divided by escalations with a filled receipt. A quality measure judged by the receiver, read beside missed incidents, because a desk can raise acceptance simply by escalating less. See Measuring triage.",
    "source": "clear"
  },
  "Escalation Criteria": {
    "term": "Escalation Criteria",
    "definition": "In ASSURED, the four canonical categories checked at every phase: confirmed malicious activity not fully contained by a control; high impact on business-critical systems; lateral movement or exfiltration; an ongoing or widespread campaign. Each counts only when confirmed. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Escalation Decision": {
    "term": "Escalation Decision",
    "definition": "In ASSURED, the E phase: close or escalate, and who needs to know? It makes and records the decision Risk recommended, by the E rule, and leads with the documented close as a first-class outcome. Early exits (a Level 0 close, an escalation-tripwire escalation) are early Escalation decisions. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Escalation Matrix": {
    "term": "Escalation Matrix",
    "definition": "A pre-agreed table mapping triage outcomes to who gets engaged, how, and how fast. In ASSURED the triage matrix gives a priority (P1 to P4) and a recommended move, and the Escalation decision applies one rule: escalate if a criterion is confirmed or the case sits at P1 or P2; at P3, keep working to the named re-score trigger, then close or escalate; close at P4. It is keyed on pre-committed criteria and priority (how fast someone must act), not severity alone. A confirmed criterion escalates from any phase under the escalation tripwire. See Escalation criteria. Full entry: ASSURED terms.",
    "source": "clear"
  },
  "Escalation Tripwire": {
    "term": "Escalation Tripwire",
    "definition": "ASSURED's rule that a confirmed escalation criterion escalates immediately, from any phase, and makes the case P1 whatever its matrix cell. Confirmed means supported at High confidence on the shared confidence rubric; suspicion refines Scope and re-runs the loop instead. Always written with \"escalation\", because Tripwire is also a file-integrity product. Formerly called the break-glass rule. See Escalation criteria. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "EternalBlue": {
    "term": "EternalBlue",
    "definition": "NSA SMBv1 exploit leaked by Shadow Brokers in 2017. Buffer overflow allows unauthenticated remote code execution. It was instrumental in WannaCry and NotPetya, and spurred deprecation of SMBv1 and stronger patching practices.",
    "source": "bad-term"
  },
  "Evasion": {
    "term": "Evasion",
    "definition": "Techniques attackers use to avoid detection or hinder defenders: obfuscation, masquerading, log clearing, sandbox checks. ATT&CK v19 split the former Defense Evasion tactic into Stealth (TA0005) and Defense Impairment (TA0112). Evasion found in Uncover raises likelihood, since legitimate software rarely needs to hide.",
    "source": "clear"
  },
  "Event": {
    "term": "Event",
    "definition": "An observable occurrence in a system or network (NIST): a process ran, a user logged in, a file changed, a packet was sent. Events are neutral. Detection logic turns a small fraction of them into alerts, and triage turns a smaller fraction into incidents.",
    "source": "clear"
  },
  "Event Context": {
    "term": "Event Context",
    "definition": "The surrounding facts that give a security event meaning: who the user is, what the host is for, what happened immediately before and after, and whether the activity is normal for that identity at that time and place. Context is what lets an analyst turn an isolated observation into a verdict.",
    "source": "clear"
  },
  "Event Correlation": {
    "term": "Event Correlation",
    "definition": "Linking events from different sources through shared entities and time to see one chain of activity: a phishing click, a sign-in from a new ASN, a new mailbox rule. It depends on normalized fields and synchronized clocks. In ASSURED, Uncover correlates evidence into one timeline per case. See Correlation and the timeline.",
    "source": "clear"
  },
  "Event ID": {
    "term": "Event ID",
    "definition": "The number that identifies what kind of event a Windows log record describes, such as 4624 for a successful logon or 4688 for a process creation. The same number can mean different things in different log channels or providers, so read it with its source. See Windows Event Logs; Sysmon, in the C.A.T. glossary, adds richer process, network and image-load events.",
    "source": "clear"
  },
  "Event Time vs Ingest Time": {
    "term": "Event Time vs Ingest Time",
    "definition": "When the source recorded an event versus when the SIEM received it: in ECS, @timestamp versus event.ingested; in Splunk, _time versus _indextime; in Microsoft Sentinel, TimeGenerated versus ingestion_time(). A batch of late-arriving events can look like a burst in ingest time. See Case D.",
    "source": "clear"
  },
  "Event Triage": {
    "term": "Event Triage",
    "definition": "The front end of incident response, from an alert firing to the documented decision to close it or escalate it. It answers four questions: is this real, is it malicious, how serious is it, and what should happen next. It ends in a documented close or a handoff to IR. ASSURED is a structured way to do triage.",
    "source": "clear"
  },
  "Evidence Preservation": {
    "term": "Evidence Preservation",
    "definition": "Capturing evidence before it changes or disappears: volatile state (memory, connections, running processes), the artifacts a containment action would destroy, and log exports with their hashes. In ASSURED, preservation comes before pre-authorized containment: preserve, then contain. See Order of Volatility and Chain of Custody. See Preserve before you contain.",
    "source": "clear"
  },
  "Evil Corp": {
    "term": "Evil Corp",
    "definition": "Russian cybercrime group behind the Dridex banking trojan and BitPaymer / WastedLocker ransomware, which stole hundreds of millions from financial institutions worldwide. U.S. Treasury sanctioned the group and its alleged leader Maksim Yakubets in 2019, and it has since rotated malware names to evade sanctions and tracking. In October 2024, coordinated UK/US/Australian sanctions detailed the group's ties to Russian intelligence (FSB) and identified senior member Aleksandr Ryzhenkov as a LockBit affiliate.",
    "source": "bad-actor"
  },
  "Exabeam": {
    "term": "Exabeam",
    "definition": "SIEM and user and entity behavior analytics (UEBA) vendor: risk-scored user and entity timelines and automated investigation. Merged with LogRhythm in July 2024; sells the cloud New-Scale platform and the self-hosted LogRhythm SIEM.",
    "source": "cat-tool"
  },
  "Exception (Detection)": {
    "term": "Exception (Detection)",
    "definition": "A narrow carve-out in which the rule still runs and only a defined, context-keyed tuple is excluded from alerting. A governed exception is scoped, owned, approved by a second person, expiring, stored as code and monitored for hits. Distinct from suppression, which hides the alert, and tuning, which changes the logic. See Exception and suppression governance.",
    "source": "clear"
  },
  "Exception Register": {
    "term": "Exception Register",
    "definition": "The single list of active detection exceptions and suppressions, each with its owner and expiry, with a count of those past due. See Exception and suppression governance.",
    "source": "clear"
  },
  "Execution": {
    "term": "Execution",
    "definition": "The ATT&CK tactic (TA0002) for running attacker-controlled code on a local or remote system: through command interpreters, user-run files and lures, scheduled tasks, WMI, or exploits. It rarely stands alone: attackers execute code to discover, steal, move or persist.",
    "source": "bad-term"
  },
  "Exfiltration": {
    "term": "Exfiltration",
    "definition": "The unauthorized transfer of data out of the environment (ATT&CK TA0010): over the C2 channel, to cloud storage or a file-sharing service, by email, or through DNS. Triage signals are volume and destination: outbound bytes far above the host's baseline, a first-seen upload destination, and staging (archives appearing in temporary folders) shortly before the transfer. Confirmed exfiltration is an escalation criterion, and when the data is regulated it can start notification clocks.",
    "source": "clear"
  },
  "Exfiltration Over C2 Channel": {
    "term": "Exfiltration Over C2 Channel",
    "definition": "Sending stolen data out over the same channel the implant already uses for commands, so there is no new destination to spot; the signal is a change in upload volume on an existing beacon.",
    "source": "bad-term"
  },
  "Exfiltration to Cloud Storage": {
    "term": "Exfiltration to Cloud Storage",
    "definition": "Bulk upload or sync of stolen data to a cloud storage service (MEGA, Dropbox, a cloud bucket) with tools such as rclone.",
    "source": "bad-term"
  },
  "Expected-Change Record": {
    "term": "Expected-Change Record",
    "definition": "In ASSURED, the privileged counterpart of a pattern entry: a record, linked to its change ticket, of the checks a recurring privileged change needs. It speeds the Level 2 pass; it never closes a case at Level 0. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Expel": {
    "term": "Expel",
    "definition": "MDR provider that works in the customer's own security tools through API integrations, with transparent investigation timelines in its Workbench.",
    "source": "cat-tool"
  },
  "Exploit": {
    "term": "Exploit",
    "definition": "A technique or piece of code that turns a vulnerability into actual capability: remote code execution, privilege escalation, authentication bypass. A vulnerability with no known exploit is unweaponized, not safe: average time-to-exploit has fallen to days, and private exploits stay invisible until used. Known exploitation (CISA KEV) and exploit probability (EPSS) are stronger urgency signals than whether a public proof-of-concept exists.",
    "source": "clear"
  },
  "Exploit Prediction Scoring System (EPSS)": {
    "term": "Exploit Prediction Scoring System (EPSS)",
    "definition": "FIRST's model that estimates the probability a published CVE will be exploited in the wild in the next 30 days. An urgency input, not a risk score: it knows nothing about your assets, exposure or controls. Check CISA KEV first, then EPSS. See the priority matrix.",
    "source": "clear"
  },
  "Exploit Public-Facing Application": {
    "term": "Exploit Public-Facing Application",
    "definition": "Targets vulnerabilities in externally exposed applications (web servers, APIs, file-transfer platforms, VPN and other edge appliances) to gain unauthorized access or remote code execution (ATT&CK T1190). Edge devices and file-transfer platforms have been its most exploited targets in recent years.",
    "source": "bad-term"
  },
  "Exploitation for Defense Impairment": {
    "term": "Exploitation for Defense Impairment",
    "definition": "Exploiting a vulnerability in security software or the operating system to switch off or bypass a defense, for example a flaw in an EDR agent or a kernel bug that lets the attacker unload protections. BYOVD is the most common form, using a vulnerable third-party driver.",
    "source": "bad-term"
  },
  "Exposed Remote Services (RDP, VPN, Citrix)": {
    "term": "Exposed Remote Services (RDP, VPN, Citrix)",
    "definition": "Logging in through internet-facing remote services (RDP, VPN, Citrix, other edge appliances) with stolen, bought or guessed credentials, or by exploiting the appliance itself. A leading initial-access vector that often leaves no endpoint telemetry, so VPN and appliance logs are the evidence. Using RDP from inside the network to move between hosts is Lateral Movement (T1021.001).",
    "source": "bad-term"
  },
  "Extended Detection and Response (XDR)": {
    "term": "Extended Detection and Response (XDR)",
    "definition": "A platform category that correlates detections across endpoint, identity, email, cloud and network telemetry into incidents with shared response actions, usually within one vendor's stack. For triage, the XDR incident is a grouping, not a verdict: check which member alerts it pulled in, and which sources it cannot see.",
    "source": "clear"
  },
  "Extortion Payment Notice": {
    "term": "Extortion Payment Notice",
    "definition": "A reporting duty triggered by paying a ransom or extortion demand, separate from incident notification: NYDFS within 24 hours, Australia within 72 hours, and CIRCIA within 24 hours once its final rule takes effect. See Ransom and extortion payments.",
    "source": "clear"
  },
  "ExtraHop": {
    "term": "ExtraHop",
    "definition": "NDR platform (RevealX) that decodes protocols from network traffic, including decrypting some enterprise protocols, to detect threats and record transactions.",
    "source": "cat-tool"
  },
  "FBI Flash Reports": {
    "term": "FBI Flash Reports",
    "definition": "Rapid high-priority notifications about imminent cyber threats targeting public and private partners.",
    "source": "cat-tool"
  },
  "FIDO2": {
    "term": "FIDO2",
    "definition": "The FIDO Alliance and W3C standards (WebAuthn plus CTAP) behind security keys and passkeys, used either as a passwordless sign-in or as a second factor. Credentials are public-key pairs bound to the site's origin, so a phishing proxy on a lookalike domain cannot replay them; that makes FIDO2 the main phishing-resistant MFA option. Passkeys can be device-bound or synced through a platform account.",
    "source": "clear"
  },
  "FIN7": {
    "term": "FIN7",
    "definition": "Well-organized cybercrime group conducting large-scale intrusions against banks, POS systems, and hospitality: financially motivated but operationally on par with nation-state actors. Used Carbanak and Bateleur malware (ATT&CK tracks the Carbanak group separately), phishing, backdoors and supply-chain compromise. Recruited unwitting IT staff through fake security firms (Combi Security before the 2018 arrests, Bastion Secure afterward), was later linked to REvil, DarkSide and other ransomware operations, and sold the AvNeutralizer EDR-killer to other ransomware crews.",
    "source": "bad-actor"
  },
  "FIRST CSIRT Services Framework": {
    "term": "FIRST CSIRT Services Framework",
    "definition": "FIRST's catalog of the services and functions an incident response team can offer (version 2.1, November 2019). The functions closest to triage are 5.2.1 Correlation, 5.2.2 Qualification (deciding whether an event needs handling) and 6.2.1 Incident triage (prioritization and categorization). See Standards mapping.",
    "source": "clear"
  },
  "FIRST EPSS": {
    "term": "FIRST EPSS",
    "definition": "The Exploit Prediction Scoring System: a daily probability, per CVE, that the vulnerability will be exploited in the wild in the next 30 days.",
    "source": "cat-tool"
  },
  "FS-ISAC": {
    "term": "FS-ISAC",
    "definition": "Global financial-sector ISAC providing real-time alerts, incident coordination, and member collaboration.",
    "source": "cat-tool"
  },
  "FTC Safeguards Rule": {
    "term": "FTC Safeguards Rule",
    "definition": "The GLBA rule for non-bank financial institutions. A notification event involving the information of 500 or more consumers goes to the FTC within 30 days of discovery. See Notification clocks.",
    "source": "clear"
  },
  "Falco": {
    "term": "Falco",
    "definition": "Open-source runtime-security engine for containers, Kubernetes and Linux hosts; watches system calls (via eBPF) and raises alerts from rules.",
    "source": "cat-tool"
  },
  "Falcon OverWatch": {
    "term": "Falcon OverWatch",
    "definition": "Managed threat-hunting service on top of CrowdStrike Falcon; 24/7 human-led analysis to validate stealthy intrusions.",
    "source": "cat-tool"
  },
  "False Negative": {
    "term": "False Negative",
    "definition": "Malicious activity that produced no alert: the detection logic missed it, or no logic covers it. Invisible by definition at triage time, false negatives surface later through hunting, incident investigation, or an external notification, and each one found is a detection-engineering work item. The other half of the confusion matrix from the false positive, and the more expensive half.",
    "source": "clear"
  },
  "False Positive": {
    "term": "False Positive",
    "definition": "A detection-axis verdict: the alert's logic matched something it should not have, because the behavior the rule claims did not occur. ASSURED records two kinds: false positive (logic), a logic flaw or an over-broad pattern, and false positive (data), a parsing error, a missing field or bad telemetry. The fix is detection-side: tune, refine, or repair the data feed. Distinct from a benign true positive, where the behavior really happened but was authorized; that is never a false positive. Platform labels differ: Microsoft Sentinel's False Positive and Defender XDR's False positive mean this, while their Benign Positive and Informational, expected activity mean a benign true positive.",
    "source": "clear"
  },
  "False-Benign Rate": {
    "term": "False-Benign Rate",
    "definition": "Of the cases in an alert class whose settled activity verdict is malicious or policy violation, the share an assistant recommended, or an automation executed, as a benign close. The denominator is the malicious cases, not all cases. Report it per class with its n, never pooled. See Governing automated triage.",
    "source": "clear"
  },
  "False-Positive-as-Finding": {
    "term": "False-Positive-as-Finding",
    "definition": "In ASSURED, the doctrine that every false positive is a defect report against the detection, not just a closed ticket: the close records whether the logic or the data failed and routes a tuning request to detection engineering. A benign true positive is not a false positive and does not tune the rule. See What a benign close teaches. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Fancy Bear": {
    "term": "Fancy Bear",
    "definition": "Linked to Russia's GRU and known for aggressive operations: credential harvesting, malware deployment, and destructive attacks against political and military targets. Tied to the 2016 DNC breach and many NATO-related campaigns. It uses zero-days and weaponized Office documents, and is noisier and more direct than APT29; a primary actor in Russian hybrid warfare.",
    "source": "bad-actor",
    "aliasOf": "APT28"
  },
  "Fast Flux DNS": {
    "term": "Fast Flux DNS",
    "definition": "Rapidly rotating DNS records that cycle a malicious domain through many IP addresses, hiding C2 servers behind shifting infrastructure and defeating IP-based blocking and takedowns. The domain itself remains blockable through DNS filtering and sinkholing.",
    "source": "bad-term"
  },
  "Federated Identity Credential": {
    "term": "Federated Identity Credential",
    "definition": "In Microsoft Entra ID, a standing trust on an app registration or managed identity that lets tokens from an external issuer sign in as the app. Adding one is a persistence move worth an alert. See Non-human identities and cloud roles.",
    "source": "clear"
  },
  "Federation": {
    "term": "Federation",
    "definition": "Linking identity across independent systems or organizations so that a trusted identity provider authenticates users on behalf of services it does not operate, typically via SAML or OIDC. Matters in triage because every relying service delegates authentication to the identity provider: a compromise there, such as a stolen signing key used to forge assertions (Golden SAML), can mint access to any federated service.",
    "source": "clear"
  },
  "Feedback Loop": {
    "term": "Feedback Loop",
    "definition": "Routing what triage learns to the people who can act on it: false positives to detection engineering as tuning requests, benign true positives to the pattern library, coverage gaps to telemetry owners, handoff rework to the SOC lead. A SOC without one closes the same noise forever.",
    "source": "clear"
  },
  "File Extension Spoofing": {
    "term": "File Extension Spoofing",
    "definition": "Files disguised with misleading extensions (e.g., invoice.pdf.exe) to trick users and bypass basic file-type filters. It works because Windows File Explorer hides known file extensions by default. The Unicode right-to-left override character (U+202E, T1036.002) pulls off the same trick by visually reversing the end of the file name.",
    "source": "bad-term"
  },
  "File Integrity Monitoring (FIM)": {
    "term": "File Integrity Monitoring (FIM)",
    "definition": "Watching critical files and configuration for changes by comparing hashes or attributes against a known state; PCI DSS requires it. Triage asks whether a change matches a change ticket or deployment. An unexplained change to a system binary, a web root or authentication configuration is a persistence or tampering signal.",
    "source": "clear"
  },
  "Fileless Malware": {
    "term": "Fileless Malware",
    "definition": "Malware that runs from memory, keeping little or nothing on disk (payloads often hide in the registry or WMI), which makes it harder for file-scanning AV to detect. Often leverages legitimate system tools like PowerShell or WMI for execution.",
    "source": "bad-term"
  },
  "Firewall": {
    "term": "Firewall",
    "definition": "A control that allows or blocks traffic by rule, at the network edge, between segments, or on the host. Its logs are evidence: allowed connections show what got through, denied ones show what was tried. A block means one attempt was stopped, not that the host is clean.",
    "source": "clear"
  },
  "Five-Field Record": {
    "term": "Five-Field Record",
    "definition": "In ASSURED, Level 0's entire documentation: Alert, Pattern, Checks, Verdict, Closure. A case that cannot be honestly captured in five fields does not belong at Level 0. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Fluentd": {
    "term": "Fluentd",
    "definition": "Open-source data collector that unifies log collection and processing across distributed systems via plugins.",
    "source": "cat-tool"
  },
  "Follina (CVE-2022-30190)": {
    "term": "Follina (CVE-2022-30190)",
    "definition": "Vulnerability in the Microsoft Support Diagnostic Tool (MSDT) triggered via crafted Word documents. Executes code through the ms-msdt protocol handler without macros when the document is opened; the RTF variant fires from the Explorer preview pane with no click at all. Stealthier than VBA-based attacks, it was used in phishing campaigns before it was fully addressed; MSDT itself is now deprecated.",
    "source": "bad-term"
  },
  "Forcepoint": {
    "term": "Forcepoint",
    "definition": "DLP, cloud security, and insider-threat behavior analytics across endpoints, networks, and cloud apps; sold as Risk-Adaptive Protection.",
    "source": "cat-tool"
  },
  "Forensics": {
    "term": "Forensics",
    "definition": "The application of scientific methods to collect, preserve, and analyze digital evidence so that findings hold up to scrutiny: disk and memory images, log exports, mobile extractions, each with a documented chain of custody. In triage the forensic move is preservation: capture volatile evidence, and hash what you export, before containment changes the system.",
    "source": "clear"
  },
  "Forest Blizzard": {
    "term": "Forest Blizzard",
    "definition": "Linked to Russia's GRU and known for aggressive operations: credential harvesting, malware deployment, and destructive attacks against political and military targets. Tied to the 2016 DNC breach and many NATO-related campaigns. It uses zero-days and weaponized Office documents, and is noisier and more direct than APT29; a primary actor in Russian hybrid warfare.",
    "source": "bad-actor",
    "aliasOf": "APT28"
  },
  "Fortinet FortiGate": {
    "term": "Fortinet FortiGate",
    "definition": "Next-generation firewall (NGFW) family with IPS, web filtering, VPN and application control, managed through FortiOS.",
    "source": "cat-tool"
  },
  "Fortra DLP (formerly Digital Guardian)": {
    "term": "Fortra DLP (formerly Digital Guardian)",
    "definition": "Fortra's data loss prevention and endpoint data protection, sold as Digital Guardian until Fortra acquired the company in 2023: context-aware policies for data usage across endpoints, networks and cloud.",
    "source": "cat-tool"
  },
  "Forward Watch": {
    "term": "Forward Watch",
    "definition": "A time-boxed, owned watch on an entity for named events, set by Scope or Risk, with an expiry. Its end, or a named event during it, is a re-score trigger.",
    "source": "clear"
  },
  "Four Boundary Types": {
    "term": "Four Boundary Types",
    "definition": "In ASSURED, Scope's frame for where the investigation's lines sit: regulatory, time, entity and infrastructure. Scope is provisional; Risk can push it wider. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Four Dimensions": {
    "term": "Four Dimensions",
    "definition": "In ASSURED's Subject phase, the four lenses applied to every entity: authentication (how it proved its identity), authorization (what it was allowed to do), behavior (whether the activity fits its baseline) and relationships (what it connects to and can reach). An entity verdict needs all four. See four dimensions. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Gemini in Security Operations": {
    "term": "Gemini in Security Operations",
    "definition": "Google's generative-AI assistance inside Google Security Operations: natural-language search, case summaries, detection authoring and agentic alert triage.",
    "source": "cat-tool"
  },
  "General Data Protection Regulation (GDPR)": {
    "term": "General Data Protection Regulation (GDPR)",
    "definition": "EU/EEA regulation on processing personal data. It applies where an Article 3 nexus exists (an EU/EEA establishment, offering goods or services to people in the EU, or monitoring their behavior). A personal-data breach must be reported to the supervisory authority within 72 hours of the controller becoming aware of it (Art. 33). Awareness means a reasonable degree of certainty that a security incident has compromised personal data (EDPB Guidelines 9/2022), not final confirmation, so the awareness timestamp belongs in the case record.",
    "source": "clear"
  },
  "Generative AI": {
    "term": "Generative AI",
    "definition": "AI that produces new content (text, code, images, audio, video) rather than only classifying or scoring it. Large language models are the generative AI in SOC assistants; the same capability writes fluent phishing lures and deepfake voices. In triage its output is a draft to verify, never evidence. See Large Language Model (LLM) and AI-assisted triage.",
    "source": "clear"
  },
  "Genetec": {
    "term": "Genetec",
    "definition": "Security Center unifies video surveillance, access control, and license plate recognition.",
    "source": "cat-tool"
  },
  "Geolocation": {
    "term": "Geolocation",
    "definition": "The process of determining the physical location of a device or IP address. IP geolocation is a database estimate, not a fact: mobile, VPN, residential-proxy and cloud egress addresses routinely map to the wrong city or country. Treat impossible-travel alerts as a prompt to check the ASN and device, not as proof.",
    "source": "clear"
  },
  "Golden SAML": {
    "term": "Golden SAML",
    "definition": "Forging SAML tokens with a stolen federation token-signing key, such as an AD FS token-signing certificate. The attacker can then sign in to any service that trusts the key, as any user and with any claims, without a password or MFA, and resetting user passwords does not stop it. CyberArk named the technique in 2017; APT29 used it in the SolarWinds campaign.",
    "source": "bad-term"
  },
  "Golden Set": {
    "term": "Golden Set",
    "definition": "A held-out set of your own closed cases with settled verdicts, used to evaluate an AI assistant or automation before and after every change. It covers each alert class with the hard cases: confirmed malicious cases, benign true positives that look malicious, false positives, past misses, injection-laced samples and cases whose right answer is undetermined. See Governing automated triage.",
    "source": "clear"
  },
  "Golden Ticket Attack": {
    "term": "Golden Ticket Attack",
    "definition": "Forging Kerberos TGTs with the krbtgt key to grant unrestricted domain access by impersonating any user.",
    "source": "bad-term"
  },
  "Google Cloud Audit Logs": {
    "term": "Google Cloud Audit Logs",
    "definition": "Google Cloud's Admin Activity, Data Access, System Event and Policy Denied logs: who did what to which resource.",
    "source": "cat-tool"
  },
  "Google Security Command Center": {
    "term": "Google Security Command Center",
    "definition": "Google Cloud's native security and risk platform: misconfiguration and vulnerability findings, threat detection (Event Threat Detection, Container Threat Detection) and attack-path simulation.",
    "source": "cat-tool"
  },
  "Google Security Operations (formerly Chronicle)": {
    "term": "Google Security Operations (formerly Chronicle)",
    "definition": "Cloud-native security analytics platform from Google Cloud; high-speed search and threat detection at petabyte scale. Chronicle was folded into the Google Security Operations (Google SecOps) brand in 2024.",
    "source": "cat-tool"
  },
  "Google Security Operations SOAR (formerly Siemplify / Chronicle SOAR)": {
    "term": "Google Security Operations SOAR (formerly Siemplify / Chronicle SOAR)",
    "definition": "SOAR with case management, playbooks, and analyst dashboards; integrated with Google SecOps (Chronicle) telemetry. Siemplify acquired by Google, 2022; fully integrated into Google SecOps.",
    "source": "cat-tool"
  },
  "Google Threat Intelligence": {
    "term": "Google Threat Intelligence",
    "definition": "Google's commercial intelligence product, combining Mandiant's frontline research with VirusTotal's crowdsourced data and Google's own threat analysis.",
    "source": "cat-tool"
  },
  "Google Workspace security (Gmail)": {
    "term": "Google Workspace security (Gmail)",
    "definition": "Gmail's built-in protections plus the Workspace security center and investigation tool, which search message, login and Drive events across the domain.",
    "source": "cat-tool"
  },
  "Grader Calibration": {
    "term": "Grader Calibration",
    "definition": "Bringing raters to the same reading of a grid before they score: each scores the same anchor exemplars, then they compare and settle the items where they split. See Grader calibration.",
    "source": "clear"
  },
  "GreyNoise": {
    "term": "GreyNoise",
    "definition": "Filters internet background-scan noise so SOCs focus on targeted attacks. IP context with malicious vs. benign classification.",
    "source": "cat-tool"
  },
  "HAFNIUM": {
    "term": "HAFNIUM",
    "definition": "Suspected Chinese state-sponsored group, widely known for exploiting the ProxyLogon Microsoft Exchange zero-days in early 2021, followed by web-shell deployment and data theft from education, law firms, NGOs, and defense contractors. Microsoft now tracks it as Silk Typhoon; in 2025 it pivoted to abusing IT providers' remote-management and cloud tooling. An alleged member was arrested in Italy in July 2025 and extradited to the U.S. in 2026.",
    "source": "bad-actor"
  },
  "HAFNIUM Exchange": {
    "term": "HAFNIUM Exchange",
    "definition": "Early 2021 ProxyLogon chain of zero-day exploits in Microsoft Exchange Server (CVE-2021-26855, -26857, -26858, -27065), first used by HAFNIUM (now Silk Typhoon) and then by many other groups. Tens of thousands of organizations were affected worldwide across government, academia and business. Web shells were deployed for data theft, persistence, and lateral movement, and Microsoft issued out-of-band patches. Not to be confused with the later ProxyShell wave (August 2021). Exchange Server 2016 and 2019 reached end of support in October 2025, so surviving on-premises servers carry this risk unpatched.",
    "source": "bad-campaign"
  },
  "HTML Application (HTA)": {
    "term": "HTML Application (HTA)",
    "definition": "Script content delivered as an HTML Application (.hta file), which Windows executes through mshta.exe with the local user's full privileges rather than inside the browser sandbox. A recurring phishing and living-off-the-land vector (ATT&CK T1218.005, Mshta), which is why mshta.exe spawning from a browser or email client, or running a remote URL or inline script, draws analyst attention.",
    "source": "clear"
  },
  "HTML Smuggling": {
    "term": "HTML Smuggling",
    "definition": "Building a malicious file inside the victim's browser from JavaScript or encoded data in an HTML attachment or page, so email and web gateways only ever see HTML. LNK smuggling hides commands in shortcut files in a similar way (T1027.012).",
    "source": "bad-term"
  },
  "HTTPS C2": {
    "term": "HTTPS C2",
    "definition": "Standard HTTP/HTTPS traffic carrying C2, blending with normal web activity.",
    "source": "bad-term"
  },
  "Hallucination": {
    "term": "Hallucination",
    "definition": "An AI model's output that is fluent and specific but not supported by its input or by fact: an invented log field, a nonexistent CVE, a query that was never run, a confident wrong timestamp. NIST calls it confabulation. In triage, every specific an assistant supplies (hostnames, IDs, counts, times) is verified against raw telemetry before it enters the record.",
    "source": "clear"
  },
  "Handback": {
    "term": "Handback",
    "definition": "A receiving owner returning an escalated case to the sending tier with a named reason: the evidence chain is missing, the criteria or the cell are not supported, or the problem is detection tuning. Recorded on the packet's receipt and counted by reason. See Case D.",
    "source": "clear"
  },
  "Handoff Anchoring": {
    "term": "Handoff Anchoring",
    "definition": "Inheriting the previous analyst's story as if it were a finding, at a shift change or an escalation. The counter is to re-derive the leading hypothesis from the evidence before accepting it. See Anchoring and Handoff anchoring.",
    "source": "clear"
  },
  "Handoff Packet": {
    "term": "Handoff Packet",
    "definition": "In ASSURED, the structured deliverable an escalation produces: case metadata and a receipt, then nine sections (case summary, timeline, entities, evidence chain, risk verdict, containment actions taken, artifacts, open questions, communication record). It lets the receiver start where triage stopped and doubles as the documentation record; a close produces a closure record instead. See The handoff packet. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Handoff Rework": {
    "term": "Handoff Rework",
    "definition": "Escalations whose receipt names rework (the receiver had to re-collect or re-derive something the packet should have carried), divided by escalations with a filled receipt. See Measuring triage.",
    "source": "clear"
  },
  "Hash": {
    "term": "Hash",
    "definition": "A fixed-size value computed from data by a hash function. Cryptographic hashes (SHA-256) identify an exact file. Fuzzy and structural hashes (ssdeep, TLSH, imphash) find near-identical variants, which matters because one changed byte defeats an exact-hash IoC. MD5 and SHA-1 are broken for collisions, so pivot on SHA-256 where you can.",
    "source": "clear"
  },
  "Hayabusa": {
    "term": "Hayabusa",
    "definition": "Open-source Windows event-log fast-forensics timeline generator and threat-hunting tool that applies Sigma-based rules to EVTX files.",
    "source": "cat-tool"
  },
  "Health Insurance Portability and Accountability Act (HIPAA)": {
    "term": "Health Insurance Portability and Accountability Act (HIPAA)",
    "definition": "U.S. legislation that sets standards for protecting sensitive patient health information, including specific security and privacy requirements. It applies to covered entities (health plans, clearinghouses, most providers) and their business associates; health data held by others is usually governed by other laws, such as the FTC Health Breach Notification Rule and state health-privacy statutes. Its Breach Notification Rule requires notice to individuals without unreasonable delay and no later than 60 days after discovery, notice to prominent media when a breach affects more than 500 residents of a state, and documentation kept for six years. Proposed Security Rule changes are proposals, not law, until a final rule is published.",
    "source": "clear"
  },
  "Health-ISAC": {
    "term": "Health-ISAC",
    "definition": "Healthcare-sector ISAC; threat intelligence, incident response coordination, and best practices for clinical environments.",
    "source": "cat-tool"
  },
  "Heartbleed (CVE-2014-0160)": {
    "term": "Heartbleed (CVE-2014-0160)",
    "definition": "OpenSSL flaw allowing attackers to read up to 64KB of server memory per request (private keys, passwords, session tokens). About 17% of TLS-enabled web servers were vulnerable at disclosure.",
    "source": "bad-term"
  },
  "Help-Desk Social Engineering": {
    "term": "Help-Desk Social Engineering",
    "definition": "Calling the IT help desk while posing as an employee to get a password reset, MFA reset or new MFA device registered. Scattered Spider's signature entry path.",
    "source": "bad-term"
  },
  "High-Impact Clock": {
    "term": "High-Impact Clock",
    "definition": "In ASSURED, the override that keeps a High-impact case whose likelihood is genuinely Low at P3 but re-scores it within hours, 4 by default, with named upgrade triggers. Low because the evidence is missing is unknown, not Low: that case reads High/Medium, P2. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Huntress": {
    "term": "Huntress",
    "definition": "MDR provider focused on small and mid-sized businesses and managed service providers, covering endpoint, identity (Microsoft 365) and SIEM.",
    "source": "cat-tool"
  },
  "Hybrid Analysis": {
    "term": "Hybrid Analysis",
    "definition": "Free public malware-analysis service powered by CrowdStrike Falcon Sandbox, with a searchable report archive.",
    "source": "cat-tool"
  },
  "Hypertext Transfer Protocol (HTTP)": {
    "term": "Hypertext Transfer Protocol (HTTP)",
    "definition": "The request-response protocol that carries most web traffic between clients and servers. Triage-relevant because attacker traffic blends into it: C2 beacons, payload downloads, and exfiltration ride HTTP precisely because it is allowed almost everywhere, and its URIs, headers, and user-agent strings are core investigation fields.",
    "source": "clear"
  },
  "Hypothesis Ledger": {
    "term": "Hypothesis Ledger",
    "definition": "In ASSURED, the working list kept beside the Uncover timeline: one line per hypothesis, with the evidence for it, the evidence against it, and its status. Open it with at least two hypotheses, one of them the most plausible benign explanation; a ledger with one line is a conclusion, not a test. Rejected hypotheses travel in the handoff packet so IR does not re-test them. See Correlation and the timeline. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "IBM QRadar": {
    "term": "IBM QRadar",
    "definition": "Enterprise SIEM with real-time correlation, ML-assisted prioritization, and broad ecosystem integration. IBM sold its QRadar SaaS business to Palo Alto Networks (deal closed August 31, 2024); SaaS customers are offered migration to Cortex XSIAM, while QRadar on-premises deployments continue to receive IBM features and support.",
    "source": "cat-tool"
  },
  "ICMP Tunneling": {
    "term": "ICMP Tunneling",
    "definition": "Embedding commands or data in ICMP echo packets (ping) to establish covert C2 communication that traditional firewalls often miss.",
    "source": "bad-term"
  },
  "IPinfo": {
    "term": "IPinfo",
    "definition": "IP-data service: geolocation, owning network (ASN), company and hosting or privacy-service flags for an address.",
    "source": "cat-tool"
  },
  "ISO/IEC 27001 A.5.25": {
    "term": "ISO/IEC 27001 A.5.25",
    "definition": "The ISO/IEC 27001:2022 Annex A control \"Assessment and decision on information security events\": the organization assesses events and decides whether to categorize them as incidents. It is the control auditors test triage against, usually by sampling closes and escalations for the decision, the evidence behind it and who made it. See Standards mapping.",
    "source": "clear"
  },
  "ISO/IEC 27035": {
    "term": "ISO/IEC 27035",
    "definition": "The international standard for information security incident management. Part 1 (ISO/IEC 27035-1:2023) sets out five phases: Plan and prepare, Detect and report, Assess and decide, Respond, and Learn lessons. Triage is Assess and decide: every close and every escalation is a decision under it. A paid standard; check quoted wording against a licensed copy. See Standards mapping.",
    "source": "clear"
  },
  "IcedID (BokBot)": {
    "term": "IcedID (BokBot)",
    "definition": "Banking Trojan turned loader that dropped Cobalt Strike and ransomware, spread through malicious documents and phishing. Modular: credential theft, web injection, lateral movement, with persistence via scheduled tasks and registry keys. Was a key initial-access loader for ransomware crews. Latrodectus, likely written by the same developers, took over much of its role from late 2023, and Operation Endgame (May 2024) targeted IcedID's infrastructure.",
    "source": "bad-family"
  },
  "Identity Provider (IdP)": {
    "term": "Identity Provider (IdP)",
    "definition": "The service that authenticates users and issues the tokens or assertions other applications trust: Microsoft Entra ID, Okta, Google Workspace, Ping. Its sign-in and audit logs are first-class evidence in identity, SaaS and cloud cases, and an IdP compromise reaches every federated app. See Federation and Single Sign-On (SSO).",
    "source": "clear"
  },
  "Identity Threat Detection and Response (ITDR)": {
    "term": "Identity Threat Detection and Response (ITDR)",
    "definition": "Tools and practices that detect and respond to attacks on the identity layer itself: directory and identity-provider misconfiguration, credential and token abuse, suspicious privilege grants, federation tampering. ITDR alerts often fire with no endpoint evidence at all, which is why identity logs are a first-class source in Subject analysis.",
    "source": "clear"
  },
  "Identity-Persistence Sweep": {
    "term": "Identity-Persistence Sweep",
    "definition": "In ASSURED, the read-only checklist run on any identity an attacker held or may have held: sessions and refresh tokens, MFA methods, registered devices, OAuth grants, mailbox rules and forwarding, delegated access, federation trust and new service principals. Finding an anchor is triage; removing it is containment. See Identity-persistence sweep.",
    "source": "clear",
    "methodTerm": true
  },
  "Illicit Consent Grant": {
    "term": "Illicit Consent Grant",
    "definition": "Phishing a user (or admin) into granting a malicious OAuth app permissions to their mailbox or files. The app's token keeps working after password resets and MFA changes, so revoking the grant is part of containment.",
    "source": "bad-term"
  },
  "Impact": {
    "term": "Impact",
    "definition": "(1) In ASSURED, the first axis of the triage matrix: if this activity is real, how bad would it be? Scored as the higher of asset criticality and business impact, against the most valuable asset in confirmed reach. (2) In ATT&CK, the Impact tactic (TA0040): destruction, encryption, or manipulation of systems and data. Full entry: ASSURED terms.",
    "source": "clear"
  },
  "Impact (ATT&CK Tactic)": {
    "term": "Impact (ATT&CK Tactic)",
    "definition": "The tactic for the damage itself (TA0040); not to be confused with ASSURED's impact axis, which C.L.E.A.R. defines. Its techniques include Data Encrypted for Impact (T1486), Inhibit System Recovery such as shadow-copy deletion with vssadmin or bcdedit (T1490), Service Stop (T1489), data destruction, and Resource Hijacking such as cryptomining (T1496). Shadow-copy deletion and backup-service kills usually come minutes before encryption.",
    "source": "bad-term"
  },
  "Impossible Travel": {
    "term": "Impossible Travel",
    "definition": "An identity alert that fires when one account signs in from two places too far apart to travel between in the elapsed time. It rests on IP geolocation, which is an estimate, so VPNs, mobile carriers, cloud egress and residential proxies produce most of these alerts. Check the ASN, the device and the session before treating it as proof. A session presented from a hosting ASN minutes after the user's own sign-in is the pattern that matters (see Adversary-in-the-Middle).",
    "source": "clear"
  },
  "Inbox Rule": {
    "term": "Inbox Rule",
    "definition": "A mailbox rule that moves, deletes, marks read or forwards messages. Attackers add rules that hide replies and security notices (ATT&CK T1564.008, Email Hiding Rules) or forward mail outside (T1114.003, Email Forwarding Rule). See Identity-persistence sweep.",
    "source": "clear"
  },
  "Incident": {
    "term": "Incident",
    "definition": "An occurrence that actually or imminently jeopardizes, without lawful authority, the confidentiality, integrity, or availability of information or an information system, or that violates (or imminently threatens to violate) law, security policies, security procedures, or acceptable-use policies (NIST SP 800-61r3). In ASSURED an event becomes an incident when it is declared (in the three-tier model, usually by Tier 2 or the IR lead after escalation), not when the alert fires; escalation hands IR a case. Not every incident has an external adversary: a misdirected file of customer data qualifies.",
    "source": "clear"
  },
  "Incident Command": {
    "term": "Incident Command",
    "definition": "A leadership model for running a major incident, adapted from emergency management's Incident Command System: one incident commander, defined roles (operations, communications, scribe) and a single source of decisions. Triage meets it at the handoff: on a P1, the warm handoff goes to whoever holds command.",
    "source": "clear"
  },
  "Incident Declaration": {
    "term": "Incident Declaration",
    "definition": "The formal call that a case is an incident, which mobilizes incident response and its command structure. In ASSURED it is not the analyst's escalation: escalation hands IR a case with its packet, and whether that case becomes a declared incident is the call of the role the protocol names (Tier 2 or the IR lead). Notification clocks are tracked separately, since many start at awareness, before any declaration. See Triage vs. incident response.",
    "source": "clear"
  },
  "Incident Response": {
    "term": "Incident Response",
    "definition": "The organized approach to handling a security incident once it is declared. The classic lifecycle (NIST SP 800-61r2, withdrawn in 2025, and SANS PICERL) runs preparation; detection and analysis (identification); containment, eradication and recovery; post-incident activity (lessons learned). NIST SP 800-61r3 (April 2025) now maps incident response onto the CSF 2.0 functions (Govern, Identify, Protect, Detect, Respond, Recover). Triage is the front edge of that lifecycle; ASSURED ends where IR takes ownership.",
    "source": "clear"
  },
  "Indicator of Attack (IoA)": {
    "term": "Indicator of Attack (IoA)",
    "definition": "A behavioral sign that an attack is underway, whatever tools carry it: an Office process spawning a script interpreter that reaches out to the internet, or credential access followed by remote logons. Unlike an IoC, it describes what the adversary is doing rather than an artifact left behind, so it survives a recompiled payload.",
    "source": "clear"
  },
  "Indicators of Compromise (IoC)": {
    "term": "Indicators of Compromise (IoC)",
    "definition": "Atomic, replayable artifacts that, when observed, suggest an intrusion has occurred or is in progress: file hashes, IPs, domains, registry keys, certificate fingerprints, and similar discrete observables. Behavioral patterns (process trees, sequence of actions) are not IoCs; they live one layer up as TTPs.",
    "source": "clear"
  },
  "Indirect Prompt Injection": {
    "term": "Indirect Prompt Injection",
    "definition": "An attack that plants instructions in content an AI system will read later (an email, a document, a log field, a web page), so the content steers the model instead of the user (OWASP LLM01:2025; MITRE ATLAS AML.T0051.001). In a SOC the attacker controls much of what an assistant reads, so an assistant with tools or outbound channels can be turned against the case. See Prompt Injection in the B.A.D. glossary and AI-assisted triage.",
    "source": "clear"
  },
  "Information Sharing and Analysis Centers (ISACs)": {
    "term": "Information Sharing and Analysis Centers (ISACs)",
    "definition": "Sector-based organizations (FS-ISAC, Health-ISAC and others) through which members share threat intelligence, indicators and incident experience under agreed handling rules. For triage they are a source of early, sector-specific indicators; respect the TLP marking on what they share.",
    "source": "clear"
  },
  "Infostealers": {
    "term": "Infostealers",
    "definition": "Software that harvests sensitive data from victims: passwords, session cookies, browser history, autofill, crypto wallets. The resulting logs are sold in bulk and are a leading source of the valid credentials and session tokens used for initial access.",
    "source": "bad-term"
  },
  "Infrastructure": {
    "term": "Infrastructure",
    "definition": "The systems, networks, and services that computing runs on. In triage the word points two directions: the organization's infrastructure is what alerts fire on, and attacker infrastructure is the set of C2 servers, domains, and staging hosts an adversary operates, which pivoting on indicators is meant to map.",
    "source": "clear"
  },
  "Initial Access": {
    "term": "Initial Access",
    "definition": "The ATT&CK tactic covering how attackers first gain a foothold inside the environment: phishing, exploited edge devices and public-facing applications, valid or stolen credentials, and exposed remote services. Reconnaissance and Resource Development come before it.",
    "source": "bad-term"
  },
  "Initial Access Broker (IAB)": {
    "term": "Initial Access Broker (IAB)",
    "definition": "A criminal who breaks in, or buys infostealer logs, and sells the resulting access (VPN credentials, RDP, a web shell) to ransomware and extortion crews. Explains why the intrusion you are triaging may have started weeks earlier under a different actor.",
    "source": "bad-term"
  },
  "Inject": {
    "term": "Inject",
    "definition": "A late artifact handed to participants during an exercise, after they have committed to a decision, to test whether they update it. See The capstone.",
    "source": "clear"
  },
  "Insider": {
    "term": "Insider",
    "definition": "Any person who has or had authorized access to, or knowledge of, an organization's resources: employees, contractors, vendors and partners, including people who have left while their access or knowledge remains. The word, in CISA's definition, says nothing about intent; see Insider Risk and Insider Threat.",
    "source": "bad-term"
  },
  "Insider Data Theft": {
    "term": "Insider Data Theft",
    "definition": "Unauthorized removal of sensitive data by someone with legitimate access: an employee, contractor, or a fraudulent remote hire such as a DPRK IT worker. Signals are behavioral (unusual volume, new destinations, off-hours access), not malware.",
    "source": "bad-term"
  },
  "Insider Risk": {
    "term": "Insider Risk",
    "definition": "The potential for harm from anyone with legitimate access, whether through mistakes, negligence, policy violations, well-meaning workarounds or deliberate misuse. It is the umbrella term, and most insider risk is not malicious. Insider threat is the deliberate subset. Some frameworks, including CISA's, fold the whole spectrum into 'insider threat', so map these labels to your organization's policy vocabulary.",
    "source": "bad-term"
  },
  "Insider Risk Management (IRM)": {
    "term": "Insider Risk Management (IRM)",
    "definition": "The program and tool category that watches for insider risk: user and entity behavior analytics (UEBA), data loss prevention (DLP) and privileged access management (PAM), often joined to HR data through connectors. It is deployed only after legal and privacy review (and works-council review where one exists), and it is the route by which HR-held context reaches a case.",
    "source": "bad-term"
  },
  "Insider Threat": {
    "term": "Insider Threat",
    "definition": "A person with authorized access who uses it to harm the organization. CISA's definition covers malicious, complacent and unintentional acts; many programs, ASSURED included, reserve 'insider threat' for the malicious subset and use 'insider risk' for the broader set.",
    "source": "bad-term"
  },
  "Insider Threat Matrix": {
    "term": "Insider Threat Matrix",
    "definition": "A public framework maintained by Forscie at insiderthreatmatrix.org that catalogs insider activity across five areas (motive, means, preparation, infringement, anti-forensics), with linked detections and preventions. Useful as a shared vocabulary for describing insider risk and threat.",
    "source": "clear"
  },
  "Insider-Risk Route": {
    "term": "Insider-Risk Route",
    "definition": "In ASSURED, the path for cases whose subject is an employee or contractor: the IR lead, the insider-program lead (or HR) and legal on one bridge, with visibility restricted. Analysts record observable technical activity; HR-held context reaches the case only through this route, never as analyst-collected notes. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Intake Channel": {
    "term": "Intake Channel",
    "definition": "The route by which a case enters triage: a detection, a user report, an external notification, a bug-bounty or disclosure report, a hunt finding, a provider escalation or an internal referral. For any channel other than a detection, the Alert question becomes \"what was reported, by whom, and what can we verify independently?\" See Intake beyond detections.",
    "source": "clear"
  },
  "Integrated Development Environment (IDE)": {
    "term": "Integrated Development Environment (IDE)",
    "definition": "Software that developers use to write, run, and debug code, such as VS Code, Cursor, or IntelliJ. IDEs matter in triage because their normal operation (spawning helpers, executing scripts, running plugin hosts with sandboxes disabled, making encrypted outbound calls) looks like post-exploitation on developer workstations. AI coding agents built into IDEs now also run shell commands on the developer's behalf. Malicious extensions are a real supply-chain vector, and a valid signature on the IDE says nothing about the extensions, MCP servers and package scripts running inside it, so inventory those before clearing an IDE alert.",
    "source": "clear"
  },
  "Intel 471": {
    "term": "Intel 471",
    "definition": "Commercial deep/dark-web monitoring with adversary infrastructure, TTP, and threat-actor behavior intelligence.",
    "source": "cat-tool"
  },
  "Intelligence": {
    "term": "Intelligence",
    "definition": "Information collected and analyzed to answer a decision-maker's question; in a SOC, usually threat intelligence. See Threat Intelligence for its levels and how to grade sources.",
    "source": "clear"
  },
  "Inter-Process Communication (IPC)": {
    "term": "Inter-Process Communication (IPC)",
    "definition": "Operating system mechanisms that let running processes exchange data, such as named pipes, shared memory, and local sockets. Triage-relevant because malware abuses these channels for command-and-control, privilege escalation, and coordination between implant components; named-pipe telemetry in particular is a staple of EDR detections for C2 frameworks such as Cobalt Strike, whose SMB beacons talk over named pipes.",
    "source": "clear"
  },
  "Inter-Rater Agreement": {
    "term": "Inter-Rater Agreement",
    "definition": "How often independent raters give the same score, usually reported with Cohen's kappa, which corrects for agreement by chance. ASSURED's teaching kit treats kappa below 0.60 as unusable and aims for 0.80 or higher. See The agreement target.",
    "source": "clear"
  },
  "Interception in Transit (Adversary-in-the-Middle)": {
    "term": "Interception in Transit (Adversary-in-the-Middle)",
    "definition": "Capturing or altering data as it crosses a network, by sniffing unencrypted protocols, ARP or LLMNR poisoning, or proxying a TLS session (as AiTM phishing kits do to steal session cookies).",
    "source": "bad-term"
  },
  "Internet Protocol (IP) Address": {
    "term": "Internet Protocol (IP) Address",
    "definition": "The numeric address a device uses to send and receive network traffic, and one of the most common pivot points in triage: reputation lookups, geolocation, registration data (RDAP, formerly WHOIS), and log correlation all key on it. Treat it as a weak proxy for identity, since NAT, VPNs, proxies, and shared cloud egress can put many actors behind one address.",
    "source": "clear"
  },
  "Internet of Things (IoT)": {
    "term": "Internet of Things (IoT)",
    "definition": "Network-connected devices such as cameras, badge readers, printers, sensors and building controls. Most cannot run EDR, ship few logs and are rarely patched, so triage depends on network telemetry (NDR, firewall, DHCP and NAC records). An IoT device reaching the internet or internal servers it never talks to is a strong signal.",
    "source": "clear"
  },
  "Intrusion Detection System (IDS)": {
    "term": "Intrusion Detection System (IDS)",
    "definition": "A sensor that inspects network traffic against signatures and anomaly rules and alerts on matches (Suricata, Snort; Zeek records the traffic it sees). Its alerts describe traffic, not outcome: an exploit signature firing does not mean the exploit worked. Check the target's response and the host's telemetry before rating it.",
    "source": "clear"
  },
  "Intrusion Prevention System (IPS)": {
    "term": "Intrusion Prevention System (IPS)",
    "definition": "An inline IDS that blocks the traffic it matches. A blocked exploit with no execution or follow-on evidence is contained by control: recorded at P3 or P4 and proposed as a pattern-entry candidate, not paged to IR. Confirm the block covered every path, since the same source may have tried another.",
    "source": "clear"
  },
  "Invalidation Trigger": {
    "term": "Invalidation Trigger",
    "definition": "In ASSURED, an event that forces immediate re-review of a pattern entry, with its closes moving to Level 1 meanwhile: the linked rule changed, the asset group was re-tagged, abuse of the pattern was observed, or an AI-matched entry's model, prompt or tool changed. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Investigation Loop": {
    "term": "Investigation Loop",
    "definition": "In ASSURED, the deliberate cycle Scope, Uncover, Risk: Risk findings send the analyst back for more evidence, a new entity re-enters Subject briefly, and Scope redraws the boundary, until the residual risk is understood or a confirmed criterion hands the case to IR. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "IoT Malware": {
    "term": "IoT Malware",
    "definition": "Designed to infect Internet of Things devices like routers, cameras, smart appliances. Often used in botnets (e.g., Mirai) due to weak authentication and outdated firmware.",
    "source": "bad-term"
  },
  "Isolation Forests": {
    "term": "Isolation Forests",
    "definition": "A machine-learning algorithm that flags anomalies by how few random splits it takes to isolate a data point: rare points isolate quickly. Common inside UEBA and anomaly engines. Like any anomaly score, it says the point is unusual, not that it is malicious.",
    "source": "clear"
  },
  "Ivanti Connect Secure (CVE-2023-46805 / CVE-2024-21887)": {
    "term": "Ivanti Connect Secure (CVE-2023-46805 / CVE-2024-21887)",
    "definition": "An authentication bypass chained with a command injection in Ivanti's VPN appliance, exploited as zero-days by a China-nexus actor from December 2023 and then at scale in January 2024, prompting a CISA emergency directive. A defining case of edge-device exploitation that leaves little or no endpoint telemetry, and of attackers persisting through appliance upgrades.",
    "source": "bad-term"
  },
  "JA3": {
    "term": "JA3",
    "definition": "A method (Salesforce, 2017) for fingerprinting TLS clients by hashing fields of the ClientHello (an MD5 of the version, ciphers, extensions, curves and point formats). Degraded against modern browsers: Chrome 110 (early 2023) began randomizing TLS extension order, which splits one client into many JA3 hashes. (JA3 already ignores GREASE values.) The salesforce/ja3 repository was archived in 2025; prefer JA4 for new detections.",
    "source": "clear"
  },
  "JA3S": {
    "term": "JA3S",
    "definition": "The server-side counterpart to JA3: a fingerprint of the TLS ServerHello. Superseded by JA4S.",
    "source": "clear"
  },
  "JA4": {
    "term": "JA4",
    "definition": "The 2023 successor to JA3 from FoxIO (FoxIO-LLC/ja4). A TLS-client fingerprint that sorts ciphers and extensions before hashing, so it stays consistent across connections from the same client build despite randomization. It handles TLS 1.3 and marks the transport with a leading \"t\" (TLS over TCP), \"q\" (QUIC) or \"d\" (DTLS). Part of the JA4+ suite, which adds separate fingerprints such as JA4H (HTTP client) and JA4S (TLS server). JA4 itself is BSD-3-Clause open source; the other JA4+ methods use the FoxIO License (free for internal use, licensed for commercial products), so check before embedding them in a product.",
    "source": "clear"
  },
  "Jailbreaking": {
    "term": "Jailbreaking",
    "definition": "Two senses. (1) Mobile: removing iOS or Android platform restrictions, usually by the device owner and sometimes by an attacker; for triage, a jailbroken or rooted device fails MDM compliance and cannot be trusted to enforce app sandboxing. (2) AI: prompts crafted to make a large language model ignore its safety policy; related to prompt injection (OWASP LLM01) and catalogued in MITRE ATLAS.",
    "source": "bad-term"
  },
  "Jamf Pro": {
    "term": "Jamf Pro",
    "definition": "Apple device management (macOS, iOS) for configuration profiles, patching, inventory and scripts; Jamf Protect adds macOS endpoint security.",
    "source": "cat-tool"
  },
  "Jenkins": {
    "term": "Jenkins",
    "definition": "Open-source CI/CD automation server; builds, tests, and deploys with a vast plugin ecosystem.",
    "source": "cat-tool"
  },
  "KAPE": {
    "term": "KAPE",
    "definition": "Kroll Artifact Parser and Extractor: a free-to-download triage tool (Kroll sells an enterprise license for commercial use on client engagements) that collects and parses forensic artifacts from a live system in minutes. A staple for fast evidence capture before (or instead of) full disk imaging.",
    "source": "cat-tool"
  },
  "KQL": {
    "term": "KQL",
    "definition": "Kusto Query Language: Microsoft's piped, read-only query language for Sentinel, Defender XDR Advanced Hunting, Log Analytics and Azure Data Explorer.",
    "source": "cat-tool"
  },
  "Kaspersky Next EDR": {
    "term": "Kaspersky Next EDR",
    "definition": "Kaspersky's endpoint detection and response line, formerly sold as Kaspersky EDR: attack-chain visualization, IOC search, sandboxing, and threat-intel integration with centralized management. The U.S. Commerce Department's BIS Final Determination (June 2024) barred U.S. sales from July 20, 2024 and updates from September 29, 2024, so any Kaspersky agent still on a U.S. host is unpatched.",
    "source": "cat-tool"
  },
  "Kerberoasting": {
    "term": "Kerberoasting",
    "definition": "Requesting Kerberos service tickets for accounts with SPNs and cracking them offline to recover the service account's password, which then enables privilege escalation, persistence or lateral movement. Since Microsoft's CVE-2026-20833 hardening (enforced April 2026, rollback removed July 2026), domain controllers issue AES service tickets by default to accounts with no explicit msDS-SupportedEncryptionTypes, and AES tickets are far slower to crack. In event 4769, a Ticket Encryption Type of 0x17 (RC4-HMAC) is now a strong signal, and service accounts still explicitly configured for RC4 are the prime targets.",
    "source": "bad-term"
  },
  "Kerberos": {
    "term": "Kerberos",
    "definition": "Active Directory's default authentication protocol (TCP/UDP 88). The KDC on each domain controller issues a ticket-granting ticket (TGT) at logon, then service tickets for specific resources. Ticket theft (pass-the-ticket), offline cracking (Kerberoasting) and forgery (golden and silver tickets) all target this flow. Key events: 4768 (TGT), 4769 (service ticket).",
    "source": "clear"
  },
  "Keylogger": {
    "term": "Keylogger",
    "definition": "Malware or a malware module that records keystrokes, usually to capture passwords and messages. Often bundled into RATs, infostealers and banker trojans.",
    "source": "bad-term"
  },
  "Kill Switch": {
    "term": "Kill Switch",
    "definition": "(1) In automation governance, the control that stops a machine from closing or acting and routes the queue back to analysts. ASSURED expects it at three scopes (per pattern entry, per automation or agent, global), held by a named owner and pulled in a test every quarter. See Governing automated triage. (2) In malware, a condition that makes the code stop, such as the domain that halted WannaCry's spread.",
    "source": "clear"
  },
  "Known Exploited Vulnerabilities (KEV) Catalog": {
    "term": "Known Exploited Vulnerabilities (KEV) Catalog",
    "definition": "CISA's list of vulnerabilities with reliable evidence of exploitation in the wild, each with a remediation due date for US federal agencies. A CVE on KEV is being exploited somewhere now, which makes it a stronger urgency signal than a high CVSS score. Check KEV first, then EPSS.",
    "source": "clear"
  },
  "Kubernetes": {
    "term": "Kubernetes",
    "definition": "The dominant container orchestration platform and an attack surface in its own right: exposed API servers, over-permissioned service account tokens, and container escapes can turn one compromised workload into a path across the cluster. Analysts meet it through Kubernetes audit logs and runtime telemetry, where short-lived pods complicate reconstructing what was running when an alert fired.",
    "source": "clear"
  },
  "LAPSUS$": {
    "term": "LAPSUS$",
    "definition": "Loosely organized group known for extortion, data leaks, and high-profile breaches. It got in through SIM swapping, credential theft and insider recruitment rather than malware, and courted media attention with public leaks. Members were believed to be primarily teenagers, and UK arrests and convictions followed. It favored disruption and publicity over stealth, and the name resurfaced in 2025 alongside Scattered Spider and ShinyHunters.",
    "source": "bad-actor"
  },
  "LOLBins": {
    "term": "LOLBins",
    "definition": "Living Off the Land Binaries: trusted, signed system executables (certutil, rundll32, mshta) weaponized so the malicious part is the argument line, not the file on disk. The evasion face of the Living Off The Land technique covered under Execution.",
    "source": "bad-term"
  },
  "Lansweeper": {
    "term": "Lansweeper",
    "definition": "IT asset discovery and inventory; CMDB foundations and continuous visibility into devices, software, and users.",
    "source": "cat-tool"
  },
  "Large Language Model (LLM)": {
    "term": "Large Language Model (LLM)",
    "definition": "A model trained on very large text corpora to predict and generate language: the engine behind chat assistants, SOC copilots and AI agents. It produces fluent text whether or not the content is correct (hallucination), and it can treat anything it reads, including attacker-controlled text in an email or log, as instructions (prompt injection, in the B.A.D. glossary). Useful for drafting; the analyst verifies and decides. See AI-assisted triage.",
    "source": "clear"
  },
  "Late P1": {
    "term": "Late P1",
    "definition": "In ASSURED, a P1 declared well after its first criterion was confirmed. The clock that matters runs from the first confirmed criterion to the page, and later confirmations do not restart it. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Lateral Movement": {
    "term": "Lateral Movement",
    "definition": "Moving from the initial foothold to other hosts, identities or tenants to find sensitive data or reach higher-value targets (ATT&CK tactic TA0008). It usually rides legitimate remote-access protocols (RDP, SMB, WinRM, SSH) with stolen credentials, or replays a stolen session into a cloud or SaaS tenant, so the signal is an account authenticating where it does not normally go. Each hop widens the blast radius, and confirmed lateral movement is an escalation criterion.",
    "source": "bad-term"
  },
  "Lazarus Group": {
    "term": "Lazarus Group",
    "definition": "Umbrella term for several North Korean operations under the Reconnaissance General Bureau, spanning espionage, sabotage, and financially motivated attacks: Sony Pictures, WannaCry, bank and crypto-exchange theft. It blends APT tradecraft with cybercrime to fund the regime. Its TraderTraitor cluster (Microsoft: Jade Sleet) stole about $1.5B from the Bybit exchange in February 2025, and a sister cluster (Jasper Sleet) places fake remote IT workers inside Western companies, now a routine hiring and insider-threat triage scenario.",
    "source": "bad-actor"
  },
  "Least Privilege": {
    "term": "Least Privilege",
    "definition": "Granting each identity, human or not, only the access its task requires, for only as long as it needs it. Triage cares because it bounds blast radius: Scope reads what a compromised identity can reach, and standing excess privilege makes every alert on that identity riskier.",
    "source": "clear"
  },
  "Leaver Window": {
    "term": "Leaver Window",
    "definition": "The period around a known departure, roughly the notice period, when insider data theft is most likely: CERT research on insider theft of intellectual property found that many of those who took data did so within about a month of leaving. The departure date reaches the SOC as a date, not as a reason to suspect anyone.",
    "source": "bad-term"
  },
  "Legacy Systems": {
    "term": "Legacy Systems",
    "definition": "Systems still in production past vendor support, or unable to take modern controls: old Windows builds, unsupported appliances, industrial controllers. They often cannot run EDR or forward rich logs, so triage relies on network evidence and records missing telemetry as a gap. Old, reliable exploits still work on them.",
    "source": "clear"
  },
  "Legal Hold": {
    "term": "Legal Hold",
    "definition": "A directive, usually from legal counsel, to preserve information relevant to actual or reasonably anticipated litigation or investigation, suspending normal deletion and retention rules. A hold can attach to the logs, mailboxes and devices in a case; once one exists, nothing in its scope may be wiped, reimaged or allowed to roll off without counsel's sign-off.",
    "source": "clear"
  },
  "LenelS2": {
    "term": "LenelS2",
    "definition": "OnGuard access control, video, and alarm management for enterprise environments. Acquired by Honeywell from Carrier in June 2024.",
    "source": "cat-tool"
  },
  "Lessons Learned": {
    "term": "Lessons Learned",
    "definition": "The post-incident step, in the NIST and SANS lifecycles alike, that turns a case into changes to detections, playbooks, controls and training. Triage records feed it, so a well-written closure record or handoff packet is what makes the lesson findable later. See Post-Mortem.",
    "source": "clear"
  },
  "Lethal Trifecta": {
    "term": "Lethal Trifecta",
    "definition": "An AI agent that combines three capabilities: access to private data, exposure to untrusted content, and a way to send data out (links or images it renders, web fetches, email, tool calls). With all three, a prompt injection hidden in the untrusted content can make the agent read the private data and send it to the attacker. Removing any one leg breaks that path. The name is Simon Willison's (June 2025). A triage assistant holds the first two legs by design, so ASSURED's admission gate removes the third; see Governing automated triage.",
    "source": "bad-term"
  },
  "Level 0": {
    "term": "Level 0",
    "definition": "In ASSURED, the pattern-close rung of the depth ladder: a case that matches a current, approved pattern entry, passes the eligibility gate and checks out on every discriminator closes in about five minutes with a five-field record. The close is an early Escalation decision. A failed discriminator moves the case to Level 1. See the fast path. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Level 0 (Pattern Close)": {
    "term": "Level 0 (Pattern Close)",
    "definition": "The five-minute rung, for a case that matches a current entry in the pattern library. The subject passes the eligibility gate, every discriminator checks out against its source system, and nothing about the case is novel. Only the authorized and benign-confirmed activity verdicts close here. The close is an early Escalation decision, recorded in the five-field record.",
    "source": "assured",
    "methodTerm": true
  },
  "Level 0 Audit Sample": {
    "term": "Level 0 Audit Sample",
    "definition": "In ASSURED, the weekly re-check of Level 0 closes: a second analyst re-verifies a random sample against raw telemetry, at least one close per pattern entry. A confirmed false close suspends the entry. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Level 0 Parity": {
    "term": "Level 0 Parity",
    "definition": "In ASSURED, the boundary for machine execution: a machine may close a case only where a human could close it at Level 0, under the same governed pattern entry, and only when every condition holds: the entry carries the machine-close flag; discriminators are evaluated by code; the eligibility gate is enforced; humans QA-sample the closes; reversal and miss rates are tracked; a kill switch and a named owner exist. Above it, AI assistants are advisory. See Governing automated triage. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Level 0 Reversal Rate": {
    "term": "Level 0 Reversal Rate",
    "definition": "Level 0 closes overturned on re-verification, divided by closes re-verified, per pattern entry. One confirmed false close reaches the default reversal threshold and suspends the entry. See Measuring triage.",
    "source": "clear"
  },
  "Level 1": {
    "term": "Level 1",
    "definition": "In ASSURED, standard triage: the compressed pass, about 15 to 45 minutes, for a case with no matching pattern entry (or one failed discriminator) and a bounded blast radius. Every phase runs; several collapse into single moves. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Level 1 (Standard Triage)": {
    "term": "Level 1 (Standard Triage)",
    "definition": "The compressed pass, about 15 to 45 minutes, for a case with no matching pattern (or one failed discriminator) and a bounded blast radius: a single subject, ordinary privilege, and nothing suggesting the activity touched regulated data. Every phase runs; several collapse into single moves, and Uncover narrows to the one question the verdict turns on.",
    "source": "assured",
    "methodTerm": true
  },
  "Level 2": {
    "term": "Level 2",
    "definition": "In ASSURED, the full arc of seven phases, about 25 to 80 minutes for a senior analyst. Any one trigger suffices: a crown-jewel subject, a privileged identity, or regulated data plausibly accessed by the activity under review; a second subject; a novel detection or a correlated chain; anything Level 1 could not resolve. Regulated data merely in reach is a Scope flag. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Level 2 (Full Arc)": {
    "term": "Level 2 (Full Arc)",
    "definition": "The seven phases as the chapters teach them, about 25 to 80 minutes for a senior analyst. Any one trigger suffices: a crown-jewel subject, a privileged identity, or regulated data plausibly accessed by the activity under review; a second subject; a novel detection or a correlated chain; a spike in closes against one pattern entry; anything suspicious Level 1 could not resolve. Regulated data merely in reach is a Scope flag, not a Level 2 trigger.",
    "source": "assured",
    "methodTerm": true
  },
  "Level Mix": {
    "term": "Level Mix",
    "definition": "The share of cases closed at Level 0, Level 1 and Level 2, with machine closes as their own line. A shift in the mix is a capacity and pattern-library signal. See Measuring triage.",
    "source": "clear"
  },
  "LevelBlue Open Threat Exchange (OTX, formerly AlienVault OTX)": {
    "term": "LevelBlue Open Threat Exchange (OTX, formerly AlienVault OTX)",
    "definition": "Collaborative threat-intel exchange aggregating IOCs from a global community, with SIEM/automated integrations. Free community \"pulses\" of IOCs; quality varies by contributor, so corroborate before acting.",
    "source": "cat-tool"
  },
  "Likelihood": {
    "term": "Likelihood",
    "definition": "In ASSURED, the second axis of the triage matrix: how probable it is, given the evidence, that the activity is malicious or unauthorized (High, Medium or Low). It is an estimative judgment, informed by the evidence and never raised above what the evidence supports; threat actor intent and exploitation & scope inform it. Analytic confidence in that estimate is a separate line, scored on the shared confidence rubric and recorded beside it. Unknown is not Low: when the deciding evidence could not be examined, likelihood reads Medium at minimum, confidence reads Low, and the gap is recorded as an open question. (Classical risk management uses likelihood for the probability that a threat exploits a vulnerability; ASSURED applies it to the activity under review.) Full entry: ASSURED terms.",
    "source": "clear"
  },
  "Linux auditd": {
    "term": "Linux auditd",
    "definition": "The Linux Audit framework's user-space daemon: records system calls (execve, connect), file watches and authentication events according to configured rules.",
    "source": "cat-tool"
  },
  "Live Response": {
    "term": "Live Response",
    "definition": "An EDR remote shell on an endpoint, Microsoft Defender for Endpoint's name for the feature, used to collect forensic data such as memory, files and process lists. It still works on a network-isolated host, which stays connected to the EDR service. See Preserve before you contain.",
    "source": "clear"
  },
  "Living Off The Land": {
    "term": "Living Off The Land",
    "definition": "Abusing legitimate tools already on the host (on Windows: PowerShell, certutil, rundll32, mshta, bitsadmin; on Linux/macOS: curl, python, osascript). See LOLBAS, GTFOBins and LOOBins.",
    "source": "bad-term"
  },
  "Living Off the Land (LOTL)": {
    "term": "Living Off the Land (LOTL)",
    "definition": "Attackers using tools already on the system (PowerShell, WMI, certutil, rundll32, remote-management agents) instead of their own malware, so there is little to block and the activity blends with administration. Triage turns on context, not on the binary's legitimacy: the parent process, the arguments, the user and the timing. See System Binary.",
    "source": "clear"
  },
  "LockBit": {
    "term": "LockBit",
    "definition": "The most deployed ransomware-as-a-service operation of 2022-2023, responsible for thousands of victims across every sector. Ran a professionalized affiliate program with a slick leak site, bug bounties, and payment discipline. Operation Cronos seized its infrastructure in February 2024, and in May 2024 the same taskforce named and sanctioned its leader, Dmitry Khoroshev. The brand nonetheless returned as LockBit 5.0 in September 2025, with Windows, Linux and ESXi builds: takedowns degrade RaaS programs rather than end them.",
    "source": "bad-actor"
  },
  "Log": {
    "term": "Log",
    "definition": "A timestamped record of an event emitted by a system, application, or security control. Logs are the raw evidence of triage: the alert points at a moment in time, and the surrounding log entries are how the analyst reconstructs what actually happened.",
    "source": "clear"
  },
  "Log Parsing": {
    "term": "Log Parsing",
    "definition": "Parsing applied to log records: extracting fields from raw log lines so they can be searched and correlated. See Parsing and Normalization.",
    "source": "clear"
  },
  "Log4Shell": {
    "term": "Log4Shell",
    "definition": "CVE-2021-44228, a critical remote code execution (RCE) flaw in Apache Log4j. Attacker-controlled input is interpolated into a log message that triggers a JNDI lookup to an attacker's server. On older JVMs that server hands back a class to run; on patched JVMs exploitation used gadget chains, and even failed attempts leaked environment secrets through DNS lookups (a key triage clue). Disclosed December 2021 and exploited globally within hours, it affected vast swaths of Java applications, renewed calls for software bills of materials and open-source security funding, and reset assumptions about transitive-dependency risk.",
    "source": "bad-campaign"
  },
  "Log4Shell (CVE-2021-44228)": {
    "term": "Log4Shell (CVE-2021-44228)",
    "definition": "Critical RCE in Apache Log4j. A logged string containing ${jndi:ldap://…} triggers a JNDI lookup; the attacker hosts a class on the referenced server that the JVM then fetches and runs.",
    "source": "bad-term"
  },
  "LogRhythm SIEM": {
    "term": "LogRhythm SIEM",
    "definition": "Self-hosted SIEM with log normalization, correlation (AI Engine rules) and case management, now sold by Exabeam after the 2024 merger.",
    "source": "cat-tool"
  },
  "Logic Bombs": {
    "term": "Logic Bombs",
    "definition": "Malicious code triggered by specific conditions, such as a date or user action. Can remain dormant until activated, then execute destructive or stealthy functions.",
    "source": "bad-term"
  },
  "Logstash": {
    "term": "Logstash",
    "definition": "Server-side pipeline that ingests, transforms, and forwards data; the 'L' in the classic ELK stack. Still widely used but no longer required: Elastic now describes Elastic Agent with an integration as usually the simplest ingest path.",
    "source": "cat-tool"
  },
  "Low-and-Slow": {
    "term": "Low-and-Slow",
    "definition": "Performing actions gradually or in minimal increments (scheduled transfers, small data chunks, sparse logins) to remain under detection thresholds. Detection needs long look-back windows rather than per-hour thresholds.",
    "source": "bad-term"
  },
  "Lumma Stealer": {
    "term": "Lumma Stealer",
    "definition": "The dominant malware-as-a-service infostealer of the mid-2020s, inheriting RedLine's and Raccoon's market. Harvests browser credentials, cookies, session tokens, and crypto wallets; the resulting logs are sold in bulk and seed downstream intrusions, including the 2024 Snowflake customer breaches. Distributed via malvertising, cracked software, and fake-CAPTCHA ClickFix lures. A May 2025 action led by Microsoft and the U.S. DOJ took down or blocked about 2,300 Lumma domains, though operators attempted to rebuild.",
    "source": "bad-family"
  },
  "MAC Address Spoofing": {
    "term": "MAC Address Spoofing",
    "definition": "Changing a network interface's hardware (MAC) address to impersonate an allowed device and slip past network access control (NAC) or MAC filtering. Note that phones and laptops now randomize Wi-Fi MACs by default, so a changing MAC is usually privacy behavior, not an attack.",
    "source": "bad-term"
  },
  "MD5": {
    "term": "MD5",
    "definition": "A 128-bit hash function that is cryptographically broken: collisions can be manufactured cheaply (RFC 6151). Still common as an IoC identifier, but pivot on SHA-256 where possible.",
    "source": "clear"
  },
  "MFA Fatigue": {
    "term": "MFA Fatigue",
    "definition": "Flooding a user with push-notification approval requests, sometimes paired with a call pretending to be IT, until they accept one. Also called push bombing. Number matching and phishing-resistant MFA defeat it.",
    "source": "bad-term"
  },
  "MISP": {
    "term": "MISP",
    "definition": "Open-source threat-intelligence platform and sharing standard: stores events, attributes and galaxies, and syncs them between trusted communities.",
    "source": "cat-tool"
  },
  "MITRE ATT&CK": {
    "term": "MITRE ATT&CK",
    "definition": "MITRE's public knowledge base of adversary tactics, techniques and procedures observed in real intrusions, with Enterprise, Mobile and ICS matrices. Enterprise v19 (April 2026) split Defense Evasion into Stealth and Defense Impairment. Triage uses it as a shared vocabulary: map what the evidence shows to technique IDs, record the version, and remember that a mapping names behavior without scoring it. See the ATT&CK Tactic, Technique and Procedure entries.",
    "source": "clear"
  },
  "MITRE Caldera": {
    "term": "MITRE Caldera",
    "definition": "Open-source adversary-emulation platform from MITRE that runs ATT&CK-mapped operations through deployed agents.",
    "source": "cat-tool"
  },
  "MOVEit Transfer mass exploitation": {
    "term": "MOVEit Transfer mass exploitation",
    "definition": "May–June 2023 zero-day SQL-injection in Progress Software's MOVEit Transfer (CVE-2023-34362), exploited at scale by the Cl0p ransomware group. Thousands of organizations were affected through the vendor's customer base, including U.S. federal agencies, state DMVs and Fortune 500 firms. A defining case for third-party-software risk and for ransomware groups shifting from encryption to pure data extortion. The actor is profiled above under Cl0p.",
    "source": "bad-campaign"
  },
  "MS-ISAC": {
    "term": "MS-ISAC",
    "definition": "Multi-State ISAC for U.S. state, local, tribal, and territorial governments; alerts, IR, and risk management resources. Operated by the Center for Internet Security (CIS). DHS/CISA funding ended after 30 September 2025, and MS-ISAC moved to fee-based membership, so check current membership terms.",
    "source": "cat-tool"
  },
  "MSAB": {
    "term": "MSAB",
    "definition": "Mobile forensics for law enforcement; XRY for extraction, XAMN for evidence visualization, XEC for lab management.",
    "source": "cat-tool"
  },
  "Machine-Close Flag": {
    "term": "Machine-Close Flag",
    "definition": "In ASSURED, a per-entry, per-version switch on a pattern entry, off by default, that permits a machine close once every Level 0 parity condition holds. Turning it on needs a second person's approval, and any change to the entry turns it off again. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Macro-based Execution": {
    "term": "Macro-based Execution",
    "definition": "Malicious VBA (or legacy Excel 4.0/XLM) macros in Office files that run when the user enables content, or automatically from a Trusted Location. Since 2022, Office on Windows blocks macros by default in files carrying Mark of the Web (downloads and email attachments), so attackers moved to container files (ISO, LNK), HTML smuggling (T1027.006) and paste-and-run lures (T1204.004). When a macro alert fires today, ask how the file got past the block: user Unblock, missing MOTW, a Trusted Location, or a policy exception.",
    "source": "bad-term"
  },
  "Magic Hound": {
    "term": "Magic Hound",
    "definition": "Iranian group conducting espionage against academics, human rights activists, and government entities through phishing, fake social personas and credential harvesting. It is known for impersonating journalists and think tanks, has supported Iran's surveillance and foreign intelligence collection for over a decade, and is still active.",
    "source": "bad-actor",
    "aliasOf": "Charming Kitten"
  },
  "Magnet AXIOM": {
    "term": "Magnet AXIOM",
    "definition": "Forensics across computers, mobile, cloud and IoT; artifact parsing and cross-source correlation in one case.",
    "source": "cat-tool"
  },
  "Malvertising": {
    "term": "Malvertising",
    "definition": "Paid ads, especially search ads, that impersonate legitimate software downloads and lead to trojanized installers (often loaders or infostealers). Sibling technique: SEO poisoning (T1608.006), which games organic search results instead of buying ads.",
    "source": "bad-term"
  },
  "Malware": {
    "term": "Malware",
    "definition": "Software designed to disrupt, damage, or gain unauthorized access to systems. Encompasses ransomware, trojans, worms, viruses, spyware, wipers, rootkits, and the other malware types catalogued below.",
    "source": "bad-term"
  },
  "Managed Detection and Response (MDR)": {
    "term": "Managed Detection and Response (MDR)",
    "definition": "An outsourced service that monitors an organization's telemetry, triages alerts and often takes first response actions on its behalf. The provider triages; accountability for the outcome stays with the customer, so the escalation path, pre-authorized actions and evidence-sharing terms belong in the contract.",
    "source": "clear"
  },
  "Managed Identity": {
    "term": "Managed Identity",
    "definition": "In Azure, an Entra service principal whose credentials the platform manages for an Azure resource, so no secret is stored. Its sign-ins go to the AADManagedIdentitySignInLogs table. See Non-human identities and cloud roles.",
    "source": "clear"
  },
  "Managed Security Service Provider (MSSP)": {
    "term": "Managed Security Service Provider (MSSP)",
    "definition": "An outsourced provider that monitors and triages security events for many customers. The provider owns the triage; the customer keeps accountability for the asset, the business context and the decisions only an owner can make. See Managed Detection and Response (MDR) and Running ASSURED as an MSSP or MDR.",
    "source": "clear"
  },
  "Mandatory Access Control (MAC)": {
    "term": "Mandatory Access Control (MAC)",
    "definition": "An access policy where permissions are centrally controlled and enforced based on classifications. Not to be confused with a MAC address (the hardware address of a network interface).",
    "source": "clear"
  },
  "Mandiant Security Validation (formerly Verodin)": {
    "term": "Mandiant Security Validation (formerly Verodin)",
    "definition": "Breach-and-attack simulation validating security controls against real-world TTPs. Verodin acquired by FireEye, 2019; renamed 2020; Mandiant acquired by Google Cloud, 2022.",
    "source": "cat-tool"
  },
  "Mark of the Web (MOTW)": {
    "term": "Mark of the Web (MOTW)",
    "definition": "The Zone.Identifier alternate data stream Windows attaches to files that arrive from the internet or by email. Office blocks macros in files that carry it and SmartScreen warns on them, which is why attackers deliver payloads inside containers (ISO, VHD, some archive formats) or through extraction tools that do not pass the mark on (ATT&CK T1553.005). A downloaded payload with no MOTW is worth asking why.",
    "source": "clear"
  },
  "Mark-of-the-Web Bypass": {
    "term": "Mark-of-the-Web Bypass",
    "definition": "Delivering files in containers or formats that do not carry the Mark-of-the-Web zone tag (ISO, VHD, some archives) so SmartScreen and Office's macro block never apply. A file from the internet that lacks MOTW is worth asking about.",
    "source": "bad-term"
  },
  "Masquerading": {
    "term": "Masquerading",
    "definition": "Disguising a malicious process, file or task as a trusted one (sometimes called process masquerading): svchost.exe running from C:\\Users\\Public, or a scheduled task named like a Windows one. Check the path, signer and parent, not the name. Matching a legitimate name or location (T1036.005) is the most common form.",
    "source": "bad-term"
  },
  "Material AI Use": {
    "term": "Material AI Use",
    "definition": "In ASSURED, the record line that names the assistant and version used and which sections began as AI drafts, or \"none\", so a later reader can weight the provenance of what they read. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Materiality (SEC)": {
    "term": "Materiality (SEC)",
    "definition": "The test that triggers a US public company's cybersecurity disclosure: whether there is a substantial likelihood that a reasonable investor would consider the incident important. The company must make that determination without unreasonable delay after discovery, and Form 8-K Item 1.05 is due within four business days of determining that an incident is material. Triage does not decide materiality; it supplies the facts and timestamps the people who do decide will rely on.",
    "source": "clear"
  },
  "Maze": {
    "term": "Maze",
    "definition": "Pioneered double extortion (encrypting systems and stealing data, then threatening to leak it) in late 2019, running a RaaS model with a public leak blog. It exploited RDP, phishing, and known vulnerabilities, and used Cobalt Strike and Mimikatz internally. Announced retirement in late 2020, but affiliates continued under the Egregor banner (the code-sharing Sekhmet family had operated in parallel).",
    "source": "bad-family"
  },
  "Mean Time To Acknowledge (MTTA)": {
    "term": "Mean Time To Acknowledge (MTTA)",
    "definition": "A triage flow metric: acknowledged minus detected, reported as the median and the 90th percentile per priority band rather than as a mean. Acknowledged means the first recorded analyst action on the case; opening or claiming a ticket does not count. See Measuring triage.",
    "source": "clear"
  },
  "Mean Time To Detect (MTTD)": {
    "term": "Mean Time To Detect (MTTD)",
    "definition": "Detection time minus the time of first malicious activity. An incident metric, not a triage one: only IR's compromise timeline establishes the time of first activity, and for a benign close it does not exist. FIRST's Security Incident Timing Metrics define it. See Measuring triage.",
    "source": "clear"
  },
  "Mean Time To Respond/Resolve (MTTR)": {
    "term": "Mean Time To Respond/Resolve (MTTR)",
    "definition": "A widely quoted speed metric whose R is ambiguous: respond, resolve, remediate or recover, depending on who reports it. Properly it is an incident metric: FIRST's Security Incident Timing Metrics measure time to respond, contain and remediate from the time of first malicious activity, which only IR's compromise timeline establishes. Never report it without its formula. Triage's own clocks (time to acknowledge, time to verdict, time to decision) start at detection, and a mean hides the long-tail cases, so report medians and the 90th percentile and pair speed with quality measures such as the reopen rate and handoff rework. See Measuring triage.",
    "source": "clear"
  },
  "Memory Capture": {
    "term": "Memory Capture",
    "definition": "Imaging a running system's RAM, also called memory acquisition, before a reboot, reimage or process termination destroys it. Memory holds what disk does not: injected code, decrypted payloads, live connections, keys. On a production server it can destabilize the system, so it needs the owner's approval. See Order of Volatility and Preserve before you contain.",
    "source": "clear"
  },
  "Merged into Case": {
    "term": "Merged into Case",
    "definition": "In ASSURED, a status on a member alert grouped into a case, not a disposition. The member keeps its own detection-axis verdict; the case carries the activity verdict. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Message trace (concept)": {
    "term": "Message trace (concept)",
    "definition": "The mail platform's delivery log: sender, recipients, subject, message ID, timestamps and the verdict each filter gave a message.",
    "source": "cat-tool"
  },
  "Metadata": {
    "term": "Metadata",
    "definition": "Data about data: file timestamps, owner, size, hash; an email's headers; a process's parent, command line, and signing certificate. In triage, metadata is often more diagnostic than the content itself.",
    "source": "clear"
  },
  "Microsoft Configuration Manager (ConfigMgr; formerly SCCM/MECM)": {
    "term": "Microsoft Configuration Manager (ConfigMgr; formerly SCCM/MECM)",
    "definition": "Patching, software distribution, and compliance for Windows ecosystems; now part of the Microsoft Intune family alongside cloud-only endpoint management.",
    "source": "cat-tool"
  },
  "Microsoft Defender": {
    "term": "Microsoft Defender",
    "definition": "Microsoft's security suite: Defender Antivirus, Defender for Endpoint (EDR), and Defender XDR, which correlates endpoint, identity (Defender for Identity), email (Defender for Office 365) and SaaS (Defender for Cloud Apps) signals into incidents in the Microsoft Defender portal; analysts hunt across the raw data with KQL in Advanced Hunting.",
    "source": "cat-tool"
  },
  "Microsoft Defender EASM": {
    "term": "Microsoft Defender EASM",
    "definition": "External attack surface management: discovers and monitors internet-facing assets, third-party services and shadow IT. Built on technology from RiskIQ (Microsoft acquired RiskIQ in 2021) and integrated with Microsoft Security Exposure Management.",
    "source": "cat-tool"
  },
  "Microsoft Defender Threat Intelligence (now in Defender XDR and Sentinel)": {
    "term": "Microsoft Defender Threat Intelligence (now in Defender XDR and Sentinel)",
    "definition": "Successor to RiskIQ PassiveTotal (acquired by Microsoft, 2021). Standalone MDTI was retired on August 1, 2026; its passive DNS, WHOIS, certificate and threat-actor data now surface in the Microsoft Defender portal (Threat Analytics, Intel explorer and entity-page enrichment) and in Microsoft Sentinel, at no extra cost for Defender XDR and Sentinel customers.",
    "source": "cat-tool"
  },
  "Microsoft Defender for Cloud": {
    "term": "Microsoft Defender for Cloud",
    "definition": "Microsoft's CNAPP: posture management and workload protection plans (servers, containers, storage, databases) across Azure, AWS and GCP.",
    "source": "cat-tool"
  },
  "Microsoft Defender for Identity": {
    "term": "Microsoft Defender for Identity",
    "definition": "Microsoft's ITDR sensor for Active Directory, AD FS and AD CS: detects reconnaissance, credential attacks (Kerberoasting, DCSync, pass-the-ticket) and lateral movement from domain-controller traffic.",
    "source": "cat-tool"
  },
  "Microsoft Defender for Office 365": {
    "term": "Microsoft Defender for Office 365",
    "definition": "Microsoft's email and collaboration protection for Exchange Online, Teams and SharePoint: Safe Links, Safe Attachments, anti-phishing policies, Threat Explorer and automated investigation.",
    "source": "cat-tool"
  },
  "Microsoft Entra ID (formerly Azure AD)": {
    "term": "Microsoft Entra ID (formerly Azure AD)",
    "definition": "Microsoft's cloud identity provider: SSO, MFA, Conditional Access. Triage evidence lives in the sign-in logs (interactive and non-interactive), audit logs, and Microsoft Entra ID Protection risk detections.",
    "source": "cat-tool"
  },
  "Microsoft Intune": {
    "term": "Microsoft Intune",
    "definition": "Microsoft's cloud endpoint management for Windows, macOS, iOS and Android: compliance policies, app deployment, scripts and Windows Autopatch updates.",
    "source": "cat-tool"
  },
  "Microsoft Security Copilot": {
    "term": "Microsoft Security Copilot",
    "definition": "Microsoft's generative-AI security assistant, embedded in Defender, Entra, Intune and Purview and available standalone, with agents for phishing triage and other tasks.",
    "source": "cat-tool"
  },
  "Microsoft Sentinel": {
    "term": "Microsoft Sentinel",
    "definition": "Microsoft's cloud SIEM/SOAR (formerly Azure Sentinel), built on Log Analytics and queried with KQL; playbooks run on Azure Logic Apps. Built-in UEBA and an optional lower-cost data lake tier. Now runs in the unified Microsoft Defender portal; Azure portal support ends 31 March 2027.",
    "source": "cat-tool"
  },
  "Microsoft WSUS": {
    "term": "Microsoft WSUS",
    "definition": "Windows Server role for approving and distributing Microsoft updates on-premises. Deprecated since September 2024: still shipped and security-patched, but no new features. Microsoft recommends Windows Autopatch or Intune for clients and Azure Update Manager for servers. Treat WSUS servers as high-value targets: CVE-2025-59287, a critical WSUS remote-code-execution flaw, was added to CISA KEV on 24 October 2025 after in-the-wild exploitation.",
    "source": "cat-tool"
  },
  "Midnight Blizzard": {
    "term": "Midnight Blizzard",
    "definition": "Sophisticated espionage group associated with Russia's SVR, built for stealth and long-term access. It targets governments, think tanks, healthcare and vaccine researchers. It is the group behind the SolarWinds SUNBURST compromise (tracked by Mandiant as UNC2452 until it was merged into APT29 in April 2022). Custom malware, living-off-the-land and well-crafted spear-phishing let its operations go undetected for months. As Midnight Blizzard (Microsoft's name), it breached Microsoft's own corporate email in 2023-2024 by password-spraying a legacy test tenant.",
    "source": "bad-actor",
    "aliasOf": "APT29"
  },
  "Milestone Systems": {
    "term": "Milestone Systems",
    "definition": "Open-platform IP video management (XProtect) with broad camera support and analytics integrations.",
    "source": "cat-tool"
  },
  "Mimecast": {
    "term": "Mimecast",
    "definition": "Secure email gateway and email-security platform with URL and attachment protection, archiving and awareness training; also owns Incydr (insider risk).",
    "source": "cat-tool"
  },
  "Mimecast Incydr (formerly Code42 Incydr)": {
    "term": "Mimecast Incydr (formerly Code42 Incydr)",
    "definition": "Insider-risk and data-exfiltration detection across endpoint, cloud, email and browser; flags sensitive files moving to personal cloud storage, file-sharing sites or unsanctioned GenAI tools. Code42 was acquired by Mimecast in 2024 and Incydr is now a Mimecast product.",
    "source": "cat-tool"
  },
  "Mimikatz": {
    "term": "Mimikatz",
    "definition": "The canonical credential-theft tool: reads LSASS (Local Security Authority Subsystem Service) memory to extract plaintext passwords, NTLM hashes, and Kerberos tickets, and implements pass-the-hash, pass-the-ticket, golden and silver tickets. Written by Benjamin Delpy as a proof of concept; now embedded in nearly every intrusion toolchain and re-implemented inside countless loaders and C2 frameworks. EDR watches lsass access patterns specifically because of it, and Credential Guard and LSA protection, now default-on for many Windows 11 configurations, block its classic LSASS read.",
    "source": "bad-family"
  },
  "Mint Sandstorm": {
    "term": "Mint Sandstorm",
    "definition": "Iranian group conducting espionage against academics, human rights activists, and government entities through phishing, fake social personas and credential harvesting. It is known for impersonating journalists and think tanks, has supported Iran's surveillance and foreign intelligence collection for over a decade, and is still active.",
    "source": "bad-actor",
    "aliasOf": "Charming Kitten"
  },
  "Missed Incident": {
    "term": "Missed Incident",
    "definition": "A confirmed incident with at least one related alert or case that triage had closed as benign. Each one is reviewed, not averaged, and the past misses join the golden set. See Measuring triage.",
    "source": "clear"
  },
  "Mitigation": {
    "term": "Mitigation",
    "definition": "Action that reduces a risk without eliminating it: a compensating control, a workaround, a temporary block. Distinct from remediation, which fixes the underlying issue.",
    "source": "clear"
  },
  "Mobile Application Management (MAM)": {
    "term": "Mobile Application Management (MAM)",
    "definition": "Protection applied to corporate apps and their data rather than to the whole device (app PINs, copy and save restrictions, selective wipe), the usual control on personally owned phones. A MAM-only device has no device telemetry, so evidence comes from the identity provider and the apps.",
    "source": "clear"
  },
  "Mobile Malware": {
    "term": "Mobile Malware",
    "definition": "Malware targeting mobile devices, often distributed via malicious apps or phishing links. Includes SMS stealers, fake banking apps, mobile RATs.",
    "source": "bad-term"
  },
  "Model Context Protocol (MCP)": {
    "term": "Model Context Protocol (MCP)",
    "definition": "An open protocol for connecting AI assistants and agents to tools and data sources through MCP servers. Each server describes its tools to the model and runs as code the host trusts, so a tampered tool description or an over-scoped token becomes the assistant's problem. Inventory MCP servers like extensions; a signed host does not vouch for them. See AI-assisted triage.",
    "source": "clear"
  },
  "Multi-Factor Authentication (MFA)": {
    "term": "Multi-Factor Authentication (MFA)",
    "definition": "Security system requiring two or more verification methods to grant access, combining something you know, have, or are. Not all MFA is equal. OTP codes, SMS and push approvals can be relayed by adversary-in-the-middle phishing proxies, worn down by push bombing (MFA fatigue), or bypassed by SIM swap and help-desk resets. A stolen session token skips MFA entirely. Phishing-resistant factors (FIDO2 security keys, passkeys, certificate-based auth) bind the login to the real site's origin and defeat AiTM. In triage, \"MFA was satisfied\" is evidence about the factor, not about the person.",
    "source": "clear"
  },
  "N-Day Vulnerability": {
    "term": "N-Day Vulnerability",
    "definition": "A vulnerability that is publicly known and has a fix, but is not yet patched on a given system. Attackers often weaponize n-days within days of disclosure, sometimes by reverse-engineering the patch itself, which is why the gap between patch release and patch deployment is attack surface.",
    "source": "clear"
  },
  "NIDS (concept)": {
    "term": "NIDS (concept)",
    "definition": "Network intrusion detection: inspects traffic for signatures, protocol anomalies, and behavioral indicators.",
    "source": "cat-tool"
  },
  "NIST Cybersecurity Framework 2.0 (CSF 2.0)": {
    "term": "NIST Cybersecurity Framework 2.0 (CSF 2.0)",
    "definition": "NIST's outcome framework (CSWP 29, 26 February 2024), organized as six Functions (Govern, Identify, Protect, Detect, Respond, Recover), each split into Categories and Subcategories. It states what an organization should achieve, not how. Triage performs two of its outcomes most directly: DE.AE, Adverse Event Analysis, and RS.MA, Incident Management. See Standards mapping.",
    "source": "clear"
  },
  "NIST SP 800-61r3": {
    "term": "NIST SP 800-61r3",
    "definition": "NIST's incident response guidance, revision 3 (April 2025), written as the CSF 2.0 Community Profile for incident response. It replaced revision 2, which NIST withdrew on 3 April 2025, so r2's four-phase lifecycle is history rather than the current model. r3 says what an incident response program should achieve and leaves the choice of life-cycle model to the organization. See Standards mapping.",
    "source": "clear"
  },
  "NOBELIUM": {
    "term": "NOBELIUM",
    "definition": "Sophisticated espionage group associated with Russia's SVR, built for stealth and long-term access. It targets governments, think tanks, healthcare and vaccine researchers. It is the group behind the SolarWinds SUNBURST compromise (tracked by Mandiant as UNC2452 until it was merged into APT29 in April 2022). Custom malware, living-off-the-land and well-crafted spear-phishing let its operations go undetected for months. As Midnight Blizzard (Microsoft's name), it breached Microsoft's own corporate email in 2023-2024 by password-spraying a legacy test tenant.",
    "source": "bad-actor",
    "aliasOf": "APT29"
  },
  "NTDS.dit Extraction": {
    "term": "NTDS.dit Extraction",
    "definition": "Copying the Active Directory database (ntds.dit) and the SYSTEM hive from a domain controller to extract every account's hash offline.",
    "source": "bad-term"
  },
  "NTLM Relay": {
    "term": "NTLM Relay",
    "definition": "Forwarding a victim's NTLM handshake to another service (SMB, LDAP, MSSQL, or AD CS HTTP enrollment) to authenticate as the victim without knowing the password. Relaying to an SMB server is often called SMB relay. Usually paired with authentication coercion (PetitPotam, the printer bug) or LLMNR/NBT-NS poisoning. Blunted by SMB signing (required by default for inbound and outbound on Windows 11 24H2 Pro/Enterprise/Education, outbound only on Server 2025), LDAP signing and channel binding, Extended Protection for Authentication on AD CS, and Microsoft's deprecation of NTLM (announced 2024; NTLMv1 removed in Windows 11 24H2 / Server 2025).",
    "source": "bad-term"
  },
  "NVD / EUVD": {
    "term": "NVD / EUVD",
    "definition": "Public vulnerability databases: the U.S. National Vulnerability Database (NIST) and the EU Vulnerability Database (ENISA). Both enrich CVE records with severity scores, affected products and references.",
    "source": "cat-tool"
  },
  "NYDFS Part 500 (23 NYCRR 500)": {
    "term": "NYDFS Part 500 (23 NYCRR 500)",
    "definition": "The New York Department of Financial Services cybersecurity regulation for its licensed entities. Section 500.17 sets a 72-hour notice of a cybersecurity incident, a 24-hour notice of an extortion payment and a written explanation of that payment within 30 days. See Notification clocks.",
    "source": "clear"
  },
  "NetBackup (formerly Veritas NetBackup)": {
    "term": "NetBackup (formerly Veritas NetBackup)",
    "definition": "Enterprise-grade backup with broad workload coverage and centralized hybrid-cloud management. Cohesity acquired NetBackup with Veritas' data-protection business in December 2024.",
    "source": "cat-tool"
  },
  "NetFlow": {
    "term": "NetFlow",
    "definition": "Cisco's flow-export format: per-connection metadata (5-tuple, bytes, packets, timestamps) without payloads. Standardized as IPFIX (RFC 7011); cloud equivalents are AWS VPC Flow Logs, Azure VNet flow logs and GCP VPC Flow Logs.",
    "source": "cat-tool"
  },
  "Netskope": {
    "term": "Netskope",
    "definition": "SSE platform combining secure web gateway, CASB, zero-trust network access and inline DLP for web and SaaS traffic.",
    "source": "cat-tool"
  },
  "Network Detection and Response (NDR)": {
    "term": "Network Detection and Response (NDR)",
    "definition": "Sensors that analyze network traffic and flow metadata to detect threats, often against learned baselines, and support response such as blocking or isolating. NDR sees devices that cannot run EDR (appliances, IoT, unmanaged hosts) and lateral traffic inside the perimeter, but encryption limits how much of the payload it can inspect.",
    "source": "clear"
  },
  "Network Segmentation": {
    "term": "Network Segmentation",
    "definition": "Dividing a network into zones with controlled paths between them. It limits blast radius and shapes Scope: what a compromised host can reach depends on the segmentation rules as they were at the time, not as the diagram says. Traffic crossing a boundary it should not is a lateral-movement signal.",
    "source": "clear"
  },
  "Network Traffic": {
    "term": "Network Traffic",
    "definition": "The data moving between hosts on a network, observed as connections, flows, and packets. In triage, traffic metadata (who talked to whom, when, how much, and over which port and protocol) is often the fastest way to confirm or rule out command and control, exfiltration, or lateral movement.",
    "source": "clear"
  },
  "Network and Information Security Directive (NIS2)": {
    "term": "Network and Information Security Directive (NIS2)",
    "definition": "The EU directive (2022/2555) on cybersecurity for essential and important entities in sectors such as energy, transport, health, digital infrastructure and managed services, applied through each member state's national law. For a significant incident it sets an early warning within 24 hours of becoming aware, an incident notification within 72 hours, and a final report within one month. Which entities are in scope, and to whom they report, depends on the member state.",
    "source": "clear"
  },
  "Nikto": {
    "term": "Nikto",
    "definition": "Open-source web-server scanner for dangerous files, outdated components, and known issues.",
    "source": "cat-tool"
  },
  "Ninite Pro": {
    "term": "Ninite Pro",
    "definition": "Automates installation and updates of popular third-party software across many endpoints.",
    "source": "cat-tool"
  },
  "Nmap": {
    "term": "Nmap",
    "definition": "Network discovery and security auditing with NSE scripting for service detection.",
    "source": "cat-tool"
  },
  "Node.js": {
    "term": "Node.js",
    "definition": "Event-driven JavaScript runtime on V8; backend services, APIs, automation scripts, and tooling.",
    "source": "cat-tool"
  },
  "Non-Human Identity (NHI)": {
    "term": "Non-Human Identity (NHI)",
    "definition": "An identity used by software rather than a person: service accounts, cloud roles and workload identities, API keys, OAuth applications, CI/CD tokens, AI agents. Non-human identities often outnumber people, hold standing privilege, skip MFA, and behave predictably, so one doing something interactive or new is a strong Subject signal. They are subjects in their own right. See Non-human identities and cloud roles.",
    "source": "clear"
  },
  "Normalization": {
    "term": "Normalization",
    "definition": "Converting logs and events from different sources into a common field schema, such as OCSF, ECS, Splunk CIM, Microsoft Sentinel ASIM or Google SecOps UDM, so a username, IP, or timestamp means the same thing regardless of which tool recorded it. SIEM correlation rules and cross-source queries depend on it; fields that were never normalized are where searches silently miss.",
    "source": "clear"
  },
  "NotPetya": {
    "term": "NotPetya",
    "definition": "Destructive cyberattack masquerading as ransomware, attributed to Russia's GRU Sandworm. Spread via a compromised update to Ukrainian accounting software (MeDoc), then jumped globally. It irreversibly wiped disks despite the ransom note. Maersk, Merck and FedEx were among the victims, damages ran into the billions, and it remains a defining case study in supply-chain abuse.",
    "source": "bad-campaign"
  },
  "Notification Incident (US Banking Rule)": {
    "term": "Notification Incident (US Banking Rule)",
    "definition": "Under the US federal banking regulators' computer-security incident notification rule, an incident that has materially disrupted or degraded, or is reasonably likely to, a banking organization's operations. It starts a 36-hour notice to the primary federal regulator. See Notification clocks.",
    "source": "clear"
  },
  "Number Matching": {
    "term": "Number Matching",
    "definition": "An MFA push variant in which the user types a number shown on the sign-in screen into the authenticator app, so a blind or fatigued approval cannot complete the sign-in. A countermeasure to MFA fatigue.",
    "source": "clear"
  },
  "OAuth Consent Grant (Illicit Consent)": {
    "term": "OAuth Consent Grant (Illicit Consent)",
    "definition": "A user's or admin's approval that lets a third-party application act on their data with the permissions (scopes) it requested, such as Mail.Read and offline_access. Attackers abuse it by luring users into consenting to a malicious app (consent phishing), which gives API access that survives a password reset and MFA. Triage: check the publisher's verification, the scopes, and the consent event in the audit log. Revoking the grant is a non-reversible step that needs IR or owner approval unless the protocol pre-authorizes it. ATT&CK T1528.",
    "source": "clear"
  },
  "OCSF": {
    "term": "OCSF",
    "definition": "Open Cybersecurity Schema Framework: vendor-neutral event schema (classes such as Authentication, Process Activity, Network Activity) adopted by Amazon Security Lake and many SIEM pipelines.",
    "source": "cat-tool"
  },
  "OPM breach": {
    "term": "OPM breach",
    "definition": "2015 breaches exposing 21.5 million SF-86 background-investigation records, including 5.6 million fingerprint sets, plus 4.2 million personnel files. Attributed to Chinese state-sponsored actors, the stolen files gave a foreign intelligence service a map of who holds U.S. security clearances. Major reforms in U.S. government cybersecurity practices and incident response readiness followed.",
    "source": "bad-campaign"
  },
  "ORB Network": {
    "term": "ORB Network",
    "definition": "Operational relay box network: compromised or leased routers, IoT devices and VPS nodes chained into a proxy mesh that nation-state actors route through (Volt Typhoon's KV botnet is one example). Traffic arrives from residential or small-business IPs near the victim, which defeats IP reputation and geolocation checks.",
    "source": "bad-term"
  },
  "Obfuscation": {
    "term": "Obfuscation",
    "definition": "Making code, commands or data hard to read or detect: encoding, string splitting, variable expansion, packing. Attackers use it to slip past detection; vendors use it legitimately to protect code. Deobfuscate before judging: decode, expand and unpack, then read what the command or script actually does.",
    "source": "clear"
  },
  "Octo Tempest": {
    "term": "Octo Tempest",
    "definition": "Native-English-speaking group behind the 2023 MGM and Caesars intrusions and the defining identity-attack playbook: help-desk social engineering, SIM swapping, MFA fatigue, AiTM phishing kits, then abuse of the victim's own identity provider (IdP) and cloud tooling. It overlaps with the loose \"The Com\" ecosystem and later partnered with RaaS operations for encryption. In April 2025 it hit UK retail (M&S, Co-op, Harrods); at M&S, DragonForce's encryptor was deployed on VMware ESXi hosts. UK arrests followed in July 2025. U.S. prosecutors charged Thalha Jubair over at least 120 intrusions and $115M in ransoms, and in July 2026 Jubair and Owen Flowers were sentenced in the UK for the 2024 Transport for London hack. The NCA says the action effectively halted the group, but its playbook (help-desk resets, MFA re-registration, hypervisor encryption) is widely copied. The actor profile most relevant to single sign-on (SSO) era triage.",
    "source": "bad-actor",
    "aliasOf": "Scattered Spider"
  },
  "Office for Civil Rights (OCR)": {
    "term": "Office for Civil Rights (OCR)",
    "definition": "The US Department of Health and Human Services office that enforces the HIPAA Privacy, Security and Breach Notification Rules. Breaches affecting 500 or more individuals are reported to it within 60 days of discovery; smaller ones are logged and reported within 60 days after the end of the calendar year.",
    "source": "clear"
  },
  "Okta": {
    "term": "Okta",
    "definition": "Identity platform with SSO, MFA, lifecycle management, and federation across thousands of apps.",
    "source": "cat-tool"
  },
  "Okta support-system breach": {
    "term": "Okta support-system breach",
    "definition": "October 2023 intrusion of Okta's customer support case-management system. Attackers used a service-account credential that an employee had saved to their personal Google account, which was signed in to Chrome on the employee's Okta-managed laptop. They used it to access HAR files that customers had uploaded for troubleshooting. Some of those files contained valid session tokens. Okta later disclosed that the attacker also downloaded a report containing the names and email addresses of all its customer-support-system users. Drove home that \"support\" surfaces handle production credentials and need the same identity-provider rigor as the products themselves.",
    "source": "bad-campaign"
  },
  "One Identity": {
    "term": "One Identity",
    "definition": "IGA with lifecycle management, role-based access control (RBAC) and privileged-access governance; unifies Active Directory, Microsoft Entra ID, and cloud-platform identities.",
    "source": "cat-tool"
  },
  "Open Question": {
    "term": "Open Question",
    "definition": "In ASSURED, a gap the analyst could not close, recorded explicitly: what is unknown, why, and what would resolve it. Open questions keep unknowns from passing as negatives (see Unknown Is Not Low), and they form section 8 of the handoff packet, where IR picks up. For a claim of malicious activity, the open question is whatever kept it below High confidence. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "OpenC2": {
    "term": "OpenC2",
    "definition": "An OASIS standard language for machine-to-machine commands to cyber-defense tools (block this address, isolate this host), meant to let orchestration platforms drive devices from different vendors through one vocabulary. Adoption is still limited.",
    "source": "clear"
  },
  "OpenCTI": {
    "term": "OpenCTI",
    "definition": "Open-source threat-intelligence platform that models intelligence as a STIX 2.1 knowledge graph (actors, campaigns, indicators, observables and their relationships).",
    "source": "cat-tool"
  },
  "OpenText ESM (formerly ArcSight)": {
    "term": "OpenText ESM (formerly ArcSight)",
    "definition": "OpenText Enterprise Security Manager: the long-standing correlation-focused SIEM sold for years as ArcSight, common in compliance-driven shops. OpenText has owned it since its 2023 acquisition of Micro Focus. CEF, the Common Event Format, originated at ArcSight.",
    "source": "cat-tool"
  },
  "OpenText Forensic (formerly EnCase Forensic)": {
    "term": "OpenText Forensic (formerly EnCase Forensic)",
    "definition": "Long-standing digital-investigation suite, sold as EnCase Forensic until OpenText's rebrand; acquisition, indexing, analysis, and court-ready reporting. Its E01 (EnCase evidence file) image format remains widely supported across forensic tools.",
    "source": "cat-tool"
  },
  "Operation Aurora": {
    "term": "Operation Aurora",
    "definition": "2009–2010 China-attributed intrusions targeting Google, Adobe, and dozens of others. Zero-day in Internet Explorer used to deploy backdoors and steal source code and IP. Google's public disclosure was a turning point in public discussion of state-sponsored industrial espionage and APTs.",
    "source": "bad-campaign"
  },
  "Operation ShadowHammer": {
    "term": "Operation ShadowHammer",
    "definition": "2019 supply-chain compromise of the ASUS software update utility. Compromised updates were signed and shipped from ASUS's own servers, reaching hundreds of thousands. The payload activated only on specific targets (matched by MAC address), suggesting selective espionage. It combined stolen code-signing certificates with supply-chain trust and has been linked to nation-state-capable APT activity.",
    "source": "bad-campaign"
  },
  "Orca Security": {
    "term": "Orca Security",
    "definition": "Agentless cloud security; full-stack visibility, vulnerability management, and risk prioritization across cloud workloads.",
    "source": "cat-tool"
  },
  "Order of Volatility": {
    "term": "Order of Volatility",
    "definition": "The principle (RFC 3227) of collecting evidence from the most to the least short-lived: CPU state and memory, network connections and running processes, temporary files, disk, then remote logs and backups. A reboot or an EDR isolation can destroy the top of the list, which is why preservation comes before containment. See Preserve before you contain.",
    "source": "clear"
  },
  "Organizationally Unique Identifier (OUI)": {
    "term": "Organizationally Unique Identifier (OUI)",
    "definition": "The first 24 bits of a MAC address, assigned by the IEEE to a specific organization, typically a hardware vendor. Looking up the OUI turns an unknown MAC into a vendor name when hunting rogue or unmanaged devices, but modern endpoints randomize their MAC addresses. A randomized MAC sets the locally administered bit, so a second hex digit of 2, 6, A or E (for example x2:xx:...) means no vendor lookup will work, and the address is not a stable device identity.",
    "source": "clear"
  },
  "Orphaned Credentials": {
    "term": "Orphaned Credentials",
    "definition": "Accounts, keys or tokens that outlived their owner or purpose: a leaver's account never disabled, a key for a retired app, an OAuth grant nobody remembers. Attackers prize them because nobody notices their use. Activity from an account whose owner has left, or from a credential with no owner in the inventory, deserves a Subject review.",
    "source": "clear"
  },
  "Out-of-Band Communication": {
    "term": "Out-of-Band Communication",
    "definition": "A channel for coordinating a response that does not depend on the systems the attacker may control: a separate identity provider, a phone bridge, a pager. ATT&CK mitigation M1060. See Talking to people during triage.",
    "source": "clear"
  },
  "Out-of-Band Verification": {
    "term": "Out-of-Band Verification",
    "definition": "Confirming that a notifier, caller or instruction is genuine through a contact channel you found yourself (a published number, the contract contact), never one supplied in the notice. See Call-Back Verification and External notifications.",
    "source": "clear"
  },
  "Overpass-the-Hash (Pass-the-Key)": {
    "term": "Overpass-the-Hash (Pass-the-Key)",
    "definition": "Using a stolen NT hash or Kerberos key to request a real Kerberos ticket, so the attacker continues with Kerberos instead of NTLM and blends in with normal domain authentication.",
    "source": "bad-term"
  },
  "Override Rules": {
    "term": "Override Rules",
    "definition": "In ASSURED, the only three ways a matrix cell is modified, applied in order: the escalation tripwire raises the case to P1; the high-impact clock tightens a High/Low P3; de-escalation is explicit, with a named reason. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Oxygen Forensic Detective": {
    "term": "Oxygen Forensic Detective",
    "definition": "Mobile, cloud, drone, and IoT forensics with deep parsing of app data including secure messengers.",
    "source": "cat-tool"
  },
  "PAN-OS GlobalProtect (CVE-2024-3400)": {
    "term": "PAN-OS GlobalProtect (CVE-2024-3400)",
    "definition": "Unauthenticated command injection (CVSS 10.0) in the GlobalProtect feature of Palo Alto Networks firewalls, exploited as a zero-day in April 2024 to run code as root on the firewall itself. Another reminder that the security appliance at the edge is itself attack surface.",
    "source": "bad-term"
  },
  "PEAK": {
    "term": "PEAK",
    "definition": "Splunk SURGe's threat hunting framework (2023), Prepare, Execute, and Act with Knowledge, covering hypothesis-driven, baseline and model-assisted hunts. A hunt finding reaches triage with its hypothesis already formed: enter it in the hypothesis ledger. See Hunt findings.",
    "source": "clear"
  },
  "PRT Theft": {
    "term": "PRT Theft",
    "definition": "Stealing an Entra ID Primary Refresh Token, the device-bound token Windows uses for single sign-on to Microsoft cloud services. A stolen PRT gives the attacker the user's cloud sessions with MFA already satisfied. Token protection and hardware-backed keys make extraction harder.",
    "source": "bad-term"
  },
  "Packet Capture Files (PCAP)": {
    "term": "Packet Capture Files (PCAP)",
    "definition": "Full copies of network traffic, payload included, read with tools such as Wireshark or Zeek. The highest-fidelity network evidence and the rarest: most environments keep only flow metadata, and encryption hides most payloads. Where a sensor can capture, preserve the PCAP for the case window before it rolls off.",
    "source": "clear"
  },
  "Palo Alto Networks NGFW": {
    "term": "Palo Alto Networks NGFW",
    "definition": "Next-generation firewalls (PA-Series, VM-Series) with App-ID, User-ID, threat prevention and URL filtering, managed by PAN-OS and Strata Cloud Manager.",
    "source": "cat-tool"
  },
  "Parent PID Spoofing": {
    "term": "Parent PID Spoofing",
    "definition": "Spawns processes that appear to be launched by trusted executables (like explorer.exe), misleading analysts and EDR that rely on the process tree.",
    "source": "bad-term"
  },
  "Parsing": {
    "term": "Parsing",
    "definition": "Breaking a raw alert, log line, or command string into its component fields so each can be examined on its own: the user, the host, the action, the time. In triage, parsing the alert is the first move; the details that decide a verdict live in the fields, not in the alert name. Alert parsing and log parsing are the same move applied to different inputs.",
    "source": "clear"
  },
  "Pass-the-Hash": {
    "term": "Pass-the-Hash",
    "definition": "Using stolen password hashes to authenticate without needing to crack or know the actual password. Also called hash injection, because tools such as Mimikatz (sekurlsa::pth) inject the stolen NT hash into a new logon session.",
    "source": "bad-term"
  },
  "Pass-the-Ticket": {
    "term": "Pass-the-Ticket",
    "definition": "Stealing a Kerberos ticket (TGT or service ticket) from one session and injecting it into another to authenticate as that user without the password or hash. A stolen TGT can request tickets for any service the identity is entitled to; a stolen service ticket opens only the one service it was issued for.",
    "source": "bad-term"
  },
  "Passkey": {
    "term": "Passkey",
    "definition": "A FIDO2 credential that replaces a password: a public-key pair bound to the site's origin, unlocked on the device with a biometric or PIN. Synced passkeys live in a platform account or password manager and follow the user across devices; device-bound passkeys stay on one security key or device. Both resist phishing proxies, but a synced passkey is only as safe as the account that syncs it.",
    "source": "clear"
  },
  "Password": {
    "term": "Password",
    "definition": "A shared secret used to authenticate. A correct password proves only that someone had it: passwords are phished, reused, sprayed and sold from infostealer logs. A password reset alone does not evict an attacker who holds a session or refresh token. See Token.",
    "source": "clear"
  },
  "Password Cracking": {
    "term": "Password Cracking",
    "definition": "Using brute force, dictionary attacks, or rainbow tables to recover plaintext passwords from hashes.",
    "source": "bad-term"
  },
  "Password Spraying": {
    "term": "Password Spraying",
    "definition": "Trying a small number of common passwords against many accounts to avoid lockouts.",
    "source": "bad-term"
  },
  "Pattern Entry": {
    "term": "Pattern Entry",
    "definition": "In ASSURED, one record in the pattern library: the benign behavior, its discriminators, known mimicry and blind spots, eligibility constraints, an owner and an approver, a review date, a validation test and the close history. Every Level 0 close cites the entry and the version it matched. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Pattern Library": {
    "term": "Pattern Library",
    "definition": "In ASSURED, the SOC's written catalog of known-benign alert patterns, each entry with named discriminators, an owner, a version and a review date, approved by a second person. It is governed like code: version history, invalidation triggers (a rule change, observed abuse), an optional machine-close flag, and a reversal threshold that suspends the entry automatically. A five-minute Level 0 close is earned by a current entry, not granted by the timer. See the fast path. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Payment Card Industry Data Security Standard (PCI DSS)": {
    "term": "Payment Card Industry Data Security Standard (PCI DSS)",
    "definition": "The PCI Security Standards Council's data security standard for any entity that stores, processes, or transmits payment card account data (cardholder data and/or sensitive authentication data), debit as well as credit. Current version as of 2026: v4.0.1; its future-dated requirements became mandatory on 31 March 2025. It is enforced by contract through the card brands and acquirers rather than by statute. A suspected CDE compromise can trigger card-brand notification and a PCI Forensic Investigator (PFI) engagement.",
    "source": "clear"
  },
  "Peer Validation": {
    "term": "Peer Validation",
    "definition": "Having a second analyst review a triage verdict or escalation decision before it is finalized. A standard SOC quality control, because a fresh set of eyes catches assumptions and confirmation bias the original analyst can no longer see.",
    "source": "clear"
  },
  "Peer-to-Peer (P2P) C2": {
    "term": "Peer-to-Peer (P2P) C2",
    "definition": "Mesh-like networks where infected systems communicate with each other to share commands and updates without a centralized server, so taking down one node does not cut the botnet off.",
    "source": "bad-term"
  },
  "Penetration Testing": {
    "term": "Penetration Testing",
    "definition": "An authorized, scoped attempt to find and exploit weaknesses, usually time-boxed and goal-driven. Its activity fires real alerts. Verify each against the engagement record (scope, hosts, operators, window) before recording a benign true positive, because a real intruder can hide inside a test window.",
    "source": "clear"
  },
  "Permissible Actions Protocol (PAP)": {
    "term": "Permissible Actions Protocol (PAP)",
    "definition": "A companion marking to TLP that says what a recipient may do with shared intelligence, not who may see it. PAP:RED: passive, non-detectable use only (search your own logs; no lookups the adversary could observe). PAP:AMBER: passive cross-checks, such as queries to third-party services like VirusTotal. PAP:GREEN: active actions such as blocking or probing the infrastructure. PAP:CLEAR: no restrictions. Read it before you look up or block an indicator from a partner report. See Traffic Light Protocol (TLP).",
    "source": "clear"
  },
  "Persistence": {
    "term": "Persistence",
    "definition": "The ATT&CK tactic for keeping access across reboots, updates and password changes. Mature actors plant several anchors: Run keys, scheduled tasks, services, WMI event subscriptions, and in the cloud, OAuth apps and added MFA methods.",
    "source": "bad-term"
  },
  "Personal Access Token (PAT)": {
    "term": "Personal Access Token (PAT)",
    "definition": "A long-lived bearer token issued to a user or bot account in a source-control or SaaS platform, often broadly scoped and rarely rotated. A password reset does not revoke it. See Non-human identities and cloud roles.",
    "source": "clear"
  },
  "Personal Data (GDPR)": {
    "term": "Personal Data (GDPR)",
    "definition": "Under GDPR Art. 4(1), any information relating to an identified or identifiable natural person, directly or indirectly: names, identification numbers, location data, online identifiers such as IP addresses and cookie IDs, and factors specific to a person's identity. Broader than most US PII definitions, so most identity and network logs about people contain it.",
    "source": "clear"
  },
  "Personally Identifiable Information (PII)": {
    "term": "Personally Identifiable Information (PII)",
    "definition": "Information that identifies a person, or can be linked to one directly or in combination with other data: names, account IDs, email and IP addresses, device identifiers, location. Legal definitions vary (NIST's covers anything 'linked or linkable' to an individual; GDPR's 'personal data' is broader than most US 'PII' definitions), so tag generously and let privacy decide.",
    "source": "clear"
  },
  "Phase": {
    "term": "Phase",
    "definition": "In ASSURED, one of the seven steps (Alert, Subject, Scope, Uncover, Risk, Escalation decision, Documentation), each with one question to answer and one deliverable for the next. A thinking order, not a waiting queue: a confirmed criterion escalates from any phase. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "PhishTank": {
    "term": "PhishTank",
    "definition": "Community-validated database of phishing URLs; supplies security tools and browsers with up-to-date intelligence.",
    "source": "cat-tool"
  },
  "Phishing": {
    "term": "Phishing",
    "definition": "Deceptive messages (email, SMS, QR codes, chat apps, phone) that impersonate a trusted sender to steal credentials or session tokens or to get malware run. Modern kits proxy the real login page (adversary-in-the-middle) to capture the MFA-authenticated session cookie, so MFA alone does not stop them. Some lures skip credentials and get the user to paste a command into the Run dialog or a terminal. See AiTM Phishing, Device Code Phishing, Illicit Consent Grant and ClickFix.",
    "source": "bad-term"
  },
  "Phishing Simulation": {
    "term": "Phishing Simulation",
    "definition": "An authorized phishing campaign run by the awareness team to measure and train reporting. A user's report of one is a correct report of authorized activity, so it closes as a true positive, authorized (benign true positive), not as a false positive. Check the simulation schedule before working a reported phish.",
    "source": "clear"
  },
  "Ping Identity": {
    "term": "Ping Identity",
    "definition": "Cloud-first identity for SSO, MFA, and customer IAM, across hybrid and multi-cloud estates. Both Ping and ForgeRock are owned by Thoma Bravo, which merged ForgeRock into Ping in 2023; ForgeRock's lifecycle and governance products now ship under the Ping brand.",
    "source": "cat-tool"
  },
  "PingCastle": {
    "term": "PingCastle",
    "definition": "Active Directory security assessment tool: scores a domain's hygiene and lists risky configurations (stale admins, weak delegation, legacy protocols). Unrelated to Ping Identity.",
    "source": "cat-tool"
  },
  "Play": {
    "term": "Play",
    "definition": "Ransomware group active since June 2022 that CISA and its partners describe as presumed to be a closed group rather than an open RaaS program; by May 2025 about 900 organizations had been affected. Ways in have included FortiOS flaws (CVE-2018-13379, CVE-2020-12812), Exchange ProxyNotShell, exposed RDP and VPN, and in 2025 SimpleHelp remote-support software (CVE-2024-57727). It uses intermittent encryption (encrypting only parts of each file, for speed) and has an ESXi variant.",
    "source": "bad-actor"
  },
  "Playbook": {
    "term": "Playbook",
    "definition": "A predefined, repeatable procedure for handling a specific alert or incident type: the steps, the decision points, the exit criteria. Playbooks encode the SOC's institutional memory so the response does not depend on who is on shift; SOAR platforms automate their mechanical steps. The fast path's pattern library is a playbook collection with discriminators attached.",
    "source": "clear"
  },
  "Playcrypt": {
    "term": "Playcrypt",
    "definition": "Ransomware group active since June 2022 that CISA and its partners describe as presumed to be a closed group rather than an open RaaS program; by May 2025 about 900 organizations had been affected. Ways in have included FortiOS flaws (CVE-2018-13379, CVE-2020-12812), Exchange ProxyNotShell, exposed RDP and VPN, and in 2025 SimpleHelp remote-support software (CVE-2024-57727). It uses intermittent encryption (encrypting only parts of each file, for speed) and has an ESXi variant.",
    "source": "bad-actor",
    "aliasOf": "Play"
  },
  "Policy Violation": {
    "term": "Policy Violation",
    "definition": "In ASSURED, the activity-axis verdict for activity that broke policy without evidence of malicious intent. It cannot close at Level 0. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Polymorphic Malware": {
    "term": "Polymorphic Malware",
    "definition": "Malware that changes its bytes, and therefore its hash, with each copy (re-encryption, mutated decryptor stubs) while its behavior stays the same. It defeats hash IOCs, not behavioral detection.",
    "source": "bad-term"
  },
  "Port": {
    "term": "Port",
    "definition": "A 16-bit number from 0 to 65535 carried in TCP and UDP headers that tells a host which service or process the traffic belongs to: 443 for HTTPS, 22 for SSH, 3389 for RDP. In triage, ports are a cheap tell; a standard service on a nonstandard port, or traffic to a port that should not be listening, is worth a second look.",
    "source": "clear"
  },
  "Post-Exploitation": {
    "term": "Post-Exploitation",
    "definition": "Everything the attacker does after the first foothold: exploring the environment, escalating access, exfiltrating data, or setting up long-term control.",
    "source": "bad-term"
  },
  "Post-Mortem": {
    "term": "Post-Mortem",
    "definition": "The structured retrospective an organization runs after a closed incident: timeline, decisions, what worked, what failed, what the team learned. A good post-mortem points back at detection, process, or training gaps. A blameless one names the system, not the person.",
    "source": "clear"
  },
  "PowerShell": {
    "term": "PowerShell",
    "definition": "Microsoft's shell and scripting language: Windows PowerShell 5.1 on .NET Framework, cross-platform PowerShell 7 on .NET. The most abused interpreter on Windows (ATT&CK T1059.001). Triage tells: -EncodedCommand or -enc (Base64 of UTF-16LE text), -NoProfile, -WindowStyle Hidden, IEX with a download cradle, and an Office or browser parent. Script Block Logging (Event ID 4104) records de-obfuscated script content.",
    "source": "clear"
  },
  "Pre-authorized Actions": {
    "term": "Pre-authorized Actions",
    "definition": "In ASSURED, the short written list of containment actions triage may take without waiting for IR, agreed in advance with IR and the business owners: typically isolate a host, disable an account, revoke sessions, and disable a consented application's sign-in. Every action on the list is reversible. Preserve before you contain, and get IR or owner approval for non-reversible steps such as a credential reset or a grant revocation unless the protocol lists them for that scenario. See Containment authority. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Precision (Detection)": {
    "term": "Precision (Detection)",
    "definition": "Detection-axis true positives divided by alerts with a detection verdict, per rule and rule version. Benign true positives count as correct: a rule that fires accurately on authorized activity is precise and needs context, not a logic change. See Per-rule numbers.",
    "source": "clear"
  },
  "Premature Closure": {
    "term": "Premature Closure",
    "definition": "Settling on a verdict before the evidence supports it, often because the first plausible explanation fits, and then not looking further (tunnel vision). It bites in Uncover and Risk. Counter: name what would change the verdict, and check it before closing.",
    "source": "clear"
  },
  "Preserve Before You Contain": {
    "term": "Preserve Before You Contain",
    "definition": "In ASSURED, the ordering rule for containment: capture the volatile evidence and the artifacts a containment action would destroy, then take the pre-authorized action. Pre-authorized actions are reversible; non-reversible ones need IR or owner approval unless the protocol lists them. See Preserve before you contain. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Pretexting": {
    "term": "Pretexting",
    "definition": "Social engineering built on an invented scenario rather than a malicious payload: the caller claiming to be IT support, the \"CEO\" emailing about an urgent confidential deal, the vendor with new bank details. The pretext gives the target a plausible reason to comply. The delivery mechanism behind business email compromise and most voice phishing.",
    "source": "clear"
  },
  "Primary Refresh Token (PRT)": {
    "term": "Primary Refresh Token (PRT)",
    "definition": "A long-lived token Microsoft Entra ID issues to a registered device at sign-in, used to get access tokens for apps without prompting again. A stolen PRT, or a session cookie derived from one, lets an attacker sign in as the user and can satisfy device-based Conditional Access. Revoking sessions, not only resetting the password, is what invalidates it.",
    "source": "clear"
  },
  "Priority Band (P1 to P4)": {
    "term": "Priority Band (P1 to P4)",
    "definition": "How fast someone must act, read off the matrix cell. A priority scale, not a severity taxonomy: vendor severity is the detection's opening guess, while the band is the analyst's call after scoring. Any confirmed criterion makes the case P1 whatever the cell. The default clocks are in the table below.",
    "source": "assured",
    "methodTerm": true
  },
  "Priority Band (P1-P4)": {
    "term": "Priority Band (P1-P4)",
    "definition": "In ASSURED, the urgency the triage matrix assigns a case, which sets its clocks. P1: page immediately, no-acknowledgment fallback at 15 minutes, escalate with a warm handoff. P2: acknowledge within 15 minutes, escalate within 4 hours. P3: queue, keep working and re-score within 24 hours on a named trigger (within hours for a High-impact, Low-likelihood cell), then close or escalate. P4: documented close within the queue SLA. The clocks are defaults for adopters to tune. A confirmed criterion makes any case P1. See the priority matrix. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Privilege Chaining": {
    "term": "Privilege Chaining",
    "definition": "The sequential use of multiple smaller privilege escalations or credential compromises to progressively gain more powerful access. Each step may look minor on its own (a misconfigured service, a readable credential file, an over-broad group membership), which is why tools such as BloodHound model attack paths rather than single permissions.",
    "source": "bad-term"
  },
  "Privilege Escalation": {
    "term": "Privilege Escalation",
    "definition": "The ATT&CK tactic for gaining higher permissions: on the endpoint, standard user to admin to SYSTEM; in the directory or cloud, a regular account to domain admin or a privileged cloud role.",
    "source": "bad-term"
  },
  "Privileged Access Management (PAM)": {
    "term": "Privileged Access Management (PAM)",
    "definition": "Tools that vault privileged credentials, broker or record privileged sessions, and grant elevation just in time. PAM records are triage evidence: who checked out which credential, when, and what the session did. Privileged activity that bypassed PAM where policy says it must not is itself a signal.",
    "source": "clear"
  },
  "Privileged Identity": {
    "term": "Privileged Identity",
    "definition": "In ASSURED, a member of a privileged role or group in the identity provider, or automation holding deploy, signing, secrets or repository-write rights. A privileged identity always fails the Level 0 eligibility gate and routes to Level 2. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Process": {
    "term": "Process",
    "definition": "A running instance of a program, with a process ID, a parent process, a command line, and the user context it executes under. Process ancestry, meaning which process spawned which, is often the fastest triage signal for whether an execution is routine or suspicious.",
    "source": "clear"
  },
  "Process Access Mask (GrantedAccess)": {
    "term": "Process Access Mask (GrantedAccess)",
    "definition": "The access rights a process requests when it opens a handle to another process, recorded in the GrantedAccess field of Sysmon event 10. Masks that include memory read on LSASS, such as 0x1010, are a classic credential-dumping signal. See Telemetry labs.",
    "source": "clear"
  },
  "Process Doppelgänging": {
    "term": "Process Doppelgänging",
    "definition": "Overwriting a legitimate executable inside a Transactional NTFS (TxF) transaction, creating a process from the modified image, then rolling the transaction back, so the file on disk never changes.",
    "source": "bad-term"
  },
  "Process Hollowing": {
    "term": "Process Hollowing",
    "definition": "A legitimate process is created suspended, its memory replaced with a malicious executable image, then resumed under the guise of a trusted process.",
    "source": "bad-term"
  },
  "Process Injection": {
    "term": "Process Injection",
    "definition": "Running code inside another live process's memory (DLL injection, process hollowing, thread hijacking, and similar sub-techniques) so it inherits that process's identity and trust. Sometimes loosely called memory injection, a phrase that can also mean fileless execution (see Fileless Malware).",
    "source": "bad-term"
  },
  "Process Relationships": {
    "term": "Process Relationships",
    "definition": "How processes on a host connect: parent and child, the user each runs as, the handles and pipes they share. Most endpoint verdicts turn on lineage, such as an Office application spawning a shell. See Process relationships.",
    "source": "clear"
  },
  "Progress Chef": {
    "term": "Progress Chef",
    "definition": "Infrastructure-as-code platform (Chef, owned by Progress since 2020) enforcing security configurations via recipes and cookbooks.",
    "source": "cat-tool"
  },
  "Prompt Injection": {
    "term": "Prompt Injection",
    "definition": "Text that an AI system reads as instructions instead of data: typed directly by a user, or hidden in an email, web page or document the model processes (indirect prompt injection). In agentic tools it can trigger actions with the agent's permissions. OWASP ranks it first among LLM risks (LLM01).",
    "source": "bad-term"
  },
  "Proofpoint": {
    "term": "Proofpoint",
    "definition": "Email security platform (gateway and API-based) with URL Defense, attachment sandboxing, TAP threat dashboards and automated retraction of delivered threats.",
    "source": "cat-tool"
  },
  "Proofpoint Identity Threat Defense (formerly Illusive)": {
    "term": "Proofpoint Identity Threat Defense (formerly Illusive)",
    "definition": "Deception-based identity-threat detection. Plants fake credentials and decoy paths to surface attacker lateral movement. Illusive Networks acquired by Proofpoint, 2022.",
    "source": "cat-tool"
  },
  "Protected Health Information (PHI)": {
    "term": "Protected Health Information (PHI)",
    "definition": "Individually identifiable health information protected under HIPAA: a person's health status, the care they received, or payment for that care, linked to their identity. Alerts touching systems that hold PHI raise the escalation stakes, because exposure carries regulatory breach-notification duties.",
    "source": "clear"
  },
  "Protocol": {
    "term": "Protocol",
    "definition": "The agreed set of rules two systems use to communicate: HTTP, DNS, SMB, RDP. In triage the protocol tells you what a connection is capable of doing, and a mismatch between the protocol and the port it runs on is a classic tell for tunneling or evasion.",
    "source": "clear"
  },
  "Protocol Tunneling": {
    "term": "Protocol Tunneling",
    "definition": "Encapsulates malicious traffic within legitimate protocols (HTTPS, DNS, ICMP) to bypass network detection.",
    "source": "bad-term"
  },
  "ProxyLogon": {
    "term": "ProxyLogon",
    "definition": "The March 2021 Exchange Server zero-day chain (CVE-2021-26855 server-side request forgery, chained with CVE-2021-26857, -26858 and -27065) first used by HAFNIUM and then mass-exploited by many groups to plant web shells. ProxyShell, a separate chain, followed in August 2021.",
    "source": "bad-term"
  },
  "ProxyShell": {
    "term": "ProxyShell",
    "definition": "Three chained Exchange vulnerabilities (CVE-2021-34473, -34523, -31207) allowing unauthenticated SYSTEM-level RCE through AutoDiscover and PowerShell endpoint abuse. Mass exploitation followed the August 2021 Black Hat talk, with attackers dropping web shells and staging ransomware. Not the same as ProxyLogon, the March 2021 zero-day chain.",
    "source": "bad-term"
  },
  "Puppet Enterprise": {
    "term": "Puppet Enterprise",
    "definition": "Config management automating patching and continuous compliance through code-defined policies.",
    "source": "cat-tool"
  },
  "Purge (Email Remediation)": {
    "term": "Purge (Email Remediation)",
    "definition": "Removing a delivered message from every mailbox that received it, often called search and purge. A soft delete is recoverable and a hard delete is not. It is a containment action: export a copy of the message and its headers for the case first. See Preserve before you contain.",
    "source": "clear"
  },
  "Purple Team": {
    "term": "Purple Team",
    "definition": "Red and blue working together in the open: the red team runs a technique, the defenders check whether it was detected and how it looked in the alert, and both iterate until it is caught. The output is detections and triage notes, not a report card.",
    "source": "clear"
  },
  "Pyramid of Pain": {
    "term": "Pyramid of Pain",
    "definition": "David Bianco's model (2013) ranking indicators by how much it costs an attacker when defenders detect them: hash values (trivial to change), IP addresses, domain names, network and host artifacts, tools, and TTPs at the top (hardest to change). Detections built on behavior outlast detections built on hashes.",
    "source": "clear"
  },
  "Python": {
    "term": "Python",
    "definition": "High-level language ubiquitous in security tooling, automation, data analysis, and ML.",
    "source": "cat-tool"
  },
  "Qakbot (Qbot)": {
    "term": "Qakbot (Qbot)",
    "definition": "Multifunctional banking Trojan and malware dropper that evolved into a full-featured loader, spread through email-thread hijacking, with persistence, network discovery, credential harvesting, and encrypted C2. A cornerstone of many enterprise compromises. A U.S.-led multinational operation in August 2023 redirected the botnet to FBI-controlled servers and pushed an uninstaller to more than 700,000 infected computers. Its operators kept working (DOJ says they were still deploying ransomware in January 2025), and in May 2025 the U.S. indicted the alleged leader, Rustam Gallyamov, as part of Operation Endgame.",
    "source": "bad-family"
  },
  "Qilin": {
    "term": "Qilin",
    "definition": "Ransomware-as-a-service operation, also called Agenda, active since at least 2022, with Go and later Rust encryptors for Windows, Linux and VMware ESXi. Its June 2024 attack on Synnovis, a pathology provider to London NHS hospitals, halted blood testing and forced postponed operations and appointments. Several trackers ranked it the most active ransomware brand of 2025, helped by affiliates arriving from disrupted operations.",
    "source": "bad-actor"
  },
  "Qualys": {
    "term": "Qualys",
    "definition": "Cloud-based vulnerability management, policy compliance, and web app scanning across enterprise estates.",
    "source": "cat-tool"
  },
  "Qualys Patch Management": {
    "term": "Qualys Patch Management",
    "definition": "Cloud-based patching tied to vulnerability management; prioritizes patches by risk exposure.",
    "source": "cat-tool"
  },
  "Quarantine": {
    "term": "Quarantine",
    "definition": "Isolating a file, message or host so it can no longer do harm while it is examined: an EDR moving a file into a protected store, an email gateway holding a message, a network isolation that cuts a host off from everything except the security tools. A control that quarantined malicious activity, with no execution or follow-on evidence, puts the case on the contained-by-control path: recorded at P3 or P4 and proposed as a pattern-entry candidate, not paged to IR. Host isolation can destroy volatile evidence, so preserve first.",
    "source": "clear"
  },
  "Quishing (QR-Code Phishing)": {
    "term": "Quishing (QR-Code Phishing)",
    "definition": "Phishing that hides the link in a QR code, often in an email or a printed notice, so the victim opens it on a phone outside corporate web filtering and email link scanning.",
    "source": "bad-term"
  },
  "RITA": {
    "term": "RITA",
    "definition": "Open-source tool (Real Intelligence Threat Analytics) that analyzes Zeek logs to find beaconing, long connections, DNS tunneling and threat-intel matches.",
    "source": "cat-tool"
  },
  "RMM Tool Abuse": {
    "term": "RMM Tool Abuse",
    "definition": "Using legitimate remote monitoring and management or remote-access software (AnyDesk, ScreenConnect, Quick Assist, TeamViewer, NetSupport) as the attacker's remote-control channel. The binaries are signed and often allowlisted, so the signal is context: an RMM tool the organization does not use, installed by a user after a help-desk call or a phishing lure, or run as a portable executable from a user folder.",
    "source": "bad-term"
  },
  "Rainbow Table": {
    "term": "Rainbow Table",
    "definition": "Precomputed table of hash values used to reverse cryptographic hashes, recovering plaintext passwords more efficiently. Salting defeats it: a unique random value added to each password before hashing makes precomputed tables useless, so rainbow tables matter mainly against unsalted hashes such as Windows LM and NTLM.",
    "source": "bad-term"
  },
  "Ransomware": {
    "term": "Ransomware",
    "definition": "Malware that encrypts a victim's files and demands payment for the key. Modern ransomware often adds data theft and extortion, and increasingly encrypts virtual machines from the hypervisor (ESXi) where endpoint agents cannot see it. Some groups skip encryption and extort on stolen data alone, so the absence of encrypted files does not rule out a ransomware-class incident.",
    "source": "bad-term"
  },
  "Ransomware-as-a-Service (RaaS)": {
    "term": "Ransomware-as-a-Service (RaaS)",
    "definition": "A business model in which developers rent their ransomware, leak site and negotiation services to affiliates who carry out the intrusions, splitting each ransom. Explains why the same ransomware brand shows very different tradecraft from one victim to the next: the affiliate, not the brand, did the intrusion.",
    "source": "bad-term"
  },
  "Rapid7 InsightIDR": {
    "term": "Rapid7 InsightIDR",
    "definition": "Rapid7's cloud-delivered SIEM and XDR: log search, user and attacker behavior analytics, and built-in detections over ingested logs and the Rapid7 Insight Agent.",
    "source": "cat-tool"
  },
  "Rapid7 InsightVM / Nexpose": {
    "term": "Rapid7 InsightVM / Nexpose",
    "definition": "Rapid7's vulnerability management: Nexpose is the on-premises scanner, and InsightVM is the Insight-platform product built on it, with exploitability-based prioritization; pairs with Metasploit. Rapid7 now also sells Exposure Command.",
    "source": "cat-tool"
  },
  "Ratchet": {
    "term": "Ratchet",
    "definition": "In ASSURED, the depth ladder's one-way rule: any surprise moves a case up a level, and it never slides back down mid-case. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Re-score Trigger": {
    "term": "Re-score Trigger",
    "definition": "In ASSURED, the named event or time at which a P3 or undetermined case is scored again: a log delivery, the end of a forward watch, an owner's answer, or a fixed time within 24 hours (within hours on the High/Low cell). A P3 without a named trigger is a parked case. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Re-skinning": {
    "term": "Re-skinning",
    "definition": "Changing a public exercise case's surface (names, hosts, times, tools) while keeping its decision invariants, so an assessed cohort cannot answer from the published key. See The capstone.",
    "source": "clear"
  },
  "Receipt": {
    "term": "Receipt",
    "definition": "The three lines the receiver fills in: accepted by and at, escalation warranted (yes, no or partially, with why), and rework requested. Until it is filled in, triage still owns the case and the acknowledgment fallback keeps running.",
    "source": "assured",
    "methodTerm": true
  },
  "Recommended Move": {
    "term": "Recommended Move",
    "definition": "In ASSURED, Risk's output beside the cell: escalate, keep working to a named re-score trigger, or close. Risk recommends; the Escalation decision decides. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Reconnaissance": {
    "term": "Reconnaissance",
    "definition": "The pre-attack phase where attackers gather intelligence, enumerate exposed services, and identify vulnerabilities before launching an intrusion. ATT&CK v19.2 also tracks attackers querying public AI services to research targets (T1682).",
    "source": "bad-term"
  },
  "Recorded Future": {
    "term": "Recorded Future",
    "definition": "Threat-intelligence platform combining machine learning with human analysis across open, dark, and technical sources. Owned by Mastercard since December 2024.",
    "source": "cat-tool"
  },
  "Red Canary": {
    "term": "Red Canary",
    "definition": "MDR provider known for detection engineering and its annual Threat Detection Report; also maintains Atomic Red Team. Acquired by Zscaler (completed August 2025).",
    "source": "cat-tool"
  },
  "Red Team": {
    "term": "Red Team",
    "definition": "A team that emulates a real adversary against the organization, with permission, to test detection and response end to end. Its activity should fire real alerts; when it does, the close is a benign true positive, verified against the engagement record, not a false positive.",
    "source": "clear"
  },
  "RedLine": {
    "term": "RedLine",
    "definition": "Infostealer sold on underground forums. Harvests credentials, browser data, cryptocurrency wallets, and system information. Distributed via cracked software, malvertising, phishing, and fake installers. SOAP-based C2 (a .NET WCF service) over HTTP/S. Customizable and affordable; popular among low-skill actors and initial-access brokers. Infrastructure seized in the international Operation Magnus takedown (October 2024).",
    "source": "bad-family"
  },
  "Reflective DLL Injection": {
    "term": "Reflective DLL Injection",
    "definition": "A DLL that maps itself into memory with its own loader instead of the Windows loader, so it never appears as a file on disk or in the normal loaded-module list. EDR catches it as executable memory not backed by any file (T1620; remote-process variants fall under T1055.001).",
    "source": "bad-term"
  },
  "Regulation S-P (SEC)": {
    "term": "Regulation S-P (SEC)",
    "definition": "The SEC's privacy rule for brokers, dealers, investment companies and advisers, as amended in 2024: customer notice within 30 days of becoming aware of unauthorized access to sensitive customer information, and a 72-hour notice from service providers. Every covered institution has had to comply since 3 June 2026. See Notification clocks.",
    "source": "clear"
  },
  "Regulatory Compliance": {
    "term": "Regulatory Compliance",
    "definition": "Adherence to laws, regulations, and standards governing data protection, privacy, and security requirements for specific industries or data types. In triage, compliance obligations are why Scope checks the regulatory boundary early: they decide which notification clocks and preservation duties attach.",
    "source": "clear"
  },
  "Regulatory Flags Block": {
    "term": "Regulatory Flags Block",
    "definition": "In ASSURED, the template block on the event report and handoff packet that records, when regulated data is plausibly involved, the regime, the data class, the candidate clock start in UTC, the owner engaged and the owner's decision. Triage flags; privacy and legal decide. See The regulatory flags block.",
    "source": "clear",
    "methodTerm": true
  },
  "Regulatory Requirements": {
    "term": "Regulatory Requirements",
    "definition": "The legal and contractual obligations that attach to specific data types, industries and companies, such as GDPR, HIPAA, PCI DSS (a card-industry standard enforced by contract rather than statute), state breach laws such as California's 30-day clock, the SEC disclosure rule for public companies, and EU regimes such as NIS2 and DORA, including breach-notification deadlines. They matter in triage because an incident touching regulated data starts a clock the response has to honor.",
    "source": "clear"
  },
  "Relationship Mapping": {
    "term": "Relationship Mapping",
    "definition": "Charting how an entity connects to others (users to hosts, hosts to services, accounts to groups, apps to grants) to see what a compromise could reach. In ASSURED it is the relationships dimension of Subject analysis. See Four Dimensions.",
    "source": "clear"
  },
  "Reliability Assessment": {
    "term": "Reliability Assessment",
    "definition": "Evaluating how far to trust a source and a piece of information before acting on it. For intelligence, grade the source's reliability and the information's credibility separately (the Admiralty code is one common scheme). For telemetry, ask whether the source records the field you need, at the fidelity you need, for the window you need.",
    "source": "clear"
  },
  "Remediation": {
    "term": "Remediation",
    "definition": "The fix that removes the underlying cause: patching the vulnerability, rebuilding the host, rotating every exposed credential, closing the misconfiguration. Distinct from mitigation, which only reduces the risk until remediation lands.",
    "source": "clear"
  },
  "Remote Access Trojan (RAT)": {
    "term": "Remote Access Trojan (RAT)",
    "definition": "Malware that gives an operator interactive remote control of a host (keylogging, screen capture, file transfer, webcam). It is often delivered as a trojan the user runs, but loaders, exploits and hands-on-keyboard operators install RATs too. Attackers also commonly skip custom RATs and abuse legitimate remote-access/RMM tools (AnyDesk, ScreenConnect, Quick Assist, NetSupport), which are signed and often allowlisted: ATT&CK T1219 (Remote Access Tools), sub-technique T1219.002. See RMM Tool Abuse.",
    "source": "bad-term"
  },
  "Remote Execution": {
    "term": "Remote Execution",
    "definition": "Running commands or malicious code on a target system from another host: PsExec and remote service creation, WMI and WinRM, scheduled tasks created remotely, SSH, or an exploit against a network service. Administrators do all of this legitimately, so the account and the source host decide the call.",
    "source": "bad-term"
  },
  "Reopen Rate": {
    "term": "Reopen Rate",
    "definition": "Cases closed in a month and reopened on new evidence within 30 days, divided by the cases closed that month. A rising rate points at closes made before the deciding evidence was in. See Measuring triage.",
    "source": "clear"
  },
  "Reopen Trigger": {
    "term": "Reopen Trigger",
    "definition": "The condition written into a closed case's record that reopens it. Required for any close whose activity verdict is undetermined, and for benign and authorized closes as reopen conditions.",
    "source": "clear"
  },
  "Request for Comments (RFC)": {
    "term": "Request for Comments (RFC)",
    "definition": "The numbered document series in which internet protocols and standards are defined. The one every analyst ends up citing is RFC 1918, which reserves the private address ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) that tell you at a glance whether an IP is internal or external. Also not public: 100.64.0.0/10 (carrier-grade NAT, RFC 6598), 169.254.0.0/16 (link-local, RFC 3927; 169.254.169.254 is the cloud instance-metadata service, a credential-theft target), and IPv6 fc00::/7 (RFC 4193).",
    "source": "clear"
  },
  "Residential Proxies": {
    "term": "Residential Proxies",
    "definition": "Commercial or criminal proxy services that route attacker traffic through home internet connections, so sign-ins and sprays appear to come from ordinary consumer ISPs. A reason \"one source\" detections fail and per-IP rate limits barely slow attackers.",
    "source": "bad-term"
  },
  "Residual Risk": {
    "term": "Residual Risk",
    "definition": "The risk that remains once controls and actions are accounted for. In ASSURED the Scope, Uncover and Risk loop runs until the residual risk is understood well enough to justify a resolution; what is still unknown is recorded as open questions, and a close records its reopen conditions.",
    "source": "clear"
  },
  "Resource Development": {
    "term": "Resource Development",
    "definition": "ATT&CK tactic: building or acquiring what the attack needs before it starts (registering look-alike domains, buying access or infostealer logs, compromising servers or routers to use as relays, staging tools).",
    "source": "bad-term"
  },
  "Retrieval-Augmented Generation (RAG)": {
    "term": "Retrieval-Augmented Generation (RAG)",
    "definition": "A design where an AI system searches a document store or index for relevant content and feeds what it finds to the model alongside the question, so answers draw on that content. In a SOC, retrieval must be permission-aware (the assistant must not surface what the analyst could not open), and every retrieved document is a path for indirect prompt injection. See AI-assisted triage.",
    "source": "clear"
  },
  "Reversal Threshold": {
    "term": "Reversal Threshold",
    "definition": "In ASSURED, the number of confirmed false closes that suspends a pattern entry automatically until its owner re-reviews it. One, by default. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Right-to-Left Override (RLO)": {
    "term": "Right-to-Left Override (RLO)",
    "definition": "The Unicode control character U+202E, which displays the text after it in reverse. A file actually named invoice, then U+202E, then fdp.exe displays as \"invoiceexe.pdf\", so an executable passes for a PDF. A Masquerading technique; see also File Extension Spoofing.",
    "source": "bad-term"
  },
  "Risk": {
    "term": "Risk",
    "definition": "In ASSURED, the combination of impact (how bad it would be if real) and likelihood (how probable it is that the activity is malicious or unauthorized), read off the triage matrix rather than multiplied. The matrix cell gives a priority (P1 to P4) and a recommended move; analytic confidence is recorded beside the cell, not folded into it. Risk recommends; the Escalation decision makes the close-or-escalate call.",
    "source": "clear"
  },
  "Risk-Based Alert Triage Matrix (RATM)": {
    "term": "Risk-Based Alert Triage Matrix (RATM)",
    "definition": "ASSURED's own risk-scoring model, not an industry standard. Four dimensions (asset criticality, threat actor intent, exploitation & scope, business impact) are each scored High, Medium or Low, then reduced to the two axes of the triage matrix. Impact is the higher of asset criticality and business impact. Likelihood is an estimate of how probable it is that the activity is malicious or unauthorized: intent and exploitation & scope inform it, and nothing raises it above what the evidence supports. Confidence is recorded beside the cell. The cell gives a P1 to P4 priority and a recommended move. Adapt the rubric anchors to your environment; keep the reduction rules. Unrelated to Splunk's Risk-Based Alerting despite the similar name. See the priority matrix. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Risk-Based Alerting (RBA)": {
    "term": "Risk-Based Alerting (RBA)",
    "definition": "Splunk's model in which detections add risk to an entity instead of alerting one by one, and an aggregating detection raises a finding when the entity's total crosses a threshold. It decides what reaches the queue. It is unrelated to ASSURED's RATM, which rates one case's impact and likelihood to set its priority once the case is in the queue. See Standards mapping.",
    "source": "clear"
  },
  "Role-Based Access Control (RBAC)": {
    "term": "Role-Based Access Control (RBAC)",
    "definition": "Access granted to roles, which users inherit by membership. Triage asks which role granted the action, whether the user should hold it, and whether the membership itself is new: a recent addition to a privileged group is one of the strongest identity signals.",
    "source": "clear"
  },
  "Root Cause Analysis": {
    "term": "Root Cause Analysis",
    "definition": "Root cause analysis (RCA): the process of identifying the underlying cause of a security incident or problem, the condition that, once fixed, prevents a recurrence, rather than the symptom that fired the alert.",
    "source": "clear"
  },
  "Rootkits": {
    "term": "Rootkits",
    "definition": "Malware that hides its presence by subverting the OS or using kernel-level access. Often combined with other malware to maintain stealth and persistence.",
    "source": "bad-term"
  },
  "Routes to Escalation": {
    "term": "Routes to Escalation",
    "definition": "In ASSURED, the three ways a case escalates, named in the handoff: a confirmed criterion (the escalation tripwire, P1); the matrix (a P1 or P2 cell with no criterion confirmed); or an operational route such as capacity. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Rubber-Stamping": {
    "term": "Rubber-Stamping",
    "definition": "Signing an AI draft or a recommendation without the verification the signature claims, also called approval fatigue. Its signals are in the case tool's timestamps: approvals faster than the checks can run, near-zero edits, identical close notes, agreement rates that jump after a model change. See Automation Bias and Rubber-stamp signals.",
    "source": "clear"
  },
  "Rubrik": {
    "term": "Rubrik",
    "definition": "Cloud-native data management; instant recovery, immutable backups, and ransomware detection.",
    "source": "cat-tool"
  },
  "Rule-Based Detection": {
    "term": "Rule-Based Detection",
    "definition": "One of the four detection families ASSURED teaches: explicit logic over events (thresholds, sequences, field conditions), written as SIEM correlation rules or Sigma. Rules are transparent, so the analyst can read exactly why one fired, and brittle, so small variations slip past. See Rule-based detection.",
    "source": "clear"
  },
  "Runbook": {
    "term": "Runbook",
    "definition": "Step-by-step operational instructions for one concrete task: rotate this credential, isolate this host, pull this log. Narrower than a playbook. A playbook decides what to do; a runbook specifies exactly how to do one of its steps.",
    "source": "clear"
  },
  "Ryuk": {
    "term": "Ryuk",
    "definition": "High-impact ransomware operated by Wizard Spider, typically delivered via TrickBot or BazarLoader. It used AES/RSA file encryption against hospitals, municipalities and critical infrastructure, encrypted fast, and killed backup and recovery processes. Its operators are believed to overlap heavily with the subsequent Conti operation, generally treated as the successor brand.",
    "source": "bad-family"
  },
  "SANS DAIR (Dynamic Approach to Incident Response)": {
    "term": "SANS DAIR (Dynamic Approach to Incident Response)",
    "definition": "The incident response model taught in SANS SEC504 since at least 2024 and published by Joshua Wright in September 2026 as a free CC BY 4.0 book. Built on the OODA loop, it runs through waypoints (Prepare, Detect, Verify and Triage, a Response Actions loop, Debrief), each with a checklist. ASSURED fits inside its Verify and Triage waypoint as the per-case procedure. See Standards mapping.",
    "source": "clear"
  },
  "SANS Institute": {
    "term": "SANS Institute",
    "definition": "Training, certification, and research organization; publishes threat research and runs the Internet Storm Center (ISC).",
    "source": "cat-tool"
  },
  "SEC Cybersecurity Disclosure Rule": {
    "term": "SEC Cybersecurity Disclosure Rule",
    "definition": "The US Securities and Exchange Commission's 2023 rule requiring public companies to disclose material cybersecurity incidents on Form 8-K Item 1.05 within four business days of determining materiality (a US Attorney General national-security or public-safety determination can delay it), and to describe their cybersecurity risk management annually. See Materiality (SEC).",
    "source": "clear"
  },
  "SIEM (concept)": {
    "term": "SIEM (concept)",
    "definition": "Aggregation and correlation of security event data for centralized detection, compliance, and IR.",
    "source": "cat-tool"
  },
  "SOAR (concept)": {
    "term": "SOAR (concept)",
    "definition": "Security orchestration, automation, and response: define, automate, and orchestrate IR workflows at scale.",
    "source": "cat-tool"
  },
  "SOC-CMM": {
    "term": "SOC-CMM",
    "definition": "The SOC Capability Maturity Model, a self-assessment of a security operations center across five domains (business, people, process, technology, services); version 2.4 appeared in late 2025. It asks whether a SOC has a defined triage process, not what that process should be. See the adoption maturity model.",
    "source": "clear"
  },
  "SPL": {
    "term": "SPL",
    "definition": "Search Processing Language: Splunk's piped search language for filtering, transforming and correlating indexed events.",
    "source": "cat-tool"
  },
  "SQL Injection": {
    "term": "SQL Injection",
    "definition": "Code injection where crafted input changes the SQL query an application sends to its database, letting the attacker read or change data, bypass logins, and sometimes run commands on the database server. Prevented by parameterized queries; web application firewalls catch common payloads but not all of them.",
    "source": "bad-term"
  },
  "Safe Mode Boot": {
    "term": "Safe Mode Boot",
    "definition": "Rebooting a host into Safe Mode, where most security agents do not load, before running ransomware or other payloads (bcdedit /set safeboot).",
    "source": "bad-term"
  },
  "SafeBreach": {
    "term": "SafeBreach",
    "definition": "Breach-and-attack simulation continuously testing defenses across the kill chain.",
    "source": "cat-tool"
  },
  "SailPoint": {
    "term": "SailPoint",
    "definition": "Identity governance with least-privilege enforcement, access reviews, and ML-driven anomaly detection.",
    "source": "cat-tool"
  },
  "Salesloft Drift OAuth-token theft": {
    "term": "Salesloft Drift OAuth-token theft",
    "definition": "August 2025. An actor tracked by Google as UNC6395 used OAuth tokens stolen from the Salesloft Drift chat integration to export data from hundreds of customers' Salesforce instances, then searched the data for secrets such as cloud access keys and passwords. No victim password or MFA was involved: the trusted SaaS-to-SaaS integration was the way in.",
    "source": "bad-campaign"
  },
  "Salt Typhoon": {
    "term": "Salt Typhoon",
    "definition": "Chinese state-sponsored group behind the 2024 intrusions into major U.S. telecommunications providers, where it reached lawful-intercept systems and the call records of political figures. It gets in through edge routers and other network devices and alters router configurations to stay. The August 2025 joint advisory AA25-239A, co-signed by agencies from over a dozen countries, describes the same activity against telecom, government, transportation, lodging and military networks worldwide.",
    "source": "bad-actor"
  },
  "Sandbox / Environment Detection": {
    "term": "Sandbox / Environment Detection",
    "definition": "Most sandboxes are not very lived-in. They have small disks, brief uptime, no mouse activity, suspicious driver names, and known artifacts. Malware that runs checks like these (disk size, uptime, mouse movement, VM drivers) will sit silent in analysis, then unfurl on a real user's host. A sample that is silent in the sandbox but active on the endpoint is evidence of evasion, not innocence.",
    "source": "bad-feature"
  },
  "Sandbox Escape": {
    "term": "Sandbox Escape",
    "definition": "An attack that breaks out of a restricted environment (browser sandbox, container, or VM) to reach the underlying host. Most often seen as browser sandbox escapes chained with a renderer bug. ATT&CK T1611 Escape to Host covers both container breakouts and virtual-machine-to-hypervisor escapes (for example, on ESXi).",
    "source": "bad-term"
  },
  "Sandboxing": {
    "term": "Sandboxing",
    "definition": "Detonating an unknown file or URL inside an isolated environment to observe what it does. Mature malware checks for sandbox-typical signals (small disk, brief uptime, no mouse activity, suspicious driver names) and stays dormant until it sees a real host.",
    "source": "clear"
  },
  "Sandworm": {
    "term": "Sandworm",
    "definition": "Destructive GRU unit behind the 2015 / 2016 Ukraine power grid attacks (BlackEnergy, Industroyer) and the global NotPetya wiper. Its tools include VPNFilter, KillDisk and Cyclops Blink. It specializes in industrial control system and operational technology (ICS/OT) disruption, hybrid warfare, and psychological operations aligned with Russian military objectives.",
    "source": "bad-actor"
  },
  "Sarbanes-Oxley Act (SOX)": {
    "term": "Sarbanes-Oxley Act (SOX)",
    "definition": "A 2002 United States federal law that mandates accurate financial reporting and internal controls at publicly traded companies. It matters to security because its Section 404 internal-control audits pull IT general controls into scope, driving access control, change management, and audit logging requirements on systems that feed financial statements and raising the criticality of those assets during triage.",
    "source": "clear"
  },
  "Scareware": {
    "term": "Scareware",
    "definition": "Software that tricks users into believing their device is infected, pressuring them to buy fake antivirus tools. Often a social-engineering precursor to real malware.",
    "source": "bad-term"
  },
  "Scattered Spider": {
    "term": "Scattered Spider",
    "definition": "Native-English-speaking group behind the 2023 MGM and Caesars intrusions and the defining identity-attack playbook: help-desk social engineering, SIM swapping, MFA fatigue, AiTM phishing kits, then abuse of the victim's own identity provider (IdP) and cloud tooling. It overlaps with the loose \"The Com\" ecosystem and later partnered with RaaS operations for encryption. In April 2025 it hit UK retail (M&S, Co-op, Harrods); at M&S, DragonForce's encryptor was deployed on VMware ESXi hosts. UK arrests followed in July 2025. U.S. prosecutors charged Thalha Jubair over at least 120 intrusions and $115M in ransoms, and in July 2026 Jubair and Owen Flowers were sentenced in the UK for the 2024 Transport for London hack. The NCA says the action effectively halted the group, but its playbook (help-desk resets, MFA re-registration, hypervisor encryption) is widely copied. The actor profile most relevant to single sign-on (SSO) era triage.",
    "source": "bad-actor"
  },
  "Schema Normalization": {
    "term": "Schema Normalization",
    "definition": "Another name for normalization: mapping events from different log sources into one common field schema. See Normalization.",
    "source": "clear"
  },
  "Scope": {
    "term": "Scope",
    "definition": "In ASSURED, the third phase: deciding where the investigation's lines are before Uncover pulls evidence, across four boundary types. Regulatory: which notification clocks and preservation duties attach. Time: the window to examine, which may start well before the alert. Entity: which subjects are in. Infrastructure: what the SOC can actually see. Scope is provisional: Risk can push the investigation back to Scope to widen it, and suspicion of an escalation criterion refines Scope rather than escalating. Outside ASSURED, the word also means the agreed boundaries of an incident-response engagement.",
    "source": "clear"
  },
  "Scope Creep": {
    "term": "Scope Creep",
    "definition": "An investigation growing past its boundaries without anyone deciding it should. In ASSURED, widening Scope is a deliberate move, made when Risk sends the case back with a reason and recorded in the case. Growth without that record is creep, and it stalls the close-or-escalate decision.",
    "source": "clear"
  },
  "Second Subject": {
    "term": "Second Subject",
    "definition": "In ASSURED, a second independent actor, or any additional account or host the activity moved into. It moves a case to Level 2; confirmed, it is also the lateral-movement criterion. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Secure Email Gateways (SEG)": {
    "term": "Secure Email Gateways (SEG)",
    "definition": "The filter in front of mailboxes that scans links, attachments and sender authentication, and quarantines or rewrites messages. A clean gateway verdict is not a verdict on the message: lures with no payload (BEC, QR codes, device-code requests) pass through, so read the headers and the click logs.",
    "source": "clear"
  },
  "Secure Hash Algorithm (SHA)": {
    "term": "Secure Hash Algorithm (SHA)",
    "definition": "A family of cryptographic hash functions. SHA-1 is broken for collisions (first public collision in 2017) and NIST is retiring it by 2030. SHA-256 (SHA-2 family) is the standard IoC hash, and SHA-3 is a separate alternative family.",
    "source": "clear"
  },
  "Secure Shell (SSH)": {
    "term": "Secure Shell (SSH)",
    "definition": "Encrypted remote login and command execution, standard on Linux, network devices and cloud instances (TCP 22), and a common lateral-movement path with stolen keys. Tells: a new source host or key for an account, logins from hosts that never administer the target, and new entries in authorized_keys.",
    "source": "clear"
  },
  "Secure Sockets Layer (SSL)": {
    "term": "Secure Sockets Layer (SSL)",
    "definition": "TLS's deprecated predecessor. Every SSL version is insecure and disabled in modern clients, but the name survives in product terms such as SSL inspection and SSL VPN, which today mean TLS. See Transport Layer Security (TLS).",
    "source": "clear"
  },
  "Security Control": {
    "term": "Security Control",
    "definition": "A safeguard that prevents, detects or corrects a security problem: MFA, a firewall rule, an EDR policy, a review step. Controls appear in triage twice: as evidence (their logs) and as context (a control that blocked the activity puts the case on the contained-by-control path).",
    "source": "clear"
  },
  "Security Datasets (formerly Mordor)": {
    "term": "Security Datasets (formerly Mordor)",
    "definition": "Open Threat Research Forge (OTRF) project that publishes attack and benign telemetry recorded on lab ranges, mapped to ATT&CK. Atomic datasets capture one technique; compound datasets capture a whole campaign, such as the APT29 evaluation.",
    "source": "cat-tool"
  },
  "Security Incident Timing Metrics (SITM)": {
    "term": "Security Incident Timing Metrics (SITM)",
    "definition": "FIRST's reference for incident timelines (version 1.0, May 2023): eleven timeline records and four key metrics (time to detect, respond, contain and remediate), each measured from the time of first activity. These are incident clocks; triage's own clocks start at detection. See Measuring triage.",
    "source": "clear"
  },
  "Security Information and Event Management (SIEM)": {
    "term": "Security Information and Event Management (SIEM)",
    "definition": "The platform that collects, normalizes and searches log data from many sources and runs correlation rules over it. Most alerts reach triage through it, and most Uncover queries run in it. It sees only its intake: a source never onboarded, or rolled off retention, is a gap, not a clean result.",
    "source": "clear"
  },
  "Security Onion": {
    "term": "Security Onion",
    "definition": "Free platform for network security monitoring and log management: Zeek metadata, Suricata alerts and full packet capture behind one console, with Elastic for search. An Import installation replays a packet capture through Zeek and Suricata and keeps its original timestamps.",
    "source": "cat-tool"
  },
  "Security Operations": {
    "term": "Security Operations",
    "definition": "The people, processes and technology that monitor, detect, investigate and respond to threats day to day, usually organized as a SOC. ASSURED covers the triage slice, from an alert firing to a documented close or escalation.",
    "source": "clear"
  },
  "Security Operations Center (SOC)": {
    "term": "Security Operations Center (SOC)",
    "definition": "The team, and often the room, that monitors an organization's telemetry, triages alerts, and starts the response. Tiered SOCs split triage (Tier 1) from investigation and response (Tiers 2 and 3); smaller teams fold them together. ASSURED is written for the analyst making the close-or-escalate decision, whatever the tier is called.",
    "source": "clear"
  },
  "Security Orchestration, Automation, and Response (SOAR)": {
    "term": "Security Orchestration, Automation, and Response (SOAR)",
    "definition": "Platforms that codify SOC workflows into playbooks: enrich an alert, query telemetry, look up an indicator, open a case, page on-call. SOAR makes the repetitive parts of triage repeatable.",
    "source": "clear"
  },
  "Sender Policy Framework (SPF)": {
    "term": "Sender Policy Framework (SPF)",
    "definition": "A DNS-published list of servers authorized to send mail for a domain, checked against the envelope sender (MAIL FROM / Return-Path) and the HELO name, not the visible From: header (RFC 7208). An SPF pass proves only that the envelope domain authorized the sending server; an attacker's own lookalike domain passes easily. Spoofing of the visible From: is caught by DMARC alignment, not by SPF alone.",
    "source": "clear"
  },
  "Sensitive Data": {
    "term": "Sensitive Data",
    "definition": "Information whose exposure would cause harm: regulated data (personal data, PHI, cardholder data), credentials and keys, intellectual property, confidential business records. Regulated data plausibly accessed by the activity sets Scope's regulatory flags and is a Level 2 trigger; data merely in reach is a Scope flag.",
    "source": "clear"
  },
  "SentinelOne": {
    "term": "SentinelOne",
    "definition": "Unified EPP/EDR with behavioral AI, autonomous response, rollback on Windows, and threat-hunting telemetry.",
    "source": "cat-tool"
  },
  "SentinelOne Purple AI": {
    "term": "SentinelOne Purple AI",
    "definition": "SentinelOne's generative-AI analyst assistant: natural-language hunting, investigation summaries and agentic triage in the Singularity platform.",
    "source": "cat-tool"
  },
  "Separation of Duties": {
    "term": "Separation of Duties",
    "definition": "Splitting sensitive tasks so no one person can complete them alone: one person requests a payment and another approves it, one analyst writes a pattern entry and another approves it. An action that bypassed the second person (a self-approved change, a single-person payment change) is a finding in itself.",
    "source": "clear"
  },
  "Server": {
    "term": "Server",
    "definition": "A host whose role is to provide services to other systems rather than to a person at a keyboard. The distinction drives triage: web browsing and office documents are routine on a workstation but anomalous on a server; an interactive server login warrants checking who made it, since only administrators should have a reason to; and a compromised server typically exposes data or downstream users at scale.",
    "source": "clear"
  },
  "Server Message Block (SMB)": {
    "term": "Server Message Block (SMB)",
    "definition": "A network protocol for file shares, printer access, and remote administration, native to Windows but also implemented by Samba and NAS appliances, running on TCP port 445 (legacy port 139 over NetBIOS). A staple of lateral movement: administrative shares, PsExec-style remote execution, and exploits such as EternalBlue, used by the WannaCry worm, all travel over SMB.",
    "source": "clear"
  },
  "Service Account": {
    "term": "Service Account",
    "definition": "An account used by an application or service rather than a person, usually with a long-lived password or key and standing permissions. Its behavior is predictable by design, so an interactive logon, a new source host, or a new kind of action from a service account is a high-confidence anomaly. Service accounts with SPNs are the targets of Kerberoasting. See Non-Human Identity (NHI).",
    "source": "clear"
  },
  "Service Principal": {
    "term": "Service Principal",
    "definition": "In Microsoft Entra ID, the tenant-local identity of an application. It signs in with a client secret, a certificate or a federated credential and holds delegated or application permissions; disabling it blocks the app's sign-in. See Non-human identities and cloud roles.",
    "source": "clear"
  },
  "ServiceNow SecOps": {
    "term": "ServiceNow SecOps",
    "definition": "ITSM and security workflow with ticketing, change management, CMDB integration, and security automation.",
    "source": "cat-tool"
  },
  "Session Hijack": {
    "term": "Session Hijack",
    "definition": "Taking over an active session by stealing or guessing session tokens or cookies, bypassing authentication and MFA.",
    "source": "bad-term"
  },
  "Shadow AI": {
    "term": "Shadow AI",
    "definition": "AI tools used for work without the organization's approval or oversight: a personal chatbot account, an unvetted browser extension, a coding assistant on an unmanaged plan. In triage it shows up as uploads of case data or source code to AI services, and the question becomes what was pasted and under which retention terms. See AI-assisted triage.",
    "source": "clear"
  },
  "Shadow Credentials": {
    "term": "Shadow Credentials",
    "definition": "Writing an attacker-controlled key to a target account's msDS-KeyCredentialLink attribute, then using it to request Kerberos tickets as that account.",
    "source": "bad-term"
  },
  "Shadow Data": {
    "term": "Shadow Data",
    "definition": "Sensitive or regulated data stored in unmanaged, forgotten, or unsanctioned locations: abandoned cloud buckets, rogue spreadsheets, old backups, and prompts or files pasted into unsanctioned AI tools.",
    "source": "bad-term"
  },
  "Shadow Mode": {
    "term": "Shadow Mode",
    "definition": "Running an AI assistant on the live queue with its output recorded but hidden from the working analyst, so its verdicts can be compared with the settled ones without anchoring the person it is checked against. It comes before any write access. See Governing automated triage.",
    "source": "clear"
  },
  "Shai-Hulud npm worm": {
    "term": "Shai-Hulud npm worm",
    "definition": "September 2025. A self-propagating worm in the npm ecosystem stole developer and continuous integration (CI) tokens from infected machines, then used stolen npm credentials to publish trojanized versions of the victims' own packages, compromising more than 500 packages.",
    "source": "bad-campaign"
  },
  "Shamoon": {
    "term": "Shamoon",
    "definition": "Destructive wiper associated with Iranian state-sponsored actors. Infamous for the 2012 attack on Saudi Aramco that wiped roughly 30,000 machines; returned in 2016-2017 (\"Shamoon 2\") against other Saudi organizations, including the General Authority of Civil Aviation. It overwrites the MBR with provocative imagery and renders devices inoperable, spreading via stolen credentials and admin shares. Its goal is destruction, not financial gain.",
    "source": "bad-family"
  },
  "SharePoint ToolShell": {
    "term": "SharePoint ToolShell",
    "definition": "July 2025 mass exploitation of on-premises Microsoft SharePoint (CVE-2025-53770, a variant of the CVE-2025-49704/-49706 chain). Attackers planted web shells and stole the servers' ASP.NET machine keys, which let them keep forging valid requests even after patching. Microsoft attributed exploitation to several China-based actors, one of which deployed ransomware.",
    "source": "bad-campaign"
  },
  "Shellshock (CVE-2014-6271)": {
    "term": "Shellshock (CVE-2014-6271)",
    "definition": "GNU Bash flaw allowing arbitrary command execution via environment variables. Especially dangerous through CGI scripts. It affected web servers, routers and IoT devices, exploits appeared within hours of disclosure, and it drove a broad review of UNIX-based software.",
    "source": "bad-term"
  },
  "Shift Handover": {
    "term": "Shift Handover",
    "definition": "The written record and the live conversation that transfer open cases, running clocks, pending callbacks and containment in effect at a shift change. Ownership moves at the receipt: until the incoming analyst fills it in, the outgoing analyst still owns every open case. See Shift handover.",
    "source": "clear"
  },
  "ShinyHunters": {
    "term": "ShinyHunters",
    "definition": "Financially motivated crew that has stolen and sold or leaked large databases since 2020. Public reporting links it to the 2024 Snowflake customer-account thefts and, in 2025, to voice-phishing calls that talked staff into authorizing a malicious connected app in Salesforce, followed by extortion. In August 2025 it surfaced with Scattered Spider and LAPSUS$ remnants under the \"Scattered LAPSUS$ Hunters\" banner. There is no encryption: the stolen data is the leverage, so the case is a breach investigation from the first hour.",
    "source": "bad-actor"
  },
  "Shodan": {
    "term": "Shodan",
    "definition": "Search engine for internet-connected devices; identifies exposed services, outdated software, ICS, IoT.",
    "source": "cat-tool"
  },
  "Side-loading": {
    "term": "Side-loading",
    "definition": "Planting a malicious DLL next to a legitimate (often signed) program that loads a DLL of that name from its own folder, so trusted code runs the payload. Search-order hijacking is the sibling variant under the same ATT&CK ID, T1574.001 \"DLL\" (see DLL Search Order Hijacking).",
    "source": "bad-term"
  },
  "Sigma": {
    "term": "Sigma",
    "definition": "Open, vendor-neutral detection-rule format: write a detection once in YAML, convert it to the query language of whatever SIEM is in use. The de facto standard for sharing detection logic between teams and tools.",
    "source": "cat-tool"
  },
  "Sigma filter": {
    "term": "Sigma filter",
    "definition": "A separate Sigma file that names one or more rules by ID and holds environment-specific conditions, usually exclusions, which the converter appends to each named rule's condition at conversion. The shared rule file stays unedited, so upstream fixes still apply. Defined by the Sigma Filters Specification (v2.1.0, August 2025).",
    "source": "cat-tool"
  },
  "Signature-Based Detection": {
    "term": "Signature-Based Detection",
    "definition": "One of the four detection families ASSURED teaches: matching activity against known-bad patterns such as hashes, byte sequences, YARA rules or network signatures. Precise and cheap, but blind to anything new or modified. See Signature-based detection.",
    "source": "clear"
  },
  "Silk Typhoon": {
    "term": "Silk Typhoon",
    "definition": "Suspected Chinese state-sponsored group, widely known for exploiting the ProxyLogon Microsoft Exchange zero-days in early 2021, followed by web-shell deployment and data theft from education, law firms, NGOs, and defense contractors. Microsoft now tracks it as Silk Typhoon; in 2025 it pivoted to abusing IT providers' remote-management and cloud tooling. An alleged member was arrested in Italy in July 2025 and extradited to the U.S. in 2026.",
    "source": "bad-actor",
    "aliasOf": "HAFNIUM"
  },
  "Silver Ticket Attack": {
    "term": "Silver Ticket Attack",
    "definition": "Similar to Golden Ticket but forges a Kerberos service ticket (TGS) with the target service account's key, giving access to that one service. The forged ticket never touches a domain controller, which makes it quieter than a golden ticket.",
    "source": "bad-term"
  },
  "SilverTerrier": {
    "term": "SilverTerrier",
    "definition": "Collective term for Nigerian actors conducting Business Email Compromise fraud. Less technically advanced than APTs but highly profitable, they use phishing, credential theft and social engineering to divert funds from corporate communications. Many operate openly on social media, and hundreds of arrests have not stopped the activity.",
    "source": "bad-actor"
  },
  "Silverfort": {
    "term": "Silverfort",
    "definition": "Identity security platform that sits in the authentication path of Active Directory and other IdPs to add MFA and policy to protocols that lack it, including service accounts and legacy systems.",
    "source": "cat-tool"
  },
  "Single Sign-On (SSO)": {
    "term": "Single Sign-On (SSO)",
    "definition": "Authenticating once to an identity provider and reaching many applications without re-entering credentials. The triage consequence: one stolen IdP session or token opens every connected app, so scope an SSO compromise across the IdP's app catalog, not one system.",
    "source": "clear"
  },
  "Slack-based C2": {
    "term": "Slack-based C2",
    "definition": "Abuse of Slack's APIs, webhooks, or tokens to create covert C2 by embedding commands or exfiltrated data within messages or bots. The same pattern runs over Discord, Microsoft Graph/OneDrive, Google Sheets/Drive and Dropbox; pivot on which process is talking to the API, not on the destination.",
    "source": "bad-term"
  },
  "Smishing (SMS Phishing)": {
    "term": "Smishing (SMS Phishing)",
    "definition": "Phishing by text message: fake delivery notices, toll bills, or \"IT support\" texts that lead to a credential-harvesting page or a malicious app.",
    "source": "bad-term"
  },
  "Snort": {
    "term": "Snort",
    "definition": "Open-source NIDS/IPS with deep packet inspection (Snort 3 is the current major version). Rules come in three tiers distributed by Cisco Talos: a free Community set (a subset of the subscriber rules), a Registered set (free sign-up, delayed release), and a paid Subscriber set.",
    "source": "cat-tool"
  },
  "Snowflake customer-account theft": {
    "term": "Snowflake customer-account theft",
    "definition": "April–June 2024. A threat group later tracked as UNC5537 used credentials harvested from infostealer logs to access Snowflake customer environments that had no MFA configured. Victims included Ticketmaster, Santander, AT&T and LendingTree. This was not a Snowflake CVE: it was a customer-side identity-hygiene failure at scale. Snowflake responded by making MFA the default and phasing out password-only sign-ins.",
    "source": "bad-campaign"
  },
  "Social Engineering": {
    "term": "Social Engineering",
    "definition": "Manipulates people into performing actions or revealing information by exploiting trust, fear, urgency, or authority. Phishing, vishing and help-desk impersonation are all forms of it.",
    "source": "bad-term"
  },
  "Social Media C2": {
    "term": "Social Media C2",
    "definition": "Using X (formerly Twitter), Facebook or Instagram posts, images or profiles on trusted domains to carry encoded commands or retrieve data.",
    "source": "bad-term"
  },
  "SolarWinds Patch Manager": {
    "term": "SolarWinds Patch Manager",
    "definition": "Centralized patching for Windows and third-party apps; integrates with WSUS and Microsoft Configuration Manager (ConfigMgr).",
    "source": "cat-tool"
  },
  "SolarWinds SUNBURST": {
    "term": "SolarWinds SUNBURST",
    "definition": "Late-2020 supply-chain compromise of SolarWinds Orion. A trojanized update gave APT29 (then tracked as UNC2452) backdoor access to thousands of customers including U.S. government agencies and Fortune 500 firms. Against a chosen few it then ran months of stealthy command-and-control, lateral movement with forged SAML tokens, and data exfiltration. It reshaped trust assumptions around software vendors.",
    "source": "bad-campaign"
  },
  "Sony Pictures hack": {
    "term": "Sony Pictures hack",
    "definition": "2014 destructive attack attributed to North Korea's Lazarus Group, reportedly in retaliation for The Interview. Wiper malware destroyed systems while the attackers leaked unreleased films and executive communications, blending political retaliation, information warfare, and corporate sabotage. It was the first high-profile nation-state attack on a private company over content.",
    "source": "bad-campaign"
  },
  "Sophos Endpoint (formerly Intercept X)": {
    "term": "Sophos Endpoint (formerly Intercept X)",
    "definition": "Endpoint protection with deep-learning malware detection, anti-ransomware (CryptoGuard) and exploit prevention; Sophos EDR and Sophos XDR add investigation and cross-source detection. Sophos dropped the Intercept X name in late 2025.",
    "source": "cat-tool"
  },
  "Source Identity": {
    "term": "Source Identity",
    "definition": "In AWS, the sts:SourceIdentity value set when a role is assumed. CloudTrail carries it across every hop of a role chain, so it names the original human or workload. See Non-human identities and cloud roles.",
    "source": "clear"
  },
  "Spear Phishing": {
    "term": "Spear Phishing",
    "definition": "Targeted phishing customized for a specific individual or organization to increase success rate.",
    "source": "bad-term"
  },
  "Spectre / Meltdown": {
    "term": "Spectre / Meltdown",
    "definition": "Hardware vulnerabilities in modern processors. Spectre (CVE-2017-5753, CVE-2017-5715) affects virtually all modern speculative CPUs (Intel, AMD, Arm); Meltdown (CVE-2017-5754) chiefly Intel, plus some Arm and IBM POWER cores (not AMD). Both exploit speculative execution to leak memory across trust boundaries. No confirmed in-the-wild exploitation, but the firmware, OS and cloud-hypervisor mitigations reshaped how hardware trust boundaries are viewed.",
    "source": "bad-term"
  },
  "Splunk CIM": {
    "term": "Splunk CIM",
    "definition": "Splunk Common Information Model: data models (Authentication, Endpoint, Network Traffic, Web) with standard field names that Enterprise Security content searches.",
    "source": "cat-tool"
  },
  "Splunk Enterprise Security": {
    "term": "Splunk Enterprise Security",
    "definition": "SIEM application on the Splunk platform: correlation searches, risk-based alerting, and prebuilt content for SOC workflows.",
    "source": "cat-tool"
  },
  "Splunk SOAR (formerly Splunk Phantom)": {
    "term": "Splunk SOAR (formerly Splunk Phantom)",
    "definition": "SOAR with Python-based playbooks, 300+ integrations, and deep Splunk analytics ties. Phantom acquired by Splunk in 2018 and renamed Splunk SOAR in 2021; Splunk itself acquired by Cisco, 2024.",
    "source": "cat-tool"
  },
  "Spur": {
    "term": "Spur",
    "definition": "IP-intelligence service focused on anonymization infrastructure: commercial VPNs, residential proxy networks and Tor, with the service behind an address where known.",
    "source": "cat-tool"
  },
  "Spyware": {
    "term": "Spyware",
    "definition": "Malware that secretly monitors user activity: keystrokes, screen captures, camera or microphone access. Used for surveillance, espionage, or credential theft.",
    "source": "bad-term"
  },
  "Stage": {
    "term": "Stage",
    "definition": "In ASSURED, a group of phases. There are three: Orient (Alert, Subject, Scope), Investigate (Uncover, Risk) and Resolve (Escalation decision, Documentation). Stages organize the phases; they are not extra steps. Preparation, in the NIST and SANS sense, happens before triage starts and is not an ASSURED stage. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Staged Payloads": {
    "term": "Staged Payloads",
    "definition": "A two-phase delivery process where a lightweight stager downloads and executes a more complex secondary payload. Payload deployment, the delivery and installation of the attacker's tools, usually works this way: a dropper, script or stager fetches and runs the real implant.",
    "source": "bad-term"
  },
  "Stakeholder-Specific Vulnerability Categorization (SSVC)": {
    "term": "Stakeholder-Specific Vulnerability Categorization (SSVC)",
    "definition": "A decision tree, from Carnegie Mellon's SEI and adopted by CISA, that prioritizes a vulnerability through questions such as whether it is being exploited, whether it is exposed, whether exploitation is automatable, and what it would yield. It ends in an action rather than a number (four in CISA's version, from Track to Act).",
    "source": "clear"
  },
  "Standard Contractual Clauses (SCC)": {
    "term": "Standard Contractual Clauses (SCC)",
    "definition": "Contract terms approved by the European Commission that let personal data move from the EU/EEA to a country without an adequacy decision. They matter in triage when a case ships logs or evidence containing EU personal data to a team, vendor or tool in another country: the transfer needs a legal basis, so check with privacy first.",
    "source": "clear"
  },
  "Stealth": {
    "term": "Stealth",
    "definition": "ATT&CK tactic: hiding and concealing actions so they appear as normal behavior, through obfuscation, masquerading, process injection, and indicator removal. In ATT&CK v19 (April 2026), Defense Evasion was split: Stealth kept the TA0005 ID, and the new Defense Impairment (TA0112) took the defense-breaking techniques. Rules written against 'Defense Evasion' still match TA0005, but not Defense Impairment.",
    "source": "bad-term"
  },
  "Storm-0558 / Antique Typhoon (Microsoft cloud email)": {
    "term": "Storm-0558 / Antique Typhoon (Microsoft cloud email)",
    "definition": "July 2023 intrusion in which a China-aligned actor (now tracked by Microsoft as Antique Typhoon) forged Azure AD (now Microsoft Entra ID) access tokens using a stolen Microsoft consumer-MSA signing key, reading emails of ~25 organizations including U.S. State Department and Commerce officials via Outlook Web Access. The key should not have signed enterprise tokens; a validation gap let it. The U.S. Cyber Safety Review Board's April 2024 review detailed the Microsoft operational and strategic decisions that led to the intrusion. It reshaped how the industry talks about identity-provider key custody, token binding, and the blast radius of a single signing key.",
    "source": "bad-campaign"
  },
  "Storm-2372": {
    "term": "Storm-2372",
    "definition": "Cluster Microsoft has tracked since August 2024 running device code phishing against government, NGO, IT, defense, telecom, health, higher-education and energy organizations. Operators build rapport over WhatsApp, Signal or Microsoft Teams, then send a fake Teams meeting invite that leads the target to enter an attacker-generated device code, handing over tokens. From February 2025 it used the Microsoft Authentication Broker client ID to register devices and obtain Primary Refresh Tokens. Microsoft assesses with moderate confidence that it aligns with Russian state interests, and a later update to its report places it as an initial-access sub-cluster of Midnight Blizzard.",
    "source": "bad-actor"
  },
  "Structured Threat Information Expression (STIX)": {
    "term": "Structured Threat Information Expression (STIX)",
    "definition": "OASIS's JSON language for threat intelligence (STIX 2.1): indicators, attack patterns, threat actors and their relationships, usually exchanged over TAXII. Respect the sharing marking (TLP 2.0) on what you receive.",
    "source": "clear"
  },
  "Stuxnet": {
    "term": "Stuxnet",
    "definition": "Landmark cyberweapon widely attributed to a joint U.S.-Israeli operation (never officially acknowledged) to disrupt Iran's nuclear enrichment. Multiple zero-days and PLC-specific payloads targeted Siemens controllers at Natanz. It altered centrifuge speeds while reporting normal readings: the first malware known to cause real-world industrial damage, and the template for later ICS-targeting malware.",
    "source": "bad-campaign"
  },
  "Subdomain Abuse": {
    "term": "Subdomain Abuse",
    "definition": "Using subdomains that genuinely belong to trusted services, so attacker traffic inherits the parent domain's reputation: an attacker's own app or bucket on a shared cloud platform (anyone can create an Azure web app, and its hostname sits under azurewebsites.net), or the takeover of one of your DNS records that still points at a deprovisioned cloud resource.",
    "source": "bad-term"
  },
  "Subject": {
    "term": "Subject",
    "definition": "(1) In ASSURED, the second phase: identify every entity that authenticated or acted in the alert (people, service accounts, machines, cloud roles, workloads) and assess each across four dimensions: authentication, authorization, behavior, relationships. (2) In Windows Security events, the \"Subject\" block names the account that requested or reported the action (in a 4624 logon it is usually SYSTEM or the machine account), as distinct from the Target or New Logon account. Reading the wrong block is a common misattribution.",
    "source": "clear"
  },
  "Sumo Logic Cloud SOAR (formerly DFLabs IncMan)": {
    "term": "Sumo Logic Cloud SOAR (formerly DFLabs IncMan)",
    "definition": "SOAR with playbooks, threat-intel enrichment, KPI tracking, and human-in-the-loop decisions. DFLabs acquired by Sumo Logic, 2021.",
    "source": "cat-tool"
  },
  "Sunk Cost": {
    "term": "Sunk Cost",
    "definition": "Continuing an investigation line, or resisting an escalation, because of the time already spent on it. It bites in Risk and the Escalation decision. Counter: decide on the evidence in hand now; time invested is not evidence.",
    "source": "clear"
  },
  "Supply Chain": {
    "term": "Supply Chain",
    "definition": "The network of organizations, people, activities, and resources involved in creating and delivering products, presenting multiple attack vectors for compromising systems or software during development and distribution.",
    "source": "clear"
  },
  "Supply Chain Compromise": {
    "term": "Supply Chain Compromise",
    "definition": "Targets third-party software or service providers to insert malicious code or access downstream victims: a vendor's build or update process (SolarWinds, 3CX), an open-source package, or a managed service provider's access. Trusted software or access then delivers the attack.",
    "source": "bad-term"
  },
  "Suppression": {
    "term": "Suppression",
    "definition": "A deliberate rule that stops a detection from alerting on a defined pattern, host set, or time window: the pressure valve for known noise. Suppression trades visibility for signal, so every suppression carries a documented reason, an owner and an expiry, and gets revisited. One that clears a benign true positive is keyed narrowly (tool version, extension or plugin ID, destination set) with re-fire triggers, never on signer and install path alone, because a signed host such as an IDE runs third-party code. An unsuppressed noisy rule burns analysts; an unreviewed suppression hides an intrusion.",
    "source": "clear"
  },
  "Suricata": {
    "term": "Suricata",
    "definition": "Open-source NIDS/IPS with multi-threaded inspection, file extraction, TLS handshake logging (SNI, certificates, JA3/JA4; no decryption), and EVE JSON output. Maintained by OISF.",
    "source": "cat-tool"
  },
  "Suspicion": {
    "term": "Suspicion",
    "definition": "In ASSURED, an escalation criterion supported below High confidence. Suspicion refines Scope and re-runs the investigation loop; it does not fire the escalation tripwire, though the case can still escalate from a P1 or P2 cell by the E rule. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Swimlane Turbine": {
    "term": "Swimlane Turbine",
    "definition": "Swimlane's low-code security automation platform for building case-management and response workflows without deep programming expertise.",
    "source": "cat-tool"
  },
  "Symantec Endpoint Management": {
    "term": "Symantec Endpoint Management",
    "definition": "Patch management, software distribution, and configuration enforcement across enterprise endpoints.",
    "source": "cat-tool"
  },
  "Symantec Endpoint Security": {
    "term": "Symantec Endpoint Security",
    "definition": "Endpoint protection, email security, DLP, and EDR; global sensor network feeding detection and response.",
    "source": "cat-tool"
  },
  "Sysdig": {
    "term": "Sysdig",
    "definition": "Cloud-native security focused on container runtime, Kubernetes monitoring, and cloud workload protection.",
    "source": "cat-tool"
  },
  "Syslog": {
    "term": "Syslog",
    "definition": "A standard protocol for message logging in network devices and systems (RFC 5424; legacy BSD format RFC 3164). Classic syslog over UDP 514 drops messages silently, can be spoofed, and RFC 3164 timestamps lack year and timezone, so normalize time before correlating.",
    "source": "clear"
  },
  "Sysmon": {
    "term": "Sysmon",
    "definition": "Microsoft Sysinternals service that writes detailed endpoint telemetry (process creation with command lines, network connections, driver and DLL loads, file-time changes) to the Windows event log for SIEM ingestion. Now also a built-in optional feature on Windows 11 and Server 2025 (rendered messages are localized, so parse the XML); Sysmon for Linux exists too.",
    "source": "cat-tool"
  },
  "System Binary": {
    "term": "System Binary",
    "definition": "An executable that ships with the operating system or other trusted, usually signed, software: cmd.exe, powershell.exe, certutil.exe, rundll32.exe. Central to triage because living-off-the-land attacks abuse these trusted binaries, so the question is rarely whether the binary is legitimate but whether its parent, arguments, and timing are.",
    "source": "clear"
  },
  "System Binary Proxy Execution (formerly Signed Binary Proxy Execution)": {
    "term": "System Binary Proxy Execution (formerly Signed Binary Proxy Execution)",
    "definition": "ATT&CK's umbrella technique (T1218) for running malicious code through trusted system binaries such as rundll32, regsvr32, mshta and msiexec, so execution looks like normal OS activity. See LOLBins.",
    "source": "bad-term"
  },
  "System Tampering": {
    "term": "System Tampering",
    "definition": "The unauthorized modification of system configurations, binaries, or behaviors to support attacker goals or disrupt operations: changing boot settings, replacing or patching system files, editing the hosts file or firewall rules, or weakening security settings. In ATT&CK terms most of it falls under Defense Impairment or Impact.",
    "source": "bad-term"
  },
  "TA505": {
    "term": "TA505",
    "definition": "Prolific cybercriminal group distributing banking trojans, ransomware, and RATs globally through massive phishing waves delivering Dridex, FlawedAmmyy and Locky. It often acts as an initial-access broker for other groups and frequently shifts tactics, payloads, and infrastructure: an example of the malware-as-a-service model.",
    "source": "bad-actor"
  },
  "TaHiTI": {
    "term": "TaHiTI",
    "definition": "Targeted Hunting integrating Threat Intelligence, a threat hunting methodology published by the Dutch financial sector in 2018, in three phases: initiate, hunt and finalize. Like PEAK, it searches without an alert; triage starts from one. See Standards mapping.",
    "source": "clear"
  },
  "Tactics, Techniques, and Procedures (TTP)": {
    "term": "Tactics, Techniques, and Procedures (TTP)",
    "definition": "The behavioral patterns of a threat actor, in increasing specificity: tactics (goals), techniques (methods), and procedures (concrete implementations). Used to characterize and attribute adversary behavior across campaigns. See the ATT&CK Tactic, Technique and Procedure entries.",
    "source": "clear"
  },
  "Tanium": {
    "term": "Tanium",
    "definition": "Real-time endpoint management and security platform: live questions across the fleet, patching, inventory, threat response and remediation.",
    "source": "cat-tool"
  },
  "Target breach": {
    "term": "Target breach",
    "definition": "2013 breach exposing payment card data for about 40 million accounts and, as a separate data set, names, mailing addresses, phone numbers or email addresses for up to 70 million people. Initial access came through a compromised HVAC contractor's credentials; the attackers moved laterally to POS systems, where malware on the registers captured card data. A landmark for third-party risk management and network segmentation, it cost hundreds of millions and led to executive resignations.",
    "source": "bad-campaign"
  },
  "TeamViewer": {
    "term": "TeamViewer",
    "definition": "Commercial remote-access and support software, sanctioned in many organizations and abused in others.",
    "source": "cat-tool"
  },
  "Telegram Bots": {
    "term": "Telegram Bots",
    "definition": "Leveraging Telegram's bot API to issue commands or receive data, creating C2 over an encrypted, trusted messaging platform.",
    "source": "bad-term"
  },
  "Telemetry": {
    "term": "Telemetry",
    "definition": "The event streams that endpoints, network sensors, identity providers, SaaS apps and cloud control planes emit about what happened on them. Triage can only see what was collected: when telemetry is missing for a host or time window, record it as a gap (unknown is not Low), not as clean.",
    "source": "clear"
  },
  "Tenable": {
    "term": "Tenable",
    "definition": "Vulnerability management vendor whose Nessus scanner underpins Tenable Vulnerability Management (cloud), Tenable Security Center (on-premises) and the Tenable One exposure platform.",
    "source": "cat-tool"
  },
  "Tetragon": {
    "term": "Tetragon",
    "definition": "eBPF-based security observability and runtime enforcement for Linux and Kubernetes, from the Cilium project: process execution, file access and network events with workload identity.",
    "source": "cat-tool"
  },
  "TheHive": {
    "term": "TheHive",
    "definition": "TheHive: collaborative case management for IR. Since v5 it is proprietary (StrangeBee) with a free, quota-limited Community license; open-source TheHive 4 reached end of support December 2022. Integrates with Cortex (StrangeBee's observable-analysis engine, unrelated to Palo Alto Cortex) and MISP.",
    "source": "cat-tool"
  },
  "Thinkst Canary": {
    "term": "Thinkst Canary",
    "definition": "Deception platform deploying low-interaction honeypots and canarytokens that produce high-fidelity alerts on attacker interaction.",
    "source": "cat-tool"
  },
  "Third-Party Data Exposure": {
    "term": "Third-Party Data Exposure",
    "definition": "Compromise or exposure of sensitive data caused by a breach, misconfiguration, or negligence on the part of an external vendor or partner. Your own logs may show nothing, yet the data is still yours, and so is the notification decision.",
    "source": "bad-term"
  },
  "Thread Execution Hijacking": {
    "term": "Thread Execution Hijacking",
    "definition": "Suspending an existing thread in another process, writing code into that process, pointing the thread's context (instruction pointer) at it with SetThreadContext, and resuming it. Unlike CreateRemoteThread-style injection, no new thread is created.",
    "source": "bad-term"
  },
  "Threat": {
    "term": "Threat",
    "definition": "Any circumstance or event with the potential to harm the organization's operations, assets, or people (NIST, from CNSSI 4009). The actor behind it is the threat actor; the weakness it uses is a vulnerability. Classical risk models multiply threat, vulnerability, and impact. ASSURED's RATM does not multiply. It scores threat actor intent and exploitation & scope as their own dimensions and lets them inform likelihood, which never rises above what the evidence supports. Risk is then read from the impact-by-likelihood matrix.",
    "source": "clear"
  },
  "Threat Actor": {
    "term": "Threat Actor",
    "definition": "The person or group behind malicious activity: a criminal crew, a state-sponsored group, a hacktivist, an insider. Vendors name the same actor differently (see Threat Actor Naming Conventions). Triage rarely needs attribution to decide; it matters when it changes the likely next move or the reporting duties.",
    "source": "clear"
  },
  "Threat Actor Naming Conventions": {
    "term": "Threat Actor Naming Conventions",
    "definition": "Vendors name the same actor differently, so two reports may describe one group. Microsoft uses weather families by origin or motive (Typhoon for China, Blizzard for Russia, Sandstorm for Iran, Sleet for North Korea, Tempest for financially motivated groups) and Storm-#### for clusters still in development. CrowdStrike uses animals by origin (Panda, Bear, Kitten, Chollima) and Spider for eCrime. Google Threat Intelligence Group (which absorbed Mandiant Intelligence) has used two-word cryptonyms since 2026 (APT29 is ICE RELIC, APT28 is LAKE RELIC), while the older Mandiant APT and FIN numbers and UNC cluster labels remain in ATT&CK and in past reporting. Check a published crosswalk or ATT&CK's group aliases before treating two names as two actors.",
    "source": "clear"
  },
  "Threat Hunting": {
    "term": "Threat Hunting",
    "definition": "Proactive analysis that starts from a hypothesis (\"if an attacker were here, what would I expect to see?\") and searches telemetry for evidence. Distinct from alert triage, which reacts to detections; hunting goes looking for what the detections missed.",
    "source": "clear"
  },
  "Threat Intelligence": {
    "term": "Threat Intelligence",
    "definition": "Evidence-based knowledge about existing or emerging threats, including context, mechanisms, indicators, implications, and actionable advice (after Gartner's widely cited definition). It is consumed at strategic, operational, and tactical levels. Before acting on it, weigh the source's reliability, the information's credibility (the Admiralty code is one common scheme), and its age.",
    "source": "clear"
  },
  "ThreatConnect": {
    "term": "ThreatConnect",
    "definition": "Threat-intelligence platform (TIP) that aggregates and scores feeds, links indicators to internal telemetry, and runs intel-driven automation playbooks; also offers cyber-risk quantification. Now part of Dataminr (acquisition announced October 2025).",
    "source": "cat-tool"
  },
  "ThreatDown EDR (formerly Malwarebytes EDR)": {
    "term": "ThreatDown EDR (formerly Malwarebytes EDR)",
    "definition": "EDR focused on remediation; ransomware rollback and post-infection cleanup. ThreatDown is Malwarebytes' business brand.",
    "source": "cat-tool"
  },
  "Ticket": {
    "term": "Ticket",
    "definition": "The case record that tracks an alert or incident through investigation: who owns it, what was found, what verdict was reached, and when it was closed. In a SOC the ticket is both the unit of work in the queue and the documentation trail that escalation, metrics, and future investigations depend on.",
    "source": "clear"
  },
  "Tier Up / Engage IR": {
    "term": "Tier Up / Engage IR",
    "definition": "Two different moves. Tiering up hands a case to the next tier inside the SOC; engaging IR brings in incident response, on the escalation tripwire or a P1 or P2 cell. The tripwire engages IR directly and bypasses the tiers.",
    "source": "assured",
    "methodTerm": true
  },
  "Time To Live (TTL)": {
    "term": "Time To Live (TTL)",
    "definition": "In IP, a hop counter that each router decrements so stray packets are discarded instead of looping forever; in DNS, the number of seconds a resolver may cache a record before re-querying. The DNS sense usually matters most in triage: very short TTLs let attacker infrastructure rotate addresses quickly, as in fast-flux hosting, though CDNs and load balancers use short TTLs legitimately as well.",
    "source": "clear"
  },
  "Timeline": {
    "term": "Timeline",
    "definition": "The chronological record of a case: each row with a UTC timestamp, a source and a confidence label, mixing adversary actions with analyst actions. In ASSURED, Uncover builds one timeline per case and the handoff packet carries it. See Correlation and the timeline.",
    "source": "clear"
  },
  "Timestomping": {
    "term": "Timestomping",
    "definition": "Alters file timestamps to make malicious activity appear older or less suspicious, usually by copying the times of a legitimate system file. On NTFS, common tools change only the standard-information timestamps, not those in the file-name attribute.",
    "source": "bad-term"
  },
  "Tines": {
    "term": "Tines",
    "definition": "No-code automation built for security teams; modular \"stories\" for alert ingestion, enrichment, and response.",
    "source": "cat-tool"
  },
  "Tip-Off Check": {
    "term": "Tip-Off Check",
    "definition": "In ASSURED, the question asked before any visible containment action: does this action tell the adversary what the SOC knows, and does that matter more than the harm in progress? When harm is not in progress, IR times visible actions. See The tip-off check.",
    "source": "clear",
    "methodTerm": true
  },
  "Token": {
    "term": "Token",
    "definition": "A piece of data a system accepts as proof of an authenticated session or a granted permission. Several senses: hardware or OTP token (an authentication factor); session cookie; OAuth access and refresh tokens; Entra Primary Refresh Token; Windows access token (the security context of a process). Triage-critical: a stolen session or refresh token replays without the password or MFA (AiTM phishing, infostealers), so containment means revoking sessions and refresh tokens, not only resetting the password.",
    "source": "clear"
  },
  "Token Impersonation": {
    "term": "Token Impersonation",
    "definition": "Duplicating another process's existing Windows access token (for example with DuplicateTokenEx) and acting under it, the classic route from a service account holding SeImpersonatePrivilege to SYSTEM. Creating a fresh token from stolen credentials is the sibling technique T1134.003.",
    "source": "bad-term"
  },
  "Token Manipulation": {
    "term": "Token Manipulation",
    "definition": "ATT&CK's umbrella technique (T1134) for abusing Windows access tokens: impersonating or stealing another process's token (T1134.001), creating a process with a stolen token (T1134.002), building a new token from stolen credentials (T1134.003), and spoofing a parent process (T1134.004). Token Impersonation and Parent PID Spoofing on this page are its common forms.",
    "source": "bad-term"
  },
  "Token Passthrough": {
    "term": "Token Passthrough",
    "definition": "An MCP server forwarding a client's token to a downstream API. The MCP specification forbids it, partly because the downstream logs then record the wrong identity. See Non-human identities and cloud roles.",
    "source": "clear"
  },
  "Token Theft": {
    "term": "Token Theft",
    "definition": "Stealing an already-issued bearer credential that has passed MFA (browser session cookie, OAuth access or refresh token, Entra Primary Refresh Token, cloud CLI token) from browsers, disk caches, memory or an AiTM proxy, then replaying it from attacker infrastructure. Theft: T1539 Steal Web Session Cookie, T1528 Steal Application Access Token. Replay: T1550.004, T1550.001. Duplicating a Windows access token on an endpoint is the separate T1134.001 (see Token Impersonation).",
    "source": "bad-term"
  },
  "Tor-based C2": {
    "term": "Tor-based C2",
    "definition": "Leveraging Tor to anonymize attacker and malware communication, making attribution and traffic analysis significantly harder.",
    "source": "bad-term"
  },
  "Toxic Combination": {
    "term": "Toxic Combination",
    "definition": "An access-governance term: multiple individually benign roles or permissions that together create excessive, dangerous access (the classic separation-of-duties conflict). A condition attackers hunt for and access reviews exist to catch.",
    "source": "bad-term"
  },
  "Traffic Light Protocol (TLP)": {
    "term": "Traffic Light Protocol (TLP)",
    "definition": "FIRST's labels for how far shared information may travel. TLP 2.0 (2022) uses TLP:RED (named recipients only), TLP:AMBER (the recipient's organization and its clients, on a need-to-know basis; TLP:AMBER+STRICT limits it to the organization), TLP:GREEN (the recipient's community) and TLP:CLEAR (no limit). Respect the marking on what you receive, including in tickets and AI tools.",
    "source": "clear"
  },
  "Transfer Data to Cloud Account": {
    "term": "Transfer Data to Cloud Account",
    "definition": "Moving data to another cloud account the attacker controls inside the same provider (sharing a snapshot or bucket cross-account), so no data crosses the network perimeter. Only cloud audit logs show it.",
    "source": "bad-term"
  },
  "Transport Layer Security (TLS)": {
    "term": "Transport Layer Security (TLS)",
    "definition": "The protocol that encrypts most network traffic (TLS 1.3 current; 1.0 and 1.1 deprecated). Even without decryption, triage can still see the SNI hostname, certificate issuer and age, and the JA4 fingerprint. Encrypted Client Hello (ECH) is starting to hide SNI too.",
    "source": "clear"
  },
  "Trellix Endpoint Security": {
    "term": "Trellix Endpoint Security",
    "definition": "Part of the broader Trellix XDR; detection, investigation, and response with behavioral analytics and forensic timelines.",
    "source": "cat-tool"
  },
  "TrendAI Vision One (formerly Trend Vision One)": {
    "term": "TrendAI Vision One (formerly Trend Vision One)",
    "definition": "XDR platform correlating telemetry across email, endpoint, server, and cloud workloads, plus exposure management. Trend Micro renamed its enterprise business TrendAI in March 2026.",
    "source": "cat-tool"
  },
  "Triage Matrix": {
    "term": "Triage Matrix",
    "definition": "In ASSURED, the three-by-three grid of impact by likelihood. Each cell gives a priority band and a recommended move; confidence is recorded beside the cell and does not move it. Three override rules can change the cell, and the record names the one that fired. See the priority matrix. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "TrickBot": {
    "term": "TrickBot",
    "definition": "Began as a banking Trojan and evolved into a modular enterprise-scale framework for credential theft, recon, and ransomware delivery. It often arrived via Emotet and then provided the foothold for Ryuk or Conti, with decentralized infrastructure, encrypted comms, and plugins for SMB spread and AD enumeration. A coordinated takedown in October 2020 only dented it; the operators wound the botnet down by 2022 as work shifted into Conti.",
    "source": "bad-family"
  },
  "Tripwire": {
    "term": "Tripwire",
    "definition": "File-integrity monitoring (FIM) and change detection; enforces baselines and supports compliance. Open-source Tripwire and the commercial Tripwire Enterprise (Fortra).",
    "source": "cat-tool"
  },
  "True Negative": {
    "term": "True Negative",
    "definition": "Benign activity that correctly produced no alert. The silent majority of everything a detection evaluates, and the reason a small false-positive rate still buries a queue once multiplied by volume. Completes the confusion matrix alongside true positive, false positive, and false negative.",
    "source": "clear"
  },
  "True Positive": {
    "term": "True Positive",
    "definition": "A detection-axis verdict: the alert fired on exactly the behavior its logic describes. On the activity axis it is then either malicious (the case the SOC exists to handle) or authorized, a benign true positive. In everyday SOC usage and many close codes, \"true positive\" alone means the malicious case, so say which one you mean. The counterpart of a false positive, where the logic matched something it should not have.",
    "source": "clear"
  },
  "Trust Policy": {
    "term": "Trust Policy",
    "definition": "In AWS, the resource-based policy on a role that names who may assume it and under which conditions. A role that trusts a whole account trusts every principal in it allowed to assume roles. See Non-human identities and cloud roles.",
    "source": "clear"
  },
  "Trusted Automated Exchange of Intelligence Information (TAXII)": {
    "term": "Trusted Automated Exchange of Intelligence Information (TAXII)",
    "definition": "The OASIS protocol for exchanging STIX threat intelligence over HTTPS, through collections a client can poll or push to. STIX is the language; TAXII is the transport.",
    "source": "clear"
  },
  "Tuning": {
    "term": "Tuning",
    "definition": "Adjusting detection logic against observed results: tightening a threshold, adding an exclusion, enriching a rule with context so it stops firing on the environment's normal. Tuning is the routine output of false positive closes (the false-positive-as-finding doctrine: every false positive is a defect report against the detection, not just a closed ticket) and the difference between an alert queue that improves and one that only grows. A benign true positive does not tune the rule; it earns a pattern entry or a scoped, expiring exception.",
    "source": "clear"
  },
  "Tuning Request": {
    "term": "Tuning Request",
    "definition": "In ASSURED, the single artifact triage sends detection engineering after a verdict: one rule per request, evidence cited by ID, the proposed change and its risk, and a benign and a malicious test sample. See The tuning request.",
    "source": "clear",
    "methodTerm": true
  },
  "Tunneling Services": {
    "term": "Tunneling Services",
    "definition": "Legitimate reverse-tunnel services (ngrok, Cloudflare Tunnel, Microsoft dev tunnels) that expose an internal host or relay C2 through a trusted vendor domain. The domain is reputable, so pivot on which process opened the tunnel and whether the organization uses the service.",
    "source": "bad-term"
  },
  "Turla": {
    "term": "Turla",
    "definition": "Long-running Russian cyber-espionage group linked to the FSB that targets governments, embassies and militaries. Custom implants include Snake (whose global network the FBI disabled in Operation MEDUSA, May 2023), Carbon, and Kazuar. It hijacks other actors' infrastructure to obscure attribution: Microsoft and Lumen reported in December 2024 that it had been running operations from a Pakistani group's (Storm-0156) hijacked C2 servers since late 2022. Watering holes, poisoned updates and compromised email systems round out tradecraft built for longevity and covertness.",
    "source": "bad-actor"
  },
  "Two-Axis Verdict": {
    "term": "Two-Axis Verdict",
    "definition": "In ASSURED, the rule that every verdict answers two questions. Detection axis: true positive, false positive (logic) or false positive (data). Activity axis: malicious, policy violation, authorized (benign true positive), benign-confirmed or undetermined. See Verdict. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Typosquatting": {
    "term": "Typosquatting",
    "definition": "Registers look-alike domains (or package names in npm and PyPI) to trick users into visiting malicious sites or installing malicious code, often to harvest credentials or deliver malware.",
    "source": "bad-term"
  },
  "UAC Bypass": {
    "term": "UAC Bypass",
    "definition": "Circumventing Windows User Account Control prompts so a process run by a local administrator reaches high integrity without the consent prompt. It does not elevate a standard user.",
    "source": "bad-term"
  },
  "UK GDPR": {
    "term": "UK GDPR",
    "definition": "The GDPR as retained in UK law, enforced by the Information Commissioner's Office (ICO). Article 33 keeps the 72-hour notice to the authority after the controller becomes aware of a personal data breach. See Notification clocks.",
    "source": "clear"
  },
  "UK NCSC": {
    "term": "UK NCSC",
    "definition": "UK National Cyber Security Centre; guidance, threat intelligence, and IR services across public and private sectors.",
    "source": "cat-tool"
  },
  "UNC2452": {
    "term": "UNC2452",
    "definition": "Sophisticated espionage group associated with Russia's SVR, built for stealth and long-term access. It targets governments, think tanks, healthcare and vaccine researchers. It is the group behind the SolarWinds SUNBURST compromise (tracked by Mandiant as UNC2452 until it was merged into APT29 in April 2022). Custom malware, living-off-the-land and well-crafted spear-phishing let its operations go undetected for months. As Midnight Blizzard (Microsoft's name), it breached Microsoft's own corporate email in 2023-2024 by password-spraying a legacy test tenant.",
    "source": "bad-actor",
    "aliasOf": "APT29"
  },
  "UNC3944": {
    "term": "UNC3944",
    "definition": "Native-English-speaking group behind the 2023 MGM and Caesars intrusions and the defining identity-attack playbook: help-desk social engineering, SIM swapping, MFA fatigue, AiTM phishing kits, then abuse of the victim's own identity provider (IdP) and cloud tooling. It overlaps with the loose \"The Com\" ecosystem and later partnered with RaaS operations for encryption. In April 2025 it hit UK retail (M&S, Co-op, Harrods); at M&S, DragonForce's encryptor was deployed on VMware ESXi hosts. UK arrests followed in July 2025. U.S. prosecutors charged Thalha Jubair over at least 120 intrusions and $115M in ransoms, and in July 2026 Jubair and Owen Flowers were sentenced in the UK for the 2024 Transport for London hack. The NCA says the action effectively halted the group, but its playbook (help-desk resets, MFA re-registration, hypervisor encryption) is widely copied. The actor profile most relevant to single sign-on (SSO) era triage.",
    "source": "bad-actor",
    "aliasOf": "Scattered Spider"
  },
  "USB / Removable Media Infection": {
    "term": "USB / Removable Media Infection",
    "definition": "Malware spread on USB drives, usually as a disguised shortcut (LNK) or executable the user is tricked into opening. Autorun from removable media is disabled by default on modern Windows, but some organizations re-enable it via legacy Group Policy. Devices that pose as keyboards (BadUSB, Rubber Ducky) execute without user action and fall under Hardware Additions (T1200).",
    "source": "bad-term"
  },
  "Ukraine power grid": {
    "term": "Ukraine power grid",
    "definition": "2015 and 2016 attacks marking the first known successful cyberattacks to cause power outages. Attributed to Russia's Sandworm. In 2015, spear-phishing planted BlackEnergy 3 in the business networks. Stolen credentials and VPN access then let the attackers reach the ICS networks and open breakers remotely, hands-on-keyboard, through the utilities' own remote-administration tools and HMI software. KillDisk wipes, firmware-bricked serial-to-Ethernet devices, and a telephone denial-of-service against a call center slowed the response. The utilities restored service by switching to manual operations. About 225,000 customers lost power. In 2016, Industroyer / CrashOverride automated the attack against grid-specific protocols. Defining examples of cyber warfare against civilian infrastructure.",
    "source": "bad-campaign"
  },
  "Unauthorized Access": {
    "term": "Unauthorized Access",
    "definition": "Access to a system, account or data without permission, whether by an outsider with stolen credentials or an insider exceeding their role. It sits at the core of most incident and breach definitions, so triage records exactly what was accessed and how that was established.",
    "source": "clear"
  },
  "Undetermined": {
    "term": "Undetermined",
    "definition": "In ASSURED, the activity-axis verdict when the deciding evidence is missing. A legitimate verdict, not a benign close: score the gap (Medium likelihood at minimum, Low confidence), name the re-score trigger, and at the trigger apply the E rule. A close on it names the gaps and writes a reopen trigger. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Unified Endpoint Management (UEM)": {
    "term": "Unified Endpoint Management (UEM)",
    "definition": "Managing laptops, desktops, phones and tablets from one console (Microsoft Intune, Jamf, Workspace ONE), the successor to MDM and EMM. Its inventory answers who owns a device, whether it is managed and compliant, and what is installed. A device absent from UEM is unmanaged until shown otherwise.",
    "source": "clear"
  },
  "Unified Kill Chain": {
    "term": "Unified Kill Chain",
    "definition": "Paul Pols' model (2017) that merges the Cyber Kill Chain with ATT&CK into 18 phases, grouped as In (initial foothold), Through (network propagation) and Out (action on objectives). It describes intrusions that cycle through phases rather than running them once.",
    "source": "clear"
  },
  "Uniform Resource Locator (URL)": {
    "term": "Uniform Resource Locator (URL)",
    "definition": "The address of a resource, made up of a scheme (such as http, https, or ftp), a host, and usually a path and query string. In triage the host carries reputation and lookalike-domain signals, while the path and query parameters often reveal the phishing kit, payload, or staging location.",
    "source": "clear"
  },
  "Uninvestigated Share": {
    "term": "Uninvestigated Share",
    "definition": "Alerts closed with no disposition, bulk-closed or aged out, divided by alerts received. The share of the queue nobody looked at, which speed metrics hide. See Measuring triage.",
    "source": "clear"
  },
  "Unknown Is Not Low": {
    "term": "Unknown Is Not Low",
    "definition": "In ASSURED, the rule that evidence that could not be examined is not evidence of absence. When the deciding evidence is missing, likelihood reads Medium at minimum, confidence reads Low, and the gap is recorded as an open question. The same rule governs the eligibility gate, where an unknown item fails. See Impact and likelihood. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Unstructured Data Exposure": {
    "term": "Unstructured Data Exposure",
    "definition": "Leakage of documents, logs, screenshots, or audio: content that is harder to classify or monitor with traditional DLP tools.",
    "source": "bad-term"
  },
  "User": {
    "term": "User",
    "definition": "The identity behind activity on a system: the account that authenticated, launched the process, or received the email. In triage the user field names an account, not necessarily a person; whether the legitimate owner was actually behind the activity is exactly the question stolen credentials raise.",
    "source": "clear"
  },
  "User Account": {
    "term": "User Account",
    "definition": "The identity record a system authenticates and authorizes: a username with credentials, group memberships and attributes. One person usually holds several (workstation, cloud, admin, SaaS), and an account can be used by someone other than its owner. Subject analysis treats the account and the person as separate questions.",
    "source": "clear"
  },
  "User and Entity Behavior Analytics (UEBA)": {
    "term": "User and Entity Behavior Analytics (UEBA)",
    "definition": "Security analytics that build behavioral baselines for users and entities (hosts, service accounts, applications) and score deviations from them: unusual logon times, first-seen hosts, data volumes far above normal. Its alerts are anomalies, not verdicts, and they are only as good as the baseline, which can absorb an attacker who has been present long enough (behavioral drift).",
    "source": "clear"
  },
  "User-Agent Spoofing": {
    "term": "User-Agent Spoofing",
    "definition": "Alters HTTP headers to mimic trusted applications or browsers, blending into normal web traffic. A browser user agent coming from a process that is not a browser is the tell.",
    "source": "bad-term"
  },
  "User-Reported Phishing": {
    "term": "User-Reported Phishing",
    "definition": "A message a recipient flagged through the report button or the help desk. Reports of one campaign are grouped into one case, verified tenant-wide by message trace and click logs rather than by the one copy reported, and closed with feedback to the reporter. Anyone who reached the credential step is credential-exposed. See User-reported phishing.",
    "source": "clear"
  },
  "Valid Accounts": {
    "term": "Valid Accounts",
    "definition": "Logging in with real credentials that were stolen (often from infostealer logs), bought from an access broker, or left at defaults. Nothing is exploited, so the only signal is behavior: new device, new location, impossible travel, unusual hours or access. The Snowflake customer-account thefts were this, at scale.",
    "source": "bad-term"
  },
  "Variable Expansion": {
    "term": "Variable Expansion",
    "definition": "The shell's replacement of a variable reference, such as %TEMP% or $HOME, with its actual value when a command runs. Attackers lean on expansion to obfuscate command lines, so the analyst has to evaluate what the command becomes after expansion, not the literal string that was logged.",
    "source": "clear"
  },
  "Variable Substitution": {
    "term": "Variable Substitution",
    "definition": "Using variables in place of literal values in a script or command line, which attackers use to hide what a command really does. For the analyst it is the same problem as variable expansion: evaluate the command after expansion, not the literal string. See Variable Expansion.",
    "source": "clear"
  },
  "Vectra AI": {
    "term": "Vectra AI",
    "definition": "NDR and identity-threat detection platform that scores attacker behaviors across network, Entra ID, Microsoft 365 and AWS control planes.",
    "source": "cat-tool"
  },
  "Veeam": {
    "term": "Veeam",
    "definition": "Backup and recovery across virtual, physical, and cloud workloads with cloud-mobility options.",
    "source": "cat-tool"
  },
  "Velociraptor": {
    "term": "Velociraptor",
    "definition": "Open-source endpoint-visibility and DFIR platform (stewarded by Rapid7); hunts for and collects artifacts across entire fleets using its VQL query language. Also abused by intruders (2025 ransomware cases deployed it for remote access), so an unsanctioned Velociraptor install or server is itself suspicious.",
    "source": "cat-tool"
  },
  "Verdict": {
    "term": "Verdict",
    "definition": "In ASSURED, the two-axis judgment recorded for every case. Detection axis, per member alert: true positive, false positive (logic) or false positive (data). Activity axis, once per case: malicious, policy violation, authorized (benign true positive), benign-confirmed or undetermined. \"Merged into case\" is a status, not a verdict. Platform crosswalk: Microsoft Sentinel's True Positive, Benign Positive and False Positive, and Defender XDR's True positive, Informational, expected activity, and False positive, correspond to a malicious true positive, a benign true positive and a false positive. See the five-field record. Full entry: ASSURED terms.",
    "source": "clear",
    "methodTerm": true
  },
  "Verdict Agreement": {
    "term": "Verdict Agreement",
    "definition": "The share of blindly re-triaged cases that reach the same activity verdict, priority band and decision as the original. Report it with Cohen's kappa, which corrects for agreement by chance. See Inter-Rater Agreement and Measuring triage.",
    "source": "clear"
  },
  "Verkada": {
    "term": "Verkada",
    "definition": "Cloud-managed cameras, access control, alarms and visitor management in a single web console.",
    "source": "cat-tool"
  },
  "Vidar": {
    "term": "Vidar",
    "definition": "Widely distributed infostealer harvesting credentials, browser data, cookies, cryptocurrency wallets, and more. Delivered via phishing, malvertising and fake installers, with HTTP POST C2 and encrypted exfiltration. Customizable and available as malware-as-a-service; often bundled with or mistaken for RedLine / Raccoon. Vidar 2.0 (October 2025) was a ground-up rewrite.",
    "source": "bad-family"
  },
  "Virtual Desktop Infrastructure (VDI)": {
    "term": "Virtual Desktop Infrastructure (VDI)",
    "definition": "Desktop operating systems running as virtual machines on centralized infrastructure, accessed through remote display sessions rather than on the user's own hardware. Triage is harder because pooled host names and shared egress IPs are recycled across users over time, and non-persistent desktops are wiped at logoff, destroying local forensic artifacts unless telemetry is centralized.",
    "source": "clear"
  },
  "Virtual Private Network (VPN)": {
    "term": "Virtual Private Network (VPN)",
    "definition": "An encrypted tunnel from a user or site into a network. VPN logs map an internal address back to a user and session, and VPN appliances are a favorite initial-access target. Commercial and consumer VPN egress also makes geolocation and impossible-travel alerts unreliable.",
    "source": "clear"
  },
  "Virus": {
    "term": "Virus",
    "definition": "Malware that infects other files or programs and spreads when they are run. Rare in modern intrusions compared with worms and trojans, but the word is still used loosely for any malware.",
    "source": "bad-term"
  },
  "VirusTotal": {
    "term": "VirusTotal",
    "definition": "Multi-engine reputation for files, URLs, domains and IPs, owned by Google (part of Google Threat Intelligence). Search by hash first. An uploaded file is shared with VirusTotal's premium subscribers, and adversaries monitor it for their own samples, so never upload internal documents, customer data or samples from a targeted intrusion without approval. The public API is for non-commercial use.",
    "source": "cat-tool"
  },
  "Vishing (Voice Phishing)": {
    "term": "Vishing (Voice Phishing)",
    "definition": "Phone calls or voicemails impersonating authority figures or institutions to extract credentials or prompt unsafe actions.",
    "source": "bad-term"
  },
  "Visual Studio Code": {
    "term": "Visual Studio Code",
    "definition": "Microsoft's Electron-based code editor.",
    "source": "cat-tool"
  },
  "Volatility": {
    "term": "Volatility",
    "definition": "Open-source memory-forensics framework; extracts processes, network connections, injected code, and credentials from RAM captures. Volatility 3 is the current generation.",
    "source": "cat-tool"
  },
  "Volt Typhoon": {
    "term": "Volt Typhoon",
    "definition": "Chinese state-sponsored group that pre-positions inside U.S. critical infrastructure (energy, water, communications, transportation) for potential disruptive action rather than day-to-day espionage. Its defining tradecraft is living off the land: built-in tools, valid accounts, and hands-on-keyboard operation with almost no malware, which defeats IOC-driven detection. It relayed traffic through compromised SOHO routers (the KV botnet, disrupted by the FBI in January 2024). Disclosed May 2023 by Microsoft and CISA; the campaign itself is covered under notable campaigns below.",
    "source": "bad-actor"
  },
  "Volt Typhoon / Salt Typhoon": {
    "term": "Volt Typhoon / Salt Typhoon",
    "definition": "Two long-running China-linked campaigns against critical infrastructure. Volt Typhoon: disclosed May 2023 by Microsoft and CISA, it pre-positioned in U.S. energy, water, communications, and transportation networks using living-off-the-land techniques for stealthy persistence. Salt Typhoon: disclosed in late 2024, it compromised major U.S. telecom carriers' lawful-intercept systems with potential access to call metadata and the federal wiretap apparatus. An August 2025 advisory co-sealed by agencies from 13 countries tied overlapping activity to compromises of backbone, provider-edge and customer-edge routers across telecommunications, government, transportation, lodging and military networks worldwide, mostly through publicly known CVEs rather than zero-days. Together they reframed the boundary between espionage and prepositioning for disruptive action.",
    "source": "bad-campaign"
  },
  "Vulnerability": {
    "term": "Vulnerability",
    "definition": "A defect in a system that can be turned into adversary capability if paired with an exploit and exposure: an unpatched CVE, a misconfiguration, a default credential, a logic flaw. Vulnerability without exposure or exploitability is latent; with both, it's a finding.",
    "source": "clear"
  },
  "Vulnerability Disclosure Program (VDP)": {
    "term": "Vulnerability Disclosure Program (VDP)",
    "definition": "The published route by which outside researchers report security flaws, often advertised in a security.txt file (RFC 9116); a bug bounty adds payment. For triage, the report is an intake channel, and its question is not only whether the flaw is real but whether anyone else exploited it before the report. See Bug-bounty and disclosure reports.",
    "source": "clear"
  },
  "Vulnerability Management": {
    "term": "Vulnerability Management",
    "definition": "Systematic practice of identifying, classifying, prioritizing, remediating, and mitigating security vulnerabilities across an organization's systems and software. Modern programs prioritize on known exploitation (CISA KEV), exploit likelihood (EPSS) and decision trees (SSVC), not CVSS alone.",
    "source": "clear"
  },
  "WHOIS / RDAP": {
    "term": "WHOIS / RDAP",
    "definition": "Domain-registration lookup. For gTLDs, RDAP (RFC 9082/9083) replaced WHOIS as the authoritative source on 28 January 2025; many ccTLDs and .com still answer WHOIS. Registrant identity is usually redacted, so the useful triage fields are creation date, registrar, name servers and status, not the owner.",
    "source": "cat-tool"
  },
  "WMI Abuse": {
    "term": "WMI Abuse",
    "definition": "Using Windows Management Instrumentation to run commands and query system data on the local host or on remote hosts. Access is through PowerShell (Get-CimInstance, Invoke-CimMethod), COM/DCOM, or the deprecated wmic.exe (see the WMIC entry in the CLEAR glossary). WMI is native and looks like admin activity, so it blends in with legitimate management traffic. WMI event subscriptions used for persistence are a separate technique, T1546.003.",
    "source": "bad-term"
  },
  "WMI Event Subscription": {
    "term": "WMI Event Subscription",
    "definition": "A filter, consumer and binding stored in the WMI repository that runs attacker code when an event fires (logon, a timer). It is fileless and survives reboots. A Persistence technique; for WMI used to run commands, see WMI Abuse under Execution.",
    "source": "bad-term"
  },
  "WannaCry": {
    "term": "WannaCry",
    "definition": "May 2017 ransomware outbreak using EternalBlue (NSA SMB exploit leaked by Shadow Brokers). It wormed across networks, encrypting files in 150+ countries, and hit the UK NHS hard. Microsoft had released the patch two months earlier, but many systems were unpatched. Attributed to North Korea's Lazarus Group, it was a wake-up call on patch hygiene.",
    "source": "bad-campaign"
  },
  "WannaCry: worm spread": {
    "term": "WannaCry: worm spread",
    "definition": "WannaCry used the EternalBlue exploit (MS17-010) to propagate through SMB to any unpatched host it could reach. From patient zero, it spread autonomously by scanning local subnets and random IPs, infecting roughly 200,000 systems across 150 countries within 24 hours of the May 12, 2017 outbreak. By the time most SOCs had triaged the first alert, the second wave of hosts was already encrypting. That speed is what \"wormable\" means in practice: the malware does its own lateral movement; defenders do not get the usual reaction window.",
    "source": "bad-feature"
  },
  "Wapiti": {
    "term": "Wapiti",
    "definition": "Open-source command-line web vulnerability scanner; crawls and injects payloads for common flaws.",
    "source": "cat-tool"
  },
  "Warm Handoff": {
    "term": "Warm Handoff",
    "definition": "A live, synchronous handoff on a call or bridge in which the receiver confirms ownership, as opposed to a ticket reassignment. In ASSURED every P1 escalation uses one, and triage still owns the case until the receiver fills in the handoff packet's receipt. See Escalation protocols. Full entry: ASSURED terms.",
    "source": "clear"
  },
  "Watering Hole Attack": {
    "term": "Watering Hole Attack",
    "definition": "Compromises a website frequently visited by a target group, embedding malware to infect visitors.",
    "source": "bad-term"
  },
  "Web Shell": {
    "term": "Web Shell",
    "definition": "A script planted on a web server that gives the attacker remote command execution through ordinary HTTP requests; the standard foothold after edge-device and file-transfer exploitation (HAFNIUM, ProxyShell, MOVEit, SharePoint ToolShell).",
    "source": "bad-term"
  },
  "Whaling": {
    "term": "Whaling",
    "definition": "Spear phishing targeting high-profile individuals like executives, often for financial fraud (business email compromise) or data theft.",
    "source": "bad-term"
  },
  "WhisperGate": {
    "term": "WhisperGate",
    "definition": "Destructive malware deployed against Ukraine in January 2022. It masquerades as ransomware but irreversibly corrupts the MBR and deletes system files in two stages: first it corrupts the bootloader, then it drops a wiper. There is no recovery mechanism: the goal was disruption, not profit. Attributed by Microsoft to Cadet Blizzard; in 2024 the U.S. indicted officers of GRU Unit 29155 for the operation (see CISA AA24-249A). Echoed NotPetya tactics.",
    "source": "bad-family"
  },
  "Wildcard DNS": {
    "term": "Wildcard DNS",
    "definition": "A DNS record (*.example.com) that answers for every subdomain without a record of its own. Attackers use it to serve unique per-victim or per-campaign subdomains from one domain and to make DNS tunneling cheap. Many unique subdomains of one domain resolving to the same address is a tell.",
    "source": "clear"
  },
  "Windows Event Logs": {
    "term": "Windows Event Logs",
    "definition": "Logs generated by Windows operating systems recording system, security, and application events. Triage staples: 4624/4625 (logon success/failure, with Logon Type), 4672 (special privileges), 4688 (process creation, if command-line auditing is enabled), 4720 (account created), 4769 (Kerberos service ticket), 7045 (service installed), 1102 (audit log cleared), 4104 (PowerShell script block). Sysmon adds richer process, network and image-load events.",
    "source": "clear"
  },
  "Windows Management Instrumentation Command-line (WMIC)": {
    "term": "Windows Management Instrumentation Command-line (WMIC)",
    "definition": "A tool for managing Windows systems via scripting. Deprecated by Microsoft since Windows 10 21H1 (2021). Windows 11 shipped it as a Feature on Demand, preinstalled in early releases and disabled by default from 24H2 (Microsoft's own pages differ on 23H2). The August and September 2026 updates then removed it outright, with no Feature on Demand, from Windows 11 24H2, 25H2 and 26H1. It persists on Windows 10, Windows Server, and older or unpatched Windows 11 builds, which is why it remains a favorite LOLBin in active intrusions; wmic.exe running on a fully patched current Windows 11 host is itself anomalous. The modern equivalent is PowerShell's Get-CimInstance / Invoke-CimMethod against the same WMI namespaces.",
    "source": "clear"
  },
  "Windows Security event IDs": {
    "term": "Windows Security event IDs",
    "definition": "The Windows event log records triage analysts cite most: 4624 and 4625 (logon success and failure), 4672 (special privileges), 4688 (process creation), 4698 (scheduled task created), 4720 (account created), 1102 (audit log cleared), 7045 (service installed, System log) and 4104 (PowerShell script block, PowerShell Operational log).",
    "source": "cat-tool"
  },
  "Wiper Malware": {
    "term": "Wiper Malware",
    "definition": "Malware designed to irreversibly delete data and destroy system functionality. Examples: NotPetya, Shamoon, WhisperGate, HermeticWiper.",
    "source": "bad-term"
  },
  "Wireshark": {
    "term": "Wireshark",
    "definition": "Open-source packet analyzer; deep protocol decoding for investigation and forensics.",
    "source": "cat-tool"
  },
  "Wiz": {
    "term": "Wiz",
    "definition": "Agentless cloud security platform; correlates infra/config/workload data to map attack paths and prioritize risk. Now part of Google Cloud (acquisition completed March 2026). Wiz Defend adds runtime threat detection and response for cloud workloads.",
    "source": "cat-tool"
  },
  "Wizard Spider": {
    "term": "Wizard Spider",
    "definition": "Russia-based cybercriminal group that ran Ryuk, Conti, and TrickBot and extorted hundreds of millions from hospitals, municipalities and corporations. It operated within a larger ecosystem of initial access brokers and malware developers, with fast lateral movement, data theft and double extortion, usually after TrickBot or BazarLoader infections. That era ended in 2022, when Conti shut down and TrickBot and BazarLoader went quiet; members dispersed into successor ransomware brands.",
    "source": "bad-actor"
  },
  "Workload Identity Federation": {
    "term": "Workload Identity Federation",
    "definition": "An external workload (a CI job, a Kubernetes pod, another cloud) exchanges its own signed OIDC token for short-lived cloud credentials, accepted only if it matches the role's trust conditions. No stored secret exists, so the trust conditions are what an attacker targets. See Non-human identities and cloud roles.",
    "source": "clear"
  },
  "Worm": {
    "term": "Worm",
    "definition": "Self-propagating malware that spreads host to host without user action, usually through a network-reachable vulnerability ('wormable' describes such a flaw, e.g. EternalBlue, BlueKeep).",
    "source": "bad-term"
  },
  "Write Once, Read Many (WORM) Storage": {
    "term": "Write Once, Read Many (WORM) Storage",
    "definition": "Storage that cannot be modified or deleted until a retention period ends: object lock, immutable backups, compliance archives. Logs and evidence kept on WORM storage survive an attacker who gains admin rights and tries to clear them, which is why ransomware operators target backups that are not immutable.",
    "source": "clear"
  },
  "X-Ways Forensics": {
    "term": "X-Ways Forensics",
    "definition": "Lightweight, fast forensic suite with scripting and hex-level analysis for deep investigations.",
    "source": "cat-tool"
  },
  "XDR (concept)": {
    "term": "XDR (concept)",
    "definition": "Extended detection and response: correlates telemetry across endpoint, identity, email, network, and cloud into unified detections and response actions, extending EDR beyond the single host.",
    "source": "cat-tool"
  },
  "XZ Utils backdoor": {
    "term": "XZ Utils backdoor",
    "definition": "March 2024. A multi-year social-engineering campaign by a fictitious maintainer (\"Jia Tan\") inserted a stealthy backdoor (CVE-2024-3094) into xz/liblzma 5.6.0-5.6.1. It reached rolling and pre-release distributions (Debian testing/unstable, Fedora Rawhide, Kali, openSUSE Tumbleweed) but no major stable release. On systems where a distro-patched sshd loads liblzma through libsystemd, it hooked SSH RSA key verification to give whoever held the attacker's private key pre-authentication remote code execution. Caught by chance by a Microsoft engineer noticing a 500ms slowdown. A defining open-source supply-chain case and the catalyst for renewed maintainer-trust scrutiny.",
    "source": "bad-campaign"
  },
  "YARA": {
    "term": "YARA",
    "definition": "Open-source pattern-matching engine for identifying and classifying malware: rules describe strings, byte sequences, and conditions that a file or memory region must satisfy. The original C engine is in maintenance mode (critical fixes only); new development happens in YARA-X, a Rust rewrite that runs about 99% of existing rules unchanged but has different APIs and does not yet scan live process memory. The rule language remains the lingua franca.",
    "source": "cat-tool"
  },
  "YARA-L 2.0 and UDM": {
    "term": "YARA-L 2.0 and UDM",
    "definition": "Google Security Operations' detection language (YARA-L 2.0, unrelated to file-scanning YARA despite the name) and its Unified Data Model event schema.",
    "source": "cat-tool"
  },
  "ZAP (formerly OWASP ZAP)": {
    "term": "ZAP (formerly OWASP ZAP)",
    "definition": "Free, open-source web-app scanner and intercepting proxy, now sponsored as \"ZAP by Checkmarx\".",
    "source": "cat-tool"
  },
  "Zeek (formerly Bro)": {
    "term": "Zeek (formerly Bro)",
    "definition": "Behavior-focused network monitoring producing structured session logs for SIEM-friendly analytics.",
    "source": "cat-tool"
  },
  "Zero Data Retention (ZDR)": {
    "term": "Zero Data Retention (ZDR)",
    "definition": "A vendor commitment, usually contractual, that prompts and outputs sent to an AI service are not stored once the response is returned, within limits the terms set (abuse monitoring, legal holds, excluded features). It decides whether case data may go to an AI assistant at all, so read the actual terms. See AI-assisted triage.",
    "source": "clear"
  },
  "Zero Day": {
    "term": "Zero Day",
    "definition": "A vulnerability with no available patch, either because the vendor does not yet know about it or has not yet shipped a fix. Exploitation is not required for the term; when attackers exploit it before a fix exists, that is a zero-day attack (the NIST definition cited here). Once a patch exists but has not been applied, the bug is an n-day.",
    "source": "bad-term"
  },
  "Zero-Day Vulnerability": {
    "term": "Zero-Day Vulnerability",
    "definition": "A vulnerability for which no patch is yet available, either because the vendor has not shipped one or because the vendor does not yet know the bug exists. Called \"zero-day\" because that is the number of days defenders have had to prepare. Exploitation is not a definitional prerequisite; a zero-day can exist before any exploit appears. Usage varies: many sources, including NIST's \"zero-day attack\", use the term for a vulnerability already exploited before a fix exists; say \"exploited zero-day\" when you mean that. Once a patch exists but has not been applied, the bug is an n-day.",
    "source": "clear"
  },
  "Zerologon (CVE-2020-1472)": {
    "term": "Zerologon (CVE-2020-1472)",
    "definition": "Netlogon protocol flaw. Netlogon used AES-CFB8 with a fixed all-zero IV, so about one in 256 all-zero authentication attempts succeeds. An unauthenticated attacker on the network can impersonate a domain controller, reset its machine-account password to empty, and then dump domain hashes (DCSync). Actively exploited soon after disclosure.",
    "source": "bad-term"
  },
  "Zscaler Deception (formerly Smokescreen)": {
    "term": "Zscaler Deception (formerly Smokescreen)",
    "definition": "Deception with decoys and lures mimicking real IT; alerts on engagement and provides attacker-TTP insight. Smokescreen acquired by Zscaler, 2021.",
    "source": "cat-tool"
  },
  "Zscaler Internet Access": {
    "term": "Zscaler Internet Access",
    "definition": "Zscaler's cloud secure web gateway: inline proxy with TLS inspection, URL filtering, sandboxing, firewall and DLP for user traffic.",
    "source": "cat-tool"
  },
  "Zscaler ThreatLabz": {
    "term": "Zscaler ThreatLabz",
    "definition": "Zscaler's threat-research team; publishes malware and campaign research drawn from Zscaler's cloud traffic and feeds detections into its security services.",
    "source": "cat-tool"
  },
  "certutil.exe": {
    "term": "certutil.exe",
    "definition": "A Windows command-line tool for certificate management that attackers abuse as a downloader and decoder (ATT&CK T1105, ATT&CK T1140). Tells: certutil -urlcache -split -f <url> fetching a file, and certutil -decode turning a Base64 blob into an executable. Most EDRs alert on these command lines, so an attacker who knows that moves to another binary; a quiet certutil says little.",
    "source": "clear"
  },
  "eSentire": {
    "term": "eSentire",
    "definition": "MDR provider with 24/7 SOC analysts, threat hunting and incident response across endpoint, network, log and cloud sources.",
    "source": "cat-tool"
  },
  "mshta.exe": {
    "term": "mshta.exe",
    "definition": "The Windows host for HTML Applications. See HTML Application (HTA) for how attackers abuse it (ATT&CK T1218.005).",
    "source": "clear"
  },
  "ngrok": {
    "term": "ngrok",
    "definition": "Tunneling service that exposes a local port to the internet through an ngrok-hosted URL.",
    "source": "cat-tool"
  },
  "osquery": {
    "term": "osquery",
    "definition": "Open-source agent that exposes operating-system state (processes, listening ports, users, startup items, browser extensions) as SQL tables on Windows, macOS and Linux.",
    "source": "cat-tool"
  },
  "plaso": {
    "term": "plaso",
    "definition": "Open-source engine behind log2timeline; parses disk images and artifacts from many sources into a single super-timeline. The standard tooling for timeline-based forensic analysis.",
    "source": "cat-tool"
  },
  "rclone": {
    "term": "rclone",
    "definition": "Open-source command-line tool for syncing files to dozens of cloud storage providers.",
    "source": "cat-tool"
  },
  "regsvr32.exe": {
    "term": "regsvr32.exe",
    "definition": "A Windows utility that registers and unregisters DLLs and COM objects, abused to run remote scriptlets through a signed binary. Tell: regsvr32 /s /n /u /i:<url> scrobj.dll, the \"Squiblydoo\" pattern (ATT&CK T1218.010).",
    "source": "clear"
  },
  "rundll32.exe": {
    "term": "rundll32.exe",
    "definition": "A Windows utility that runs an exported function from a DLL, abused to execute attacker code through a signed binary (ATT&CK T1218.011). Tells: a DLL loaded from a user-writable path such as a Temp or Downloads folder, an export called by ordinal, or a javascript: invocation on the command line.",
    "source": "clear"
  },
  "urlscan.io": {
    "term": "urlscan.io",
    "definition": "Service that loads a URL in a browser and records the rendered page, screenshot, requests, redirects and hosting details; searchable history of earlier scans.",
    "source": "cat-tool"
  },
  "w3af": {
    "term": "w3af",
    "definition": "Open-source web application attack and audit framework. No development since 2020 (Python 2 codebase); prefer Burp Suite, ZAP or Wapiti, listed on this page.",
    "source": "cat-tool"
  }
};

/** Lowercase and treat hyphens as spaces so "False-Positive" finds
 *  "False Positive". Collapses runs of whitespace to a single space. */
function normalizeKey(s: string): string {
  return s.toLowerCase().replace(/-/g, " ").replace(/\s+/g, " ").trim();
}

/** Case- and hyphen-insensitive lookup. Tries exact, normalized, and
 *  singular forms. */
export function lookupTerm(needle: string): GlossaryEntry | undefined {
  if (!needle) return undefined;
  const direct = glossary[needle];
  if (direct) return direct;
  const candidates = [normalizeKey(needle)];
  if (needle.endsWith("s")) {
    candidates.push(normalizeKey(needle.slice(0, -1)));
  }
  for (const k of Object.keys(glossary)) {
    const nk = normalizeKey(k);
    if (candidates.includes(nk)) return glossary[k];
  }
  return undefined;
}

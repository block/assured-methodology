/**
 * Auto-generated acronym index. Do not edit by hand.
 * Built by scripts/build-acronyms.mjs from the four glossaries and from
 * acronyms defined on first use across the content pages. Rebuild with
 * `node scripts/build-acronyms.mjs`; check with `--check`.
 */

export interface AcronymEntry {
  /** The acronym as the site writes it. */
  acronym: string;
  /** Its expansion, as written where it is defined. */
  expansion: string;
  /** Where it is defined: a glossary entry, or the page that first defines it. */
  href: string;
  /** "assured" | "clear" | "cat" | "bad" for a glossary entry; "page" for first use in prose. */
  source: "assured" | "clear" | "cat" | "bad" | "page";
  /** Title of the glossary or page at href. */
  sourceTitle: string;
  /** For glossary entries: the first page, in reading order, that also defines it in prose. */
  firstUse?: { href: string; title: string };
}

export const acronyms: AcronymEntry[] = [
  {
    "acronym": "ABAC",
    "expansion": "Attribute-Based Access Control",
    "href": "/docs/glossaries/clear/#A",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "ACAS",
    "expansion": "Assured Compliance Assessment Solution",
    "href": "/docs/positioning/",
    "source": "page",
    "sourceTitle": "How ASSURED compares"
  },
  {
    "acronym": "ACH",
    "expansion": "Analysis of Competing Hypotheses",
    "href": "/docs/glossaries/clear/#A",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary",
    "firstUse": {
      "href": "/docs/cognitive-traps/",
      "title": "Cognitive traps in triage"
    }
  },
  {
    "acronym": "ADS",
    "expansion": "Alerting and Detection Strategy",
    "href": "/docs/glossaries/clear/#A",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary",
    "firstUse": {
      "href": "/docs/alert/detection-mechanisms/#one-rule-three-ways",
      "title": "How detections work"
    }
  },
  {
    "acronym": "AI/ML",
    "expansion": "Artificial Intelligence / Machine Learning",
    "href": "/docs/glossaries/clear/#A",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "AiTM",
    "expansion": "Adversary-in-the-Middle",
    "href": "/docs/glossaries/clear/#A",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary",
    "firstUse": {
      "href": "/docs/escalation/example/#case-c",
      "title": "Escalation working example"
    }
  },
  {
    "acronym": "AMSI",
    "expansion": "Antimalware Scan Interface",
    "href": "/docs/glossaries/bad/#disable-or-modify-tools",
    "source": "page",
    "sourceTitle": "Threat Behavior & Adversary Reference (the B.A.D. Glossary)"
  },
  {
    "acronym": "API",
    "expansion": "Application Programming Interface",
    "href": "/docs/glossaries/clear/#A",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "APT",
    "expansion": "Advanced Persistent Threat",
    "href": "/docs/glossaries/bad/#advanced-persistent-threat-apt",
    "source": "bad",
    "sourceTitle": "B.A.D. glossary"
  },
  {
    "acronym": "ASN",
    "expansion": "Autonomous System Number",
    "href": "/docs/glossaries/clear/#A",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "BAA",
    "expansion": "business associate agreement",
    "href": "/docs/glossaries/clear/#B",
    "source": "page",
    "sourceTitle": "C.L.E.A.R. Glossary: core analyst vocabulary"
  },
  {
    "acronym": "BEC",
    "expansion": "Business Email Compromise",
    "href": "/docs/glossaries/clear/#B",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "BGP",
    "expansion": "Border Gateway Protocol",
    "href": "/docs/glossaries/clear/#B",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "BITS",
    "expansion": "Background Intelligent Transfer Service",
    "href": "/docs/glossaries/clear/#B",
    "source": "page",
    "sourceTitle": "C.L.E.A.R. Glossary: core analyst vocabulary"
  },
  {
    "acronym": "BOTS",
    "expansion": "Boss of the SOC",
    "href": "/docs/glossaries/cat/#boss-of-the-soc-bots",
    "source": "cat",
    "sourceTitle": "C.A.T. glossary"
  },
  {
    "acronym": "BPH",
    "expansion": "Bulletproof Hosting",
    "href": "/docs/glossaries/bad/#bulletproof-hosting",
    "source": "bad",
    "sourceTitle": "B.A.D. glossary"
  },
  {
    "acronym": "BYOD",
    "expansion": "Bring Your Own Device",
    "href": "/docs/glossaries/clear/#B",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "BYOVD",
    "expansion": "Bring Your Own Vulnerable Driver",
    "href": "/docs/glossaries/bad/#byovd",
    "source": "bad",
    "sourceTitle": "B.A.D. glossary"
  },
  {
    "acronym": "CAE",
    "expansion": "Continuous Access Evaluation",
    "href": "/docs/glossaries/clear/#C",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "CASB",
    "expansion": "cloud access security broker",
    "href": "/docs/subject/example/#insider-referral",
    "source": "page",
    "sourceTitle": "Subject working example"
  },
  {
    "acronym": "CCPA",
    "expansion": "California Consumer Privacy Act",
    "href": "/docs/glossaries/clear/#C",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "CDE",
    "expansion": "Cardholder Data Environment",
    "href": "/docs/glossaries/clear/#C",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary",
    "firstUse": {
      "href": "/docs/scope/regulatory/",
      "title": "Regulatory boundaries"
    }
  },
  {
    "acronym": "CDN",
    "expansion": "content delivery network",
    "href": "/docs/glossaries/bad/#tunneling-services",
    "source": "page",
    "sourceTitle": "Threat Behavior & Adversary Reference (the B.A.D. Glossary)"
  },
  {
    "acronym": "CDR",
    "expansion": "cloud detection and response",
    "href": "/docs/glossaries/cat/#cloud",
    "source": "page",
    "sourceTitle": "Security Tool & Platform Reference (the C.A.T. Glossary)"
  },
  {
    "acronym": "CEF",
    "expansion": "Common Event Format",
    "href": "/docs/glossaries/clear/#C",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary",
    "firstUse": {
      "href": "/docs/alert/parsing/multi-format/",
      "title": "Formats and normalization"
    }
  },
  {
    "acronym": "CIRCIA",
    "expansion": "Cyber Incident Reporting for Critical Infrastructure Act",
    "href": "/docs/glossaries/clear/#C",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary",
    "firstUse": {
      "href": "/docs/escalation/protocols/",
      "title": "Internal and external escalation protocols"
    }
  },
  {
    "acronym": "CIS",
    "expansion": "Center for Internet Security",
    "href": "/docs/glossaries/cat/#ms-isac",
    "source": "page",
    "sourceTitle": "Security Tool & Platform Reference (the C.A.T. Glossary)"
  },
  {
    "acronym": "CISA",
    "expansion": "Cybersecurity and Infrastructure Security Agency",
    "href": "/docs/escalation/protocols/",
    "source": "page",
    "sourceTitle": "Internal and external escalation protocols"
  },
  {
    "acronym": "CMDB",
    "expansion": "Configuration Management Database",
    "href": "/docs/glossaries/clear/#C",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "CNA",
    "expansion": "CVE Numbering Authority",
    "href": "/docs/risk/framework/#cvss",
    "source": "page",
    "sourceTitle": "The priority matrix"
  },
  {
    "acronym": "CNAPP",
    "expansion": "cloud-native application protection platform",
    "href": "/docs/field-reference/tool-families/",
    "source": "page",
    "sourceTitle": "Tool families"
  },
  {
    "acronym": "COM",
    "expansion": "Component Object Model",
    "href": "/docs/glossaries/bad/#com-hijacking",
    "source": "page",
    "sourceTitle": "Threat Behavior & Adversary Reference (the B.A.D. Glossary)"
  },
  {
    "acronym": "ConfigMgr",
    "expansion": "Configuration Manager",
    "href": "/docs/glossaries/cat/#solarwinds-patch-manager",
    "source": "page",
    "sourceTitle": "Security Tool & Platform Reference (the C.A.T. Glossary)"
  },
  {
    "acronym": "CQL",
    "expansion": "CrowdStrike Query Language",
    "href": "/docs/glossaries/cat/#crowdstrike-query-language",
    "source": "cat",
    "sourceTitle": "C.A.T. glossary"
  },
  {
    "acronym": "CRA",
    "expansion": "Cyber Resilience Act",
    "href": "/docs/glossaries/clear/#C",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "CSF",
    "expansion": "Cybersecurity Framework",
    "href": "/docs/escalation/triage-vs-ir/",
    "source": "page",
    "sourceTitle": "Event triage vs. incident response"
  },
  {
    "acronym": "CSIRT",
    "expansion": "Computer Security Incident Response Team",
    "href": "/docs/glossaries/clear/#C",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary",
    "firstUse": {
      "href": "/docs/escalation/protocols/",
      "title": "Internal and external escalation protocols"
    }
  },
  {
    "acronym": "CSPM",
    "expansion": "Cloud Security Posture Management",
    "href": "/docs/glossaries/clear/#C",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "CVE",
    "expansion": "Common Vulnerabilities and Exposures",
    "href": "/docs/glossaries/clear/#C",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "CVSS",
    "expansion": "Common Vulnerability Scoring System",
    "href": "/docs/glossaries/clear/#C",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "DAIR",
    "expansion": "Dynamic Approach to Incident Response",
    "href": "/docs/glossaries/clear/#S",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary",
    "firstUse": {
      "href": "/docs/intro/",
      "title": "Introduction to the ASSURED methodology"
    }
  },
  {
    "acronym": "DAST",
    "expansion": "dynamic application security testing",
    "href": "/docs/glossaries/cat/#owasp-zap",
    "source": "page",
    "sourceTitle": "Security Tool & Platform Reference (the C.A.T. Glossary)"
  },
  {
    "acronym": "DDR",
    "expansion": "Dead Drop Resolver",
    "href": "/docs/glossaries/bad/#dead-drop-resolver-ddr",
    "source": "bad",
    "sourceTitle": "B.A.D. glossary"
  },
  {
    "acronym": "DGA",
    "expansion": "Domain Generation Algorithm",
    "href": "/docs/glossaries/bad/#domain-generation-algorithm-dga",
    "source": "bad",
    "sourceTitle": "B.A.D. glossary"
  },
  {
    "acronym": "DKIM",
    "expansion": "DomainKeys Identified Mail",
    "href": "/docs/glossaries/clear/#D",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "DLL",
    "expansion": "Dynamic Link Library",
    "href": "/docs/glossaries/clear/#D",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "DLP",
    "expansion": "Data Loss Prevention",
    "href": "/docs/glossaries/clear/#D",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary",
    "firstUse": {
      "href": "/docs/exercises/",
      "title": "Hands-on exercises"
    }
  },
  {
    "acronym": "DNS",
    "expansion": "Domain Name System",
    "href": "/docs/glossaries/clear/#D",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "DORA",
    "expansion": "Digital Operational Resilience Act",
    "href": "/docs/glossaries/clear/#D",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "DPA",
    "expansion": "data processing agreement",
    "href": "/docs/escalation/protocols/",
    "source": "page",
    "sourceTitle": "Internal and external escalation protocols"
  },
  {
    "acronym": "DPI",
    "expansion": "Deep Packet Inspection",
    "href": "/docs/glossaries/clear/#D",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "DPIA",
    "expansion": "data protection impact assessment",
    "href": "/docs/subject/insider-analysis/",
    "source": "page",
    "sourceTitle": "Insider analysis"
  },
  {
    "acronym": "DPO",
    "expansion": "Data Protection Officer",
    "href": "/docs/glossaries/clear/#D",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary",
    "firstUse": {
      "href": "/docs/risk/example/#case-a",
      "title": "Risk working example"
    }
  },
  {
    "acronym": "ECH",
    "expansion": "Encrypted Client Hello",
    "href": "/docs/glossaries/bad/#tunneling-services",
    "source": "page",
    "sourceTitle": "Threat Behavior & Adversary Reference (the B.A.D. Glossary)"
  },
  {
    "acronym": "EDR",
    "expansion": "Endpoint Detection and Response",
    "href": "/docs/glossaries/clear/#E",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary",
    "firstUse": {
      "href": "/docs/exercises/",
      "title": "Hands-on exercises"
    }
  },
  {
    "acronym": "EPSS",
    "expansion": "Exploit Prediction Scoring System",
    "href": "/docs/glossaries/clear/#E",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "EQL",
    "expansion": "Event Query Language",
    "href": "/docs/glossaries/cat/#es-ql-eql",
    "source": "page",
    "sourceTitle": "Security Tool & Platform Reference (the C.A.T. Glossary)"
  },
  {
    "acronym": "ETW",
    "expansion": "Event Tracing for Windows",
    "href": "/docs/glossaries/cat/#etw",
    "source": "cat",
    "sourceTitle": "C.A.T. glossary"
  },
  {
    "acronym": "FIM",
    "expansion": "File Integrity Monitoring",
    "href": "/docs/glossaries/clear/#F",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary",
    "firstUse": {
      "href": "/docs/field-reference/telemetry-sources/",
      "title": "Telemetry sources"
    }
  },
  {
    "acronym": "FIRST",
    "expansion": "Forum of Incident Response and Security Teams",
    "href": "/docs/glossaries/cat/#first-epss",
    "source": "page",
    "sourceTitle": "Security Tool & Platform Reference (the C.A.T. Glossary)"
  },
  {
    "acronym": "GDPR",
    "expansion": "General Data Protection Regulation",
    "href": "/docs/glossaries/clear/#G",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "HIPAA",
    "expansion": "Health Insurance Portability and Accountability Act",
    "href": "/docs/glossaries/clear/#H",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "HMI",
    "expansion": "human-machine interface",
    "href": "/docs/glossaries/bad/#xz-utils-backdoor",
    "source": "page",
    "sourceTitle": "Threat Behavior & Adversary Reference (the B.A.D. Glossary)"
  },
  {
    "acronym": "HTA",
    "expansion": "HTML Application",
    "href": "/docs/glossaries/clear/#H",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "HTTP",
    "expansion": "Hypertext Transfer Protocol",
    "href": "/docs/glossaries/clear/#H",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "IAB",
    "expansion": "Initial Access Broker",
    "href": "/docs/glossaries/bad/#initial-access-broker",
    "source": "bad",
    "sourceTitle": "B.A.D. glossary"
  },
  {
    "acronym": "IAM",
    "expansion": "identity and access management",
    "href": "/docs/glossaries/cat/",
    "source": "page",
    "sourceTitle": "Security Tool & Platform Reference (the C.A.T. Glossary)"
  },
  {
    "acronym": "ICES",
    "expansion": "integrated cloud email security",
    "href": "/docs/field-reference/telemetry-sources/",
    "source": "page",
    "sourceTitle": "Telemetry sources"
  },
  {
    "acronym": "ICS/OT",
    "expansion": "industrial control system and operational technology",
    "href": "/docs/glossaries/bad/#sandworm",
    "source": "page",
    "sourceTitle": "Threat Behavior & Adversary Reference (the B.A.D. Glossary)"
  },
  {
    "acronym": "IDE",
    "expansion": "Integrated Development Environment",
    "href": "/docs/glossaries/clear/#I",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "IdP",
    "expansion": "Identity Provider",
    "href": "/docs/glossaries/clear/#I",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary",
    "firstUse": {
      "href": "/docs/escalation/criteria/#high-impact",
      "title": "Close or escalate: the criteria"
    }
  },
  {
    "acronym": "IDS",
    "expansion": "Intrusion Detection System",
    "href": "/docs/glossaries/clear/#I",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary",
    "firstUse": {
      "href": "/docs/risk/framework/#cvss",
      "title": "The priority matrix"
    }
  },
  {
    "acronym": "IGA",
    "expansion": "identity governance",
    "href": "/docs/subject/four-dimensions/",
    "source": "page",
    "sourceTitle": "The four dimensions of Subject analysis"
  },
  {
    "acronym": "IMDS",
    "expansion": "instance metadata service",
    "href": "/docs/alert/parsing/cloud-identity/",
    "source": "page",
    "sourceTitle": "Cloud and identity logs"
  },
  {
    "acronym": "IoA",
    "expansion": "Indicator of Attack",
    "href": "/docs/glossaries/clear/#I",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "IoC",
    "expansion": "Indicators of Compromise",
    "href": "/docs/glossaries/clear/#I",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary",
    "firstUse": {
      "href": "/docs/reference/",
      "title": "The one-page reference"
    }
  },
  {
    "acronym": "IoT",
    "expansion": "Internet of Things",
    "href": "/docs/glossaries/clear/#I",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "IP",
    "expansion": "Internet Protocol",
    "href": "/docs/glossaries/clear/#I",
    "source": "page",
    "sourceTitle": "C.L.E.A.R. Glossary: core analyst vocabulary"
  },
  {
    "acronym": "IPC",
    "expansion": "Inter-Process Communication",
    "href": "/docs/glossaries/clear/#I",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "IPS",
    "expansion": "Intrusion Prevention System",
    "href": "/docs/glossaries/clear/#I",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "IR",
    "expansion": "incident response",
    "href": "/docs/intro/",
    "source": "page",
    "sourceTitle": "Introduction to the ASSURED methodology",
    "firstUse": {
      "href": "/docs/exercises/",
      "title": "Hands-on exercises"
    }
  },
  {
    "acronym": "IRM",
    "expansion": "Insider Risk Management",
    "href": "/docs/glossaries/bad/#insider-risk-management-irm",
    "source": "bad",
    "sourceTitle": "B.A.D. glossary",
    "firstUse": {
      "href": "/docs/subject/insider-analysis/",
      "title": "Insider analysis"
    }
  },
  {
    "acronym": "ISAC",
    "expansion": "Information Sharing and Analysis Center",
    "href": "/docs/glossaries/clear/#I",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary",
    "firstUse": {
      "href": "/docs/documentation/#downstream-uses",
      "title": "Documentation: Making the work durable"
    }
  },
  {
    "acronym": "ISC",
    "expansion": "Internet Storm Center",
    "href": "/docs/glossaries/cat/#sans-institute",
    "source": "page",
    "sourceTitle": "Security Tool & Platform Reference (the C.A.T. Glossary)"
  },
  {
    "acronym": "ITDR",
    "expansion": "Identity Threat Detection and Response",
    "href": "/docs/glossaries/clear/#I",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary",
    "firstUse": {
      "href": "/docs/subject/behavioral-framework/",
      "title": "Behavioral analysis framework"
    }
  },
  {
    "acronym": "KEV",
    "expansion": "Known Exploited Vulnerabilities",
    "href": "/docs/glossaries/clear/#K",
    "source": "page",
    "sourceTitle": "C.L.E.A.R. Glossary: core analyst vocabulary"
  },
  {
    "acronym": "LEQL",
    "expansion": "Log Entry Query Language",
    "href": "/docs/glossaries/cat/#rapid7-insightidr",
    "source": "page",
    "sourceTitle": "Security Tool & Platform Reference (the C.A.T. Glossary)"
  },
  {
    "acronym": "LLM",
    "expansion": "Large Language Model",
    "href": "/docs/glossaries/clear/#L",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "LOTL",
    "expansion": "Living Off the Land",
    "href": "/docs/glossaries/clear/#L",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "LSASS",
    "expansion": "Local Security Authority Subsystem Service",
    "href": "/docs/glossaries/bad/#mimikatz",
    "source": "page",
    "sourceTitle": "Threat Behavior & Adversary Reference (the B.A.D. Glossary)"
  },
  {
    "acronym": "MAC",
    "expansion": "Mandatory Access Control",
    "href": "/docs/glossaries/clear/#M",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "MAM",
    "expansion": "Mobile Application Management",
    "href": "/docs/glossaries/clear/#M",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "MCP",
    "expansion": "Model Context Protocol",
    "href": "/docs/glossaries/clear/#M",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary",
    "firstUse": {
      "href": "/docs/risk/example/#case-b",
      "title": "Risk working example"
    }
  },
  {
    "acronym": "MDM",
    "expansion": "mobile device management",
    "href": "/docs/alert/parsing/process-relationships/",
    "source": "page",
    "sourceTitle": "Process relationships"
  },
  {
    "acronym": "MDR",
    "expansion": "Managed Detection and Response",
    "href": "/docs/glossaries/clear/#M",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary",
    "firstUse": {
      "href": "/docs/escalation/protocols/",
      "title": "Internal and external escalation protocols"
    }
  },
  {
    "acronym": "MFA",
    "expansion": "Multi-Factor Authentication",
    "href": "/docs/glossaries/clear/#M",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "MOTW",
    "expansion": "Mark of the Web",
    "href": "/docs/glossaries/clear/#M",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "MSA",
    "expansion": "master service agreement",
    "href": "/docs/escalation/protocols/",
    "source": "page",
    "sourceTitle": "Internal and external escalation protocols"
  },
  {
    "acronym": "MSDT",
    "expansion": "Microsoft Support Diagnostic Tool",
    "href": "/docs/glossaries/bad/#follina-cve-2022-30190",
    "source": "page",
    "sourceTitle": "Threat Behavior & Adversary Reference (the B.A.D. Glossary)"
  },
  {
    "acronym": "MSP",
    "expansion": "managed service provider",
    "href": "/docs/glossaries/bad/#apt10",
    "source": "page",
    "sourceTitle": "Threat Behavior & Adversary Reference (the B.A.D. Glossary)"
  },
  {
    "acronym": "MSSP",
    "expansion": "Managed Security Service Provider",
    "href": "/docs/glossaries/clear/#M",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary",
    "firstUse": {
      "href": "/docs/escalation/protocols/",
      "title": "Internal and external escalation protocols"
    }
  },
  {
    "acronym": "MTTA",
    "expansion": "Mean Time To Acknowledge",
    "href": "/docs/glossaries/clear/#M",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "MTTD",
    "expansion": "Mean Time To Detect",
    "href": "/docs/glossaries/clear/#M",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "NAC",
    "expansion": "network access control",
    "href": "/docs/glossaries/bad/#spoofed-macs",
    "source": "page",
    "sourceTitle": "Threat Behavior & Adversary Reference (the B.A.D. Glossary)"
  },
  {
    "acronym": "NCISS",
    "expansion": "National Cyber Incident Scoring System",
    "href": "/docs/risk/framework/#other-scoring-schemes",
    "source": "page",
    "sourceTitle": "The priority matrix"
  },
  {
    "acronym": "NDR",
    "expansion": "Network Detection and Response",
    "href": "/docs/glossaries/clear/#N",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "NGFW",
    "expansion": "Next-generation firewall",
    "href": "/docs/glossaries/cat/#fortinet-fortigate",
    "source": "page",
    "sourceTitle": "Security Tool & Platform Reference (the C.A.T. Glossary)"
  },
  {
    "acronym": "NHI",
    "expansion": "Non-Human Identity",
    "href": "/docs/glossaries/clear/#N",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "NITTF",
    "expansion": "National Insider Threat Task Force",
    "href": "/docs/subject/insider-analysis/",
    "source": "page",
    "sourceTitle": "Insider analysis"
  },
  {
    "acronym": "NLA",
    "expansion": "Network Level Authentication",
    "href": "/docs/exercises/",
    "source": "page",
    "sourceTitle": "Hands-on exercises"
  },
  {
    "acronym": "OCR",
    "expansion": "Office for Civil Rights",
    "href": "/docs/glossaries/clear/#O",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "OFAC",
    "expansion": "Office of Foreign Assets Control",
    "href": "/docs/escalation/protocols/",
    "source": "page",
    "sourceTitle": "Internal and external escalation protocols"
  },
  {
    "acronym": "OISF",
    "expansion": "Open Information Security Foundation",
    "href": "/docs/glossaries/cat/#suricata",
    "source": "page",
    "sourceTitle": "Security Tool & Platform Reference (the C.A.T. Glossary)"
  },
  {
    "acronym": "OT/ICS",
    "expansion": "operational technology and industrial control systems",
    "href": "/docs/scope/infrastructure/",
    "source": "page",
    "sourceTitle": "Infrastructure boundaries"
  },
  {
    "acronym": "OTRF",
    "expansion": "Open Threat Research Forge",
    "href": "/docs/glossaries/cat/#security-datasets-formerly-mordor",
    "source": "page",
    "sourceTitle": "Security Tool & Platform Reference (the C.A.T. Glossary)"
  },
  {
    "acronym": "OUI",
    "expansion": "Organizationally Unique Identifier",
    "href": "/docs/glossaries/clear/#O",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "P2P",
    "expansion": "Peer-to-Peer",
    "href": "/docs/glossaries/bad/#peer-to-peer-p2p-c2",
    "source": "page",
    "sourceTitle": "Threat Behavior & Adversary Reference (the B.A.D. Glossary)"
  },
  {
    "acronym": "PAM",
    "expansion": "Privileged Access Management",
    "href": "/docs/glossaries/clear/#P",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary",
    "firstUse": {
      "href": "/docs/subject/insider-analysis/",
      "title": "Insider analysis"
    }
  },
  {
    "acronym": "PAP",
    "expansion": "Permissible Actions Protocol",
    "href": "/docs/glossaries/clear/#P",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "PAT",
    "expansion": "Personal Access Token",
    "href": "/docs/glossaries/clear/#P",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "PFI",
    "expansion": "PCI Forensic Investigator",
    "href": "/docs/glossaries/clear/#P",
    "source": "page",
    "sourceTitle": "C.L.E.A.R. Glossary: core analyst vocabulary"
  },
  {
    "acronym": "PHI",
    "expansion": "Protected Health Information",
    "href": "/docs/glossaries/clear/#P",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary",
    "firstUse": {
      "href": "/docs/scope/regulatory/",
      "title": "Regulatory boundaries"
    }
  },
  {
    "acronym": "PII",
    "expansion": "Personally Identifiable Information",
    "href": "/docs/glossaries/clear/#P",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "PIR",
    "expansion": "post-incident review",
    "href": "/docs/documentation/#downstream-uses",
    "source": "page",
    "sourceTitle": "Documentation: Making the work durable"
  },
  {
    "acronym": "PKI",
    "expansion": "public key infrastructure",
    "href": "/docs/subject/insider-analysis/",
    "source": "page",
    "sourceTitle": "Insider analysis"
  },
  {
    "acronym": "PRT",
    "expansion": "Primary Refresh Token",
    "href": "/docs/glossaries/clear/#P",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "QA",
    "expansion": "quality assurance",
    "href": "/docs/adoption/",
    "source": "page",
    "sourceTitle": "Adopting ASSURED in your SOC",
    "firstUse": {
      "href": "/docs/teaching/",
      "title": "Teaching ASSURED"
    }
  },
  {
    "acronym": "RaaS",
    "expansion": "Ransomware-as-a-Service",
    "href": "/docs/glossaries/bad/#ransomware-as-a-service-raas",
    "source": "bad",
    "sourceTitle": "B.A.D. glossary"
  },
  {
    "acronym": "RAG",
    "expansion": "Retrieval-Augmented Generation",
    "href": "/docs/glossaries/clear/#R",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "RAT",
    "expansion": "Remote Access Trojan",
    "href": "/docs/glossaries/bad/#remote-access-trojan-rat",
    "source": "bad",
    "sourceTitle": "B.A.D. glossary"
  },
  {
    "acronym": "RBA",
    "expansion": "Risk-Based Alerting",
    "href": "/docs/glossaries/clear/#R",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary",
    "firstUse": {
      "href": "/docs/risk/framework/#other-scoring-schemes",
      "title": "The priority matrix"
    }
  },
  {
    "acronym": "RBAC",
    "expansion": "Role-Based Access Control",
    "href": "/docs/glossaries/clear/#R",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "RCA",
    "expansion": "Root cause analysis",
    "href": "/docs/glossaries/clear/#R",
    "source": "page",
    "sourceTitle": "C.L.E.A.R. Glossary: core analyst vocabulary"
  },
  {
    "acronym": "RCE",
    "expansion": "remote code execution",
    "href": "/docs/glossaries/bad/#log4shell",
    "source": "page",
    "sourceTitle": "Threat Behavior & Adversary Reference (the B.A.D. Glossary)"
  },
  {
    "acronym": "RDP",
    "expansion": "Remote Desktop Protocol",
    "href": "/docs/exercises/",
    "source": "page",
    "sourceTitle": "Hands-on exercises"
  },
  {
    "acronym": "RFC",
    "expansion": "Request for Comments",
    "href": "/docs/glossaries/clear/#R",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "RLO",
    "expansion": "Right-to-Left Override",
    "href": "/docs/glossaries/bad/#right-to-left-override",
    "source": "bad",
    "sourceTitle": "B.A.D. glossary"
  },
  {
    "acronym": "RPA",
    "expansion": "robotic process automation",
    "href": "/docs/exercises/",
    "source": "page",
    "sourceTitle": "Hands-on exercises"
  },
  {
    "acronym": "RPO",
    "expansion": "recovery point objectives",
    "href": "/docs/risk/impact-likelihood/",
    "source": "page",
    "sourceTitle": "Impact and likelihood"
  },
  {
    "acronym": "RTO",
    "expansion": "Recovery time objectives",
    "href": "/docs/risk/impact-likelihood/",
    "source": "page",
    "sourceTitle": "Impact and likelihood"
  },
  {
    "acronym": "SCADA",
    "expansion": "supervisory control and data acquisition",
    "href": "/docs/glossaries/bad/#xz-utils-backdoor",
    "source": "page",
    "sourceTitle": "Threat Behavior & Adversary Reference (the B.A.D. Glossary)"
  },
  {
    "acronym": "SCC",
    "expansion": "Standard Contractual Clauses",
    "href": "/docs/glossaries/clear/#S",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "SEC",
    "expansion": "Securities and Exchange Commission",
    "href": "/docs/escalation/criteria/#high-impact",
    "source": "page",
    "sourceTitle": "Close or escalate: the criteria"
  },
  {
    "acronym": "SEG",
    "expansion": "Secure Email Gateways",
    "href": "/docs/glossaries/clear/#S",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary",
    "firstUse": {
      "href": "/docs/field-reference/telemetry-sources/",
      "title": "Telemetry sources"
    }
  },
  {
    "acronym": "SHA",
    "expansion": "Secure Hash Algorithm",
    "href": "/docs/glossaries/clear/#S",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "SIEM",
    "expansion": "Security Information and Event Management",
    "href": "/docs/glossaries/clear/#S",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary",
    "firstUse": {
      "href": "/docs/field-reference/tool-families/",
      "title": "Tool families"
    }
  },
  {
    "acronym": "SITM",
    "expansion": "Security Incident Timing Metrics",
    "href": "/docs/glossaries/clear/#S",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary",
    "firstUse": {
      "href": "/docs/measuring-triage/",
      "title": "Measuring triage"
    }
  },
  {
    "acronym": "SLA",
    "expansion": "service-level agreement",
    "href": "/docs/escalation/protocols/",
    "source": "page",
    "sourceTitle": "Internal and external escalation protocols"
  },
  {
    "acronym": "SMB",
    "expansion": "Server Message Block",
    "href": "/docs/glossaries/clear/#S",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "SOAR",
    "expansion": "Security Orchestration, Automation, and Response",
    "href": "/docs/glossaries/clear/#S",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "SOC",
    "expansion": "Security Operations Center",
    "href": "/docs/glossaries/clear/#S",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary",
    "firstUse": {
      "href": "/docs/intro/",
      "title": "Introduction to the ASSURED methodology"
    }
  },
  {
    "acronym": "SOP",
    "expansion": "standard operating procedure",
    "href": "/docs/adoption/",
    "source": "page",
    "sourceTitle": "Adopting ASSURED in your SOC"
  },
  {
    "acronym": "SPF",
    "expansion": "Sender Policy Framework",
    "href": "/docs/glossaries/clear/#S",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "SQLi",
    "expansion": "SQL injection",
    "href": "/docs/glossaries/cat/#acunetix",
    "source": "page",
    "sourceTitle": "Security Tool & Platform Reference (the C.A.T. Glossary)"
  },
  {
    "acronym": "SSE",
    "expansion": "security service edge",
    "href": "/docs/glossaries/cat/",
    "source": "page",
    "sourceTitle": "Security Tool & Platform Reference (the C.A.T. Glossary)"
  },
  {
    "acronym": "SSH",
    "expansion": "Secure Shell",
    "href": "/docs/glossaries/clear/#S",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "SSL",
    "expansion": "Secure Sockets Layer",
    "href": "/docs/glossaries/clear/#S",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "SSO",
    "expansion": "Single Sign-On",
    "href": "/docs/glossaries/clear/#S",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "SSVC",
    "expansion": "Stakeholder-Specific Vulnerability Categorization",
    "href": "/docs/glossaries/clear/#S",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary",
    "firstUse": {
      "href": "/docs/risk/framework/#other-scoring-schemes",
      "title": "The priority matrix"
    }
  },
  {
    "acronym": "TGT",
    "expansion": "Ticket Granting Ticket",
    "href": "/docs/alert/parsing/cloud-identity/",
    "source": "page",
    "sourceTitle": "Cloud and identity logs"
  },
  {
    "acronym": "TIP",
    "expansion": "threat intelligence platform",
    "href": "/docs/field-reference/tool-families/#ti",
    "source": "page",
    "sourceTitle": "Tool families"
  },
  {
    "acronym": "TLP",
    "expansion": "Traffic Light Protocol",
    "href": "/docs/glossaries/clear/#T",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "TLS",
    "expansion": "Transport Layer Security",
    "href": "/docs/glossaries/clear/#T",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "TTL",
    "expansion": "Time To Live",
    "href": "/docs/glossaries/clear/#T",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "TTP",
    "expansion": "Tactics, Techniques, and Procedures",
    "href": "/docs/glossaries/clear/#T",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary",
    "firstUse": {
      "href": "/docs/alert/detection-mechanisms/",
      "title": "How detections work"
    }
  },
  {
    "acronym": "UEBA",
    "expansion": "User and Entity Behavior Analytics",
    "href": "/docs/glossaries/clear/#U",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary",
    "firstUse": {
      "href": "/docs/subject/insider-analysis/",
      "title": "Insider analysis"
    }
  },
  {
    "acronym": "UEM",
    "expansion": "Unified Endpoint Management",
    "href": "/docs/glossaries/clear/#U",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "URL",
    "expansion": "Uniform Resource Locator",
    "href": "/docs/glossaries/clear/#U",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "USN",
    "expansion": "Update Sequence Number",
    "href": "/docs/glossaries/bad/#user-agent-spoofing",
    "source": "page",
    "sourceTitle": "Threat Behavior & Adversary Reference (the B.A.D. Glossary)"
  },
  {
    "acronym": "VDI",
    "expansion": "Virtual Desktop Infrastructure",
    "href": "/docs/glossaries/clear/#V",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "VDP",
    "expansion": "Vulnerability Disclosure Program",
    "href": "/docs/glossaries/clear/#V",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "VPN",
    "expansion": "Virtual Private Network",
    "href": "/docs/glossaries/clear/#V",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  },
  {
    "acronym": "WCAG",
    "expansion": "Web Content Accessibility Guidelines",
    "href": "/docs/about/accessibility/",
    "source": "page",
    "sourceTitle": "Accessibility"
  },
  {
    "acronym": "WORM",
    "expansion": "Write Once, Read Many",
    "href": "/docs/glossaries/clear/#W",
    "source": "page",
    "sourceTitle": "C.L.E.A.R. Glossary: core analyst vocabulary"
  },
  {
    "acronym": "ZDR",
    "expansion": "Zero Data Retention",
    "href": "/docs/glossaries/clear/#Z",
    "source": "clear",
    "sourceTitle": "C.L.E.A.R. glossary"
  }
];

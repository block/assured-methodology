/**
 * Auto-generated glossary registry.
 * Sources: bad.mdx, cat.mdx, clear.mdx. Extracted via scripts/extract-glossary.mjs.
 * Edit the source MDX files, then run `node scripts/extract-glossary.mjs`.
 */

export interface GlossaryEntry {
  term: string;
  definition: string;
  source:
    | "clear"
    | "bad-term"
    | "bad-actor"
    | "bad-campaign"
    | "bad-family"
    | "bad-feature"
    | "cat-tool";
}

export const glossary: Record<string, GlossaryEntry> = {
  "AI/ML (Artificial Intelligence / Machine Learning)": {
    "term": "AI/ML (Artificial Intelligence / Machine Learning)",
    "definition": "Technologies that enable systems to learn from and make decisions based on data, used in security for threat detection, pattern recognition, and automated response.",
    "source": "clear"
  },
  "APT10 Cloud Hopper": {
    "term": "APT10 Cloud Hopper",
    "definition": "Chinese state-sponsored group associated with global IP theft. Their Cloud Hopper campaign targeted managed service providers (MSPs) to compromise downstream customers. Focus: healthcare, defense, aerospace, tech. Uses RedLeaves, custom loaders, spear-phishing, credential theft, and cloud-service abuse aligned with China's economic and military goals.",
    "source": "bad-actor"
  },
  "APT28 Fancy Bear / GRU": {
    "term": "APT28 Fancy Bear / GRU",
    "definition": "Linked to Russia's GRU and known for aggressive operations. Credential harvesting, malware deployment, destructive attacks against political and military targets. Tied to the 2016 DNC breach and many NATO-related campaigns. Leverages zero-days and weaponized Office documents. Noisier and more direct than APT29; a primary actor in Russian hybrid warfare.",
    "source": "bad-actor"
  },
  "APT29 Cozy Bear / SVR": {
    "term": "APT29 Cozy Bear / SVR",
    "definition": "Sophisticated espionage group associated with Russia's SVR. Stealth and long-term access. Targets governments, think tanks, healthcare, vaccine researchers. One of the groups behind SolarWinds (UNC2452). Custom malware, living-off-the-land, well-crafted spear-phishing. Operations often go undetected for months. Modular tooling, adaptive infrastructure.",
    "source": "bad-actor"
  },
  "APT33 Iran / aviation + energy": {
    "term": "APT33 Iran / aviation + energy",
    "definition": "Iranian government-linked group targeting aerospace, energy, and critical infrastructure. Mixes espionage with destructive operations including Shamoon wiper variants. Phishing campaigns tied to fake aviation job postings. Represents Iran's evolving cyber capability and willingness to engage in hybrid warfare.",
    "source": "bad-actor"
  },
  "ASSURED Methodology": {
    "term": "ASSURED Methodology",
    "definition": "A structured approach to event triage in security operations, comprising seven phases: Alert, Subject, Scope, Uncover, Risk, Escalation, and Documentation.",
    "source": "clear"
  },
  "AWS CloudTrail": {
    "term": "AWS CloudTrail",
    "definition": "Records and logs API activity within an AWS account, the audit trail for security and forensic work.",
    "source": "cat-tool"
  },
  "AWS CloudWatch": {
    "term": "AWS CloudWatch",
    "definition": "Monitoring and observability for AWS resources and applications; metrics, logs, alarms, automation hooks.",
    "source": "cat-tool"
  },
  "Abuse.ch": {
    "term": "Abuse.ch",
    "definition": "Community-driven malware infrastructure tracking; free public feeds for malicious IPs, domains, and hashes. Strong on ransomware family tracking.",
    "source": "cat-tool"
  },
  "Access Control": {
    "term": "Access Control",
    "definition": "Rules and procedures that regulate who can access certain systems, data, or resources.",
    "source": "clear"
  },
  "Access Pattern": {
    "term": "Access Pattern",
    "definition": "The way a user or system interacts with resources, such as login times, frequency of access, and volume of data transferred.",
    "source": "clear"
  },
  "Account Enumeration": {
    "term": "Account Enumeration",
    "definition": "Discovering valid usernames or accounts by analyzing system responses during login attempts or other interactions.",
    "source": "bad-term"
  },
  "Account Takeover": {
    "term": "Account Takeover",
    "definition": "Adversary gains unauthorized control of a user's account using stolen credentials or session tokens to impersonate the user.",
    "source": "bad-term"
  },
  "Acronis Cyber Backup": {
    "term": "Acronis Cyber Backup",
    "definition": "Backup with integrated anti-malware; blockchain-based notarization and broad workload coverage.",
    "source": "cat-tool"
  },
  "Acunetix": {
    "term": "Acunetix",
    "definition": "Automated web vulnerability scanner for SQLi, XSS, misconfig, and modern-web/SPA technologies.",
    "source": "cat-tool"
  },
  "Advanced Persistent Threat (APT)": {
    "term": "Advanced Persistent Threat (APT)",
    "definition": "A prolonged, covert cyberattack by a skilled adversary, often state-sponsored, that gains and maintains unauthorized access to a network.",
    "source": "bad-term"
  },
  "Advanced Persistent Threats (APTs)": {
    "term": "Advanced Persistent Threats (APTs)",
    "definition": "Sophisticated cyber attackers, often state-sponsored, who gain and maintain unauthorized access to networks for extended periods while avoiding detection.",
    "source": "clear"
  },
  "Adware": {
    "term": "Adware",
    "definition": "Malware that displays unwanted advertisements, often bundled with legitimate software. Advanced adware can harvest data or serve as a delivery mechanism for more serious malware.",
    "source": "bad-term"
  },
  "Alert": {
    "term": "Alert",
    "definition": "An automated notification produced when detection logic decides an event might be malicious, anomalous, or in violation of policy. The detection engine's hypothesis, not a verdict; the analyst makes the call.",
    "source": "clear"
  },
  "Alert De-duplication": {
    "term": "Alert De-duplication",
    "definition": "The process of consolidating multiple identical or related alerts into a single notification to reduce noise and improve analyst efficiency.",
    "source": "clear"
  },
  "Alert Fatigue": {
    "term": "Alert Fatigue",
    "definition": "The desensitization of security analysts to alerts due to high volumes of notifications, potentially leading to missed critical threats.",
    "source": "clear"
  },
  "Alert Parsing": {
    "term": "Alert Parsing",
    "definition": "The systematic process of breaking down and analyzing the components of a security alert to understand its technical details and significance.",
    "source": "clear"
  },
  "Alert Validation": {
    "term": "Alert Validation",
    "definition": "The step where an alert is examined and confirmed as legitimate or false-positive before initiating further investigation or response.",
    "source": "clear"
  },
  "AlienVault OTX": {
    "term": "AlienVault OTX",
    "definition": "Collaborative threat-intel exchange aggregating IOCs from a global community, with SIEM/automated integrations.",
    "source": "cat-tool"
  },
  "Analyst Burnout": {
    "term": "Analyst Burnout",
    "definition": "Physical and mental exhaustion experienced by security analysts due to high-stress environments, constant alert monitoring, and pressure to maintain security.",
    "source": "clear"
  },
  "Anomali ThreatStream": {
    "term": "Anomali ThreatStream",
    "definition": "Collects, analyzes, and prioritizes threat data with enrichment and risk scoring; integrates with existing security stacks.",
    "source": "cat-tool"
  },
  "Anomaly": {
    "term": "Anomaly",
    "definition": "An observation that deviates from an established baseline. Anomalies are statistical, not malicious; an analyst still has to decide whether the deviation matters.",
    "source": "clear"
  },
  "Anomaly-Based Detection": {
    "term": "Anomaly-Based Detection",
    "definition": "A security detection method that identifies suspicious activity by comparing current behavior against established baselines of normal activity.",
    "source": "clear"
  },
  "Ansible": {
    "term": "Ansible",
    "definition": "Open-source automation for config management, deployment, and orchestration via YAML playbooks.",
    "source": "cat-tool"
  },
  "Ansible Tower": {
    "term": "Ansible Tower",
    "definition": "Web-based interface for Ansible automation; RBAC, scheduling, visual dashboards, workflow orchestration.",
    "source": "cat-tool"
  },
  "Any.Run": {
    "term": "Any.Run",
    "definition": "Interactive malware sandbox with behavioral and network analysis for collaborative investigation.",
    "source": "cat-tool"
  },
  "Application Programming Interface (API)": {
    "term": "Application Programming Interface (API)",
    "definition": "A set of rules and protocols that allows different software systems to communicate with each other.",
    "source": "clear"
  },
  "Application Shimming": {
    "term": "Application Shimming",
    "definition": "Abuses Windows Application Compatibility Infrastructure (shims) to inject malicious code or maintain persistence.",
    "source": "bad-term"
  },
  "Application-Layer Protocol": {
    "term": "Application-Layer Protocol",
    "definition": "Network protocols that operate at Layer 7 of the OSI model, dealing with application-specific communication (HTTP, SMTP, DNS).",
    "source": "clear"
  },
  "Arbitrary Commands": {
    "term": "Arbitrary Commands",
    "definition": "Unauthorized commands that an attacker can execute on a compromised system, often with the same privileges as the compromised application.",
    "source": "clear"
  },
  "ArcSight": {
    "term": "ArcSight",
    "definition": "Long-standing SIEM with strong correlation engine for compliance reporting and forensic analysis.",
    "source": "cat-tool"
  },
  "Arcserve UDP": {
    "term": "Arcserve UDP",
    "definition": "Unified data protection with replication, HA, and ransomware-resistant immutable storage.",
    "source": "cat-tool"
  },
  "Artifacts": {
    "term": "Artifacts",
    "definition": "Digital evidence or traces left behind by system activity or security incidents, used in forensic analysis and incident investigation.",
    "source": "clear"
  },
  "Asset": {
    "term": "Asset",
    "definition": "Something the organization owns, depends on, or is accountable for: data, a system, an identity, a credential, or a service. An asset's criticality is what turns a generic alert into a prioritized one.",
    "source": "clear"
  },
  "Asset Criticality": {
    "term": "Asset Criticality",
    "definition": "The level of importance or sensitivity of an asset, which determines the level of protection it requires.",
    "source": "clear"
  },
  "Asset Role": {
    "term": "Asset Role",
    "definition": "The defined function or purpose of an asset within an organization, helping prioritize its security importance.",
    "source": "clear"
  },
  "Attack Chain": {
    "term": "Attack Chain",
    "definition": "The ordered sequence of steps an attacker takes from initial access through their objective. Useful as a framework (Lockheed Martin's Kill Chain, MITRE ATT&CK's tactics) because it lets defenders intervene at any link, not only the first.",
    "source": "clear"
  },
  "Attack Patterns": {
    "term": "Attack Patterns",
    "definition": "Common techniques or behaviors used by attackers that help in recognizing and defending against threats.",
    "source": "clear"
  },
  "Attack Vector": {
    "term": "Attack Vector",
    "definition": "The entry point an attacker uses to reach a target: a phishing email, an exposed RDP port, a third-party vendor with trusted access, a misconfigured cloud bucket. Each vector implies a different control to harden.",
    "source": "clear"
  },
  "Attribute-Based Access Control (ABAC)": {
    "term": "Attribute-Based Access Control (ABAC)",
    "definition": "Restricts access based on user attributes, environment conditions, and resource characteristics to enforce fine-grained security policies.",
    "source": "clear"
  },
  "Authentication": {
    "term": "Authentication",
    "definition": "Proving who you are to a system: a password, a hardware token, a biometric, a certificate. Distinct from authorization, which is what that identity is then allowed to do.",
    "source": "clear"
  },
  "Authorization": {
    "term": "Authorization",
    "definition": "The process of granting or denying access to resources based on a user's or system's identity and permissions.",
    "source": "clear"
  },
  "Automation": {
    "term": "Automation",
    "definition": "The use of technology to perform security tasks with minimal human intervention, including alert triage, incident response, and threat hunting.",
    "source": "clear"
  },
  "Autonomous System Number (ASN)": {
    "term": "Autonomous System Number (ASN)",
    "definition": "A unique identifier assigned to an internet network used for routing traffic between networks.",
    "source": "clear"
  },
  "Autopsy": {
    "term": "Autopsy",
    "definition": "Open-source forensics platform on The Sleuth Kit; timeline analysis, keyword search, file carving, media analysis.",
    "source": "cat-tool"
  },
  "Avigilon": {
    "term": "Avigilon",
    "definition": "HD surveillance, video analytics, and access control with AI-powered anomaly detection.",
    "source": "cat-tool"
  },
  "Axis Communications": {
    "term": "Axis Communications",
    "definition": "Pioneer of network video surveillance; broad IP-camera portfolio with edge analytics.",
    "source": "cat-tool"
  },
  "Azure AD (Entra ID)": {
    "term": "Azure AD (Entra ID)",
    "definition": "Microsoft's cloud identity and access management; SSO, MFA, conditional access, and integration with SaaS apps.",
    "source": "cat-tool"
  },
  "Azure Sentinel UEBA": {
    "term": "Azure Sentinel UEBA",
    "definition": "Behavior analytics layered onto Microsoft Sentinel for detecting insider threats and anomalous activity.",
    "source": "cat-tool"
  },
  "BITSAdmin": {
    "term": "BITSAdmin",
    "definition": "A command-line tool for managing Background Intelligent Transfer Service (BITS), often monitored for abuse by attackers.",
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
  "Banking Droppers (Loaders)": {
    "term": "Banking Droppers (Loaders)",
    "definition": "Lightweight malware designed solely to download and execute a more substantial payload, often a banking trojan or ransomware. Examples include Emotet, ZLoader, Smoke Loader.",
    "source": "bad-term"
  },
  "Base64 Encoding": {
    "term": "Base64 Encoding",
    "definition": "A binary-to-text encoding scheme used to represent binary data using a set of 64 characters, often used by malware to obfuscate payloads or communications.",
    "source": "clear"
  },
  "Baselining": {
    "term": "Baselining",
    "definition": "The process of documenting and measuring normal system behavior over time to identify deviations that might indicate security issues.",
    "source": "clear"
  },
  "Beaconing": {
    "term": "Beaconing",
    "definition": "Periodic network communication from an infected host to a C2 server.",
    "source": "bad-term"
  },
  "Behavior Analytics": {
    "term": "Behavior Analytics",
    "definition": "The process of collecting and analyzing user and system behavior patterns to identify potential security threats or anomalies.",
    "source": "clear"
  },
  "Behavioral Drift": {
    "term": "Behavioral Drift",
    "definition": "Gradual changes in normal behavior patterns that may complicate detection of anomalies.",
    "source": "clear"
  },
  "Belkasoft Evidence Center X": {
    "term": "Belkasoft Evidence Center X",
    "definition": "DFIR tool focused on memory, disk, mobile, and cloud forensics; parses encrypted containers and RAM dumps.",
    "source": "cat-tool"
  },
  "BeyondTrust": {
    "term": "BeyondTrust",
    "definition": "Privileged access management; just-in-time access, password vaulting, session monitoring, endpoint privilege management.",
    "source": "cat-tool"
  },
  "BigFix (IBM)": {
    "term": "BigFix (IBM)",
    "definition": "Endpoint management platform automating patching, compliance, and security configuration at scale.",
    "source": "cat-tool"
  },
  "Binary Obfuscation": {
    "term": "Binary Obfuscation",
    "definition": "Code is deliberately scrambled, encrypted, or disguised to make analysis harder and evade static analysis engines.",
    "source": "bad-term"
  },
  "Binary Padding": {
    "term": "Binary Padding",
    "definition": "Adds non-functional data or junk code to malware files to change their hash and avoid signature-based detection.",
    "source": "bad-term"
  },
  "Biometric Verification": {
    "term": "Biometric Verification",
    "definition": "Authentication method that uses unique biological characteristics like fingerprints or facial recognition.",
    "source": "clear"
  },
  "Bitdefender GravityZone": {
    "term": "Bitdefender GravityZone",
    "definition": "EDR with behavior analysis, anti-exploit, root-cause analysis, and policy-based remediation.",
    "source": "cat-tool"
  },
  "BlackCat / ALPHV": {
    "term": "BlackCat / ALPHV",
    "definition": "Sophisticated ransomware-as-a-service operation, one of the first to use Rust, making detection and analysis harder. Highly customizable Windows / Linux payloads, double-extortion with leak-site shaming. Successor to BlackMatter / REvil. Aggressive targeting of critical infrastructure and high-profile enterprises.",
    "source": "bad-family"
  },
  "Blockchain": {
    "term": "Blockchain",
    "definition": "A distributed ledger technology that maintains a secure, decentralized record of transactions, introducing new security considerations for digital assets and smart contracts.",
    "source": "clear"
  },
  "BlueKeep (CVE-2019-0708)": {
    "term": "BlueKeep (CVE-2019-0708)",
    "definition": "Critical RDP vulnerability allowing remote code execution without authentication. Affects older Windows. \"Wormable\", could self-propagate like WannaCry. Microsoft issued an emergency patch. Highlighted the danger of exposing RDP directly to the internet.",
    "source": "bad-term"
  },
  "Bootkits": {
    "term": "Bootkits",
    "definition": "Highly persistent malware that infects the bootloader or Master Boot Record to gain control before the OS loads. Difficult to detect or remove since they operate beneath the operating system.",
    "source": "bad-term"
  },
  "Border Gateway Protocol (BGP)": {
    "term": "Border Gateway Protocol (BGP)",
    "definition": "The protocol managing how packets are routed across the internet between autonomous systems.",
    "source": "clear"
  },
  "Bosch Security Systems": {
    "term": "Bosch Security Systems",
    "definition": "Surveillance, intrusion detection, access, and fire across enterprise and critical-infrastructure deployments.",
    "source": "cat-tool"
  },
  "Botnet": {
    "term": "Botnet",
    "definition": "Many infected machines (bots) coordinating to a central controller. The rhythm of regular check-ins is what defenders look for. DDoS, credential stuffing, spam, and proxy abuse all ride on this primitive. Modern botnets span PCs, servers, routers, and IoT.",
    "source": "bad-feature"
  },
  "Botnets": {
    "term": "Botnets",
    "definition": "A network of infected machines (bots) controlled by a central attacker, used for DDoS, spam, credential stuffing, and more.",
    "source": "bad-term"
  },
  "Bring Your Own Device (BYOD)": {
    "term": "Bring Your Own Device (BYOD)",
    "definition": "A policy allowing employees to use personal devices for work, which introduces unique security challenges.",
    "source": "clear"
  },
  "Brute Force": {
    "term": "Brute Force",
    "definition": "Systematically attempts many password combinations against accounts or services until successful authentication.",
    "source": "bad-term"
  },
  "BulletProof Hosting": {
    "term": "BulletProof Hosting",
    "definition": "Hosting services known for ignoring abuse complaints and allowing malicious activities to operate with minimal risk of takedown.",
    "source": "bad-term"
  },
  "Burp Suite": {
    "term": "Burp Suite",
    "definition": "Industry-leading web app security tooling: intercepting proxy, scanning, manual pentest tools, and extensions.",
    "source": "cat-tool"
  },
  "Business Continuity": {
    "term": "Business Continuity",
    "definition": "The ability of an organization to continue operating and providing services despite disruptions or disasters.",
    "source": "clear"
  },
  "Byte Sequence": {
    "term": "Byte Sequence",
    "definition": "An ordered set of bytes in memory or data streams, often analyzed in malware detection or forensics.",
    "source": "clear"
  },
  "CIA Triad": {
    "term": "CIA Triad",
    "definition": "Core principles of information security: Confidentiality, Integrity, and Availability.",
    "source": "clear"
  },
  "CISA Advisories": {
    "term": "CISA Advisories",
    "definition": "U.S. Cybersecurity and Infrastructure Security Agency advisories on vulnerabilities and active threats, with mitigation guidance.",
    "source": "cat-tool"
  },
  "COM Hijacking": {
    "term": "COM Hijacking",
    "definition": "A persistence technique that abuses Windows Component Object Model (COM) registry entries to hijack the execution flow of legitimate applications.",
    "source": "bad-term"
  },
  "California Consumer Privacy Act (CCPA)": {
    "term": "California Consumer Privacy Act (CCPA)",
    "definition": "A law that regulates the collection, use, and protection of personal data in California.",
    "source": "clear"
  },
  "Callback Domain Rotation": {
    "term": "Callback Domain Rotation",
    "definition": "Switches out C2 domains regularly to avoid blacklisting and detection.",
    "source": "bad-term"
  },
  "Cambridge Analytica": {
    "term": "Cambridge Analytica",
    "definition": "Political consulting firm that improperly harvested data from 87 million Facebook users. Psychological profiling and micro-targeted ads aimed at influencing the 2016 U.S. election and Brexit. Not a traditional cyberattack, but exposed serious flaws in data privacy and third-party app oversight. Triggered global debate about surveillance capitalism and election interference; GDPR enforcement followed.",
    "source": "bad-campaign"
  },
  "Canary (Thinkst)": {
    "term": "Canary (Thinkst)",
    "definition": "Deception platform deploying low-interaction honeypots that produce high-fidelity alerts on attacker interaction.",
    "source": "cat-tool"
  },
  "Carbonite": {
    "term": "Carbonite",
    "definition": "Cloud-based backup and DR for SMBs; encrypted transmission, hybrid backup, ransomware features.",
    "source": "cat-tool"
  },
  "Cardholder Data Environment (CDE)": {
    "term": "Cardholder Data Environment (CDE)",
    "definition": "Systems and networks that store, process, or transmit payment card data and must comply with PCI DSS requirements.",
    "source": "clear"
  },
  "Cellebrite": {
    "term": "Cellebrite",
    "definition": "Industry standard for mobile-device extraction and analysis; UFED covers a wide range of devices.",
    "source": "cat-tool"
  },
  "Censys": {
    "term": "Censys",
    "definition": "Internet-wide asset discovery via continuous scanning; SSL/TLS, services, and attack-surface monitoring.",
    "source": "cat-tool"
  },
  "Charming Kitten APT35 / Phosphorus": {
    "term": "Charming Kitten APT35 / Phosphorus",
    "definition": "Iranian group conducting espionage against academics, human rights activists, and government entities. Phishing, fake social personas, credential harvesting. Known for impersonating journalists and think tanks. Supports Iran's strategic interests in surveillance and foreign intelligence collection. Active for over a decade.",
    "source": "bad-actor"
  },
  "Chef": {
    "term": "Chef",
    "definition": "Infrastructure-as-code platform enforcing security configurations via recipes and cookbooks.",
    "source": "cat-tool"
  },
  "Chronicle": {
    "term": "Chronicle",
    "definition": "Cloud-native security analytics platform from Google Cloud; high-speed search and threat detection at petabyte scale.",
    "source": "cat-tool"
  },
  "Cisco Physical Security": {
    "term": "Cisco Physical Security",
    "definition": "Converged networking-plus-security platform unifying surveillance, access, and IoT device management.",
    "source": "cat-tool"
  },
  "Cisco Umbrella": {
    "term": "Cisco Umbrella",
    "definition": "Cloud-delivered DNS-layer security; blocks malicious domains at resolution time, secures outbound web traffic.",
    "source": "cat-tool"
  },
  "Cl0p MOVEit / mass exploitation": {
    "term": "Cl0p MOVEit / mass exploitation",
    "definition": "Russian-speaking extortion group (TA505-adjacent) that industrialized mass exploitation of file-transfer software: Accellion FTA (2021), GoAnywhere (2023), and MOVEit Transfer (2023), which alone touched 2,700+ organizations. Skips encryption in favor of pure data-theft extortion at scale. A defining example of one zero-day monetized across thousands of victims simultaneously.",
    "source": "bad-actor"
  },
  "Click Fraud Malware": {
    "term": "Click Fraud Malware",
    "definition": "Malware that simulates user clicks on advertisements to generate fraudulent revenue. Often run on compromised systems in large volumes to exploit pay-per-click ad platforms.",
    "source": "bad-term"
  },
  "Cloud Hopper": {
    "term": "Cloud Hopper",
    "definition": "Widespread espionage campaign by China's APT10 targeting MSPs globally. Compromising MSPs gave attackers stealthy access to customer networks across aerospace, finance, manufacturing, and healthcare. Credential theft, custom malware, and RATs. Victims often unaware due to the trusted MSP position. A textbook example of supply-chain compromise for espionage.",
    "source": "bad-campaign"
  },
  "Cloud Security Posture Management (CSPM)": {
    "term": "Cloud Security Posture Management (CSPM)",
    "definition": "Tools and processes that continuously monitor cloud infrastructure for misconfigurations, compliance violations, and security risks.",
    "source": "clear"
  },
  "Cloudflare Cloudforce One": {
    "term": "Cloudflare Cloudforce One",
    "definition": "Cloudflare's threat-research team and intelligence service; produces actionable indicators, campaign tracking, and disruption support against active adversaries.",
    "source": "cat-tool"
  },
  "Cobalt Strike": {
    "term": "Cobalt Strike",
    "definition": "Legitimate post-exploitation tool widely abused for C2, lateral movement, and credential harvesting. Beaconing, fileless injection, encrypted comms. Pirated and cracked versions used by APTs, ransomware gangs, and commodity malware. Frequently paired with TrickBot or BazarLoader to coordinate ransomware deployment.",
    "source": "bad-family"
  },
  "Code Injection": {
    "term": "Code Injection",
    "definition": "Inserting malicious code into a vulnerable application to execute arbitrary commands or manipulate program behavior.",
    "source": "bad-term"
  },
  "Code42 Incydr (now Mimecast)": {
    "term": "Code42 Incydr (now Mimecast)",
    "definition": "Cloud-native endpoint data protection focused on insider risk and self-service restore. Code42 acquired by Mimecast, July 2024; Incydr folded into the Mimecast platform.",
    "source": "cat-tool"
  },
  "Colonial Pipeline": {
    "term": "Colonial Pipeline",
    "definition": "May 2021 ransomware incident attributed to DarkSide that hit the IT systems of one of the largest fuel pipeline operators in the U.S. The company preemptively shut down operations, causing East Coast shortages. Initial access via a compromised VPN password. $4.4M ransom paid; partly recovered by the U.S. government. Spurred new cybersecurity mandates for pipeline operators.",
    "source": "bad-campaign"
  },
  "Command Line": {
    "term": "Command Line",
    "definition": "In SOC analysis, the argument string a process was launched with. Often the load-bearing forensic field on an EDR alert because it reveals what the process was actually told to do.",
    "source": "clear"
  },
  "Command Line Analysis": {
    "term": "Command Line Analysis",
    "definition": "The examination of command-line parameters, arguments, and execution context to understand process behavior and intent.",
    "source": "clear"
  },
  "Command and Control (C2)": {
    "term": "Command and Control (C2)",
    "definition": "Infrastructure used by attackers to communicate with and control compromised systems within a target network.",
    "source": "clear"
  },
  "Command and Scripting Interpreter": {
    "term": "Command and Scripting Interpreter",
    "definition": "Using legitimate command-line shells or scripting environments (PowerShell, cmd.exe) to execute commands, often to evade detection.",
    "source": "bad-term"
  },
  "Command-Line Obfuscation": {
    "term": "Command-Line Obfuscation",
    "definition": "Malicious commands hidden using encoding (Base64), string concatenation, or misleading syntax to bypass command-line monitoring.",
    "source": "bad-term"
  },
  "Common Event Format (CEF)": {
    "term": "Common Event Format (CEF)",
    "definition": "A standardized log format designed to simplify event management across security devices and systems.",
    "source": "clear"
  },
  "Common Vulnerability Scoring System (CVSS)": {
    "term": "Common Vulnerability Scoring System (CVSS)",
    "definition": "A standardized way to assess the severity of security vulnerabilities.",
    "source": "clear"
  },
  "Commvault": {
    "term": "Commvault",
    "definition": "Unified data management; backup, archive, governance, and SaaS-app protection with AI analytics.",
    "source": "cat-tool"
  },
  "Commvault ThreatWise (formerly TrapX)": {
    "term": "Commvault ThreatWise (formerly TrapX)",
    "definition": "Deception and threat detection with decoys across endpoints, networks, and cloud. TrapX Security acquired by Commvault, 2022; rebranded as ThreatWise.",
    "source": "cat-tool"
  },
  "Compliance": {
    "term": "Compliance",
    "definition": "Adherence to regulatory requirements, industry standards, and security frameworks that govern data protection and system security.",
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
  "Concatenation": {
    "term": "Concatenation",
    "definition": "The process of combining multiple strings or commands, often used by attackers to bypass security controls or obfuscate malicious code.",
    "source": "clear"
  },
  "Conditional Logic": {
    "term": "Conditional Logic",
    "definition": "Programming or rule-based logic that executes actions based on specific conditions or criteria.",
    "source": "clear"
  },
  "Configuration Management": {
    "term": "Configuration Management",
    "definition": "The process of tracking and controlling changes to systems, networks, and applications.",
    "source": "clear"
  },
  "Configuration Management Database (CMDB)": {
    "term": "Configuration Management Database (CMDB)",
    "definition": "Repositories that store information about IT assets and their relationships to support change and incident management.",
    "source": "clear"
  },
  "Container Orchestration": {
    "term": "Container Orchestration",
    "definition": "Automated management, scaling, and deployment of containerized applications using platforms like Kubernetes.",
    "source": "clear"
  },
  "Containers": {
    "term": "Containers",
    "definition": "Lightweight, standalone packages that include everything needed to run a piece of software, introducing unique security challenges in orchestration and isolation.",
    "source": "clear"
  },
  "Containment": {
    "term": "Containment",
    "definition": "The incident-response phase between detection and eradication: isolate the affected hosts, revoke the compromised credentials, block the C2 destinations, freeze the situation so it stops getting worse while the investigation continues.",
    "source": "clear"
  },
  "Conti": {
    "term": "Conti",
    "definition": "One of the most prolific ransomware groups before disbanding in 2022. Centralized structure, professional affiliate model, human-operated intrusions. Used Cobalt Strike and TrickBot for movement. Internal chat-log leaks in 2022 exposed structure, operations, and finances. Many former members moved to BlackCat or Royal.",
    "source": "bad-family"
  },
  "Cortex XSOAR (Palo Alto)": {
    "term": "Cortex XSOAR (Palo Alto)",
    "definition": "Comprehensive SOAR with case management, threat intel, playbook-driven automation, and hundreds of integrations.",
    "source": "cat-tool"
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
    "definition": "Stealing login information through phishing, malware, or system exploitation.",
    "source": "bad-term"
  },
  "Cribl": {
    "term": "Cribl",
    "definition": "Data routing and processing for observability pipelines; filter, enrich, and reduce log data before forwarding.",
    "source": "cat-tool"
  },
  "Critical Infrastructure": {
    "term": "Critical Infrastructure",
    "definition": "Essential systems, networks, or assets that are critical to an organization's operations or national security.",
    "source": "clear"
  },
  "Cross-Process Injection": {
    "term": "Cross-Process Injection",
    "definition": "Injecting code into another running process's memory space to hide execution and bypass security controls.",
    "source": "bad-term"
  },
  "Cross-System": {
    "term": "Cross-System",
    "definition": "Interactions or communications that occur between different systems or platforms within an infrastructure.",
    "source": "clear"
  },
  "CrowdStrike Falcon": {
    "term": "CrowdStrike Falcon",
    "definition": "Cloud-native EDR with a lightweight agent; combines behavioral analytics, threat intel, and ML.",
    "source": "cat-tool"
  },
  "Crypters / Packers": {
    "term": "Crypters / Packers",
    "definition": "Tooling that uses encryption or obfuscation to hide malicious code and evade antivirus. Not malicious on their own but commonly paired with trojans, RATs, or ransomware.",
    "source": "bad-term"
  },
  "Cuckoo Sandbox": {
    "term": "Cuckoo Sandbox",
    "definition": "Open-source automated malware analysis running suspect files in VMs and capturing behavior. Original project unmaintained since ~2017; community forks (CAPEv2, Cuckoo3) carry the approach forward.",
    "source": "cat-tool"
  },
  "Custom Encryption Protocols": {
    "term": "Custom Encryption Protocols",
    "definition": "Non-standard encryption schemes that wrap malicious traffic to avoid detection by DPI or SSL/TLS inspection.",
    "source": "bad-term"
  },
  "Custom Protocols over Non-Standard Ports": {
    "term": "Custom Protocols over Non-Standard Ports",
    "definition": "Proprietary or disguised protocols on unexpected ports (e.g., SSH on 8888) to evade detection that expects known service behavior.",
    "source": "bad-term"
  },
  "CyberArk": {
    "term": "CyberArk",
    "definition": "Market leader in PAM; credential rotation, secret management, session monitoring, secure remote access.",
    "source": "cat-tool"
  },
  "CyberTrap": {
    "term": "CyberTrap",
    "definition": "Deception platform with realistic traps and decoys to misdirect attackers and surface intrusion attempts.",
    "source": "cat-tool"
  },
  "Cybercriminals": {
    "term": "Cybercriminals",
    "definition": "Individuals or groups who use technology to commit crimes, including data theft, fraud, and system compromise for financial gain.",
    "source": "clear"
  },
  "Cybereason": {
    "term": "Cybereason",
    "definition": "EDR/XDR focused on endpoint visibility, malware detection, IR, and deep process-tree forensics.",
    "source": "cat-tool"
  },
  "Cymmetria": {
    "term": "Cymmetria",
    "definition": "Deception technology focused on detecting lateral movement via decoys and traps that mimic real assets.",
    "source": "cat-tool"
  },
  "Cynet AutoXDR": {
    "term": "Cynet AutoXDR",
    "definition": "XDR with autonomous investigation and remediation playbooks aimed at small-to-mid SOCs.",
    "source": "cat-tool"
  },
  "DFIR ORC": {
    "term": "DFIR ORC",
    "definition": "Open-source forensic-artifact collector from ANSSI (the French national cyber agency). Runs on Windows endpoints to gather a broad, configurable set of artifacts for offline post-compromise analysis. Not a case-management platform.",
    "source": "cat-tool"
  },
  "DLL Injection": {
    "term": "DLL Injection",
    "definition": "Injecting a Dynamic Link Library into a target process to execute malicious code within that process's context.",
    "source": "bad-term"
  },
  "DLL Loading": {
    "term": "DLL Loading",
    "definition": "The process of loading Dynamic Link Libraries into a program's memory space, which can be exploited by attackers for malicious code execution.",
    "source": "clear"
  },
  "DNS Tunneling": {
    "term": "DNS Tunneling",
    "definition": "Abusing DNS to encapsulate and exfiltrate data or create covert C2, bypassing traditional network controls.",
    "source": "bad-term"
  },
  "Darktrace": {
    "term": "Darktrace",
    "definition": "Self-learning AI; builds behavioral baselines, detects anomalies, autonomously responds via Antigena.",
    "source": "cat-tool"
  },
  "Data Aggregation": {
    "term": "Data Aggregation",
    "definition": "The process of collecting and combining data from multiple sources for analysis, potentially revealing security patterns or threats not visible in isolated data sets.",
    "source": "clear"
  },
  "Data Breach": {
    "term": "Data Breach",
    "definition": "The unauthorized access, theft, or exposure of sensitive data.",
    "source": "clear"
  },
  "Data Exfiltration": {
    "term": "Data Exfiltration",
    "definition": "The unauthorized transfer of data from a computer or network to an external location or system.",
    "source": "clear"
  },
  "Data Exposure": {
    "term": "Data Exposure",
    "definition": "Data left accessible without proper controls, often due to misconfigurations like open cloud storage or unsecured APIs.",
    "source": "bad-term"
  },
  "Data Harvesting": {
    "term": "Data Harvesting",
    "definition": "Automated or bulk collection of data via scrapers, malware, or scripts, often used for profiling, fraud, or resale.",
    "source": "bad-term"
  },
  "Data Integrity": {
    "term": "Data Integrity",
    "definition": "Ensuring data is accurate, complete, and unaltered during storage, processing, and transmission.",
    "source": "clear"
  },
  "Data Leak": {
    "term": "Data Leak",
    "definition": "Unintended or accidental release of sensitive data, often caused by human error, misconfigured systems, or negligence.",
    "source": "bad-term"
  },
  "Data Leakage Channels": {
    "term": "Data Leakage Channels",
    "definition": "Stealthy exfiltration techniques such as covert DNS queries, encrypted uploads, or embedding in benign-looking traffic.",
    "source": "bad-term"
  },
  "Data Loss Prevention (DLP)": {
    "term": "Data Loss Prevention (DLP)",
    "definition": "A set of tools and processes that help prevent sensitive data from being lost, stolen, or compromised.",
    "source": "clear"
  },
  "Data Protection": {
    "term": "Data Protection",
    "definition": "The processes and technologies used to protect sensitive data from unauthorized access, theft, or damage.",
    "source": "clear"
  },
  "Data Retention": {
    "term": "Data Retention",
    "definition": "The policies and procedures that govern how long data is stored and retained.",
    "source": "clear"
  },
  "Data Staging": {
    "term": "Data Staging",
    "definition": "Sensitive data collected and stored locally in chunks before exfiltration, avoiding large, sudden transfers that DLP would flag.",
    "source": "bad-term"
  },
  "Dead Drop Resolver (DDR)": {
    "term": "Dead Drop Resolver (DDR)",
    "definition": "Malware retrieves commands from content stored on legitimate platforms (Pastebin, GitHub, social media), avoiding direct connection to attacker infrastructure.",
    "source": "bad-term"
  },
  "Deception Technology": {
    "term": "Deception Technology",
    "definition": "Security tools and techniques that deploy decoys and traps to detect, deflect, and analyze unauthorized system access attempts.",
    "source": "clear"
  },
  "Deep Packet Inspection (DPI)": {
    "term": "Deep Packet Inspection (DPI)",
    "definition": "A technique used to inspect and analyze network traffic to detect and block malicious activity.",
    "source": "clear"
  },
  "Defense Evasion": {
    "term": "Defense Evasion",
    "definition": "Techniques used to avoid detection and interference from security tools, including obfuscation, disabling defenses, and mimicking legitimate activity.",
    "source": "bad-term"
  },
  "Delayed Execution": {
    "term": "Delayed Execution",
    "definition": "Malware waits for a specific trigger (time, date, keyboard input) before executing, bypassing sandbox environments.",
    "source": "bad-term"
  },
  "Detection Logic": {
    "term": "Detection Logic",
    "definition": "The rule, model, or heuristic that decides whether a given input fires an alert. The logic that produced the alert matters as much as the alert it produced; two engines can name the same alert for very different reasons.",
    "source": "clear"
  },
  "Detection Mechanism": {
    "term": "Detection Mechanism",
    "definition": "Tools or methods employed to identify security incidents, including signature, anomaly, and behavioral detections.",
    "source": "clear"
  },
  "Device Fingerprint": {
    "term": "Device Fingerprint",
    "definition": "A unique identifier derived from hardware or software characteristics used to recognize devices.",
    "source": "clear"
  },
  "Digital Forensics": {
    "term": "Digital Forensics",
    "definition": "The analysis and examination of digital evidence to investigate and solve crimes or security incidents.",
    "source": "clear"
  },
  "Digital Guardian": {
    "term": "Digital Guardian",
    "definition": "DLP and endpoint security with context-aware policies for data usage across endpoints, networks, cloud.",
    "source": "cat-tool"
  },
  "Digital Signatures": {
    "term": "Digital Signatures",
    "definition": "Cryptographic techniques that validate the authenticity and integrity of digital messages or documents.",
    "source": "clear"
  },
  "Dirty COW (CVE-2016-5195)": {
    "term": "Dirty COW (CVE-2016-5195)",
    "definition": "Linux kernel privilege escalation via a race condition in the copy-on-write handling of memory mappings. An unprivileged process with read access to a file can race the COW path to write the underlying page, modifying files it should only be able to read, including system binaries owned by root. Widely used in rootkits and Linux malware. Impacted a wide range of distributions and Android.",
    "source": "bad-term"
  },
  "Disaster Recovery": {
    "term": "Disaster Recovery",
    "definition": "The process of restoring systems, networks, and operations after a disaster or major disruption.",
    "source": "clear"
  },
  "Distributed Denial-of-Service (DDoS)": {
    "term": "Distributed Denial-of-Service (DDoS)",
    "definition": "A type of attack where multiple systems are used to flood a targeted system or network with traffic in an attempt to overwhelm it.",
    "source": "clear"
  },
  "Distribution Pipelines": {
    "term": "Distribution Pipelines",
    "definition": "Processes and tools used to deploy software or updates from development to production environments.",
    "source": "clear"
  },
  "Domain": {
    "term": "Domain",
    "definition": "A unique name or identifier for a system, network, or organization on the internet.",
    "source": "clear"
  },
  "Domain Admin": {
    "term": "Domain Admin",
    "definition": "The most powerful account class in a Windows Active Directory domain: full administrative control over every domain-joined host, every domain user, and the directory itself. Compromise of a Domain Admin account is generally treated as a domain compromise.",
    "source": "clear"
  },
  "Domain Controller": {
    "term": "Domain Controller",
    "definition": "A server that responds to security authentication requests in a Windows domain environment.",
    "source": "clear"
  },
  "Domain Depth": {
    "term": "Domain Depth",
    "definition": "The hierarchical level or complexity within a domain namespace or network structure.",
    "source": "clear"
  },
  "Domain Fronting": {
    "term": "Domain Fronting",
    "definition": "Disguises the true destination of HTTPS traffic by routing through a legitimate front-facing domain.",
    "source": "bad-term"
  },
  "Domain Generation Algorithm": {
    "term": "Domain Generation Algorithm",
    "definition": "Instead of a hardcoded C2 domain, the malware computes a fresh list each day (or hour) from a seed. The attacker registers just one of the generated names. The malware tries them all; only the registered one resolves. Static blocklists never quite catch DGA-driven malware because the candidate names change continuously.",
    "source": "bad-feature"
  },
  "Domain Generation Algorithm (DGA)": {
    "term": "Domain Generation Algorithm (DGA)",
    "definition": "Algorithm generating many domain names on the fly, making C2 connections hard to block via static domain blacklists.",
    "source": "bad-term"
  },
  "Domain Name System (DNS)": {
    "term": "Domain Name System (DNS)",
    "definition": "A system that translates domain names into IP addresses.",
    "source": "clear"
  },
  "Domain Name System Exfiltration": {
    "term": "Domain Name System Exfiltration",
    "definition": "A technique where data is covertly sent out of a network using DNS queries.",
    "source": "clear"
  },
  "Domain Name System Query": {
    "term": "Domain Name System Query",
    "definition": "A request sent to a DNS server to resolve a domain name into an IP address.",
    "source": "clear"
  },
  "Domain Trusts": {
    "term": "Domain Trusts",
    "definition": "Relationships established between domains to allow resource sharing and authentication.",
    "source": "clear"
  },
  "Domain-based Message Authentication, Reporting, and Conformance (DMARC)": {
    "term": "Domain-based Message Authentication, Reporting, and Conformance (DMARC)",
    "definition": "An email validation system to prevent spoofing.",
    "source": "clear"
  },
  "DomainKeys Identified Mail (DKIM)": {
    "term": "DomainKeys Identified Mail (DKIM)",
    "definition": "An email authentication method that verifies message integrity and sender identity.",
    "source": "clear"
  },
  "Dridex": {
    "term": "Dridex",
    "definition": "Banking Trojan evolved into a modular platform for credential theft, lateral movement, and ransomware delivery. Spread via Word macros; injects into browsers to harvest banking credentials. Used to deploy Locky and BitPaymer. Associated with Evil Corp. Still under active development despite arrests.",
    "source": "bad-family"
  },
  "Drive-By Download": {
    "term": "Drive-By Download",
    "definition": "Malicious code automatically downloaded and executed simply by visiting a compromised or malicious website, often without user interaction.",
    "source": "bad-term"
  },
  "Druva": {
    "term": "Druva",
    "definition": "Cloud-native, agentless data protection for endpoints, data center, and cloud workloads.",
    "source": "cat-tool"
  },
  "Duo (Cisco)": {
    "term": "Duo (Cisco)",
    "definition": "MFA, device trust, and contextual access; widely used for remote access and SaaS protection.",
    "source": "cat-tool"
  },
  "Dynamic Link Library (DLL)": {
    "term": "Dynamic Link Library (DLL)",
    "definition": "A collection of executable functions or data that can be used by multiple programs.",
    "source": "clear"
  },
  "Dynamic Prioritization": {
    "term": "Dynamic Prioritization",
    "definition": "Adaptive adjustment of alert or incident priority based on contextual risk factors.",
    "source": "clear"
  },
  "E-ISAC": {
    "term": "E-ISAC",
    "definition": "Electricity sector ISAC; threat intel, IR support, and risk analysis tailored to grid operators.",
    "source": "cat-tool"
  },
  "Elastic Security": {
    "term": "Elastic Security",
    "definition": "Unified security on the Elastic Stack; endpoint protection, prebuilt detections, and customizable monitoring.",
    "source": "cat-tool"
  },
  "Electron": {
    "term": "Electron",
    "definition": "Cross-platform desktop app framework using web technologies; powers Cursor, VS Code, Slack, and more.",
    "source": "cat-tool"
  },
  "Electron Framework": {
    "term": "Electron Framework",
    "definition": "An open-source framework for building cross-platform desktop applications using web technologies.",
    "source": "clear"
  },
  "EmPyre / Empire": {
    "term": "EmPyre / Empire",
    "definition": "Open-source post-exploitation framework with Python-based agents (EmPyre is the macOS/Linux branch; Empire is the PowerShell/Windows branch). Originally a red-team tool, adopted by various actors. Encrypted C2, evasion techniques, in-memory execution. Less common in the wild than Cobalt Strike, but its presence in a compromise should be treated as a high-risk indicator. Not a backdoor.",
    "source": "bad-family"
  },
  "Email Attachment Exploit": {
    "term": "Email Attachment Exploit",
    "definition": "Malware or exploit code embedded in an email attachment that executes when the user opens the file.",
    "source": "bad-term"
  },
  "Email-Based C2": {
    "term": "Email-Based C2",
    "definition": "Using SMTP/IMAP to send or receive commands and data, hidden in attachments or content that blends with business traffic.",
    "source": "bad-term"
  },
  "Emotet": {
    "term": "Emotet",
    "definition": "Banking trojan turned modular loader botnet; for years the dominant initial-access delivery vehicle, dropping TrickBot, QakBot, and ultimately ransomware. Spread via thread-hijacked phishing with macro documents. Taken down by law enforcement in January 2021, resurfaced later that year, and its playbook still defines the loader-botnet ecosystem.",
    "source": "bad-family"
  },
  "EnCase Forensic": {
    "term": "EnCase Forensic",
    "definition": "Long-standing digital-investigation suite; acquisition, indexing, analysis, and court-admissible reporting.",
    "source": "cat-tool"
  },
  "Encoded Payloads": {
    "term": "Encoded Payloads",
    "definition": "Malicious code or commands that have been transformed into a different format to avoid detection or bypass security controls.",
    "source": "clear"
  },
  "Encrypted Web Uploads": {
    "term": "Encrypted Web Uploads",
    "definition": "Sensitive data uploaded via HTTPS to attacker-controlled servers, helping evade content inspection.",
    "source": "bad-term"
  },
  "Encryption": {
    "term": "Encryption",
    "definition": "The process of converting plaintext data into unreadable ciphertext to protect it from unauthorized access.",
    "source": "clear"
  },
  "Endpoint": {
    "term": "Endpoint",
    "definition": "A device that initiates network connections and runs user-facing software: laptop, desktop, server, phone, tablet. Endpoints are where most adversary tradecraft eventually shows up, which is why EDR exists.",
    "source": "clear"
  },
  "Endpoint Detection and Response (EDR)": {
    "term": "Endpoint Detection and Response (EDR)",
    "definition": "Security technology that continuously monitors and responds to threats on endpoint devices, providing advanced threat detection and incident response capabilities.",
    "source": "clear"
  },
  "Endpoint Security": {
    "term": "Endpoint Security",
    "definition": "The processes and technologies used to protect endpoint devices from security threats.",
    "source": "clear"
  },
  "Enterprise": {
    "term": "Enterprise",
    "definition": "A large organization or business that operates in multiple locations or countries.",
    "source": "clear"
  },
  "Entitlement Matrix": {
    "term": "Entitlement Matrix",
    "definition": "A framework mapping user roles to their access permissions within systems.",
    "source": "clear"
  },
  "Entity": {
    "term": "Entity",
    "definition": "A person, system, or organization that interacts with or affects a security incident.",
    "source": "clear"
  },
  "Entropy Scoring": {
    "term": "Entropy Scoring",
    "definition": "A method to measure randomness or complexity in data, often used to detect obfuscation or encryption.",
    "source": "clear"
  },
  "Environment Checks": {
    "term": "Environment Checks",
    "definition": "Malware inspects its environment (VMs, debuggers) before running to avoid sandbox analysis.",
    "source": "bad-term"
  },
  "Ephemeral Computing": {
    "term": "Ephemeral Computing",
    "definition": "A computing model where resources, such as containers or serverless functions, are temporary and exist only for the duration of a specific task or process.",
    "source": "clear"
  },
  "Equifax breach": {
    "term": "Equifax breach",
    "definition": "2017 breach exposing PII (SSNs, birth dates, addresses) for 147 million Americans. Caused by failure to patch Apache Struts (CVE-2017-5638). Attackers operated undetected for weeks. Handling and disclosure drew widespread criticism. Resulted in a historic $700M settlement and regulatory reforms focused on data protection.",
    "source": "bad-campaign"
  },
  "Eradication": {
    "term": "Eradication",
    "definition": "The phase of incident response focused on completely removing threat actors and malicious artifacts from affected systems.",
    "source": "clear"
  },
  "Escalation Matrix": {
    "term": "Escalation Matrix",
    "definition": "A predetermined framework defining when and how to elevate security incidents to higher levels of response based on severity and impact.",
    "source": "clear"
  },
  "EternalBlue": {
    "term": "EternalBlue",
    "definition": "NSA SMBv1 exploit leaked by Shadow Brokers in 2017. Buffer overflow allows unauthenticated remote code execution. Instrumental in WannaCry and NotPetya. Spurred deprecation of SMBv1 and stronger patching practices.",
    "source": "bad-term"
  },
  "Evasion": {
    "term": "Evasion",
    "definition": "Techniques used by attackers to avoid detection by security tools.",
    "source": "clear"
  },
  "Event": {
    "term": "Event",
    "definition": "An observable thing that happened: a process executed, a user logged in, a file changed, a packet was sent. Events are what produce alerts when detection logic decides they're interesting. Most events are not alerts; most alerts are events.",
    "source": "clear"
  },
  "Event Context": {
    "term": "Event Context",
    "definition": "The circumstances and environment surrounding a security event.",
    "source": "clear"
  },
  "Event Correlation": {
    "term": "Event Correlation",
    "definition": "The process of analyzing multiple events across different sources to identify relationships and determine if they are part of a larger security incident.",
    "source": "clear"
  },
  "Event Triage": {
    "term": "Event Triage",
    "definition": "The phase that sits between detection and incident response: deciding whether an alert is real, whom it concerns, what its blast radius might be, and whether it crosses an escalation threshold. The ASSURED methodology is a structured way to do triage.",
    "source": "clear"
  },
  "Evil Corp Dridex / WastedLocker": {
    "term": "Evil Corp Dridex / WastedLocker",
    "definition": "Russian cybercrime group behind the Dridex banking trojan and BitPaymer / WastedLocker ransomware. Hundreds of millions stolen from global financial institutions. U.S. Treasury has sanctioned the group and its alleged leader Maksim Yakubets. Has continued operations under new malware names to evade sanctions and tracking.",
    "source": "bad-actor"
  },
  "Exabeam": {
    "term": "Exabeam",
    "definition": "Next-gen SIEM with built-in UEBA; user-behavior timelines and automated investigation workflows.",
    "source": "cat-tool"
  },
  "Excessive Permissions": {
    "term": "Excessive Permissions",
    "definition": "User or process privileges beyond what is necessary for their role, increasing security risk.",
    "source": "clear"
  },
  "Execution": {
    "term": "Execution",
    "definition": "The attacker successfully runs malicious code on a system, typically using interpreters, scripts, payloads, or legitimate tools.",
    "source": "bad-term"
  },
  "Exfiltration": {
    "term": "Exfiltration",
    "definition": "The unauthorized transfer of data from a system or network, often as part of a data breach or espionage operation.",
    "source": "clear"
  },
  "Exploit": {
    "term": "Exploit",
    "definition": "A technique or piece of code that turns a vulnerability into actual capability: remote code execution, privilege escalation, authentication bypass. A vulnerability without an exploit is theoretical; a vulnerability with one is operational.",
    "source": "clear"
  },
  "Exploit Public-Facing Application": {
    "term": "Exploit Public-Facing Application",
    "definition": "Targets vulnerabilities in externally exposed applications (web servers, APIs) to gain unauthorized access or RCE.",
    "source": "bad-term"
  },
  "FBI Flash Reports": {
    "term": "FBI Flash Reports",
    "definition": "Rapid high-priority notifications about imminent cyber threats targeting public and private partners.",
    "source": "cat-tool"
  },
  "FIDO2": {
    "term": "FIDO2",
    "definition": "An authentication standard enabling passwordless login using biometrics or security keys.",
    "source": "clear"
  },
  "FIN7 Carbanak / Bateleur": {
    "term": "FIN7 Carbanak / Bateleur",
    "definition": "Well-organized cybercrime group conducting large-scale intrusions against banks, POS systems, and hospitality. Financially motivated but operationally on par with nation-state actors. Developed Carbanak and Bateleur malware families. Uses phishing, backdoors, supply-chain compromise. Has rebranded after arrests, including via fronts like Combi Security.",
    "source": "bad-actor"
  },
  "FS-ISAC": {
    "term": "FS-ISAC",
    "definition": "Global financial-sector ISAC providing real-time alerts, incident coordination, and member collaboration.",
    "source": "cat-tool"
  },
  "Falcon OverWatch": {
    "term": "Falcon OverWatch",
    "definition": "Managed threat-hunting service on top of CrowdStrike Falcon; 24/7 human-led analysis to validate stealthy intrusions.",
    "source": "cat-tool"
  },
  "False Positive": {
    "term": "False Positive",
    "definition": "A security alert that fires on activity that is, on inspection, benign. The detection logic matched a pattern that looked malicious but was not. Distinct from a benign true positive , which is real adversary-like activity that does not warrant action in the local context.",
    "source": "clear"
  },
  "False-Premise": {
    "term": "False-Premise",
    "definition": "An incorrect assumption or conclusion about a security event that leads to improper investigation or response.",
    "source": "clear"
  },
  "Fast Flux DNS": {
    "term": "Fast Flux DNS",
    "definition": "Rapidly rotating DNS records that cycle a malicious domain through many IP addresses, hiding C2 servers behind shifting infrastructure and defeating IP-based blocking and takedowns.",
    "source": "bad-term"
  },
  "Federation": {
    "term": "Federation",
    "definition": "A system allowing users to access multiple independent systems using a single set of credentials.",
    "source": "clear"
  },
  "Feedback Loop": {
    "term": "Feedback Loop",
    "definition": "A process where information from outcomes is used to improve future detection or response.",
    "source": "clear"
  },
  "File Extension Spoofing": {
    "term": "File Extension Spoofing",
    "definition": "Files disguised with misleading extensions (e.g., invoice.pdf.exe ) to trick users and bypass basic file-type filters.",
    "source": "bad-term"
  },
  "File Integrity Monitoring (FIM)": {
    "term": "File Integrity Monitoring (FIM)",
    "definition": "A security control that detects unauthorized changes to files or configurations.",
    "source": "clear"
  },
  "Fileless Malware": {
    "term": "Fileless Malware",
    "definition": "Malware that operates in memory without writing files to disk, harder to detect with traditional AV. Often leverages legitimate system tools like PowerShell or WMI for execution.",
    "source": "bad-term"
  },
  "Firewall": {
    "term": "Firewall",
    "definition": "A network security system that controls and monitors incoming and outgoing traffic based on predetermined security rules.",
    "source": "clear"
  },
  "Fluentd": {
    "term": "Fluentd",
    "definition": "Open-source data collector that unifies log collection and processing across distributed systems via plugins.",
    "source": "cat-tool"
  },
  "Follina (CVE-2022-30190)": {
    "term": "Follina (CVE-2022-30190)",
    "definition": "Zero-click vulnerability in the Microsoft Support Diagnostic Tool (MSDT) triggered via crafted Word documents. Executes code through the ms-msdt protocol handler without macros. Stealthier than VBA-based attacks. Used in phishing campaigns before fully addressed.",
    "source": "bad-term"
  },
  "Forcepoint": {
    "term": "Forcepoint",
    "definition": "DLP, cloud security, and insider-threat behavior analytics across endpoints, networks, and cloud applications.",
    "source": "cat-tool"
  },
  "Forensics": {
    "term": "Forensics",
    "definition": "The application of scientific methods to collect, preserve, and analyze digital evidence for security investigations and incident response.",
    "source": "clear"
  },
  "Framework": {
    "term": "Framework",
    "definition": "A structured approach or set of guidelines used to build security programs or processes.",
    "source": "clear"
  },
  "Fully Qualified Domain Name (FQDN)": {
    "term": "Fully Qualified Domain Name (FQDN)",
    "definition": "The complete domain name specifying its exact location in the DNS hierarchy.",
    "source": "clear"
  },
  "General Data Protection Regulation (GDPR)": {
    "term": "General Data Protection Regulation (GDPR)",
    "definition": "European Union regulation establishing requirements for processing and protecting personal data, with specific security and breach notification requirements.",
    "source": "clear"
  },
  "Genetec": {
    "term": "Genetec",
    "definition": "Unified Security Center for video surveillance, access control, and license plate recognition.",
    "source": "cat-tool"
  },
  "Geolocation": {
    "term": "Geolocation",
    "definition": "The process of determining the physical location of a device or IP address.",
    "source": "clear"
  },
  "Golden Ticket Attack": {
    "term": "Golden Ticket Attack",
    "definition": "Forging Kerberos TGTs to grant unrestricted domain access by impersonating any user.",
    "source": "bad-term"
  },
  "Google Security Operations SOAR (formerly Siemplify / Chronicle SOAR)": {
    "term": "Google Security Operations SOAR (formerly Siemplify / Chronicle SOAR)",
    "definition": "SOAR with case management, playbooks, and analyst dashboards; integrated with Google SecOps (Chronicle) telemetry. Siemplify acquired by Google, 2022; fully integrated into Google SecOps.",
    "source": "cat-tool"
  },
  "GreyNoise": {
    "term": "GreyNoise",
    "definition": "Filters internet background-scan noise so SOCs focus on targeted attacks. IP context with malicious vs. benign classification.",
    "source": "cat-tool"
  },
  "H-ISAC": {
    "term": "H-ISAC",
    "definition": "Healthcare-sector ISAC; threat intelligence, incident response coordination, and best practices for clinical environments.",
    "source": "cat-tool"
  },
  "HAFNIUM Exchange": {
    "term": "HAFNIUM Exchange",
    "definition": "Early 2021 chain of zero-day exploits in Microsoft Exchange Server. Tens of thousands of orgs affected globally, government, academic, business. Web shells deployed for data theft, persistence, and lateral movement. Out-of-band patches issued. Raised concerns about on-premises Exchange security and patch management.",
    "source": "bad-campaign"
  },
  "HAFNIUM Exchange zero-days": {
    "term": "HAFNIUM Exchange zero-days",
    "definition": "Suspected Chinese state-sponsored group, widely known for exploiting Microsoft Exchange zero-days in 2021. Web-shell deployment and widespread data theft from education, law firms, NGOs, and defense contractors. Uses a mix of custom malware and commercial tools, including C2 over compromised Exchange servers.",
    "source": "bad-actor"
  },
  "HTA Content": {
    "term": "HTA Content",
    "definition": "HTML Application files that can execute scripts, sometimes abused for malicious purposes.",
    "source": "clear"
  },
  "HTTP/S C2": {
    "term": "HTTP/S C2",
    "definition": "Standard HTTP/HTTPS traffic carrying C2, blending with normal web activity.",
    "source": "bad-term"
  },
  "HTTPS C2": {
    "term": "HTTPS C2",
    "definition": "The beacon hides in normal-looking HTTPS traffic. To a proxy log, a C2 request is identical to any CDN or SaaS request: 200 OK , encrypted body, common-looking hostname. The beacon is indistinguishable from its neighbors at a glance, which is exactly why TLS-aware decryption and JA3 fingerprinting matter.",
    "source": "bad-feature"
  },
  "Hash Injection": {
    "term": "Hash Injection",
    "definition": "Injecting a stolen or forged hash into a system's authentication mechanism to impersonate a user without the plaintext password.",
    "source": "bad-term"
  },
  "Hashes": {
    "term": "Hashes",
    "definition": "Cryptographic functions that generate fixed-size values representing digital data, used for file integrity verification and malware identification.",
    "source": "clear"
  },
  "Health Insurance Portability and Accountability Act (HIPAA)": {
    "term": "Health Insurance Portability and Accountability Act (HIPAA)",
    "definition": "U.S. legislation that sets standards for protecting sensitive patient health information, including specific security and privacy requirements.",
    "source": "clear"
  },
  "Heartbleed (CVE-2014-0160)": {
    "term": "Heartbleed (CVE-2014-0160)",
    "definition": "OpenSSL flaw allowing attackers to read up to 64KB of server memory per request, keys, passwords, session tokens. Affected ~17% of internet servers at peak.",
    "source": "bad-term"
  },
  "Heuristic Detection": {
    "term": "Heuristic Detection",
    "definition": "A detection method that uses rules and patterns to identify potentially malicious behavior based on common characteristics of malware or attacks.",
    "source": "clear"
  },
  "Honeypot": {
    "term": "Honeypot",
    "definition": "A decoy system designed to lure attackers and study their tactics.",
    "source": "clear"
  },
  "Honeywell": {
    "term": "Honeywell",
    "definition": "Integrated physical security: surveillance, access, intrusion detection, alarms across critical infrastructure.",
    "source": "cat-tool"
  },
  "Hybrid Infrastructure": {
    "term": "Hybrid Infrastructure",
    "definition": "Computing environment that combines on-premises, private cloud, and public cloud services.",
    "source": "clear"
  },
  "Hyper-Text Transfer Protocol (HTTP)": {
    "term": "Hyper-Text Transfer Protocol (HTTP)",
    "definition": "The foundation protocol for data communication on the web.",
    "source": "clear"
  },
  "Hyper-Text Transfer Protocol Secure (HTTPS)": {
    "term": "Hyper-Text Transfer Protocol Secure (HTTPS)",
    "definition": "Secure version of HTTP using encryption to protect data in transit.",
    "source": "clear"
  },
  "IBM QRadar": {
    "term": "IBM QRadar",
    "definition": "Enterprise SIEM with real-time correlation, ML-assisted prioritization, and broad ecosystem integration.",
    "source": "cat-tool"
  },
  "ICMP Tunneling": {
    "term": "ICMP Tunneling",
    "definition": "Embedding commands or data in ICMP echo packets (ping) to establish covert C2 communication that traditional firewalls often miss.",
    "source": "bad-term"
  },
  "IcedID (BokBot)": {
    "term": "IcedID (BokBot)",
    "definition": "Banking Trojan turned loader frequently used to drop Cobalt Strike, TrickBot, or ransomware. Spread through malicious documents and phishing. Modular: credential theft, web injection, lateral movement. Persistence via scheduled tasks and registry keys. A key player in post-intrusion ransomware operations.",
    "source": "bad-family"
  },
  "Impact": {
    "term": "Impact",
    "definition": "The potential effect or damage caused by a security incident.",
    "source": "clear"
  },
  "Incident": {
    "term": "Incident",
    "definition": "A confirmed compromise of confidentiality, integrity, or availability: an alert (or series of alerts) that triage has validated as real adversary activity, warranting an IR response. An event becomes an incident at the verdict, not at the alert.",
    "source": "clear"
  },
  "Incident Command": {
    "term": "Incident Command",
    "definition": "A structured leadership model used to manage complex security incidents.",
    "source": "clear"
  },
  "Incident Response": {
    "term": "Incident Response",
    "definition": "The organized approach to addressing and managing the aftermath of a security breach or cyberattack, including preparation, detection, analysis, containment, eradication, and recovery.",
    "source": "clear"
  },
  "Indicators of Compromise (IoC)": {
    "term": "Indicators of Compromise (IoC)",
    "definition": "Atomic, replayable artifacts that, when observed, suggest an intrusion has occurred or is in progress: file hashes, IPs, domains, registry keys, certificate fingerprints, and similar discrete observables. Behavioral patterns (process trees, sequence of actions) are not IoCs; they live one layer up as TTPs.",
    "source": "clear"
  },
  "Information Disclosure": {
    "term": "Information Disclosure",
    "definition": "A system or application reveals internal details, sensitive metadata, or user data, often as part of a vulnerability or misconfiguration.",
    "source": "bad-term"
  },
  "Information Security": {
    "term": "Information Security",
    "definition": "The practices and technologies used to protect information and data from unauthorized access, use, disclosure, disruption, modification, or destruction.",
    "source": "clear"
  },
  "Information Sharing and Analysis Centers (ISACs)": {
    "term": "Information Sharing and Analysis Centers (ISACs)",
    "definition": "Industry groups that share cyber threat information.",
    "source": "clear"
  },
  "Information Technology Service Management (ITSM)": {
    "term": "Information Technology Service Management (ITSM)",
    "definition": "Frameworks and tools to manage IT services and processes.",
    "source": "clear"
  },
  "Infostealers": {
    "term": "Infostealers",
    "definition": "Software that harvests sensitive data from victims: passwords, cookies, browser history, autofill. Commonly used in initial-access phases of broader attack campaigns.",
    "source": "bad-term"
  },
  "Infrastructure": {
    "term": "Infrastructure",
    "definition": "The underlying systems, networks, and architecture that support an organization's operations.",
    "source": "clear"
  },
  "Initial Access": {
    "term": "Initial Access",
    "definition": "The first step of a breach, where attackers gain a foothold in the environment through phishing, exploits, credential abuse, or exposed services.",
    "source": "bad-term"
  },
  "Insider Data Theft": {
    "term": "Insider Data Theft",
    "definition": "Unauthorized access and removal of sensitive data by a trusted internal party with legitimate access.",
    "source": "bad-term"
  },
  "Insider Risk": {
    "term": "Insider Risk",
    "definition": "The potential for harm from individuals with legitimate access arising from mistakes, policy violations, or unsafe habits, not from intent. Distinct from insider threat , which is deliberate.",
    "source": "clear"
  },
  "Insider Threat": {
    "term": "Insider Threat",
    "definition": "A trusted internal user who intentionally abuses their access to cause harm, steal data, or assist external attackers.",
    "source": "bad-term"
  },
  "Insider Threat Matrix": {
    "term": "Insider Threat Matrix",
    "definition": "A public framework maintained at insiderthreatmatrix.org that catalogs insider techniques across motive, means, preparation, infringement, and anti-forensics. Useful as a shared vocabulary for describing insider risk and threat.",
    "source": "clear"
  },
  "Insider Threats": {
    "term": "Insider Threats",
    "definition": "Personnel with authorized access who deliberately misuse it to harm the organization through theft, sabotage, or assisting external attackers. Distinct from insider risk, which also covers unintentional harm from negligence or mistakes.",
    "source": "clear"
  },
  "Integrated Development Environment (IDE)": {
    "term": "Integrated Development Environment (IDE)",
    "definition": "Software that provides comprehensive facilities to programmers.",
    "source": "clear"
  },
  "Intel 471": {
    "term": "Intel 471",
    "definition": "Commercial deep/dark-web monitoring with adversary infrastructure, TTP, and threat-actor behavior intelligence.",
    "source": "cat-tool"
  },
  "IntelliSense": {
    "term": "IntelliSense",
    "definition": "A code-completion aid commonly found in development environments.",
    "source": "clear"
  },
  "Intelligence": {
    "term": "Intelligence",
    "definition": "Information gathered and analyzed to understand and predict potential security threats.",
    "source": "clear"
  },
  "Inter-Process Communication": {
    "term": "Inter-Process Communication",
    "definition": "Mechanisms that allow different processes to communicate within an operating system.",
    "source": "clear"
  },
  "Internet Protocol (IP) Address": {
    "term": "Internet Protocol (IP) Address",
    "definition": "A unique address assigned to a device or system on a network.",
    "source": "clear"
  },
  "Internet of Things (IoT)": {
    "term": "Internet of Things (IoT)",
    "definition": "Network of physical devices embedded with sensors, software, and connectivity, introducing new security challenges due to their often limited security capabilities.",
    "source": "clear"
  },
  "Intrusion Detection System (IDS)": {
    "term": "Intrusion Detection System (IDS)",
    "definition": "Security system that monitors network traffic for suspicious activity and policy violations, generating alerts for potential security incidents.",
    "source": "clear"
  },
  "Intrusion Prevention System (IPS)": {
    "term": "Intrusion Prevention System (IPS)",
    "definition": "Security system that not only detects but actively blocks or prevents identified suspicious activity and policy violations.",
    "source": "clear"
  },
  "IoT Malware": {
    "term": "IoT Malware",
    "definition": "Designed to infect Internet of Things devices like routers, cameras, smart appliances. Often used in botnets (e.g., Mirai) due to weak authentication and outdated firmware.",
    "source": "bad-term"
  },
  "Isolated Execution Environment": {
    "term": "Isolated Execution Environment",
    "definition": "A secure area where code runs isolated from other system components to prevent interference.",
    "source": "clear"
  },
  "Isolation Forests": {
    "term": "Isolation Forests",
    "definition": "A machine learning algorithm used for anomaly detection by isolating anomalies in data.",
    "source": "clear"
  },
  "JA3": {
    "term": "JA3",
    "definition": "A method for fingerprinting TLS client applications by hashing specific fields in the TLS Client Hello packet. Degraded against modern clients: Chrome's extension-order randomization (2023) and GREASE values fragment a single client into many hashes.",
    "source": "clear"
  },
  "JA3S": {
    "term": "JA3S",
    "definition": "The server-side counterpart to JA3, it fingerprints TLS servers by hashing fields in the Server Hello packet.",
    "source": "clear"
  },
  "JA4": {
    "term": "JA4",
    "definition": "The 2023 successor to JA3 from FoxIO. A modernized TLS-client fingerprint that sorts extensions before hashing (defeating randomization), handles TLS 1.3, and covers QUIC natively via a leading \"q\" or \"t\" transport marker. Part of the JA4+ suite, which adds separate fingerprints such as JA4H (HTTP client) and JA4S (TLS server).",
    "source": "clear"
  },
  "Jailbreaking": {
    "term": "Jailbreaking",
    "definition": "The removal of OS-level security restrictions, particularly on iOS devices, to allow unauthorized control, often used maliciously.",
    "source": "bad-term"
  },
  "Jenkins": {
    "term": "Jenkins",
    "definition": "Open-source CI/CD automation server; builds, tests, and deploys with a vast plugin ecosystem.",
    "source": "cat-tool"
  },
  "Johnson Controls": {
    "term": "Johnson Controls",
    "definition": "Physical security with OpenBlue platform; security plus building automation, with cybersecurity built in.",
    "source": "cat-tool"
  },
  "Kaspersky EDR": {
    "term": "Kaspersky EDR",
    "definition": "Attack-chain visualization, IOC search, sandboxing, and threat-intel integration with centralized management.",
    "source": "cat-tool"
  },
  "Kerberoasting": {
    "term": "Kerberoasting",
    "definition": "Requesting Kerberos service tickets (TGS) for accounts with Service Principal Names (SPNs) and cracking them offline. The ticket portion is encrypted with the service account's NTLM hash, so a weak service-account password becomes a crackable ciphertext, and any user who can authenticate to the domain can request the ticket.",
    "source": "clear"
  },
  "Kerberos": {
    "term": "Kerberos",
    "definition": "A network authentication protocol using tickets to allow secure identity verification.",
    "source": "clear"
  },
  "Kerberos Overpass-The-Hash": {
    "term": "Kerberos Overpass-The-Hash",
    "definition": "Combining Pass-the-Hash with Kerberos by using NTLM hashes to request Kerberos tickets, bypassing some defenses.",
    "source": "bad-term"
  },
  "Kubernetes": {
    "term": "Kubernetes",
    "definition": "An open-source system for automating deployment, scaling, and management of containerized applications.",
    "source": "clear"
  },
  "LAPSUS$ Okta, Microsoft, Nvidia": {
    "term": "LAPSUS$ Okta, Microsoft, Nvidia",
    "definition": "Loosely organized group known for extortion, data leaks, and high-profile breaches. Access via SIM-swapping, credential theft, and insider recruitment rather than malware. Thrives on media attention and public-facing leaks. Members believed to be primarily teenagers, with arrests in the UK. Disruption over stealth.",
    "source": "bad-actor"
  },
  "LOLBins": {
    "term": "LOLBins",
    "definition": "\"Living Off the Land Binaries.\" Trusted, signed, ubiquitous, and weaponized for every step of an intrusion. Allowlists wave them through; the binary on disk is fine. The malicious part is the argument line. A process list that looks clean at a glance can have every entry being abused.",
    "source": "bad-feature"
  },
  "LSTM Networks": {
    "term": "LSTM Networks",
    "definition": "A type of recurrent neural network useful in analyzing sequential data for anomaly detection.",
    "source": "clear"
  },
  "Lansweeper": {
    "term": "Lansweeper",
    "definition": "IT asset discovery and inventory; CMDB foundations and continuous visibility into devices, software, and users.",
    "source": "cat-tool"
  },
  "Lateral Movement": {
    "term": "Lateral Movement",
    "definition": "Adversary traversal from the initial-access host to other hosts inside the environment. Each hop expands the blast radius and adds new entities for Subject analysis. Often piggybacks on legitimate authentication, which is what makes it hard to detect.",
    "source": "clear"
  },
  "Lazarus Group North Korea / RGB": {
    "term": "Lazarus Group North Korea / RGB",
    "definition": "Umbrella term for several North Korean operations under the Reconnaissance General Bureau. Espionage, sabotage, and financially motivated attacks: Sony Pictures, WannaCry, bank and crypto-exchange theft. Blends APT tradecraft with cybercrime to fund the regime. Strategic patience plus opportunistic targeting.",
    "source": "bad-actor"
  },
  "Least Privilege": {
    "term": "Least Privilege",
    "definition": "The principle of granting users or systems only the necessary permissions and access to perform their tasks.",
    "source": "clear"
  },
  "Legacy Systems": {
    "term": "Legacy Systems",
    "definition": "Outdated technology or systems that remain in use, often with security vulnerabilities.",
    "source": "clear"
  },
  "Lenel S2": {
    "term": "Lenel S2",
    "definition": "OnGuard access control, video, and alarm management for enterprise environments.",
    "source": "cat-tool"
  },
  "Lessons Learned": {
    "term": "Lessons Learned",
    "definition": "Insights gained from past incidents or activities to improve future security posture.",
    "source": "clear"
  },
  "Likelihood": {
    "term": "Likelihood",
    "definition": "The probability that a threat will exploit a vulnerability.",
    "source": "clear"
  },
  "Liveness Detection": {
    "term": "Liveness Detection",
    "definition": "Techniques used to verify that biometric inputs are from a live person, not a spoof.",
    "source": "clear"
  },
  "Living Off The Land": {
    "term": "Living Off The Land",
    "definition": "Abusing legitimate system tools already on the host. powershell, certutil, rundll32, wmic, mshta, bitsadmin.",
    "source": "bad-term"
  },
  "Living-Off-The-Land (LotL)": {
    "term": "Living-Off-The-Land (LotL)",
    "definition": "Attack technique utilizing legitimate, built-in system tools and features to conduct malicious activities while evading detection.",
    "source": "clear"
  },
  "LockBit RaaS at scale": {
    "term": "LockBit RaaS at scale",
    "definition": "The most prolific ransomware-as-a-service operation of the 2020s, responsible for thousands of victims across every sector. Ran a professionalized affiliate program with a slick leak site, bug bounties, and payment discipline. Disrupted by Operation Cronos (2024), which seized infrastructure and unmasked its leader, but affiliates and the playbook persist under new brands.",
    "source": "bad-actor"
  },
  "Log": {
    "term": "Log",
    "definition": "A record of events, transactions, or activities in a system or network.",
    "source": "clear"
  },
  "Log Parsing": {
    "term": "Log Parsing",
    "definition": "The systematic process of analyzing and extracting relevant information from system, application, and security logs for investigation and threat detection.",
    "source": "clear"
  },
  "Log4Shell": {
    "term": "Log4Shell",
    "definition": "CVE-2021-44228, a critical RCE in Apache Log4j. Attacker-controlled input is interpolated into a log message that triggers a JNDI lookup, which loads and executes a remote class. Disclosed December 2021, exploited globally within hours. Affected vast swaths of Java applications. Renewed calls for software bill-of-materials and open-source security funding. Reset assumptions about transitive-dependency risk.",
    "source": "bad-campaign"
  },
  "Log4Shell (CVE-2021-44228)": {
    "term": "Log4Shell (CVE-2021-44228)",
    "definition": "Critical RCE in Apache Log4j. A logged string containing ${\"{\"}jndi:ldap://…{\"}\"} triggers a JNDI lookup; the attacker hosts a class on the referenced server that the JVM then fetches and runs.",
    "source": "bad-term"
  },
  "Logic Attack": {
    "term": "Logic Attack",
    "definition": "A technique that exploits flaws in system logic or workflows, rather than code, to bypass controls or cause disruption.",
    "source": "bad-term"
  },
  "Logic Bombs": {
    "term": "Logic Bombs",
    "definition": "Malicious code triggered by specific conditions, such as a date or user action. Can remain dormant until activated, then execute destructive or stealthy functions.",
    "source": "bad-term"
  },
  "Logstash": {
    "term": "Logstash",
    "definition": "Server-side pipeline that ingests, transforms, and forwards data; central to the Elastic Stack.",
    "source": "cat-tool"
  },
  "Low-And-Slow": {
    "term": "Low-And-Slow",
    "definition": "Performs actions gradually or in minimal increments to remain under detection thresholds.",
    "source": "bad-term"
  },
  "MD5": {
    "term": "MD5",
    "definition": "A widely used hash function that produces a 128-bit hash value, though now considered weak.",
    "source": "clear"
  },
  "MITRE ATT&CK": {
    "term": "MITRE ATT&CK",
    "definition": "A globally-accessible knowledge base of adversary tactics and techniques based on real-world observations, used for threat modeling and security operations.",
    "source": "clear"
  },
  "MITRE Procedures": {
    "term": "MITRE Procedures",
    "definition": "Specific implementation methods used by threat actors to accomplish techniques within the ATT&CK framework.",
    "source": "clear"
  },
  "MITRE Tactics": {
    "term": "MITRE Tactics",
    "definition": "Categories representing the tactical goals of adversaries during an attack, such as initial access, execution, persistence.",
    "source": "clear"
  },
  "MITRE Techniques": {
    "term": "MITRE Techniques",
    "definition": "Specific methods used by adversaries to achieve tactical goals within the ATT&CK framework.",
    "source": "clear"
  },
  "MOVEit Transfer mass exploitation": {
    "term": "MOVEit Transfer mass exploitation",
    "definition": "May–June 2023 zero-day SQL-injection in Progress Software's MOVEit Transfer (CVE-2023-34362), exploited at scale by the Cl0p ransomware group. Thousands of organizations affected via the file-transfer vendor's customer base, U.S. federal agencies, state DMVs, Fortune 500 firms. A defining case for third-party-software risk and for ransomware groups shifting from encryption to pure data-extortion.",
    "source": "bad-campaign"
  },
  "MS-ISAC": {
    "term": "MS-ISAC",
    "definition": "Multi-State ISAC for U.S. state, local, tribal, and territorial governments; alerts, IR, and risk management resources.",
    "source": "cat-tool"
  },
  "MSAB": {
    "term": "MSAB",
    "definition": "Mobile forensics for law enforcement; XRY for extraction, XAMN for evidence visualization, XEC for lab management.",
    "source": "cat-tool"
  },
  "Machine Learning": {
    "term": "Machine Learning",
    "definition": "The use of algorithms and statistical models that enable computer systems to improve their performance on a specific task through experience.",
    "source": "clear"
  },
  "Macro-based Execution": {
    "term": "Macro-based Execution",
    "definition": "Using macros embedded in Office documents or other files to execute malicious code once the file is opened.",
    "source": "bad-term"
  },
  "Magnet AXIOM": {
    "term": "Magnet AXIOM",
    "definition": "Forensics across computers, mobile, cloud, IoT; powerful artifact parsing and cross-source correlation.",
    "source": "cat-tool"
  },
  "Malvertising": {
    "term": "Malvertising",
    "definition": "Malicious advertisements on legitimate websites that redirect users to exploit kits or deliver malware.",
    "source": "bad-term"
  },
  "Malware": {
    "term": "Malware",
    "definition": "Software whose author intends harm: ransomware, trojans, worms, viruses, spyware, wipers, rootkits, RATs. The B.A.D. glossary catalogs the families in detail.",
    "source": "clear"
  },
  "Malwarebytes EDR": {
    "term": "Malwarebytes EDR",
    "definition": "Lightweight EDR with strong remediation; ransomware rollback and post-infection recovery.",
    "source": "cat-tool"
  },
  "Mandatory Access Control": {
    "term": "Mandatory Access Control",
    "definition": "An access policy where permissions are centrally controlled and enforced based on classifications.",
    "source": "clear"
  },
  "Mandiant Security Validation (formerly Verodin)": {
    "term": "Mandiant Security Validation (formerly Verodin)",
    "definition": "Breach-and-attack simulation validating security controls against real-world TTPs. Verodin acquired by FireEye, 2019; renamed 2020; Mandiant acquired by Google Cloud, 2022.",
    "source": "cat-tool"
  },
  "Masquerading": {
    "term": "Masquerading",
    "definition": "Disguises a malicious process or file by renaming it or giving it the appearance of a trusted application.",
    "source": "bad-term"
  },
  "Maze": {
    "term": "Maze",
    "definition": "Pioneer of double extortion, encryption plus data theft to pressure victims. RaaS model with public leak blog. Exploited RDP, phishing, and known vulnerabilities; used Cobalt Strike and Mimikatz internally. Announced retirement in late 2020, but affiliates continued under banners like Egregor and Sekhmet.",
    "source": "bad-family"
  },
  "Mean Time To Respond/Resolve (MTTR)": {
    "term": "Mean Time To Respond/Resolve (MTTR)",
    "definition": "A metric measuring how quickly incidents are resolved.",
    "source": "clear"
  },
  "Memory Injection": {
    "term": "Memory Injection",
    "definition": "Injects code directly into memory rather than writing to disk, avoiding file-based detection.",
    "source": "bad-term"
  },
  "Metadata": {
    "term": "Metadata",
    "definition": "Data about data: file timestamps, owner, size, hash; an email's headers; a process's parent, command line, and signing certificate. In triage, metadata is often more diagnostic than the content itself.",
    "source": "clear"
  },
  "Methodology": {
    "term": "Methodology",
    "definition": "A systematic framework or approach for conducting security operations or investigations.",
    "source": "clear"
  },
  "Microsoft Configuration Manager (MECM)": {
    "term": "Microsoft Configuration Manager (MECM)",
    "definition": "Formerly System Center Configuration Manager (SCCM). Patching, software distribution, and compliance for Windows ecosystems; now part of the Microsoft Intune family alongside cloud-only endpoint management.",
    "source": "cat-tool"
  },
  "Microsoft Defender": {
    "term": "Microsoft Defender",
    "definition": "Antivirus, endpoint protection, EDR (Defender for Endpoint), and XDR ties to Sentinel and Entra ID.",
    "source": "cat-tool"
  },
  "Microsoft Defender EASM": {
    "term": "Microsoft Defender EASM",
    "definition": "External Attack Surface Management, the renamed RiskIQ Illuminate (acquired by Microsoft, 2021). Discovers and monitors internet-facing assets, third-party services, and shadow IT.",
    "source": "cat-tool"
  },
  "Microsoft Defender Threat Intelligence (MDTI)": {
    "term": "Microsoft Defender Threat Intelligence (MDTI)",
    "definition": "Successor to RiskIQ PassiveTotal (acquired by Microsoft, 2021). Aggregates passive DNS, WHOIS, SSL, and infrastructure data for attribution and threat hunting.",
    "source": "cat-tool"
  },
  "Microsoft Sentinel": {
    "term": "Microsoft Sentinel",
    "definition": "Cloud-native SIEM/SOAR; AI-driven analytics across on-prem, cloud, and hybrid with rich connector library.",
    "source": "cat-tool"
  },
  "Microsoft WSUS": {
    "term": "Microsoft WSUS",
    "definition": "Free Microsoft tool for centrally approving and distributing Windows updates within an organization.",
    "source": "cat-tool"
  },
  "Middleware": {
    "term": "Middleware",
    "definition": "Software that connects different applications or systems to enable communication and data exchange.",
    "source": "clear"
  },
  "Milestone Systems": {
    "term": "Milestone Systems",
    "definition": "Open-platform IP video management with broad camera support and rich analytics.",
    "source": "cat-tool"
  },
  "Mimikatz": {
    "term": "Mimikatz",
    "definition": "The canonical credential-theft tool: reads LSASS memory to extract plaintext passwords, NTLM hashes, and Kerberos tickets, and implements pass-the-hash, pass-the-ticket, golden and silver tickets. Written by Benjamin Delpy as a proof of concept; now embedded in nearly every intrusion toolchain and re-implemented inside countless loaders and C2 frameworks. EDR watches lsass access patterns specifically because of it.",
    "source": "bad-family"
  },
  "Mitigation": {
    "term": "Mitigation",
    "definition": "Action that reduces a risk without eliminating it: a compensating control, a workaround, a temporary block. Distinct from remediation, which fixes the underlying issue.",
    "source": "clear"
  },
  "Mobile Malware": {
    "term": "Mobile Malware",
    "definition": "Malware targeting mobile devices, often distributed via malicious apps or phishing links. Includes SMS stealers, fake banking apps, mobile RATs.",
    "source": "bad-term"
  },
  "Model Training": {
    "term": "Model Training",
    "definition": "The process of teaching a machine learning model to recognize patterns using labeled data.",
    "source": "clear"
  },
  "Mshta.exe": {
    "term": "Mshta.exe",
    "definition": "A Windows utility for executing Microsoft HTML Applications, sometimes exploited by attackers.",
    "source": "clear"
  },
  "Multi-Cloud Environment": {
    "term": "Multi-Cloud Environment",
    "definition": "Infrastructure utilizing multiple cloud service providers, introducing complex security challenges in maintaining consistent security controls and visibility.",
    "source": "clear"
  },
  "Multi-Factor Authentication (MFA)": {
    "term": "Multi-Factor Authentication (MFA)",
    "definition": "Security system requiring two or more verification methods to grant access, combining something you know, have, or are.",
    "source": "clear"
  },
  "NCSC (UK)": {
    "term": "NCSC (UK)",
    "definition": "UK National Cyber Security Centre; guidance, threat intelligence, and IR services across public and private sectors.",
    "source": "cat-tool"
  },
  "NIDS (concept)": {
    "term": "NIDS (concept)",
    "definition": "Network intrusion detection: inspects traffic for signatures, protocol anomalies, and behavioral indicators.",
    "source": "cat-tool"
  },
  "NTLM Relay": {
    "term": "NTLM Relay",
    "definition": "Intercepting and relaying NTLM authentication messages to access resources without knowing the user's password.",
    "source": "bad-term"
  },
  "Nessus (Tenable)": {
    "term": "Nessus (Tenable)",
    "definition": "Vulnerability scanner with authenticated/unauthenticated scans and compliance framework support.",
    "source": "cat-tool"
  },
  "Nested Data": {
    "term": "Nested Data",
    "definition": "Data structures where elements contain other data structures, common in logs and JSON.",
    "source": "clear"
  },
  "NetFlow": {
    "term": "NetFlow",
    "definition": "Cisco-developed protocol for flow-based monitoring and anomaly detection; metadata about traffic sessions.",
    "source": "cat-tool"
  },
  "Network": {
    "term": "Network",
    "definition": "A collection of interconnected devices, systems, or servers that communicate with each other.",
    "source": "clear"
  },
  "Network Access Control (NAC)": {
    "term": "Network Access Control (NAC)",
    "definition": "Security solutions that enforce policies on devices trying to access a network.",
    "source": "clear"
  },
  "Network Segmentation": {
    "term": "Network Segmentation",
    "definition": "The division of a network into smaller, isolated segments to improve security and reduce the attack surface.",
    "source": "clear"
  },
  "Network Traffic": {
    "term": "Network Traffic",
    "definition": "The flow of data between devices, systems, or servers on a network.",
    "source": "clear"
  },
  "Nexpose (Rapid7)": {
    "term": "Nexpose (Rapid7)",
    "definition": "Vulnerability management with dynamic scans and exploitability-based prioritization; pairs with Metasploit.",
    "source": "cat-tool"
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
    "definition": "Network discovery and security auditing with rich NSE scripting for service detection.",
    "source": "cat-tool"
  },
  "Node": {
    "term": "Node",
    "definition": "A device or system that is connected to a network.",
    "source": "clear"
  },
  "Node.js": {
    "term": "Node.js",
    "definition": "Event-driven JavaScript runtime on V8; backend services, APIs, automation scripts, and tooling.",
    "source": "cat-tool"
  },
  "Normalization": {
    "term": "Normalization",
    "definition": "The process of transforming data into a standard format to improve analysis and comparison.",
    "source": "clear"
  },
  "NotPetya": {
    "term": "NotPetya",
    "definition": "Destructive cyberattack masquerading as ransomware, attributed to Russia's GRU Sandworm. Spread via a compromised update to Ukrainian accounting software (MeDoc), then jumped globally. Irreversibly wiped disks despite the ransom note. Maersk, Merck, FedEx among the victims. Billions in damages and a defining case study in supply-chain abuse.",
    "source": "bad-campaign"
  },
  "OPM breach": {
    "term": "OPM breach",
    "definition": "2015 breach compromising SF-86 background investigation records (and fingerprints) for 21+ million U.S. federal personnel. Attributed to Chinese state-sponsored actors. A goldmine for counterintelligence. Major reforms in U.S. government cybersecurity practices and incident response readiness followed.",
    "source": "bad-campaign"
  },
  "OSA Model": {
    "term": "OSA Model",
    "definition": "Open Security Architecture model used for designing security frameworks.",
    "source": "clear"
  },
  "OWASP ZAP": {
    "term": "OWASP ZAP",
    "definition": "Free, open-source web app security testing with automated and manual capabilities.",
    "source": "cat-tool"
  },
  "Obfuscation": {
    "term": "Obfuscation",
    "definition": "Techniques used to make code, commands, or data difficult to understand or detect, used both by attackers and legitimately for IP protection.",
    "source": "clear"
  },
  "Okta": {
    "term": "Okta",
    "definition": "Identity platform with SSO, MFA, lifecycle management, and federation across thousands of apps.",
    "source": "cat-tool"
  },
  "Okta support-system breach": {
    "term": "Okta support-system breach",
    "definition": "October 2023 intrusion of Okta's customer support case-management system. Attackers used a service-account credential found in a Google account session to access HAR files customers had uploaded for troubleshooting, HAR files that contained valid session cookies. Drove home that \"support\" surfaces handle production credentials and need the same identity-provider rigor as the products themselves.",
    "source": "bad-campaign"
  },
  "One Identity": {
    "term": "One Identity",
    "definition": "IGA with lifecycle, RBAC, privileged access governance; unifies AD, Azure AD, and cloud platform identity.",
    "source": "cat-tool"
  },
  "OpenC2": {
    "term": "OpenC2",
    "definition": "An open standard for command and control of cyber defense components.",
    "source": "clear"
  },
  "Operation Aurora": {
    "term": "Operation Aurora",
    "definition": "2009–2010 China-attributed intrusions targeting Google, Adobe, and dozens of others. Zero-day in Internet Explorer used to deploy backdoors and steal source code and IP. Google's public disclosure was a turning point in public discussion of state-sponsored industrial espionage and APTs.",
    "source": "bad-campaign"
  },
  "Operation ShadowHammer": {
    "term": "Operation ShadowHammer",
    "definition": "2019 supply-chain compromise of the ASUS software update utility. Compromised updates were signed and shipped from ASUS's own servers, reaching hundreds of thousands. Payload activated only on specific targets, suggesting selective espionage. Stolen certificates plus supply-chain trust. Linked to nation-state-capable APT activity.",
    "source": "bad-campaign"
  },
  "Oracle Cluster File System (OCFS)": {
    "term": "Oracle Cluster File System (OCFS)",
    "definition": "A shared file system used in clustered environments.",
    "source": "clear"
  },
  "Orca Security": {
    "term": "Orca Security",
    "definition": "Agentless cloud security; full-stack visibility, vulnerability management, and risk prioritization across cloud workloads.",
    "source": "cat-tool"
  },
  "Organizationally Unique Identifier (OUI)": {
    "term": "Organizationally Unique Identifier (OUI)",
    "definition": "The first 24 bits of a MAC address that identify the manufacturer.",
    "source": "clear"
  },
  "Orphaned Credentials": {
    "term": "Orphaned Credentials",
    "definition": "Access credentials no longer associated with an active user or process, posing a security risk.",
    "source": "clear"
  },
  "Oxygen Forensic Detective": {
    "term": "Oxygen Forensic Detective",
    "definition": "Mobile, cloud, drone, and IoT forensics with deep parsing of app data including secure messengers.",
    "source": "cat-tool"
  },
  "Packet Capture Files (PCAP)": {
    "term": "Packet Capture Files (PCAP)",
    "definition": "Files used to record network traffic for analysis.",
    "source": "clear"
  },
  "Parent PID Spoofing": {
    "term": "Parent PID Spoofing",
    "definition": "Spawns processes that appear to be launched by trusted executables (like explorer.exe ), misleading analysts and EDR.",
    "source": "bad-term"
  },
  "Parsing": {
    "term": "Parsing",
    "definition": "The process of analyzing data structures or code to extract meaningful information.",
    "source": "clear"
  },
  "Pass-The-Hash": {
    "term": "Pass-The-Hash",
    "definition": "An attack technique that allows an attacker to authenticate to a remote server/service using the underlying NTLM or LM hash of a user's password instead of the password itself.",
    "source": "clear"
  },
  "Pass-the-Hash": {
    "term": "Pass-the-Hash",
    "definition": "The attacker never needs the plaintext password. The NTLM hash from host A authenticates against host B because the protocol treats the hash as the credential. Silent, irreversible until the password is rotated, and the backbone of many lateral-movement campaigns.",
    "source": "bad-feature"
  },
  "Pass-the-Ticket": {
    "term": "Pass-the-Ticket",
    "definition": "Kerberos analog of pass-the-hash. The attacker presents a stolen TGT (Ticket Granting Ticket) or TGS (Ticket Granting Service ticket) to authenticate as that identity against any service in the realm, without ever needing the user's password. Often paired with Mimikatz extraction of LSASS memory. MITRE T1550.003.",
    "source": "clear"
  },
  "Password": {
    "term": "Password",
    "definition": "A secret word or phrase used to authenticate a user or system.",
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
  "Patch Management": {
    "term": "Patch Management",
    "definition": "The process of applying updates and fixes to software and systems to repair vulnerabilities and improve security.",
    "source": "clear"
  },
  "Payload Deployment": {
    "term": "Payload Deployment",
    "definition": "The delivery and installation of malicious software, tools, or scripts intended to perform an attacker's objectives.",
    "source": "bad-term"
  },
  "Payment Card Industry Data Security Standard (PCI DSS)": {
    "term": "Payment Card Industry Data Security Standard (PCI DSS)",
    "definition": "Security standards designed to ensure companies that accept, process, store, or transmit credit card information maintain a secure environment.",
    "source": "clear"
  },
  "Peer Validation": {
    "term": "Peer Validation",
    "definition": "A method of verifying information or alerts through cross-checking with other sources.",
    "source": "clear"
  },
  "Peer-to-Peer (P2P) C2": {
    "term": "Peer-to-Peer (P2P) C2",
    "definition": "Mesh-like networks where infected systems communicate with each other to share commands and updates without a centralized server.",
    "source": "bad-term"
  },
  "Pelco": {
    "term": "Pelco",
    "definition": "Surveillance cameras, recorders, and VideoXpert management; rugged builds for outdoor and industrial use.",
    "source": "cat-tool"
  },
  "Penetration Testing": {
    "term": "Penetration Testing",
    "definition": "A simulated attack on a system or network to test its defenses and identify vulnerabilities.",
    "source": "clear"
  },
  "Permission Mapping": {
    "term": "Permission Mapping",
    "definition": "The process of correlating user roles with their granted permissions.",
    "source": "clear"
  },
  "Persistence": {
    "term": "Persistence",
    "definition": "Mechanisms an adversary installs so their access survives reboots, password resets, and partial cleanups: Run keys, scheduled tasks, services, WMI subscriptions, browser extensions. Mature operators plant several anchors so removing one is not enough.",
    "source": "clear"
  },
  "Personally Identifiable Information (PII)": {
    "term": "Personally Identifiable Information (PII)",
    "definition": "Data that can uniquely identify an individual.",
    "source": "clear"
  },
  "PhishTank": {
    "term": "PhishTank",
    "definition": "Community-validated database of phishing URLs; supplies security tools and browsers with up-to-date intelligence.",
    "source": "cat-tool"
  },
  "Phishing": {
    "term": "Phishing",
    "definition": "Deceptive messages (usually email; sometimes SMS, voice, or chat) that impersonate a trusted sender to lure the recipient into clicking, opening, or entering credentials. The bait is the email; the line is the impersonation; the catch is initial access.",
    "source": "clear"
  },
  "Ping Identity": {
    "term": "Ping Identity",
    "definition": "Cloud-first identity for SSO, MFA, and customer IAM; strong hybrid and multi-cloud support. Absorbed ForgeRock (acquired by Thoma Bravo, 2023) and now ships its enterprise IAM lifecycle and governance products under the Ping brand.",
    "source": "cat-tool"
  },
  "Polymorphic Malware": {
    "term": "Polymorphic Malware",
    "definition": "Malicious software that constantly changes its identifiable features to avoid detection by traditional signature-based security tools.",
    "source": "clear"
  },
  "Port": {
    "term": "Port",
    "definition": "A communication endpoint used by protocols to send and receive data.",
    "source": "clear"
  },
  "Post-Exploitation": {
    "term": "Post-Exploitation",
    "definition": "The phase where the attacker explores the environment, escalates access, exfiltrates data, or sets up long-term control.",
    "source": "bad-term"
  },
  "Post-Mortem": {
    "term": "Post-Mortem",
    "definition": "The structured retrospective an organization runs after a closed incident: timeline, decisions, what worked, what failed, what the team learned. A good post-mortem points back at detection, process, or training gaps. A blameless one names the system, not the person.",
    "source": "clear"
  },
  "PowerShell": {
    "term": "PowerShell",
    "definition": "A command-line shell and scripting language built on the .NET framework, commonly used for system administration and potentially for malicious purposes.",
    "source": "clear"
  },
  "Pre-Exploitation": {
    "term": "Pre-Exploitation",
    "definition": "The reconnaissance and scanning phase, where attackers gather intelligence and identify vulnerabilities before launching an attack.",
    "source": "bad-term"
  },
  "Prisma Cloud": {
    "term": "Prisma Cloud",
    "definition": "Cloud-native security platform from Palo Alto Networks; workload protection, IaC scanning, compliance, runtime defense.",
    "source": "cat-tool"
  },
  "Privilege Chaining": {
    "term": "Privilege Chaining",
    "definition": "The sequential use of multiple smaller privilege escalations or credential compromises to progressively gain more powerful access.",
    "source": "bad-term"
  },
  "Privilege Escalation": {
    "term": "Privilege Escalation",
    "definition": "Gaining access at a higher trust level than the actor originally held, by any means: exploiting a bug, abusing a misconfiguration, stealing credentials, impersonating a token, or socially engineering an elevation.",
    "source": "clear"
  },
  "Privileged Access Management (PAM)": {
    "term": "Privileged Access Management (PAM)",
    "definition": "Technologies that control and monitor access to critical accounts.",
    "source": "clear"
  },
  "Process": {
    "term": "Process",
    "definition": "A series of actions or steps taken to achieve a specific goal or task.",
    "source": "clear"
  },
  "Process Doppelganging": {
    "term": "Process Doppelganging",
    "definition": "Exploiting Windows transaction mechanisms to execute malicious code under the guise of a legitimate process without modifying the original executable on disk.",
    "source": "bad-term"
  },
  "Process Hollowing": {
    "term": "Process Hollowing",
    "definition": "A legitimate process is created suspended, its memory replaced with malicious code, then resumed under the guise of a trusted process.",
    "source": "bad-term"
  },
  "Process Masquerading": {
    "term": "Process Masquerading",
    "definition": "Altering the name or appearance of a malicious process to mimic legitimate system processes, evading detection.",
    "source": "bad-term"
  },
  "Process Relationships": {
    "term": "Process Relationships",
    "definition": "The connections and interactions between different processes running on a system, including parent-child relationships and inter-process communication.",
    "source": "clear"
  },
  "Proofpoint Identity Threat Defense (formerly Illusive)": {
    "term": "Proofpoint Identity Threat Defense (formerly Illusive)",
    "definition": "Deception-based identity-threat detection. Plants fake credentials and decoy paths to surface attacker lateral movement. Illusive Networks acquired by Proofpoint, 2022.",
    "source": "cat-tool"
  },
  "Protected Health Information (PHI)": {
    "term": "Protected Health Information (PHI)",
    "definition": "Any information about health status, provision of care, or payment.",
    "source": "clear"
  },
  "Protocol": {
    "term": "Protocol",
    "definition": "A set of rules and standards that govern communication between devices, systems, or networks.",
    "source": "clear"
  },
  "Protocol Tunneling": {
    "term": "Protocol Tunneling",
    "definition": "Encapsulates malicious traffic within legitimate protocols (HTTPS, DNS, ICMP) to bypass network detection.",
    "source": "bad-term"
  },
  "ProxyShell": {
    "term": "ProxyShell",
    "definition": "Three chained Exchange vulnerabilities (CVE-2021-34473, -34523, -31207) allowing unauthenticated SYSTEM-level RCE. AutoDiscover and PowerShell endpoint abuse. Mass exploitation after Black Hat 2021 demo, web shells and ransomware staging.",
    "source": "bad-term"
  },
  "Puppet Enterprise": {
    "term": "Puppet Enterprise",
    "definition": "Config management automating patching and continuous compliance through code-defined policies.",
    "source": "cat-tool"
  },
  "Python": {
    "term": "Python",
    "definition": "High-level language ubiquitous in security tooling, automation, data analysis, and ML.",
    "source": "cat-tool"
  },
  "Qakbot (Qbot)": {
    "term": "Qakbot (Qbot)",
    "definition": "Multifunctional banking Trojan and malware dropper that evolved into a full-featured loader. Email-thread hijacking for phishing. Persistence, network discovery, credential harvesting, encrypted C2. Cornerstone of many enterprise compromises. Coordinated international disruption in 2023, but variants may persist.",
    "source": "bad-family"
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
  "RDP Pivoting": {
    "term": "RDP Pivoting",
    "definition": "Gains access via Remote Desktop Protocol, then uses it to move laterally or reach other internal assets.",
    "source": "bad-term"
  },
  "Rainbow Table": {
    "term": "Rainbow Table",
    "definition": "Precomputed table of hash values used to reverse cryptographic hashes, recovering plaintext passwords more efficiently.",
    "source": "bad-term"
  },
  "Ransomware": {
    "term": "Ransomware",
    "definition": "Malicious software that encrypts a victim's files and demands payment (usually cryptocurrency) for the decryption key. Modern ransomware operations typically pair encryption with data theft, threatening public release if the ransom is not paid (double extortion).",
    "source": "clear"
  },
  "Recorded Future": {
    "term": "Recorded Future",
    "definition": "Threat-intelligence platform combining machine learning with human analysis across open, dark, and technical sources.",
    "source": "cat-tool"
  },
  "RedLine": {
    "term": "RedLine",
    "definition": "Infostealer sold on underground forums. Harvests credentials, browser data, cryptocurrency wallets, and system information. Distributed via cracked software, malvertising, phishing, and fake installers. JSON-over-HTTP/S C2. Customizable and affordable; popular among low-skill actors and initial-access brokers.",
    "source": "bad-family"
  },
  "Reflective DLL Injection": {
    "term": "Reflective DLL Injection",
    "definition": "Stealthier DLL injection where the DLL loads itself into memory without touching disk, helping evade antivirus detection.",
    "source": "bad-term"
  },
  "Regsvr32.exe": {
    "term": "Regsvr32.exe",
    "definition": "A Windows utility used to register and unregister DLLs, sometimes exploited by malware.",
    "source": "clear"
  },
  "Regulatory Compliance": {
    "term": "Regulatory Compliance",
    "definition": "Adherence to laws, regulations, and standards governing data protection, privacy, and security requirements for specific industries or data types.",
    "source": "clear"
  },
  "Regulatory Requirements": {
    "term": "Regulatory Requirements",
    "definition": "Laws and policies organizations must follow to ensure compliance and security.",
    "source": "clear"
  },
  "Relationship Mapping": {
    "term": "Relationship Mapping",
    "definition": "The process of identifying and visualizing connections between entities like users, systems, or processes.",
    "source": "clear"
  },
  "Reliability Assessment": {
    "term": "Reliability Assessment",
    "definition": "Evaluating the trustworthiness and accuracy of security data or alerts.",
    "source": "clear"
  },
  "Remote Access Trojan (RAT)": {
    "term": "Remote Access Trojan (RAT)",
    "definition": "Malware that masquerades as legitimate software and, once installed, gives the operator interactive remote control of the host. The trojan delivery is load-bearing: the user runs it willingly. Common capabilities include keylogging, screen capture, file transfer, and webcam access.",
    "source": "bad-term"
  },
  "Remote Execution": {
    "term": "Remote Execution",
    "definition": "Running commands or malicious code on a target system from a remote location, often via exploits or administrative tools.",
    "source": "bad-term"
  },
  "Request for Comments (RFC)": {
    "term": "Request for Comments (RFC)",
    "definition": "A series of documents that define internet standards and protocols.",
    "source": "clear"
  },
  "Resource Allocation": {
    "term": "Resource Allocation",
    "definition": "Assigning personnel, tools, and time to address security tasks or incidents.",
    "source": "clear"
  },
  "Return on Investment (ROI)": {
    "term": "Return on Investment (ROI)",
    "definition": "Analysis of security investments comparing the cost of security controls against potential losses from security incidents.",
    "source": "clear"
  },
  "Risk": {
    "term": "Risk",
    "definition": "Impact times likelihood, weighted by the analyst's confidence in the evidence. Risk is what turns a finding into a prioritized response; it's the verdict the rest of the team acts on.",
    "source": "clear"
  },
  "Risk Appetite": {
    "term": "Risk Appetite",
    "definition": "The amount of risk an organization is willing to accept in pursuit of objectives.",
    "source": "clear"
  },
  "Risk Assessment": {
    "term": "Risk Assessment",
    "definition": "Systematic process of evaluating potential risks to system and data security, including likelihood and impact analysis.",
    "source": "clear"
  },
  "Risk Management": {
    "term": "Risk Management",
    "definition": "The process of mitigating, transferring, or accepting risk to minimize its impact on an organization.",
    "source": "clear"
  },
  "Risk Profile": {
    "term": "Risk Profile",
    "definition": "An assessment of risks associated with assets, users, or processes.",
    "source": "clear"
  },
  "Risk-Based Alert Triage Matrix": {
    "term": "Risk-Based Alert Triage Matrix",
    "definition": "A tool to prioritize alerts based on risk factors to improve response effectiveness.",
    "source": "clear"
  },
  "Role-Based Access Control (RBAC)": {
    "term": "Role-Based Access Control (RBAC)",
    "definition": "A model that assigns permissions based on user roles.",
    "source": "clear"
  },
  "Root Cause Analysis": {
    "term": "Root Cause Analysis",
    "definition": "The process of identifying the underlying cause of a security incident or problem.",
    "source": "clear"
  },
  "Rootkits": {
    "term": "Rootkits",
    "definition": "Malware that hides its presence by subverting the OS or using kernel-level access. Often combined with other malware to maintain stealth and persistence.",
    "source": "bad-term"
  },
  "Router": {
    "term": "Router",
    "definition": "A device that forwards data packets between networks.",
    "source": "clear"
  },
  "Rubrik": {
    "term": "Rubrik",
    "definition": "Cloud-native data management; instant recovery, immutable backups, and ransomware detection.",
    "source": "cat-tool"
  },
  "Rule-Based Detection": {
    "term": "Rule-Based Detection",
    "definition": "Security monitoring approach using predefined rules to identify suspicious or malicious activity based on specific conditions or patterns.",
    "source": "clear"
  },
  "Rundll32.exe": {
    "term": "Rundll32.exe",
    "definition": "A Windows utility that executes functions in DLL files, sometimes used maliciously.",
    "source": "clear"
  },
  "Ryuk": {
    "term": "Ryuk",
    "definition": "High-impact ransomware operated by Wizard Spider, typically delivered via TrickBot or BazarLoader. AES/RSA file encryption. Targets hospitals, municipalities, critical infrastructure. Fast encryption, kills backup and recovery processes. Operators are believed to overlap heavily with the subsequent Conti operation, which is generally treated as the successor brand.",
    "source": "bad-family"
  },
  "SANS Institute": {
    "term": "SANS Institute",
    "definition": "Training, certification, and research; publishes critical threat research and runs the Internet Storm Center.",
    "source": "cat-tool"
  },
  "SIEM (concept)": {
    "term": "SIEM (concept)",
    "definition": "Aggregation and correlation of security event data for centralized detection, compliance, and IR.",
    "source": "cat-tool"
  },
  "SMB Relay": {
    "term": "SMB Relay",
    "definition": "Like NTLM Relay, but specifically targeting Server Message Block to relay authentication requests.",
    "source": "bad-term"
  },
  "SOAR (concept)": {
    "term": "SOAR (concept)",
    "definition": "Security orchestration, automation, and response: define, automate, and orchestrate IR workflows at scale.",
    "source": "cat-tool"
  },
  "SQL Injection": {
    "term": "SQL Injection",
    "definition": "Code injection where malicious SQL is inserted into input fields to manipulate backend databases.",
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
  "Sandbox / Environment Detection": {
    "term": "Sandbox / Environment Detection",
    "definition": "Most sandboxes are not very lived-in. They have small disks, brief uptime, no mouse activity, suspicious driver names, and known artifacts. Malware that runs the checks above will sit silent in analysis, then unfurl on a real user's host.",
    "source": "bad-feature"
  },
  "Sandbox Escape": {
    "term": "Sandbox Escape",
    "definition": "An attack that breaks out of a restricted environment (container, VM, or sandbox) to reach the underlying host. The container variant is ATT&CK T1611, Escape to Host.",
    "source": "bad-term"
  },
  "Sandboxing": {
    "term": "Sandboxing",
    "definition": "Detonating an unknown file or URL inside an isolated environment to observe what it does. Mature malware checks for sandbox-typical signals (small disk, brief uptime, no mouse activity, suspicious driver names) and stays dormant until it sees a real host.",
    "source": "clear"
  },
  "Sandworm GRU / destructive ops": {
    "term": "Sandworm GRU / destructive ops",
    "definition": "Destructive GRU unit behind the 2015 / 2016 Ukraine power grid attacks (BlackEnergy, Industroyer) and the global NotPetya wiper. Tools include VPNFilter, KillDisk, Cyclops Blink. Specializes in ICS/OT disruption, hybrid warfare, and psychological operations. Aligned with Russian military objectives.",
    "source": "bad-actor"
  },
  "Sarbanes-Oxley Act (SOX)": {
    "term": "Sarbanes-Oxley Act (SOX)",
    "definition": "A law that regulates financial reporting and corporate governance in the United States.",
    "source": "clear"
  },
  "Scareware": {
    "term": "Scareware",
    "definition": "Software that tricks users into believing their device is infected, pressuring them to buy fake antivirus tools. Often a social-engineering precursor to real malware.",
    "source": "bad-term"
  },
  "Scattered Spider identity-first intrusion": {
    "term": "Scattered Spider identity-first intrusion",
    "definition": "Native-English-speaking group (UNC3944 / Octo Tempest) behind the 2023 MGM and Caesars intrusions. The defining identity-attack playbook: help-desk social engineering, SIM swapping, MFA fatigue, AiTM phishing kits, then abuse of the victim's own IdP and cloud tooling. Overlaps with the loose \"The Com\" ecosystem; later partnered with RaaS operations for encryption. The actor profile most relevant to SSO-era triage.",
    "source": "bad-actor"
  },
  "Schema Normalization": {
    "term": "Schema Normalization",
    "definition": "The process of organizing data into a structured format to reduce redundancy and improve analysis.",
    "source": "clear"
  },
  "Scope": {
    "term": "Scope",
    "definition": "The defined boundaries of a security investigation or incident response, including affected systems, timeframes, and areas of concern.",
    "source": "clear"
  },
  "Scope Creep": {
    "term": "Scope Creep",
    "definition": "Uncontrolled expansion of an incident investigation beyond its initial parameters, potentially consuming excessive resources without proportional benefit.",
    "source": "clear"
  },
  "Scope Drift": {
    "term": "Scope Drift",
    "definition": "Gradual deviation from the original scope or objectives over time.",
    "source": "clear"
  },
  "Secure Email Gateways (SEG)": {
    "term": "Secure Email Gateways (SEG)",
    "definition": "Security solutions that filter and protect email communications from threats.",
    "source": "clear"
  },
  "Secure Hash Algorithm (SHA)": {
    "term": "Secure Hash Algorithm (SHA)",
    "definition": "A family of cryptographic hash functions used for data integrity.",
    "source": "clear"
  },
  "Secure Shell (SSH)": {
    "term": "Secure Shell (SSH)",
    "definition": "A protocol for secure remote login and command execution.",
    "source": "clear"
  },
  "Secure Sockets Layer (SSL)": {
    "term": "Secure Sockets Layer (SSL)",
    "definition": "A deprecated protocol for encrypting internet communications, replaced by TLS.",
    "source": "clear"
  },
  "Security Control": {
    "term": "Security Control",
    "definition": "A measure or mechanism used to prevent, detect, or respond to a security threat or incident.",
    "source": "clear"
  },
  "Security In Depth": {
    "term": "Security In Depth",
    "definition": "A layered security approach that combines multiple controls to protect assets.",
    "source": "clear"
  },
  "Security Information and Event Management (SIEM)": {
    "term": "Security Information and Event Management (SIEM)",
    "definition": "Platform that collects, aggregates, and analyzes security data from multiple sources to provide real-time monitoring, correlation, and incident response capabilities.",
    "source": "clear"
  },
  "Security Operations": {
    "term": "Security Operations",
    "definition": "The people, processes, and technology responsible for monitoring, detecting, investigating, and responding to security threats within an organization.",
    "source": "clear"
  },
  "Security Orchestration, Automation, and Response (SOAR)": {
    "term": "Security Orchestration, Automation, and Response (SOAR)",
    "definition": "Platforms that codify SOC workflows into playbooks: enrich an alert, query telemetry, look up an indicator, open a case, page on-call. SOAR makes the repetitive parts of triage repeatable.",
    "source": "clear"
  },
  "Sender Policy Framework (SPF)": {
    "term": "Sender Policy Framework (SPF)",
    "definition": "An email validation protocol to prevent sender address forgery.",
    "source": "clear"
  },
  "Sensitive Data": {
    "term": "Sensitive Data",
    "definition": "Information that is confidential, proprietary, or regulated, such as personal data, financial information, or intellectual property.",
    "source": "clear"
  },
  "Sensitive Data in Transit": {
    "term": "Sensitive Data in Transit",
    "definition": "Data intercepted while being transmitted across a network without proper encryption or integrity checks, vulnerable to MITM or sniffing.",
    "source": "bad-term"
  },
  "SentinelOne": {
    "term": "SentinelOne",
    "definition": "Unified EPP/EDR with behavioral AI, autonomous response, rollback on Windows, and threat-hunting telemetry.",
    "source": "cat-tool"
  },
  "Separation of Duties": {
    "term": "Separation of Duties",
    "definition": "A control to prevent fraud by dividing responsibilities among multiple people.",
    "source": "clear"
  },
  "Server": {
    "term": "Server",
    "definition": "A computer or device that provides services, resources, or data to other devices or systems on a network.",
    "source": "clear"
  },
  "Server Message Block (SMB)": {
    "term": "Server Message Block (SMB)",
    "definition": "A network protocol for sharing files and printers.",
    "source": "clear"
  },
  "Serverless Functions": {
    "term": "Serverless Functions",
    "definition": "Cloud-computing execution model where cloud providers manage infrastructure, presenting unique security monitoring and access control challenges.",
    "source": "clear"
  },
  "ServiceNow SecOps": {
    "term": "ServiceNow SecOps",
    "definition": "ITSM and security workflow with ticketing, change management, CMDB integration, and security automation.",
    "source": "cat-tool"
  },
  "Session Hijack": {
    "term": "Session Hijack",
    "definition": "Taking over an active session by stealing or guessing session tokens or cookies, bypassing authentication.",
    "source": "bad-term"
  },
  "Shadow Data": {
    "term": "Shadow Data",
    "definition": "Sensitive or regulated data stored in unmanaged, forgotten, or unsanctioned locations, abandoned cloud buckets, rogue spreadsheets, old backups.",
    "source": "bad-term"
  },
  "Shamoon": {
    "term": "Shamoon",
    "definition": "Destructive wiper associated with Iranian state-sponsored actors. Infamous for the 2012 attack on Saudi Aramco that wiped roughly 30,000 machines; returned in 2016-2017 (\"Shamoon 2\") against other Saudi organizations, including the General Authority of Civil Aviation. Overwrites MBR with provocative imagery, renders devices inoperable. Spreads via stolen credentials and admin shares. Primary goal is destruction, not financial gain.",
    "source": "bad-family"
  },
  "Shellshock (CVE-2014-6271)": {
    "term": "Shellshock (CVE-2014-6271)",
    "definition": "GNU Bash flaw allowing arbitrary command execution via environment variables. Especially dangerous through CGI scripts. Affected web servers, routers, IoT. Exploits appeared within hours of disclosure. Drove broad review of UNIX-based software.",
    "source": "bad-term"
  },
  "Shodan": {
    "term": "Shodan",
    "definition": "Search engine for internet-connected devices; identifies exposed services, outdated software, ICS, IoT.",
    "source": "cat-tool"
  },
  "Side-Loading": {
    "term": "Side-Loading",
    "definition": "A technique where attackers exploit legitimate applications to load malicious DLLs or code, often bypassing security controls.",
    "source": "clear"
  },
  "Sideloading": {
    "term": "Sideloading",
    "definition": "Loading and executing a malicious DLL or module through a legitimate application to bypass security controls.",
    "source": "bad-term"
  },
  "Signature Database": {
    "term": "Signature Database",
    "definition": "A repository of known threat signatures used by security tools.",
    "source": "clear"
  },
  "Signature Management": {
    "term": "Signature Management",
    "definition": "The process of updating and maintaining detection signatures in security systems.",
    "source": "clear"
  },
  "Signature-Based Detection": {
    "term": "Signature-Based Detection",
    "definition": "Security method that identifies threats by matching observed activity against a database of known malicious patterns or signatures.",
    "source": "clear"
  },
  "Signed Binary Proxy Execution": {
    "term": "Signed Binary Proxy Execution",
    "definition": "Executes malicious code through trusted signed binaries ( rundll32 , regsvr32 ), exploiting inherent trust.",
    "source": "bad-term"
  },
  "Silver Ticket Attack": {
    "term": "Silver Ticket Attack",
    "definition": "Similar to Golden Ticket but targets Kerberos Service Tickets (TGS), giving access to specific services within a domain.",
    "source": "bad-term"
  },
  "SilverTerrier Nigerian BEC": {
    "term": "SilverTerrier Nigerian BEC",
    "definition": "Collective term for Nigerian actors conducting Business Email Compromise fraud. Less technically advanced than APTs but highly profitable. Phishing, credential theft, social engineering to divert funds from corporate communications. Many actors operate openly on social media. Hundreds of arrests, but the group continues to evolve.",
    "source": "bad-actor"
  },
  "Single Sign-On (SSO)": {
    "term": "Single Sign-On (SSO)",
    "definition": "An authentication process allowing a user to access multiple systems with one set of credentials.",
    "source": "clear"
  },
  "Slack-based C2": {
    "term": "Slack-based C2",
    "definition": "Abuse of Slack's APIs, webhooks, or tokens to create covert C2 by embedding commands or exfiltrated data within messages or bots.",
    "source": "bad-term"
  },
  "Snort": {
    "term": "Snort",
    "definition": "Open-source NIDS with deep packet inspection and a large community rule set maintained by Cisco Talos.",
    "source": "cat-tool"
  },
  "Snowflake customer-account theft": {
    "term": "Snowflake customer-account theft",
    "definition": "April–June 2024. A threat group later tracked as UNC5537 used credentials harvested from infostealer logs to access Snowflake customer environments that had no MFA configured. Victims included Ticketmaster, Santander, AT&T, LendingTree. Not a Snowflake CVE, a customer-side identity hygiene failure at scale. Drove the industry-wide push for MFA-mandatory cloud SaaS access.",
    "source": "bad-campaign"
  },
  "Social Engineering": {
    "term": "Social Engineering",
    "definition": "Manipulating people into divulging confidential information or performing actions that compromise security.",
    "source": "clear"
  },
  "Social Media C2": {
    "term": "Social Media C2",
    "definition": "Using Twitter, Facebook, Instagram to post encoded commands or retrieve data via posts, images, or profiles on trusted domains.",
    "source": "bad-term"
  },
  "SolarWinds Patch Manager": {
    "term": "SolarWinds Patch Manager",
    "definition": "Centralized patching for Windows and third-party apps; integrates with WSUS and Microsoft Configuration Manager (MECM/SCCM).",
    "source": "cat-tool"
  },
  "SolarWinds SUNBURST": {
    "term": "SolarWinds SUNBURST",
    "definition": "Late-2020 supply-chain compromise of SolarWinds Orion. Trojanized update gave APT29 / UNC2452 backdoor access to thousands of customers including U.S. government agencies and Fortune 500 firms. Stealthy command-and-control, lateral movement, and data exfiltration over months. Reshaped trust assumptions around software vendors.",
    "source": "bad-campaign"
  },
  "Sony Pictures hack": {
    "term": "Sony Pictures hack",
    "definition": "2014 destructive attack attributed to North Korea's Lazarus Group, reportedly in retaliation for The Interview. Wiper malware, leaked unreleased films, and exposed executive communications. Blended political retaliation, information warfare, and corporate sabotage. First high-profile nation-state attack on a private company over content.",
    "source": "bad-campaign"
  },
  "Sophos Intercept X": {
    "term": "Sophos Intercept X",
    "definition": "Next-gen AV plus EDR with deep learning and exploit prevention; strong investigation tools for SMB and enterprise.",
    "source": "cat-tool"
  },
  "Spear Phishing": {
    "term": "Spear Phishing",
    "definition": "Targeted phishing customized for a specific individual or organization to increase success rate.",
    "source": "bad-term"
  },
  "Spectre / Meltdown": {
    "term": "Spectre / Meltdown",
    "definition": "Hardware vulnerabilities affecting modern microprocessors. Exploit speculative execution to leak memory across trust boundaries. Affect Intel, AMD, ARM chips. Required firmware and software mitigations. Paradigm shift in how hardware-level trust boundaries are viewed.",
    "source": "bad-term"
  },
  "Splunk Enterprise Security": {
    "term": "Splunk Enterprise Security",
    "definition": "Premium SIEM on the Splunk platform; correlation searches, ML, prebuilt content for SOC workflows.",
    "source": "cat-tool"
  },
  "Splunk SOAR (formerly Splunk Phantom)": {
    "term": "Splunk SOAR (formerly Splunk Phantom)",
    "definition": "SOAR with Python-based playbooks, 300+ integrations, and deep Splunk analytics ties. Phantom acquired by Splunk in 2018 and renamed Splunk SOAR in 2021; Splunk itself acquired by Cisco, 2024.",
    "source": "cat-tool"
  },
  "Spoofed MACs": {
    "term": "Spoofed MACs",
    "definition": "Changes MAC addresses to impersonate other machines or confuse device-based monitoring.",
    "source": "bad-term"
  },
  "Spyware": {
    "term": "Spyware",
    "definition": "Malware that secretly monitors user activity: keystrokes, screen captures, camera or microphone access. Used for surveillance, espionage, or credential theft.",
    "source": "bad-term"
  },
  "Staged Payloads": {
    "term": "Staged Payloads",
    "definition": "A two-phase delivery process where a lightweight stager downloads and executes a more complex secondary payload.",
    "source": "bad-term"
  },
  "Statistical Models": {
    "term": "Statistical Models",
    "definition": "Mathematical models that analyze data distributions and relationships to detect anomalies or predict outcomes.",
    "source": "clear"
  },
  "Storm-0558 (Microsoft cloud email)": {
    "term": "Storm-0558 (Microsoft cloud email)",
    "definition": "July 2023 intrusion in which a China-aligned actor forged Azure AD access tokens using a stolen Microsoft consumer-MSA signing key, reading emails of ~25 organizations including U.S. State Department and Commerce officials via Outlook Web Access. The key should not have signed enterprise tokens; a validation gap let it. Reshaped how the industry talks about identity-provider key custody, token-binding, and the blast radius of a single signing key.",
    "source": "bad-campaign"
  },
  "String Concatenation": {
    "term": "String Concatenation",
    "definition": "The operation of joining two or more strings end-to-end.",
    "source": "clear"
  },
  "Structured Query Language (SQL)": {
    "term": "Structured Query Language (SQL)",
    "definition": "A programming language used to manage and manipulate data in databases.",
    "source": "clear"
  },
  "Structured Threat Information Expression (STIX)": {
    "term": "Structured Threat Information Expression (STIX)",
    "definition": "A standardized format for sharing cyber threat intelligence.",
    "source": "clear"
  },
  "Stuxnet": {
    "term": "Stuxnet",
    "definition": "Landmark cyberweapon developed jointly by the U.S. and Israel to disrupt Iran's nuclear enrichment. Multiple zero-days and PLC-specific payloads targeted Siemens controllers at Natanz. Altered centrifuge speeds while reporting normal readings. First malware known to cause real-world industrial damage. Inspired subsequent ICS-targeting malware.",
    "source": "bad-campaign"
  },
  "Subdomain Abuse": {
    "term": "Subdomain Abuse",
    "definition": "Uses legitimate-looking subdomains (e.g., cdn.dropbox.com.evil.example ) to trick filters and users.",
    "source": "bad-term"
  },
  "Subject": {
    "term": "Subject",
    "definition": "An entity, such as a user or system, that is involved in a security incident or event.",
    "source": "clear"
  },
  "Sumo Logic Cloud SOAR (formerly DFLabs IncMan)": {
    "term": "Sumo Logic Cloud SOAR (formerly DFLabs IncMan)",
    "definition": "SOAR with advanced playbooks, threat-intel enrichment, KPI tracking, and human-in-the-loop decisions. DFLabs acquired by Sumo Logic, 2021.",
    "source": "cat-tool"
  },
  "Supply Chain": {
    "term": "Supply Chain",
    "definition": "The network of organizations, people, activities, and resources involved in creating and delivering products, presenting multiple attack vectors for compromising systems or software during development and distribution.",
    "source": "clear"
  },
  "Supply Chain Compromise": {
    "term": "Supply Chain Compromise",
    "definition": "Targets third-party software or service providers to insert malicious code or access downstream victims (e.g., SolarWinds).",
    "source": "bad-term"
  },
  "Suricata": {
    "term": "Suricata",
    "definition": "Open-source NIDS/IPS with multi-threaded inspection, file extraction, TLS inspection, and JSON output.",
    "source": "cat-tool"
  },
  "Swimlane": {
    "term": "Swimlane",
    "definition": "Low-code SOAR for SOC analysts to build automation workflows without deep programming expertise.",
    "source": "cat-tool"
  },
  "Symantec (Broadcom)": {
    "term": "Symantec (Broadcom)",
    "definition": "Endpoint protection, email security, DLP, and EDR; global sensor network feeding detection and response.",
    "source": "cat-tool"
  },
  "Symantec Endpoint Management": {
    "term": "Symantec Endpoint Management",
    "definition": "Patch management, software distribution, and configuration enforcement across enterprise endpoints.",
    "source": "cat-tool"
  },
  "Sysdig": {
    "term": "Sysdig",
    "definition": "Cloud-native security focused on container runtime, Kubernetes monitoring, and cloud workload protection.",
    "source": "cat-tool"
  },
  "Syslog": {
    "term": "Syslog",
    "definition": "A standard protocol for message logging in network devices and systems.",
    "source": "clear"
  },
  "Sysmon": {
    "term": "Sysmon",
    "definition": "Windows service that produces rich endpoint telemetry, process creation, network connections, file events, for SIEM ingestion.",
    "source": "cat-tool"
  },
  "System": {
    "term": "System",
    "definition": "A collection of hardware, software, and firmware that work together to perform a specific function or task.",
    "source": "clear"
  },
  "System Binary": {
    "term": "System Binary",
    "definition": "Executable files that are part of an operating system or trusted software components.",
    "source": "clear"
  },
  "System Tampering": {
    "term": "System Tampering",
    "definition": "The unauthorized modification of system configurations, binaries, or behaviors to support attacker goals or disrupt operations.",
    "source": "bad-term"
  },
  "TA505 large-scale malware ops": {
    "term": "TA505 large-scale malware ops",
    "definition": "Prolific cybercriminal group distributing banking trojans, ransomware, and RATs globally. Frequent massive phishing waves delivering Dridex, FlawedAmmyy, Locky. Often acts as an initial-access broker for other groups. Frequently shifts tactics, payloads, and infrastructure. Exemplifies the malware-as-a-service model.",
    "source": "bad-actor"
  },
  "TCP Connection": {
    "term": "TCP Connection",
    "definition": "A network communication session established between two hosts using the Transmission Control Protocol.",
    "source": "clear"
  },
  "Tactics, Techniques, and Procedures (TTP)": {
    "term": "Tactics, Techniques, and Procedures (TTP)",
    "definition": "The behavioral patterns of a threat actor, in increasing specificity: tactics (goals), techniques (methods), and procedures (concrete implementations). Used to characterize and attribute adversary behavior across campaigns.",
    "source": "clear"
  },
  "Target breach": {
    "term": "Target breach",
    "definition": "2013 breach compromising payment data for 40 million customers and PII for 70 million more. Initial access via a compromised HVAC contractor; lateral movement to POS systems; malware on registers captured card data. A landmark for third-party risk management and network segmentation. Hundreds of millions in costs and executive resignations.",
    "source": "bad-campaign"
  },
  "Telegram Bots": {
    "term": "Telegram Bots",
    "definition": "Leveraging Telegram's bot API to issue commands or receive data, creating C2 over an encrypted, trusted messaging platform.",
    "source": "bad-term"
  },
  "Telemetry": {
    "term": "Telemetry",
    "definition": "Collection and transmission of security-relevant data from remote sources for monitoring and analysis.",
    "source": "clear"
  },
  "Temporal Relationships": {
    "term": "Temporal Relationships",
    "definition": "The timing and sequence correlations between events that help in threat detection and analysis.",
    "source": "clear"
  },
  "Tenable": {
    "term": "Tenable",
    "definition": "Vulnerability management platform; Nessus-based scanning with on-prem, cloud, and hybrid coverage.",
    "source": "cat-tool"
  },
  "TheHive Project": {
    "term": "TheHive Project",
    "definition": "Open-source IR platform with collaborative case management; integrates with Cortex for automated analysis.",
    "source": "cat-tool"
  },
  "Third-Party Data Exposure": {
    "term": "Third-Party Data Exposure",
    "definition": "Compromise or exposure of sensitive data caused by a breach, misconfiguration, or negligence on the part of an external vendor or partner.",
    "source": "bad-term"
  },
  "Thread Injection": {
    "term": "Thread Injection",
    "definition": "Injecting malicious code into a running thread of another process for stealthy execution.",
    "source": "bad-term"
  },
  "Threat": {
    "term": "Threat",
    "definition": "An actor (or capability) with intent and means to cause harm. A vulnerability is what they exploit; risk is the product of threat, vulnerability, and impact.",
    "source": "clear"
  },
  "Threat Actor": {
    "term": "Threat Actor",
    "definition": "Individual or group that conducts malicious activities targeting information systems or networks.",
    "source": "clear"
  },
  "Threat Hunting": {
    "term": "Threat Hunting",
    "definition": "Proactive analysis that starts from a hypothesis (\"if an attacker were here, what would I expect to see?\") and searches telemetry for evidence. Distinct from alert triage, which reacts to detections; hunting goes looking for what the detections missed.",
    "source": "clear"
  },
  "Threat Intelligence": {
    "term": "Threat Intelligence",
    "definition": "Evidence-based knowledge about existing or emerging threats, including context, mechanisms, indicators, implications, and actionable advice.",
    "source": "clear"
  },
  "ThreatConnect": {
    "term": "ThreatConnect",
    "definition": "Threat-intel platform with playbooks for attack simulation, response automation, and intel-driven workflows.",
    "source": "cat-tool"
  },
  "ThreatGRID (Cisco)": {
    "term": "ThreatGRID (Cisco)",
    "definition": "Cloud sandbox combining behavior analysis with threat intelligence for advanced-malware investigation.",
    "source": "cat-tool"
  },
  "Ticket": {
    "term": "Ticket",
    "definition": "A record or request for assistance or support, often used in help desks or incident response.",
    "source": "clear"
  },
  "Time To Live (TTL)": {
    "term": "Time To Live (TTL)",
    "definition": "A field that limits the lifespan or hops of data packets in a network.",
    "source": "clear"
  },
  "Time-Based Evasion": {
    "term": "Time-Based Evasion",
    "definition": "Schedules or delays actions to avoid time-sensitive monitoring tools or activate only during specific conditions.",
    "source": "bad-term"
  },
  "Timeline": {
    "term": "Timeline",
    "definition": "A chronological record of events, actions, or decisions related to a security incident or event.",
    "source": "clear"
  },
  "Timestomping": {
    "term": "Timestomping",
    "definition": "Alters file timestamps to make malicious activity appear older or less suspicious.",
    "source": "bad-term"
  },
  "Tines": {
    "term": "Tines",
    "definition": "No-code automation built for security teams; modular \"stories\" for alert ingestion, enrichment, and response.",
    "source": "cat-tool"
  },
  "Token": {
    "term": "Token",
    "definition": "A small piece of data or code that is used to authenticate or authorize access to a system or resource.",
    "source": "clear"
  },
  "Token Impersonation": {
    "term": "Token Impersonation",
    "definition": "Creating or modifying security tokens to assume the identity and privileges of another user or process.",
    "source": "bad-term"
  },
  "Token Manipulation": {
    "term": "Token Manipulation",
    "definition": "Altering or forging tokens to escalate privileges or bypass security controls within Windows.",
    "source": "bad-term"
  },
  "Token Theft": {
    "term": "Token Theft",
    "definition": "Unauthorized acquisition of authentication tokens from memory or storage, enabling attackers to impersonate legitimate users.",
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
  "Traffic": {
    "term": "Traffic",
    "definition": "The flow of data between devices, systems, or servers on a network.",
    "source": "clear"
  },
  "Transport Layer Security (TLS)": {
    "term": "Transport Layer Security (TLS)",
    "definition": "A protocol for encrypting internet communications.",
    "source": "clear"
  },
  "Trellix Endpoint Security": {
    "term": "Trellix Endpoint Security",
    "definition": "Part of the broader Trellix XDR; detection, investigation, and response with behavioral analytics and forensic timelines.",
    "source": "cat-tool"
  },
  "Trend Micro Vision One": {
    "term": "Trend Micro Vision One",
    "definition": "XDR correlating telemetry across email, endpoint, server, and cloud workloads.",
    "source": "cat-tool"
  },
  "TrickBot": {
    "term": "TrickBot",
    "definition": "Began as a banking Trojan, evolved into a modular enterprise-scale framework. Credential theft, recon, ransomware delivery. Often followed Emotet, provided a foothold for Ryuk or Conti. Decentralized infrastructure, encrypted comms, plugins for SMB spread and AD enumeration. Disrupted in 2022 after years of activity.",
    "source": "bad-family"
  },
  "Tripwire": {
    "term": "Tripwire",
    "definition": "File-integrity monitoring and change detection; enforces baselines and supports compliance.",
    "source": "cat-tool"
  },
  "Trojan": {
    "term": "Trojan",
    "definition": "A type of malware that disguises itself as legitimate software to gain unauthorized access to a system or network.",
    "source": "clear"
  },
  "True Positive": {
    "term": "True Positive",
    "definition": "A security alert that fires on activity that is, on inspection, actual adversary behavior. The opposite of a false-positive, and the case the SOC exists to handle.",
    "source": "clear"
  },
  "Turla FSB / long-running espionage": {
    "term": "Turla FSB / long-running espionage",
    "definition": "Long-running Russian cyber-espionage group linked to the FSB. Targets governments, embassies, militaries. Custom implants like Snake, Carbon, Kazuar. Hijacks infrastructure from other malware families to obfuscate attribution. Watering holes, poisoned updates, compromised email systems. Tradecraft emphasizes longevity and covertness.",
    "source": "bad-actor"
  },
  "Typosquatting": {
    "term": "Typosquatting",
    "definition": "Registers look-alike domains to trick users into visiting malicious sites, often to harvest credentials or deliver malware.",
    "source": "bad-term"
  },
  "UAC Bypass": {
    "term": "UAC Bypass",
    "definition": "Circumventing Windows User Account Control prompts to gain elevated privileges without user approval.",
    "source": "bad-term"
  },
  "UNC2452 Mandiant / SolarWinds": {
    "term": "UNC2452 Mandiant / SolarWinds",
    "definition": "Mandiant designation for the threat group behind the SolarWinds supply-chain compromise, later linked to APT29. Introduced the SUNBURST backdoor into Orion updates, affecting U.S. government agencies and Fortune 500 companies. Stealthy lateral movement and privilege escalation. Undetected for months. A landmark case for software trust chains.",
    "source": "bad-actor"
  },
  "USB / Removable Media Infection": {
    "term": "USB / Removable Media Infection",
    "definition": "Malware delivered via infected USB drives that automatically executes when plugged in.",
    "source": "bad-term"
  },
  "Ukraine power grid": {
    "term": "Ukraine power grid",
    "definition": "2015 and 2016 attacks marking the first known successful cyberattacks to cause power outages. Attributed to Russia's Sandworm. Spear-phishing plus BlackEnergy to gain SCADA access; operators locked out as breakers were opened manually. 2016 used Industroyer / CrashOverride targeting grid-specific protocols. Defining examples of cyber warfare against civilian infrastructure.",
    "source": "bad-campaign"
  },
  "Unauthorized Access": {
    "term": "Unauthorized Access",
    "definition": "Access to a system, network, or resource without proper authorization or permission.",
    "source": "clear"
  },
  "Uniform Resource Identifier (URI)": {
    "term": "Uniform Resource Identifier (URI)",
    "definition": "A string that identifies a resource on the internet.",
    "source": "clear"
  },
  "Uniform Resource Locator (URL)": {
    "term": "Uniform Resource Locator (URL)",
    "definition": "The address used to access resources on the web.",
    "source": "clear"
  },
  "Unmanaged Teams": {
    "term": "Unmanaged Teams",
    "definition": "Groups within an organization that operate without centralized security controls, posing risks.",
    "source": "clear"
  },
  "Unstructured Data Exposure": {
    "term": "Unstructured Data Exposure",
    "definition": "Leakage involving documents, logs, screenshots, audio, harder to classify or monitor using traditional DLP tools.",
    "source": "bad-term"
  },
  "User": {
    "term": "User",
    "definition": "An individual who interacts with a system, network, or application.",
    "source": "clear"
  },
  "User Account": {
    "term": "User Account",
    "definition": "A unique identity or profile used to authenticate and authorize access to a system or resource.",
    "source": "clear"
  },
  "User and Entity Behavior Analytics (UEBA)": {
    "term": "User and Entity Behavior Analytics (UEBA)",
    "definition": "Security technology that uses advanced analytics to build standard profiles of user and entity behavior, detecting anomalies that might indicate threats.",
    "source": "clear"
  },
  "User-Agent Spoofing": {
    "term": "User-Agent Spoofing",
    "definition": "Alters HTTP headers to mimic trusted applications or browsers, blending into normal web traffic.",
    "source": "bad-term"
  },
  "VS Code": {
    "term": "VS Code",
    "definition": "Visual Studio Code, a source code editor developed by Microsoft that serves as the foundation for other development tools like Cursor.",
    "source": "clear"
  },
  "Variable Expansion": {
    "term": "Variable Expansion",
    "definition": "Replacing variables in scripts or commands with their actual values during execution.",
    "source": "clear"
  },
  "Variable Substitution": {
    "term": "Variable Substitution",
    "definition": "Programming technique often exploited by attackers to obscure malicious commands by replacing literal values with variables, making detection more difficult.",
    "source": "clear"
  },
  "Veeam": {
    "term": "Veeam",
    "definition": "Backup and recovery across virtual, physical, and cloud workloads with cloud-mobility options.",
    "source": "cat-tool"
  },
  "Veritas NetBackup": {
    "term": "Veritas NetBackup",
    "definition": "Enterprise-grade backup with broad workload coverage and centralized hybrid-cloud management.",
    "source": "cat-tool"
  },
  "Vicon Industries": {
    "term": "Vicon Industries",
    "definition": "End-to-end surveillance with the Valerus VMS platform; open architecture and flexible deployment.",
    "source": "cat-tool"
  },
  "Vidar": {
    "term": "Vidar",
    "definition": "Widely distributed infostealer harvesting credentials, browser data, cookies, cryptocurrency wallets, and more. Delivered via phishing, malvertising, fake installers. HTTP POST C2 with encrypted exfiltration. Customizable and available as malware-as-a-service. Often bundled with or mistaken for RedLine / Raccoon.",
    "source": "bad-family"
  },
  "Virtual Desktop Infrastructure (VDI)": {
    "term": "Virtual Desktop Infrastructure (VDI)",
    "definition": "Technology that hosts desktop environments on a central server.",
    "source": "clear"
  },
  "Virtual Environment Awareness": {
    "term": "Virtual Environment Awareness",
    "definition": "Malware detects sandboxes or VMs and refuses to execute, hiding true behavior from automated analysis.",
    "source": "bad-term"
  },
  "Virtual Private Network (VPN)": {
    "term": "Virtual Private Network (VPN)",
    "definition": "A secure tunnel that encrypts traffic between a user and a network.",
    "source": "clear"
  },
  "VirusTotal": {
    "term": "VirusTotal",
    "definition": "Free analysis of files and URLs across many AV engines; community sharing and reputation data.",
    "source": "cat-tool"
  },
  "Vishing (Voice Phishing)": {
    "term": "Vishing (Voice Phishing)",
    "definition": "Phone calls or voicemails impersonating authority figures or institutions to extract credentials or prompt unsafe actions.",
    "source": "bad-term"
  },
  "Visual Studio Code": {
    "term": "Visual Studio Code",
    "definition": "Lightweight, extensible code editor from Microsoft; rich ecosystem of extensions for development and security.",
    "source": "cat-tool"
  },
  "Volt Typhoon / Salt Typhoon": {
    "term": "Volt Typhoon / Salt Typhoon",
    "definition": "2024 disclosures of two long-running China-linked campaigns against U.S. critical infrastructure. Volt Typhoon pre-positioned in energy, water, communications, and transportation networks using living-off-the-land techniques for stealthy persistence. Salt Typhoon compromised major U.S. telecom carriers' lawful-intercept systems with potential access to call metadata and the federal wiretap apparatus. Reframed the boundary between espionage and prepositioning for disruptive action.",
    "source": "bad-campaign"
  },
  "Vulnerability": {
    "term": "Vulnerability",
    "definition": "A defect in a system that can be turned into adversary capability if paired with an exploit and exposure: an unpatched CVE, a misconfiguration, a default credential, a logic flaw. Vulnerability without exposure or exploitability is latent; with both, it's a finding.",
    "source": "clear"
  },
  "Vulnerability Management": {
    "term": "Vulnerability Management",
    "definition": "Systematic practice of identifying, classifying, prioritizing, remediating, and mitigating security vulnerabilities across an organization's systems and software.",
    "source": "clear"
  },
  "W3af": {
    "term": "W3af",
    "definition": "Open-source web app scanner combining automated checks with a manual testing framework.",
    "source": "cat-tool"
  },
  "WHOIS": {
    "term": "WHOIS",
    "definition": "Protocol and database of domain registration data; used to investigate suspicious domains and attribution.",
    "source": "cat-tool"
  },
  "WIZ": {
    "term": "WIZ",
    "definition": "Agentless cloud risk visibility; correlates infra/config/workload data to map attack paths and prioritize risk.",
    "source": "cat-tool"
  },
  "WMI Obfuscation": {
    "term": "WMI Obfuscation",
    "definition": "Uses complex or hidden WMI commands to evade detection and gather data stealthily.",
    "source": "bad-term"
  },
  "WannaCry": {
    "term": "WannaCry",
    "definition": "May 2017 ransomware outbreak using EternalBlue (NSA SMB exploit leaked by Shadow Brokers). Wormed across networks, encrypting files in 150+ countries; the UK NHS was hit hard. Microsoft had released the patch beforehand, but many systems were unpatched. Attributed to North Korea's Lazarus Group. A wake-up call on patch hygiene.",
    "source": "bad-campaign"
  },
  "WannaCry, worm spread": {
    "term": "WannaCry, worm spread",
    "definition": "WannaCry used the EternalBlue exploit (MS17-010) to propagate through SMB to any unpatched host it could reach. From patient zero, it spread autonomously by scanning local subnets and random IPs, infecting roughly 200,000 systems across 150 countries within 24 hours of the May 12, 2017 outbreak. By the time most SOCs had triaged the first alert, the second wave of hosts was already encrypting. That speed is what \"wormable\" means in practice: the malware does its own lateral movement; defenders don't get the usual reaction window.",
    "source": "bad-feature"
  },
  "Wapiti": {
    "term": "Wapiti",
    "definition": "Open-source command-line web vulnerability scanner; crawls and injects payloads for common flaws.",
    "source": "cat-tool"
  },
  "Watering Hole Attack": {
    "term": "Watering Hole Attack",
    "definition": "Compromises a website frequently visited by a target group, embedding malware to infect visitors.",
    "source": "bad-term"
  },
  "Whaling": {
    "term": "Whaling",
    "definition": "Spear phishing targeting high-profile individuals like executives, often for financial fraud or data theft.",
    "source": "bad-term"
  },
  "WhisperGate": {
    "term": "WhisperGate",
    "definition": "Destructive malware attributed to Russian actors, deployed against Ukraine in 2022. Masquerades as ransomware but irreversibly corrupts the MBR and deletes system files. Two-stage: first corrupts the bootloader, second drops a wiper. No recovery mechanism, disruption, not finance. Echoed NotPetya tactics.",
    "source": "bad-family"
  },
  "Wildcard DNS": {
    "term": "Wildcard DNS",
    "definition": "A DNS configuration that resolves all subdomains under a domain to a specified address.",
    "source": "clear"
  },
  "Windows Event Logs": {
    "term": "Windows Event Logs",
    "definition": "Logs generated by Windows operating systems recording system, security, and application events.",
    "source": "clear"
  },
  "Windows Management Instrumentation Command-line (WMIC)": {
    "term": "Windows Management Instrumentation Command-line (WMIC)",
    "definition": "A tool for managing Windows systems via scripting. Deprecated by Microsoft since Windows 10 21H1 (2021); a Feature on Demand disabled by default in Windows 11 23H2/24H2 and removed entirely starting with 25H2, though it lingers on older and upgraded systems, which is why it remains a favorite LOLBin in active intrusions. The modern equivalent is PowerShell's Get-CimInstance / Invoke-CimMethod against the same WMI namespaces.",
    "source": "clear"
  },
  "Wiper Malware": {
    "term": "Wiper Malware",
    "definition": "Malware designed to irreversibly delete data and destroy system functionality. NotPetya, Shamoon, WhisperGate.",
    "source": "bad-term"
  },
  "Wireshark": {
    "term": "Wireshark",
    "definition": "Open-source packet analyzer; deep protocol decoding for investigation and forensics.",
    "source": "cat-tool"
  },
  "Wizard Spider Ryuk / Conti / TrickBot": {
    "term": "Wizard Spider Ryuk / Conti / TrickBot",
    "definition": "Russia-based cybercriminal group behind Ryuk, Conti, and TrickBot. Financially motivated; hundreds of millions extorted from hospitals, municipalities, corporations. Operates within a larger ecosystem of IABs and malware developers. Fast lateral movement, data theft, double extortion. Often preceded by TrickBot or BazarLoader infections.",
    "source": "bad-actor"
  },
  "X-Ways Forensics": {
    "term": "X-Ways Forensics",
    "definition": "Lightweight, fast forensic suite with strong scripting and hex-level analysis for deep investigations.",
    "source": "cat-tool"
  },
  "XZ Utils backdoor": {
    "term": "XZ Utils backdoor",
    "definition": "March 2024. A multi-year social-engineering campaign by a fictitious maintainer (\"Jia Tan\") inserted a stealthy backdoor (CVE-2024-3094) into the xz/liblzma compression library that would have given remote SSH code execution on Linux systems linked against the affected build. Caught by chance by a Microsoft engineer noticing a 500ms slowdown. A defining open-source supply-chain case and the catalyst for renewed maintainer-trust scrutiny.",
    "source": "bad-campaign"
  },
  "Zeek (formerly Bro)": {
    "term": "Zeek (formerly Bro)",
    "definition": "Behavior-focused network monitoring producing structured session logs for SIEM-friendly analytics.",
    "source": "cat-tool"
  },
  "Zero Day": {
    "term": "Zero Day",
    "definition": "A previously unknown vulnerability with no patch, exploited before the vendor can respond.",
    "source": "bad-term"
  },
  "Zero-Day Vulnerability": {
    "term": "Zero-Day Vulnerability",
    "definition": "A vulnerability for which no patch is yet available, either because the vendor has not shipped one or because the vendor does not yet know the bug exists. Called \"zero-day\" because that is the number of days defenders have had to prepare. Exploitation is not a definitional prerequisite; a zero-day can exist before any exploit appears.",
    "source": "clear"
  },
  "Zerologon (CVE-2020-1472)": {
    "term": "Zerologon (CVE-2020-1472)",
    "definition": "Netlogon protocol flaw (CVE-2020-1472) allowing an unauthenticated attacker on the network to gain domain admin by exploiting a weakness in the AES-CFB8 implementation to bypass Netlogon authentication, then resetting the domain controller's machine-account password to a known value and pivoting to domain admin. Actively exploited soon after disclosure.",
    "source": "bad-term"
  },
  "Zscaler Deception (formerly Smokescreen)": {
    "term": "Zscaler Deception (formerly Smokescreen)",
    "definition": "Deception with decoys and lures mimicking real IT; alerts on engagement and provides attacker-TTP insight. Smokescreen acquired by Zscaler, 2021.",
    "source": "cat-tool"
  },
  "Zscaler ThreatLabZ": {
    "term": "Zscaler ThreatLabZ",
    "definition": "Threat research and malware sandboxing powering Zscaler's cloud security services.",
    "source": "cat-tool"
  },
  "certutil.exe": {
    "term": "certutil.exe",
    "definition": "A Windows command-line tool used for certificate management and sometimes exploited by attackers for malicious purposes.",
    "source": "clear"
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

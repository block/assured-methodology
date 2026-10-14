# ASSURED research log

The [Development and evidence](https://assured-methodology.vercel.app/docs/development/) page on the site is the short version: what the evidence establishes today, where the method came from, and the validation work ahead. This file keeps the long-form account it summarizes, in the author's voice: the path into triage, the AUSPICED draft and why it failed, the redesign into ASSURED, the design loop, the teaching program, and the relationship to Investigation Theory.

It is a record of how the method was made, not evidence that it works. The site's [evidence status](https://assured-methodology.vercel.app/docs/development/#what-the-current-evidence-establishes) and [falsification criteria](https://assured-methodology.vercel.app/docs/development/#what-would-count-against-assured) are the authoritative statements; where this log and the page differ, the page and [CHANGELOG.md](../CHANGELOG.md) are current.

## The path into event triage

I came to security operations sideways: from the Army, through IT support and network engineering, into a physical security role at Square, and then into the security operations team through a weekly mentorship and a supervised arrangement to work lower-complexity cases one hour a day. The full story is below for readers who want it.

<details>
<summary>The author's path into triage</summary>

I did not enter cybersecurity through a direct route. After leaving the Army, I enrolled at ITT Technical Institute. I had considered studying cybersecurity, but chose to build a broader base first through an associate degree in information technology. While studying, I worked for a small trucking company as a systems administrator. The title covered work that was mostly IT support, and the limited growth path pushed me to look for a role where I could develop deeper technical skills.

After graduating, I became a network engineer supporting the Defense Information Systems Agency through a government contract. That work strengthened the networking foundation I still use during investigations, but it offered no clear path into cybersecurity. With a child on the way, I also wanted to move away from the uncertainty of contract work.

I joined Square as a physical security systems administrator because the role needed my network engineering background. Within my first few months, I told my manager that I wanted to move into cybersecurity. He connected me with the lead of the company's security operations team, who arranged a mentor. We met for an hour each week to work through the knowledge and habits the role required.

I returned to school at Western Governors University because its program combined a bachelor's degree with industry certification exams. I earned the degree and about a dozen certifications. Roughly eight months before graduation, I asked the monitoring and triage lead for a more direct way to learn: let me spend one hour each workday on lower-complexity security cases. I would gain supervised experience while the team recovered time for more demanding investigations. The lead agreed. I continued that lateral work until graduation, when the team opened a position and brought me into security operations full time.

</details>

> **Why the path matters**: This career history is not evidence that ASSURED works. It explains the design pressure behind it: the method was built by someone who had to cross the gap between knowing security concepts and making defensible decisions on real events, and who later wanted to make that gap easier for other analysts to cross.

## The problem that started the framework

ASSURED began during parental leave after the birth of my second child. I was reading books on incident response and comparing their lifecycle guidance with the alert-by-alert work I had learned on the triage desk.

The material covered incident response well, but event triage usually appeared as a brief part of detection and analysis. That treatment left an operational problem unresolved. An analyst cannot give every alert the time and depth of a confirmed incident. The queue would stop moving. But a weak close can miss the event that should have become an incident, while a weak escalation transfers noise and incomplete work to the response team.

The missing structure was the work between those two points: how to understand the signal, establish who or what is involved, bound the inquiry, collect enough evidence, assess the remaining risk, and make a close-or-escalate decision another person can reconstruct.

## The first design: AUSPICED

The first attempt was **AUSPICED**. The draft, which survives as a personal document dated October 2023, framed the space as "Identification and Response": the triage work that runs before incident response takes ownership. It proposed eight parts:

| Letter | Phase |
| --- | --- |
| A | Alert |
| U | User |
| S | Scope |
| P | Pattern |
| I | Investigation |
| C | Communication |
| E | Enrichment |
| D | Documentation |

AUSPICED never reached testing. It failed during writing. I worked on the draft over a long stretch and could not get it to hold together. The document grouped the eight parts into two domains and four divisions, each part carrying its own sub-phases, and before long the structure was doing more work than the analyst. Two failures were decisive. I could not define Pattern in a way that separated it from the rest of the investigative work; in the draft, the Investigation section repeats the Pattern section's steps almost word for word. And Communication felt like an odd thing to hold as a discrete stage, because communicating matters throughout the work rather than at one point in a sequence.

The deeper problem was that the model mixed several different kinds of things: entities to identify, broad work categories, cross-cutting practices, and supporting activities. "User" was too narrow for events centered on hosts, service accounts, applications, or cloud resources. "Investigation" was too broad to define what the analyst had to produce. Nothing in the model named the close-or-escalate decision the work exists to reach, and risk assessment had no stage of its own.

A methodology needs more than a list of important activities. Each phase needs an anchor question, a required output, and a reason to hand the work to the next phase. AUSPICED did not meet that bar, so it was replaced rather than preserved for the acronym. The unfinished draft, placeholder notes and all, is kept as a record of what the first design got wrong. It is not published, so the description on this page is the author's account of it.

## The redesign into ASSURED

ASSURED retained the parts that held up and reorganized the parts that did not:

| AUSPICED | ASSURED | What changed |
| --- | --- | --- |
| Alert | Alert | Retained as the signal-understanding and validation phase. |
| User | Subject | Expanded beyond people to every entity acting in or affected by the event. |
| Scope | Scope | Retained, with explicit time, entity, infrastructure, and regulatory boundaries. |
| Pattern + Investigation | Uncover | Replaced two categories the draft could not keep apart with evidence collection, correlation, hypothesis testing, and reconstruction. |
| Communication | Distributed across phases | Moved into escalation protocols, handoff, and documentation, where communication produces an accountable artifact. |
| Enrichment | Folded into Alert and Uncover | Context and threat-intelligence gathering became part of understanding the signal and collecting evidence, not a separate late stage. |
| Documentation | Documentation | Retained as the durable record of evidence, uncertainty, reasoning, and outcome. |
| No distinct phase | Risk | Added an explicit assessment between evidence gathering and the final decision. |
| No distinct phase | Escalation decision | Added as the deliberate close-or-escalate decision. AUSPICED ended in enrichment and documentation without ever naming the decision. |

The result was not a relabeling of the first acronym. It was a change from a collection of activities to seven linked decision phases. The first three establish what is being examined. Uncover and Risk form an investigative loop. The Escalation decision and Documentation turn the analysis into an accountable decision and a reusable record.

ASSURED began as a short personal write-up and expanded as the teaching and operational questions became clearer. The public site launched as version 1.0.0 in May 2026, with 1.1.0 and 1.2.0 following in July 2026; the changelog records each release. The current site adds phase deliverables, transition rules, worked examples, quizzes, a depth ladder for different queue conditions, templates, and adoption guidance. Those additions make the method more testable because a reviewer can inspect what each phase claims to produce.

## The development method

ASSURED was developed through a practitioner design loop, not a formal research study:

1. **Observe the work**: Identify the recurring decisions and constraints in event triage: limited time, incomplete telemetry, uncertain meaning, uneven analyst experience, and a consequential close-or-escalate boundary.
2. **Make the tacit process explicit**: Write the work as named stages so that assumptions, missing steps, and ambiguous handoffs can be seen and challenged.
3. **Reject the weak structure**: Write the model out in full and see whether it holds. AUSPICED failed this step before it ever reached use: the draft could not keep its own categories apart, so the structure was replaced rather than defended.
4. **Teach and observe**: Use ASSURED with developing analysts in a supervised lateral-work program. Watch where learners become more confident, where the language helps, and where the material still needs explanation.
5. **Turn claims into artifacts**: Give each phase an output, create worked cases and exercises, define closure and escalation criteria, and ship templates that make the method reviewable outside the author's head.
6. **Publish for external challenge**: Version the methodology, cite adjacent work, expose limitations, and use outside review to correct both the framework and its claims.

Two honesty notes belong here. First, this loop is a retrospective description: I did not run the six steps against a written plan, and step 4 was not systematically logged while it happened. Second, a practitioner design loop is a legitimate source of practitioner knowledge, but it is not equivalent to empirical validation. The distinction matters.

## Use in the Lateral Work Program

I created the Lateral Work Program because lateral work had opened the door into cybersecurity for me. Informal access depends on finding the right manager, mentor, and team at the right time. A program can make the opportunity deliberate: participants gain supervised exposure to security work, and the receiving team can route appropriate cases to them without giving up ownership of the harder work.

ASSURED is the methodology I teach in that program. The program runs inside my employer's security organization; ASSURED is the curriculum I chose for it, not a mandated company standard. Around a dozen participants have come through it so far. It gives participants a shared sequence for approaching tickets and a vocabulary for explaining what they examined, what they found, and why they reached a decision. I have observed participants become more confident and comfortable working and resolving tickets after learning and applying the structure.

That observation is important because teachability is one of ASSURED's design goals. It remains qualitative practitioner observation. Confidence can improve while accuracy does not, and a program led by the framework's author is not an independent test.

The conflict of interest deserves a plain statement. I created the framework, I co-lead the program, I judge informally how participants are doing, and I maintain this site. Every favorable observation reported here passed through the same interested person. That does not make the observations false, but it is exactly the condition that independent scoring and outside replication exist to correct.

### How feedback reached the framework

I did not keep a systematic log of feedback during the early teaching. I taught the method as I went, and when mentees asked questions or needed a distinction clarified, I folded those clarifications into how I taught and wrote the material next. In parallel, I started applying the methodology to every ticket I worked myself, structuring my case notes around sections I had to fill in for Alert, Subject, Scope, and Uncover. Working my own queue with those fill-in sections also surfaced day-to-day friction.

That history means the trail from feedback to change is thinner than it should be: I can say what the method looks like after the feedback, but not always which observation changed which part. From the first release after 1.2.0 forward, each substantive change in the public changelog names the observation that prompted it, so the trail no longer depends on memory.

## Relationship to Investigation Theory

The Development and evidence page exists because of a public critique. In July 2026, shortly after ASSURED's 1.2.0 release, Chris Sanders pointed out that the project's related-work claims omitted his prior work and that the site said nothing about how ASSURED was created or tested. He was right on both counts. The reading that prompted ASSURED was not a systematic literature review, and it missed important public work by Sanders and collaborators. The omission has been corrected in the [related-work map](https://assured-methodology.vercel.app/docs/positioning/), and the Development and evidence page, with this log behind it, is the answer to the second criticism.

Sanders's [Investigation Theory](https://chrissanders.org/training/investigationtheory/) directly addresses tool-independent security investigation, the difficulty of transferring tacit analyst knowledge, evidence selection, investigative questions, decisions, bias, and reporting. His public [books, papers, and presentations](https://chrissanders.org/publications/) cover analyst cognition and mental models in depth.

The 2019 paper [*Creative Choices*](https://www.chrissanders.org/wp-content/uploads/2020/03/Creative-Choices-Developing-a-Theory-of-Divergence-Convergence-and-Intuition-in-Security-Analysts.pdf), written with Stef Rand, also demonstrates the kind of derivation record a framework should provide. The authors used a mixed-method design that combined grounded theory with survey measures. Sixteen analysts completed interviews and scenario work, and the resulting observations formed the Ambiguity-Driven Convergence model.

Sanders's 2021 doctoral dissertation, [*The Analyst Mindset: A Cognitive Skills Assessment of Digital Forensic Analysts*](https://chrissanders.org/2021/12/dissertation/) (Baylor University), extends that record. It used cognitive task analysis interviews with practicing analysts to model diagnostic inquiry, the questioning process an investigator uses to move from a signal to an explanation. That is the standard of documented derivation the Development and evidence page works toward.

ASSURED was not derived from Investigation Theory, but independent development does not make adjacent work irrelevant. The two overlap on evidence, questions, bias, and the goal of making analyst reasoning teachable. Investigation Theory goes deeper into how investigators think and learn. ASSURED contributes a narrower operational workflow for carrying one security event from its initial alert to a documented close or an incident-response handoff.

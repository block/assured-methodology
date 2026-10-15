# Level 0 pattern-close record

<!-- ASSURED Methodology by Timothy Zilber, © Block, Inc., CC BY 4.0
     (https://creativecommons.org/licenses/by/4.0/). Reuse and adapt freely
     with attribution; note any changes you make.
     ASSURED fast path, Level 0 (https://assured-methodology.vercel.app/docs/fast-path).
     One record per closed case. Every field is required. If a field cannot
     be filled honestly, or an eligibility check is unknown, this is not a
     Level 0 close; move the case up the ladder. Unknown fails the gate.
     A Level 0 close is an early Escalation decision, recorded here. -->

## 1. Alert

- Alert ID (or the case ID and every member alert ID):
- Detection source:
- Detection rule (name, ID, and version):
- Detection timestamp (UTC):

<!-- Grouped case: every member alert must pass the gate and match a pattern
     entry. One member that fails eligibility, or one failed discriminator on
     any member, means the whole case is not a Level 0 close. -->

## 2. Pattern

- Pattern library entry matched (ID, name and version):
- Pattern owner:
- Pattern review date (must be current; past it, the entry cannot support a
  Level 0 close and the case moves to Level 1):
- Machine-close flag on the entry (on / off):

## 3. Checks

### Eligibility gate (all three, each from its source system, never from memory)

<!-- Record the evidence, not just the conclusion. Unknown or unverifiable
     fails the gate and the case moves to Level 1. A privileged identity or
     a crown-jewel subject goes straight to Level 2. Regulated data in reach
     (standing access, even if nothing shows it was touched) fails Level 0
     and is recorded as a Scope flag; it is not by itself a Level 2 trigger. -->

- Subject asset criticality is not crown-jewel (source, e.g. asset inventory / CMDB tag):
- Subject is not a privileged identity, and not automation holding sensitive
  capability (deploy, signing, secrets, repository write) (source, e.g. role /
  group / capability inventory):
- No regulated data (PCI, PHI, PII) in the subject's reach: no standing
  access to a store the data inventory classifies as regulated (source, e.g.
  data classification):

### Entry-specific constraints

<!-- Any narrower constraint the pattern entry adds (e.g. "applies only to
     hosts tagged ephemeral-runner / nonprivileged"), with the observed value
     and its source and date. -->

-

### Pattern discriminators (all, with what was actually observed)

<!-- Not "matches pattern" but the specific observations, e.g. "child script
     inside the signed bundle, extension ID on the entry, destinations within
     the entry's set, no credential-path reads, no persistence writes".
     Signer and install path are table stakes, not discriminators. One line
     each. -->

1.
2.
3.

### Escalation criteria

- Escalation criteria checked: none confirmed or suspected (any confirmed
  criterion fires the escalation tripwire and ends the Level 0 close):

## 4. Verdict

<!-- Two axes, both required. Detection: true positive / false positive
     (logic) / false positive (data). Activity: malicious / policy violation /
     authorized (benign true positive) / benign-confirmed / undetermined, one
     line of justification. Only benign-confirmed or authorized closes at
     Level 0. Malicious leaves Level 0: it fires the escalation tripwire, or,
     when a control fully contained it, is recorded at P3 or P4. Policy
     violation and undetermined move the case up the ladder. A correct
     detection of authorized behavior is a benign true positive, not a false
     positive. -->

- Detection:
- Activity:

## 5. Closure

- Closed at Level 0 by (analyst; or the automation on a machine-close entry,
  with its named owner):
- Closed at (UTC):
- Key times (UTC): detected / acknowledged / verdict / closed / reopened:
- Material AI use (assistant and version, and which fields began as AI
  drafts; "none" if unassisted):
- Tuning or volume request, if the rule keeps firing (a scoped exception
  with an owner and expiry; the rule logic stays intact for a benign true
  positive):

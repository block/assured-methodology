# Level 0 pattern-close record

<!-- ASSURED fast path, Level 0 (https://assured-methodology.vercel.app/docs/fast-path).
     One record per closed alert. Every field is required. If a field cannot
     be filled honestly, or an eligibility check is unknown, this is not a
     Level 0 close; move the alert up the ladder. Unknown fails the gate. -->

## 1. Alert

- Alert ID:
- Detection source:
- Detection timestamp (UTC):

## 2. Pattern

- Pattern library entry matched (ID and name):
- Pattern owner:
- Pattern review date (must be current; a stale entry fails the gate):

## 3. Checks

### Eligibility gate (all three, each from its source system, never from memory)

<!-- Record the evidence, not just the conclusion. Unknown or unverifiable
     fails the gate and the alert moves to Level 1. -->

- Subject asset criticality is not crown-jewel (source, e.g. asset inventory / CMDB tag):
- Subject is not a privileged identity, and not automation holding sensitive
  capability (deploy, signing, secrets, repository write) (source, e.g. role /
  group / capability inventory):
- No regulated data (PCI, PHI, PII) in the subject's reach (source, e.g. data
  classification):

### Pattern discriminators (all, with what was actually observed)

<!-- Not "matches pattern" but the specific observations, e.g. "signed vendor
     binary, expected install path, no persistence". One line each. -->

-
-

## 4. Verdict

<!-- Two axes, both required. Detection correctness: did the rule correctly
     detect the behavior it looks for? Activity disposition: benign-confirmed /
     authorized / malicious / undetermined, one line of justification. Only
     benign-confirmed or authorized closes at Level 0: malicious breaks glass,
     undetermined moves the alert up the ladder. A correct detection of benign
     behavior is a benign true positive, not a false positive. -->

- Detection correctness:
- Activity disposition:

## 5. Disposition

- Closed at Level 0 by (analyst):
- Closed at (UTC):
- Tuning ticket, if the rule keeps firing:

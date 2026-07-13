# Level 0 pattern-close record

<!-- ASSURED fast path — Level 0 (https://assured-methodology.vercel.app/docs/fast-path).
     One record per closed alert. Every field is required. If a field cannot
     be filled honestly, this is not a Level 0 close — move the alert up the
     ladder. -->

## 1. Alert

- Alert ID:
- Detection source:
- Detection timestamp (UTC):

## 2. Pattern

- Pattern library entry matched (ID and name):

## 3. Checks

<!-- The discriminators verified, with what was actually observed. Not
     "matches pattern" — the specific observations, e.g. "signed vendor
     binary, expected install path, no persistence". One line each. -->

-
-

## 4. Verdict

<!-- False-positive or expected behavior, one line of justification. -->

-

## 5. Disposition

- Closed at Level 0 by (analyst):
- Closed at (UTC):
- Tuning ticket, if the rule keeps firing:

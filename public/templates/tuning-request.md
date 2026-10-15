# Tuning request (triage to detection engineering)

<!-- ASSURED Methodology by Timothy Zilber, © Block, Inc., CC BY 4.0
     (https://creativecommons.org/licenses/by/4.0/). Reuse and adapt freely
     with attribution; note any changes you make.
     ASSURED detection feedback
     (https://assured-methodology.vercel.app/docs/detection-feedback).
     One request per rule (or per missing detection). File it after the
     case has a verdict on both axes; a request never holds up a close or
     an escalation. Use the routing table on the detection-feedback page to
     pick the request type and the owner. Reference cases and alerts by ID
     and copy only the fields the change needs: no personal data beyond what
     the rule itself matches, and insider-risk cases by case ID only.
     Sections 1 to 6 are the analyst's; section 7 is detection
     engineering's. -->

## 1. Request

- Request ID (e.g. DE-NNNN):
- Request type (one): exception · enrichment · logic change · data or
  pipeline fix · severity change · new detection · risk-rule request ·
  documentation · vendor case or wrapper rule · retire
- Routed to (rule owner, pipeline owner, vendor contact, or pattern-library
  owner):
- Filed by, and date (UTC):
- Material AI use (assistant and version, and which fields began as AI
  drafts; "none" if unassisted):

## 2. The detection

- Rule name, ID, and version as deployed when it fired (for a new-detection
  request: "none fired", and the technique that went unseen):
- Provider (in-house · vendor-managed · community Sigma · managed provider)
  and whether the logic is inspectable (yes · no: vendor-managed):
- ATT&CK technique ID(s) and version (e.g. Enterprise v19), and the
  Detection Strategy (DET) and Analytic (AN) IDs where known:
- Exceptions, suppressions, and pattern entries active on this rule when it
  fired (IDs):

## 3. Evidence

- Cases (every case ID that motivated the request):
- Sample alert IDs (benign samples for exceptions and fixes; for a gap, the
  event IDs of the activity that raised no alert):
- Verdict on both axes, using the exact values:
  - Detection: true positive · false positive (logic) · false positive (data)
  - Activity: malicious · policy violation · authorized (benign true
    positive) · benign-confirmed · undetermined
- Window and volume (fires in the window, and how many carried each
  verdict):
- Observed precision (true-positive fires / fires with a detection verdict,
  benign true positives counted as correct) and actionability (fires that
  needed action beyond the close / fires), with the window:
- The fields and values that justify the change:
- What the analyst could not see (missing fields, telemetry the rule does
  not read):

## 4. Proposed change

- The change, as specifically as you can state it. For an exception, the
  tuple it is keyed to (for a tool: version or pinned hash, extension or
  plugin ID, destination set). Never signer and install path alone.
- Scope (entity- or field-level; anything rule-wide needs the approver's
  explicit sign-off):
- Expected effect (volume, precision and actionability before and after):
- Risk of the change (what it could silence, and how an attacker could ride
  it):

## 5. Tests

- Benign sample that should stop alerting, or should now carry the new
  field:
- Malicious sample or emulation that must still fire (event replay, or an
  Atomic Red Team test ID for the technique):

## 6. Governance (exceptions and suppressions only)

- Owner (named person):
- Approver (a second person, not the requester):
- Expiry date (by default 90 days; shorter for a tool that updates often):
- Re-fire triggers (e.g. version change, new extension or plugin ID,
  destination outside the set, rule change, observed abuse):
- Hit-count monitoring (expected hits per week, and the threshold that
  forces review):
- Linked pattern entry (PTN-NNN and version), if one exists:
- Re-test at expiry: the malicious sample from section 5 still fires.

## 7. Resolution (detection engineering)

- Decision (accepted · accepted with changes · declined), with the reason:
- Change reference (pull request or commit) and deployed rule version:
- Tests run, and results (benign sample, malicious sample):
- Pattern entries invalidated by this change, and their owners notified:
- Triage notified (date, channel):
- Result after 30 days (volume, precision, any reversed closes or missed
  detections):
- Closed (UTC date):

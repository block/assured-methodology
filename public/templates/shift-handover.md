# Shift handover

<!-- ASSURED Methodology by Timothy Zilber, © Block, Inc., CC BY 4.0
     (https://creativecommons.org/licenses/by/4.0/). Reuse and adapt freely
     with attribution; note any changes you make.
     ASSURED operations: the shift handover
     (https://assured-methodology.vercel.app/docs/operating-variants).
     One record per shift change (per customer, for an MSSP or MDR). It
     transfers ownership of open cases, the clocks running on them, and the
     state of the queue. It does not replace the case records: link them.
     P1 and P2 cases also transfer warm (a live call, bridge or in-person
     handover in which the receiver confirms ownership). P3 and P4 cases may
     transfer through this record alone.
     Fields marked (optional) can be left out when they do not apply. -->

## Handover metadata

- Team (and customer, for an MSSP or MDR):
- Outgoing analyst(s), shift start and end (UTC):
- Incoming analyst(s):
- Handover held at (UTC), and how (call, bridge, in person, written only):
- Material AI use (assistant and version, and which parts began as AI
  drafts; "none" if unassisted):

### Receipt (filled by the incoming analyst)

<!-- Until this is filled in, the outgoing analyst still owns every case
     below, and every clock is still theirs to watch. -->

- Accepted by (name), at (UTC):
- Cases re-derived before the first new query (case IDs):
- Questions asked before the outgoing analyst left ("none" if none):

## 1. Open cases at P1 and P2

<!-- One block per case, P1 first. These transfer warm: the incoming analyst
     restates the leading hypothesis and the live alternative back to the
     outgoing analyst before accepting. A decision clock never crosses the
     shift boundary silently, and it does not restart at handover. -->

### Case:

- Priority, matrix cell (impact / likelihood), confidence (high / medium /
  low, shared rubric), or the confirmed criterion that set P1:
- Depth level (0 / 1 / 2), and any upward move this shift with its reason:
- Owner after handover (name):
- Hypothesis ledger (link): leading hypothesis; live alternatives; refuted
  this shift, with the deciding evidence:
- Done this shift (link the record; one line):
- Next action, and the result that would change the verdict:
- Decision clock: band, deadline (UTC), and what happens if it lapses:
- Pending pages or callbacks for this case (also in section 3):
- Warm handover held with (name), at (UTC):

## 2. Open cases at P3 and P4

<!-- One row per case. A P3 keeps its named re-score trigger and deadline;
     a case that could not be finished is handed over, not closed to clear
     the board. Insider-route cases: case ID and owner only; the details stay
     in the restricted case. -->

| Case ID | Priority and cell | Level | Owner after handover | Leading hypothesis and live alternative (or ledger link) | Next action | Re-score trigger and deadline (UTC) |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |

## 3. Clocks, pages and callbacks

<!-- Every clock that will run out during the next shift, and everything
     someone is waiting on. Regulatory rows record a candidate timestamp
     only; the regime's owner (privacy, legal, compliance) decides whether
     and when a clock started. -->

| Case ID | What is running (acknowledgment, decision, re-score, page fallback, callback, vendor request, regulatory candidate) | Waiting on (who, channel) | Started at (UTC) | Due or fallback at (UTC) | Owner after handover |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## 4. Containment in effect

<!-- Each pre-authorized action still in force, with what was preserved
     first, how it was verified, and what reverses it. Actions awaiting IR
     or owner approval (including any non-reversible step) go here too. -->

| Case ID | Action | Preserved first | Taken at (UTC) | Verified how | Reverse or review by (UTC) | Approval pending (who) |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |

## 5. Watches and evidence at risk

- Forward windows being watched (entity, what would trigger action, until
  when, who watches):
- Sources whose retention or export window closes before the next
  handover (source, closes at UTC, exported yes / no):

## 6. Queue and detection state

- Queue depth and oldest-item age, by priority:
- Rules firing outside their normal volume (rule, volume against normal,
  tuning ticket):
- Pattern entries suspended, past their review date, or due for review
  within 7 days (entry ID and version, owner):
- Sensors or log sources silent or degraded since (UTC):
- Capacity: escalations made on capacity this shift, and any still needed
  (optional):

## 7. Notes for the incoming analyst (optional)

<!-- One line each, for anything that does not fit above. Not a place for a
     new story about a case: the ledger carries that. Record observable
     technical activity only. -->

-

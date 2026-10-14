# Security Policy

This repository is a static documentation site with no backend, no
authentication, and no user data. The security surface is the build
pipeline, the published static assets, and the response headers set in
`vercel.json`.

## Reporting a vulnerability

If you find a security issue (a dependency vulnerability that reaches the
built site, an XSS vector in an interactive component, a header
misconfiguration), please report it privately rather than opening a public
issue:

- Use GitHub's [private vulnerability reporting](https://github.com/block/assured-methodology/security/advisories/new)
  for this repository, or
- Email **tzilber@block.xyz** with the details.

Include the affected file or page, reproduction steps, and impact as you
understand it. You should get an acknowledgment within 5 business days.

Good-faith security research is covered by the safe-harbor terms in
[Block's open-source security policy](https://github.com/block/.github/blob/main/SECURITY.md).
If a report goes unanswered, escalate to the Block Open Source Governance
Committee at
[open-source-governance@block.xyz](mailto:open-source-governance@block.xyz).

## Dependencies

The site tracks a supported Astro major (Astro gives security fixes only to
the current and previous major) and is rebuilt when an advisory affects a
dependency in the tree. Forced resolutions for transitive advisories live in
`pnpm-workspace.yaml`, and `pnpm audit` should report nothing at release
time. Advisory assessments are recorded under **Security** in
[CHANGELOG.md](CHANGELOG.md).

## Scope notes

- The methodology's *content* deliberately discusses attacker techniques at
  a recognition level. Content that describes techniques is not a
  vulnerability; a page that would give a copy-pasteable working exploit is
  a content defect. Report it with the *Content correction* issue template.
- **Content-integrity issues are security reports**: harmful commands in
  shipped templates or exercises, cited domains that have changed hands, or
  guidance that would weaken a defender's position if followed. Report these
  privately, as above.

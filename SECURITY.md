# Security Policy

This repository is a static documentation site with no backend, no
authentication, and no user data. The security surface is the build
pipeline, the published static assets, and the response headers set in
`vercel.json`.

## Reporting a vulnerability

If you find a security issue — a dependency vulnerability that reaches the
built site, an XSS vector in an interactive component, a header
misconfiguration — please report it privately rather than opening a public
issue:

- Use GitHub's [private vulnerability reporting](../../security/advisories/new)
  for this repository, or
- Email **tzilber@block.xyz** with the details.

Include the affected file or page, reproduction steps, and impact as you
understand it. You should get an acknowledgment within a few business days.

## Scope notes

- The methodology's *content* deliberately discusses attacker techniques at
  a recognition level. Content that describes techniques is not a
  vulnerability; a page that would give a copy-pasteable working exploit is
  a content defect — report it with the *Content correction* issue template.

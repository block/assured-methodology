#!/usr/bin/env node
/**
 * Fictional indicators must use reserved names. A worked example that
 * invents "invoice-records.com" hands a real, registrable domain to every
 * reader who pastes it into a lookup, and a public IP in a case narrative
 * belongs to somebody. This gate scans the case material (worked examples,
 * chapter transitions and quizzes that carry the cases, exercises, and the
 * downloadable templates) and fails on:
 *
 *   - a domain whose TLD is a real, delegated TLD, unless it is
 *     example.com / example.net / example.org (RFC 2606) or a subdomain of
 *     one, or it is on the reference allowlist below;
 *   - an IPv4 address outside the documentation ranges (RFC 5737:
 *     192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24) and the private and
 *     special-use ranges (RFC 1918, RFC 6598, loopback, link-local,
 *     multicast, unspecified, broadcast), unless allowlisted;
 *   - an IPv6 address outside 2001:db8::/32 (RFC 3849) and the local
 *     ranges (::1, fe80::/10, fc00::/7).
 *
 * Reserved TLDs (.example, .test, .invalid, .localhost, RFC 2606/6761) and
 * special-use internal suffixes (.local, RFC 6762; .internal, ICANN 2024)
 * always pass. Defanged forms (example[.]com, hxxp://) are refanged before
 * matching. Link targets (href="..." and Markdown "](...)") are references,
 * not case artifacts, and are skipped.
 *
 * Usage: node scripts/check-reserved-names.mjs [--all]
 *   --all  scan every page under src/content/docs (advisory survey; the
 *          gate's scope is the case material listed in TARGETS)
 * Exit codes: 0 pass, 1 non-reserved names found.
 */

import { existsSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { pathToFileURL } from "node:url";
import { walk } from "./lib/jsx-tags.mjs";

const ROOT = new URL("..", import.meta.url).pathname;

/** Files the gate covers, relative to the repo root. */
export function targetFiles(all = false) {
  const docs = join(ROOT, "src/content/docs");
  const templates = join(ROOT, "public/templates");
  const pick = all
    ? (p) => p.endsWith(".mdx")
    : (p) =>
        /\/(example|transition|quiz)\.mdx$/.test(p) ||
        /\/docs\/(exercises|fast-path)\.mdx$/.test(p);
  const out = walk(docs, pick);
  if (existsSync(templates))
    out.push(...walk(templates, (p) => /\.(md|mdx|txt|json|ya?ml)$/.test(p)));
  return out;
}

/**
 * Real domains that appear on purpose: the site itself, licence and
 * standards references, and genuine vendor endpoints that a scenario names
 * because the point of the case is that the destination is legitimate.
 * Match is exact or by subdomain. Add a domain here only when the real
 * destination is the point; invented infrastructure gets a .example name.
 */
export const DOMAIN_ALLOWLIST = [
  // The site and its licence, stamped in every template header.
  "assured-methodology.vercel.app",
  "creativecommons.org",
  // Reference projects linked or named as sources.
  "lolbas-project.github.io",
  "attack.mitre.org",
  "mitre.org",
  "github.com",
  "nist.gov",
  "cisa.gov",
  "w3.org",
  // The JSON Schema meta-schema URL in every public/templates/schema file.
  "json-schema.org",
  "asp.net",
  "abuse.ch",
  "insiderthreatmatrix.org",
  "securitydatasets.com",
  "splunk.com",
  "meltdownattack.com",
  // Case A: a genuine developer tool's update and API endpoints. The case
  // teaches that the destination is the vendor's real infrastructure.
  "cursor.sh",
  "cursorapi.com",
  // Genuine identity-provider and SaaS endpoints named in identity cases.
  "login.microsoftonline.com",
  "microsoft.com",
  "office.com",
  "office365.com",
  "outlook.com",
  "sharepoint.com",
  "okta.com",
  "google.com",
  "googleapis.com",
  "amazonaws.com",
  // Real service endpoints named as the thing to recognize: the Telegram Bot
  // API (abused for C2), GitHub's OIDC token issuer for workload identity,
  // and AWS's documented placeholder CloudFront distribution name.
  "api.telegram.org",
  "token.actions.githubusercontent.com",
  "d111111abcdef8.cloudfront.net",
  // Real hosting-platform suffixes cited on purpose in the B.A.D. Subdomain
  // Abuse and Domain Fronting cards: the lesson is that attackers rent
  // subdomains of trusted platforms, so the platform name must be real.
  "azurewebsites.net",
  "cloudfront.net",
  "pages.dev",
];

/** Real public IPs that may appear by name (public resolvers and the like). */
export const IP_ALLOWLIST = [];

const RESERVED_SUFFIXES = [
  "example",
  "test",
  "invalid",
  "localhost",
  "local",
  "internal",
];
const RFC2606_DOMAINS = ["example.com", "example.net", "example.org"];

/**
 * TLDs that count as "real". A curated set rather than the full IANA list:
 * dotted identifiers in case material (Mail.Read, Zone.Identifier,
 * Sites.FullControl.All, file names) collide with many newer gTLDs, and
 * the fictional domains people actually invent land in these.
 */
const REAL_TLDS = new Set(
  (
    "com net org info biz io co ai app dev cloud xyz top site online live tech store shop click link " +
    "me tv cc us uk eu de fr nl jp cn ru in br au ca ch se no fi pl es it be at cz kr ir kp ua by kz " +
    "tk ml ga cf gq pw su ws to ly gg vc sh lol icu buzz win bid loan work support help services " +
    "email digital network systems solutions security finance money bank pro mobi asia gov edu mil " +
    "page web site space website host hosting server cfd sbs rest monster quest cyou today news " +
    "zip mov ms ps py pl md so rs gs"
  ).split(/\s+/),
);

/**
 * TLDs that double as file extensions (install.sh, notes.md, invoice.zip,
 * Cursor.app). A name ending in one of these counts as a domain only when
 * it has three or more labels, was defanged, or follows "://" or "@".
 */
const AMBIGUOUS_TLDS = new Set([
  "sh",
  "zip",
  "mov",
  "md",
  "py",
  "pl",
  "ps",
  "ms",
  "so",
  "rs",
  "gs",
  "ai",
  "app",
  "io",
  "me",
  "co",
  "to",
  "cc",
  "in",
  "it",
  "be",
  "is",
  "no",
  "at",
  "us",
  "eu",
]);

export function isAllowedDomain(host) {
  const h = host.toLowerCase().replace(/\.$/, "");
  const tld = h.split(".").pop();
  if (RESERVED_SUFFIXES.includes(tld)) return true;
  const under = (d) => h === d || h.endsWith(`.${d}`);
  if (RFC2606_DOMAINS.some(under)) return true;
  return DOMAIN_ALLOWLIST.some(under);
}

function ipv4ToInt(ip) {
  return ip.split(".").reduce((acc, o) => acc * 256 + Number(o), 0);
}

const V4_ALLOWED = [
  ["192.0.2.0", 24], // RFC 5737 TEST-NET-1
  ["198.51.100.0", 24], // RFC 5737 TEST-NET-2
  ["203.0.113.0", 24], // RFC 5737 TEST-NET-3
  ["10.0.0.0", 8], // RFC 1918
  ["172.16.0.0", 12], // RFC 1918
  ["192.168.0.0", 16], // RFC 1918
  ["100.64.0.0", 10], // RFC 6598 shared address space
  ["127.0.0.0", 8], // loopback
  ["169.254.0.0", 16], // link-local
  ["224.0.0.0", 4], // multicast
  ["0.0.0.0", 32],
  ["255.255.255.255", 32],
].map(([base, bits]) => [ipv4ToInt(base), bits]);

export function isAllowedIPv4(ip) {
  if (IP_ALLOWLIST.includes(ip)) return true;
  const n = ipv4ToInt(ip);
  return V4_ALLOWED.some(([base, bits]) => {
    const size = 2 ** (32 - bits);
    return n >= base && n < base + size;
  });
}

export function isAllowedIPv6(ip) {
  const h = ip.toLowerCase();
  if (IP_ALLOWLIST.includes(h)) return true;
  if (h === "::1" || h === "::") return true;
  if (/^2001:0?db8(:|$)/.test(h)) return true; // RFC 3849
  if (/^fe[89ab][0-9a-f]:/.test(h)) return true; // fe80::/10
  if (/^f[cd][0-9a-f]{2}:/.test(h)) return true; // fc00::/7
  return false;
}

/** Undo common defanging so indicators are checked in their real form. */
export function refang(text) {
  return text
    .replace(/\[\.\]|\(\.\)|\{\.\}|\[dot\]|\(dot\)/gi, ".")
    .replace(/\[:\]/g, ":")
    .replace(/\[@\]|\[at\]/gi, "@")
    .replace(/\bhxxp(s?)/gi, "http$1");
}

/** Blank out link targets so references are not scanned as case artifacts. */
function maskLinkTargets(text) {
  const blank = (m) => m.replace(/[^\n]/g, " ");
  return text
    .replace(/\bhref\s*=\s*(["'])[^"']*\1/g, blank)
    .replace(/\]\((?:https?:\/\/|\/)[^)\s]*\)/g, blank)
    .replace(/^\s*import\s.*$/gm, blank)
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, blank)
    .replace(/\bxmlns(?::\w+)?\s*=\s*(["'])[^"']*\1/g, blank);
}

/** Hosts written in defanged form on this line, refanged and lowercased. */
function defangedHosts(line) {
  const out = new Set();
  for (const m of line.matchAll(
    /[\w.[\]()-]*(?:\[\.\]|\(\.\)|\{\.\}|\[dot\]|\(dot\))[\w.[\]()-]*/gi,
  )) {
    out.add(
      refang(m[0])
        .replace(/^[^\w]+|[^\w]+$/g, "")
        .toLowerCase(),
    );
  }
  return out;
}

const DOMAIN_RE =
  /(?<![\w.-])((?:[a-z0-9](?:[a-z0-9_-]{0,61}[a-z0-9])?\.)+([a-z][a-z0-9-]{1,23}))\b(?![.-]?\w)/gi;
const IPV4_RE = /(?<![\w.])((?:\d{1,3}\.){3}\d{1,3})(?![\w]|\.\d)/g;
const IPV6_RE =
  /(?<![\w:])((?:[0-9a-f]{1,4}:){2,7}(?::|[0-9a-f]{1,4})|(?:[0-9a-f]{1,4}:){1,6}:(?:[0-9a-f]{1,4}(?::[0-9a-f]{1,4}){0,5})?)(?![\w:])/gi;

/**
 * Return findings [{ line, kind, value }] for one source text. Line numbers
 * refer to the original text: defanging and masking preserve line breaks.
 */
export function scan(text) {
  const findings = [];
  const raw = maskLinkTargets(text);
  const lines = raw.split("\n");
  for (let li = 0; li < lines.length; li++) {
    const original = lines[li];
    const line = refang(original);
    const defanged = defangedHosts(original);

    for (const m of line.matchAll(DOMAIN_RE)) {
      const host = m[1];
      const tld = m[2].toLowerCase();
      if (!REAL_TLDS.has(tld) && !RESERVED_SUFFIXES.includes(tld)) continue;
      const labels = host.split(".").length;
      const before = line.slice(Math.max(0, m.index - 3), m.index);
      const urlish = before.endsWith("://") || before.endsWith("@");
      // An unquoted dotted name opening a JSX expression ({c.decision.at})
      // is a property access, not a hostname.
      if (before.endsWith("{")) continue;
      if (
        AMBIGUOUS_TLDS.has(tld) &&
        labels < 3 &&
        !defanged.has(host.toLowerCase()) &&
        !urlish
      )
        continue;
      if (isAllowedDomain(host)) continue;
      findings.push({
        line: li + 1,
        kind: "domain",
        value: host.toLowerCase(),
      });
    }

    for (const m of line.matchAll(IPV4_RE)) {
      const ip = m[1];
      if (ip.split(".").some((o) => Number(o) > 255)) continue;
      if (isAllowedIPv4(ip)) continue;
      findings.push({ line: li + 1, kind: "ipv4", value: ip });
    }

    for (const m of line.matchAll(IPV6_RE)) {
      const ip = m[1];
      const groups = ip.split(":").filter(Boolean);
      // Times (08:52:41) and MAC addresses (00:1a:2b:...) are all short
      // groups; a real IPv6 literal has a 3-4 digit group or a "::".
      if (!ip.includes("::") && !groups.some((g) => g.length >= 3)) continue;
      if (groups.length === 0 || !/[0-9]/.test(ip)) continue;
      if (isAllowedIPv6(ip)) continue;
      findings.push({ line: li + 1, kind: "ipv6", value: ip });
    }
  }
  return findings;
}

function main() {
  const all = process.argv.includes("--all");
  const files = targetFiles(all);
  const problems = [];
  for (const f of files) {
    const rel = relative(ROOT, f);
    for (const x of scan(readFileSync(f, "utf8")))
      problems.push({ file: rel, ...x });
  }
  const scope = all
    ? "all docs pages and templates"
    : "worked examples, transitions, quizzes, exercises and templates";
  if (problems.length) {
    console.error(
      `check-reserved-names: ${problems.length} non-reserved name(s) in ${scope}:`,
    );
    for (const p of problems)
      console.error(`  ${p.file}:${p.line}  ${p.kind}  ${p.value}`);
    console.error(
      "Fix: rename invented infrastructure to a reserved name (*.example, example.com, " +
        "192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24, 2001:db8::/32). If the real " +
        "destination is the point of the case, add it to DOMAIN_ALLOWLIST with a comment.",
    );
    process.exit(1);
  }
  console.log(`check-reserved-names: OK (${files.length} files; ${scope})`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) main();

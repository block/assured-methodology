#!/usr/bin/env node
/**
 * Builds the acronym index in src/data/acronyms.ts from the site's own
 * text, so the index on /docs/glossaries/acronyms/ lists exactly the
 * acronyms the site defines and links each one to where it is defined.
 *
 *   node scripts/build-acronyms.mjs           # rewrite src/data/acronyms.ts
 *   node scripts/build-acronyms.mjs --check   # exit 1 if it is out of date
 *
 * Sources, in precedence order for an acronym's link:
 *   1. The four glossaries: ASSURED terms (<dt> with an at-anchor span),
 *      C.L.E.A.R. terms (<dt> under a letter section), C.A.T. tool cards and
 *      B.A.D. entries (<article id> headings). A term written
 *      "Expansion (ACR)" or "ACR (Expansion)" yields an acronym.
 *   2. Every content page, scanned for acronyms defined on first use in
 *      prose, in the same two forms. A page adds an acronym the glossaries
 *      lack; for one they have, it records the first page that also
 *      defines it in prose. Pages are visited in reading order
 *      (src/data/navigation.ts readingOrder, then each groupSequences list,
 *      then the remaining pages by route), so "first use" means the first
 *      page a reader following the site meets it on.
 *
 * A candidate only counts when the acronym's letters can be read off the
 * expansion's words in order (each non-stopword contributes its first
 * letter, optionally more letters from inside the word, as in "IdP" or
 * "PowerShell"). That rejects "Awareness (GDPR)" and "(see below)" style
 * parentheticals without a hand list. Code, imports, JSX expressions and
 * <style>/<script> blocks are stripped before scanning.
 *
 * Output is sorted and stable, so --check is deterministic.
 */

import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const DOCS = join(ROOT, "src/content/docs");
const OUT = join(ROOT, "src/data/acronyms.ts");
const SELF_ROUTE = "/docs/glossaries/acronyms/";
const CHECK = process.argv.includes("--check");

// Import navigation.ts directly (Node 24 strips erasable types); silence the
// one-time "module type not specified" notice, as check-reading-order does.
const emitWarning = process.emitWarning;
process.emitWarning = (warning, ...rest) => {
  const text = typeof warning === "string" ? warning : (warning?.message ?? "");
  if (/MODULE_TYPELESS_PACKAGE_JSON|Reparsing as ES module|is not specified/.test(text)) return;
  return emitWarning.call(process, warning, ...rest);
};
const { readingOrder, groupSequences } = await import(new URL("../src/data/navigation.ts", import.meta.url).href);
process.emitWarning = emitWarning;

// ---------------------------------------------------------------- text utils

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#42;/g, "*")
    .replace(/&#126;/g, "~")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));

const clean = (s) =>
  decode(s.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();

/**
 * Split an MDX body into prose chunks, each tagged with the nearest
 * preceding explicit anchor (an element with a literal id="..."), so a
 * definition links to the glossary card or section it sits in. Markdown
 * headings and id-less <h1>/<h2> elements end the current anchor: their
 * slugs are minted at build time, and a guessed slug could break the link
 * check.
 * Frontmatter, imports, code, <style>/<script> and JSX expressions are
 * stripped first.
 */
function chunksOf(src) {
  let t = src.replace(/^---\n[\s\S]*?\n---\n/, "");
  t = t.replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<script[\s\S]*?<\/script>/g, " ");
  t = t.replace(/```[\s\S]*?```/g, " ").replace(/~~~[\s\S]*?~~~/g, " ");
  t = t.replace(/^(?:import|export)\s.*$/gm, " ");
  t = t.replace(/<code[\s\S]*?<\/code>/g, " ").replace(/<pre[\s\S]*?<\/pre>/g, " ");
  t = t.replace(/`[^`\n]*`/g, " ");
  // JSX expressions, innermost first.
  for (let i = 0; i < 6; i++) t = t.replace(/\{[^{}]*\}/g, " ");
  const markers = [];
  for (const m of t.matchAll(/<(?:article|section|h[1-6]|dt|dd|span|div|li|p|table|figure|details)\b[^>]*?\sid="([^"]+)"/g)) {
    markers.push({ at: m.index, anchor: m[1] });
  }
  for (const m of t.matchAll(/^#{1,6}\s/gm)) markers.push({ at: m.index, anchor: null });
  // An id-less <h1>/<h2> starts a new untargetable section unless it is the
  // title of the element that just carried an id (<section id="A"><h2>A</h2>).
  const ided = [...markers].sort((a, b) => a.at - b.at);
  for (const m of t.matchAll(/<h[12](?![^>]*\sid=)[\s>]/g)) {
    const prev = ided.filter((x) => x.at < m.index).pop();
    if (prev && prev.anchor && m.index - prev.at < 400) continue;
    markers.push({ at: m.index, anchor: null });
  }
  markers.sort((a, b) => a.at - b.at);
  const chunks = [];
  let from = 0;
  let anchor = null;
  for (const mk of markers) {
    chunks.push({ anchor, text: t.slice(from, mk.at) });
    from = mk.at;
    anchor = mk.anchor;
  }
  chunks.push({ anchor, text: t.slice(from) });
  return chunks
    .map((c) => ({
      anchor: c.anchor,
      text: clean(c.text.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/\*\*|__/g, "")),
    }))
    .filter((c) => c.text);
}

// ---------------------------------------------------------------- matcher

const STOP = new Set(["and", "of", "the", "for", "in", "on", "to", "a", "an", "by", "with", "&", "or", "as", "at", "from", "via"]);

/**
 * Letters an acronym must be spelled from, with their case. A plural "s"
 * (IOCs) is dropped by the caller; C2 reads as C and C.
 */
function lettersOf(acr) {
  const m = acr.match(/^([A-Z])2$/);
  if (m) return [m[1], m[1]];
  return [...acr.replace(/[^A-Za-z]/g, "")];
}

/**
 * Can `letters` be read off `words` in order, using every non-stopword?
 * Each word gives its first letter, and may give more from inside itself:
 * any letter where the acronym letter is lowercase (IdP from "Identity
 * Provider") or the word has a capital there (SQL, PowerShell); otherwise
 * at most one, not the word's last letter, and only when the expansion has
 * two or more content words (HTTP from "Hypertext Transfer Protocol", but
 * not "MAM" from "Management").
 */
function spells(letters, words) {
  const content = words.filter((w) => !STOP.has(w.toLowerCase())).length;
  const memo = new Map();
  const go = (li, wi) => {
    const key = `${li},${wi}`;
    if (memo.has(key)) return memo.get(key);
    let ok = false;
    if (wi === words.length) ok = li === letters.length;
    else {
      const raw = words[wi];
      const w = raw.toLowerCase();
      if (STOP.has(w) && go(li, wi + 1)) ok = true;
      if (!ok && li < letters.length && w[0] === letters[li].toLowerCase()) {
        let k = li + 1;
        let pos = 1;
        let loose = 0;
        if (go(k, wi + 1)) ok = true;
        while (!ok && k < letters.length) {
          const want = letters[k];
          let at = -1;
          for (let i = pos; i < raw.length; i++) {
            const c = raw[i];
            if (c.toLowerCase() !== want.toLowerCase()) continue;
            const strict = want === want.toLowerCase() || c === c.toUpperCase();
            if (strict || (content > 1 && loose === 0 && i < raw.length - 1)) {
              if (!strict) loose++;
              at = i;
              break;
            }
          }
          if (at < 0) break;
          pos = at + 1;
          k++;
          if (go(k, wi + 1)) ok = true;
        }
      }
    }
    memo.set(key, ok);
    return ok;
  };
  return go(0, 0);
}

/** Singular form of a plural acronym (IOCs -> IOC, IdPs -> IdP), or null. */
function singular(acr) {
  const m = acr.match(/^(.*[A-Z])s$/);
  return m && isAcronym(m[1]) ? m[1] : null;
}

/** Singular form of an expansion whose acronym was plural. */
function singularExpansion(exp) {
  return exp.replace(/(\w)s$/, (all, c) => (c === "s" ? all : c));
}

const ACR = /^(?=(?:[^A-Z]*[A-Z]){2})[A-Z][A-Za-z0-9&/.-]{1,11}$/;
const isAcronym = (s) => ACR.test(s) && !/^[A-Z][a-z]+$/.test(s) && !/[.-]$/.test(s) && !/^[IVXLC]+$/.test(s);

const wordsOf = (s) =>
  s
    .replace(/[“”"'’()]/g, " ")
    .split(/[\s/-]+/)
    .filter(Boolean);

/** "Expansion Words (ACR)": the shortest run of preceding words that spells ACR. */
function expansionBefore(acr, before) {
  const letters = lettersOf(singular(acr) ?? acr);
  if (letters.length < 2) return null;
  const tokens = before.split(/\s+/).filter(Boolean);
  for (let n = 1; n <= Math.min(tokens.length, letters.length + 6); n++) {
    const slice = tokens.slice(tokens.length - n);
    const words = wordsOf(slice.join(" "));
    if (words.length === 0) continue;
    if (STOP.has(words[0].toLowerCase())) continue;
    if (spells(letters, words)) {
      const text = slice.join(" ").replace(/^[^A-Za-z0-9]+/, "").replace(/[,;:]+$/, "");
      return text;
    }
  }
  return null;
}

/** "ACR (Expansion Words)": the whole parenthetical must spell ACR. */
function expansionAfter(acr, inside) {
  const letters = lettersOf(singular(acr) ?? acr);
  if (letters.length < 2) return null;
  const text = inside.split(/[;,:]/)[0].trim();
  if (!/^[A-Za-z]/.test(text) || text.split(/\s+/).length > letters.length + 6) return null;
  if (/^(formerly|now|also|see|e\.g|i\.e|or|the)\b/i.test(text)) return null;
  return spells(letters, wordsOf(text)) ? text : null;
}

/** Every acronym definition in a run of prose, in order of appearance. */
function definitionsIn(text) {
  const found = [];
  // Form 1: "... Expansion Words (ACR)".
  for (const m of text.matchAll(/\(([^()]{2,12})\)/g)) {
    const acr = m[1].trim();
    if (!isAcronym(acr)) continue;
    const before = text.slice(Math.max(0, m.index - 160), m.index).split(/[.:;!?(]\s/).pop();
    const exp = expansionBefore(acr, before);
    if (exp) found.push({ at: m.index, acronym: acr, expansion: exp });
  }
  // Form 2: "ACR (Expansion Words)".
  for (const m of text.matchAll(/(?<![A-Za-z0-9])([A-Z][A-Za-z0-9&/.-]{1,11}) \(([^()]{3,90})\)/g)) {
    const acr = m[1];
    if (!isAcronym(acr)) continue;
    const exp = expansionAfter(acr, m[2]);
    if (exp) found.push({ at: m.index, acronym: acr, expansion: exp });
  }
  return found.map(toSingular).sort((a, b) => a.at - b.at);
}

function toSingular(d) {
  const one = singular(d.acronym);
  return one ? { ...d, acronym: one, expansion: singularExpansion(d.expansion) } : d;
}

// ---------------------------------------------------------------- pages

function* walk(dir) {
  for (const name of readdirSync(dir).sort()) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (name.endsWith(".mdx")) yield p;
  }
}

const pages = [];
for (const file of walk(DOCS)) {
  const src = readFileSync(file, "utf8");
  const fm = (src.match(/^---\n([\s\S]*?)\n---\n/) || [, ""])[1];
  const slug = (fm.match(/^slug:\s*["']?([^"'\n]+)["']?\s*$/m) || [])[1];
  const title = clean((fm.match(/^title:\s*["']?(.+?)["']?\s*$/m) || [, ""])[1]);
  let id = relative(DOCS, file).split(sep).join("/").replace(/\.mdx$/, "").replace(/(^|\/)index$/, "");
  if (slug) id = slug;
  const route = `/docs/${id ? `${id.toLowerCase()}/` : ""}`;
  pages.push({ file, route, title, src });
}

const order = [...readingOrder, ...Object.values(groupSequences).flat()];
const rank = (route) => {
  const i = order.indexOf(route);
  return i < 0 ? order.length : i;
};
pages.sort((a, b) => rank(a.route) - rank(b.route) || a.route.localeCompare(b.route));

// ---------------------------------------------------------------- glossaries

const glossaryDefs = []; // { acronym, expansion, href, source, sourceTitle }
const GLOSSARY_TITLES = {
  assured: "ASSURED glossary",
  clear: "C.L.E.A.R. glossary",
  cat: "C.A.T. glossary",
  bad: "B.A.D. glossary",
};

function fromTerm(term) {
  const out = [];
  const m1 = term.match(/^(.+?)\s*\(([^()]+)\)$/);
  if (!m1) return out;
  const [, head, paren] = m1;
  // "Expansion (ACR)" or "Expansion (ACR, note)"
  const parenAcr = paren.split(/[,;]/)[0].trim();
  if (isAcronym(parenAcr) && spells(lettersOf(singular(parenAcr) ?? parenAcr), wordsOf(head))) {
    out.push({ acronym: parenAcr, expansion: head.trim() });
  }
  // "ACR (Expansion)" (the head may be "Vendor ACR")
  const headAcr = head.trim().split(/\s+/).pop();
  if (isAcronym(headAcr)) {
    const exp = expansionAfter(headAcr, paren);
    if (exp) out.push({ acronym: headAcr, expansion: exp });
  }
  return out.map(toSingular);
}

{
  const src = readFileSync(join(DOCS, "glossaries/assured.mdx"), "utf8");
  for (const m of src.matchAll(/<dt><span id="([^"]+)" class="at-anchor"><\/span>(.*?)<\/dt>/g)) {
    for (const d of fromTerm(clean(m[2]))) {
      glossaryDefs.push({ ...d, href: `/docs/glossaries/assured/#${m[1]}`, source: "assured" });
    }
  }
}
{
  const src = readFileSync(join(DOCS, "glossaries/clear.mdx"), "utf8");
  let letter = "";
  for (const line of src.split("\n")) {
    const s = line.match(/<section id="([A-Z])"/);
    if (s) letter = s[1];
    for (const m of line.matchAll(/<dt>(.*?)<\/dt>/g)) {
      for (const d of fromTerm(clean(m[1]))) {
        glossaryDefs.push({ ...d, href: `/docs/glossaries/clear/#${letter}`, source: "clear" });
      }
    }
  }
}
for (const key of ["cat", "bad"]) {
  const src = readFileSync(join(DOCS, `glossaries/${key}.mdx`), "utf8");
  for (const m of src.matchAll(/<article id="([^"]+)" class="[^"]+"><h3>(.*?)<\/h3>/g)) {
    for (const d of fromTerm(clean(m[2]))) {
      glossaryDefs.push({ ...d, href: `/docs/glossaries/${key}/#${m[1]}`, source: key });
    }
  }
}

// ---------------------------------------------------------------- merge

const norm = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/s\b/g, "")
    .trim();
const keyOf = (acronym, expansion) => `${acronym.toLowerCase()}\u0000${norm(expansion)}`;
const PRECEDENCE = ["assured", "clear", "cat", "bad"];

const entries = new Map();
for (const g of [...glossaryDefs].sort((a, b) => PRECEDENCE.indexOf(a.source) - PRECEDENCE.indexOf(b.source))) {
  const k = keyOf(g.acronym, g.expansion);
  if (entries.has(k)) continue;
  entries.set(k, {
    acronym: g.acronym,
    expansion: g.expansion,
    href: g.href,
    source: g.source,
    sourceTitle: GLOSSARY_TITLES[g.source],
  });
}

const GLOSSARY_ROUTES = new Set(["assured", "clear", "cat", "bad"].map((g) => `/docs/glossaries/${g}/`));
for (const page of pages) {
  if (page.route === SELF_ROUTE) continue;
  for (const chunk of chunksOf(page.src)) {
    const href = chunk.anchor ? `${page.route}#${chunk.anchor}` : page.route;
    for (const d of definitionsIn(chunk.text)) {
      // A page adds a new entry only for an acronym nothing defines yet;
      // otherwise it can only be the first use of an existing one (pages
      // vary the wording: "threat-intel platform", "threat intelligence
      // platform").
      const k = keyOf(d.acronym, d.expansion);
      const existing =
        entries.get(k) ?? [...entries.values()].find((e) => e.acronym.toLowerCase() === d.acronym.toLowerCase());
      if (existing) {
        if (!existing.firstUse && !GLOSSARY_ROUTES.has(page.route)) {
          existing.firstUse = { href, title: page.title };
        }
        continue;
      }
      entries.set(k, { acronym: d.acronym, expansion: d.expansion, href, source: "page", sourceTitle: page.title });
    }
  }
}

const list = [...entries.values()].sort(
  (a, b) =>
    a.acronym.localeCompare(b.acronym, "en", { sensitivity: "base" }) ||
    a.acronym.localeCompare(b.acronym) ||
    a.expansion.localeCompare(b.expansion, "en", { sensitivity: "base" }),
);

// ---------------------------------------------------------------- emit

const header = `/**
 * Auto-generated acronym index. Do not edit by hand.
 * Built by scripts/build-acronyms.mjs from the four glossaries and from
 * acronyms defined on first use across the content pages. Rebuild with
 * \`node scripts/build-acronyms.mjs\`; check with \`--check\`.
 */

export interface AcronymEntry {
  /** The acronym as the site writes it. */
  acronym: string;
  /** Its expansion, as written where it is defined. */
  expansion: string;
  /** Where it is defined: a glossary entry, or the page that first defines it. */
  href: string;
  /** "assured" | "clear" | "cat" | "bad" for a glossary entry; "page" for first use in prose. */
  source: "assured" | "clear" | "cat" | "bad" | "page";
  /** Title of the glossary or page at href. */
  sourceTitle: string;
  /** For glossary entries: the first page, in reading order, that also defines it in prose. */
  firstUse?: { href: string; title: string };
}

`;
const body = `export const acronyms: AcronymEntry[] = ${JSON.stringify(list, null, 2)};\n`;
const text = header + body;

if (CHECK) {
  let current = "";
  try {
    current = readFileSync(OUT, "utf8");
  } catch {
    // missing file is stale
  }
  if (current !== text) {
    console.error("build-acronyms: src/data/acronyms.ts is out of date; run node scripts/build-acronyms.mjs");
    process.exit(1);
  }
  console.log(`build-acronyms: OK (${list.length} acronyms)`);
} else {
  writeFileSync(OUT, text);
  const bySource = list.reduce((acc, e) => ((acc[e.source] = (acc[e.source] ?? 0) + 1), acc), {});
  console.log(`build-acronyms: wrote ${list.length} acronyms`, bySource);
}

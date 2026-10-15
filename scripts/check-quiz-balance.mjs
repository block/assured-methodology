#!/usr/bin/env node
/**
 * Quiz key hygiene. A multiple-choice quiz whose key sits in the same
 * position, or is reliably the longest option, teaches test-taking instead
 * of triage. This gate reads every <Quiz>/<QuizItem> block under
 * src/content/docs and fails when:
 *
 *   1. structure: an item's `answer` is not one of its option values, option
 *      values repeat, an item has fewer than 3 or more than 5 options, or
 *      the prompt or explanation is empty;
 *   2. position: one answer position (A, B, C, ...) holds more than 35% of
 *      the keys across the seven chapter quizzes combined, or within any
 *      single quiz of 8 or more items;
 *   3. length cue: the key is the strictly longest option (by characters)
 *      in more than 40% of items, across the chapter quizzes combined or
 *      within any single quiz of 8 or more items.
 *
 * Quizzes with fewer than 8 items are reported but not position- or
 * length-gated: with 5 or 6 items, one key more or less swings the share by
 * 15-20 points and the ratio says nothing.
 *
 * Usage: node scripts/check-quiz-balance.mjs [--json]
 * Exit codes: 0 pass, 1 violations found, 2 a quiz could not be parsed.
 */

import { readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { pathToFileURL } from "node:url";
import { findTags, walk } from "./lib/jsx-tags.mjs";

const ROOT = new URL("..", import.meta.url).pathname;
const DOCS = join(ROOT, "src/content/docs");

export const MAX_POSITION_SHARE = 0.35;
export const MAX_LONGEST_SHARE = 0.4;
export const MIN_ITEMS_FOR_QUIZ_GATE = 8;
const LETTERS = "ABCDEFGH";

/** Chapter quizzes are the `<chapter>/quiz.mdx` pages. */
export function isChapterQuiz(file) {
  return /(^|\/)[a-z-]+\/quiz\.mdx$/.test(file);
}

/**
 * Parse one MDX source into quizzes:
 * [{ file, line, title, items: [{ line, prompt, options, answer, explanation }] }].
 * QuizItems outside any <Quiz> are collected into a synthetic quiz so they
 * are still checked.
 */
export function parseQuizzes(src, file) {
  const quizzes = findTags(src, "Quiz").map((t) => {
    const close = src.indexOf("</Quiz>", t.end);
    return {
      file,
      line: t.line,
      title:
        typeof t.props.title === "string" ? t.props.title : "(untitled quiz)",
      start: t.start,
      end: close < 0 ? src.length : close,
      items: [],
    };
  });
  let orphan = null;
  for (const t of findTags(src, "QuizItem")) {
    const item = {
      line: t.line,
      prompt: t.props.prompt,
      options: t.props.options,
      answer: t.props.answer,
      explanation: t.props.explanation,
    };
    const owner = quizzes.find((q) => t.start > q.start && t.start < q.end);
    if (owner) owner.items.push(item);
    else {
      orphan ??= {
        file,
        line: t.line,
        title: "(QuizItem outside <Quiz>)",
        items: [],
      };
      orphan.items.push(item);
    }
  }
  if (orphan) quizzes.push(orphan);
  return quizzes.map(({ start, end, ...q }) => q);
}

/** Structural problems for one item, as strings. */
export function structuralErrors(item) {
  const errs = [];
  if (!Array.isArray(item.options)) return ["options is not an array"];
  const values = item.options.map((o) => o?.value);
  if (item.options.length < 3 || item.options.length > 5) {
    errs.push(`has ${item.options.length} options (expected 3 to 5)`);
  }
  if (new Set(values).size !== values.length)
    errs.push(`repeats an option value (${values.join(", ")})`);
  if (
    item.options.some((o) => typeof o?.label !== "string" || !o.label.trim())
  ) {
    errs.push("has an option with an empty label");
  }
  if (!values.includes(item.answer))
    errs.push(`answer "${item.answer}" is not an option value`);
  if (typeof item.prompt !== "string" || !item.prompt.trim())
    errs.push("has an empty prompt");
  if (typeof item.explanation !== "string" || !item.explanation.trim()) {
    errs.push("has an empty explanation");
  }
  return errs;
}

/** Key position (0-based) and whether the key is the strictly longest option. */
export function keyFacts(item) {
  const pos = item.options.findIndex((o) => o.value === item.answer);
  const lens = item.options.map((o) => o.label.trim().length);
  const keyLen = lens[pos];
  const strictlyLongest = lens.every((l, i) => i === pos || l < keyLen);
  return { pos, strictlyLongest };
}

/** Distribution summary for a list of well-formed items. */
export function summarize(items) {
  const positions = {};
  let longest = 0;
  for (const it of items) {
    const { pos, strictlyLongest } = keyFacts(it);
    const letter = LETTERS[pos];
    positions[letter] = (positions[letter] ?? 0) + 1;
    if (strictlyLongest) longest++;
  }
  const n = items.length;
  const [topLetter, topCount] = Object.entries(positions).sort(
    (a, b) => b[1] - a[1],
  )[0] ?? ["-", 0];
  return {
    n,
    positions,
    topLetter,
    topShare: n ? topCount / n : 0,
    longest,
    longestShare: n ? longest / n : 0,
  };
}

/** Gate violations for one summary, labelled with `scope`. */
export function balanceErrors(scope, s) {
  const errs = [];
  if (s.topShare > MAX_POSITION_SHARE) {
    errs.push(
      `${scope}: position ${s.topLetter} holds ${pct(s.topShare)} of ${s.n} keys ` +
        `(limit ${pct(MAX_POSITION_SHARE)}); distribution ${fmtPositions(s.positions)}`,
    );
  }
  if (s.longestShare > MAX_LONGEST_SHARE) {
    errs.push(
      `${scope}: the key is the strictly longest option in ${s.longest} of ${s.n} items ` +
        `(${pct(s.longestShare)}, limit ${pct(MAX_LONGEST_SHARE)})`,
    );
  }
  return errs;
}

export function pct(x) {
  return `${Math.round(x * 1000) / 10}%`;
}

function fmtPositions(p) {
  return [...LETTERS]
    .filter((l) => p[l])
    .map((l) => `${l}=${p[l]}`)
    .join(" ");
}

/** Run the whole gate over a set of { file, src } inputs. */
export function checkAll(inputs) {
  const parseErrors = [];
  const structure = [];
  const balance = [];
  const report = [];
  const chapterItems = [];

  for (const { file, src } of inputs) {
    let quizzes;
    try {
      quizzes = parseQuizzes(src, file);
    } catch (e) {
      parseErrors.push(`${file}: ${e.message}`);
      continue;
    }
    for (const q of quizzes) {
      const good = [];
      for (const it of q.items) {
        const errs = structuralErrors(it);
        if (errs.length)
          for (const e of errs)
            structure.push(`${file}:${it.line}: QuizItem ${e}`);
        else good.push(it);
      }
      const s = summarize(good);
      const gated = good.length >= MIN_ITEMS_FOR_QUIZ_GATE;
      report.push({ file, line: q.line, title: q.title, gated, ...s });
      if (gated)
        balance.push(...balanceErrors(`${file}:${q.line} "${q.title}"`, s));
      if (isChapterQuiz(file)) chapterItems.push(...good);
    }
  }

  const chapter = summarize(chapterItems);
  if (chapterItems.length)
    balance.push(...balanceErrors("chapter quizzes combined", chapter));
  return { parseErrors, structure, balance, report, chapter };
}

function main() {
  const json = process.argv.includes("--json");
  const files = walk(DOCS, (p) => p.endsWith(".mdx"));
  const inputs = files
    .map((p) => ({ file: relative(ROOT, p), src: readFileSync(p, "utf8") }))
    .filter(({ src }) => src.includes("<QuizItem"));
  const res = checkAll(inputs);

  if (json) {
    console.log(JSON.stringify(res, null, 2));
  } else {
    console.log(
      "check-quiz-balance: key positions and longest-key share per quiz",
    );
    for (const r of res.report) {
      const tag = r.gated ? "" : "  (under 8 items: reported, not gated)";
      console.log(
        `  ${r.file}:${r.line}  n=${r.n}  ${fmtPositions(r.positions) || "-"}  ` +
          `longest=${r.longest}/${r.n} (${pct(r.longestShare)})${tag}`,
      );
    }
    const c = res.chapter;
    console.log(
      `  chapter quizzes combined  n=${c.n}  ${fmtPositions(c.positions)}  ` +
        `top=${c.topLetter} ${pct(c.topShare)}  longest=${c.longest}/${c.n} (${pct(c.longestShare)})`,
    );
  }

  const problems = [...res.parseErrors, ...res.structure, ...res.balance];
  if (res.parseErrors.length) {
    for (const e of res.parseErrors)
      console.error(`check-quiz-balance: parse error: ${e}`);
    process.exit(2);
  }
  if (problems.length) {
    console.error(`\ncheck-quiz-balance: ${problems.length} problem(s):`);
    for (const e of problems) console.error(`  - ${e}`);
    console.error(
      "Fix: move keys so no position exceeds 35%, and even out option lengths so the key " +
        "is not the giveaway. Shuffle option order, not option values, so explanations stay valid.",
    );
    process.exit(1);
  }
  console.log("check-quiz-balance: OK");
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) main();

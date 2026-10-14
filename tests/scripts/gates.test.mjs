// Unit tests for the fast build gates in scripts/. Run with `pnpm test:gates`
// (node --test); no browser, build or network needed.

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

import {
  check,
  extract,
  indexBundle,
} from "../../scripts/check-attack-ids.mjs";
import {
  checkAll,
  keyFacts,
  parseQuizzes,
  structuralErrors,
} from "../../scripts/check-quiz-balance.mjs";
import {
  isAllowedIPv4,
  isAllowedIPv6,
  scan,
} from "../../scripts/check-reserved-names.mjs";
import { findTags } from "../../scripts/lib/jsx-tags.mjs";

const item = (answer, labels, extra = {}) =>
  [
    "  <QuizItem",
    `    prompt="Q?"`,
    "    options={[",
    ...labels.map(
      (l, i) =>
        `      { value: "${"abcde"[i]}", label: ${JSON.stringify(l)} },`,
    ),
    "    ]}",
    `    answer="${answer}"`,
    `    explanation="${extra.explanation ?? "Because."}"`,
    "  />",
  ].join("\n");

const quiz = (items) => `<Quiz title="T">\n${items.join("\n")}\n</Quiz>\n`;

describe("jsx-tags", () => {
  it("reads string and expression props, including braces inside strings", () => {
    const src = `<QuizItem prompt="Say {hi}" options={[{ value: "a", label: "x } y" }]} answer="a" />`;
    const [t] = findTags(src, "QuizItem");
    assert.equal(t.props.prompt, "Say {hi}");
    assert.deepEqual(t.props.options, [{ value: "a", label: "x } y" }]);
    assert.equal(t.selfClosing, true);
  });

  it("does not confuse <Quiz> with <QuizItem>", () => {
    const src = quiz([item("a", ["1", "2", "3"])]);
    assert.equal(findTags(src, "Quiz").length, 1);
    assert.equal(findTags(src, "QuizItem").length, 1);
  });
});

describe("check-quiz-balance", () => {
  it("flags a key that is not an option value, and too few options", () => {
    const [q] = parseQuizzes(quiz([item("z", ["one", "two"])]), "x.mdx");
    const errs = structuralErrors(q.items[0]);
    assert.ok(errs.some((e) => e.includes("not an option value")));
    assert.ok(errs.some((e) => e.includes("2 options")));
  });

  it("detects the strictly longest key", () => {
    assert.equal(
      keyFacts({
        answer: "b",
        options: [
          { value: "a", label: "aa" },
          { value: "b", label: "bbbb" },
        ],
      }).strictlyLongest,
      true,
    );
    assert.equal(
      keyFacts({
        answer: "b",
        options: [
          { value: "a", label: "aaaa" },
          { value: "b", label: "bbbb" },
        ],
      }).strictlyLongest,
      false,
    );
  });

  it("fails a quiz of 8+ items whose keys bunch in one position", () => {
    const items = Array.from({ length: 8 }, (_, i) =>
      item(i < 4 ? "b" : "abcd"[i % 4], ["w", "x", "y", "z"]),
    );
    const res = checkAll([
      { file: "src/content/docs/glossaries/g.mdx", src: quiz(items) },
    ]);
    assert.ok(
      res.balance.some((e) => e.includes("position B")),
      res.balance.join("\n"),
    );
  });

  it("does not gate a short quiz, and passes a balanced one", () => {
    const short = Array.from({ length: 5 }, () => item("a", ["w", "x", "y"]));
    assert.deepEqual(
      checkAll([{ file: "a/b.mdx", src: quiz(short) }]).balance,
      [],
    );
    const balanced = Array.from({ length: 8 }, (_, i) =>
      item("abcd"[i % 4], ["ww", "xx", "yy", "zz"]),
    );
    assert.deepEqual(
      checkAll([{ file: "a/b.mdx", src: quiz(balanced) }]).balance,
      [],
    );
  });

  it("fails when the key is the longest option in over 40% of items", () => {
    const items = Array.from({ length: 8 }, (_, i) => {
      const k = "abcd"[i % 4];
      const labels = ["w", "x", "y", "z"].map((l, j) =>
        "abcd"[j] === k && i < 4 ? `${l} longer` : l,
      );
      return item(k, labels);
    });
    const res = checkAll([
      { file: "src/content/docs/risk/quiz.mdx", src: quiz(items) },
    ]);
    assert.ok(
      res.balance.some((e) => e.includes("strictly longest")),
      res.balance.join("\n"),
    );
  });
});

describe("check-reserved-names", () => {
  it("flags real domains, defanged or not, and public IPs", () => {
    const found = scan(
      "Beacon to invoice-records[.]com, mail from a@acme-corp.com, then 8.8.4.4 and 2606:4700::1111.",
    ).map((f) => f.value);
    assert.deepEqual(found, [
      "invoice-records.com",
      "acme-corp.com",
      "8.8.4.4",
      "2606:4700::1111",
    ]);
  });

  it("passes reserved names, documentation ranges and file names", () => {
    const text =
      "invoice-records[.]example, mail.example.com, corp.local, 192.0.2.7, 198.51.100.23, 203.0.113.77, " +
      "10.20.8.114, 2001:db8::5, invoice.zip, install.sh, Cursor.app, Mail.Read, 08:52:41, 00:1a:2b:3c:4d:5e";
    assert.deepEqual(scan(text), []);
  });

  it("treats link targets as references", () => {
    assert.deepEqual(
      scan(
        '<a href="https://evil-real.com/x">ref</a> and [ref](https://evil-real.com/y)',
      ),
      [],
    );
  });

  it("knows the special-use ranges", () => {
    assert.equal(isAllowedIPv4("172.31.255.255"), true);
    assert.equal(isAllowedIPv4("172.32.0.1"), false);
    assert.equal(isAllowedIPv6("fe80::1"), true);
    assert.equal(isAllowedIPv6("2001:4860::8888"), false);
  });
});

describe("check-attack-ids", () => {
  const bundle = JSON.parse(
    readFileSync(
      new URL("../fixtures/attack-mini.json", import.meta.url),
      "utf8",
    ),
  );
  const index = indexBundle(bundle);
  const run = (text, file = "src/content/docs/x.mdx") =>
    check(
      extract(text).map((o) => ({ file, ...o })),
      index,
    );

  it("reads the collection version and builds sub-technique full names", () => {
    assert.equal(index.version, "19.2");
    assert.equal(
      index.byId.get("T1110.003").fullName,
      "Brute Force: Password Spraying",
    );
  });

  it("accepts correct IDs and names in every adjacency shape", () => {
    const text = [
      "Spearphishing (T1566.001 (Spearphishing Attachment)).",
      "ATT&CK T1059.001, PowerShell, ran.",
      "Data Encrypted for Impact (T1486) follows.",
      "| Brute Force: Password Spraying | T1110.003 |",
      "T1566.001 (Attachment) is shorthand.",
      "See https://attack.mitre.org/techniques/T1059/001/ and TA0112.",
    ].join("\n");
    assert.deepEqual(run(text).errors, []);
  });

  it("flags unknown IDs, wrong names and revoked IDs", () => {
    const { errors } = run(
      "T1999 does not exist. T1059.001 (Visual Basic). Impair Defenses (T1562) is used here.",
    );
    assert.equal(errors.length, 3, errors.join("\n"));
  });

  it("allows revoked IDs and stale names in a historical sentence", () => {
    const { errors, notes } = run(
      "This replaced T1562 Impair Defenses. The old label TA0005 Defense Evasion is stale.",
    );
    assert.deepEqual(errors, []);
    assert.equal(notes.length, 2);
  });

  it("does not read prose after an ID as a name claim", () => {
    assert.deepEqual(
      run("Run a test for T1059.001 on a test host at 08:41 (T1486).").errors,
      [],
    );
  });
});

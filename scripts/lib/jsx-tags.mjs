/**
 * Minimal, dependency-free reader for JSX component tags in MDX source.
 *
 * The build gates need the props of a handful of components (Quiz,
 * QuizItem) without pulling the MDX compiler into a pre-build check. The
 * site's MDX uses two attribute forms only:
 *
 *   name="literal"   JSX string; cannot contain its own quote character
 *   name={expr}      JS expression; braces are matched with string and
 *                    template-literal awareness
 *
 * Expression values are evaluated in an empty vm context, so only literal
 * data (arrays, objects, strings, numbers) is supported. That is all the
 * quiz markup uses; anything else is reported as an error by the caller.
 */

import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import vm from "node:vm";

/** 1-based line number of a character offset. */
export function lineOf(src, offset) {
  let line = 1;
  for (let i = 0; i < offset && i < src.length; i++)
    if (src[i] === "\n") line++;
  return line;
}

/** Index just past the `}` that closes the `{` at `start`. */
function matchBrace(src, start) {
  let depth = 0;
  for (let i = start; i < src.length; i++) {
    const c = src[i];
    if (c === '"' || c === "'" || c === "`") {
      i = skipString(src, i);
      continue;
    }
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) return i + 1;
    }
  }
  throw new Error("unbalanced braces");
}

/** Index of the closing quote of the JS string literal opening at `start`. */
function skipString(src, start) {
  const q = src[start];
  for (let i = start + 1; i < src.length; i++) {
    if (src[i] === "\\") {
      i++;
      continue;
    }
    if (src[i] === q) return i;
  }
  throw new Error("unterminated string");
}

/**
 * Find every opening tag `<Name ...>` or `<Name ... />` and return
 * { name, props, start, end, selfClosing, line }. `props` maps attribute
 * names to values: strings for "literal" attributes, evaluated values for
 * {expr} attributes, and `true` for bare boolean attributes.
 */
export function findTags(src, name) {
  const out = [];
  const re = new RegExp(`<${name}(?=[\\s/>])`, "g");
  for (const m of src.matchAll(re)) {
    const start = m.index;
    let i = start + m[0].length;
    const props = {};
    let selfClosing = false;
    for (;;) {
      while (/\s/.test(src[i])) i++;
      if (src.startsWith("/>", i)) {
        selfClosing = true;
        i += 2;
        break;
      }
      if (src[i] === ">") {
        i++;
        break;
      }
      const nm = /^[A-Za-z_][\w:-]*/.exec(src.slice(i, i + 64));
      if (!nm)
        throw new Error(
          `${name} at line ${lineOf(src, start)}: cannot parse attribute`,
        );
      const attr = nm[0];
      i += attr.length;
      while (/\s/.test(src[i])) i++;
      if (src[i] !== "=") {
        props[attr] = true;
        continue;
      }
      i++;
      while (/\s/.test(src[i])) i++;
      if (src[i] === '"' || src[i] === "'") {
        const q = src[i];
        const close = src.indexOf(q, i + 1);
        if (close < 0)
          throw new Error(
            `${name} at line ${lineOf(src, start)}: unterminated ${attr}`,
          );
        props[attr] = src.slice(i + 1, close);
        i = close + 1;
      } else if (src[i] === "{") {
        const close = matchBrace(src, i);
        const expr = src.slice(i + 1, close - 1);
        try {
          // JSON round-trip: plain data with this realm's prototypes.
          const value = vm.runInNewContext(`(${expr})`, Object.create(null), {
            timeout: 100,
          });
          props[attr] =
            value === undefined ? undefined : JSON.parse(JSON.stringify(value));
        } catch (e) {
          throw new Error(
            `${name} at line ${lineOf(src, start)}: ${attr}={...} is not literal data (${e.message})`,
          );
        }
        i = close;
      } else {
        throw new Error(
          `${name} at line ${lineOf(src, start)}: unexpected value for ${attr}`,
        );
      }
    }
    out.push({
      name,
      props,
      start,
      end: i,
      selfClosing,
      line: lineOf(src, start),
    });
  }
  return out;
}

/** Recursively list files under `dir` whose names pass `filter`. */
export function walk(dir, filter) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) out.push(...walk(p, filter));
    else if (filter(p)) out.push(p);
  }
  return out.sort();
}

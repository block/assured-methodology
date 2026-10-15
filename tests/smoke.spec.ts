import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

/**
 * One page per template type. Each must load, carry exactly one <h1> and a
 * <main id="main"> skip-link target, log no console errors, and pass axe at
 * WCAG 2.2 AA with no serious or critical violations.
 */
const PAGES: { type: string; path: string }[] = [
  { type: "home", path: "/" },
  { type: "intro", path: "/docs/intro/" },
  { type: "chapter index", path: "/docs/alert/" },
  { type: "worked example", path: "/docs/alert/example/" },
  { type: "quiz", path: "/docs/alert/quiz/" },
  { type: "glossary", path: "/docs/glossaries/clear/" },
  { type: "reference", path: "/docs/reference/" },
];

const AXE_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const BLOCKING_IMPACTS = new Set(["serious", "critical"]);

function collectConsoleErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(err.message));
  return errors;
}

for (const { type, path } of PAGES) {
  test.describe(`${type} (${path})`, () => {
    test("loads with one h1, a main landmark and no console errors", async ({
      page,
    }) => {
      const errors = collectConsoleErrors(page);
      const response = await page.goto(path);
      expect(response?.status(), `HTTP status for ${path}`).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("main#main")).toHaveCount(1);
      await expect(page).toHaveTitle(/\S/);
      expect(errors, `console errors on ${path}`).toEqual([]);
    });

    test("has no serious or critical axe violations", async ({
      page,
    }, testInfo) => {
      await page.goto(path);
      // Let entrance animations settle first: mid-fade text (the home-page
      // hero puzzle) reads as low contrast. Infinite animations never finish.
      await page.evaluate(() =>
        Promise.all(
          document
            .getAnimations()
            .filter((a) => a.effect?.getComputedTiming().endTime !== Infinity)
            .map((a) => a.finished.catch(() => undefined)),
        ),
      );
      const results = await new AxeBuilder({ page })
        .withTags(AXE_TAGS)
        .analyze();
      const blocking = results.violations.filter((v) =>
        BLOCKING_IMPACTS.has(v.impact ?? ""),
      );
      const advisory = results.violations.filter(
        (v) => !BLOCKING_IMPACTS.has(v.impact ?? ""),
      );
      for (const v of advisory) {
        testInfo.annotations.push({
          type: `axe ${v.impact ?? "unknown"}`,
          description: `${v.id}: ${v.help} (${v.nodes.length} node(s))`,
        });
      }
      const summary = blocking.map(
        (v) =>
          `${v.impact} ${v.id}: ${v.help}\n` +
          v.nodes
            .slice(0, 5)
            .map((n) => `    ${n.target.join(" ")}`)
            .join("\n"),
      );
      expect(summary, `axe violations on ${path}`).toEqual([]);
    });
  });
}

test("first Tab reaches the skip link, which targets main", async ({
  page,
}) => {
  await page.goto("/docs/intro/");
  await page.keyboard.press("Tab");
  const skip = page.locator("a.skip-link");
  await expect(skip).toBeFocused();
  await expect(skip).toHaveAttribute("href", "#main");
});

test("search dialog opens from the header and closes on Escape", async ({
  page,
}) => {
  await page.goto("/docs/intro/");
  const dialog = page.locator("[data-search-modal]");
  await expect(dialog).toBeHidden();
  await page.locator("[data-search-open]").first().click();
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("header: keyboard opens and closes a nav group", async ({ page }) => {
  // Desktop Chrome (1280px) is above the 1240px breakpoint where the header
  // shows its nav groups instead of the mobile menu.
  await page.goto("/docs/intro/");
  // The disclosure buttons join the Tab order once the header script runs.
  await expect(page.locator(".header[data-disclosure-ready]")).toHaveCount(1);
  let reached = false;
  for (let i = 0; i < 30 && !reached; i++) {
    await page.keyboard.press("Tab");
    reached = await page.evaluate(
      () => document.activeElement?.matches("[data-menu-disclosure]") ?? false,
    );
  }
  expect(reached, "Tab reaches a nav-group disclosure button").toBe(true);
  const dropdownId = await page
    .locator("[data-menu-disclosure]:focus")
    .getAttribute("aria-controls");
  expect(dropdownId).toBeTruthy();
  const toggle = page.locator(
    `[data-menu-disclosure][aria-controls="${dropdownId}"]`,
  );
  const dropdown = page.locator(`#${dropdownId}`);

  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await page.keyboard.press("Enter");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(dropdown).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(dropdown).toBeHidden();
  await expect(toggle).toBeFocused();
});

test("quiz: an answer locks the item and announces the verdict", async ({
  page,
}) => {
  await page.goto("/docs/alert/quiz/");
  const items = page.locator("[data-quiz-item]");
  expect(await items.count()).toBeGreaterThan(1);

  // Right answer on the first item.
  const first = items.nth(0);
  const key = await first.getAttribute("data-answer");
  await first.locator(`.quiz-item__option[data-value="${key}"]`).click();
  const firstFeedback = first.locator("[data-feedback]");
  await expect(firstFeedback).toBeVisible();
  await expect(firstFeedback.locator("[data-verdict]")).toHaveText(/^Correct/);
  await expect(firstFeedback).toBeFocused();
  const options = first.locator(".quiz-item__option");
  for (let i = 0; i < (await options.count()); i++) {
    await expect(options.nth(i)).toHaveAttribute("aria-disabled", "true");
  }

  // Wrong answer on the second item.
  const second = items.nth(1);
  const secondKey = await second.getAttribute("data-answer");
  await second
    .locator(`.quiz-item__option:not([data-value="${secondKey}"])`)
    .first()
    .click();
  await expect(second.locator("[data-verdict]")).toHaveText(/^Not quite/);
  await expect(
    second.locator(`.quiz-item__option[data-value="${secondKey}"]`),
  ).toHaveClass(/is-revealed-correct/);
});

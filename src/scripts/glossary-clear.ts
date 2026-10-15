/**
 * C.L.E.A.R. glossary page: jump-nav offset, live filter (with ?q= sync),
 * the random-term spotlight, the "/" and "?" shortcuts with their own
 * switch, and the "clearmymind" easter egg. Loaded by
 * GlossaryPageScript.astro; lifecycle notes in glossary-common.ts.
 */
import {
  bindFilter,
  bindJumpOffset,
  eggsEnabled,
  isEditableTarget,
  makeToast,
  mountGlossary,
  readStored,
  type Scope,
  writeStored,
} from "@/scripts/glossary-common";

// SC 2.1.4: the single-key shortcuts are a feature, not an egg, so they
// have their own switch (the footer button), on by default.
const SHORTCUT_KEY = "assured-glossary-shortcuts";
const shortcutsEnabled = (): boolean => readStored(SHORTCUT_KEY) !== "off";

interface TermPair {
  term: string;
  def: string;
}

/** Each <dt> with the <dd> that follows it, in one section's list. */
function pairsIn(dl: Element): Array<[HTMLElement, HTMLElement | null]> {
  const out: Array<[HTMLElement, HTMLElement | null]> = [];
  const children = Array.from(dl.children) as HTMLElement[];
  children.forEach((child, i) => {
    if (child.tagName !== "DT") return;
    const next = children[i + 1];
    out.push([child, next && next.tagName === "DD" ? next : null]);
  });
  return out;
}

function init(page: HTMLElement, scope: Scope): void {
  bindJumpOffset(page, page.querySelector<HTMLElement>(".clear-nav"), scope);

  const search = page.querySelector<HTMLInputElement>("[data-clear-search]");
  const empty = page.querySelector<HTMLElement>("[data-clear-empty]");
  const resultsCount = page.querySelector<HTMLElement>("[data-clear-results]");
  const random = page.querySelector<HTMLElement>("[data-clear-random]");
  const spotlightTerm = page.querySelector<HTMLElement>(
    "[data-clear-spotlight-term]",
  );
  const spotlightDef = page.querySelector<HTMLElement>(
    "[data-clear-spotlight-def]",
  );
  const sections = Array.from(
    page.querySelectorAll<HTMLElement>(".clear-section"),
  );

  // Every term/definition pair, for the spotlight.
  const allTerms: TermPair[] = [];
  for (const sec of sections) {
    const dl = sec.querySelector(".clear-terms");
    if (!dl) continue;
    for (const [dt, dd] of pairsIn(dl)) {
      if (dd) {
        allTerms.push({
          term: (dt.textContent ?? "").trim(),
          def: (dd.textContent ?? "").trim(),
        });
      }
    }
  }

  const pickSpotlight = () => {
    if (allTerms.length === 0 || !spotlightTerm || !spotlightDef) return;
    const t = allTerms[Math.floor(Math.random() * allTerms.length)];
    spotlightTerm.textContent = t.term;
    spotlightDef.textContent = t.def;
  };
  pickSpotlight();

  if (random) {
    scope.on(random, "click", () => {
      random.classList.add("is-rolling");
      pickSpotlight();
      scope.timeout(() => random.classList.remove("is-rolling"), 400);
    });
  }

  // Live search/filter. A section with no .clear-terms list (the self-check,
  // the sources) is left alone.
  const filterTerms = (q: string) => {
    const query = q.trim().toLowerCase();
    let totalVisible = 0;
    for (const sec of sections) {
      const dl = sec.querySelector(".clear-terms");
      if (!dl) continue;
      let visibleInSection = 0;
      for (const [dt, dd] of pairsIn(dl)) {
        const haystack =
          `${dt.textContent ?? ""} ${dd?.textContent ?? ""}`.toLowerCase();
        const match = query === "" || haystack.includes(query);
        dt.style.display = match ? "" : "none";
        if (dd) dd.style.display = match ? "" : "none";
        if (match) visibleInSection++;
      }
      totalVisible += visibleInSection;
      sec.style.display = visibleInSection > 0 ? "" : "none";
    }
    if (empty) empty.hidden = totalVisible > 0 || query === "";
    if (resultsCount) {
      resultsCount.textContent =
        query === ""
          ? ""
          : `${totalVisible}${totalVisible === 1 ? " term matches" : " terms match"}`;
    }
  };
  bindFilter(search, filterTerms, scope);

  const shortcutToggle = page.querySelector<HTMLElement>(
    "[data-clear-shortcut-toggle]",
  );
  const shortcutState = page.querySelector<HTMLElement>(
    "[data-clear-shortcut-state]",
  );
  const syncShortcutToggle = () => {
    if (!shortcutToggle) return;
    const on = shortcutsEnabled();
    shortcutToggle.setAttribute("aria-pressed", on ? "true" : "false");
    if (shortcutState) shortcutState.textContent = on ? ": on" : ": off";
  };
  syncShortcutToggle();
  if (shortcutToggle) {
    scope.on(shortcutToggle, "click", () => {
      writeStored(SHORTCUT_KEY, shortcutsEnabled() ? "off" : "on");
      syncShortcutToggle();
    });
  }

  // Keyboard shortcuts: "/" focuses search, "?" rolls the spotlight.
  scope.on(document, "keydown", (ev) => {
    const e = ev as KeyboardEvent;
    if (!page.isConnected || !shortcutsEnabled()) return;
    if (isEditableTarget(e, false)) return;
    if (e.key === "/") {
      e.preventDefault();
      search?.focus();
    } else if (e.key === "?") {
      e.preventDefault();
      pickSpotlight();
    }
  });

  // Easter egg: type "clearmymind" and the page goes greyscale briefly.
  let typed = "";
  scope.on(document, "keydown", (ev) => {
    const e = ev as KeyboardEvent;
    if (!page.isConnected || !eggsEnabled()) return;
    if (e.key?.length !== 1) return;
    typed = (typed + e.key.toLowerCase()).slice(-14);
    if (!typed.endsWith("clearmymind")) return;
    typed = "";
    page.classList.add("clear-zen");
    const t = makeToast(
      "clear-toast",
      "Zen mode: clarity engaged for 5 seconds",
      "🧘",
    );
    page.appendChild(t);
    scope.timeout(() => t.classList.add("is-out"), 4400);
    scope.timeout(() => {
      t.remove();
      page.classList.remove("clear-zen");
    }, 5000);
  });
}

export function mount(): void {
  mountGlossary(".clear-page", "__clearGlossaryCleanup", init);
}

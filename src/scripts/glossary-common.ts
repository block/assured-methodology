/**
 * Shared runtime for the three themed glossary pages (C.L.E.A.R., B.A.D.,
 * C.A.T.). Each page module (glossary-clear.ts, glossary-bad.ts,
 * glossary-cat.ts) exports a mount() that GlossaryPageScript.astro calls on
 * every astro:page-load where the page's marker is present.
 *
 * ClientRouter lifecycle, kept from the inline scripts these modules
 * replace:
 *   - Every listener, timer and observer a page registers goes through a
 *     Scope, so one dispose() removes them all.
 *   - The dispose function is published as window.__<page>GlossaryCleanup.
 *     BaseLayout calls it on astro:before-swap, and so does the Scope
 *     itself, so the document-level key handlers never outlive the page.
 *   - mountGlossary() runs the previous cleanup before binding and marks
 *     the page root, so a repeat call on the same DOM (the initial run plus
 *     the first astro:page-load) binds once.
 *
 * Bundled (not is:inline), so the pages need no CSP hash for this code.
 */

export type GlossaryCleanupName =
  | "__clearGlossaryCleanup"
  | "__badGlossaryCleanup"
  | "__catGlossaryCleanup";

declare global {
  interface Window {
    __clearGlossaryCleanup?: () => void;
    __badGlossaryCleanup?: () => void;
    __catGlossaryCleanup?: () => void;
  }
}

/** Listeners, timers and observers that one dispose() tears down. */
export interface Scope {
  on(
    target: EventTarget,
    type: string,
    fn: EventListenerOrEventListenerObject,
    opts?: AddEventListenerOptions,
  ): void;
  timeout(fn: () => void, ms: number): number;
  interval(fn: () => void, ms: number): number;
  /** Register any other teardown step (an observer's disconnect, say). */
  add(fn: () => void): void;
  dispose(): void;
}

export function createScope(): Scope {
  const cleanups: Array<() => void> = [];
  return {
    on(target, type, fn, opts) {
      target.addEventListener(type, fn, opts);
      cleanups.push(() => target.removeEventListener(type, fn, opts));
    },
    timeout(fn, ms) {
      const id = window.setTimeout(fn, ms);
      cleanups.push(() => window.clearTimeout(id));
      return id;
    },
    interval(fn, ms) {
      const id = window.setInterval(fn, ms);
      cleanups.push(() => window.clearInterval(id));
      return id;
    },
    add(fn) {
      cleanups.push(fn);
    },
    dispose() {
      while (cleanups.length) {
        try {
          cleanups.pop()?.();
        } catch {
          // One failing teardown must not strand the rest.
        }
      }
    },
  };
}

/**
 * Bind a glossary page once per DOM. Returns without doing anything when the
 * page root is absent (another page) or already bound.
 */
export function mountGlossary(
  rootSelector: string,
  cleanupName: GlossaryCleanupName,
  init: (root: HTMLElement, scope: Scope) => void,
): void {
  const root = document.querySelector<HTMLElement>(rootSelector);
  if (!root || root.dataset.glossaryBound === "true") return;
  const previous = window[cleanupName];
  if (previous) {
    try {
      previous();
    } catch {
      // A stale page's teardown must not block this one.
    }
  }
  root.dataset.glossaryBound = "true";
  const scope = createScope();
  window[cleanupName] = () => scope.dispose();
  // Tear down before a soft navigation swaps the page out. Disposal is
  // idempotent, so BaseLayout's own before-swap call is harmless.
  scope.on(document, "astro:before-swap", () => scope.dispose(), {
    once: true,
  });
  init(root, scope);
}

/**
 * Typed easter eggs honor the site-wide switch (the toggle lives in the docs
 * layout footer and persists in localStorage). Eggs are off unless the
 * reader turned them on, and off when storage is unavailable.
 */
export function eggsEnabled(): boolean {
  try {
    return localStorage.getItem("assured-eggs") === "on";
  } catch {
    return false;
  }
}

export function readStored(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStored(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Private mode or storage disabled: the choice lasts for this page only.
  }
}

/** True when a key event is aimed at a form field or editable content. */
export function isEditableTarget(e: Event, includeSelect = true): boolean {
  const el = e.target instanceof HTMLElement ? e.target : null;
  if (!el) return false;
  const tag = el.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    (includeSelect && tag === "SELECT") ||
    el.isContentEditable
  );
}

/**
 * Jump-nav landing offset. The section nav pins below the header on larger
 * screens and its height varies as its rows wrap, so measure it and publish
 * --g-jump-offset on the page root, which the section and card
 * scroll-margins read. Where the nav is not pinned (phones) the CSS fallback
 * value applies.
 */
export function bindJumpOffset(
  root: HTMLElement,
  nav: HTMLElement | null,
  scope: Scope,
): void {
  if (!nav) return;
  const setJumpOffset = () => {
    const cs = getComputedStyle(nav);
    if (cs.position === "sticky") {
      const navTop = Number.parseFloat(cs.top) || 0;
      root.style.setProperty(
        "--g-jump-offset",
        `${navTop + nav.offsetHeight + 12}px`,
      );
    } else {
      root.style.removeProperty("--g-jump-offset");
    }
  };
  setJumpOffset();
  scope.on(window, "resize", setJumpOffset);
  if ("ResizeObserver" in window) {
    const ro = new ResizeObserver(setJumpOffset);
    ro.observe(nav);
    scope.add(() => ro.disconnect());
  }
  // Web fonts can land after the first measurement and rewrap the pills.
  void document.fonts?.ready.then(() => {
    if (root.isConnected) setJumpOffset();
  });
}

/**
 * Wire a filter input: live filtering, Escape to clear, and a ?q= query
 * parameter kept in sync, so a filtered view can be linked and survives a
 * reload. replaceState keeps ClientRouter's history state and adds no
 * history entries.
 */
export function bindFilter(
  input: HTMLInputElement | null,
  apply: (query: string) => void,
  scope: Scope,
): void {
  if (!input) return;
  const syncUrl = (value: string) => {
    const url = new URL(window.location.href);
    const q = value.trim();
    if (q) url.searchParams.set("q", q);
    else url.searchParams.delete("q");
    if (url.href !== window.location.href) {
      history.replaceState(history.state, "", url);
    }
  };
  scope.on(input, "input", () => {
    apply(input.value);
    syncUrl(input.value);
  });
  scope.on(input, "keydown", (e) => {
    if ((e as KeyboardEvent).key === "Escape") {
      input.value = "";
      apply("");
      syncUrl("");
      input.blur();
    }
  });
  const initial = new URLSearchParams(window.location.search).get("q");
  if (initial) {
    input.value = initial;
    apply(initial);
  }
}

/** A toast with an optional decorative glyph kept out of the a11y tree. */
export function makeToast(
  className: string,
  message: string,
  glyph?: string,
): HTMLDivElement {
  const t = document.createElement("div");
  t.className = className;
  t.setAttribute("role", "status");
  if (glyph) {
    const g = document.createElement("span");
    g.setAttribute("aria-hidden", "true");
    g.textContent = `${glyph} `;
    t.appendChild(g);
  }
  t.appendChild(document.createTextNode(message));
  return t;
}

/**
 * Site search: opens the Pagefind UI in a native <dialog>.
 *
 * The dialog is opened with showModal(), so the browser supplies the modal
 * behavior the old hand-rolled version scripted: the page behind is inert
 * (Tab cannot leave the dialog), Escape fires `cancel` and closes it, and
 * focus returns to the control that opened it on close().
 *
 * Bundled (not is:inline), so it needs no CSP hash. The Pagefind index
 * lives at /pagefind/, generated at build time; in dev it does not exist,
 * so the dialog shows a "build to use" message instead.
 *
 * ClientRouter idempotency: element handlers are bound per element with a
 * data-search-bound marker (the router swaps the header's DOM); the
 * document-level shortcut is registered once per SPA session.
 */
import { onPageReady } from "@/lib/dom";

declare global {
  interface Window {
    PagefindUI?: new (options: Record<string, unknown>) => unknown;
  }
}

const isMac = (): boolean => {
  const nav = navigator as Navigator & {
    userAgentData?: { platform?: string };
  };
  const platform = nav.userAgentData?.platform || nav.platform || "";
  return /mac|iphone|ipad|ipod/i.test(platform);
};

/** Show the shortcut the reader's platform actually uses. */
function renderShortcutHint(trigger: HTMLElement): void {
  const mac = isMac();
  const keys = mac ? "⌘K" : "Ctrl K";
  const kbd = trigger.querySelector<HTMLElement>("[data-search-kbd]");
  if (kbd) kbd.textContent = keys;
  trigger.title = `Search (${keys})`;
  trigger.setAttribute(
    "aria-label",
    `Search the site (press ${mac ? "Command" : "Control"} + K)`,
  );
}

function bindSearch(): void {
  const trigger = document.querySelector<HTMLButtonElement>(
    "[data-search-open]:not([data-search-bound])",
  );
  const dialog = document.querySelector<HTMLDialogElement>(
    "dialog[data-search-modal]",
  );
  const uiHost = document.getElementById("site-search-ui");
  if (!trigger || !dialog || !uiHost) return;
  trigger.setAttribute("data-search-bound", "true");
  renderShortcutHint(trigger);

  let uiReady = false;
  const pagefindBase = `${(dialog.dataset.pagefindBase || "/").replace(/\/+$/, "")}/pagefind/`;

  function showUnavailableFallback(): void {
    const message =
      "Search index not found. If you are running locally, build it with `pnpm build && pnpm preview`; the index is generated at build time.";
    const p = document.createElement("p");
    p.className = "site-search-modal__fallback";
    p.textContent = message;
    uiHost?.replaceChildren(p);
    // Mirror into the role="status" live region so screen readers hear it.
    const status = dialog?.querySelector("[data-search-status]");
    if (status) status.textContent = message;
  }

  function loadPagefindUI(): Promise<NonNullable<Window["PagefindUI"]>> {
    return new Promise((resolve, reject) => {
      if (window.PagefindUI) {
        resolve(window.PagefindUI);
        return;
      }
      if (!document.querySelector("link[data-pagefind-css]")) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = `${pagefindBase}pagefind-ui.css`;
        link.setAttribute("data-pagefind-css", "");
        document.head.appendChild(link);
      }
      const script = document.createElement("script");
      script.src = `${pagefindBase}pagefind-ui.js`;
      script.onload = () =>
        window.PagefindUI
          ? resolve(window.PagefindUI)
          : reject(new Error("PagefindUI global not available after load"));
      script.onerror = () =>
        reject(new Error(`Failed to load ${pagefindBase}pagefind-ui.js`));
      document.head.appendChild(script);
    });
  }

  async function ensureUI(): Promise<void> {
    if (uiReady) return;
    try {
      const PagefindUI = await loadPagefindUI();
      new PagefindUI({
        element: "#site-search-ui",
        showImages: false,
        showSubResults: true,
        autofocus: true,
        resetStyles: false,
      });
      uiReady = true;
    } catch {
      showUnavailableFallback();
    }
  }

  function open(): void {
    if (!dialog || dialog.open) return;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    void ensureUI().then(() => {
      setTimeout(() => uiHost?.querySelector("input")?.focus(), 50);
    });
  }

  trigger.addEventListener("click", open);

  if (!dialog.hasAttribute("data-search-bound")) {
    dialog.setAttribute("data-search-bound", "true");

    dialog.querySelectorAll<HTMLElement>("[data-search-close]").forEach((c) => {
      c.addEventListener("click", () => dialog.close());
    });

    // A click on the ::backdrop is dispatched to the dialog element itself
    // (the panel fills the dialog's box, so a target of the dialog means
    // outside the panel).
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) dialog.close();
    });

    dialog.addEventListener("close", () => {
      document.body.style.overflow = "";
    });

    dialog.addEventListener("keydown", (e) => {
      // Topmost layer only: keep the header's document-level Escape handler
      // from also closing a menu behind the dialog. The browser's own
      // cancel-and-close still runs.
      if (e.key === "Escape") {
        e.stopPropagation();
        return;
      }
      // Arrow keys walk the results: ↓ from the input focuses the first
      // result, ↑ from the first result returns to the input.
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      const links = Array.from(
        uiHost.querySelectorAll<HTMLElement>(".pagefind-ui__result-link"),
      );
      if (links.length === 0) return;
      const idx = links.indexOf(document.activeElement as HTMLElement);
      // ArrowUp while still in the input keeps its native caret behavior.
      if (e.key === "ArrowUp" && idx === -1) return;
      e.preventDefault();
      if (e.key === "ArrowDown") {
        links[Math.min(idx + 1, links.length - 1)].focus();
      } else if (idx === 0) {
        uiHost.querySelector("input")?.focus();
      } else {
        links[idx - 1].focus();
      }
    });
  }
}

// Cmd/Ctrl+K toggles the dialog. Registered once for the SPA session; the
// dialog and trigger are re-resolved per keypress because the router swaps
// the DOM.
document.addEventListener("keydown", (e) => {
  // toLowerCase: with CapsLock on, e.key is "K".
  if (!(e.metaKey || e.ctrlKey) || e.key.toLowerCase() !== "k") return;
  const dialog = document.querySelector<HTMLDialogElement>(
    "dialog[data-search-modal]",
  );
  if (!dialog) return;
  e.preventDefault();
  if (dialog.open) dialog.close();
  else document.querySelector<HTMLElement>("[data-search-open]")?.click();
});

// Navigating from a result while the dialog is open must not leak the body
// scroll lock onto the next page.
document.addEventListener("astro:after-swap", () => {
  document.body.style.overflow = "";
});

onPageReady(bindSearch);

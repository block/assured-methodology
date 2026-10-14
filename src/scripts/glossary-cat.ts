/**
 * C.A.T. glossary page: jump-nav offset, the tool filter (with ?q= sync),
 * the walking-cat scenery with its pause control, and the "treat" easter
 * egg. Loaded by GlossaryPageScript.astro; lifecycle notes in
 * glossary-common.ts.
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

function bindToolFilter(page: HTMLElement, scope: Scope): void {
  const toolSearch = page.querySelector<HTMLInputElement>("[data-cat-search]");
  const toolResults = page.querySelector<HTMLElement>("[data-cat-results]");
  const toolEmpty = page.querySelector<HTMLElement>("[data-cat-empty]");
  const toolCards = Array.from(page.querySelectorAll<HTMLElement>(".cat-tool"));
  const toolSections = Array.from(
    page.querySelectorAll<HTMLElement>(".cat-section"),
  );
  const filterTools = (q: string) => {
    const query = q.trim().toLowerCase();
    let total = 0;
    for (const card of toolCards) {
      const match =
        query === "" || (card.textContent ?? "").toLowerCase().includes(query);
      card.style.display = match ? "" : "none";
      if (match) total++;
    }
    for (const sec of toolSections) {
      // Overview blocks with no cards (the category map) step aside while a
      // filter is active so matches sit at the top.
      if (sec.hasAttribute("data-cat-hide-on-filter")) {
        sec.style.display = query !== "" ? "none" : "";
        continue;
      }
      const cards = Array.from(sec.querySelectorAll<HTMLElement>(".cat-tool"));
      if (cards.length === 0) continue;
      const anyVisible = cards.some((c) => c.style.display !== "none");
      sec.style.display = query !== "" && !anyVisible ? "none" : "";
    }
    if (toolEmpty) toolEmpty.hidden = total > 0 || query === "";
    if (toolResults) {
      toolResults.textContent =
        query === ""
          ? ""
          : `${total}${total === 1 ? " tool matches" : " tools match"}`;
    }
  };
  bindFilter(toolSearch, filterTools, scope);
}

function init(page: HTMLElement, scope: Scope): void {
  bindJumpOffset(page, page.querySelector<HTMLElement>(".cat-nav"), scope);
  // The filter works even if the hero scenery is ever absent.
  bindToolFilter(page, scope);

  const stage = page.querySelector<HTMLElement>(".cat-stage");
  const svg = stage?.querySelector<SVGSVGElement>(".cat-svg");
  const cat = svg?.querySelector<SVGElement>(".cat-cat");
  const bubble = svg?.querySelector<SVGElement>(".cat-bubble");
  const text = svg?.querySelector<SVGElement>(".cat-bubble__text");
  if (!cat || !bubble || !text) return;

  // SC 2.2.2: pause control for the walking cat and yarn scenery. All the
  // motion here is CSS animation, so animation-play-state covers it; the
  // MEOW sequence loop also checks the flag before starting a new walk.
  const animsPaused = () => page.classList.contains("cat-anims-paused");
  const animToggle = page.querySelector<HTMLElement>("[data-cat-anim-toggle]");
  const setAnimsPaused = (paused: boolean, persist: boolean) => {
    page.classList.toggle("cat-anims-paused", paused);
    // The pause and play glyphs swap in CSS on .cat-anims-paused.
    const label = animToggle?.querySelector(".cat-anim-toggle__text");
    if (label)
      label.textContent = paused ? "Play animations" : "Pause animations";
    if (persist)
      writeStored("assured-cat-anims", paused ? "paused" : "playing");
  };
  if (animToggle) {
    scope.on(animToggle, "click", () => setAnimsPaused(!animsPaused(), true));
  }
  const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const storedAnims = readStored("assured-cat-anims");
  if (storedAnims === "paused" || (storedAnims === null && reduceMq.matches)) {
    setAnimsPaused(true, false);
  }
  scope.on(reduceMq, "change", () => {
    if (reduceMq.matches) setAnimsPaused(true, false);
  });

  bubble.style.opacity = "0";

  const popBubble = (word: string) => {
    text.textContent = word;
    bubble.style.opacity = "1";
    bubble.classList.remove("cat-bubble--pop");
    void bubble.getBoundingClientRect();
    bubble.classList.add("cat-bubble--pop");
  };

  const showToast = (glyph: string, message: string) => {
    const t = makeToast("cat-toast", message, glyph);
    page.appendChild(t);
    scope.timeout(() => t.classList.add("is-out"), 3600);
    scope.timeout(() => t.remove(), 4200);
  };

  const playSequence = () => {
    if (animsPaused()) return;
    cat.classList.remove("cat-cat--seq");
    bubble.style.opacity = "0";
    void cat.getBoundingClientRect();

    const walks = 2 + Math.floor(Math.random() * 4);
    cat.style.setProperty("--cat-walks", String(walks));
    cat.classList.add("cat-cat--seq");

    const bubbleDelay = (walks * 1.3 + 2.6) * 1000;
    scope.timeout(() => {
      const isWoof = Math.random() < 0.05;
      popBubble(isWoof ? "WOOF" : "MEOW");
      if (isWoof) {
        showToast("🐶", "wait, that's not a cat. you found the 5% WOOF!");
      }
      // The bubble fades out after about 2.5 s so it does not linger until
      // the next loop. Remove cat-bubble--pop first: its animation uses the
      // forwards fill-mode, which holds the final keyframe at opacity 1 and
      // would override the inline opacity 0. With the class gone, the
      // cat-bubble transition (opacity 0.4s ease) handles a smooth fade.
      scope.timeout(() => {
        bubble.classList.remove("cat-bubble--pop");
        bubble.style.opacity = "0";
      }, 2500);
    }, bubbleDelay);
  };

  const loop = () => {
    playSequence();
    scope.timeout(loop, 18000);
  };
  loop();

  // Easter egg: type "treat" to make the cat purr.
  let typed = "";
  scope.on(document, "keydown", (ev) => {
    const e = ev as KeyboardEvent;
    if (!page.isConnected || !eggsEnabled()) return;
    // Never capture keystrokes meant for a form field (the tool filter,
    // quiz inputs, anything contenteditable).
    if (isEditableTarget(e)) return;
    if (e.key?.length !== 1) return;
    typed = (typed + e.key.toLowerCase()).slice(-8);
    if (!typed.endsWith("treat")) return;
    typed = "";
    popBubble("PURR");
    showToast("🐟", "you fed the cat, purrs activated");
  });
}

export function mount(): void {
  mountGlossary(".cat-page", "__catGlossaryCleanup", init);
}

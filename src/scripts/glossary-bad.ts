/**
 * B.A.D. glossary page: jump-nav offset, the term filter (with ?q= sync),
 * animation pause and off-screen gating for the inline SVG art, the
 * featured-animation shuffle, and the easter eggs (rapid-shuffle jackpot,
 * Konami chaos mode, "meow"/"woof", the S shortcut, the hero bug game).
 * Loaded by GlossaryPageScript.astro; lifecycle notes in glossary-common.ts.
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

const CARD_SELECTOR = ".bad-term, .bad-actor, .bad-campaign, .bad-family";

/**
 * In-page term filter. Hides non-matching cards; a section with no visible
 * cards collapses, and so does a sub-group heading whose grid is empty; a
 * live region announces the match count. Featured showcases are browsing
 * furniture, so they hide while filtering.
 */
function bindTermFilter(page: HTMLElement, scope: Scope): void {
  const termSearch = page.querySelector<HTMLInputElement>("[data-bad-search]");
  const termResults = page.querySelector<HTMLElement>("[data-bad-results]");
  const termEmpty = page.querySelector<HTMLElement>("[data-bad-empty]");
  const termCards = Array.from(
    page.querySelectorAll<HTMLElement>(CARD_SELECTOR),
  );
  const termSections = Array.from(
    page.querySelectorAll<HTMLElement>(".bad-section"),
  );
  // Match entry text only, not the appended "Source: ..." citation links
  // (otherwise "mitre" would match most of the glossary).
  const termText = new Map<HTMLElement, string>();
  for (const card of termCards) {
    const clone = card.cloneNode(true) as HTMLElement;
    for (const a of clone.querySelectorAll(".g-cite")) a.remove();
    termText.set(card, (clone.textContent ?? "").toLowerCase());
  }
  const visible = (el: HTMLElement) => el.style.display !== "none";
  const filterTerms = (q: string) => {
    const query = q.trim().toLowerCase();
    let total = 0;
    for (const card of termCards) {
      const match = query === "" || (termText.get(card) ?? "").includes(query);
      card.style.display = match ? "" : "none";
      if (match) total++;
    }
    for (const sec of termSections) {
      const cards = Array.from(
        sec.querySelectorAll<HTMLElement>(CARD_SELECTOR),
      );
      if (cards.length === 0) continue;
      sec.style.display = query !== "" && !cards.some(visible) ? "none" : "";
      for (const f of sec.querySelectorAll<HTMLElement>(".bad-feature")) {
        f.style.display = query === "" ? "" : "none";
      }
      // A sub-group heading sits directly before its grid.
      for (const head of sec.querySelectorAll<HTMLElement>(".bad-subhead")) {
        const grid = head.nextElementSibling;
        if (!(grid instanceof HTMLElement)) continue;
        const inGrid = Array.from(
          grid.querySelectorAll<HTMLElement>(CARD_SELECTOR),
        );
        head.style.display = inGrid.some(visible) ? "" : "none";
      }
    }
    if (termEmpty) termEmpty.hidden = total > 0 || query === "";
    if (termResults) {
      termResults.textContent =
        query === ""
          ? ""
          : `${total}${total === 1 ? " term matches" : " terms match"}`;
    }
  };
  bindFilter(termSearch, filterTerms, scope);
}

function init(page: HTMLElement, scope: Scope): void {
  bindJumpOffset(page, page.querySelector<HTMLElement>(".bad-nav"), scope);
  bindTermFilter(page, scope);

  // ============================================================
  // SC 2.2.2: pause control for this page's infinite animations. CSS
  // animations pause via animation-play-state (.bad-anims-paused); SMIL
  // <animate>/<animateMotion> ignore CSS entirely, so the SVG timelines are
  // paused with pauseAnimations(). Reduced-motion visitors start paused
  // unless they have explicitly chosen otherwise.
  // ============================================================
  const animToggle = page.querySelector<HTMLElement>("[data-bad-anim-toggle]");
  // An SVG timeline runs only when BOTH gates are open: the page-wide pause
  // toggle and the viewport gate below (.bad-offscreen).
  const applySvgTimeline = (svg: SVGSVGElement) => {
    const paused =
      page.classList.contains("bad-anims-paused") ||
      svg.classList.contains("bad-offscreen");
    try {
      if (paused) svg.pauseAnimations();
      else svg.unpauseAnimations();
    } catch {
      // Not every engine implements the SMIL timeline API.
    }
  };
  const setAnimsPaused = (paused: boolean, persist: boolean) => {
    page.classList.toggle("bad-anims-paused", paused);
    page.querySelectorAll<SVGSVGElement>("svg").forEach(applySvgTimeline);
    // The pause/play glyph follows .bad-anims-paused in CSS.
    const label = animToggle?.querySelector(".bad-shuffle__text");
    if (label)
      label.textContent = paused ? "Play animations" : "Pause animations";
    if (persist)
      writeStored("assured-bad-anims", paused ? "paused" : "playing");
  };
  if (animToggle) {
    scope.on(animToggle, "click", () =>
      setAnimsPaused(!page.classList.contains("bad-anims-paused"), true),
    );
  }
  const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const storedAnims = readStored("assured-bad-anims");
  if (storedAnims === "paused" || (storedAnims === null && reduceMq.matches)) {
    setAnimsPaused(true, false);
  }
  scope.on(reduceMq, "change", () => {
    if (reduceMq.matches) setAnimsPaused(true, false);
  });

  // Perf: about 165 elements animate infinitely across the page's inline
  // SVGs, most of them off-screen at any scroll position, and the
  // filter/fill keyframes run on the main thread. Pause any art outside the
  // viewport (plus a lead margin so it is already moving when it scrolls in).
  if ("IntersectionObserver" in window) {
    const artObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const svg = entry.target as SVGSVGElement;
          svg.classList.toggle("bad-offscreen", !entry.isIntersecting);
          applySvgTimeline(svg);
        }
      },
      { rootMargin: "25% 0px" },
    );
    for (const svg of page.querySelectorAll("svg")) artObserver.observe(svg);
    scope.add(() => artObserver.disconnect());
  }

  // ============================================================
  // Featured cards: all visible by default; Shuffle shows one per section.
  // ============================================================
  const showFeature = (feat: HTMLElement) => {
    feat.removeAttribute("hidden");
    feat.style.display = "";
    feat.querySelector(".bad-feature__rotator")?.remove();
  };
  const hideFeature = (feat: HTMLElement) => {
    feat.setAttribute("hidden", "");
    feat.style.display = "none";
  };
  for (const feat of page.querySelectorAll<HTMLElement>(
    ".bad-section > .bad-feature",
  )) {
    showFeature(feat);
  }
  const shuffleFeatures = () => {
    for (const section of page.querySelectorAll<HTMLElement>(".bad-section")) {
      const features = Array.from(
        section.querySelectorAll<HTMLElement>(":scope > .bad-feature"),
      );
      if (features.length === 0) continue;
      const pick = Math.floor(Math.random() * features.length);
      features.forEach((feat, i) => {
        if (i === pick) showFeature(feat);
        else hideFeature(feat);
      });
    }
  };
  const flashShuffleButton = (btn: Element | null) => {
    if (!btn) return;
    btn.classList.add("is-shuffling");
    scope.timeout(() => btn.classList.remove("is-shuffling"), 400);
  };

  // ============================================================
  // Easter egg helpers
  // ============================================================
  const toast = (msg: string, ms = 3500) => {
    const t = makeToast("bad-toast", msg);
    page.appendChild(t);
    scope.timeout(() => t.classList.add("is-out"), ms - 400);
    scope.timeout(() => t.remove(), ms);
  };

  const jackpot = () => {
    if (!eggsEnabled() || reduceMq.matches) return;
    page.classList.add("bad-jackpot");
    toast("🎰 JACKPOT MODE: every section rerolled, with extra rolls", 4500);
    let n = 0;
    const interval = scope.interval(() => {
      shuffleFeatures();
      n++;
      if (n >= 6) {
        window.clearInterval(interval);
        scope.timeout(() => page.classList.remove("bad-jackpot"), 600);
      }
    }, 200);
  };

  // Shuffle button, plus the rapid-click jackpot egg.
  let rapidShuffle = 0;
  let rapidTimer: number | undefined;
  scope.on(document, "click", (e) => {
    const target = e.target instanceof Element ? e.target : null;
    const btn = target?.closest("[data-bad-shuffle]");
    if (!btn) return;
    shuffleFeatures();
    flashShuffleButton(btn);
    rapidShuffle++;
    window.clearTimeout(rapidTimer);
    rapidTimer = scope.timeout(() => {
      rapidShuffle = 0;
    }, 2500);
    if (rapidShuffle >= 7) {
      rapidShuffle = 0;
      jackpot();
    }
  });

  // Konami code (up up down down left right left right B A): chaos mode,
  // every showcase at once.
  const chaosMode = () => {
    if (!eggsEnabled() || reduceMq.matches) return;
    if (page.classList.contains("bad-chaos")) return;
    page.classList.add("bad-chaos");
    // Remember which showcases the reader had shuffled away, so the
    // previous layout comes back when the chaos ends.
    const wasHidden = Array.from(
      page.querySelectorAll<HTMLElement>(".bad-feature[hidden]"),
    );
    for (const el of wasHidden) {
      el.removeAttribute("hidden");
      el.style.display = "";
    }
    toast("🌪️ CHAOS MODE: everything shakes for 15 s", 4500);
    scope.timeout(() => {
      page.classList.remove("bad-chaos");
      for (const el of wasHidden) hideFeature(el);
    }, 15000);
  };
  const KONAMI = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ].join();
  let konami: string[] = [];
  scope.on(document, "keydown", (ev) => {
    const e = ev as KeyboardEvent;
    if (!eggsEnabled()) return;
    konami.push(e.code);
    if (konami.length > 10) konami.shift();
    if (konami.join() === KONAMI) {
      konami = [];
      chaosMode();
    }
  });

  // Type "meow" (then "woof") anywhere: a secret pet.
  const summonPet = (glyph: string, message: string, title?: string) => {
    const pet = document.createElement("div");
    pet.className = "bad-secret-pet";
    pet.textContent = glyph;
    if (title) pet.title = title;
    page.appendChild(pet);
    toast(message, 4500);
    scope.timeout(() => pet.remove(), 6000);
  };
  let typed = "";
  scope.on(document, "keydown", (ev) => {
    const e = ev as KeyboardEvent;
    if (!eggsEnabled()) return;
    if (e.key?.length !== 1) return;
    typed = (typed + e.key.toLowerCase()).slice(-12);
    if (typed.endsWith("meow")) {
      typed = "";
      summonPet(
        "🐈‍⬛",
        '🐈‍⬛ secret cat unlocked. Try typing "woof" next.',
        "Hi.",
      );
    } else if (typed.endsWith("woof")) {
      typed = "";
      summonPet("🐕", "🐕 you found the dog. Go check the C.A.T. glossary.");
    }
  });

  // Key "S" anywhere: shuffle shortcut.
  scope.on(document, "keydown", (ev) => {
    const e = ev as KeyboardEvent;
    if (!eggsEnabled()) return;
    if (e.key !== "s" && e.key !== "S") return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (isEditableTarget(e, false)) return;
    shuffleFeatures();
    flashShuffleButton(page.querySelector("[data-bad-shuffle]"));
  });

  bindBugGame(page, scope, toast);
}

/** Click the hero artwork five times: a bug crawls out, and it multiplies. */
function bindBugGame(
  page: HTMLElement,
  scope: Scope,
  toast: (msg: string, ms?: number) => void,
): void {
  const heroTarget =
    page.querySelector<HTMLElement>(".g-hero") ??
    page.querySelector<HTMLElement>(".bad-hero");
  if (!heroTarget) return;
  // Only the hero artwork hints that it is clickable; the search box and
  // buttons in the hero keep their normal cursors and never count as hits.
  const heroArt = heroTarget.querySelector<SVGElement>(".bad-hero__art");
  if (heroArt) heroArt.style.cursor = "pointer";

  let logoHits = 0;
  let logoTimer: number | undefined;
  let bugGameActive = false;
  let multiplyTimer: number | null = null;
  let multiplyWarned = false;
  let multiplicationStarted = false;
  const activeBugs = new Set<HTMLElement>();
  const MULTIPLY_THRESHOLD = 7;
  // Population at which the player loses. Tuned so the screen looks crowded
  // before the game ends, and scaled with viewport area so a 1080p screen
  // holds more bugs than a phone (roughly 40-50% coverage at the end).
  const viewportArea = window.innerWidth * window.innerHeight;
  const LOSE_THRESHOLD = Math.max(
    120,
    Math.min(450, Math.round(viewportArea / 3000)),
  );
  // Bugs, slime and the lose screen live on <body>; take them with the page.
  scope.add(() => {
    for (const b of activeBugs) b.remove();
    activeBugs.clear();
    for (const el of document.querySelectorAll(
      ".bad-bug--game, .bad-slime, .bad-lose",
    )) {
      el.remove();
    }
  });

  const popBug = (bug: HTMLElement) => {
    if (!activeBugs.has(bug)) return;
    const rect = bug.getBoundingClientRect();
    activeBugs.delete(bug);
    bug.remove();
    const slime = document.createElement("div");
    slime.className = "bad-slime";
    slime.style.left = `${rect.left + rect.width / 2 - 28}px`;
    slime.style.top = `${rect.top + rect.height / 2 - 28}px`;
    slime.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.85 + Math.random() * 0.6})`;
    document.body.appendChild(slime);
    scope.timeout(() => slime.remove(), 7000);
  };

  const loseGame = () => {
    if (multiplyTimer !== null) {
      window.clearTimeout(multiplyTimer);
      multiplyTimer = null;
    }
    bugGameActive = false;
    logoHits = 0;
    multiplyWarned = false;
    multiplicationStarted = false;
    const lose = document.createElement("div");
    lose.className = "bad-lose";
    const loseText = document.createElement("div");
    loseText.className = "bad-lose__text";
    loseText.textContent = "YOU LOSE";
    const loseSub = document.createElement("div");
    loseSub.className = "bad-lose__sub";
    loseSub.textContent = "the bugs win. they always win.";
    lose.appendChild(loseText);
    lose.appendChild(loseSub);
    document.body.appendChild(lose);
    scope.timeout(() => {
      for (const b of activeBugs) b.remove();
      activeBugs.clear();
      for (const el of document.querySelectorAll(".bad-slime, .bad-lose")) {
        el.remove();
      }
    }, 5500);
  };

  const spawnBug = (x?: number, y?: number) => {
    if (activeBugs.size >= LOSE_THRESHOLD) {
      loseGame();
      return;
    }
    const bug = document.createElement("div");
    bug.className = "bad-bug bad-bug--game";
    bug.textContent = "🪲";
    const w = window.innerWidth;
    const h = window.innerHeight;
    const left = x ?? Math.random() * (w - 80);
    const top = y ?? Math.random() * (h - 160) + 80;
    bug.style.left = `${Math.max(8, Math.min(w - 60, left))}px`;
    bug.style.top = `${Math.max(72, Math.min(h - 60, top))}px`;
    bug.style.animationDelay = `${Math.random() * 1.5}s`;
    bug.style.fontSize = `${1.6 + Math.random() * 0.9}rem`;
    // The bug is removed with its listener when popped or cleaned up.
    bug.addEventListener("click", (e) => {
      e.stopPropagation();
      popBug(bug);
    });
    document.body.appendChild(bug);
    activeBugs.add(bug);

    if (activeBugs.size >= MULTIPLY_THRESHOLD && !multiplicationStarted) {
      multiplicationStarted = true;
      if (!multiplyWarned) {
        toast("🪲 uh oh, they're multiplying. POP them or YOU LOSE.", 5000);
        multiplyWarned = true;
      }
      scheduleMultiply();
    }
    if (activeBugs.size >= LOSE_THRESHOLD) loseGame();
  };

  const multiplyTick = () => {
    multiplyTimer = null;
    if (activeBugs.size === 0) return;
    if (activeBugs.size >= LOSE_THRESHOLD) {
      loseGame();
      return;
    }
    // Each bug has a chance to multiply per tick, low enough that a
    // determined player can keep up by popping; the screen fills gradually.
    const rate = Math.min(0.4, 0.15 + activeBugs.size * 0.002);
    // Cap new bugs per tick so a single tick cannot fill the screen.
    const maxPerTick = Math.max(5, Math.floor(activeBugs.size * 0.5));
    let spawned = 0;
    for (const b of [...activeBugs]) {
      if (spawned >= maxPerTick || activeBugs.size >= LOSE_THRESHOLD) break;
      if (Math.random() < rate) {
        const r = b.getBoundingClientRect();
        spawnBug(
          r.left + (Math.random() - 0.5) * 260,
          r.top + (Math.random() - 0.5) * 260,
        );
        spawned++;
      }
    }
    if (activeBugs.size < LOSE_THRESHOLD && activeBugs.size > 0) {
      scheduleMultiply();
    }
  };

  function scheduleMultiply() {
    if (multiplyTimer !== null) return; // already scheduled, don't stack
    // The interval slowly tightens but stays playable: 1.8 s down to 1.1 s.
    const ms = Math.max(1100, 1800 - activeBugs.size * 3);
    multiplyTimer = scope.timeout(multiplyTick, ms);
  }

  scope.on(heroTarget, "click", (e) => {
    if (!eggsEnabled()) return;
    // Clicks on the hero's controls (search, Shuffle, Pause, links) are
    // ordinary use, not attempts at the game.
    const target = e.target instanceof Element ? e.target : null;
    if (
      target?.closest(
        "button, input, a, [data-bad-shuffle], [data-bad-anim-toggle]",
      )
    ) {
      return;
    }
    // Do not react during the game's "YOU LOSE" cooldown.
    if (document.querySelector(".bad-lose")) return;

    if (!bugGameActive) {
      logoHits++;
      window.clearTimeout(logoTimer);
      logoTimer = scope.timeout(() => {
        logoHits = 0;
      }, 3000);
      if (logoHits >= 5) {
        logoHits = 0;
        bugGameActive = true;
        spawnBug();
        toast("🪲 you found the bug. Keep clicking; it makes friends.", 4500);
      }
    } else {
      spawnBug();
    }
  });
}

export function mount(): void {
  mountGlossary(".bad-page", "__badGlossaryCleanup", init);
}

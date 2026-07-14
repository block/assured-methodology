/**
 * ASSURED chapter Easter eggs.
 *
 * Glossaries have their own egg systems (BAD, CAT, CLEAR) so the chapter
 * triggers skip those pages; the site-wide kill-switch toggle is still
 * wired there. Bundled once and re-bound on every ClientRouter navigation
 * via onPageReady; the cleanup pattern below removes the previous page's
 * listeners before registering new ones, so we never stack handlers
 * across navigations.
 */
import { onPageReady } from "@/lib/dom";

function initChapterEggs() {
  if (typeof window === "undefined") return;
  // Tear down listeners registered by the previous page's invocation.
  if (window.__assuredEggCleanup) {
    try {
      window.__assuredEggCleanup();
    } catch (e) {}
  }
  const _cleanups = [];
  function _reg(target, ev, fn) {
    target.addEventListener(ev, fn);
    _cleanups.push(() => {
      target.removeEventListener(ev, fn);
    });
  }
  window.__assuredEggCleanup = () => {
    while (_cleanups.length) {
      try {
        _cleanups.pop()();
      } catch (e) {}
    }
  };

  // ---------- SC 2.1.4: persisted kill switch for keyboard eggs ----------
  // Every egg keydown handler (here and in the glossary pages' own inline
  // scripts) checks this flag, so the one toggle disables them site-wide.
  function eggsEnabled() {
    try {
      return localStorage.getItem("assured-eggs") !== "off";
    } catch (e) {
      return true;
    }
  }
  const eggToggle = document.querySelector("[data-egg-toggle]");
  function renderEggToggle() {
    if (!eggToggle) return;
    const on = eggsEnabled();
    eggToggle.setAttribute("aria-pressed", String(on));
    eggToggle.textContent = on
      ? "Keyboard easter eggs: on"
      : "Keyboard easter eggs: off";
  }
  if (eggToggle) {
    renderEggToggle();
    _reg(eggToggle, "click", () => {
      try {
        localStorage.setItem("assured-eggs", eggsEnabled() ? "off" : "on");
      } catch (e) {}
      renderEggToggle();
    });
  }

  // The toggle must work on glossary pages too (they bind their own egg
  // keys), so it is wired above this early return.
  const path = window.location.pathname;
  if (path.includes("/docs/glossaries")) return;

  // Vestibular safety: when reduced motion is on, effects that fling
  // particles across the viewport are skipped at spawn time (the CSS
  // reduce block can't reach the inline randomized durations).
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const chapterMatch = path.match(/\/docs\/([a-z]+)/i);
  const chapter = chapterMatch ? chapterMatch[1].toLowerCase() : null;

  // ---------- Toast helper ----------
  // msg: string (treated as text) or Node (appended as-is). Never accepts an
  // HTML string, switching this back to innerHTML reintroduces a DOM-XSS
  // foot-gun the moment any caller passes user input.
  function toast(msg, variant) {
    const el = document.createElement("div");
    el.className = `egg-toast ${variant || ""}`;
    // role=status (implicit aria-live=polite) so assistive tech hears the
    // egg respond. Content is populated a frame AFTER insertion: live
    // regions announce changes, so the region must already be in the DOM
    // when the text lands.
    el.setAttribute("role", "status");
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      if (typeof msg === "string") {
        el.textContent = msg;
      } else if (msg instanceof Node) {
        el.appendChild(msg);
      }
      el.classList.add("is-show");
    });
    setTimeout(() => {
      el.classList.remove("is-show");
      setTimeout(() => el.remove(), 500);
    }, 3200);
  }

  // Small helper for toasts that need an italicized inline span without
  // touching innerHTML. Returns a DocumentFragment.
  function toastFrag(parts) {
    const f = document.createDocumentFragment();
    for (const p of parts) {
      if (p && typeof p === "object" && p.em) {
        const e = document.createElement("em");
        e.textContent = p.em;
        f.appendChild(e);
      } else {
        f.appendChild(document.createTextNode(String(p)));
      }
    }
    return f;
  }

  function flash(variant, ms) {
    const el = document.createElement("div");
    el.className = `egg-flash ${variant}`;
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add("is-on"));
    setTimeout(() => {
      el.classList.remove("is-on");
      setTimeout(() => el.remove(), 300);
    }, ms || 1400);
  }

  // ---------- Chapter-specific effects ----------
  function alertRedAlert() {
    flash("alert", 2000);
    toast(
      "🚨 RED ALERT, Tier-1 escalation simulated. Page back to bed.",
      "alert",
    );
  }
  function alertFalsePos() {
    toast(
      "✅ Closed as false positive. Detection engineering thanks you.",
      "scope",
    );
  }

  const identities = [
    "root@bastion-01, last login 2 weeks ago from 10.0.0.7",
    "svc-deploy@prod-k8s, kube-system, all powerful, never sleeps",
    "j.doe@corp, domain user, but oddly RDPing into a DC at 03:14",
    "anon@coffee-shop-wifi, TOR exit, three hops, zero shame",
    "admin@legacy-vpn, password rotated never, MFA: 'maybe later'",
    "you@right-now, yes, the analyst is always a subject too",
  ];
  function subjectWhoami() {
    const who = identities[Math.floor(Math.random() * identities.length)];
    toast(toastFrag(["👤 whoami → ", { em: who }]), "subject");
  }
  function subjectInsider() {
    toast(
      "👁️ Insider mode engaged. Trust nothing. Especially the printer.",
      "subject",
    );
  }

  function scopeZoom() {
    const main = document.querySelector(".content-page__main-inner");
    if (!main) return;
    main.classList.add("egg-zoom");
    setTimeout(() => main.classList.remove("egg-zoom"), 1300);
    toast("🔍 Scope adjusted. Pulling back to the blast radius.", "scope");
  }
  function scopeBoundary() {
    const el = document.createElement("div");
    el.className = "egg-boundary";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1700);
    toast("📐 Blast radius mapped. Everything inside is in scope.", "scope");
  }

  const ttps = [
    "T1078",
    "T1059.001",
    "T1566.001",
    "T1003",
    "T1547",
    "T1071.001",
    "T1486",
    "T1021.002",
    "T1110",
    "T1053",
  ];
  function uncoverHunt() {
    toast(
      "🔎 Hunting mode: assume breach, work backward, follow the data.",
      "uncover",
    );
  }
  function uncoverTtps() {
    if (reduceMotion.matches) {
      toast(
        "🧪 MITRE rain (paused for reduced motion). Map every step to a technique.",
        "uncover",
      );
      return;
    }
    for (let i = 0; i < 14; i++) {
      const el = document.createElement("div");
      el.className = "egg-matrix";
      el.style.left = `${Math.random() * 100}vw`;
      el.style.animationDelay = `${Math.random() * 0.8}s`;
      el.style.animationDuration = `${1.8 + Math.random() * 1.5}s`;
      el.textContent = ttps[Math.floor(Math.random() * ttps.length)];
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 3500);
    }
    toast("🧪 MITRE rain. Map every step to a technique.", "uncover");
  }

  function riskRoll() {
    const n = 1 + Math.floor(Math.random() * 20);
    const dice = document.createElement("div");
    dice.className = "egg-d20";
    dice.textContent = String(n);
    document.body.appendChild(dice);
    setTimeout(() => dice.remove(), 2300);
    let label;
    if (n === 20)
      label = "🎲 NAT 20, auto-contain, write the post-mortem yourself.";
    else if (n === 1)
      label = "💀 NAT 1, the SIEM is on fire, the analyst is on PTO.";
    else if (n >= 15) label = `🎲 ${n}, clean detection, clean response.`;
    else if (n >= 8) label = `🎲 ${n}, workable. Document it and move on.`;
    else label = `🎲 ${n}, gaps exist. Tune the rule.`;
    setTimeout(() => toast(label, "risk"), 1800);
  }
  function riskCrit() {
    flash("risk", 900);
    toast("💥 CRITICAL, escalate now, document later, sleep never.", "risk");
  }

  function escalateSiren() {
    flash("escal", 2000);
    toast("📟 ESCALATION engaged. Bridge open. IR lead paged.", "escal");
  }

  function escalateBreakGlass() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const cx = w / 2 + (Math.random() - 0.5) * w * 0.25;
    const cy = h / 2 + (Math.random() - 0.5) * h * 0.25;
    const svgNS = "http://www.w3.org/2000/svg";

    const overlay = document.createElement("div");
    overlay.className = "egg-glass";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    svg.setAttribute("preserveAspectRatio", "none");

    // Impact ring
    const impact = document.createElementNS(svgNS, "circle");
    impact.setAttribute("cx", cx);
    impact.setAttribute("cy", cy);
    impact.setAttribute("r", "4");
    impact.setAttribute("fill", "none");
    impact.setAttribute("stroke", "rgba(255,255,255,0.9)");
    impact.setAttribute("stroke-width", "2");
    impact.classList.add("egg-glass__impact");
    svg.appendChild(impact);

    // Recursive jagged-crack generator
    function makeCrack(x, y, angle, len, depth) {
      const segs = 4 + Math.floor(Math.random() * 4);
      const segLen = len / segs;
      let px = x;
      let py = y;
      let a = angle;
      let d = `M ${x} ${y}`;
      const points = [{ x: x, y: y }];
      for (let i = 0; i < segs; i++) {
        a += (Math.random() - 0.5) * 0.7;
        px += Math.cos(a) * segLen;
        py += Math.sin(a) * segLen;
        d += ` L ${px} ${py}`;
        points.push({ x: px, y: py });
      }
      const path = document.createElementNS(svgNS, "path");
      path.setAttribute("d", d);
      path.classList.add("egg-glass__crack");
      path.style.animationDelay = `${depth * 0.06 + Math.random() * 0.15}s`;
      path.style.strokeWidth = `${1.6 - depth * 0.4}px`;
      svg.appendChild(path);

      // Sub-branches
      if (depth < 2) {
        const branches = 1 + Math.floor(Math.random() * 2);
        for (let i = 0; i < branches; i++) {
          const p = points[1 + Math.floor(Math.random() * (points.length - 1))];
          const bAng =
            a + (Math.random() > 0.5 ? 1 : -1) * (0.6 + Math.random() * 0.5);
          makeCrack(
            p.x,
            p.y,
            bAng,
            len * (0.35 + Math.random() * 0.3),
            depth + 1,
          );
        }
      }
    }

    const mainCracks = 9 + Math.floor(Math.random() * 4);
    const maxLen = Math.max(w, h) * 0.85;
    for (let i = 0; i < mainCracks; i++) {
      const angle =
        (i / mainCracks) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const len = maxLen * (0.5 + Math.random() * 0.5);
      makeCrack(cx, cy, angle, len, 0);
    }

    overlay.appendChild(svg);
    document.body.appendChild(overlay);

    // Screen shake
    document.body.classList.add("egg-shake");
    setTimeout(() => document.body.classList.remove("egg-shake"), 550);

    // Toast comes in after the cracks finish drawing
    setTimeout(
      () =>
        toast(
          "⚠️ Break-glass account used. Logged, audited, scrutinized.",
          "escal",
        ),
      700,
    );
    setTimeout(() => overlay.remove(), 5000);
  }

  function docSign() {
    toast(
      toastFrag([
        "📝 Report signed: ",
        { em: "Analyst on duty" },
        ". Filed for the record.",
      ]),
      "doc",
    );
  }
  function docAudit() {
    toast(
      "📜 Audit trail: every click, every query, every decision. That's the point.",
      "doc",
    );
  }

  function introGlow() {
    document.body.classList.add("egg-glow-hero");
    setTimeout(() => document.body.classList.remove("egg-glow-hero"), 3400);
    toast("✨ A, S, S, U, R, E, D. Now you know.", "intro");
  }

  // ---------- Universal: Konami ----------
  function konamiBurst() {
    if (reduceMotion.matches) {
      toast(
        "🎉 Konami unlocked (confetti skipped for reduced motion). Every chapter has secrets, keep typing.",
        "intro",
      );
      return;
    }
    const colors = [
      "#f87171",
      "#fbbf24",
      "#34d399",
      "#60a5fa",
      "#a78bfa",
      "#f472b6",
    ];
    for (let i = 0; i < 80; i++) {
      const c = document.createElement("div");
      c.className = "egg-confetti";
      c.style.left = `${Math.random() * 100}vw`;
      c.style.background = colors[Math.floor(Math.random() * colors.length)];
      c.style.animationDelay = `${Math.random() * 0.6}s`;
      c.style.animationDuration = `${2.4 + Math.random() * 1.6}s`;
      c.style.transform = `rotate(${Math.random() * 360}deg)`;
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 4500);
    }
    toast(
      "🎉 Konami unlocked. Every chapter has secrets, keep typing.",
      "intro",
    );
  }

  // ---------- Sequence detection ----------
  const triggers = {
    alert: { REDALERT: alertRedAlert, FALSEPOS: alertFalsePos },
    subject: { WHOAMI: subjectWhoami, INSIDER: subjectInsider },
    scope: { ZOOM: scopeZoom, BOUNDARY: scopeBoundary },
    uncover: { HUNT: uncoverHunt, TTPS: uncoverTtps },
    risk: { ROLL: riskRoll, CRIT: riskCrit },
    escalation: { ESCALATE: escalateSiren, BREAKGLASS: escalateBreakGlass },
    documentation: { SIGN: docSign, AUDIT: docAudit },
    intro: { ASSURED: introGlow },
  };

  // Build a flat lookup of every trigger active on this chapter,
  // plus a few that work everywhere.
  const active = Object.assign({}, triggers[chapter] || {});
  // Universal: ASSURED works on any docs page that isn't a glossary.
  if (!active.ASSURED) active.ASSURED = introGlow;

  const keys = Object.keys(active);
  const maxLen = keys.reduce((m, k) => Math.max(m, k.length), 0);
  let buffer = "";

  _reg(window, "keydown", (e) => {
    if (!eggsEnabled()) return;
    // Ignore typing inside form fields so we don't hijack the search bar.
    const t = e.target;
    if (
      t &&
      (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)
    )
      return;
    if (e.key.length !== 1) return;
    buffer = (buffer + e.key.toUpperCase()).slice(-maxLen);
    for (const k of keys) {
      if (buffer.endsWith(k)) {
        active[k]();
        buffer = "";
        return;
      }
    }
  });

  // Konami: ↑ ↑ ↓ ↓ ← → ← → B A
  const konami = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];
  let kIdx = 0;
  _reg(window, "keydown", (e) => {
    if (!eggsEnabled()) return;
    const expected = konami[kIdx];
    const got = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (got === expected) {
      kIdx++;
      if (kIdx === konami.length) {
        kIdx = 0;
        konamiBurst();
      }
    } else {
      kIdx = got === konami[0] ? 1 : 0;
    }
  });
}

onPageReady(initChapterEggs);

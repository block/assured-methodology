/**
 * Shared helpers for component client scripts.
 */

/**
 * Run `bind` now and again after every ClientRouter navigation.
 *
 * A processed <script> executes once per browser session, so each
 * component's bind function must re-run on astro:page-load to pick up the
 * swapped-in DOM. Bind functions stay idempotent across repeat calls via
 * their own data-*-bound markers.
 */
export function onPageReady(bind: () => void): void {
  bind();
  document.addEventListener("astro:page-load", bind);
}

/**
 * The y-offset (px) below the viewport top where in-page anchor targets
 * land, from --anchor-scroll-offset in assured.css. Scroll-spies compare
 * against this same line so "current section" agrees with where an anchor
 * click actually parks the heading.
 */
export function anchorScrollOffset(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(
    "--anchor-scroll-offset",
  );
  const px = Number.parseFloat(raw);
  return Number.isNaN(px) ? 140 : px;
}

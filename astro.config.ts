// @ts-check

import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

// https://astro.build/config
export default defineConfig({
  site: "https://assured-methodology.vercel.app",
  base: "/",
  // Vercel serves the trailing-slash form (vercel.json "trailingSlash": true)
  // and 308-redirects the bare form. "always" makes dev 404 the bare form so
  // a link written without the slash fails loudly before it ships.
  trailingSlash: "always",
  // Pages that were merged or moved keep their old URLs alive here. In a
  // static build Astro emits a meta-refresh stub page for each one, so the
  // old link works in dev, in preview and on any static host. Production
  // should also carry the same pairs as server-side 308s in vercel.json
  // (where the older legacy redirects live), because a 308 passes link
  // equity and a meta-refresh stub has no <html> element. Destinations must
  // end in a slash (trailingSlash: "always").
  redirects: {
    // The four detection-mechanism leaf pages merged into their pillar.
    "/docs/alert/detection-mechanisms/signature/":
      "/docs/alert/detection-mechanisms/",
    "/docs/alert/detection-mechanisms/anomaly/":
      "/docs/alert/detection-mechanisms/",
    "/docs/alert/detection-mechanisms/rule/":
      "/docs/alert/detection-mechanisms/",
    "/docs/alert/detection-mechanisms/behavioral/":
      "/docs/alert/detection-mechanisms/",
    // Baseline comparison merged into the validation pillar.
    "/docs/alert/validation/baseline-comparison/": "/docs/alert/validation/",
    // Asset criticality moved from Alert to Scope.
    "/docs/alert/validation/criticality/": "/docs/scope/criticality/",
  },

  // Astro 7 changed the default to "jsx", which strips whitespace between
  // adjacent inline elements (<a>x</a> <em>y</em> renders as "xy"). The
  // components and MDX pages were written against the Astro 5/6 behavior,
  // so keep it until every page has been checked visually.
  compressHTML: true,

  integrations: [
    sitemap(),
    // MDX inherits markdown.processor (extendMarkdownConfig defaults to
    // true), so the remark/rehype plugins are declared once, below.
    mdx(),
  ],
  markdown: {
    // Astro 7 renders Markdown and MDX with Sätteri by default. The site
    // depends on remark/rehype plugins (rehype-slug and
    // rehype-autolink-headings produce the heading anchors that deep links
    // and check-links.mjs rely on), so it stays on the unified pipeline from
    // @astrojs/markdown-remark.
    processor: unified({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
    }),
    shikiConfig: {
      // The site is dark-only; a single dark theme keeps code blocks from
      // rendering on a white background (the old dual-theme config defaulted
      // to github-light and nothing ever switched it).
      theme: "github-dark",
      wrap: true,
    },
  },
  vite: {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },
});

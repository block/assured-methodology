// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://assured-methodology.vercel.app",
  base: "/",
  // Vercel serves the trailing-slash form (vercel.json "trailingSlash": true)
  // and 308-redirects the bare form. "always" makes dev 404 the bare form so
  // a link written without the slash fails loudly before it ships.
  trailingSlash: "always",
  // Legacy-URL redirects live in vercel.json (server-side 308s), not here:
  // Astro's static redirects emit meta-refresh stub pages without an <html>
  // element, and inbound legacy links are a production concern anyway.

  integrations: [
    sitemap(),
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
    }),
  ],
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
    shikiConfig: {
      // The site is dark-only; a single dark theme keeps code blocks from
      // rendering on a white background (the old dual-theme config defaulted
      // to github-light and nothing ever switched it).
      theme: "github-dark",
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },
});

import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

export const collections = {
  docs: defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: "./src/content/docs" }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      slug: z.string(),
      // When true, the page uses the wide layout. Intended for overview /
      // landing pages that have rich visual sections.
      wide: z.boolean().optional(),
      // When true, the page renders edge-to-edge with no breadcrumbs, no H1,
      // and no shell padding. Use for pages that bring their own hero
      // (glossaries, themed landing pages).
      chromeless: z.boolean().optional(),
      // When false, the in-page table of contents is suppressed even if the
      // page has h2/h3 headings. Use for overview pages where the TOC adds an
      // asymmetric right-side gutter without providing navigational value.
      showToc: z.boolean().optional(),
    }),
  }),
};

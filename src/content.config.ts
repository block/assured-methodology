import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

export const collections = {
  docs: defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: "./src/content/docs" }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      // Optional id override, honored by the glob loader's generateId. The
      // route comes from the entry id, which defaults to the file path, so
      // most pages must not declare this. Chapter index pages use it to
      // collapse "risk/index" to "risk".
      slug: z.string().optional(),
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

import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

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
    }),
  }),
};

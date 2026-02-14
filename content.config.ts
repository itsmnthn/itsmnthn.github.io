import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: "blog/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        updated: z.string().optional(),
        categories: z.array(z.string()).default([]),
        authors: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
        published: z.boolean().default(true),
        seo: z.object({
          title: z.string(),
          description: z.string(),
          image: z.string().optional(),
          canonical: z.string().optional(),
          robots: z.string().default("index, follow"),
          keywords: z.array(z.string()).default([]),
        }),
      }),
    }),
  },
});

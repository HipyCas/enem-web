import { defineCollection, reference, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    relatedPosts: z.array(reference("blog")).default([]),
    draft: z.boolean().default(false),
    publishedDate: z.date(),
  }),
});

export const collections = { blog };

import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import mdx from "@astrojs/mdx";

import metaTags from "astro-meta-tags";

// https://astro.build/config
export default defineConfig({
  site: "https://prueba.anem.es",
  base: "/2025",
  prefetch: {
    prefetchAll: true,
  },
  integrations: [
    sitemap(),
    tailwind(),
    vue({ devtools: true }),
    mdx(),
    metaTags(),
  ],
});

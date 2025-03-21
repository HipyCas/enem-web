import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import mdx from "@astrojs/mdx";
import pagefind from "astro-pagefind";
import metaTags from "astro-meta-tags";

import { externalAnchorPlugin } from "./remarkplugins/external-anchor-plugin.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://enem.anem.es",
  //! Important to end the base with / for pagefind integration
  base: "/2025/",
  prefetch: {
    prefetchAll: true,
  },
  redirects: {
    "/participa": "/2025/noticias/voluntarios-ordinaria",
  },

  integrations: [
    sitemap(),
    tailwind(),
    vue({ devtools: true }),
    mdx(),
    metaTags(),
    pagefind(),
  ],
  markdown: {
    remarkPlugins: [externalAnchorPlugin],
  }
});

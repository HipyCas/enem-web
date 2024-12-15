<template>
  <template v-for="ln in links">
    <li v-if="typeof ln[1] === 'string'">
      <a
        :href="ln[1]"
        :class="[
          Astro.url.pathname.replace(/\//, '').replace('index.html', '') ===
          ln[1].replace(/\//, '')
            ? 'active'
            : '',
          'navlink',
        ]"
      >
        {{ ln[0] }}
      </a>
    </li>
    <li v-else class="relative navdropwdown group">
      {{ ln[0] }}
      <span
        class="inline-block -mb-0.5 transition-transform i-tabler-chevron-down group-hover:-rotate-180"
      ></span>
      <ul
        class="hidden absolute top-9 p-2 w-max rounded border shadow-xl opacity-0 transition-opacity duration-1000 delay-500 group-hover:opacity-100 group-hover:block bg-clear dark:bg-dark dark:border-zinc-700"
      >
        <template v-for="l2 in ln[1]">
          <li class="">
            <a
              :href="l2[1]"
              :class="[
                Astro.url.pathname
                  .replace(/\//, '')
                  .replace('index.html', '') === l2[1].replace(/\//, '')
                  ? 'active'
                  : '',
                'navlink',
              ]"
            >
              {{ l2[0] }}
            </a>
          </li>
        </template>
      </ul>
    </li>
  </template>
  <a href="mailto:enem2025@anem.es" aria-label="Correo electrónico" target="_blank">
    <i class="inline-block text-lg i-tabler-mail"></i>
  </a>
  <a
    href="https://instagram.com/enem.mat"
    aria-label="Instagram"
    class="!-ml-2" target="_blank"
  >
    <i class="inline-block text-lg i-tabler-brand-instagram"></i>
  </a>
  <a
    href="https://x.com/enem_mat"
    aria-label="Twitter / X"
    class="!-ml-2" target="_blank"
  >
    <i class="inline-block text-lg i-tabler-brand-twitter"></i>
  </a>
</template>

<script setup lang="ts">
import { type Link } from "../types";

defineProps<{
  links: [string, string | Link[]][];
  Astro: any;
}>();
</script>

<style scoped>
nav li,
.navlink,
.navdropwdown {
  @apply inline-block;
}

nav a {
  @apply ml-3 px-2.5 py-2;
}

.navlink {
  @apply text-dark dark:text-clear rounded-lg hover:bg-primary focus:bg-primary hover:text-dark transition-colors;
}

.navlink.active,
.navdropwdown:has(.navlink.active) {
  @apply bg-secondary text-dark no-underline;
}

.navdropwdown {
  @apply ml-3 px-2.5 py-2 text-dark dark:text-clear rounded-lg underline decoration-2 decoration-transparent hover:decoration-primary focus:bg-primary transition-all cursor-pointer;
}

.navdropwdown ul {
  z-index: 10;
}

.navdropwdown .navlink {
  @apply block ml-0 rounded-sm;
}

.navdropwdown li {
  @apply block mt-2;
}

.navdropwdown li:first-of-type {
  @apply mt-0;
}

.navdropwdown:last-of-type ul {
  /* background: red !important; */
  right: 0;
}

nav i {
  @apply text-dark dark:text-clear hover:text-primary transition-colors;
}
</style>

<template>
  <ul class="mobile-links">
    <template v-for="ln in links">
      <li v-if="typeof ln[1] === 'string'">
        <a :href="ln[1]" :class="Astro.url.pathname === ln[1] ? 'active' : ''">
          {{ ln[0] }}
        </a>
      </li>
      <li v-else class="mobile-dropdown relative">
        <button class="text-primary">
          <i class="i-tabler-chevron-down inline-block -mb-1"></i> {{ ln[0] }}
        </button>
        <ul class="hidden w-max">
          <template v-for="l2 in ln[1]">
            <li>
              <a
                :href="l2[1]"
                :class="Astro.url.pathname === l2[1] ? 'active' : ''"
                >{{ l2[0] }}</a
              >
            </li>
          </template>
        </ul>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { type Link } from "../types";

defineProps<{
  links: [string, string | Link[]][];
  Astro: any;
}>();
</script>

<style scoped>
.mobile-links {
  @apply pt-2;
}

.mobile-links a,
.mobile-links button {
  @apply block px-6 py-4 text-xl text-dark dark:text-clear;
}

.mobile-links a.active {
  @apply text-primary dark:text-secondary underline decoration-2 underline-offset-4;
}

.mobile-dropdown > button > i {
  @apply transition-transform;
}

.mobile-dropdown[data-mobile-dropdown-open] > button > i {
  @apply rotate-180;
}

.mobile-dropdown ul {
  @apply block max-h-0 h-fit overflow-hidden w-full ml-7 -mt-2 border-l-2
     border-primary dark:border-secondary transition-[max-height] duration-200;
}

.mobile-dropdown[data-mobile-dropdown-open] ul {
  @apply max-h-[400px]; /* border-t-2 */
}

.mobile-dropdown[data-mobile-dropdown-open] ul a {
  @apply pl-4;
}

.mobile-dropdown:has(.active) button {
  @apply !text-primary dark:!text-secondary;
}
</style>

<template>
  <a
    :href="`/2025/noticias/${item.slug}`"
    class="block p-6 rounded border bg-dark hover:border-secondary"
    :class="mergedClass"
  >
    <Image :src="item.data.image" width="711" height="400" />
    <h3 class="text-xl font-bold text-clear">{{ item.data.title }}</h3>
  </a>
</template>

<script setup lang="ts">
import type { collections } from "../../../content/config";
import type { z } from "zod";

type New = z.infer<
  Exclude<(typeof collections)["blog"]["schema"], undefined | Function>
>;

const { emphasize = false, class: thisClass } = defineProps<{
  item: {
    slug: string;
    data: New;
  };
  emphasize?: boolean;
  class?: string;
  Image: any;
}>();

const mergedClass = {
  [thisClass ?? ""]: true,
  "border-primary": emphasize,
  "border-dark": !emphasize,
};
</script>

<template>
  <component
    :is="as ?? 'a'"
    v-bind="$attrs"
    :data-umami-event="event"
    class="block text-center font-bold mt-2 bg-primary !text-clear px-2 py-1 rounded-lg shadow transition-all cursor-pointer no-underline hover:text-clear border-2 border-primary"
    :class="classes"
    :href="href"
    :target="target"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
const {
  group,
  class: classProp,
  disabled = false,
} = defineProps<{
  class?: string;
  event?: string;
  as?: "a" | "button" | "span";
  group?: boolean;
  href?: string;
  disabled?: boolean;
  target?: string;
}>();

const classes = {
  "hover:shadow-lg hover:shadow-primary-400 dark:hover:shadow-lg hover:scale-[1.03]":
    !group,
  "group-hover:shadow-lg group-hover:shadow-primary-400 dark:group-hover:shadow-lg group-hover:scale-[1.03]":
    group,
  "opacity-50 !cursor-not-allowed hover:transform-none !bg-gray-500 !border-gray-500":
    disabled,
  [classProp ?? ""]: true,
};
</script>

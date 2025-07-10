<template>
  <!-- <div class="marquee">
    <div>
      <span class="border border-blue-500 border-spacing-4">
        <slot />
      </span>
      <span class="border border-green-500">
        <slot />
      </span>
    </div>
  </div> -->
  <!-- <div
    class="wrap h-36 relative before:blur before:absolute before:inset-0 before:z-10 overflow-hidden"
  >
    <div
      class="absolute w-fit left-0 flex flex-row flex-nowrap h-36 *:flex-shrink-0 _-translate-x-[115%]"
    >
      <img v-for="(item, i) in items" :key="i" :src="item[0]" :alt="item[1]" />
    </div>
  </div> -->
  <div
    class="marquee wrap before:blur before:absolute before:inset-0 before:z-10"
  >
    <div class="marquee__group -z-10 h-[150px]">
      <img v-for="(item, i) in items" :key="i" :src="item[0]" :alt="item[1]" />
    </div>
    <div class="marquee__group -z-10 h-[150px]" aria-hidden="true">
      <img v-for="(item, i) in items" :key="i" :src="item[0]" :alt="item[1]" />
    </div>
  </div>
</template>

<script setup lang="ts">
// TODO Make this work by using this: https://docs.astro.build/en/guides/images/#passing-the-image-component
import { Image } from "astro:assets";

defineProps<{
  items: [string, string][];
}>();
</script>

<style scoped>
/*! Not working */
/* .wrap::before {
  --bg-color: #eaeaea;

  content: "";
  background: linear-gradient(
    90deg,
    blue -10%,
    blue 5%,
    transparent 20%,
    transparent 80%,
    red 95%,
    red 110%
  );
  background-size: 120% auto;
  background-position-x: -5rem;
}

@media (prefers-color-scheme: dark) {
  .wrap::before {
    --bg-color: #1c1c1c;
  }
} */

.marquee {
  --duration: 30s;
  --gap: 2rem;

  position: relative;
  display: flex;
  overflow: hidden;
  user-select: none;
  gap: var(--gap);
  /* transform: skewY(-3deg); */
}

@media screen and (min-width: 768px) {
  .marquee {
    --duration: 60s;
  }
}

@media screen and (min-width: 1280px) {
  .marquee {
    --duration: 90s;
  }
}

.marquee__group {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: var(--gap);
  min-width: 100%;
  animation: scroll var(--duration) linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .marquee__group {
    animation-play-state: paused;
  }
}

.marquee__group img {
  /* max-width: clamp(10rem, 1rem + 28vmin, 20rem); */
  /* aspect-ratio: 1; */
  /* max-width: 20rem; */
  @apply max-w-80 md:max-w-[25rem];
  object-fit: contain;
  max-height: 70%;
}

/* .marquee__group p {
  background-image: linear-gradient(
    75deg,
    hsl(240deg 70% 49%) 0%,
    hsl(253deg 70% 49%) 11%,
    hsl(267deg 70% 49%) 22%,
    hsl(280deg 71% 48%) 33%,
    hsl(293deg 71% 48%) 44%,
    hsl(307deg 71% 48%) 56%,
    hsl(320deg 71% 48%) 67%,
    hsl(333deg 72% 48%) 78%,
    hsl(347deg 72% 48%) 89%,
    hsl(0deg 73% 47%) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
} */

.marquee--borders {
  border-block: 3px solid dodgerblue;
  padding-block: 0.75rem;
}

.marquee--reverse .marquee__group {
  animation-direction: reverse;
  animation-delay: calc(var(--duration) / -2);
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(-100% - var(--gap)));
  }
}
</style>

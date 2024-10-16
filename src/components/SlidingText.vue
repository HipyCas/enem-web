<template>
  <span
    class="bg-gradient-to-tr from-secondary-700 to-tertiary-800 bg-clip-text text-transparent txt"
    >{{ text }}</span
  >
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

const loopText = [
  "Matemáticas",
  "Estadísitica",
  "Ciencia de Datos",
  "Inteligencia Artificial",
  "Álgebra",
  "Cálculo",
  "Inferencia",
];
const ANIMATION_TEXT = "transform 500ms ease-out 0s";
const ANIMATION_NEXT = "top 500ms ease-out 0s";

const nextText = (i: number) => "'" + loopText[(i + 1) % loopText.length] + "'";

let idx = 0;
const text = ref(loopText[idx]);
const textTransition = ref(ANIMATION_TEXT);
const nextTextStr = ref(nextText(idx));
const nextTextTop = ref("0");
const nextTextTransition = ref(ANIMATION_NEXT);

// A cool animation could be shuffling the letters and adding or substractin letters until you reach the length of the next word, and then one by one stop the shuffle
onMounted(() => {
  setInterval(async () => {
    idx = (idx + 1) % loopText.length;
    nextTextTop.value = "-1.2lh";
    await new Promise((r) => setTimeout(r, 1000)); //* This changes how often this switchs
    text.value = loopText[idx];
    textTransition.value = "";
    nextTextTransition.value = "";
    nextTextStr.value = nextText(idx);
    nextTextTop.value = "0";
    await new Promise((r) => setTimeout(r, 100));
    textTransition.value = ANIMATION_TEXT;
    nextTextTransition.value = ANIMATION_NEXT;
  }, 1750);
  // setInterval(() => {
  //   text.value = shuffle(text.value.split("")).join("");
  // }, 50);
});
</script>

<style scoped>
.txt {
  position: relative;
  display: inline-block;
  transform: translateY(v-bind(nextTextTop));
  transition: v-bind(textTransition);
}

.txt::after {
  content: v-bind(nextTextStr);
  position: absolute;
  /* top: v-bind(nextTextTop); */
  top: 1.2lh;
  left: 0;
  transition: v-bind(nextTextTransition);
  text-wrap: nowrap;
  width: max-content;

  @apply bg-gradient-to-tr from-secondary-700 to-tertiary-800 bg-clip-text;
}
</style>

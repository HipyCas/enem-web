<template>
  <section class="sm:hidden">
    <div
      v-for="o of objects"
      :key="o[0]"
      class="ventaja rounded bg-clear dark:bg-dark p-4 mb-2 text-center"
    >
      <p class="font-semibold mb-1 mt-0">{{ o[0] }}</p>

      <div>
        <template
          v-for="(lvl, idx) of [
            'platino',
            'oro',
            'plata',
            'bronce',
            'colaborador',
          ]"
        >
          <span
            v-if="o[1][idx]"
            :class="{
              'has-string': typeof o[1][idx] === 'string',
              [lvl]: true,
            }"
          >
            <i
              class="i-tabler-check -mb-1 mr-0.5"
              v-if="typeof o[1][idx] === 'boolean'"
            />
            <span class="capitalize">{{ lvl }}</span>
            <span v-if="typeof o[1][idx] === 'string'">{{ o[1][idx] }}</span>
          </span>
        </template>
        <!-- <span class="oro" v-if="o[1][1]">Oro</span>
        <span class="plata" v-if="o[1][2]">Plata</span>
        <span class="bronce" v-if="o[1][3]">Bronce</span>
        <span class="colaborador" v-if="o[1][4]">Colaborador</span> -->
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { class: thisClass } = defineProps<{
  objects: [
    string,
    [
      string | boolean,
      string | boolean,
      string | boolean,
      string | boolean,
      string | boolean
    ]
  ][];
  class: string;
}>();

console.info("clas", thisClass);
</script>

<style scoped>
.platino {
  --this-color: #e5e4e2;
  scale: 1.05;
}
.oro {
  --this-color: #ffbf00;
  /* scale: 1.02; */
}
.plata {
  --this-color: /* #c0c0c0 */ #bab7b2;
  /* scale: 1.01; */
}
.bronce {
  --this-color: #cd7f32;
}
.colaborador {
  --this-color: #fda575;
}

.ventaja > div {
  @apply flex flex-wrap gap-2 items-center justify-center;
}

.ventaja > div > span {
  @apply rounded-full text-dark font-semibold py-1 px-1.5 h-fit;
  background-color: var(--this-color);
}

.ventaja > div > span.has-string {
  display: flex;
  flex-direction: column;
}

.ventaja > div > span.has-string > span:first-of-type {
  @apply text-xs font-light underline;
}

.ventaja > div > span.has-string > span:nth-of-type(2) {
  @apply -mt-1.5;
}
</style>

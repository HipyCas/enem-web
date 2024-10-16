<template>
  <table>
    <thead>
      <th></th>
      <th class="w-14">
        <select
          v-model="selectedLevel"
          class="bg-transparent rounded border border-zinc-500 p-2"
        >
          <option :value="0">Platino</option>
          <option :value="1">Oro</option>
          <option :value="2">Plata</option>
          <option :value="3">Bronce</option>
          <option :value="4">Colab.</option>
        </select>
      </th>
    </thead>
    <tbody>
      <tr v-for="o of objects" :key="o[0]">
        <td class="font-semibold">{{ o[0] }}</td>
        <td class="text-center align-middle">
          <span v-if="o[1][selectedLevel] === true" class="i-tabler-check" />
          <span v-else>{{ o[1][selectedLevel] }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

defineProps<{
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
}>();

const selectedLevel = ref(0);
watch(selectedLevel, () => {
  console.info(selectedLevel.value);
});
</script>

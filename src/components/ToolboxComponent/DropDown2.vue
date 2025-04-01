<template>
  <div
    ref="wrapper"
    class="z-10 relative inline-block text-left w-full md:w-auto"
  >
    <div class="flex items-center space-x-3 w-full md:w-auto">
      <!-- class="w-full md:w-auto justify-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center" -->
      <button
        @click="onToggle"
        class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          class="h-4 w-4 mr-2 text-gray-400"
          viewbox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
            clip-rule="evenodd"
          />
        </svg>
        Filtro
        <svg
          class="-mr-1 ml-1.5 w-5 h-5"
          fill="currentColor"
          viewbox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          />
        </svg>
      </button>
    </div>
    <div
      class="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none w-full md:w-auto md:min-w-full p-3"
      :class="{ hidden: !visible }"
    >
      <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">
        {{ title }}
      </h6>
      <ul class="space-y-2 text-sm">
        <li
          class="flex items-center"
          v-for="(filter, index) in filters"
          :key="index"
        >
          <input
            :id="filter.value"
            type="checkbox"
            v-model="modelFilters"
            :value="filter.value"
            class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
          <label
            :for="filter.value"
            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
            >{{ filter.label }}</label
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, type Ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { FILTERS } from "./keys";

const visible = ref(false);
const onToggle = () => (visible.value = !visible.value);

const { title, filters } = defineProps<{
  title: string;
  filters: Array<{ value: string; label: string }>;
  modelValue: Array<string>;
}>();

const modelFilters = inject<Ref<Array<string>>>(FILTERS, ref([]));
const wrapper = ref<HTMLDivElement>();

onClickOutside(wrapper, () => {
  if (!visible.value) return;
  visible.value = false;
});
</script>

<style scoped></style>

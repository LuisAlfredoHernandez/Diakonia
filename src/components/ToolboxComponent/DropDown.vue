<template>
  <div
    class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
    ref="wrapper"
  >
    <div class="flex items-center space-x-3 w-full md:w-auto">
      <!-- Filter Button -->
      <button
        @click="onToggle"
        class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        type="button"
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
      <!-- Box filter -->
      <div
        ref="content"
        class="z-10 w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700 focus:outline-none"
        :style="contentStyles"
        :class="[contentClasses, visible ? 'block' : 'hidden']"
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
              id="canon"
              type="checkbox"
              v-model="modelFilters"
              class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              :value="filter.value"
            />
            <label
              for="canon"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
              >{{ filter.label }}</label
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useDropdownClasses } from "./composables/useDropdownClasses";

interface Props {
  title: string;
  filters: Array<{ value: string; label: string }>;
}

const { title, filters } = defineProps<Props>();

const visible = ref(false);
const modelFilters = ref([]);

const onToggle = () => (visible.value = !visible.value);

const content = ref<HTMLDivElement>();
const wrapper = ref<HTMLDivElement>();

const { contentClasses, contentStyles } = useDropdownClasses({
  visible,
  contentRef: wrapper,
});

onClickOutside(wrapper, () => {
  if (!visible.value) return;
  visible.value = false;
});
</script>

<style scoped></style>

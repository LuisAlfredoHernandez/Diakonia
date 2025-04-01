<template>
  <div
    class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4"
  >
    <!-- Search input -->
    <div class="w-full md:w-1/2" v-if="props.showSearch">
      <form class="flex items-center" @submit.prevent="onsubmit">
        <label for="simple-search" class="sr-only">Search</label>
        <div class="relative w-full">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
            @click="onsubmit"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewbox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Search"
            v-model="searchInput"
            required="true"
          />
        </div>
      </form>
    </div>
    <!-- Box Button actions -->
    <DropDown2
      v-if="props.propsToFilter"
      :filters="props.propsToFilter"
      :title="props.propsToTitle"
      v-model="filters"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, provide, type Ref } from "vue";
import DropDown2 from "./DropDown2.vue";
import { FILTERS } from "./keys";

interface Props {
  showSearch?: boolean;
  showCheckboxFilter?: boolean;
  propsToFilter?: Array<{ value: string; label: string }>;
  propsToTitle?: string;
}

const props = withDefaults(defineProps<Props>(), {
  showSearch: false,
  showCheckboxFilter: false,
  propsToTitle: "",
});

const filters = ref([]);
provide<Ref<Array<string>>>(FILTERS, filters);

const emit = defineEmits<{
  (e: "search-submit", value?: string): void;
  (e: "checks-filter", value?: string[]): void;
}>();

const searchInput = ref<string>();

const onsubmit = () => {
  emit("search-submit", searchInput.value);
};

// TODO: Reemplazar watch por una mejor forma de reactividad.
watch(searchInput, (searchInput) => {
  if (searchInput == "") emit("search-submit", searchInput);
});

watch(filters, (filters) => {
  emit("checks-filter", filters);
});
</script>

<style scoped></style>

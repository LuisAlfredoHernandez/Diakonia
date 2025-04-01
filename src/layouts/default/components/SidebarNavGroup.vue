<template>
  <li v-if="showFn(props, user)">
    <button
      type="button"
      class="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
      aria-controls="dropdown-sales"
      data-collapse-toggle="dropdown-sales"
    >
      <slot name="icon"></slot>
      <span class="flex-1 ml-3 text-left whitespace-nowrap">{{
        props.title
      }}</span>
      <svg
        aria-hidden="true"
        class="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
    <ul id="dropdown-sales" class="hidden py-2 space-y-2">
      <template v-for="(item, index) in props.items">
        <li :key="index" v-if="showChildFn(props, item, user)">
          <RouterLink
            :to="item.to"
            class="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >{{ item.title }}</RouterLink
          >
        </li>
      </template>
    </ul>
  </li>
</template>

<script setup lang="ts">
import { type GroupItemProps, showFn, showChildFn } from "./types";
import { useUserStore } from "~/store/modules/user";

const userStore = useUserStore();
const user = userStore.getUserInfo;

const props = defineProps<GroupItemProps>();
</script>

<style scoped></style>

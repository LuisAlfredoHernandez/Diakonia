<script setup lang="ts">
import { computed } from "vue";
import { type ItemProps, showFn } from "./types";
import { useUserStore } from "~/store/modules/user";

const userStore = useUserStore();
const user = userStore.getUserInfo;

const props = defineProps<ItemProps>();
const { to, title } = props;

const show = computed(() => {
  return showFn(props, user);
});
</script>

<template>
  <li v-if="show">
    <RouterLink
      :to="to"
      class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
    >
      <slot name="icon"></slot>
      <span class="flex-1 ml-3 whitespace-nowrap">{{ title }}</span>
      <slot></slot>
    </RouterLink>
  </li>
</template>

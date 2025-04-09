<template>
  <RouterLink
    v-for="index in data"
    active-class="active"
    aria-current-value="my-aria"
    exact-active-class="!text-blue-500"
    :to="{ name: index.routeName }"
    class="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group"
  >
    <div v-html="index.icon"></div>
    <span class="sr-only">{{ index.routeName }}</span>
  </RouterLink>
</template>

<script setup lang="ts">
interface ArrType {
  icon: string;
  routeName: string;
}

const { data } = defineProps<{
  data: ArrType[];
}>();
</script>

<style scoped>
a.active > svg {
  @apply text-blue-500;
}

a > svg {
  @apply text-gray-500;
}
</style>

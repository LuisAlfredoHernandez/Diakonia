<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { initFlowbite } from "flowbite";
import { ToastProvider } from "flowbite-vue";

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
});
</script>

<template>
  <ToastProvider transition="slide-left" class="min-h-screen bg-gray-100 dark:bg-gray-700">
    <RouterView />
  </ToastProvider>
</template>

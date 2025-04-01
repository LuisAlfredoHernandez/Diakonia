<script setup lang="ts">
import { ToastProvider } from "flowbite-vue";
// import Sidebar from "./Sidebar.vue";
import Navbar from "./Navbar.vue";
import { ReloadPrompt } from "~/components";
</script>

<template>
  <ToastProvider transition="slide-left">
    <Navbar />
    <!-- <Sidebar /> -->
    <div class="py-20 px-5 relative w-full h-full">
      <RouterView />
    </div>
    <RouterView name="speedDial" />
    <RouterView name="bottomNavigation" />
    <ReloadPrompt />
  </ToastProvider>
</template>

<style scoped></style>

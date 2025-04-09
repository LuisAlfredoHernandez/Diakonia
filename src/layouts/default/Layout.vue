<script setup lang="ts">
import { RouterView } from "vue-router";
import { ToastProvider } from "flowbite-vue";

import Navbar from "./Navbar.vue";
import Sidebar from "./Sidebar.vue";

import ReloadPrompt from "~/components/ReloadPrompt.vue";
import SpeedDial from "~/components/SpeedDial.vue";
</script>

<template>
  <toast-provider transition="slide-left">
    <div class="antialiased bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <Sidebar />
      <main class="md:ml-64 h-auto pt-20 p-1">
        <RouterView />
      </main>
      <SpeedDial />
    </div>
    <ReloadPrompt />
  </toast-provider>
</template>

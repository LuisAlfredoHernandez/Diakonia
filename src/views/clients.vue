<template>
  <div class="grid grid-cols-1 lg:grid-cols-1 place-items-center"></div>
</template>

<script setup lang="ts">
import { TheCard } from "flowbite-vue";
import { useEpiStore } from "../store/modules/platform";
import { useUserStore } from "../store/modules/user";

const epiStore = useEpiStore();
const userStore = useUserStore();
</script>

<template>
  <div class="grid grid-cols-2 lg:grid-cols-2 place-items-center">
    <template>
      <Input
        v-model="query"
        label="Search"
        placeholder="enter your search query"
        size="lg"
      >
        <template #prefix>
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
        </template>
        <template #suffix>
          <Button>Search</Button>
        </template>
      </Input>
    </template>
  </div>

  <div class="grid grid-cols-2 lg:grid-cols-2 place-items-center">
    <Select
      v-model="selected"
      :options="countries"
      label="Select a country"
      validation-status="success"
    >
      <template #validationMessage> Please select a country </template>
    </Select>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Button, Input, Select } from "flowbite-vue";
import { useEpiStore } from "../../../store/modules/platform";

const query = ref("");

const selected = ref("");

const countries = [
  { value: "us", name: "United States" },
  { value: "ca", name: "Canada" },
  { value: "fr", name: "France" },
];
</script>

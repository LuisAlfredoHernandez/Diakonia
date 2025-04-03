<template>
  <div class="grid grid-cols-1 lg:grid-cols-1 place-items-start legacy">
    <div class="grid grid-cols-2 lg:grid-cols-2 place-items-">
      <label class="mt-2 mr-2" for="Name">Distancia en radio km:</label>
      <Select
        class="w-20"
        v-model="selected"
        :options="distancias"
        placeholder="0"
      >
      </Select>
    </div>

    <div>
      <label class="mt-2 mr-2" for="Name">Servicios realizados: {{ SR }}</label>
      <Button>
        <template #prefix>
          <svg
            class="mt-5 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
            />
          </svg>
        </template>
        Contactar
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Button, Input, Select } from "flowbite-vue";
import { useEpiStore } from "../../../store/modules/platform";

const query = ref("");

const SR = "22";

const selected = ref("");

const distancias = [
  { value: "1", name: "1" },
  { value: "2", name: "2" },
  { value: "3", name: "3" },
  { value: "4", name: "4" },
  { value: "5", name: "5" },
  { value: "6", name: "6" },
  { value: "7", name: "7" },
  { value: "8", name: "8" },
  { value: "9", name: "9" },
  { value: "10", name: "10" },
  { value: "11", name: "11" },
  { value: "12", name: "12" },
  { value: "13", name: "13" },
  { value: "14", name: "14" },
  { value: "15", name: "15" },
];
</script>

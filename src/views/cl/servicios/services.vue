<template>
  <button @click="router.back()" class="mr-4 text-gray-600">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </button>
  <div class="mt-10 place-items-center">
    <div class="grid grid-cols-2 lg:grid-cols-2 place-items-center gap-3">
      <Select
        v-model="selectedService"
        :options="services"
        label="Busqueda por seleccion"
        placeholder="Selecciona "
        validation-status="success"
        v-on:update:modelValue="handleSelectChange"
      >
      </Select>

      <Input
        v-model="querySearch"
        label="Busqueda costumizada"
        placeholder="Buscar..."
        size="sm"
        v-on:update:modelValue="handleQueryInputChange"
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
      </Input>
    </div>

    <Button class="mt-10" @click="navigateToContactorScreen()">
      <template #prefix>
        <svg
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            fill-rule="evenodd"
          />
        </svg>
      </template>
      Realizar busqueda
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Button, Input, Select } from "flowbite-vue";
import { RouterNames } from "~/enums";

const querySearch = ref("");
const selectedService = ref("");
const router = useRouter();

const services = [
  { value: "elec", name: "Electricista" },
  { value: "alba", name: "Albañil" },
  { value: "plo", name: "Plomero" },
  { value: "carp", name: "Carpintero/Ebanista" },
  { value: "pint", name: "Pintor" },
  { value: "her", name: "Herrero" },
  { value: "techa", name: "Techador" },
  { value: "sold", name: "Soldador" },
  { value: "elec", name: "Electricista" },
  { value: "elemc", name: "Electricista mecanico automotriz" },
  { value: "meca", name: "Mecanico" },
  { value: "vidr", name: "Vidriero" },
  { value: "refr", name: "Refrigerista" },
  { value: "cerr", name: "Cerrajero" },
  { value: "yese", name: "Yesero" },
  { value: "moem", name: "Montador de estructuras metalicas" },
  { value: "isd", name: "Instalador de sistemas de seguridad" },
];

const handleSelectChange = () => (querySearch.value = "");
const handleQueryInputChange = () => (selectedService.value = "");
const navigateToContactorScreen = () =>
  router.push({ name: RouterNames.CLIENT_CONTRATISTA });
</script>

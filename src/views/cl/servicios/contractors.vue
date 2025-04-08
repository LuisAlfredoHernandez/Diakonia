<template>
  <div class="grid grid-cols-1 lg:grid-cols-1 place-items-start legacy">
    <div class="grid grid-cols-1 lg:grid-cols-1 place-items-start">
      <pre>Distancia en radio (km): {{ rangeValue }}</pre>
      <Range v-model="rangeValue" :max="'15'" :min="'0'" label="" />
    </div>

    <div class="mt-5 grid grid-cols-1 lg:grid-cols-1 place-items-start">
      <pre>Localidad distinta a la suya?</pre>
      <Select
        v-model="selectedCountryCode"
        :options="countryOptions"
        @update:modelValue="handleCountryChange"
        placeholder="Selecciona ciudad"
        class="w-full"
      />

      <!-- 2. Select Dependiente (Subcategoría) -->
      <Select
        v-model="selectedCityCode"
        :options="cityOptions"
        :disabled="!selectedCountryCode"
        placeholder="Selecciona una ciudad"
        class="w-full mb-4"
      />
    </div>

    <div class="mt-20">
      <TheCard
        img-alt="Desk"
        img-src="https://flowbite.com/docs/images/blog/image-4.jpg"
        variant="horizontal"
      >
        <div class="p-5">
          <div>
            <label class="mt-2 mr-2" for="Name">Servicios realizados: 22</label>
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
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Noteworthy technology acquisitions 2021
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
      </TheCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { Button, Input, Select, Range, TheCard } from "flowbite-vue";
import { useEpiStore } from "../../../store/modules/platform";

const rangeValue = ref("10");

interface Landmark {
  code: string;
  name: string;
}

interface Country extends Landmark {
  cities: Landmark[];
}

const countries: Country[] = [
  {
    name: "España",
    code: "ES",
    cities: [
      {
        code: "madrid",
        name: "Madrid",
      },
      {
        code: "bcn",
        name: "Barcelona",
      },
    ],
  },
  {
    code: "mx",
    name: "México",
    cities: [
      {
        code: "cdmx",
        name: "CDMX",
      },
    ],
  },
];

const selectedCountryCode = ref<string>("es"); // Código inicial
const selectedCityCode = ref<string>("madrid");

// ===== Opciones para los selects (formato {value, label}) =====
const countryOptions = computed(() =>
  countries.map((c) => ({ value: c.code, name: c.name }))
);

const cityOptions = computed(() => {
  const country = countries.find((c) => c.code === selectedCountryCode.value);
  return country?.cities.map((c) => ({ value: c.code, name: c.name })) || [];
});

// ===== Manejo de cambios =====
const handleCountryChange = () => {
  selectedCityCode.value =
    countries.find((c) => c.code === selectedCountryCode.value)?.cities[0]
      ?.code || "";
};
</script>

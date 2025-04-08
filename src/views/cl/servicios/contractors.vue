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
  <div class="mt-10 grid place-items-center">
    <div class="mt-5 grid grid-cols-1 lg:grid-cols-1 place-items-center">
      <pre>Distancia en radio (km) a tu posicion: {{ rangeValue }}</pre>
      <Range
        v-model="rangeValue"
        :max="'15'"
        :min="'0'"
        v-on:update:modelValue="handleRangeChange"
        label=""
      />
    </div>

    <div class="mt-10 grid grid-cols-1 lg:grid-cols-1 place-items-start">
      <pre class="">Localidad distinta a la suya?</pre>
      <Select
        v-model="selectedCountryCode"
        :options="countryOptions"
        @update:modelValue="handleCountryChange"
        placeholder="Selecciona ciudad"
        class="w-full mt-1"
      />

      <!-- 2. Select Dependiente (Subcategoría) -->
      <Select
        v-model="selectedCityCode"
        :options="cityOptions"
        :disabled="!selectedCountryCode"
        placeholder="Selecciona un sector"
        class="w-full mt-3"
      />
    </div>

    <div class="mt-10">
      <ProviderCard />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { Select, Range } from "flowbite-vue";
import ProviderCard from "../components/ProviderCard.vue";

const router = useRouter();
const rangeValue = ref("0");

interface Landmark {
  code: string;
  name: string;
}

interface Cities extends Landmark {
  cities: Landmark[];
}

const countries: Cities[] = [
  {
    code: "SDE",
    name: "Santo Domingo Este",
    cities: [
      {
        code: "SDEAR",
        name: "Alma Rosa",
      },
      {
        code: "SDEVF",
        name: "Villa Faro",
      },
      {
        code: "SDELI",
        name: "La Isabelita",
      },
      {
        code: "SDESI",
        name: "San Isidro",
      },
    ],
  },
  {
    code: "DN",
    name: "Distrito Nacional",
    cities: [
      {
        code: "DNDBC",
        name: "Don Bosco",
      },
      {
        code: "DNCH",
        name: "Cuesta Hermosa",
      },
      {
        code: "DNYC",
        name: "La Yuca",
      },
      {
        code: "DNQ",
        name: "Quisqueya",
      },
    ],
  },
];

const selectedCountryCode = ref<string>(""); // Código inicial
const selectedCityCode = ref<string>("");

// ===== Opciones para los selects (formato {value, label}) =====
const countryOptions = computed(() =>
  countries.map((c) => ({ value: c.code, name: c.name }))
);

const cityOptions = computed(() => {
  const country = countries.find((c) => c.code === selectedCountryCode.value);
  return country?.cities.map((c) => ({ value: c.code, name: c.name })) || [];
});

const handleCountryChange = () => {
  rangeValue.value = "0";
  selectedCityCode.value =
    countries.find((c) => c.code === selectedCountryCode.value)?.cities[0]
      ?.code || "";
};

const handleRangeChange = () => {
  selectedCountryCode.value = "";
  selectedCityCode.value = "";
};
</script>

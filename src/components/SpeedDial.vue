<template>
  <div id="dialParent" class="fixed right-6 bottom-24 group">
    <div
      id="dialContent"
      class="flex flex-col items-center hidden mb-4 space-y-2"
    >
      <button
        type="button"
        data-tooltip-target="tooltip-new-sale-order"
        data-tooltip-placement="left"
        class="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
      >
        <PlusCircleIcon class="w-6 h-6" />
        <span class="sr-only">Crear Orden de Venta</span>
      </button>
      <div
        id="tooltip-new-sale-order"
        role="tooltip"
        class="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
      >
        Crear Orden de Venta
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
    </div>

    <button
      type="button"
      id="dialButton"
      aria-controls="speed-dial-menu-default"
      aria-expanded="false"
      class="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
    >
      <PlusIcon class="w-8 h-8 transition-transform group-hover:rotate-45" />
      <span class="sr-only">Open actions menu</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { PlusCircleIcon, PlusIcon } from "@heroicons/vue/24/solid";
import { Dial } from "flowbite";
import type { DialOptions, DialInterface } from "flowbite";

onMounted(() => {
  // parent element wrapping the speed dial
  const $parentEl = document.getElementById("dialParent");

  // the trigger element that can be clicked or hovered
  const $triggerEl = document.getElementById("dialButton");

  // the content wrapping element of menu items or buttons
  const $targetEl = document.getElementById("dialContent");

  // options with default values
  const options: DialOptions = { triggerType: "click" };

  /*
   * $parentEl: required
   * $targetEl: required
   * $triggerEl: required
   * options: optional
   */
  const dial: DialInterface = new Dial(
    $parentEl,
    $triggerEl,
    $targetEl,
    options
  );
  // dial.show();
  dial.hide();
  // dial.toggle();
});
</script>

<style scoped></style>

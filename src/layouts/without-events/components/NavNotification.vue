<template>
  <button
    type="button"
    ref="dropdownBtn"
    data-dropdown-toggle="notification-dropdown"
    class="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
  >
    <span class="sr-only">View notifications</span>
    <!-- Bell icon -->
    <svg
      class="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
      ></path>
    </svg>
  </button>
  <!-- Dropdown menu -->
  <div
    class="z-50 hidden max-w-sm my-4 overflow-hidden text-base list-none bg-white divide-y divide-gray-100 rounded shadow-lg dark:divide-gray-600 dark:bg-gray-700"
    id="notification-dropdown"
    ref="dropdownMenu"
  >
    <div
      class="block px-4 py-2 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
    >
      Notificaciones
    </div>
    <div>
      <a
        v-for="(notify, index) in notifications"
        :key="index"
        href="#"
        class="flex px-4 py-3 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
      >
        <div class="flex-shrink-0">
          <img
            class="rounded-full w-11 h-11"
            :src="notify.from_avatar_url"
            :alt="notify.from"
          />
        </div>
        <div class="w-full pl-3">
          <div
            class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"
          >
            <span class="font-semibold text-gray-900 dark:text-white">{{
              notify.from
            }}</span
            >: "{{ notify.msg }}"
          </div>
          <div
            class="text-xs font-medium text-primary-700 dark:text-primary-400"
          >
            {{ notify.timing }}
          </div>
        </div>
      </a>
    </div>
    <a
      href="#"
      class="block py-2 text-base font-normal text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:underline"
    >
      <div class="inline-flex items-center">
        <svg
          class="w-5 h-5 mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
          <path
            fill-rule="evenodd"
            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
        Ver todas
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
import type { DropdownInterface } from "flowbite";
import { Dropdown } from "flowbite";
import { ref, onMounted } from "vue";

const notifications = ref([
  {
    from_avatar_url:
      "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
    from: "Juan Ramirez",
    msg: "Exactamente, en que calle estas?",
    timing: "a few moments ago",
  },
]);

const dropdownBtn = ref<HTMLElement>();
const dropdownMenu = ref<HTMLElement>();
const dropdown = ref<DropdownInterface | null>(null);

onMounted(() => {
  dropdown.value = new Dropdown(dropdownMenu.value, dropdownBtn.value);
});
</script>

<style scoped></style>

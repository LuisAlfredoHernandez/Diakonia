<template>
  <div class="flex items-center ml-3">
    <div>
      <button
        ref="dropdownBtn"
        aria-expanded="false"
        type="button"
        class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
      >
        <span class="sr-only">Open user menu</span>
        <img
          class="w-8 h-8 rounded-full"
          :src="user.avatar_url"
          alt="user photo"
        />
      </button>
    </div>
    <!-- Dropdown menu -->
    <div
      class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
      aria-expanded="false"
      ref="dropdownMenu"
    >
      <div class="px-4 py-3" role="none">
        <p class="text-sm text-gray-900 dark:text-white" role="none">
          {{ user.full_name }}
        </p>
        <p
          class="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
          role="none"
        >
          {{ user.email }}
        </p>
      </div>
      <ul class="py-1" role="none">
        <li>
          <a
            href="#"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
            role="menuitem"
            >Ajustes</a
          >
        </li>
        <li>
          <a
            href="#"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
            role="menuitem"
            @click.prevent="logout"
            >Cerrar sesión</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Dropdown } from "flowbite";
import type { DropdownOptions, DropdownInterface } from "flowbite";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "~/store/modules/user";

// const user = ref({
//   full_name: "Example Name",
//   email: "example@email.com",
//   avatar_url: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
// });

const userStore = useUserStore();
const user = computed(() => {
  if (!userStore.getUserInfo) {
    return {
      full_name: "Example Name",
      email: "example@email.com",
      avatar_url: "https://freesvg.org/img/abstract-user-flat-4.png",
    };
  }
  return userStore.getUserInfo;
});
const router = useRouter();

function logout() {
  userStore.logout();
  router.push("/login");
  // window.location.reload();
}

const dropdownMenu = ref<HTMLElement | null>(null);
const dropdownBtn = ref<HTMLElement>();
const dropdown = ref<DropdownInterface | null>(null);
const options: DropdownOptions = {
  placement: "bottom",
  triggerType: "click",
  offsetSkidding: 0,
  offsetDistance: 10,
  delay: 300,
  onHide: () => {},
  onShow: () => {},
  onToggle: () => {},
};

onMounted(() => {
  dropdown.value = new Dropdown(dropdownMenu.value, dropdownBtn.value, options);
});
</script>

<style scoped></style>

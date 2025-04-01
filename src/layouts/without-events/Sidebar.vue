<template>
  <aside
    ref="sidebar"
    id="sidebar"
    class="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 w-64 h-full pt-16 pb-16 font-normal duration-75 lg:flex transition-width"
    aria-label="Sidebar"
  >
    <div
      class="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
        <div
          class="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700"
        >
          <ul class="pb-2 space-y-2">
            <li>
              <form action="#" method="GET" class="lg:hidden">
                <label for="mobile-search" class="sr-only">Search</label>
                <div class="relative">
                  <div
                    class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                  >
                    <svg
                      class="w-5 h-5 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="email"
                    id="mobile-search"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search"
                  />
                </div>
              </form>
            </li>

            <SidebarNavItem to="/" title="Tablero" allowed="*">
              <template v-slot:icon>
                <svg
                  aria-hidden="true"
                  class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
              </template>
            </SidebarNavItem>

            <SidebarNavGroup
              title="Ventas"
              :items="[
                { to: '/so/products', title: 'Productos' },
                { to: '/so/invoices', title: 'Facturas' },
                { to: '/so/customers', title: 'Clientes' },
              ]"
              :allowed-list="[UserTypeEnum.SELLER, UserTypeEnum.ADMIN_SELLER]"
            >
              <template v-slot:icon>
                <svg
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </template>
            </SidebarNavGroup>

            <SidebarNavItem
              to="/lmi"
              title="Ultima Milla"
              :allowed-list="[
                UserTypeEnum.LAST_MILE_INSTALLER,
                UserTypeEnum.ADMIN_LAST_MILE_INSTALLER,
              ]"
            >
              <template v-slot:icon>
                <svg
                  aria-hidden="true"
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"
                  ></path>
                </svg>
              </template>
            </SidebarNavItem>

            <SidebarNavItem
              to="/epi"
              title="Planta Externa"
              :allowed-list="[
                UserTypeEnum.EXTERNAL_INSTALLER,
                UserTypeEnum.ADMIN_EXTERNAL_INSTALLER,
              ]"
            >
              <template v-slot:icon>
                <svg
                  aria-hidden="true"
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"
                  ></path>
                </svg>
              </template>
            </SidebarNavItem>

            <SidebarNavItem to="#" title="Mensajes" allowed="*">
              <template v-slot:icon>
                <svg
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"
                  ></path>
                  <path
                    d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                  ></path>
                </svg>
              </template>
            </SidebarNavItem>
          </ul>
        </div>
      </div>
    </div>
  </aside>
  <div
    class="fixed inset-0 z-10 hidden bg-gray-900/50 dark:bg-gray-900/90"
    id="sidebarBackdrop"
  ></div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { onMounted, ref } from "vue";
import SidebarNavGroup from "../default/components/SidebarNavGroup.vue";
import SidebarNavItem from "../default/components/SidebarNavItem.vue";
import { UserTypeEnum } from "~/enums/userTypeEnum";

const sidebar = ref<HTMLElement | null>(null);

onMounted(() => {
  if (sidebar.value) {
    const toggleSidebarMobileEl = document.getElementById(
      "toggleSidebarMobile"
    );
    const sidebarBackdrop = document.getElementById("sidebarBackdrop");
    const toggleSidebarMobileHamburger = document.getElementById(
      "toggleSidebarMobileHamburger"
    );
    const toggleSidebarMobileClose = document.getElementById(
      "toggleSidebarMobileClose"
    );

    const toggleSidebarMobile = (
      sidebar: Ref<HTMLElement | null>,
      sidebarBackdrop: HTMLElement | null,
      toggleSidebarMobileHamburger: HTMLElement | null,
      toggleSidebarMobileClose: HTMLElement | null
    ) => {
      sidebar.value?.classList.toggle("hidden");
      sidebarBackdrop?.classList.toggle("hidden");
      toggleSidebarMobileHamburger?.classList.toggle("hidden");
      toggleSidebarMobileClose?.classList.toggle("hidden");
    };

    toggleSidebarMobileEl?.addEventListener("click", () => {
      toggleSidebarMobile(
        sidebar,
        sidebarBackdrop,
        toggleSidebarMobileHamburger,
        toggleSidebarMobileClose
      );
    });

    sidebarBackdrop?.addEventListener("click", () => {
      toggleSidebarMobile(
        sidebar,
        sidebarBackdrop,
        toggleSidebarMobileHamburger,
        toggleSidebarMobileClose
      );
    });
  }
});
</script>

<style scoped></style>

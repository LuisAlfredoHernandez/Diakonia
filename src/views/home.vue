<template>
  <div class="grid grid-cols-1 lg:grid-cols-1 place-items-center">
    <button class="p-2" @click="platformCaller('Client')">
      <TheCard href="#">
        <img
          src="https://plus.unsplash.com/premium_photo-1701108265432-7ecea8450a5a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </TheCard>
      Cliente
    </button>

    <button class="p-2" @click="platformCaller('Provider')">
      <TheCard href="#">
        <img
          src="https://plus.unsplash.com/premium_photo-1661277879262-5a374156cd70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </TheCard>
      Proveedor
    </button>
  </div>
</template>

<script setup lang="ts">
import { TheCard } from "flowbite-vue";
import { useEpiStore } from "../store/modules/platform";
import { useUserStore } from "../store/modules/user";

const epiStore = useEpiStore();
const userStore = useUserStore();

const platformCaller = (command: string) => {
  const email = userStore.getUserInfo?.email;
  if (email) {
    switch (command) {
      case "Client":
        epiStore.gwnServiceCall(email);
        break;
      case "Provider":
        epiStore.mikroticServiceCall(email);
        break;
    }
  }
};
</script>

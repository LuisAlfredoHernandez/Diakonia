<template>
  <div class="grid grid-cols-3 lg:grid-cols-3 gap-2 place-items-center">
    <button class="p-5" @click="platformCaller('GWN')">
      <TheCard href="#">
        <img src="" alt="" />
        <img
          src="https://www.inttelec.com/web/image/product.template/27228/image_1024?unique=60bfdcd"
          alt=""
        />
      </TheCard>
    </button>
    <button class="p-5" @click="platformCaller('MK')">
      <TheCard href="#">
        <img
          src="data:image/png;base64,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"
          alt=""
        />
        <img
          src="https://nasstore.eu/wp-content/uploads/2022/04/CCR2216-1G-12XS-2XQ-1.png"
          alt=""
        />
      </TheCard>
    </button>
    <button class="p-5" @click="platformCaller('FG')">
      <TheCard href="#">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6fT2IAeXtN45TyBivkylvxd4LHonioSHrfWfUFDwDxKFP-gb6uiMH1KaUu0D9TcLArQ&usqp=CAU"
          alt=""
        />
        <img src="https://m.media-amazon.com/images/I/61djoMSgPmL.jpg" alt="" />
      </TheCard>
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
      case "GWN":
        epiStore.gwnServiceCall(email);
        break;
      case "MK":
        epiStore.mikroticServiceCall(email);
        break;
      case "FG":
        epiStore.fortigateServiceCall(email);
        break;
    }
  }
};
</script>

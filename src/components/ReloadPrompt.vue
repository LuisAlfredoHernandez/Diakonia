<script setup lang="ts">
// import type { ToastType } from "flowbite-vue/dist_types/components/Toast/types";
// import type { ToastItem } from "flowbite-vue/dist_types/components/Toast/components/ToastProvider/types";
// import { ref, shallowRef, watchEffect } from "vue";
import { useRegisterSW } from "virtual:pwa-register/vue";
// import { pwaInfo } from "virtual:pwa-info";

// import { Button, useToast } from "flowbite-vue";
// import UpdateToast from "./UpdateToast.vue";

// const ms = ref(5000);
// const toast = useToast();

// replaced dynamically
// const reloadSW: any = "__RELOAD_SW__";

// const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
//   immediate: true,
//   onRegisteredSW(swScriptUrl: string, registration: ServiceWorkerRegistration): void {
//     // eslint-disable-next-line no-console
//     console.log(`Service Worker at: ${swScriptUrl}`);
//     if (reloadSW === "true") {
//       registration &&
//         setInterval(async () => {
//           // eslint-disable-next-line no-console
//           console.log("Checking for sw update");
//           await registration.update();
//         }, 20000 /* 20s for testing purposes */);
//     } else {
//       // eslint-disable-next-line no-console
//       console.log(`SW Registered: ${registration}`);
//     }
//   },
// });

const intervalMS = 60 * 60 * 1000;
const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
  onRegistered(r) {
    r &&
      setInterval(() => {
        r.update();
      }, intervalMS);
  },
});

const close = async () => {
  offlineReady.value = false;
  needRefresh.value = false;
};

// const addUpdate = () => {
//   const id = toast.add({
//     time: 0,
//     text: "A new software version is available for download.",
//     component: shallowRef(UpdateToast),
//     componentProps: {
//       alignment: "start",
//       closable: true,
//     },
//   });
//   console.log(id);
// };

// const add = (type: ToastType) => {
//   if (type === ("update" as ToastType)) return addUpdate();
//   toast.add({
//     type,
//     time: ms.value || 0,
//     text: `${type} alert! Hello world!`,
//   });
// };

// const remove = () => {
//   toast.pop();
// };

// watchEffect(() => {
//   if (offlineReady.value || needRefresh.value) {
//     addUpdate();
//   } else {
//     remove();
//   }
// });
</script>

<template>
  <div v-if="offlineReady || needRefresh" class="pwa-toast" role="alert">
    <div class="message">
      <span v-if="offlineReady"> App ready to work offline </span>
      <span v-else>
        New content available, click on reload button to update.
      </span>
    </div>
    <button v-if="needRefresh" @click="updateServiceWorker()">Reload</button>
    <button @click="close">Close</button>
  </div>
</template>

<style>
.pwa-toast {
  position: fixed;
  right: 0;
  bottom: 50px;
  margin: 16px;
  padding: 12px;
  border: 1px solid #8885;
  border-radius: 4px;
  z-index: 1;
  text-align: left;
  box-shadow: 3px 4px 5px 0px #8885;
}
.pwa-toast .message {
  margin-bottom: 8px;
}
.pwa-toast button {
  border: 1px solid #8885;
  outline: none;
  margin-right: 5px;
  border-radius: 2px;
  padding: 3px 10px;
}
</style>

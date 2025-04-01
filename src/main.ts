import { createApp } from "vue";

import "flowbite";

import { router, setupRouter } from "./router";
import { setupStore } from "./store";
import App from "./App.vue";

import "./index.css";

import FwaInput from "~/components/FwaInput";

async function bootstrap() {
  const app = createApp(App);

  app.component("FwaInput", FwaInput);

  // Configurar la tienda
  setupStore(app);

  // Configurar las rutas
  setupRouter(app);

  try {
    await router.isReady();

    app.mount("#app");
  } catch (err) {
    console.error(err);
  }
}

bootstrap();

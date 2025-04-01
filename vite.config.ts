import { resolve } from "node:path";
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import type { ManifestOptions, VitePWAOptions } from "vite-plugin-pwa";
import { VitePWA } from "vite-plugin-pwa";
import replace from "@rollup/plugin-replace";

const pwaOptions: Partial<VitePWAOptions> = {
  // mode: process.env.NODE_ENV ? process.env.NODE_ENV : "development",
  base: "/",
  includeAssets: ["favicon.ico"],
  manifest: {
    name: "Flexus",
    short_name: "Flexus",
    theme_color: "#ffffff",
    icons: [
      {
        src: "android-chrome-192x192.png", // <== don't add slash, for testing
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png", // <== don't remove slash, for testing
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "android-chrome-512x512.png", // <== don't add slash, for testing
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  },
  devOptions: {
    enabled: process.env.SW_DEV === "true",
    /* when using generateSW the PWA plugin will switch to classic */
    type: "module",
    navigateFallback: "index.html",
    suppressWarnings: true,
  },
};

const replaceOptions = {
  __DATE__: new Date().toISOString(),
  preventAssignment: true,
};
const claims = process.env.CLAIMS === "true";
const reload = process.env.RELOAD_SW === "true";
const selfDestroying = process.env.SW_DESTROY === "true";

if (process.env.SW === "true") {
  pwaOptions.srcDir = "src";
  pwaOptions.filename = claims ? "claims-sw.ts" : "prompt-sw.ts";
  pwaOptions.strategies = "injectManifest";
  (pwaOptions.manifest as Partial<ManifestOptions>).name =
    "PWA Inject Manifest";
  (pwaOptions.manifest as Partial<ManifestOptions>).short_name = "PWA Inject";
}

if (claims) pwaOptions.registerType = "autoUpdate";

if (reload) {
  // @ts-expect-error overrides
  replaceOptions.__RELOAD_SW__ = "true";
}

if (selfDestroying) pwaOptions.selfDestroying = selfDestroying;

export default defineConfig({
  // base: process.env.BASE_URL || 'https://github.com/',
  build: {
    sourcemap: process.env.SOURCE_MAP === "true",
  },
  plugins: [Vue(), VitePWA(pwaOptions), replace(replaceOptions)],
  optimizeDeps: {
    include: ["wnumb"],
  },
  resolve: {
    // alias: {
    //   "~/": `${resolve(__dirname, "src")}/`,
    //   "#/": `${resolve(__dirname, "types")}/`,
    // },
    alias: [
      { find: "~/", replacement: `${resolve(__dirname, "src")}/` },
      { find: "#/", replacement: `${resolve(__dirname, "types")}/` },
      { find: "/#/", replacement: `${resolve(__dirname, "types")}/` },
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
  },
  server: {
    proxy: {
      "/api/v1": "http://127.0.0.1:8000",
    },
  },
});

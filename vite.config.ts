import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json" assert { type: "json" };

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), crx({ manifest })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "popup.html"),
        options: resolve(__dirname, "options.html"),
        applet: resolve(__dirname, "applet.html"),
      },
    },
  },
});

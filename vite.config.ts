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
});
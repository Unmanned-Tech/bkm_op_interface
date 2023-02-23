import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require('path')

// https://vitejs.dev/config/


export default defineConfig({
  build: {
    target: 'es2020'
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020"
    }
  },
  server:{
    host: "0.0.0.0"
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    },
  },
});

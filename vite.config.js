import { fileURLToPath, URL } from "node:url";
import svgLoader from "vite-svg-loader";
import { defineConfig } from "vite";
import mkcert from 'vite-plugin-mkcert';
import vue from "@vitejs/plugin-vue";
const path = require('path');
import fs from 'fs';

// https://vitejs.dev/config/
var plugins = [vue(), svgLoader(), mkcert({
      hosts: ['192.168.2.111', 'localhost', '127.0.0.1'] // Явно указать хосты
    })];
export default defineConfig({
  build: {
    target: "es2020",
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020",
    },
  },
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
  },
  server: {
    https: true,
    host: "0.0.0.0",
    proxy: {
      // Проксируем WebSocket соединения к ROSBridge
      '/rosbridge': {
        target: 'ws://192.168.2.111:9090',
        changeOrigin: true,
        ws: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/rosbridge/, '')
      }
    }
  },
  plugins: plugins,
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "~bootstrap": path.resolve(__dirname, 'node_modules/bootstrap'),
      "~leafletdraw": path.resolve(__dirname, 'node_modules/leaflet-draw/dist'),
      "~leaflet": path.resolve(__dirname, 'node_modules/leaflet/dist')
    }
  }
});
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      "/houses": {
        target: "http://localhost:8080",
        changeOrigin: true, // 출처 헤더 변경
        rewrite: (path) => path.replace(/^\/houses/, "/houses"),
      },
    },
  },
})

import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Pages from "vite-plugin-pages";
import Layouts from 'vite-plugin-vue-layouts'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      dts: true,
      eslintrc: {
        enabled: true,
        filepath: "./.eslintrc-auto-import.json",
      },
      imports: ["vue", "vue-router"],
      dirs: [],
      vueTemplate: true,
    }),
    Components({
      dirs: ["./src/components/"],
      dts: true,
    }),
    Pages({
      dirs: ["./src/pages"],
    }),
    Layouts({
      layoutsDirs: './src/layouts',
      pagesDirs: null
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  }
});
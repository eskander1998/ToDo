import { defineConfig } from 'vite'
import vue from "@vitejs/plugin-vue2";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/',
  // build: {
  //   lib: {
  //     entry: resolve(__dirname, "src/index.js"),
  //     name: "todo",
  //   },
  //   rollupOptions: {
  //     external: ["vue"],
  //     output: {
  //       globals: {
  //         vue: "Vue",
  //       },
  //     },
  //   },
  // },
})
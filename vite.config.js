import { defineConfig } from 'vite'
import vue from "@vitejs/plugin-vue2";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/ToDo/',
  plugins: [vue()],
  // build: {
  //   lib: {
  //     entry: resolve(__dirname, "src/index.js"),
  //     name: "ToDo",
  //     fileName: (format) => `todo.${format}.js`,
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
 
});

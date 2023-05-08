<template>
  <router-view />
</template>

<script>
import TodoList from "./components/TodoList.vue";

export default {
  name: "App",
  components: {
    TodoList,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap");
</style>

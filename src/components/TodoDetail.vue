<template>
  <div class="todo-detail">
    <div class="image-container">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Sogeti-logo-2018.svg/1200px-Sogeti-logo-2018.svg.png"
        alt="Capgemini Image"
      />
    </div>
    <button @click="goToMenu" class="back-btn">Back</button>
    <div class="todo-info">
      <h2>{{ todo.title }}</h2>
      <p>{{ todo.description }}</p>
      <div
        class="todo-status"
        :class="{ completed: todo.completed, notCompleted: !todo.completed }"
      >
        {{ todo.completed ? "completed" : "not completed" }}
      </div>
    </div>
  </div>
</template>

<script>
import { todos } from "../../data/mockedData";

export default {
  name: "TodoDetail",
  data() {
    return {
      todo: {},
    };
  },
  mounted() {
    const todoId = this.$route.params.id;
    const todo = todos.find((c) => c.id === todoId);
    if (todo) this.todo = todo;
  },
  methods: {
    goToMenu() {
      this.$router.push({ name: "TodoList" });
    },
  },
};
</script>

<style scoped>
.todo-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

img {
  max-width: 200px;
  height: auto;
}

.back-btn {
  margin-bottom: 20px;
}

.todo-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.todo-status {
  align-self: flex-end;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
}

.completed {
  color: #4caf50;
  background-color: #e8f5e9;
}

.notCompleted {
  color: #f44336;
  background-color: #ffebee;
}
</style>

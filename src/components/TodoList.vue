<template>
  <div class="container">
    <div class="header">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Sogeti-logo-2018.svg/1200px-Sogeti-logo-2018.svg.png"
        alt="Logo"
      />
    </div>
    <div class="todo-list">
      <ul>
        <li v-for="task in todos" :key="task.id">
          <a>{{ task.title }}</a>
          <span
            class="task-status"
            :class="{
              completed: task.completed,
              'not-completed': !task.completed,
            }"
          >
            {{ task.completed ? "completed" : "not completed" }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { todos } from "../../data/mockedData";

//creates an instance of Axios to make HTTP requests
const axiosInstance = axios.create();
//create an instance of axios-mock-adapter using the previously created Axios instance in order to simulate responses to HTTP calls.
const mock = new MockAdapter(axiosInstance);
//simulate an http get request that responds with an HTTP 200 code and simulated data stored in the "todos" variable
mock.onGet("/todos").reply(200, todos);

export default {
  name: "TodoList",
  components: {},
  data() {
    return {
      todos: [],
    };
  },
  mounted() {
    //We use axiosInstance to send an HTTP GET request to the URL "/todos". then we store the returned data in the variable todos
    axiosInstance.get("/todos").then((response) => {
      this.todos = response.data;
    });
  },
  methods: {},
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

.header {
  margin-bottom: 20px;
}

.header img {
  max-width: 200px;
  height: auto;
}

.todo-list {
  margin-top: 10px;
  min-width: 60%;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  border-bottom: 1px solid #ddd;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
li .task-status {
  font-size: 14px;
  font-weight: bold;
}

li .task-status.completed {
  color: green;
}

li .task-status.not-completed {
  color: red;
}
li:last-child {
  border-bottom: none;
}

a {
  color: #333;
  text-decoration: none;
  font-size: 16px;
}

a:hover {
  color: #555;
}
</style>

<template>
  <div class="container">
    <div class="header">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Sogeti-logo-2018.svg/1200px-Sogeti-logo-2018.svg.png"
        alt="Capgemini image"
      />
    </div>

    <form @submit.prevent="addTask">
      <input
        type="text"
        v-model="taskTitle"
        placeholder="Task title"
        required
      />
      <textarea
        type="text"
        v-model="taskDescription"
        placeholder="Task Description"
      />
      <button type="submit">Add task</button>
    </form>
    <div class="todo-list">
      <ul>
        <li v-for="task in todos" :key="task.id">
          <div>
            <input
              type="checkbox"
              v-model="task.completed"
              @change="updateTaskOrder(task)"
            />
            <a
              :class="{ completed: task.completed }"
              @click="viewTodoDetails(task.id)"
              >{{ task.title }}</a
            >
          </div>
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
//PATCH request to an endpoint containing a task ID in the URL, which updates the corresponding task. it returns an HTTP 200 response if the task is found, otherwise an HTTP 404 response.
// regex /\/todos\/\d+/ matches any string that contains "todos" followed by one or more digits, separated by slashes.
mock.onPatch(/\/todos\/\d+/).reply((config) => {
  const id = parseInt(config.url.split("/").pop());
  const updatedTask = JSON.parse(config.data);
  const index = todos.findIndex((task) => task.id === id);
  if (index !== -1) {
    todos[index] = updatedTask;
    if (updatedTask.completed) {
      todos.push(todos.splice(index, 1)[0]);
    }
    return [200, updatedTask];
  } else {
    return [404, {}];
  }
});
// simulates an http post request for a new task to the todos list and returning a 201 response code with the new task added.
mock.onPost("/todos").reply((config) => {
  const newTask = JSON.parse(config.data);
  newTask.id = todos.length + 1;
  newTask.completed = false;
  todos.push(newTask);
  return [201, newTask];
});

export default {
  name: "TodoList",
  components: {},
  data() {
    return {
      todos: [],
      taskTitle: "",
      taskDescription: "",
    };
  },
  mounted() {
    //We use axiosInstance to send an HTTP GET request to the URL "/todos". then we store the returned data in the variable todos
    axiosInstance.get("/todos").then((response) => {
      this.todos = response.data;
      this.todos
        .sort((a, b) => {
          b.id - a.id;
        })
        .sort((a, b) => {
          // When there are two tasks whose completed status is equal, they should not be sorted between them because their order does not matter. So we return 0 to indicate that they should not be sorted.
          if (a.completed === b.completed) return 0; // Completed status is equal, no sorting needed
          // When one task is completed and the other is not, we want the completed task to be at the bottom of the list, so we return 1.
          if (a.completed && !b.completed) return 1; // Sort completed tasks to the bottom
          // When one task is not completed and the other is, we want the uncompleted task to be at the top of the list, so we return -1.
          if (!a.completed && b.completed) return -1;
        });
    });
  },
  methods: {
    //method to add a new task 
    addTask() {
      const newTask = {
        title: this.taskTitle,
        completed: false,
        description: this.taskDescription,
      };
      // we send an HTTP POST request to the "/todos" API with the new task data . Then we add the new task on the top of the list 
      axiosInstance.post("/todos", newTask).then((response) => {
        var taskToAdd = JSON.parse(JSON.stringify(response.data));
        this.todos.unshift(taskToAdd);
        this.taskTitle = "";
        this.taskDescription = "";
      });
    },
    updateTaskOrder(task) {
      axiosInstance
        .patch(`/todos/${task.id}`, task)
        .then(() => {
          const index = this.todos.findIndex((t) => t.id === task.id);
          if (index !== -1) {
            this.todos.splice(index, 1);
            if (task.completed) {
              // If it is a completed task, we put it at the bottom
              this.todos.push(task);
            } else {
              // If it is an uncompleted task, we put it back to its initial position
              let i = this.todos.findIndex((t) => t.id > task.id);
              if (i === -1) i = this.todos.length;
              this.todos.splice(i, 0, task);
            }
          }
        })

        .catch((error) => {});
    },
    viewTodoDetails(todoId) {
      this.$router.push({ name: "TodoDetail", params: { id: todoId } });
    },
  },
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

.completed {
  text-decoration: line-through;
  color: #bbb;
}
form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
}

input[type="text"],
textarea {
  margin: 10px 0;
  padding: 10px;
  font-size: 1rem;
  border: none;
  background-color: #f2f2f2;
  border-radius: 5px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
}

input[type="text"]:focus,
textarea:focus {
  outline: none;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
}

button[type="submit"] {
  margin-top: 20px;
  padding: 10px;
  font-size: 1rem;
  color: #fff;
  background-color: #0071af;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #bbb;
}
</style>

import Vue from 'vue'
import VueRouter from 'vue-router';
import TodoList from '../components/TodoList.vue'
import TodoDetail from '../components/TodoDetail.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "TodoList",
    component: TodoList
  },
  {
    path: '/detail/:id',
    name: 'TodoDetail',
    component: TodoDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
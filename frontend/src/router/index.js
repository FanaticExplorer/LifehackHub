import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoryView from '../views/CategoryView.vue'
import LifehackView from '../views/LifehackView.vue'
import RandomView from '../views/RandomView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/category/:cat',
    name: 'Category',
    component: CategoryView
  },
  {
    path: '/lifehack/:id',
    name: 'Lifehack',
    component: LifehackView
  },
  {
    path: '/random',
    name: 'Random',
    component: RandomView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

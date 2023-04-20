import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/fridge',
      name: 'fridge',
      component: () => import('../views/FridgeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/household',
      name: 'household',
      props: route => ({ id: parseInt(route.query.id) }),
      component: () =>
          import("../views/HouseholdView.vue"),
    }
  ]
})

export default router

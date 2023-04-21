import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import FridgeView from "@/views/FridgeView.vue";
import AboutView from "@/views/AboutView.vue";
import HouseholdView from "@/views/HouseholdView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/login',
      name: 'login',
      component: LoginView
    },

    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },


    {
      path: '/fridge',
      name: 'fridge',
      props: route => ({ id: parseInt(route.query.id), category: parseInt(route.query.category) }),
      component: FridgeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/household',
      name: 'household',
      props: route => ({ id: parseInt(route.query.id) }),
      component: HouseholdView,
    }
  ]
})

export default router

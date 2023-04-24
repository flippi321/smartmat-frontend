import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import FridgeView from "@/views/FridgeView.vue";
import AboutView from "@/views/AboutView.vue";
import HouseholdView from "@/views/HouseholdView.vue";
import ShoppigListView from "@/views/shoppigListView.vue";
import RecipeIdeasView from "@/views/RecipeIdeasView.vue";

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
      path: '/shoppingList',
      name: 'shoppingList',
      props: route => ({ id: parseInt(route.query.id), sortBy: parseInt(route.query.sortBy) }),
      component: ShoppigListView
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
      component: HouseholdView
    },
    {
      path: '/dinnerIdeas',
      name: 'dinnerIdeas',
      props: route => ({ id: parseInt(route.query.id) }),
      component: RecipeIdeasView
    }
  ]
})

export default router

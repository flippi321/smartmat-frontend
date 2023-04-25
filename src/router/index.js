import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import FridgeView from "@/views/FridgeView.vue";
import AboutView from "@/views/AboutView.vue";
import HouseholdView from "@/views/HouseholdView.vue";
import ShoppingListView from "@/views/shoppingListView.vue";
import RecipeIdeasView from "@/views/RecipeIdeasView.vue";
import WeekPlannerView from "@/views/WeekPlannerView.vue";
import { getAuthStore } from '@/stores';
import RecipeView from "@/views/RecipeView.vue"
import UserView from "@/views/UserView.vue";

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
      path: '/user',
      name: 'user',
      props: route => ({ id: parseInt(route.query.id) }),
      component: UserView
    },
    {
      path: '/fridge',
      name: 'fridge',
      props: route => ({ id: parseInt(route.query.id), category: parseInt(route.query.category) }),
      component: FridgeView,
      meta: {
        requiresAuth: true
      }

    },
    {
      path: '/shoppingList',
      name: 'shoppingList',
      props: route => ({ id: parseInt(route.query.id), sortBy: parseInt(route.query.sortBy) }),
      component: ShoppingListView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/household',
      name: 'household',
      props: route => ({ id: parseInt(route.query.id) }),
      component: HouseholdView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dinnerIdeas',
      name: 'dinnerIdeas',
      props: route => ({ id: parseInt(route.query.id) }),
      component: RecipeIdeasView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/weekPlanner',
      name: 'weekPlanner',
      props: route => ({ id: parseInt(route.query.id) }),
      component: WeekPlannerView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/recipe',
      name: 'recipe',
      props: route => ({ id: parseInt(route.query.id) }),
      component: RecipeView
    }
  ]
})


router.beforeEach((to, from, next) => {
  const store = getAuthStore();

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.isLoggedIn) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router

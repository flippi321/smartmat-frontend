import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from "axios";
import { useAuthStore } from "@/stores";

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')


axios.interceptors.response.use(
    async (response) => {
        return response;
    },
    async (error) => {
        console.log("Interceptor error handler called");
        const originalRequest = error.config;
        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            console.log("Access token expired, refreshing...");

            const authStore = useAuthStore();
            await authStore.refreshToken();

            const token = sessionStorage.getItem("token");
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return axios(originalRequest);
        }
        return Promise.reject(error);
    }
);


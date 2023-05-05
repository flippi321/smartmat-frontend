import axios from "axios";
import { useAuthStore } from "@/stores";

let isRefreshing = false;
let refreshSubscribers = [];

// Helper function to queue requests waiting for token refresh
function subscribeTokenRefresh(cb) {
    refreshSubscribers.push(cb);
}

// Helper function to process the queued requests after token refresh
function onRefreshed(token) {
    refreshSubscribers.map(cb => cb(token));
    refreshSubscribers = [];
}

axios.interceptors.response.use(
    async (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            if (!isRefreshing) {
                isRefreshing = true;
                const authStore = useAuthStore();
                try {
                    await authStore.refreshToken();
                    const token = sessionStorage.getItem("token");
                    onRefreshed(token);

                    originalRequest.headers["Authorization"] = `Bearer ${token}`;
                    return axios(originalRequest);
                } catch (err) {
                    console.log("Error refreshing token:", err);
                } finally {
                    isRefreshing = false;
                }
            } else {
                return new Promise((resolve) => {
                    subscribeTokenRefresh(token => {
                        originalRequest.headers["Authorization"] = `Bearer ${token}`;
                        resolve(axios(originalRequest));
                    });
                });
            }
        }
        return Promise.reject(error);
    }
);

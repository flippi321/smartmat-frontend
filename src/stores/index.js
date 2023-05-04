import { defineStore } from 'pinia';
import { createPinia } from 'pinia';
import { useSessionStorage } from '@vueuse/core'
import loginService from "@/services/loginService";


const pinia = createPinia();

export const useAuthStore = defineStore({
    id: 'store',
    state: () => ({
        isLoggedIn: useSessionStorage('isLoggedIn', false),
        householdId: useSessionStorage('householdId', -1),
        firstName: useSessionStorage('firstName', ''),
        lastName: useSessionStorage('lastName', ''),
        email: useSessionStorage('email', ''),
        userId: useSessionStorage('userId', ''),
        nrOfPortions: useSessionStorage('nrOfPortions', 2),
    }),
    actions: {
        setLoggedIn() {
            this.isLoggedIn = true;
        },
        setHousehold(id) {
            this.householdId = id;
        },
        logout() {
            this.isLoggedIn = false;
            this.householdId = -1;
            this.firstName = '';
            this.lastName = '';
            this.email = '';
            this.userId = '';
        },
        setFirstName(firstName) {
            this.firstName = firstName;
        },
        setLastName(lastName) {
            this.lastName = lastName;
        },
        setEmail(email) {
            this.email = email;
        },
        setUserId(userId) {
            this.userId = userId;
        },
        setNrOfPortions(nrOfPortions) {
            this.nrOfPortions = nrOfPortions;
        },
        async refreshToken() {
            console.log("Refreshing token...");
            const refreshToken = sessionStorage.getItem("refresh_token");
            if (refreshToken) {
                const response = await loginService.refreshAccessToken(refreshToken);
                if (response.status === 200) {
                    sessionStorage.setItem("token", response.data.access_token);
                    sessionStorage.setItem("refresh_token", response.data.refresh_token);
                } else {
                    console.log("Error refreshing token:", response);
                }
            }
        }
    },
    getters: {
        getIsLoggedIn() {
            return this.isLoggedIn;
        },

        getHousehold() {
            return this.householdId;
        },

        getFirstName() {
            return this.firstName;
        },

        getLastName() {
            return this.lastName;
        },

        getEmail() {
            return this.email;
        },
        getUserId() {
            return this.userId;
        },
        getNrOfPortions() {
            return this.nrOfPortions;
        }
    }
});

export function getAuthStore() {
    return useAuthStore();
}

export default pinia;

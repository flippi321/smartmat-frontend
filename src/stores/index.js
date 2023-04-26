import { defineStore } from 'pinia';
import { createPinia } from 'pinia';
import { useSessionStorage } from '@vueuse/core'


const pinia = createPinia();

export const useAuthStore = defineStore({
    id: 'store',
    state: () => ({
        isLoggedIn: useSessionStorage('isLoggedIn', false),
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
        logout() {
            this.isLoggedIn = false;
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
        }
    },
    getters: {
        getIsLoggedIn() {
            return this.isLoggedIn;
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

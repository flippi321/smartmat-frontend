import { defineStore } from 'pinia';
import { createPinia } from 'pinia';

const pinia = createPinia();

export const useAuthStore = defineStore({
    id: 'store',
    state: () => ({
        isLoggedIn: false,
        firstName: '',
        lastName: '',
        email: '',
    }),
    actions: {
        setLoggedIn() {
            this.isLoggedIn = true;
        },
        logout() {
            this.isLoggedIn = false;
        },
        setFirstName(firstName) {
            this.firstName = firstName;
        },
        setLastName(lastName) {
            this.lastName = lastName;
        },
        setEmail(email) {
            this.email = email;
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
    },

    mutations: {
        setLoggedIn() {
            this.isLoggedIn = true;
        },
        logout() {
            this.isLoggedIn = false;
        }
    }
});

export default pinia;

import { defineStore } from 'pinia';

export const useAuthStore = defineStore('store',{
    state: () => ({
        isLoggedIn: false,
        firstName: '',
        lastName: '',
        email: '',
    }),
    actions: {
        login() {
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
    }
});

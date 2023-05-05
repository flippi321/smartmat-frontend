import { describe, it, afterEach, expect } from 'vitest';
import { createStore } from 'vuex';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import groceryService from '@/services/groceryService';

// Create a mock axios instance
const mockAxios = new MockAdapter(axios);

// Define the Vuex store
const store = createStore({
    state: {
        groceries: [],
        categories: []
    },
    mutations: {
        setGroceries(state, groceries) {
            state.groceries = groceries;
        },
        setCategories(state, categories) {
            state.categories = categories;
        }
    },
    actions: {
        async fetchGroceries({ commit }) {
            const response = await groceryService.getAllGroceries();
            commit('setGroceries', response.data);
        },
        async fetchCategories({ commit }) {
            const response = await groceryService.getAllCategories();
            commit('setCategories', response.data);
        }
    }
});

// Test suite for groceryService
describe('groceryService', () => {
    afterEach(() => {
        mockAxios.reset();
    });

    it('fetches all groceries', async () => {
        const groceries = [
            { id: 1, name: 'Milk', category: 'Dairy' },
            { id: 2, name: 'Eggs', category: 'Dairy' }
        ];
        mockAxios.onGet('http://localhost:8080/api/groceryItems/all').reply(200, groceries);

        await store.dispatch('fetchGroceries');
        expect(store.state.groceries).toEqual(groceries);
    });

    it('fetches all categories', async () => {
        const categories = ['Dairy', 'Fruits', 'Vegetables'];
        mockAxios.onGet('http://localhost:8080/api/categories/all').reply(200, categories);

        await store.dispatch('fetchCategories');
        expect(store.state.categories).toEqual(categories);
    });
});

import {describe, it, beforeEach, expect} from "vitest"
import { mount } from '@vue/test-utils';
import FridgeContentsComponent from "@/components/fridgePage/fridgeContentsCompoent.vue";
import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex';

const mockData = {
    groceries: [
        {
            "id": 1,
            "name": "Bananer",
            "category": 1,
            "unit": "stk",
            "expected_shelf_life": 7,
            "amount": 5,
            "days_since_purchase": 2,
            "days_until_spoilt": 4
        },
        {
            "id": 2,
            "name": "Epler",
            "category": 1,
            "unit": "stk",
            "expected_shelf_life": 7,
            "amount": 5,
            "days_since_purchase": 2,
            "days_until_spoilt": 4
        },
        {
            "id": 3,
            "name": "Melk",
            "category": 2,
            "unit": "l",
            "expected_shelf_life": 7,
            "amount": 1.5,
            "days_since_purchase": 2,
            "days_until_spoilt": 4
        },
        {
            "id": 4,
            "name": "Eplejuice",
            "category": 2,
            "unit": "l",
            "expected_shelf_life": 7,
            "amount": 1,
            "days_since_purchase": 2,
            "days_until_spoilt": 4
        },
        {
            "id": 5,
            "name": "Kylling",
            "category": 3,
            "unit": "kg",
            "expected_shelf_life": 3,
            "amount": 0.8,
            "days_since_purchase": 1,
            "days_until_spoilt": 2
        }
    ],
};

const store = createStore({
    state: {
        groceries: mockData.groceries,
    },
});

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/groceryItem', component: {} },
    ],
});

describe('FridgeContentsComponent', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(FridgeContentsComponent, {
            props: {
                items: mockData.groceries,
            },
            global: {
                plugins: [store, router],
            },
        });
    });

    it('renders the correct number of items', () => {
        const items = wrapper.findAll('.box');
        expect(items.length).toBe(mockData.groceries.length);
    });

    it('renders item names correctly', () => {
        const itemNames = wrapper.findAll('h3');
        itemNames.forEach((name, index) => {
            expect(name.text()).toBe(mockData.groceries[index].name);
        });
    });
});
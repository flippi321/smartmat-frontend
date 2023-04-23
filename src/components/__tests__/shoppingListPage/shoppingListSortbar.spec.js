import {describe, it, expect} from "vitest"
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex';
import ShoppingListSortbar from "@/components/shoppingListPage/shoppingListSortbar.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/addToShoppingList',
            name: 'AddToShoppingList',
        },
    ],
});

const store = createStore({
    state() {
        return {
            listId: 123,
            sortChoices: [
                {
                    id: 1,
                    name: 'Id',
                },
                {
                    id: 2,
                    name: 'Name',
                },
            ],
        };
    },
});

describe('ShoppingListSortbar.vue', () => {
    it('emits a "moveToFridge" event when "Flytt valgte til Kjøleskap" is clicked', () => {
        const wrapper = mount(ShoppingListSortbar, {
            global: {
                plugins: [router, store],
            },
        });

        const button = wrapper.findAll('button').at(0);

        button.trigger('click');

        expect(wrapper.emitted().moveToFridge).toBeTruthy();
    });

    it('emits a "removeItems" event when "Fjern Valgte" is clicked', () => {
        const wrapper = mount(ShoppingListSortbar, {
            global: {
                plugins: [router, store],
            },
        });

        const button = wrapper.findAll('button').at(1);

        button.trigger('click');

        expect(wrapper.emitted().removeItems).toBeTruthy();
    });

    it('toggles the expansion of the sort choices when the header is clicked', async () => {
        const wrapper = mount(ShoppingListSortbar, {
            global: {
                plugins: [router, store],
            },
        });

        const header = wrapper.find('.header');

        expect(wrapper.vm.isExpanded).toBe(false);

        header.trigger('click');

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.isExpanded).toBe(true);

        header.trigger('click');

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.isExpanded).toBe(false);
    });
});

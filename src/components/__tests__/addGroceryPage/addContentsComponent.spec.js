import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import { createRouter, createWebHistory } from "vue-router";
import AddContentsComponent from "@/components/addGroceryPage/AddContentsComponent.vue";
import GroceryItemDetails from "@/components/GroceryItemComponent.vue";

// Mock data for testing
const itemsMock = [
    {
        id: 1,
        name: "Bananer",
        expected_shelf_life: 7,
        amount: 5,
        days_since_purchase: 2,
        days_until_spoilt: 4,
        category: {
            category: 1,
            name: "Frukt og Grønt",
            unit: "stk",
        },
    },
];

describe("AddContentsComponent.vue", () => {
    let store;
    let wrapper;

    beforeEach(() => {
        // Create a store instance
        store = createStore({
            state: {},
            actions: {},
            mutations: {},
        });

        // Create a router instance
        const router = createRouter({
            history: createWebHistory(),
            routes: [],
        });

        // Mount the component
        wrapper = mount(AddContentsComponent, {
            global: {
                plugins: [store, router],
            },
            props: {
                items: itemsMock,
            },
        });
    });

    it("renders the component with the given items", () => {
        expect(wrapper.findAll(".fridge-box").length).toBe(itemsMock.length);
    });

    it("emits 'hide-filter-bar' event when an item is clicked", async () => {
        await wrapper.find(".fridge-box").trigger("click");
        expect(wrapper.emitted()["hide-filter-bar"]).toBeTruthy();
    });

    it("emits 'show-filter-bar' event when the decline button is clicked", async () => {
        await wrapper.find(".fridge-box").trigger("click");
        const groceryItemDetails = wrapper.findComponent(GroceryItemDetails);
        await groceryItemDetails.vm.$emit("decline");
        expect(wrapper.emitted()["show-filter-bar"]).toBeTruthy();
    });

    it("emits 'add-grocery' event with the grocery item when the update button is clicked", async () => {
        await wrapper.find(".fridge-box").trigger("click");
        const groceryItemDetails = wrapper.findComponent(GroceryItemDetails);
        await groceryItemDetails.vm.$emit("update", itemsMock[0]);
        expect(wrapper.emitted()["add-grocery"]).toBeTruthy();
        expect(wrapper.emitted()["add-grocery"][0]).toEqual([itemsMock[0]]);
    });
});

import { describe, it, beforeEach, expect } from "vitest";
import { mount } from "@vue/test-utils";
import FridgeSidebarComponent from "@/components/fridgePage/fridgeSidebarComponent.vue";
import { createRouter, createWebHistory } from "vue-router";
import { createStore } from "vuex";

const mockData = {
    categories: [
        {
            "id": 1,
            "name":"Frukt og Grønt"
        },
        {
            "id": 2,
            "name":"Melk og Juice"
        },
        {
            "id": 3,
            "name":"Kjøtt"
        },
        {
            "id": 4,
            "name":"Dyreprodukter"
        }
    ],
};

const store = createStore({
    state: {
        categories: mockData.categories,
    },
});

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/fridgeItem", component: {} },
        { path: "/fridge", component: {} },
    ],
});

describe("FridgeSidebarComponent", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(FridgeSidebarComponent, {
            props: {
                categories: mockData.categories,
                fridgeId: 1,
            },
            global: {
                plugins: [store, router],
            },
        });
    });

    it("renders the correct number of categories", () => {
        const categories = wrapper.findAll("li");
        expect(categories.length).toBe(mockData.categories.length);
    });

    it("renders category names correctly", () => {
        const categoryNames = wrapper.findAll("li");
        categoryNames.forEach((name, index) => {
            expect(name.text()).toBe(mockData.categories[index].name);
        });
    });
});

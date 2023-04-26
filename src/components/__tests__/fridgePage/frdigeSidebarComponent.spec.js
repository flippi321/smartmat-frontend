import { describe, it, beforeEach, expect } from "vitest";
import { mount } from "@vue/test-utils";
import FridgeSidebarComponent from "@/components/fridgePage/fridgeSidebarComponent.vue";
import { createRouter, createWebHistory } from "vue-router";
import { createStore } from "vuex";
import fridgeSidebarComponent from "@/components/fridgePage/fridgeSidebarComponent.vue";

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
        const categories = wrapper.findAll("ul");
        expect(categories.length).toBe(mockData.categories.length);
    });

    it("renders category names correctly", () => {
        const categoryNames = wrapper.findAll("ul");
        categoryNames.forEach((name, index) => {
            expect(name.text()).toBe(mockData.categories[index].name);
        });
    });

    it('should emit the "toggle-sidebar" event when the collapse button is clicked', async () => {
        const wrapper = mount(fridgeSidebarComponent, {
            global: {
                plugins: [store],
            },
        });

        const collapseButton = wrapper.find('.collapse-button');
        collapseButton.trigger('click');

        expect(wrapper.emitted('toggle-sidebar')).toBeTruthy();
        expect(wrapper.emitted('toggle-sidebar').length).toBe(1);
        expect(wrapper.emitted('toggle-sidebar')[0]).toEqual([true]);

        collapseButton.trigger('click');

        expect(wrapper.emitted('toggle-sidebar').length).toBe(2);
        expect(wrapper.emitted('toggle-sidebar')[1]).toEqual([false]);
    });
});

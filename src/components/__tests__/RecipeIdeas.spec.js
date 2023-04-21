import { mount } from "@vue/test-utils";
import Recipes from "@/components/RecipeIdeasComponent.vue";
import { describe, it, expect } from "vitest";

describe("Recipes", () => {
    it("should render header with correct text", async () => {
        const wrapper = mount(Recipes, {
            props: {
                id: 1,
            },
        });

        await wrapper.vm.$nextTick();
        expect(wrapper.find("#header").element.innerHTML).toContain(
            "Middagsforslag"
        );
    });

    it("should render a list of recipes", async () => {
        const wrapper = mount(Recipes, {
            props: {
                id: 1,
            },
        });

        await wrapper.vm.$nextTick();
        expect(wrapper.find("#recipeList").exists()).toBe(true);

    });

});

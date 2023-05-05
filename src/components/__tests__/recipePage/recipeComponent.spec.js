import { describe, it, expect } from "vitest";
import { mount } from '@vue/test-utils';
import RecipeComponent from '@/components/RecipeComponent.vue';
import { createStore } from 'vuex';
import { config } from '@vue/test-utils';
import recipeService from '@/services/recipeService';
import householdService from '@/services/householdService';

config.global.mocks['$router'] = {
    push: () => {},
};

const createVuexStore = () => {
    return createStore({
        state: {
            household: -1,
        },
        getters: {
            getHousehold: (state) => state.household,
            getUserId: () => 1,
            getNrOfPortions: () => 1,
        },
    });
};

const mountComponent = (stubs) => {
    const store = createVuexStore();

    return mount(RecipeComponent, {
        props: {
            recipe: {
                name: 'Test Recipe',
                ingredients: [],
                steps: [],
                imageLink: '',
                description: '',
                recipe_id: 1,
            },
        },
        global: {
            plugins: [store],
            mocks: {
                recipeService,
                householdService,
            },
            stubs,
        },
    });
};

describe('RecipeComponent', () => {
    it('renders the recipe name', () => {
        const wrapper = mountComponent();
        expect(wrapper.text()).toContain('Test Recipe');
    });

    it('renders the recipe description', async () => {
        const wrapper = mountComponent();
        await wrapper.setProps({
            recipe: {
                ...wrapper.props().recipe,
                description: 'A delicious test recipe',
            },
        });
        expect(wrapper.text()).toContain('A delicious test recipe');
    });

    it('renders the recipe image', async () => {
        const wrapper = mountComponent();
        await wrapper.setProps({
            recipe: {
                ...wrapper.props().recipe,
                imageLink: 'https://example.com/test-recipe.jpg',
            },
        });
        const img = wrapper.find('.recipeImg');
        expect(img.attributes('src')).toBe('https://example.com/test-recipe.jpg');
    });

    it('renders the adjusted ingredients list based on portions', async () => {
        const wrapper = mountComponent();
        await wrapper.setProps({
            recipe: {
                ...wrapper.props().recipe,
                ingredients: [
                    { amount: 1, unit: 'cup', name: 'flour' },
                    { amount: 2, unit: 'tsp', name: 'sugar' },
                ],
            },
        });
        await wrapper.setData({ portions: 2 });

        const ingredientsListItems = wrapper.findAll('ul li');
        expect(ingredientsListItems[0].text()).toContain('2 cup flour');
        expect(ingredientsListItems[1].text()).toContain('4 tsp sugar');
    });

    it('renders the recipe steps', async () => {
        const wrapper = mountComponent();
        await wrapper.setProps({
            recipe: {
                ...wrapper.props().recipe,
                steps: ['Step 1: Preheat the oven', 'Step 2: Mix the ingredients'],
            },
        });

        const stepsListItems = wrapper.findAll('ol li');
        expect(stepsListItems[0].text()).toBe('Step 1: Preheat the oven');
        expect(stepsListItems[1].text()).toBe('Step 2: Mix the ingredients');
    });
});
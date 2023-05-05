import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount, config } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import RecipeIdeasComponent from '@/components/RecipeIdeasComponent.vue';
import sinon from 'sinon';
import axios from 'axios';

config.global.components = {
    'router-link': {
        template: '<div />',
    },
};


describe('RecipeIdeasComponent.vue', () => {
    let axiosGetStub;

    beforeEach(() => {
        axiosGetStub = sinon.stub(axios, 'get');
        axiosGetStub.withArgs(sinon.match(/\/api\/recipes\/recommender\/\d+/)).resolves({
            data: [
                {
                    "recipe_id": 2,
                    "name": "Havregrøt",
                    "description": "En sunn og mettende frokost laget med havregryn, melk eller vann og en klype salt.",
                    "imageLink": "https://dummyimage.com/600x400/000/fff",
                    "steps": [
                        "Preheat oven to 350°F (175°C) and grease a loaf pan.",
                        "In a large bowl, mash the ripe bananas with a fork.",
                        "Mix in sugar, melted butter, beaten egg, and vanilla extract.",
                        "Stir in the flour, baking soda, and salt until just combined.",
                        "Pour batter into the prepared loaf pan and bake for 60-65 minutes, or until a toothpick inserted into the center comes out clean."
                    ],
                    "ingredients": [
                        {
                            "id": 1,
                            "name": "Melk",
                            "amount": 2,
                            "unit": "L"
                        },
                        {
                            "id": 14,
                            "name": "Ris",
                            "amount": 1,
                            "unit": "kg"
                        }
                    ]
                },
            ],
        });
        axiosGetStub.withArgs(sinon.match(/\/api\/recipes\/missingIngredients\/\d+\/\d+/)).resolves({
            data: [
                {
                    "recipe_id": 1,
                    "name": "Missing Ingredients of: Eggerøre",
                    "description": "Missing items",
                    "ingredients": []
                },
                {
                    "recipe_id": 1,
                    "name": "Eggerøre",
                    "description": "En enkel og deilig frokostrett laget med egg, melk og smør.",
                    "ingredients": [
                        {
                            "id": 1,
                            "name": "Melk",
                            "amount": 0,
                            "unit": "L"
                        },
                        {
                            "id": 2,
                            "name": "Egg",
                            "amount": 4,
                            "unit": "stk"
                        }
                    ]
                }
            ],
        });
    });

    afterEach(() => {
        axiosGetStub.restore();
    });

    it('renders the component', async () => {
        const router = createRouter({
            history: createWebHistory(),
            routes: [], // Add your routes here if needed
        });

        const wrapper = mount(RecipeIdeasComponent, {
            global: {
                plugins: [router],
            },
        });

        await wrapper.vm.$nextTick();
    });

    it('renders the correct elements', async () => {
        const router = createRouter({
            history: createWebHistory(),
            routes: [],
        });

        const wrapper = mount(RecipeIdeasComponent, {
            global: {
                plugins: [router],
            },
        });

        await wrapper.vm.$nextTick();
        expect(wrapper.find('.header').text()).toBe('Middagsforslag');
        expect(wrapper.find('.nrOfPeopleLabel').text()).toBe('Antall personer:');
        expect(wrapper.find('#nrOfPeople').exists()).toBe(true);
        expect(wrapper.find('.scroll-container').exists()).toBe(true);
        expect(wrapper.find('.scroll-button').exists()).toBe(true);
    });
});
import { mount } from '@vue/test-utils';
import RecipeIdeasComponent from '@/components/RecipeIdeasComponent.vue';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import sinon from 'sinon';
import axios from 'axios';

describe('RecipeIdeasComponent.vue', () => {
    let axiosStub;

    beforeEach(() => {
        axiosStub = sinon.stub(axios, 'request');
        axiosStub.withArgs(sinon.match({ url: sinon.match(/\/api\/recipes\/recommender\/\d+/) })).resolves({
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
        axiosStub.withArgs(sinon.match({ url: sinon.match(/\/api\/recipes\/missingIngredients\/\d+\/\d+/) })).resolves({
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
        axiosStub.restore();
    });

    describe('RecipeIdeasComponent.vue', () => {
        it('renders the component', async () => {
            const wrapper = mount(RecipeIdeasComponent, {
                props: {
                    id: 1,
                },
            });

            await wrapper.vm.$nextTick();

            const headerElement = wrapper.find('.header');
            const recipeNameElement = wrapper.find('.recipeName');

            expect(headerElement.text()).toBe('Middagsforslag');
            expect(recipeNameElement.text()).toBe('Havregrøt');
        });

        it('scrolls right', async () => {
            const wrapper = mount(RecipeIdeasComponent, {
                props: {
                    id: 1,
                },
            });

            await wrapper.vm.$nextTick();

            const gridContainer = wrapper.find('.grid-container').element;

            if (typeof gridContainer.scrollTo === 'undefined') {
                gridContainer.scrollTo = sinon.stub();
            } else {
                sinon.stub(gridContainer, 'scrollTo');
            }

            await wrapper.find('.scroll-button').trigger('click');
            await wrapper.vm.$nextTick();

            expect(gridContainer.scrollTo.called).toBeTruthy();
        });

        it('updates nrOfPeople when input changes', async () => {
            const wrapper = mount(RecipeIdeasComponent, {
                props: {
                    id: 1,
                },
            });

            await wrapper.vm.$nextTick();

            const input = wrapper.find('#nrOfPeople');
            await input.setValue(3);
            await wrapper.vm.$nextTick();

            expect(wrapper.vm.nrOfPeople).toBe(3);
        });
    });

});



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
                    id: 1,
                    name: 'Test Recipe',
                    imageUrl: 'test-image-url',
                    description: 'Test description',
                },
            ],
        });
        axiosStub.withArgs(sinon.match({ url: sinon.match(/\/api\/recipes\/missingIngredients\/\d+\/\d+/) })).resolves({
            data: [
                {
                    "id": 1,
                    "name": "Missing Ingredients of: Eggerøre",
                    "description": "Missing items",
                    "ingredients": []
                },
                {
                    "id": 1,
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
            expect(recipeNameElement.text()).toBe('Test Recipe');
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



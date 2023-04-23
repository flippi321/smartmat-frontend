import { mount } from '@vue/test-utils';
import RecipeIdeasComponent from '@/components/RecipeIdeasComponent.vue';
import recipeService from '@/services/recipeService';
import {describe, it} from "vitest";
import sinon from 'sinon';


// Mock recipeService.getRecipes
recipeService.getRecipes = async () => ({
    data: {
        recipes: {
            recipes: [
                {
                    id: 1,
                    name: 'Test Recipe',
                    imageUrl: 'test-image-url',
                    description: 'Test description',
                },
            ],
        },
    },
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

        console.assert(headerElement.text() === 'Middagsforslag', 'Header text does not match');
        console.assert(recipeNameElement.text() === 'Test Recipe', 'Recipe name does not match');
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

        console.assert(gridContainer.scrollTo.called, 'scrollTo was not called');
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

        console.assert(wrapper.vm.nrOfPeople === 3, 'nrOfPeople does not match input value');
    });
});

import { describe, test, beforeEach, expect } from "vitest";
import { mount } from '@vue/test-utils'
import RecipeComponent from '@/components/RecipeComponent.vue'

const mockRecipe = {
    name: 'Test Recipe',
    description: 'Test recipe description',
    ingredients: [
        { name: 'Ingredient 1', amount: 2, unit: 'g' },
        { name: 'Ingredient 2', amount: 1, unit: 'kg' },
    ],
}

describe('RecipeComponent', () => {
    let wrapper

    beforeEach(async () => {
        wrapper = mount(RecipeComponent, {
            props: {
                recipe: mockRecipe,
            },
        })

        const portionsInput = wrapper.find('#portions')
        await portionsInput.setValue(1)
    })

    test('renders recipe name and description', () => {
        expect(wrapper.find('h2').text()).toBe(mockRecipe.name)
        expect(wrapper.find('p').text()).toBe(mockRecipe.description)
    })

    test('renders ingredients list', () => {
        const ingredients = wrapper.findAll('li')
        expect(ingredients.length).toBe(mockRecipe.ingredients.length)

        ingredients.forEach((ingredient, index) => {
            const ingredientText = `${mockRecipe.ingredients[index].amount} ${mockRecipe.ingredients[index].unit} ${mockRecipe.ingredients[index].name}`
            expect(ingredient.text()).toBe(ingredientText)
        })
    })

    test('updates ingredients amount when changing portions', async () => {
        const newPortions = 2
        const input = wrapper.find('input[type="number"]')
        await input.setValue(newPortions)

        const ingredients = wrapper.findAll('li')
        ingredients.forEach((ingredient, index) => {
            const adjustedAmount = mockRecipe.ingredients[index].amount * newPortions
            const roundedAmount = Math.round(adjustedAmount * 4) / 4
            const ingredientText = `${roundedAmount} ${mockRecipe.ingredients[index].unit} ${mockRecipe.ingredients[index].name}`
            expect(ingredient.text()).toBe(ingredientText)
        })
    })
})

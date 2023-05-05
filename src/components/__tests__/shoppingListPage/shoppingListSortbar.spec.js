import {describe, it, expect} from "vitest"
import { mount } from '@vue/test-utils'
import sortBar from "@/components/shoppingListPage/shoppingListSortbar.vue";

describe('sortBar.vue', () => {
    const sortChoices = [
        {
            id: 1,
            name: 'Alphabetical',
        },
        {
            id: 2,
            name: 'Date Added',
        },
    ]

    it('emits moveToFridge event', async () => {
        const wrapper = mount(sortBar, {
            props: { listId: 1, sortChoices },
        })

        const moveToFridgeButton = wrapper.find('.move-to-fridge-button')
        await moveToFridgeButton.trigger('click')

        const emittedEvent = wrapper.emitted('moveToFridge')
        expect(emittedEvent).toHaveLength(1)
    })

    it('emits removeItems event', async () => {
        const wrapper = mount(sortBar, {
            props: { listId: 1, sortChoices },
        })

        const removeItemsButton = wrapper.find('.remove-selected-button')
        await removeItemsButton.trigger('click')

        const emittedEvent = wrapper.emitted('removeItems')
        expect(emittedEvent).toHaveLength(1)
    })
})
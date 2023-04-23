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

    it('renders the sort choices correctly', () => {
        const wrapper = mount(sortBar, {
            props: { listId: 1, sortChoices },
        })

        const choices = wrapper.findAll('li')
        expect(choices).toHaveLength(sortChoices.length)
        sortChoices.forEach((choice, index) => {
            const choiceElement = choices[index]
            expect(choiceElement.text()).toContain(choice.name)
        })
    })

    it('changes sorting and emits event', async () => {
        const wrapper = mount(sortBar, {
            props: { listId: 1, sortChoices },
        })

        const choices = wrapper.findAll('li')
        await choices[0].trigger('click')

        expect(wrapper.vm.selectedChoice).toBe(sortChoices[0].name)

        const emittedEvent = wrapper.emitted('changeSortBy')
        expect(emittedEvent).toHaveLength(1)
        expect(emittedEvent[0]).toEqual([sortChoices[0].id])
    })

    it('emits moveToFridge event', async () => {
        const wrapper = mount(sortBar, {
            props: { listId: 1, sortChoices },
        })

        const moveToFridgeButton = wrapper.find('.shopping-list-button')
        await moveToFridgeButton.trigger('click')

        const emittedEvent = wrapper.emitted('moveToFridge')
        expect(emittedEvent).toHaveLength(1)
    })

    it('emits removeItems event', async () => {
        const wrapper = mount(sortBar, {
            props: { listId: 1, sortChoices },
        })

        const removeItemsButton = wrapper.findAll('.shopping-list-button')[1]
        await removeItemsButton.trigger('click')

        const emittedEvent = wrapper.emitted('removeItems')
        expect(emittedEvent).toHaveLength(1)
    })
})
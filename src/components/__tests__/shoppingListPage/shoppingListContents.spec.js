import { mount } from '@vue/test-utils'
import {describe, it, beforeEach, expect} from "vitest"
import { createStore } from 'vuex'
import ShoppingListContents from "@/components/shoppingListPage/shoppingListContents.vue";

describe('ShoppingListContents.vue', () => {
    let store

    beforeEach(() => {
        store = createStore({
            state() {
                return {
                    shoppingList: [
                        {
                            id: 1,
                            name: 'Apples',
                            selected: false,
                            amount: 1,
                            unit: 'kg',
                            expected_shelf_life: 7,
                            actual_shelf_life: 7
                        },
                        {
                            id: 2,
                            name: 'Bananas',
                            selected: false,
                            amount: 2,
                            unit: 'pcs',
                            expected_shelf_life: 5,
                            actual_shelf_life: 4
                        }
                    ]
                }
            },
            mutations: {
                selectItem(state, itemId) {
                    const item = state.shoppingList.find(item => item.id === itemId)
                    item.selected = !item.selected
                }
            }
        })
    })

    it('displays the correct number of items', () => {
        const wrapper = mount(ShoppingListContents, {
            props: {
                items: store.state.shoppingList
            },
            global: {
                plugins: [store]
            }
        })

        const items = wrapper.findAll('.box')
        expect(items.length).toBe(2)
    })

    it('displays the item names correctly', () => {
        const wrapper = mount(ShoppingListContents, {
            props: {
                items: store.state.shoppingList
            },
            global: {
                plugins: [store]
            }
        })

        const itemNames = wrapper.findAll('.name')
        expect(itemNames[0].text()).toBe('Apples')
        expect(itemNames[1].text()).toBe('Bananas')
    })

    it('selects an item when clicked', async () => {
        const wrapper = mount(ShoppingListContents, {
            props: {
                items: store.state.shoppingList
            },
            global: {
                plugins: [store]
            }
        })

        const checkbox = wrapper.find('.checkbox')
        await checkbox.trigger('click')
        expect(store.state.shoppingList[0].selected).toBe(true)
    })
})

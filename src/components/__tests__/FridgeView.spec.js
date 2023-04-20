import { shallowMount } from '@vue/test-utils'
import {describe, it, expect} from "vitest"
import FridgeView from '@/views/FridgeView.vue'

describe('FridgeView', () => {
    it('renders a title', () => {
        const wrapper = shallowMount(FridgeView)
        const title = wrapper.find('h1')
        expect(title.text()).toBe('This is a fridge')
    })

    it('renders multiple title elements', () => {
        const wrapper = shallowMount(FridgeView)
        const titles = wrapper.findAll('h1')
        expect(titles.length).toBe(21) // 1 initial title + 20 titles in v-for loop
    })

    it('does not have a minimum height on small screens', () => {
        const wrapper = shallowMount(FridgeView, {
            mediaQueries: { '(min-width: 1024px)': false }
        })
        const about = wrapper.find('.about')
        expect(about.element.style.minHeight).toBeFalsy()
    })
})

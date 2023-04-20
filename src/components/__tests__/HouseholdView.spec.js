import { shallowMount } from '@vue/test-utils'
import {describe, it, expect} from "vitest"
import HouseholdView from '@/views/HouseholdView.vue'

describe('HouseholdView.vue', () => {
    it('displays the household id', () => {
        const id = 123;
        const wrapper = shallowMount(HouseholdView, {
            props: { id },
        });
        expect(wrapper.find('h3').text()).toMatch(`Your household has the id: ${id}`);
    });

    it('displays the correct number of buttons', () => {
        const id = 1;
        const wrapper = shallowMount(HouseholdView, {
            props: { id },
        });
        expect(wrapper.findAll('.button-primary').length).toBe(5);
    });

    it('displays buttons correctly', () => {
        const id = 123
        const wrapper = shallowMount(HouseholdView, {
            props: { id }
        })

        const buttons = wrapper.findAll('.button-primary')

        expect(buttons[0].find('img').attributes('alt')).toBe('[Fridge]')
        expect(buttons[0].find('span').text()).toBe('Kjøleskap')

        expect(buttons[1].find('img').attributes('alt')).toBe('[Shopping List]')
        expect(buttons[1].find('span').text()).toBe('Handleliste')

        expect(buttons[2].find('img').attributes('alt')).toBe('[Dinner Ideas]')
        expect(buttons[2].find('span').text()).toBe('Middagsideer')

        expect(buttons[3].find('img').attributes('alt')).toBe('[Plan Week]')
        expect(buttons[3].find('span').text()).toBe('Planlegg Uke')

        expect(buttons[4].find('img').attributes('alt')).toBe('[Admin]')
        expect(buttons[4].find('span').text()).toBe('Administrer Medlemmer')
    });

    /*
    Disabled until children are created

    it('links to the correct routes', () => {
        const wrapper = shallowMount(HouseholdInfo);
        const fridgeLink = wrapper.find('.fridge-button').parent();
        const shoppingListLink = wrapper.find('.shopping-list-button').parent();
        const dinnerIdeasLink = wrapper.find('.dinner-ideas-button').parent();
        const plannerLink = wrapper.find('.planner-button').parent();
        const adminLink = wrapper.find('.admin-button').parent();

        expect(fridgeLink.attributes('to')).toBe('/Fridge');
        expect(shoppingListLink.attributes('to')).toBe('/createAd');
        expect(dinnerIdeasLink.attributes('to')).toBe('/createAd');
        expect(plannerLink.attributes('to')).toBe('/createAd');
        expect(adminLink.attributes('to')).toBe('/createAd');
    });*/
});

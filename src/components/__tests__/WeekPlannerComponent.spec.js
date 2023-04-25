import { shallowMount } from '@vue/test-utils';
import WeekPlannerComponent from '@/components/WeekPlannerComponent.vue';
import {describe, it, expect} from "vitest";

describe('WeekPlannerComponent.vue', () => {
    it('renders the component', () => {
        const wrapper = shallowMount(WeekPlannerComponent);
        expect(wrapper.exists()).toBe(true);
    });

    it('generates a weekly menu when the button is clicked', async () => {
        const wrapper = shallowMount(WeekPlannerComponent);
        const button = wrapper.find('.btn');
        await button.trigger('click');
        expect(wrapper.vm.weeklyMenu.length).toBe(7);
    });

    it('displays the correct number of people in the input field', async () => {
        const wrapper = shallowMount(WeekPlannerComponent);
        const input = wrapper.find('#nrOfPeople');
        const numberOfPeople = 4;
        await input.setValue(numberOfPeople);
        expect(wrapper.vm.nrOfPeople).toBe(numberOfPeople);
    });

    it('displays the weekly menu', async () => {
        const wrapper = shallowMount(WeekPlannerComponent);
        await wrapper.setData({
            weeklyMenu: [
                { name: 'Pasta bolognese', description: 'Pasta med kjøttsaus' },
                { name: 'Taco', description: 'Taco med kjøttdeig, salat, tomat, mais, agurk, løk, ost, salsa og rømme' },
                { name: 'Kylling tikka masala', description: 'Kylling i tikka masala med ris' },
                { name: 'Fiskegrateng', description: 'Fiskegrateng' },
                { name: 'Laks med ris', description: 'Laks med ris og grønnsaker' },
                { name: 'Hamburger', description: 'Hamburger med salat, tomat, agurk, løk og ost' },
                { name: 'Pizza', description: 'Pizza med tomatsaus, skinke, ost og bacon' },
            ],
        });
        const dinners = wrapper.findAll('.dinner-item');
        expect(dinners.length).toBe(7);
    });
});

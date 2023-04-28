import {describe, it, beforeEach, expect} from "vitest"
import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { nextTick } from 'vue';
import GroceryItemComponent from "@/components/GroceryItemComponent.vue";

describe('GroceryItemComponent.vue', () => {
    let wrapper;
    let store;
    let item;

    beforeEach(() => {
        item = {
            groceryItemId: 6,
            name: 'Egg',
            expected_shelf_life: 30,
            category: {
                category: 3,
                name: 'Kjøtt',
                unit: 'kg',
            },
            amount: 5,
        };

        store = createStore({
            state: {
                item,
            },
        });

        wrapper = mount(GroceryItemComponent, {
            props: {
                item,
                acceptMessage: 'Accept',
                declineMessage: 'Decline',
                tertiaryMessage: 'Special',
            },
            global: {
                plugins: [store],
            },
        });
    });

    it('renders the item name', () => {
        const itemName = wrapper.find('.grocery-item-name');
        expect(itemName.text()).toBe(item.name);
    });

    it('renders the item amount', () => {
        const itemAmountInput = wrapper.find('.grocery-item-amount input');
        expect(Number(itemAmountInput.element.value)).toBe(item.amount);
    });

    it('renders the expected shelf life', () => {
        const expectedShelfLife = wrapper.find('.grocery-item-expected-shelf-life');
        expect(expectedShelfLife.text()).toContain(item.expected_shelf_life);
    });

    it('emits "update" event when the accept button is clicked', async () => {
        const acceptButton = wrapper.find('button:nth-child(1)');
        await acceptButton.trigger('click.stop');
        expect(wrapper.emitted('update')).toBeTruthy();
    });

    it('emits "decline" event when the decline button is clicked', async () => {
        const declineButton = wrapper.find('button:nth-child(2)');
        await declineButton.trigger('click.stop');
        expect(wrapper.emitted('decline')).toBeTruthy();
    });

    it('emits "special" event when the special button is clicked', async () => {
        const specialButton = wrapper.find('button:nth-child(3)');
        await specialButton.trigger('click.stop');
        expect(wrapper.emitted('special')).toBeTruthy();
    });

    it('updates the actual shelf life and amount on created', async () => {
        expect(wrapper.vm.actual_shelf_life).toBe(item.expected_shelf_life);
        expect(wrapper.vm.amount).toBe(item.amount);
    });

    it('updates the amount when the input is changed', async () => {
        const input = wrapper.find('.grocery-item-amount input');
        await input.setValue(10);
        await nextTick();
        expect(wrapper.vm.amount).toBe(10);
    });

    it('updates the actual shelf life when the input is changed', async () => {
        const input = wrapper.find('.grocery-item-actual-shelf-life input');
        await input.setValue(20);
        await nextTick();
        expect(wrapper.vm.actual_shelf_life).toBe(20);
    });
});
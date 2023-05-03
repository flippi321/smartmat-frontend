import {describe, it, expect} from "vitest"
import { mount } from '@vue/test-utils';
import GroceryItemComponent from '@/components/GroceryItemComponent.vue';

describe('GroceryItemComponent', () => {
    const item = {
        imageLink: 'https://example.com/image.jpg',
        name: 'Test Item',
        category: {
            unit: 'kg'
        },
        expectedShelfLife: 7
    };

    const wrapper = mount(GroceryItemComponent, {
        props: {
            item,
            acceptMessage: 'Accept',
            declineMessage: 'Decline',
            tertiaryMessage: 'Special'
        }
    });

    it('renders item name correctly', () => {
        const itemName = wrapper.find('.grocery-item-name');
        expect(itemName.text()).toBe(item.name);
    });

    it('renders item image correctly', () => {
        const image = wrapper.find('.grocery-item-image img');
        expect(image.attributes('src')).toBe(item.imageLink);
        expect(image.attributes('alt')).toBe(item.name);
    });

    it('renders expected shelf life correctly', () => {
        const expectedShelfLife = wrapper.find('.grocery-item-expected-shelf-life');
        expect(expectedShelfLife.text()).toContain(`Beregnet holdbarhet: ${item.expectedShelfLife} dager`);
    });

    it('renders accept, decline and special buttons', () => {
        const acceptButton = wrapper.find('button:nth-child(1)');
        const declineButton = wrapper.find('button:nth-child(2)');
        const specialButton = wrapper.find('button:nth-child(3)');

        expect(acceptButton.text()).toBe('Accept');
        expect(declineButton.text()).toBe('Decline');
        expect(specialButton.text()).toBe('Special');
    });

    it('emits update event with updated item on accept button click', async () => {
        const acceptButton = wrapper.find('button:nth-child(1)');
        await acceptButton.trigger('click');

        const emittedEvents = wrapper.emitted();
        expect(emittedEvents.update[0][0]).toEqual({
            ...item,
            amount: 1,
            actualShelfLife: item.expectedShelfLife
        });
    });

    it('emits decline event on decline button click', async () => {
        const declineButton = wrapper.find('button:nth-child(2)');
        await declineButton.trigger('click');

        const emittedEvents = wrapper.emitted();
        expect(emittedEvents.decline).toBeTruthy();
    });

    it('emits special event on special button click', async () => {
        const specialButton = wrapper.find('button:nth-child(3)');
        await specialButton.trigger('click');

        const emittedEvents = wrapper.emitted();
        expect(emittedEvents.special).toBeTruthy();
    });
});

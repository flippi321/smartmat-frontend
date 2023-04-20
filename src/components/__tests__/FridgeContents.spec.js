import { shallowMount } from '@vue/test-utils';
import {describe, it, expect } from "vitest"
import fridgeContentsCompoent from "@/components/fridgePage/fridgeContentsCompoent.vue";

describe('Component.vue', () => {
    it('renders items correctly', () => {
        const items = [
            { id: 1, name: 'item 1', description: 'description 1' },
            { id: 2, name: 'item 2', description: 'description 2' },
            { id: 3, name: 'item 3', description: 'description 3' }
        ];
        const wrapper = shallowMount(fridgeContentsCompoent, {
            props: {
                items
            }
        });
        const boxes = wrapper.findAll('.box');
        expect(boxes).toHaveLength(items.length);
        items.forEach((item, index) => {
            const box = boxes[index];
            expect(box.find('h3').text()).toBe(item.name);
            expect(box.find('.description').text()).toBe(item.description);
        });
    });
});

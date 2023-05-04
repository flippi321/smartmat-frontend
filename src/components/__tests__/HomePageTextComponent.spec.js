import { mount } from '@vue/test-utils';
import HomePageTextComponent from '@/components/HomePageTextComponent.vue';
import { describe, it, expect } from 'vitest';

describe('HomePageTextComponent.vue', () => {
    it('renders the component with the correct paragraphs', () => {
        const wrapper = mount(HomePageTextComponent);

        const paragraphs = wrapper.findAll('.info-section p');
        const { paragraphs: expectedParagraphs } = wrapper.vm.$data;

        expect(paragraphs.length).toBe(expectedParagraphs.length);

        paragraphs.forEach((paragraph, index) => {
            expect(paragraph.text()).toBe(expectedParagraphs[index]);
        });
    });

    it('renders the component with the correct icons', () => {
        const wrapper = mount(HomePageTextComponent);

        const images = wrapper.findAll('.info-section img');
        const { icons: expectedIcons } = wrapper.vm.$data;

        expect(images.length).toBe(expectedIcons.length);

        images.forEach((image, index) => {
            expect(image.attributes('src')).toBe(expectedIcons[index]);
        });
    });
});

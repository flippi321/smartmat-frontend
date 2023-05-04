import { describe, it, expect, beforeEach } from "vitest";
import { mount } from '@vue/test-utils';
import fridgeSidebarComponent from '@/components/fridgePage/fridgeSidebarComponent.vue';
import categoriesData from '@/mockDatabases/categories.json';

describe('fridgeSidebarComponent', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(fridgeSidebarComponent, {
            props: {
                categories: categoriesData,
            },
            global: {
                components: {
                    fridgeSidebarComponent,
                },
            },
        });
    });

    it('renders the component', () => {
        expect(wrapper.find('.fridge-sidebar').exists()).toBe(true);
    });

    it('renders the correct number of categories', () => {
        expect(wrapper.findAll('.category-item').length).toBe(categoriesData.length);
    });

    it('renders sorted categories', () => {
        const sortedCategories = categoriesData.slice().sort((a, b) => a.name.localeCompare(b.name));
        const categoryItems = wrapper.findAll('.category-item');
        sortedCategories.forEach((category, index) => {
            expect(categoryItems[index].text()).toBe(category.name);
        });
    });

    it('emits search event on search input', async () => {
        const searchTerm = 'Frukt';
        const searchBar = wrapper.find('.search-bar');
        await searchBar.setValue(searchTerm);
        await searchBar.trigger('input');
        expect(wrapper.emitted('search')).toBeTruthy();
        expect(wrapper.emitted('search')[0]).toEqual([searchTerm]);
    });

    it('toggles isCollapsed state and emits toggle-sidebar event on collapse button click', async () => {
        const collapseButton = wrapper.find('.collapse-button');
        await collapseButton.trigger('click');
        expect(wrapper.vm.isCollapsed).toBe(true);
        expect(wrapper.emitted('toggle-sidebar')).toBeTruthy();
        expect(wrapper.emitted('toggle-sidebar')[0]).toEqual([true]);
    });

    it('has correct initial state', () => {
        expect(wrapper.vm.isCollapsed).toBe(false);
        expect(wrapper.vm.iconRotation).toBe(90);
        expect(wrapper.vm.searchTerm).toBe('');
    });
});
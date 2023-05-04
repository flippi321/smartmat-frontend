import {describe, it, beforeEach, expect} from "vitest"
import { mount } from '@vue/test-utils';
import fridgeContentsComponent from '@/components/fridgePage/fridgeContentsComponent.vue';
import FridgeItemDetailsComponent from '@/components/GroceryItemComponent.vue';
import itemsData from '@/mockDatabases/all-groceries.json';

describe('fridgeContentsComponent', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(fridgeContentsComponent, {
            props: {
                items: itemsData,
            },
            global: {
                components: {
                    FridgeItemDetailsComponent,
                },
            },
        });
    });

    it('renders the component', () => {
        expect(wrapper.find('.fridge-box-container').exists()).toBe(true);
    });

    it('renders the correct number of items', () => {
        expect(wrapper.findAll('.fridge-box').length).toBe(itemsData.length);
    });

    it('emits showFilterBar and hideFilterBar events on item click', async () => {
        const itemElements = wrapper.findAll('.fridge-box');
        await itemElements[0].trigger('click');
        expect(wrapper.emitted('hideFilterBar')).toBeTruthy();
        await wrapper.vm.toggleRetractHelper();
        expect(wrapper.emitted('showFilterBar')).toBeTruthy();
    });

    it('emits add-new-items event on add-items-button click', async () => {
        const addButton = wrapper.find('.add-items-button');
        await addButton.trigger('click');
        expect(wrapper.emitted('add-new-items')).toBeTruthy();
    });

    it('emits updateItem event on item update', async () => {
        const itemElements = wrapper.findAll('.fridge-box');
        await itemElements[0].trigger('click');
        await wrapper.vm.updateItem(itemsData[0]);
        expect(wrapper.emitted('updateItem')).toBeTruthy();
        expect(wrapper.emitted('updateItem')[0]).toEqual([itemsData[0]]);
    });

    it('emits deleteItem event on item delete', async () => {
        const itemElements = wrapper.findAll('.fridge-box');
        await itemElements[0].trigger('click');
        await wrapper.vm.deleteItem(itemsData[0]);
        expect(wrapper.emitted('deleteItem')).toBeTruthy();
        expect(wrapper.emitted('deleteItem')[0]).toEqual([itemsData[0]]);
    });
});


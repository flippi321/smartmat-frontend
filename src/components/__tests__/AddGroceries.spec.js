import { mount } from '@vue/test-utils';
import AddGroceries from '@/components/AddGroceries.vue';
import groceryService from '@/services/groceryService';
import fridgeService from '@/services/fridgeService';
import { describe, it, expect } from 'vitest';

groceryService.getAllGroceries = async () => ({
    data: [
        {
            "groceryItemId": 6,
            "name": "Gulrøtt",
            "expectedShelfLife": 30,
            "actualShelfLife": 0,
            "imageLink": "https://bilder.kolonial.no/produkter/840c1ecf-12aa-427b-909c-226568c4f5de.jpg?auto=format&fit=max&w=500&s=05bff6f537c33ab4425279c066b9b251",
            "amount": 0,
            "category": {
                "category": 3,
                "name": "Frukt og grønt",
                "unit": "kg"
            }
        },
        {
            "groceryItemId": 8,
            "name": "Agurk",
            "expectedShelfLife": 7,
            "actualShelfLife": 0,
            "imageLink": "https://engrosnett.no/image/frukt-og-gronnsaker/gronnsaker/1504-agurk.png?lb=true&v=638180975011870000",
            "amount": 0,
            "category": {
                "category": 3,
                "name": "Frukt og grønt",
                "unit": "kg"
            }
        },

    ],
});

groceryService.getAllCategories = async () => ({
    data: [
        {
            "category": 1,
            "name": "Kjøtt",
            "unit": "kg"
        },
        {
            "category": 3,
            "name": "Frukt og grønt",
            "unit": "kg"
        },
    ],
});

fridgeService.getFridgeContents = async () => ({
    data: {
        groceryItems: {
            groceries: [
                {
                    "groceryItemId": 6,
                    "name": "Gulrøtt",
                    "expectedShelfLife": 30,
                    "actualShelfLife": 0,
                    "imageLink": "https://bilder.kolonial.no/produkter/840c1ecf-12aa-427b-909c-226568c4f5de.jpg?auto=format&fit=max&w=500&s=05bff6f537c33ab4425279c066b9b251",
                    "amount": 0,
                    "category": {
                        "category": 3,
                        "name": "Frukt og grønt",
                        "unit": "kg"
                    }
                },
                {
                    "groceryItemId": 8,
                    "name": "Agurk",
                    "expectedShelfLife": 7,
                    "actualShelfLife": 0,
                    "imageLink": "https://engrosnett.no/image/frukt-og-gronnsaker/gronnsaker/1504-agurk.png?lb=true&v=638180975011870000",
                    "amount": 0,
                    "category": {
                        "category": 3,
                        "name": "Frukt og grønt",
                        "unit": "kg"
                    }
                },
            ],
        },
    },
});

fridgeService.getCategoriesFromFridgeId = async () => ({
    data: {
        categories: {
            categories: [
                {
                    "category": 1,
                    "name": "Kjøtt",
                    "unit": "kg"
                },
                {
                    "category": 3,
                    "name": "Frukt og grønt",
                    "unit": "kg"
                },
            ],
        },
    },
});

describe('AddGroceries.vue', () => {
    it('renders the component', () => {
        const wrapper = mount(AddGroceries, {
            props: {
                id: 1,
                home: 'test',
            },
        });

        expect(wrapper.exists()).toBe(true);
    });



    it('fetches groceries data on created', async () => {
        const wrapper = mount(AddGroceries, {
            props: {
                id: 1,
                home: 'test',
            },
        });

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.items).toHaveLength(2);
    });

    it('fetches categories data on created', async () => {
        const wrapper = mount(AddGroceries, {
            props: {
                id: 1,
                home: 'test',
            },
        });

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.categories).toHaveLength(2);
    });

    it('shows the sidebar by default', () => {
        const wrapper = mount(AddGroceries, {
            props: {
                id: 1,
                home: 'test',
            },
        });

        expect(wrapper.vm.sidebarVisible).toBe(true);
    });

    it('adds a grocery item to selectedItems on add-grocery event', async () => {
        const wrapper = mount(AddGroceries, {
            props: {
                id: 1,
                home: 'test',
            },
        });

        await wrapper.vm.$nextTick();

        const sampleItem = {
            "groceryItemId": 6,
            "name": "Gulrøtt",
            "expectedShelfLife": 30,
            "actualShelfLife": 0,
            "imageLink": "https://bilder.kolonial.no/produkter/840c1ecf-12aa-427b-909c-226568c4f5de.jpg?auto=format&fit=max&w=500&s=05bff6f537c33ab4425279c066b9b251",
            "amount": 0,
            "category": {
                "category": 3,
                "name": "Frukt og grønt",
                "unit": "kg"
            }
        };

        wrapper.vm.addGroceryToSelected(sampleItem);

        expect(wrapper.vm.selectedItems).toHaveLength(1);
    });

    it('emits addSelected event when sendSelected is called', async () => {
        const wrapper = mount(AddGroceries, {
            props: {
                id: 1,
                home: 'test',
            },
        });

        await wrapper.vm.$nextTick();

        wrapper.vm.sendSelected();

        expect(wrapper.emitted('addSelected')).toBeTruthy();
    });

    it('emits close event when closeAdPage is called', async () => {
        const wrapper = mount(AddGroceries, {
            props: {
                id: 1,
                home: 'test',
            },
        });

        await wrapper.vm.$nextTick();

        wrapper.vm.closeAdPage();

        expect(wrapper.emitted('close')).toBeTruthy();
    });
});
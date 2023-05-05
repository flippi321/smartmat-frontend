import { createApp } from 'vue';
import { describe, it, beforeEach, expect } from 'vitest';
import { createStore } from 'vuex';
import { mount } from '@vue/test-utils';
import joinHouseholdComponent from '@/components/joinHouseholdComponent.vue';

describe('joinHouseholdComponent.vue', () => {
    let wrapper;

    beforeEach(() => {
        const store = createStore({
            modules: {}
        });

        const app = createApp({});
        app.use(store);

        wrapper = mount(joinHouseholdComponent, {
            global: {
                plugins: [store]
            }
        });
    });

    it('renders the correct initial markup', () => {
        expect(wrapper.html()).toContain('Velkommen!');
        expect(wrapper.html()).toContain('Bli med i en Husholdning');
        expect(wrapper.html()).toContain('Eller lag din egen');
    });

    it('emits joinHousehold event with the correct payload when joinHousehold is called with a valid householdCode', async () => {
        await wrapper.setData({ householdCode: '123456' });
        wrapper.vm.joinHousehold();
        expect(wrapper.emitted()).toHaveProperty('joinHousehold');
        expect(wrapper.emitted().joinHousehold[0]).toEqual(['123456']);
    });

    it('shows an alert when joinHousehold is called with an invalid householdCode', async () => {
        const originalAlert = window.alert;
        let alertCalled = false;
        let alertMessage = null;
        window.alert = (msg) => {
            alertCalled = true;
            alertMessage = msg;
        };

        await wrapper.setData({ householdCode: '12345' });
        wrapper.vm.joinHousehold();
        expect(alertCalled).toBe(true);
        expect(alertMessage).toBe('Vennligst bruk en valid husholdningskode på 6 siffer');

        window.alert = originalAlert;
    });

    it('emits createHousehold event with the correct payload when createHousehold is called with valid input values', async () => {
        await wrapper.setData({
            householdName: 'Test Household',
            fridgeName: 'Test Fridge',
            shoppingListName: 'Test Shopping List'
        });

        wrapper.vm.createHousehold();
        expect(wrapper.emitted()).toHaveProperty('createHousehold');
        expect(wrapper.emitted().createHousehold[0]).toEqual([
            {
                name: 'Test Household',
                fridge: {
                    name: 'Test Fridge'
                },
                shoppinglist: {
                    name: 'Test Shopping List'
                }
            }
        ]);
    });

    it('checks if input fields are initially empty', () => {
        const householdCodeInput = wrapper.find('input[name="household-code"]');
        const householdNameInput = wrapper.find('input[name="household-name"]');
        const fridgeNameInput = wrapper.find('input[name="fridge-name"]');
        const shoppingListNameInput = wrapper.find('input[name="shoppinglist-name"]');

        expect(householdCodeInput.element.value).toBe('');
        expect(householdNameInput.element.value).toBe('');
        expect(fridgeNameInput.element.value).toBe('');
        expect(shoppingListNameInput.element.value).toBe('');
    });

    it('updates input values correctly when user types', async () => {
        const householdCodeInput = wrapper.find('input[name="household-code"]');
        const householdNameInput = wrapper.find('input[name="household-name"]');
        const fridgeNameInput = wrapper.find('input[name="fridge-name"]');
        const shoppingListNameInput = wrapper.find('input[name="shoppinglist-name"]');

        await householdCodeInput.setValue('654321');
        await householdNameInput.setValue('My Household');
        await fridgeNameInput.setValue('My Fridge');
        await shoppingListNameInput.setValue('My Shopping List');

        expect(wrapper.vm.householdCode).toBe('654321');
        expect(wrapper.vm.householdName).toBe('My Household');
        expect(wrapper.vm.fridgeName).toBe('My Fridge');
        expect(wrapper.vm.shoppingListName).toBe('My Shopping List');
    });

    it('disables the joinHousehold button when the householdCode input is empty', async () => {
        const householdCodeInput = wrapper.find('input[name="household-code"]');
        const joinHouseholdButton = wrapper.find('button[type="submit"]');

        await householdCodeInput.setValue('');

        expect(joinHouseholdButton.element.disabled).toBe(true);
    });
});
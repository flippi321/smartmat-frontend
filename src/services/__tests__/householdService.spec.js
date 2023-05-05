import { describe, it, afterEach, expect } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import householdService from '@/services/householdService';
const axiosMock = new MockAdapter(axios);

describe('householdService', () => {
    afterEach(() => {
        axiosMock.reset();
    });

    const token = 'sample-token';
    sessionStorage.setItem('token', token);
    const url = 'http://localhost:8080';

    it('gets all users from a household', async () => {
        const householdId = 1;
        const response = { data: [{ id: 1, name: 'John Doe' }] };
        axiosMock.onGet(`${url}/api/household/users/${householdId}`).reply(200, response.data);

        const result = await householdService.getAllUsersFromHousehold(householdId);
        expect(result.data).toEqual(response.data);
    });

    it('creates a household', async () => {
        const userId = 1;
        const householdInfo = { name: 'My Household' };
        const response = { data: { id: 1, ...householdInfo } };
        axiosMock.onPost(`${url}/api/household/create/${userId}`).reply(200, response.data);

        const result = await householdService.createHousehold(userId, householdInfo);
        expect(result.data).toEqual(response.data);
    });

    it('joins a household', async () => {
        const userId = 1;
        const invitationNr = '123456';
        const response = { data: 'User joined successfully' };
        axiosMock.onPost(`${url}/api/household/addNewUser/${userId}/${invitationNr}`).reply(200, response.data);

        const result = await householdService.joinHousehold(userId, invitationNr);
        expect(result.data).toEqual(response.data);
    });

    it('gets a user\'s household', async () => {
        const userId = 1;
        const response = { data: { id: 1, name: 'My Household' } };
        axiosMock.onGet(`${url}/api/household/byUser/${userId}`).reply(200, response.data);

        const result = await householdService.getUsersHousehold(userId);
        expect(result.data).toEqual(response.data);
    });

    it('gets a household by id', async () => {
        const householdId = 1;
        const response = { data: { id: 1, name: 'My Household' } };
        axiosMock.onGet(`${url}/api/household/${householdId}`).reply(200, response.data);

        const result = await householdService.getHouseholdById(householdId);
        expect(result.data).toEqual(response.data);
    });

    it('updates a household', async () => {
        const householdId = 1;
        const householdInfo = { name: 'Updated Household' };
        const response = { data: { id: 1, ...householdInfo } };
        axiosMock.onPut(`${url}/api/household/update/${householdId}`).reply(200, response.data);

        const result = await householdService.updateHouseHold(householdId, householdInfo);
        expect(result.data).toEqual(response.data);
    });
});
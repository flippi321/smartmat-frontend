import { describe, it, beforeEach, afterEach, expect } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import fridgeService from '@/services/fridgeService';

describe('fridgeService', () => {
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    it('should get fridge contents', async () => {
        const fridgeId = 1;
        const responseData = [
            { id: 1, name: 'item1', category: 'fruits' },
            { id: 2, name: 'item2', category: 'vegetables' },
        ];

        mock.onGet(`http://localhost:8080/api/groceryItems/fridge/${fridgeId}`).reply(200, responseData);

        const response = await fridgeService.getFridgeContents(fridgeId);
        expect(response.data).toEqual(responseData);
    });

    it('should get categories from fridgeId', async () => {
        const responseData = ['fruits', 'vegetables', 'dairy'];

        mock.onGet('http://localhost:8080/api/categories/all').reply(200, responseData);

        const response = await fridgeService.getCategoriesFromFridgeId();
        expect(response.data).toEqual(responseData);
    });

    it('should add multiple items to a fridge', async () => {
        const fridgeId = 1;
        const itemsToAdd = [
            { name: 'item1', category: 'fruits' },
            { name: 'item2', category: 'vegetables' },
        ];

        mock
            .onPost(`http://localhost:8080/api/groceryItems/fridge/add/${fridgeId}`)
            .reply(200, { message: 'Items added successfully' });

        const response = await fridgeService.addMultipleItems(fridgeId, itemsToAdd);
        expect(response.data).toEqual({ message: 'Items added successfully' });
    });

    it('should update item details', async () => {
        const fridgeId = 1;
        const updatedItem = { id: 1, name: 'item1', category: 'fruits' };

        mock
            .onPut(`http://localhost:8080/api/groceryItems/fridge/updateItem/${fridgeId}`)
            .reply(200, { message: 'Item updated successfully' });

        const response = await fridgeService.updateItemDetails(fridgeId, updatedItem);
        expect(response.data).toEqual({ message: 'Item updated successfully' });
    });

    it('should remove an item from a fridge', async () => {
        const fridgeId = 1;
        const itemToRemove = { id: 1, name: 'item1', category: 'fruits' };

        mock
            .onDelete(`http://localhost:8080/api/groceryItems/fridge/deleteItem/${fridgeId}`)
            .reply(200, { message: 'Item removed successfully' });

        const response = await fridgeService.removeItem(fridgeId, itemToRemove);
        expect(response.data).toEqual({ message: 'Item removed successfully' });
    });
});

import axios from "axios";
const apiClient = axios.create();
let url = 'http://localhost:8080'

/*
Mocking responses, must be removed:
*/
import MockAdapter from "axios-mock-adapter";
const mock = new MockAdapter(apiClient);
import groceryItems from "@/mockDatabases/grocery-items.json";
import categories from "@/mockDatabases/categories.json"

// Mock any GET request to /fridgeFromId
mock.onGet("/getItemsFromFridge", { params: { id: 1 } }).reply(200, {
    groceryItems,
});


mock.onGet("/getFridgeCategories").reply(200, {
    categories,
});


export default {
    /**
    getFridgeContents(fridgeId){
        return apiClient.get("/getItemsFromFridge", { params: { id: fridgeId } });
    },
    */
    getFridgeContents(fridgeId){
        const options = {
            method: 'GET',
            url: `${url}/api/groceryItems/fridge/${fridgeId}`,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        return axios.request(options);
    },

    /**
    getCategoriesFromFridgeId(){
        return apiClient.get("/getFridgeCategories");
    },
    */
    getCategoriesFromFridgeId(){
        const options = {
            method: 'GET',
            url: `${url}/api/categories/all`,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        return axios.request(options);
    },

    addMultipleItems(fridgeId, itemList){
        const options = {
            method: 'POST',
            url: `${url}/api/groceryItems/fridge/add/${fridgeId}`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: itemList
        };
        return axios.request(options);
    },

    updateItem(fridgeId, groceryItemId){
        const options = {
            method: 'UPDATE',
            url: `${url}/api/groceryItems/fridge/deleteItem/${fridgeId}/${groceryItemId}`,
            headers: {
                'Content-Type': 'application/json',
            }
        };
        return axios.request(options);
    },

    removeItem(fridgeId, groceryItemId){
        const options = {
            method: 'DELETE',
            url: `${url}/api/groceryItems/fridge/deleteItem/${fridgeId}/${groceryItemId}`,
            headers: {
                'Content-Type': 'application/json',
            }
        };
        return axios.request(options);
    },
}
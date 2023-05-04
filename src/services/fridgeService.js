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
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
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
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
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
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
            data: itemList
        };
        return axios.request(options);
    },

    updateItemDetails(fridgeId, groceryItem){
        const options = {
            method: 'PUT',
            url: `${url}/api/groceryItems/fridge/updateItem/${fridgeId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
            data: groceryItem
        };
        return axios.request(options);
    },

    removeItem(fridgeId, groceryItem){
        const options = {
            method: 'DELETE',
            url: `${url}/api/groceryItems/fridge/deleteItem/${fridgeId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
            data: groceryItem
        };
        return axios.request(options);
    },
}
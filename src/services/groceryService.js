import axios from "axios";
const apiClient = axios.create();
let url = 'http://localhost:8080'

/*
Mocking responses, must be removed:
*/
import MockAdapter from "axios-mock-adapter";
const mock = new MockAdapter(apiClient);
import groceryItems from "@/mockDatabases/all-groceries.json";
import categories from "@/mockDatabases/categories.json";

// Mock any GET request to /getAllGroceries
mock.onGet("/getAllGroceries").reply(200, {
    groceryItems,
});

// Mock any GET request to /fridgeFromId
mock.onGet("/getAllCategories").reply(200, {
    categories,
});

export default {
    getAllGroceries(){
        console.log(sessionStorage.getItem("token"));

        const options = {
            method: 'GET',
            url: `${url}/api/groceryItems/all`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
        };
        return axios.request(options);
    },

    getAllCategories(){
        console.log(sessionStorage.getItem("token"));
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
}
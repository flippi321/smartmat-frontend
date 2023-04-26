import axios from "axios";
const apiClient = axios.create();
//let url = 'https://localhost:8000'

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
        return apiClient.get("/getAllGroceries");
    },

    getAllCategories(){
        return apiClient.get("/getAllCategories");
    },
}
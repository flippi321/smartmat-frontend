import axios from "axios";
const apiClient = axios.create();
//let url = 'https://localhost:8000'

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

// Mock any GET request to /fridgeFromId
mock.onGet("/getFridgeCategories").reply(200, {
    categories,
});

export default {
    getFridgeContents(fridgeId){
        return apiClient.get("/getItemsFromFridge", { params: { id: fridgeId } });
    },
    getCategoriesFromFridgeId(){
        return apiClient.get("/getFridgeCategories");
    },
}
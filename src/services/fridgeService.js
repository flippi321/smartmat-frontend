import axios from "axios";
//let url = 'https://localhost:8000'

/*
Mocking responses, must be removed:
*/
import MockAdapter from "axios-mock-adapter";
const mock = new MockAdapter(axios);
import groceryItems from "@/mockDatabases/grocery-items.json";
import categories from "@/mockDatabases/categories.json"

// Mock any GET request to /fridgeFromId
mock.onGet("/getItemsFromFridge").reply(200, {
    groceryItems,
});

// Mock any GET request to /fridgeFromId
mock.onGet("/getFridgeCategories").reply(200, {
    categories,
});

export default {
    getFridgeContents(fridgeId){
        console.log(fridgeId)
        /*
        return(axios.get("/getItemsFromFridge"));
         */
        return(groceryItems);
    },
    getCategoriesFromFridgeId(fridgeId){
        console.log(fridgeId)
        /*
        return(axios.get("/getFridgeCategories"));
         */
        return(categories);
    }
}
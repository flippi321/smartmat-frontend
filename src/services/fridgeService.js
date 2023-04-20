import axios from "axios";
//let url = 'https://localhost:8000'

/*
Mocking responses, must be removed:
*/
import MockAdapter from "axios-mock-adapter";
var mock = new MockAdapter(axios);
import groceryItems from "@/mockDatabases/grocery-items.json";
import categories from "@/mockDatabases/categories.json"

// Mock any GET request to /fridgeFromId
mock.onGet("/getItemsFromFridge", { params: { id: 1 } }).reply(200, {
    groceryItems,
});

// Mock any GET request to /fridgeFromId
mock.onGet("/getCategoriesFromFridge", { params: { id: 1 } }).reply(200, {
    categories,
});

export default {
    getFridgeContents(fridgeId){
        console.log("(contents) fridge id:");
        console.log(fridgeId)
        return(axios.get("/getItemsFromFridge", { params: { id: fridgeId } }));
    },
    getCategoriesFromFridgeId(fridgeId){
        console.log("(category) fridge id:");
        console.log(fridgeId)
        return(axios.get("/getCategoriesFromFridge", { params: { id: fridgeId } }));
    }
}
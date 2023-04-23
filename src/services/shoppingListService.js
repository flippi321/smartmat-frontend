import axios from "axios";
//let url = 'https://localhost:8000'

/*
Mocking responses, must be removed:
*/
import MockAdapter from "axios-mock-adapter";
var mock = new MockAdapter(axios);
import groceryItemsById from "@/mockDatabases/shopping-list-id.json";
import groceryItemsByAlphabet from "@/mockDatabases/shopping-list-alphabetically.json";
import sortingChoices from "@/mockDatabases/sorting-choices.json"

// Mock any GET request to /fridgeFromId
mock.onGet("/getItemsFromShoppingList", { params: { id: 1, sortBy: 1 } }).reply(200, {
    groceryItemsById,
});

// Mock any GET request to /fridgeFromId
mock.onGet("/getItemsFromShoppingList", { params: { id: 1, sortBy: 2 } }).reply(200, {
    groceryItemsByAlphabet,
});

mock.onGet("/getSortingChoices").reply(200, {
    sortingChoices,
})

mock.onGet("/updateShoppingListItem", { params: {data :[ 1, 5, 4 ]}}).reply(200, {
    sortingChoices,
})

export default {
    getShoppingListContents(listId, sortBy){
        return(axios.get("/getItemsFromShoppingList", { params: { id: listId, sortBy: sortBy } }));
    },
    getSortingChoices(){
        return(axios.get("/getSortingChoices"));
    },
    updateShoppingListItem(itemInformation){
        /*
        return(axios.post("/updateShoppingListItem", { params: {data: itemInformation}}))
         */
        return JSON.stringify(itemInformation)
    },
    //TODO Update methods when Database is ready
    sendItemsToFridge(itemInformation){
        //return(axios.post("/moveItemToFridge", itemInformation))
        return JSON.stringify(itemInformation)
    },
    removeItemsFromList(itemInformation){
        //return(axios.post("/removeItemsFromShoppingList", itemInformation))
        return JSON.stringify(itemInformation)
    }
}
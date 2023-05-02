import axios from "axios";
const apiClient = axios.create();
let url = 'http://localhost:8080'

/*
Mocking responses, must be removed:
*/
import MockAdapter from "axios-mock-adapter";
var mock = new MockAdapter(apiClient);
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
    /**
    getShoppingListContents(listId, sortBy){
        return(apiClient.get("/getItemsFromShoppingList", { params: { id: listId, sortBy: sortBy } }));
    },
    */
    getShoppingListContents(listId){
        const options = {
            method: 'GET',
            url: `${url}/api/groceryItems/shoppinglist/${listId}`,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        return axios.request(options);

    },

    getSortingChoices(){
        return(apiClient.get("/getSortingChoices"));
    },

    updateShoppingListItem(itemInformation){
        return(axios.post("/updateShoppingListItem", { params: {data: itemInformation}}))
    },

    addMultipleItems(listId, itemList){
        return(axios.post("/addMultipleItemsToShoppingList", { params: { listId: listId, items: itemList } }))
    },

    sendItemsToFridge(items, shoppingListId, fridgeId){
        const options = {
            method: 'POST',
            url: `${url}/api/groceryItems/transfer/${shoppingListId}/${fridgeId}`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: items
        };
        console.log(options.data)
        return axios.request(options);
    },
    removeItemsFromList(items, shoppingListId){
        const options = {
            method: 'DELETE',
            url: `${url}/api/groceryItems/shoppinglist/deleteItems/${shoppingListId}`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: items
        };
        return axios.request(options);
    },

    addItemToList(shoppingListId, groceryItemId, amount){
        const options = {
            method: 'POST',
            url: `${url}/api/groceryItems/shoppinglist/addItems/${shoppingListId}/${groceryItemId}/${amount}`,
            headers: {
                'Content-Type': 'application/json',
            }
        };
        return axios.request(options);
    }
}
import axios from "axios";
//let url = 'https://localhost:8000'

/*
Mocking responses, must be removed:
*/
import MockAdapter from "axios-mock-adapter";
var mock = new MockAdapter(axios);
import groceryItems from "@/mockDatabases/grocery-items.json";
import sortingChoices from "@/mockDatabases/sorting-choices.json"

// Mock any GET request to /fridgeFromId
mock.onGet("/getItemsFromShoppingList", { params: { id: 1, sortBy: 1 } }).reply(200, {
    groceryItems,
});

mock.onGet("/getSortingChoices").reply(200, {
    sortingChoices,
})

export default {
    getShoppingListContents(listId, sortBy){
        console.log("ID-er:");
        console.log(listId)
        console.log(sortBy)
        return(axios.get("/getItemsFromShoppingList", { params: { id: listId, sortBy: sortBy } }));
    },
    getSortingChoices(){
        return(axios.get("/getSortingChoices"));
    },
    updateShoppingListItem(itemInformation){
        //return(axios.post("/updateShoppingListItem"))
        return itemInformation
    },
    sendItemsToFridge(itemInformation){
        //return(axios.post("/moveItemToFridge", itemInformation))
        return itemInformation
    }
}
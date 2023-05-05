import axios from "axios";
let url = 'http://localhost:8080'

export default {
    /**
     * Gets all items from a shopping list with the given id
     * @param listId the id of the shopping list
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getShoppingListContents(listId){
        const options = {
            method: 'GET',
            url: `${url}/api/groceryItems/shoppinglist/${listId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
        };
        return axios.request(options);

    },

    /**
     * Method for updating an item in a shopping list
     * @param listId the id of the shopping list
     * @param item the item to be updated
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    updateShoppingListItem(listId, item){
        const options = {
            method: 'PUT',
            url: `${url}/api/groceryItems/shoppinglist/updateItem/${listId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
            data: item
        }
        return axios.request(options);
    },

    /**
     * Method for adding multiple items to a shopping list
     * @param listId the id of the shopping list
     * @param itemList the list of items to be added to the shopping list
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    addMultipleItems(listId, itemList){
        const options = {
            method: 'POST',
            url: `${url}/api/groceryItems/shoppinglist/add/${listId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
            data: itemList
        };
        return axios.request(options);
    },

    /**
     * Method for fetching the household info of a household with the given id
     * @param householdId the id of the household
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    fetchHouseholdInfo(householdId){
        const options = {
            method: 'GET',
            url: `${url}/api/households/${householdId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            }
        };
        return axios.request(options);
    },

    /**
     * Method for sending items from a shopping list to a fridge
     * @param items the items to be sent
     * @param shoppingListId the id of the shopping list
     * @param fridgeId the id of the fridge
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    sendItemsToFridge(items, shoppingListId, fridgeId){
        const options = {
            method: 'POST',
            url: `${url}/api/groceryItems/transfer/${shoppingListId}/${fridgeId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
            data: items
        };
        return axios.request(options);
    },

    /**
     * Method for removing items from a shopping list
     * @param items the items to be removed
     * @param shoppingListId the id of the shopping list
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    removeItemsFromList(items, shoppingListId){
        const options = {
            method: 'DELETE',
            url: `${url}/api/groceryItems/shoppinglist/deleteItems/${shoppingListId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
            data: items
        };
        return axios.request(options);
    },

    /**
     * Method for adding an item to a shopping list
     * @param shoppingListId the id of the shopping list
     * @param groceryItemId the id of the grocery item
     * @param amount the amount of the item
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    addItemToList(shoppingListId, groceryItemId, amount){
        const options = {
            method: 'POST',
            url: `${url}/api/groceryItems/shoppinglist/addItems/${shoppingListId}/${groceryItemId}/${amount}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            }
        };
        return axios.request(options);
    }
}
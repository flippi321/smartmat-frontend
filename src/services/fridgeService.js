import axios from "axios";
let url = 'http://localhost:8080'

export default {

    /**
     * Get contents of a given fridge
     * @param fridgeId id of fridge
     * @returns {Promise<axios.AxiosResponse<any>>}
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
     * Get all categories
     * @returns {Promise<axios.AxiosResponse<any>>}
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

    /**
     * Method to add multiple items to a fridge
     * @param fridgeId id of fridge
     * @param itemList list of items to add
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
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

    /**
     * Method for updating the details of a grocery item in a fridge
     * @param fridgeId id of fridge
     * @param groceryItem item to update
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
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

    /**
     * Method for removing an item from a fridge
     * @param fridgeId id of fridge
     * @param groceryItem item to remove
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
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
import axios from "axios";
let url = 'http://localhost:8080'

export default {

    /**
     * Method for getting all grocery items
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getAllGroceries(){

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

    /**
     * Method for getting all categories
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getAllCategories(){
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
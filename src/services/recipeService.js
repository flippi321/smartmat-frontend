import axios from "axios";
let url = 'http://localhost:8080'


/*
Sending API Calls to server
 */
export default {

    /**
     * Get recommended recipes based on fridge and number of portions
     * @param fridgeId id of fridge
     * @param nrOfPortions number of portions
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getRecipes(fridgeId, nrOfPortions) {
        const options = {
            method: 'GET',
            url: `${url}/api/recipes/recommender/${fridgeId}/${nrOfPortions}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
        };
        return axios.request(options);
    },

    /**
     * Get a recipe by id
     * @param recipeId id of recipe
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getRecipeById(recipeId) {
        const options = {
            method: 'GET',
            url: `${url}/api/recipes/${recipeId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
        };
        return axios.request(options);
    }
};

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
    },

    /**
     * Get all the missing ingredients from a fridge when making a recipie with a specified portions
     * @param fridgeId the id of the fridge
     * @param recipeId the id of the recipie
     * @param portions the amount of portions made
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getMissingIngredients(fridgeId, recipeId, portions) {
        const options = {
            method: 'GET',
            url: `${url}/api/recipes/missingIngredients/${fridgeId}/${recipeId}/${portions}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
        };
        return axios.request(options);
    },
};

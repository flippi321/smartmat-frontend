import axios from "axios";
let url = 'http://localhost:8080'


export default {

    /**
     * Get recommended weekly menu of recipes based on fridge and number of portions
     * @param fridgeId id of fridge
     * @param nrOfPortions number of portions
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    generateWeeklyMenu(fridgeId, nrOfPortions){
        const options = {
            method: 'GET',
            url: `${url}/api/recipes/weekRecommender/${fridgeId}/${nrOfPortions}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
        };
        return axios.request(options);
    },

    /**
     * Get the missing ingredients of a recipe based on fridge and number of portions
     * @param fridgeId id of fridge
     * @param recipeId id of recipe
     * @param nrOfPortions number of portions
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getMissingIngredients(fridgeId, recipeId, nrOfPortions){
        const options = {
            method: 'GET',
            url: `${url}/api/recipes/missingIngredients/${fridgeId}/${recipeId}/${nrOfPortions}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
        };
        return axios.request(options);
    }

}


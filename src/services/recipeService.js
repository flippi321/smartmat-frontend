import axios from "axios";
let url = 'http://localhost:8080'


/*
Sending API Calls to server
 */
export default {
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

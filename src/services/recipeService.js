import axios from "axios";
const apiClient = axios.create();
let url = 'http://localhost:8080'


/*
Mocking responses, must be removed:
*/
import MockAdapter from "axios-mock-adapter";
import recipes from "@/mockDatabases/recipes.json";
import recipeItem from "@/mockDatabases/recipe-item.json";

// Set up the mock adapter with the new axios instance
const mock = new MockAdapter(apiClient);

mock.onGet("/getRecipes", { params: { id: 1 } }).reply(200, {
    recipes,
});

mock.onGet("/getRecipeById", { params: { id: 1 } }).reply(200, {
    recipeItem,
});

/*
Sending API Calls to server
 */
export default {
    getRecipes(fridgeId) {
        //return apiClient.get("/getRecipes", { params: { id: householdId } });
        const options = {
            method: 'GET',
            url: `${url}/api/recipes/recommender/${fridgeId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
        };
        return axios.request(options);
    },

    /**
    getRecipeById(recipeId) {
        return apiClient.get("/getRecipeById", { params: { id: recipeId } });
    },
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

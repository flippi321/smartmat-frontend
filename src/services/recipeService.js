import axios from "axios";
const apiClient = axios.create();
//let url = 'https://localhost:8000'


/*
Mocking responses, must be removed:
*/
import MockAdapter from "axios-mock-adapter";
import recipes from "@/mockDatabases/recipes.json";
import recipeItem from "@/mockDatabases/recipe-item.json";

// Set up the mock adapter with the new axios instance
const mock = new MockAdapter(apiClient);

mock.onGet("/getRecipes").reply(config => {
    const { id } = config.params;
    if (id === 1) {
        return [200, recipes];
    } else {
        return [400, { message: "Household not found" }];
    }
});

mock.onGet("/getRecipeById").reply(config => {
    const { id } = config.params;
    if (id === 1) {
        return [200, recipeItem];
    } else {
        return [404, { message: "Recipe not found" }];
    }
});

/*
Sending API Calls to server
 */
export default {
    getRecipes(householdId) {
        return apiClient.get("/getRecipes", { params: { id: householdId } });
    },

    getRecipeById(recipeId) {
        return apiClient.get("/getRecipeById", { params: { id: recipeId } });
    },
};

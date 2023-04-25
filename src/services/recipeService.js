import axios from "axios";
//let url = 'https://localhost:8000'

/*
Mocking responses, must be removed:
*/
import MockAdapter from "axios-mock-adapter";
var mock = new MockAdapter(axios);

import recipes from "@/mockDatabases/recipes.json";
import recipeItem from "@/mockDatabases/recipe-item.json";

mock.onGet("/getRecipes", { params: { id: 1 } }).reply(200, {
    recipes,
});

mock.onGet("/getRecipes", { params: { id: 1 } }).reply(200, {
    recipeItem,
});

export default {
    getRecipes(householdId){
        return(axios.get("/getRecipes", { params: { id: householdId } }));
    },

    getRecipieById(recipieId){
        return(axios.get("/getRecipieById", { params: {id: recipieId} } ));
    }
}



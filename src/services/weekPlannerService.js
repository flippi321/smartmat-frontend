import axios from "axios";
//let url = 'https://localhost:8000'

/*
Mocking responses, must be removed:
*/
import MockAdapter from "axios-mock-adapter";
var mock = new MockAdapter(axios);

import recipes from "@/mockDatabases/recipes.json";

mock.onGet("/generateWeeklyMenu", { params: { id: 1 } }).reply(200, recipes);


export default {
    generateWeeklyMenu(householdId){
        return(axios.get("/generateWeeklyMenu", { params: { id: householdId } }));
    }
}



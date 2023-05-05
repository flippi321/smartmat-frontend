import axios from "axios";
let url = 'http://localhost:8080'


export default {
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


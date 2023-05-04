import axios from "axios";
let url = 'http://localhost:8080'


export default {
    generateWeeklyMenu(fridgeId){
        const options = {
            method: 'GET',
            url: `${url}/api/recipes/weekRecommender/${fridgeId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
        };
        return axios.request(options);
    },

    getMissingIngredients(fridgeId, recipeId){
        const options = {
            method: 'GET',
            url: `${url}/api/recipes/missingIngredients/${fridgeId}/${recipeId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
        };
        return axios.request(options);
    }

}


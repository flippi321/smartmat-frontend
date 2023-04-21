<template>
    <div class="box-container">
        <h1 id="header">Middagsforslag</h1>
        <div id="recipe-container">
            <div class="input-container">
                <label id="nrOfPeopleLabel" for="nrOfPeople">Antall personer:</label>
                <input type="number" id="nrOfPeople" v-model="nrOfPeople">
            </div>
            <div class="grid-container">
                <div class="grid-item" v-for="recipe in recipes" :key="recipe.id">
                    <h3 id="recipeName">{{ recipe.name }}</h3>
                    <img id="recipeImg" src="https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80"
                         alt="alternatetext" width="200">
                    <p id="recipeDescription">{{ recipe.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import recipeService from "@/services/recipeService";

export default {
    data() {
        return {
            recipes: [],
            nrOfPeople: 0,
        };
    },
    created() {
        recipeService.getRecipes().then(response => {
            this.recipes = response.data.recipes.recipes;
        });
    },
};
</script>

<style>
body{
    margin-top: 100px;
}

.box-container {
    max-width: 800px;
    margin: 0 auto;
}

#recipe-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#header {
    font-size: 32px;
    margin-bottom: 40px;
}

.input-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
}

#nrOfPeopleLabel {
    font-size: 24px;
    margin-right: 10px;
}

#nrOfPeople {
    width: 60px;
    height: 40px;
    border-radius: 5px;
    border: none;
    padding: 0 10px;
    font-size: 16px;
}

.grid-container {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    width: 100%;
    padding: 20px 0;
}

.grid-item {
    border-radius: 5px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;
    flex: 0 0 auto;
    width: 300px;
    margin-right: 20px;
}

.grid-item:last-of-type {
    margin-right: 0;
}

.grid-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

#recipeName {
    font-size: 24px;
    margin-bottom: 10px;
}

#recipeImg {
    border-radius: 5px;
    margin-bottom: 10px;
    width: 100%;
}

#recipeDescription {
    font-size: 16px;
    color: #666;
}
</style>




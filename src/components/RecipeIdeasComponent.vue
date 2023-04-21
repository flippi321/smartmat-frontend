<template>
    <div class="box-container">
        <h1>Middagsforslag</h1>
        <div id="recipe-container">
            <div class="input-container">
                <label for="nrOfPeople">Antall personer:</label>
                <input type="number" id="nrOfPeople" v-model="nrOfPeople">
            </div>
            <div class="grid-container">
                <div class="grid-item" v-for="recipe in recipes" :key="recipe.id">
                    <h3>{{ recipe.name }}</h3>
                    <img src="https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80"
                         alt="alternatetext" width="200">
                    <p>{{ recipe.description }}</p>
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
.box-container {
    max-width: 800px;
    margin: 0 auto;
}

#recipe-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

h1 {
    font-size: 32px;
    margin-bottom: 40px;
}

.input-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
}

label {
    font-size: 24px;
    margin-right: 10px;
}

input {
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

h3 {
    font-size: 24px;
    margin-bottom: 10px;
}

img {
    border-radius: 5px;
    margin-bottom: 10px;
    width: 100%;
}

p {
    font-size: 16px;
    color: #666;
}
</style>




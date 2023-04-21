<template>
    <div class="box-container">
        <h1>Middagsforslag</h1>
        <div id="recipe-container">
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
import recipes from "@/mockDatabases/recipes.json";

export default {
    data() {
        return {
            recipes: [],
        };
    },
    created() {
        this.recipes = recipes.recipes;
    },
};
</script>

<style>
body {
    margin-top: 100px;
}

.grid-container {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
}

.grid-item {
    flex: 0 0 auto;
    margin-right: 20px;
    scroll-snap-align: start;
    border-radius: 5px;
    padding: 10px;
    text-align: center;
}
</style>

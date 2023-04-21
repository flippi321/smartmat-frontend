<script setup>
defineProps({
    items: {
        type: [],
        required: true
    }
})
</script>

<template>
    <div class="box-container">
        <h1>Middagsforslag</h1>
        <div id="recipe-container">
            <ul>
                <li v-for="recipe in items" :key="recipe.id">{{ recipe.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import recipeService from "@/services/recipeService";

export default {
    data() {
        return {
            recipes: [],
        };
    },
    created() {
        recipeService.getRecipes().then(response => {
            this.recipes = response.data.recipes.recipes;
        });
    }
}
</script>

<style>

</style>

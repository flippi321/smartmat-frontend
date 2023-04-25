<template>
  <div class="recipe-box">
    <h2>{{ recipe.name }}</h2>
    <p>{{ recipe.description }}</p>
    <h3>Ingredienser</h3>
    <ul>
      <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
        {{ ingredient.amount }} {{ ingredient.unit }} {{ ingredient.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import recipeService from "@/services/recipeService";

export default {
  data() {
    return {
      recipe: {}
    };
  },
  methods: {
    getRecipe(id) {
      recipeService.getRecipieById(id).then(response => {
        this.recipe = response.data;
      });
    }
  },
  mounted() {
    this.getRecipe(1); // Replace 1 with the actual recipe ID
  }
};
</script>

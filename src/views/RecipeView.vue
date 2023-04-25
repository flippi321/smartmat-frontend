<script setup>
import Recipe from '../components/RecipeComponent.vue'
</script>

<template>
  <div class="recipe">
    <Recipe/>
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
      recipeService.getRecipeById(id).then(response => {
        this.recipe = response.data;
      });
    }
  },
  mounted() {
    this.getRecipe(this.id);
  }
};
</script>
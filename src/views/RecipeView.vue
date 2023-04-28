<script setup>
import Recipe from '../components/RecipeComponent.vue'
import { defineProps } from 'vue'

defineProps({
  id: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div class="recipe">
    <Recipe :recipe="recipe"/>
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
          console.log(response.data)
        this.recipe = response.data;
      });
    }
  },
  mounted() {
    this.getRecipe(this.id);
  }
};
</script>
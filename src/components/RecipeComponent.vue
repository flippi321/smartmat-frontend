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

<style scoped>
.recipe-box {
  max-width: 600px;
  margin: 0 auto;
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.recipe-box h2,
.recipe-box h3 {
  margin-bottom: 10px;
}
.recipe-box p {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
}
.recipe-box ul {
  list-style-type: none;
  padding: 0;
}
.recipe-box li {
  font-size: 14px;
  margin-bottom: 5px;
}
.recipe-box li::before {
  content: "• ";
  color: #3a3a3a;
}

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

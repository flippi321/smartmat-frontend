<template>
  <div class="recipe-box" v-if="Object.keys(recipe).length > 0">
    <h2>{{ recipe.name }}</h2>
    <img class="recipeImg" :src="recipe.imageLink" :alt="recipe.description" />
    <p>{{ recipe.description }}</p>
    <div class="portion-control">
      <label for="portions">Porsjoner:</label>
      <input
          type="number"
          id="portions"
          v-model.number="portions"
          min="1"
          step="1"
      />
    </div>
    <h3>Ingredienser</h3>
    <ul>
      <li
          v-for="(ingredient, index) in adjustedIngredients"
          :key="index"
      >
        {{ ingredient.amount }} {{ ingredient.unit }} {{ ingredient.name }}
      </li>
    </ul>
    <h3>Fremgangsmåte</h3>
      <ol>
          <li v-for="(step, index) in recipe.steps" :key="index">
              {{ step }}
          </li>
      </ol>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores';
import pinia from '@/stores';

export default {
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  data() {
    const store = useAuthStore(pinia);
    return {
      portions: store.getNrOfPortions,
    };
  },
  computed: {
    adjustedIngredients() {
      return this.recipe.ingredients.map((ingredient) => {
        const adjustedAmount = ingredient.amount * this.portions;
        const roundedAmount = Math.round(adjustedAmount * 4) / 4;
        return { ...ingredient, amount: roundedAmount };
      });
    },
  },
};
</script>


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
.recipe-box ul li {
  font-size: 14px;
  margin-bottom: 5px;
}
.recipe-box ul li::before {
  content: "• ";
  color: #3a3a3a;
}

.portion-control {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.portion-control label {
  margin-right: 10px;
  font-weight: bold;
}
.portion-control input {
  width: 50px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 6px;
}

.recipeImg {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
    margin-bottom: 20px;
    border-radius: 5px;
}
</style>

<script setup>
import { defineProps, ref, computed } from 'vue'

const props = defineProps({
  recipe: {
    type: Object,
    required: true,
  },
})

const portions = ref(4)

const adjustedIngredients = computed(() => {
  return props.recipe.ingredients.map(ingredient => {
    const adjustedAmount = ingredient.amount * portions.value
    const roundedAmount = Math.round(adjustedAmount * 4) / 4
    return { ...ingredient, amount: roundedAmount }
  })
})
</script>

<template>
  <div class="recipe-box" v-if="Object.keys(recipe).length > 0">
    <h2>{{ recipe.name }}</h2>
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
</style>

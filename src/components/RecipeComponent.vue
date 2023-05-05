<template>
  <div class="container">
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
      <button class="spis-button" @click="removeItemsFromFridge">Spis</button>
    </div>
    <div class="missing-ingredients-box" v-if="Object.keys(recipe).length > 0">
      <h3>Manglende ingredienser</h3>
      <ul>
        <li
            v-for="(ingredient, index) in missingIngredients"
            :key="'missing-' + index"
        >
          {{ ingredient.amount }} {{ ingredient.unit }} {{ ingredient.name }}
        </li>
      </ul>
      <button @click="addToShoppingList">Legg varer til Handleliste</button>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores';
import pinia from '@/stores';
import recipeService from "@/services/recipeService";
import householdService from "@/services/householdService";

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
      store: useAuthStore(),
      fridgeId: -1,
      portions: store.getNrOfPortions,
      missingIngredients: [],
      requiredItems: [],
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
  watch: {
    portions() {
      this.findMissingIngredients();
    },
  },
  methods: {
    findMissingIngredients() {
      recipeService.getMissingIngredients(this.fridgeId, this.recipe.recipe_id, this.portions).then(response => {
        if (response.data && response.data.length > 0) {
          this.requiredItems = response.data[1].ingredients;
          this.missingIngredients = response.data[0].ingredients.map(ingredient => {
            const roundedAmount = Math.round(ingredient.amount * 4) / 4;
            return { ...ingredient, amount: roundedAmount };
          });
        } else {
          this.missingIngredients = [];
          this.requiredItems = [];
        }
        console.log(response.data);
      }).catch(error => {
        console.log(error);
      });
    },

    findFridge(){
      if(this.store.getHousehold !== -1){
        householdService.getUsersHousehold(this.store.getUserId).then(response => {
          this.fridgeId = response.data.fridge.fridgeId;
          this.findMissingIngredients();
        })
      } else {
        this.$router.push("/joinHousehold")
      }
    },

    removeItemsFromFridge(){
      console.log(this.requiredItems)
      recipeService.removeFromFridge(this.fridgeId, this.requiredItems).then(response => {
        this.$router.push("/fridge")
        console.log(response)
      })
    }
  },

  created() {
    this.findFridge();
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.recipe-box,
.missing-ingredients-box {
  max-width: 600px;
  margin: 0 10px;
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.missing-ingredients-box {
  display: flex;
  flex-direction: column;
}

.missing-ingredients-box ul {
  list-style-type: none;
  padding: 0;
}

.missing-ingredients-box ul li {
  font-size: 14px;
  margin-bottom: 5px;
}

.missing-ingredients-box ul li::before {
  content: "• ";
  color: #3a3a3a;
}

.missing-ingredients-box button {
  margin-top: auto;
  padding: 8px 12px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

@media (max-width: 767px) {
  .container {
    flex-direction: column;
    align-items: center;
  }

  .recipe-box,
  .missing-ingredients-box {
    margin-bottom: 20px;
  }
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

.spis-button {
  margin-top: 20px;
  padding: 8px 12px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>

<template>
    <div class="box-container">
        <h1 class="header">Middagsforslag</h1>
        <div class="recipe-container">
            <div class="input-container">
                <label class="nrOfPeopleLabel" for="nrOfPeople">Antall personer:</label>
                <input type="number" id="nrOfPeople" v-model="nrOfPeople">
            </div>
            <div class="scroll-container">
                <div class="recipeList grid-container">
                    <router-link class="grid-item" v-for="recipe in recipes" :key="recipe.recipe_id" :to="{ path: `/recipe`, query: { id: recipe.recipe_id } }">
                        <h3 class="recipeName">{{ recipe.name }}</h3>
                        <img class="recipeImg" :src="recipe.imageLink"
                             :alt="recipe.name" width="200">
                        <p class="recipeDescription">{{ recipe.description }}</p>
                        <p class="nrOfIngredients">{{ availableIngredientsMap[recipe.recipe_id]?.available }}/{{ availableIngredientsMap[recipe.recipe_id]?.total }} ingredienser</p>
                    </router-link>
                </div>
                <button class="scroll-button" @click="scrollRight">››</button>
            </div>
        </div>
    </div>
</template>


<script>
import recipeService from "@/services/recipeService";
import {useAuthStore} from "@/stores";
import pinia from "@/stores";
import weekPlannerService from "@/services/weekPlannerService";
import {set} from "@vueuse/core";
import householdService from "@/services/householdService";
const store = useAuthStore(pinia);

export default {
    data() {
        return {
            store: useAuthStore(),
            recipes: [],
            fridgeId: -1,
            nrOfPeople: store.getNrOfPortions,
            availableIngredients: {},
        };
    },

    computed: {
        availableIngredientsMap() {
            return this.availableIngredients;
        },
    },

    methods: {
        getFridgeAndDisplayRecipes(){
          //Fetch fridge from household if it exists
          if(this.store.getHousehold !== -1){
            householdService.getUsersHousehold(this.store.getUserId).then(response => {
              this.fridgeId = response.data.fridge.fridgeId;

              // With this fridgeId we fetch recipes we can make with its contents
              recipeService.getRecipes(this.fridgeId, this.nrOfPeople).then((response) => {
                this.recipes = response.data;
                this.recipes.forEach((recipe) => {
                  this.getMissingIngredients(1, recipe.recipe_id);
                })
              });
            }).catch(error => {
              console.log(error)
            })
          } else {
            this.$router.push("/joinHousehold")
          }
        },

        scrollRight() {
            const gridContainer = this.$el.querySelector('.grid-container');
            const scrollWidth = gridContainer.scrollWidth;
            const currentScroll = gridContainer.scrollLeft;

            // Calculate the remaining scroll width
            const remainingScroll = scrollWidth - currentScroll - gridContainer.clientWidth;

            // If the remaining scroll width is less than the width of a grid-item plus margin,
            // scroll to the beginning, otherwise scroll by the width of a grid-item plus margin
            if (remainingScroll < 320) {
                gridContainer.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            } else {
                gridContainer.scrollBy({
                    top: 0,
                    left: 320,
                    behavior: 'smooth'
                });
            }
        },

        getMissingIngredients(fridgeId, recipeId) {
            weekPlannerService.getMissingIngredients(fridgeId, recipeId, this.nrOfPeople).then((response) => {
                const missingIngredientsResponse = response.data;
                const missingIngredients = missingIngredientsResponse[0].ingredients;
                const recipe = missingIngredientsResponse[1];
                const totalIngredients = recipe.ingredients.length;
                const availableIngredients = totalIngredients - missingIngredients.length;

                set(this.availableIngredientsMap, recipeId, {
                    available: availableIngredients,
                    total: totalIngredients,
                });
            });
        },

    },

    watch: {
        nrOfPeople(newVal) {
            store.setNrOfPortions(newVal);
        },
    },

    created() {
        this.getFridgeAndDisplayRecipes();
    },
};
</script>


<style>
body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    font-family: sans-serif;
    margin-top: 100px;
}

.box-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.recipe-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.header {
    font-size: 2.5vw;
    margin-bottom: 40px;
    color: black;
    text-align: center;
}

.input-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
}

.nrOfPeopleLabel {
    font-size: 1.5vw;
    margin-right: 10px;
}

#nrOfPeople {
    width: 60px;
    height: 40px;
    border-radius: 5px;
    border: none;
    padding: 0 10px;
    font-size: 1vw;
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
    width: 80vw;
    max-width: 300px;
    margin-right: 20px;
}

.grid-item:last-of-type {
    margin-right: 0;
}

.grid-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.recipeName {
    font-size: 1.8vw;
    margin-bottom: 10px;
    color: black;
}

.recipeImg {
    border-radius: 5px;
    margin-bottom: 10px;
    width: 100%;
}

.recipeDescription {
    font-size: 1vw;
    color: #000000;
    margin-bottom: 5px;
}

.nrOfIngredients {
    font-size: 0.8vw;
    color: #000000;
}

.scroll-container {
    position: relative;
    overflow: hidden;
    width: 100%;
}

.scroll-button {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    background: white;
    border: 1px solid #d1d1d1;
    font-size: 24px;
    padding: 5px 10px;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease-in-out;
    outline: none;
    color: #333;
}.scroll-button:hover {
     transform: translateY(-50%) scale(1.1);
     box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
     background-color: #f8f8f8;
 }

.scroll-button:active {
    transform: translateY(-50%) scale(0.95);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

/* Media queries for responsiveness */
@media (max-width: 768px) {
    .header {
        font-size: 4vw;
    }

    .nrOfPeopleLabel {
        font-size: 2.5vw;
    }

    #nrOfPeople {
        font-size: 2vw;
    }

    .recipeName {
        font-size: 3vw;
    }

    .recipeDescription {
        font-size: 2vw;
    }

    .nrOfIngredients {
        font-size: 1.5vw;
    }
}

@media (max-width: 480px) {
    .header {
        font-size: 6vw;
    }

    .nrOfPeopleLabel {
        font-size: 4vw;
    }

    #nrOfPeople {
        font-size: 3vw;
    }

    .recipeName {
        font-size: 5vw;
    }

    .recipeDescription {
        font-size: 3vw;
    }

    .nrOfIngredients {
        font-size: 2vw;
    }
}
</style>

<template>
    <div class="box-container">
        <h1 class="header">Ukeplanlegger</h1>
        <div class="week-container">
            <div class="input-container">
                <label class="nrOfPeopleLabel" for="nrOfPeople">Antall personer:</label>
                <input type="number" id="nrOfPeople" v-model="nrOfPeople">
                <br>
                <button class="btn" @click="generateWeeklyMenu">Generer meny!</button>
            </div>
            <div class="menu-container">
                <router-link
                        v-for="(dinner, index) in weeklyMenu"
                        :key="index"
                        class="dinner-item"
                        :to="{ path: `/recipe`, query: { id: dinner.recipe_id } }"
                >
                    <h3>{{ daysOfWeek[index] }}</h3>
                    <h4 class="recipeName">{{ dinner.name }}</h4>
                    <img class="recipeImg" :src="dinner.imageLink"
                         alt="alternatetext" width="200">
                    <p class="recipeDescription">{{ dinner.description }}</p>
                    <p class="nrOfIngredients">{{ missingIngredientsMap[dinner.recipe_id]?.available }}/{{ missingIngredientsMap[dinner.recipe_id]?.total }} ingredienser</p>

                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import weekPlannerService from "@/services/weekPlannerService";
import  {useAuthStore} from "@/stores";
import pinia from "@/stores";
import {set} from "@vueuse/core";

const store = useAuthStore(pinia);

export default {
    data() {
        return {
            nrOfPeople: store.getNrOfPortions,
            weeklyMenu: [],
            householdId: 1,
            daysOfWeek: [
                "Mandag",
                "Tirsdag",
                "Onsdag",
                "Torsdag",
                "Fredag",
                "Lørdag",
                "Søndag",
            ],
            missingIngredients: {},
        };
    },
    computed: {
        missingIngredientsMap() {
            return this.missingIngredients;
        },
    },

    methods: {
        generateWeeklyMenu() {
            return weekPlannerService.generateWeeklyMenu(1).then((response) => {
                console.log(response.data);
                this.weeklyMenu = response.data;
            });
        },

        getMissingIngredients(fridgeId, recipeId) {
            weekPlannerService.getMissingIngredients(fridgeId, recipeId).then((response) => {
                const missingIngredientsResponse = response.data;
                const missingIngredients = missingIngredientsResponse[0].ingredients;
                const recipe = missingIngredientsResponse[1];
                const totalIngredients = recipe.ingredients.length;
                const availableIngredients = totalIngredients - missingIngredients.length;

                set(this.missingIngredients, recipeId, {
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
        this.generateWeeklyMenu().then(() => {
            this.weeklyMenu.forEach((dinner) => {
                this.getMissingIngredients(this.householdId, dinner.recipe_id);
            });
        });
    },

};
</script>

<style scoped>
.box-container {
    padding: 2rem;
    margin: 1rem;
    border-radius: 4px;
}

.header {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: #333;
}

.week-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.input-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
}

.nrOfPeopleLabel {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: #333;
}

input[type="number"] {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.5rem;
    width: 50%;
    font-size: 1rem;
}

.btn {
    background-color: #1699e1;
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1rem;
    margin: 1rem 0;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s ease-in-out;
}

.btn:hover {
    background-color: #003afa;
}

.menu-container {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1rem;
    margin-top: 1rem;
}

.dinner-item {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 1rem;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.dinner-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #333;
}

h4 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #555;
}

.recipeImg {
    border-radius: 5px;
    margin-bottom: 10px;
    width: 100%;
}

@media (min-width: 1281px) {
    .menu-container {
        grid-template-columns: repeat(7, 1fr);
    }
}

@media (min-width: 769px) and (max-width: 1280px) {
    .menu-container {
        grid-template-columns: repeat(4, 1fr);
    }

    h3 {
        font-size: 1.4rem;
    }

    h4 {
        font-size: 1.1rem;
    }
}

@media (min-width: 481px) and (max-width: 768px) {
    .menu-container {
        grid-template-columns: repeat(3, 1fr);
    }

    h3 {
        font-size: 1.2rem;
    }

    h4 {
        font-size: 1rem;
    }
}

@media (max-width: 480px) {
    .menu-container {
        grid-template-columns: repeat(1, 1fr);
    }

    h3 {
        font-size: 1rem;
    }

    h4 {
        font-size: 0.8rem;
    }

    .input-container {
        margin-bottom: 1rem;
    }

    input[type="number"] {
        width: 100%;
    }
}
</style>


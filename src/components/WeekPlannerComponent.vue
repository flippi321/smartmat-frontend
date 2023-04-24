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
                        :to="{ path: `/recipes`, query: { id: dinner.id } }"
                >
                    <h3>{{ daysOfWeek[index] }}</h3>
                    <h4 class="recipeName">{{ dinner.name }}</h4>
                    <img class="recipeImg" src="https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80"
                         alt="alternatetext" width="200">
                    <p class="recipeDescription">{{ dinner.description }}</p>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import weekPlannerService from "@/services/weekPlannerService";

export default {
    data() {
        return {
            nrOfPeople: 0,
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
        };
    },
    methods: {
        async generateWeeklyMenu() {
            const response = await weekPlannerService.generateWeeklyMenu(this.householdId);

            // Extract the recipes from the response
            const recipes = response.data.recipes;

            // Shuffle the recipes array
            const shuffledRecipes = this.shuffleArray(recipes);

            // Take the first 7 recipes to create the weekly menu
            this.weeklyMenu = shuffledRecipes.slice(0, 7);
        },

        // Fisher-Yates shuffle algorithm
        shuffleArray(array) {
            let currentIndex = array.length,
                temporaryValue,
                randomIndex;

            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        },
    },

    created() {
        this.generateWeeklyMenu();
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

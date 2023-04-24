<template>
    <div class="box-container">
        <h1 class="header">Ukeplanlegger</h1>
        <div class="week-container">
            <div class="input-container">
                <label class="nrOfPeopleLabel" for="nrOfPeople">Antall personer:</label>
                <input type="number" id="nrOfPeople" v-model="nrOfPeople">
                <button @click="generateWeeklyMenu">Generer meny</button>
            </div>
            <div class="menu-container">
                <div
                        v-for="(dinner, index) in weeklyMenu"
                        :key="index"
                        class="dinner-item"
                >
                    <h3>{{ daysOfWeek[index] }}</h3>
                    <h4>{{ dinner.name }}</h4>
                    <img class="recipeImg" src="https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80"
                         alt="alternatetext" width="200">
                    <p>{{ dinner.description }}</p>
                </div>
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
            // Replace this with the actual household ID
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


};
</script>

<style scoped>
.week-container {
    display: flex;
    flex-direction: column;
    align-items: center;
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
    transition: transform 0.2s ease-in-out;
}

.dinner-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: black;
}

h4 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: black;
}

.recipeImg {
    border-radius: 5px;
    margin-bottom: 10px;
    width: 100%;
}

@media (max-width: 768px) {
    h3 {
        font-size: 1.2rem;
    }

    h4 {
        font-size: 1rem;
    }
}

@media (max-width: 480px) {
    h3 {
        font-size: 1rem;
    }

    h4 {
        font-size: 0.8rem;
    }
}
</style>
<template>
  <div class="household-info">
    <h1>Your Household:</h1>
    <h3>Your household has the id: {{ id }}</h3>
  </div>

  <div class="buttons-container">
    <router-link :to="{ path: `/fridge`, query: { id: this.id } }" class="button-primary">
      <img src="@/assets/icons/Fridge.png" alt="[Fridge]" class="household-icon">
      <span class="household-button fridge-button">Kjøleskap</span>
    </router-link>
    <router-link :to="{ path: `/shoppingList`, query: { id: this.id, sortBy: 1 } }" class="button-primary">
      <img src="@/assets/icons/List.png" alt="[Shopping List]" class="household-icon">
      <span class="household-button shopping-list-button">Handleliste</span>
    </router-link>
    <router-link :to="{ path: `/dinnerIdeas`, query: { id: this.id } }" class="button-primary">
      <img src="@/assets/icons/Idea.png" alt="[Dinner Ideas]" class="household-icon">
      <span class="household-button dinner-ideas-button">Middagsideer</span>
    </router-link>
    <router-link :to="{ path: `/weekPlanner`, query: { id: this.id } }" class="button-primary">
      <img src="@/assets/icons/Dinner.png" alt="[Plan Week]" class="household-icon">
      <span class="household-button planner-button">Planlegg Uke</span>
    </router-link>
    <router-link to="/household/admin" class="button-primary">
      <img src="@/assets/icons/Admin.png" alt="[Admin]" class="household-icon">
      <span class="household-button admin-button">Administrer Medlemmer</span>
    </router-link>
  </div>
</template>

<script>
import {useAuthStore} from "@/stores";
export default {
  data(){
    return {
      id: 0,
      store: useAuthStore(),
    }
  },

  created() {
    this.id = this.store.getHousehold;
  }
}
</script>


<style>
.buttons-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(100px, 1fr));
  gap: 20px;
  justify-items: center;
  align-items: center;
  padding: 20px;
}

.button-primary {
  background-color: transparent;
  border: none;
  padding: 0;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  display: inline-flex;
  cursor: pointer;
  width: 100%;
}

.household-button {
  display: inline-flex;
  align-items: center;
  margin-left: 10px;
  font-size: 20px;
}

.household-icon {
  display: inline-block;
  height: 40px;
  width: 40px;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>

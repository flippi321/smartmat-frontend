<script setup>
defineProps({
  id: {
    type: Number,
    required: true,
    validator: (value) => !isNaN(value),
  }
})
</script>

<template>
  <div class="household-info">
    <h1>Your Household:</h1>
    <h3>Your household has the id: {{ id }}</h3>
  </div>

  <div class="buttons-container">
    <router-link to="/Fridge" class="button-primary">
      <img src="@/assets/icons/Fridge.png" alt="[Fridge]" class="icons">
      <span class="button fridge-button">Kjøleskap</span>
    </router-link>
    <router-link to="/createAd" class="button-primary">
      <img src="@/assets/icons/List.png" alt="[Shopping List]" class="icons">
      <span class="button shopping-list-button">Handleliste</span>
    </router-link>
    <router-link to="/createAd" class="button-primary">
      <img src="@/assets/icons/Idea.png" alt="[Dinner Ideas]" class="icons">
      <span class="button dinner-ideas-button">Middagsideer</span>
    </router-link>
    <router-link to="/createAd" class="button-primary">
      <img src="@/assets/icons/Dinner.png" alt="[Plan Week]" class="icons">
      <span class="button planner-button">Planlegg Uke</span>
    </router-link>
    <router-link to="/createAd" class="button-primary">
      <img src="@/assets/icons/Admin.png" alt="[Admin]" class="icons">
      <span class="button admin-button">Administrer Medlemmer</span>
    </router-link>
  </div>
</template>

<style>
body{
  padding-top: 100px;
}

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
  display: inline-block;
  cursor: pointer;
  width: 100%;
}

.icons {
  display: inline-block;
  height: 40px;
  width: 40px;
  margin-bottom: 10px;
}

.button {
  display: block;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
}
</style>

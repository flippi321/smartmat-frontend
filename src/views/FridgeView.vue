<template>
  <div class="about">
    <h1>This is a fridge</h1>
    <div v-for="index in 20" :key="index">
      <h1>This is a fridge</h1>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .about h1 {
    margin-top: 50px; /* Temporary, only to show background and Header functionality */
  }
}
</style>


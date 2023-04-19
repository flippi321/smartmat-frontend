<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <nav>
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/about">About</RouterLink> |
      <RouterLink to="/login">Logg inn</RouterLink>

    </nav>

  <RouterView />
</template>

<style scoped>

</style>

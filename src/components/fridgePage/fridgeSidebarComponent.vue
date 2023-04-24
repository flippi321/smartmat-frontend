<script setup>
defineProps({
  categories: {
    type: [],
    required: true,
  },
  fridgeId: {
    type: Number,
    required: true,
  }
});
</script>

<template>
  <div class="sidebar">
    <h1>Filtrer etter kategorier:</h1>
    <ul>
      <li v-for="category in categories" :key="category.id" @click="changeCategory(category.id)">
        {{ category.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    changeCategory(categoryId){
      this.$emit("changeCategoryById", categoryId);
    },
    removeItemsFromList(){
      this.$emit("removeItems");
    }
  },
}
</script>

<style>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: transparent;
  padding: 20px;
}
</style>
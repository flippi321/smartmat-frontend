<script setup>
defineProps({
  categories: {
    type: Array,
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
      <li v-for="category in categories" :key="category.id" @click="changeCategory(category.id)" class="category-item">
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
  width: 250px;
  background-color: #f8f9fa;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.sidebar h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.sidebar .category-item {
  padding: 10px;
  background-color: #ffffff;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.sidebar .category-item:hover {
  background-color: #e9ecef;
}

.sidebar .category-item:active {
  background-color: #dee2e6;
}
</style>

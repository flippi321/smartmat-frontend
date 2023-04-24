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
    <h1>Categories:</h1>
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
    navigateToItem(itemId) {
      this.$router.push({ path: `/fridgeItem`, query: { itemId } });
    },
    changeCategory(categoryId) {
      this.$router.push({ path: `/fridge`, query: { id: this.fridgeId, category: categoryId } });
    },
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
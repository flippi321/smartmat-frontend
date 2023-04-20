<script setup>
defineProps({
  categories: {
    type: [],
    required: true,
  }
});
</script>

<template>
  <h1>Filter By Category:</h1>
  <ul>
    <li v-for="category in categories" :key="category.id" @click="changeCategory(category.id)">
      {{ category.name }}
    </li>
  </ul>
</template>

<script>
export default {
  methods: {
    navigateToItem(itemId) {
      this.$router.push({ path: `/fridgeItem`, query: { itemId } });
    },
    changeCategory(categoryId) {
      this.$router.push({ path: `/fridge`, query: { id: this.id, category: categoryId } });
    },
  },
}
</script>
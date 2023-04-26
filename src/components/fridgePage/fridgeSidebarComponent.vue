<script setup>
defineProps({
  categories: {
    type: Array,
    required: true,
  }
});
</script>

<template>
  <div class="fridge-sidebar" :class="{ collapsed: isCollapsed }">
    <h1>Filtrer etter kategorier:</h1>
    <img class="collapse-button" src="@/assets/icons/Details.png" alt="Details" @click="toggleSideBar" :style="{ transform: `rotate(${iconRotation}deg)` }" />
    <div class="fridge-sidebar-content" v-if="!isCollapsed">
      <ul v-for="category in categories" :key="category.id" @click="changeCategory(category.id)" class="category-item">
        {{ category.name }}
      </ul>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      isCollapsed: false,
      iconRotation: 90,
    };
  },
  methods: {
    changeCategory(categoryId) {
      this.$emit("changeCategoryById", categoryId);
    },
    removeItemsFromList() {
      this.$emit("removeItems");
    },
    toggleSideBar() {
      this.isCollapsed = !this.isCollapsed;
      this.iconRotation += 180;
      this.$emit('toggle-sidebar', this.isCollapsed);
    }
  },
}
</script>

<style>
.fridge-sidebar {
  position: relative;
  height: 100%;
  flex: 0 0 500px;
  background-image: linear-gradient(white, rgba(255, 255, 255, 0));
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: flex 0.3s;
}

@media screen and (max-width: 768px) {
  .fridge-sidebar {
    flex: 0 0 60px;
    height: auto;
  }
}

.collapse-button {
  position: absolute;
  margin-top: 60px;
  margin-right: 20px;
  height: 50px;
  width: 50px;
  cursor: pointer;
  transition: transform 0.3s;
}

@media screen and (max-width: 768px) {
  .collapse-button {
    position: static;
    margin: 0 auto;
    display: block;
    transform: rotate(270deg);
  }
}

.fridge-sidebar.collapsed {
  flex: 0 0 60px;
}

.fridge-sidebar-content {
  height: 100%;
  overflow-y: auto;
  padding: 0 20px;
}

.fridge-sidebar h1 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.fridge-sidebar ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.fridge-sidebar .collapse-button {
  position: absolute;
  top: -70px;
  right: -30px;
  cursor: pointer;
  transition: transform 0.3s;
}

.fridge-sidebar .category-item {
  padding: 10px;
  background-color: #ffffff;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.fridge-sidebar .category-item:hover {
  background-color: #e9ecef;
}

.fridge-sidebar .category-item:active {
  background-color: #dee2e6;
}
</style>
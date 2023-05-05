<template>
  <div class="fridge-sidebar" :class="{ collapsed: isCollapsed }">
    <h1 v-if="!isCollapsed">Søk:</h1>
    <input type="text" v-if="!isCollapsed" placeholder="Search categories" v-model="searchTerm" @input="emitSearch" class="search-bar" />
    <h1 v-if="!isCollapsed">Filtrer etter kategorier:</h1>
    <img class="collapse-button" src="@/assets/icons/Details.png" alt="Details" @click="toggleSideBar" :style="{ transform: `rotate(${iconRotation}deg)` }" />
    <div class="fridge-sidebar-content" v-if="!isCollapsed">
      <ul v-for="category in sortedCategories" :key="category.category" @click="changeCategory(category.category)" class="category-item">
        {{ category.name }}
      </ul>
    </div>
    <button v-if="!isCollapsed" class="clear-filters-button" @click="clearFilters">Fjern Filtre</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: false,
      iconRotation: 90,
      searchTerm: ''
    };
  },
  props: {
    categories: {
      type: Array,
      required: true,
    }
  },
  computed: {
    sortedCategories() {
      return this.categories.slice().sort((a, b) => a.name.localeCompare(b.name));
    }
  },
  methods: {
    changeCategory(categoryId) {
      this.$emit("filterCategory", categoryId);
    },
    emitSearch() {
      this.$emit("search", this.searchTerm);
    },
    toggleSideBar() {
      this.isCollapsed = !this.isCollapsed;
      this.iconRotation += 180;
      this.$emit('toggle-sidebar', this.isCollapsed);
    },
    clearFilters() {
      this.changeCategory(0);
      this.searchTerm = '';
      this.emitSearch();
    },
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

.search-bar {
  width: 90%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.fridge-sidebar .clear-filters-button {
  margin-top: 150px;
  transition: background-color 0.3s;
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
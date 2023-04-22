<template>
  <div class="filter-bar-container">
    <div class="filter-bar-content">
      <div class="sorting-bar" :class="{ expanded: isExpanded }">
        <div class="header" @click="toggleExpansion">
          <h1>Sort By:</h1>
          <i class="arrow-icon" :class="{ 'arrow-down': !isExpanded, 'arrow-up': isExpanded }"></i>
        </div>
        <ul>
          <li v-for="choice in sortChoices" :key="choice.id" @click="changeSorting(choice.id)">
            {{ choice.name }}
          </li>
        </ul>
      </div>
    </div>
    <div class="buttons-container">
      <button class="shopping-list-button">Button 1</button>
      <button class="shopping-list-button">Button 2</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isExpanded: false,
    };
  },
  props: {
    listId: {
      type: Number,
      required: true,
    },
    sortChoices: {
      type: Array,
      required: true,
    },
  },
  methods: {
    changeSorting(sortingId) {
      this.$router.push({ path: `/shoppingList`, query: { id: this.listId, sortBy: sortingId } });
    },
    toggleExpansion() {
      this.isExpanded = !this.isExpanded;
    },
  },
};
</script>

<style scoped>
.filter-bar-container {
  background-color: white;
  padding: 10px;
  margin-bottom: 10px;
  position: relative;
}

.filter-bar-content {
  height: calc(100vh - 180px);
  overflow-y: auto;
}

.sorting-bar {
  margin: 10px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #f5f5f5;
  cursor: pointer;
}

.arrow-icon {
  width: 12px;
  height: 12px;
  border: solid black;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  transition: transform 0.2s ease-in-out;
}

.arrow-up {
  transform: rotate(-135deg);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.2s ease-in-out;
}

.expanded ul {
  max-height: 200px;
  transition: max-height 0.2s ease-in-out;
}

.buttons-container {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.shopping-list-button {
  width: 100%;
  height: 40px;
  background-color: #007aff;
  color: #fff;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  margin-bottom: 5px;
}

.shopping-list-button:hover {
  background-color: #0051b8;
}

</style>
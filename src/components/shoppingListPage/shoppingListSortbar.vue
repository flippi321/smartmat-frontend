<template>
  <router-link :to="{ path: `/addToShoppingList`, query: { id: this.id } }" class="new-item-button">
    <img src="@/assets/icons/plusSign.png" alt="[Add New]" class="plus-icon">
    <span class="household-button fridge-button">Legg til Mer</span>
  </router-link>
  <div class="filter-bar-container">
    <div class="filter-bar-content">
      <div class="sorting-bar" :class="{ expanded: isExpanded }">
        <div class="header" @click="toggleExpansion">
          <h1>Sort By: {{ selectedChoice }}</h1>
          <i class="arrow-icon" :class="{ 'arrow-down': !isExpanded, 'arrow-up': isExpanded }"></i>
        </div>
        <ul>
          <li v-for="choice in sortChoices" :key="choice.id" @click="changeSorting(choice)">
            {{ choice.name }}
          </li>
        </ul>
      </div>
    </div>
    <div class="buttons-container">
      <button class="shopping-list-button" @click="moveItemsToFridge">Move Selected to Fridge</button>
      <button class="shopping-list-button">Remove selected</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isExpanded: false,
      selectedChoice: '', // add new data property for selected choice
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
    }
  },
  methods: {
    changeSorting(choice) {
      this.selectedChoice = choice.name; // set the selected choice
      this.isExpanded = false; // collapse the dropdown
      this.$emit("changeSortBy", choice.id);
    },
    toggleExpansion() {
      this.isExpanded = !this.isExpanded;
    },
    moveItemsToFridge(){
      this.$emit("moveToFridge")
    }
  },
};
</script>


<style scoped>
.filter-bar-container {
  top: 50px;
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

.new-item-button {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 10px;
  cursor: pointer;
}

.new-item-button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.plus-icon {
  width: 24px;
  height: 24px;
  margin-right: 5px;
}

.household-button {
  font-size: 16px;
  color: #007aff;
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


<template>
  <div class="shopping-list-sidebar" :class="{ collapsed: isCollapsed }">
    <img class="collapse-icon" src="@/assets/icons/Details.png" alt="Details" @click="toggleSidebar" :style="{ transform: `rotate(${iconRotation}deg)` }"/>
    <div v-show="!isCollapsed">
      <div @click="$emit('add-items')" class="new-item-button">
        <img src="@/assets/icons/plusSign.png" alt="[Add New]" class="plus-icon">
        <span class="household-button fridge-button">Legg til Mer</span>
      </div>
      <h1 v-if="!isCollapsed">Søk:</h1>
      <input type="text" v-if="!isCollapsed" placeholder="Search categories" v-model="searchTerm" @input="emitSearch" class="search-bar" />
      <div class="filter-bar-container">
        <div class="buttons-container">
          <button class="move-to-fridge-button button" @click="moveItemsToFridge">Flytt valgte til Kjøleskap</button>
          <button class="remove-selected-button button" @click="removeItemsFromList">Fjern Valgte</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedChoice: '',
      searchTerm: '',
      isCollapsed: false,
      iconRotation: 90,
      isExpanded: false,
    };
  },
  methods: {
    changeSorting(choice) {
      this.selectedChoice = choice.name;
      this.isExpanded = false;
      this.$emit("changeSortBy", choice.id);
    },
    toggleExpansion() {
      this.isExpanded = !this.isExpanded;
    },
    moveItemsToFridge(){
      this.$emit("moveToFridge");
    },
    removeItemsFromList(){
      this.$emit("removeItems");
    },
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
      this.iconRotation += 180;
      this.$emit('toggle-sidebar', this.isCollapsed);
    },
    emitSearch() {
      this.$emit("search", this.searchTerm);
    },
  },
};
</script>

<style scoped>
.shopping-list-sidebar {
  position: relative;
  height: 100%;
  width: 100%;
  min-width: 50px;
  flex: 0 0 500px;
  background-image: linear-gradient(white, rgba(255, 255, 255, 0));
  transition: flex 0.3s;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
}

.shopping-list-sidebar.collapsed {
  flex: 0 0 60px;
}

.collapse-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  height: 50px;
  width: 50px;
  cursor: pointer;
  transition: transform 0.3s;
}

@media screen and (max-width: 768px) {
  .shopping-list-sidebar {
    height: auto;
  }

  .shopping-list-sidebar.collapsed {
    width: 100%;
  }

  .collapse-icon {
    position: static;
    margin: 0 auto;
    display: block;
    transform: rotate(180deg);
  }

  .new-item-button {
    margin-top: 100px;
  }
}

.shopping-list-sidebar:not(.collapsed) .new-item-button,
.shopping-list-sidebar:not(.collapsed) .filter-bar-container {
  padding: 0 20px;
}

.new-item-button {
  position: relative;
  top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 20px;
}

.plus-icon {
  width: 24px;
  height: 24px;
  margin-right: 5px;
}

.household-button {
  font-size: 16px;
}

.filter-bar-container {
  top: 50px;
  padding: 10px;
  margin-bottom: 10px;
  position: relative;
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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
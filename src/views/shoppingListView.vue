<script setup>
defineProps({
  id: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="shopping-list-page">
    <div class="sidebar" v-if="showAddGroceries === false">
      <FilterBar
          :sortChoices="sortingChoices" :list-id="id"
          @moveToFridge="sendSelectedItems"
          @removeItems="removeSelectedItems"
          @add-items="this.showAddGroceries = true"
          @changeSortBy="(n) => changeSorting(n)"
      />
    </div>
    <div class="groceries-container" v-if="showAddGroceries === false">
      <Groceries :items="items" ref="groceries" @saved-changes="updateItem"/>
    </div>
    <addGroceries
        v-if="showAddGroceries === true"
        :id="id"
        :home="'Handleliste'"
        @add-grocery="handleAddGrocery"
        @close="hideGroceryDetailComponent"
    />
  </div>
</template>

<script>
import shoppingListService from "@/services/shoppingListService";
import Groceries from "@/components/shoppingListPage/shoppingListContents.vue"
import FilterBar from "@/components/shoppingListPage/shoppingListSortbar.vue";
import addGroceries from "@/components/addGroceries.vue";

export default {
  components: {
    Groceries,
    FilterBar,
    addGroceries
  },
  data() {
    return {
      id: this.id,
      sortBy: 1,
      items: [],
      sortingChoices: [],
      showAddGroceries: false,
    };
  },
  created() {
    shoppingListService.getShoppingListContents(this.id).then(response => {
      this.items = response.data;
    });

    shoppingListService.getSortingChoices().then(response => {
      this.sortingChoices = response.data.sortingChoices.sortingChoices;
    });
  },

  methods: {
    updateItem(itemData) {
      console.log(shoppingListService.updateShoppingListItem(itemData))
    },
    sendSelectedItems() {
      console.log(shoppingListService.sendItemsToFridge(this.$refs.groceries.$data.currentlySelected));
      this.updateShoppingList()
    },
    removeSelectedItems(){
      console.log(shoppingListService.removeItemsFromList(this.$refs.groceries.$data.currentlySelected));
      this.updateShoppingList()
    },
    changeSorting(sortingId) {
      this.sortBy = sortingId;
      this.updateShoppingList();
    },

    updateShoppingList(){
      shoppingListService.getShoppingListContents(this.id, this.sortBy).then(response => {
        if(response.data.groceryItemsByAlphabet){
          this.items = response.data.groceryItemsByAlphabet.groceries;
        } else if (response.data.groceryItemsById){
          this.items = response.data.groceryItemsById.groceries;
        }
      });
    },

    showAddGroceriesComponent() {
      this.showAddGroceries = true;
    },

    hideGroceryDetailComponent() {
      this.showAddGroceries = false;
    },

    handleAddGrocery(items){
      console.log(items)
    }
  },
};
</script>

<style>
.sidebar {
  margin-top: -10px;
  position: fixed;
  height: 100%;
  width: 400px;
  background-color: white;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
}

.groceries-container {
  margin-top: -30px;
  margin-left: 400px;
  padding: 10px;
}
</style>


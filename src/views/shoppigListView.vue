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
    <div class="sidebar">
      <FilterBar :sortChoices="sortingChoices" :list-id="id" @moveToFridge="sendSelectedItems" @changeSortBy="(n) => changeSorting(n)"/>
    </div>
    <div class="groceries-container">
      <Groceries :items="items" ref="groceries"/>
    </div>
  </div>
</template>


<script>
import shoppingListService from "@/services/shoppingListService";
import Groceries from "@/components/shoppingListPage/shoppingListContents.vue"
import FilterBar from "@/components/shoppingListPage/shoppingListSortbar.vue";

export default {
  components: {
    Groceries,
    FilterBar,
  },
  data() {
    return {
      id: this.id,
      sortBy: 1,
      items: [],
      sortingChoices: [],
    };
  },
  created() {
    shoppingListService.getShoppingListContents(this.id, this.sortBy).then(response => {
      console.log(response.data.groceryItemsById.groceries)
      this.items = response.data.groceryItemsById.groceries;
    });

    shoppingListService.getSortingChoices().then(response => {
      this.sortingChoices = response.data.sortingChoices.sortingChoices;
    });
  },

  methods: {
    sendSelectedItems() {
      /*
      shoppingListService.sendItemsToFridge(JSON.stringify(this.$refs.groceries.$data.currentlySelected)).then(response => {
        console.log(response)
      })
       */
      console.log(shoppingListService.sendItemsToFridge(JSON.stringify(this.$refs.groceries.$data.currentlySelected)))
    },

    changeSorting(sortingId) {
      this.sortBy = sortingId;
      this.updateShoppingList();
    },

    // TODO Temporary to show mockDB, must be replaced when merging with backend
    updateShoppingList(){
      shoppingListService.getShoppingListContents(this.id, this.sortBy).then(response => {
        if(response.data.groceryItemsByAlphabet){
          console.log(response.data.groceryItemsByAlphabet.groceries);
          this.items = response.data.groceryItemsByAlphabet.groceries;
        } else if (response.data.groceryItemsById){
          console.log(response.data.groceryItemsById.groceries);
          this.items = response.data.groceryItemsById.groceries;
        }
      });
    }
  },
};
</script>

<style>
.sidebar {
  position: fixed;
  margin-top: 60px;
  height: 100%;
  width: 400px;
  background-color: white;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
}

.groceries-container {
  margin-left: 400px;
  padding: 10px;
}
</style>
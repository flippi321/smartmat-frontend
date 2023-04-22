<script setup>
defineProps({
  id: {
    type: Number,
    required: true
  },
  sortBy:{
    type: Number,
    required: false
  }
})
</script>

<template>
  <div class="shopping-list-page">
    <div class="sidebar">
      <FilterBar :sortChoices="sortingChoices" :list-id="id" @moveToFridge="sendSelectedItems"/>
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
      items: [],
      sortingChoices: [],
    };
  },
  created() {
    shoppingListService.getShoppingListContents(this.id, this.sortBy).then(response => {
      console.log(response.data.groceryItems.groceries)
      this.items = response.data.groceryItems.groceries;
    });

    shoppingListService.getSortingChoices().then(response => {
      console.log(response.data.sortingChoices)
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
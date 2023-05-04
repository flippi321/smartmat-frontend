<script setup>
defineProps({
  fridgeId: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="fridge-page">
    <Sidebar
        v-if="showAddGroceries === false && this.sidebarVisible === true"
        :categories="categories"
        @search="filterByName"
        @filterCategory="filterByCategory"
        @toggle-sidebar="toggleSideBar"
    />
    <Groceries
        v-if="showAddGroceries === false"
        :items="filteredItems"
        class="fridge-contents"
        @show-filter-bar="this.sidebarVisible = true"
        @hide-filter-bar="this.sidebarVisible = false"
        @addNewItems="showAddGroceriesComponent"
        @updateItem="updateItem"
        @deleteItem="deleteItemFromFridge"
    />
    <addGroceries
        v-if="showAddGroceries === true"
        :id="fridgeId"
        :home="'Kjøleskap'"
        @addSelected="handleAddGrocery"
        @close="hideGroceryDetailComponent"
    />
  </div>
</template>

<script>
import fridgeService from "@/services/fridgeService";
import Groceries from "@/components/fridgePage/fridgeContentsComponent.vue"
import Sidebar from "@/components/fridgePage/fridgeSidebarComponent.vue";
import addGroceries from "@/components/addGroceries.vue";

export default {
  components: {
    Sidebar,
    Groceries,
    addGroceries
  },
  data() {
    return {
      fridgeId: this.fridgeId,
      items: [],
      filteredItems: [],
      categories: [],
      currentCategory: 1,
      sidebarVisible: true,
      detailsIconVisible: false,

      feedback: false,
      feedbackMessage: "",
      feedbackType: "",
      showAddGroceries: false,
    };
  },
  created() {
    fridgeService.getFridgeContents(this.fridgeId).then((response) => {
      console.log("Contents response:")
      this.items = response.data;
      console.log(this.items)
    });
    fridgeService.getCategoriesFromFridgeId(this.fridgeId).then((response) => {
      console.log("Categories response:" + response.data)
      this.categories = response.data;
      console.log(this.categories)
    });
  },

  methods: {
    filterByCategory(category){
      this.currentCategoryId = category;
      this.applyFilters();
    },

    filterByName(name){
      this.currentSearchTerm = name;
      this.applyFilters();
    },

    applyFilters() {
      let filtered = this.items;

      if (this.currentCategoryId !== 0) {
        filtered = filtered.filter(item => item.category.category === this.currentCategoryId);
      }

      if (this.currentSearchTerm && this.currentSearchTerm.trim() !== '') {
        filtered = filtered.filter(item => item.name.toLowerCase().includes(this.currentSearchTerm.toLowerCase()));
      }

      this.filteredItems = filtered;

      this.updateFridge()
    },

    updateFridge(){
      fridgeService.getFridgeContents(this.fridgeId).then((response) => {
        this.items = response.data;
      });
      fridgeService.getCategoriesFromFridgeId().then((response) => {
        this.categories = response.data;
      });
    },

    toggleSideBar(isCollapsed) {
      this.showSideBar = !isCollapsed;
    },

    showAddGroceriesComponent() {
      this.showAddGroceries = true;
    },

    hideGroceryDetailComponent() {
      this.showAddGroceries = false;
      this.updateFridge();
    },

    handleAddGrocery(items){
      fridgeService.addMultipleItems(this.fridgeId, items).then(response => {
        if(response.data().equals(items)){
          console.log("Success");
        }
        else{
          console.log("Error got this:");
          console.log(response.data());
        }
      })
    },

    updateItem(item){
      fridgeService.updateItemDetails(this.fridgeId, item).then(response => {
        console.log(response)
        this.hideGroceryDetailComponent()
      });
    },

    deleteItemFromFridge(item){
      fridgeService.removeItem(this.fridgeId, item.groceryItemId).then(response => {
        console.log(response)
        this.hideGroceryDetailComponent()
      })
    }
  }
};
</script>
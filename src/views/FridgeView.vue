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
import addGroceries from "@/components/AddGroceries.vue";

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
      currentCategory: 0,
      currentSearchTerm: '',
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
      this.items = response.data;
      this.filteredItems = this.items;
    });
    fridgeService.getCategoriesFromFridgeId(this.fridgeId).then((response) => {
      this.categories = response.data;
    });
  },

  methods: {
    filterByCategory(category){
      this.currentCategory = category;
      this.applyFilters();
    },

    filterByName(name){
      this.currentSearchTerm = name;
      this.applyFilters();
    },

    applyFilters() {
      fridgeService.getFridgeContents(this.fridgeId).then((response) => {
        this.items = response.data;
      });

      let filtered = this.items;

      if (this.currentCategory !== 0) {
        filtered = filtered.filter(item => item.category.category === this.currentCategory);
      }

      if ((this.currentSearchTerm && this.currentSearchTerm.trim() !== '') && this.currentSearchTerm !== '') {
        filtered = filtered.filter(item => item.name.toLowerCase().includes(this.currentSearchTerm.toLowerCase()));
      }

      this.filteredItems = filtered;
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
      this.applyFilters();
    },

    handleAddGrocery(items) {
      fridgeService.addMultipleItems(this.fridgeId, items).then(() => {
        this.hideGroceryDetailComponent();
      });
    },

    updateItem(item){
      fridgeService.updateItemDetails(this.fridgeId, item).then(response => {
        console.log(response)
        this.hideGroceryDetailComponent()
      });
    },

    deleteItemFromFridge(item){
      fridgeService.removeItem(this.fridgeId, item).then(response => {
        console.log(response)
        this.hideGroceryDetailComponent()
      })
    }
  }
};
</script>
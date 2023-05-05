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
import householdService from "@/services/householdService";
import {useAuthStore} from "@/stores";

export default {
  components: {
    Sidebar,
    Groceries,
    addGroceries
  },
  data() {
    return {
      store: useAuthStore(),
      fridgeId: 0,
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
    this.getFridgeAndContents();
  },

  methods: {
    getFridgeAndContents(){
      if(this.store.getHousehold !== -1){
        householdService.getUsersHousehold(this.store.getUserId).then(response => {
          this.fridgeId = response.data.fridge.fridgeId;

          fridgeService.getFridgeContents(this.fridgeId).then((response) => {
            this.items = response.data;
            this.filteredItems = this.items;
          });
          fridgeService.getCategoriesFromFridgeId(this.fridgeId).then((response) => {
            this.categories = response.data;
          });
        })
      } else {
        this.router.push("/joinHousehold")
      }
    },

    filterByCategory(category){
      this.currentCategory = category;
      this.applyFilters();
    },

    filterByName(name){
      this.currentSearchTerm = name;
      this.applyFilters();
    },

    applyFilters() {
      let filtered = this.items;

      if (this.currentCategory !== 0) {
        filtered = filtered.filter(item => item.category.category === this.currentCategory);
      }

      if ((this.currentSearchTerm && this.currentSearchTerm.trim() !== '') && this.currentSearchTerm !== '') {
        filtered = filtered.filter(item => item.name.toLowerCase().includes(this.currentSearchTerm.toLowerCase()));
      }

      this.filteredItems = filtered;
    },

    async updateFridge() {
      try {
        const fridgeContentsResponse = await fridgeService.getFridgeContents(this.fridgeId);
        this.items = fridgeContentsResponse.data;

        const categoriesResponse = await fridgeService.getCategoriesFromFridgeId(this.fridgeId);
        this.categories = categoriesResponse.data;

        // Call applyFilters to update the filteredItems array
        this.applyFilters();
      } catch (error) {
        console.log("Error while updating fridge:", error);
      }
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
        this.updateFridge();
        this.hideGroceryDetailComponent();
      });
    },

    updateItem(item){
      fridgeService.updateItemDetails(this.fridgeId, item).then(() => {
        setTimeout(this.updateFridge, 100)
      }).catch(error => {
        console.log(error)
      })
    },

    deleteItemFromFridge(item){
      console.log("Deleting")
      fridgeService.removeItem(this.fridgeId, item).then(() => {
        console.log("Updating Fridge")
        this.updateFridge()
      }).catch(error => {
        console.log(error)
      })
    }
  }
};
</script>
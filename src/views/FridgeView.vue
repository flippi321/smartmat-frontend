<script setup>
defineProps({
  id: {
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
        @changeCategoryById="changeCategory"
        @toggle-sidebar="toggleSideBar"
    />
    <Groceries
        v-if="showAddGroceries === false"
        :items="items"
        class="fridge-contents"
        @show-filter-bar="this.sidebarVisible = true"
        @hide-filter-bar="this.sidebarVisible = false"
        @add-new-items="showAddGroceriesComponent"
    />
    <addGroceries
        v-if="showAddGroceries === true"
        :id="id"
        :home="'Kjøleskap'"
        @add-grocery="handleAddGrocery"
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
      id: this.id,
      items: [],
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
    fridgeService.getFridgeContents(this.id).then((response) => {
      console.log("Contents response:")
      this.items = response.data.groceryItems.groceries;
    });
    fridgeService.getCategoriesFromFridgeId().then((response) => {
      console.log("Categories response:")
      this.categories = response.data.categories.categories;
    });
  },
  methods: {
    handleFeedback2(feedbackInfo) {
      console.log(feedbackInfo)
      this.feedback = feedbackInfo.feedback
      this.feedbackMessage = feedbackInfo.feedbackMessage
      this.feedbackType = feedbackInfo.feedbackType
      setTimeout(() => {
        this.feedback = false;
      }, 6000);
    },

    changeCategory(categoryId){
      this.currentCategory = categoryId;
      this.updateFridge();
    },

    updateFridge(){
      fridgeService.getFridgeContents(this.id).then((response) => {
        console.log("Contents response:")
        this.items = response.data.groceryItems.groceries;
      });
      fridgeService.getCategoriesFromFridgeId().then((response) => {
        console.log("Categories response:")
        this.categories = response.data.categories.categories;
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
    },

    handleAddGrocery(items){
      console.log(items)
    }
  }
};
</script>
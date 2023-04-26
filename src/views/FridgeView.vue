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
        v-if="showAddGroceries === false"
        :categories="categories"
        @changeCategoryById="changeCategory"
        @toggle-sidebar="toggleSideBar"
    />
    <Groceries
        v-if="showAddGroceries === false"
        :items="items"
        class="fridge-contents"
        @showFilterBar="console.log('ShowBar')"
        @hideFilterBar="console.log('ShowBar')"
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
      showSideBar: true,
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

<style>
.fridge-page {
  margin-top: -10px;
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
}

@media screen and (max-width: 768px) {
  .fridge-page {
    flex-direction: column;
  }
}
</style>



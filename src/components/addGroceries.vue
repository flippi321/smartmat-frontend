<script setup>
defineProps({
  id: {
    type: Number,
    required: true
  },
  home: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="fridge-page">
    <Sidebar :categories="categories" @changeCategoryById="changeCategory" @toggle-sidebar="toggleSideBar" />
    <Groceries
        :items="items" class="fridge-contents"
        @showFilterBar="console.log('ShowBar')"
        @hideFilterBar="console.log('ShowBar')"
        @give-feedback2="handleFeedback2"
    />
  </div>
</template>


<script>
import fridgeService from "@/services/fridgeService";
import Groceries from "@/components/addGroceryPage/addContentsComponent.vue"
import Sidebar from "@/components/addGroceryPage/addGrocerySidebarComponent.vue";

export default {
  components: {
    Sidebar,
    Groceries
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



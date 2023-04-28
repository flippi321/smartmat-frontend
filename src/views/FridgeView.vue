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
    <Sidebar :categories="categories" @changeCategoryById="changeCategory" @toggle-sidebar="toggleSideBar" />
    <Groceries
        :items="items" class="fridge-contents"
        @showFilterBar="console.log('ShowBar')"
        @hideFilterBar="console.log('ShowBar')"
        @update-grocery2="handleUpdateGrocery2"
        @delete-grocery2="handleDeleteGrocery2"
        @give-feedback2="handleFeedback2"
    />
  </div>
</template>


<script>
import fridgeService from "@/services/fridgeService";
import Groceries from "@/components/fridgePage/fridgeContentsComponent.vue"
import Sidebar from "@/components/fridgePage/fridgeSidebarComponent.vue";

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
      this.items = response.data;
      console.log(this.items)
    });
    fridgeService.getCategoriesFromFridgeId().then((response) => {
      console.log("Categories response:" + response.data)
      this.categories = response.data;
      console.log(this.categories)
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
        this.items = response.data;
      });
      fridgeService.getCategoriesFromFridgeId().then((response) => {
        console.log("Categories response:")
        this.categories = response.data;
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



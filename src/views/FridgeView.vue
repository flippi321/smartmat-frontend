
<script setup>
// Import Components
import Groceries from "@/components/fridgePage/fridgeContentsComponent.vue"
import Sidebar from "@/components/fridgePage/fridgeSidebarComponent.vue";


// Define Props
defineProps({
  id: {
    type: Number,
    required: true
  }
})

//const emit = defineEmits(["update-grocery2", "delete-grocery2", "give-feedback2"]);

function handleUpdateGrocery2(groceryItem) {
  // Send request to backend to update grocery item in database
  console.log(groceryItem)
}

function handleDeleteGrocery2(groceryItem) {
  // Send request to backend to update grocery item in database
  console.log(groceryItem)
}

</script>

<template>
  <div>
    <FeedbackBoxComponent v-if="feedback" :message="feedbackMessage" :type="feedbackType" />
  </div>
  <div class="fridge-page">
    <transition name="slide">
      <div class="sidebar" v-if="showSideBar">
        <Sidebar :categories="categories" :fridgeId=id @changeCategoryById="changeCategory"></Sidebar>
      </div>
    </transition>
    <div class="groceries-container" :class="{ fullwidth: !showSideBar }">
      <Groceries :items="items"
                 @showFilterBar="showSideBar = true"
                 @hideFilterBar="showSideBar = false"
                 @update-grocery2="handleUpdateGrocery2"
                 @delete-grocery2="handleDeleteGrocery2"
                 @give-feedback2="handleFeedback2"
    />
      />
    </div>
  </div>
</template>

<script>
import fridgeService from "@/services/fridgeService";
import FeedbackBoxComponent from "@/components/FeedbackBoxComponent.vue";
export default {
  components: {
    FeedbackBoxComponent,
  },
  data() {
    return {
      id: this.id,
      items: [],
      categories: [],
      currentCategory: 1,
      showSideBar: true,

      feedback: false,
      feedbackMessage: "",
      feedbackType: "",
    };
  },
  created() {
    this.items = fridgeService.getFridgeContents(this.id).groceries;
    this.categories = fridgeService.getCategoriesFromFridgeId(this.id).categories;



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
      this.items = fridgeService.getFridgeContents(this.id).groceries;
      this.categories = fridgeService.getCategoriesFromFridgeId(this.id).categories;
    }
  }
};
</script>


<style>
.fridge-page {
  margin-top: 80px;
}

.sidebar {
  margin-top: 50px;
  width: 150px;
}

.groceries-container {
  margin-left: 150px;
  transition: margin-left 0.3s;
}

.groceries-container.fullwidth {
  margin-left: 0;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 150px;
  background-color: transparent;
  padding: 20px;
}
ul {
  list-style-type: none;
  padding-left: 0;
}
li {
  cursor: pointer;
}
</style>
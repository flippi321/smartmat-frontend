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
</script>

<template>
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
      />
    </div>
  </div>
</template>

<script>
import fridgeService from "@/services/fridgeService";

export default {
  data() {
    return {
      id: this.id,
      items: [],
      categories: [],
      currentCategory: 1,
      showSideBar: true
    };
  },
  created() {
    this.items = fridgeService.getFridgeContents(this.id).groceries;
    this.categories = fridgeService.getCategoriesFromFridgeId(this.id).categories;
  },
  methods: {
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
.sidebar {
  margin-top: 50px;
  width: 150px;
}

body {
  margin-top: 100px;
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
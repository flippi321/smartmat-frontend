<script setup>
// Import Components
import Groceries from "@/components/fridgePage/fridgeContentsCompoent.vue"
import Sidebar from "@/components/fridgePage/fridgeSidebarComponent.vue";

// Define Props
defineProps({
  id: {
    type: Number,
    required: true
  },
  category:{
    type: Number,
    required: false
  }
})
</script>

<template>
  <div class="fridge-page">
    <div class="sidebar">
    <Sidebar :categories="categories" :fridgeId=this.id></Sidebar>
    </div>
    <div class="groceries-container">
      <Groceries :items="items"></Groceries>
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
    };
  },
  created() {
    fridgeService.getFridgeContents(this.id).then(response => {
      this.items = response.data.groceryItems.groceries;
    });
    fridgeService.getCategoriesFromFridgeId(this.id).then(response => {
      this.categories = response.data.categories.categories;
    });
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
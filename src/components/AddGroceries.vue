<template>
  <div class="fridge-page">
    <Sidebar v-if="this.sidebarVisible === true"
        :categories="categories"
        :selected="this.selectedItems"
        :home="home"
        @changeCategoryById="changeCategory"
        @send-items="sendSelected"
        @cancel="closeAdPage"
    />
    <Groceries
        :items="items"
        class="fridge-contents"
        @show-filter-bar="this.sidebarVisible = true"
        @hide-filter-bar="this.sidebarVisible = false"
        @add-grocery="addGroceryToSelected"
    />
  </div>
</template>


<script>
import fridgeService from "@/services/fridgeService";
import Groceries from "@/components/addGroceryPage/AddContentsComponent.vue"
import Sidebar from "@/components/addGroceryPage/AddGrocerySidebarComponent.vue";
import groceryService from "@/services/groceryService";

export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    home: {
      type: String,
      required: true
    }
  },

  components: {
    Sidebar,
    Groceries
  },
  data() {
    return {
      items: [],
      categories: [],
      selectedItems: [],
      currentCategory: 1,
      sidebarVisible: true,
    };
  },
  created() {
    groceryService.getAllGroceries().then((response) => {
      this.items = response.data;
    });
    groceryService.getAllCategories().then((response) => {
      console.log(response.data)
      this.categories = response.data;
    });
  },
  methods: {
    changeCategory(categoryId){
      this.currentCategory = categoryId;
      this.updateFridge();
    },

    updateFridge(){
      fridgeService.getFridgeContents(this.id).then((response) => {
        this.items = response.data.groceryItems.groceries;
      });
      fridgeService.getCategoriesFromFridgeId().then((response) => {
        this.categories = response.data.categories.categories;
      });
    },

    addGroceryToSelected(item){
      this.selectedItems.push(item)
      this.sidebarVisible = true;
    },

    sendSelected(){
      this.$emit('addSelected', this.selectedItems);
      this.update();
    },

    closeAdPage(){
      this.$emit('close')
    },

    async update() {
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.closeAdPage();
    },
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



<script setup>
import GroceryItemDetails from "@/components/GroceryItemComponent.vue";

defineProps({
  items: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div class="fridge-box-container">
    <div
        class="fridge-box"
        v-for="(item, index) in items"
        :key="index"
        @click="seeDetails(item)"
        :class="{ expanded: expandedItem === item, hidden: expandedItem && expandedItem !== item }"
    >
      <img class="fridge-item-image" :src="item.imageLink" alt="Image" v-if="expandedItem !== item" />
      <div class="fridge-item-info" v-if="expandedItem !== item">
        <h3>{{ item.name }}</h3>
        <p class="description">{{ item.description }}</p>
      </div>
      <transition name="details" class="details-container">
        <GroceryItemDetails class="grocery-details"
            v-if="expandedItem === item" :item="item"
            :accept-message="'Legg til'"
            :decline-message="'Avbryt'"
            @update="addGrocery"
            @decline="showSidebar"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  data() {
    return {
      expandedItem: ref(null),
    }
  },

  methods: {
    seeDetails(item) {
      if(this.expandedItem === null){
        this.expandedItem = item
        this.$emit("hide-filter-bar")
        console.log("Hide sidebar")
      }
    },

    showSidebar(){
      console.log("Show sidebar")
      this.$emit("show-filter-bar");
      this.expandedItem = null;
    },

    addGrocery(groceryItem){
      this.showSidebar()
      this.$emit("add-grocery", groceryItem)
      this.expandedItem = null;
    }
  }
}
</script>

<style>

.fridge-box {
  background-color: white;
  height: 250px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.fridge-item-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: all 0.3s;
  object-position: center;
}

.fridge-item-info {
  font-size: 16px;
  text-align: center;
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.3s;
  background-color: rgba(128, 128, 128, 0.7);
  width: 90%;
  padding: 5px;
  border-radius: 5px;
}

.fridge-box.expanded {
  margin-top: 250px;
  height: 70vh;
  width: 70vw;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.details-container {
  transition: all 0.3s;
}

.fridge-box.hidden {
  display: none;
}

@media screen and (max-width: 768px) {
  .fridge-box {
    height: 40vw;
    width: 40vw;
  }

  .fridge-box.expanded {
    margin-top: 200px;
    height: 65vh !important;
    width: 90vw;
    position: absolute;
    z-index: 10;
  }
}
</style>

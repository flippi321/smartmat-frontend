<script setup>
import { ref } from 'vue';
import FridgeItemDetailsComponent from "@/components/groceryItemComponent.vue";


defineProps({
  items: {
    type: Array,
    required: true
  }
});

// Define Emits
const emit = defineEmits(["showFilterBar", "hideFilterBar", "update-grocery1", "delete-grocery1", "close", "close",
"give-feedback1"]);


function handleUpdateGrocery1(groceryItem) {
  // Send request to backend to update grocery item in database
  emit("update-grocery2", groceryItem);
}
function handleDeleteGrocery1(groceryItem) {
  // Send request to backend to update grocery item in database
  emit("delete-grocery2", groceryItem);
}
const expandedItem = ref(null);

function toggleExpand(item) {
  console.log("toggleExpand")
  expandedItem.value = item;
  emit("hideFilterBar");


}
function toggleRetract(){
  setTimeout(toggleRetractHelper, 100)
}

function toggleRetractHelper(){
  expandedItem.value = null;
  emit("showFilterBar");
}

function handleFeedback1(feedbackInfo){
  emit("give-feedback2", feedbackInfo);

}
</script>

<template>
  <div class="fridge-box-container">
    <div
        class="fridge-box"
        v-for="(item, index) in items"
        :key="index"
        @click="toggleExpand(item)"
        :class="{ expanded: expandedItem === item, hidden: expandedItem && expandedItem !== item }"
    >
      <img class="fridge-item-image" src="@/assets/icons/logo.png" alt="Image" v-if="expandedItem !== item" />
      <div class="fridge-item-info" v-if="expandedItem !== item">
        <h3>{{ item.name }}</h3>
        <p class="description">{{ item.description }}</p>
      </div>
      <transition name="details">
        <div class="details-container" v-if="expandedItem === item">
          <FridgeItemDetailsComponent
              :item="item"
              @close="toggleRetract"
              @update-grocery1="handleUpdateGrocery1"
              @delete-grocery1="handleDeleteGrocery1"
              @give-feedback1="handleFeedback1"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<style>
.fridge-box-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  position: relative;
}

.fridge-box {
  background-color: white;
  height: 20vw;
  width: 20vw;
  transition: all 0.3s;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.fridge-item-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fridge-item-info {
  font-size: 16px;
  text-align: center;
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.3s;
  background-color: gray;
}

.fridge-box.expanded {
  position: absolute;
  left: 15vh;
  height: 70vh;
  width: 70vw;
  z-index: 100;
}

.fridge-box.hidden {
  display: none;
}

.details-container {
  height: 0;
  width: 0;
  transition: all 0.3s;
}

@media screen and (max-width: 768px) {
  .fridge-box-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .fridge-box {
    height: 40vw;
    width: 40vw;
  }

  .fridge-box.expanded {
    height: 90%;
    width: 90%;
  }
}
</style>

<script setup>
import { ref } from 'vue';
import FridgeItemDetailsComponent from "@/components/GroceryItemComponent.vue";

defineProps({
  items: {
    type: Array,
    required: true
  }
});

// Define Emits
const emit = defineEmits(["showFilterBar", "hideFilterBar", "close",
"give-feedback1", "add-new-items", "deleteItem", "updateItem"]);

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

function updateItem(item){
  setTimeout(toggleRetractHelper, 100)
  emit("updateItem", item)
}

function deleteItem(item){
  setTimeout(toggleRetractHelper, 100)
  emit("deleteItem", item)
}
</script>

<template>
  <div class="fridge-box-container">
    <button
        v-if="expandedItem === null"
        @click="emit('add-new-items')"
        class="add-items-button">
      Legg til varer
      <img src="@/assets/icons/plusSign.png" alt="Add" class="plus-icon" />
    </button>
    <div
        class="fridge-box"
        v-for="(item, index) in items"
        :key="index"
        @click="toggleExpand(item)"
        :class="{ expanded: expandedItem === item, hidden: expandedItem && expandedItem !== item }"
    >
      <img class="fridge-item-image" :src="item.imageLink" alt="Image" v-if="expandedItem !== item" />
      <div class="fridge-item-info" v-if="expandedItem !== item">
        <h3>{{ item.name }}</h3>
        <p class="description">{{ item.description }}</p>
      </div>
      <transition name="details" v-if="expandedItem === item">
        <FridgeItemDetailsComponent
            :item="item"
            :accept-message="'Lagre Endringer'"
            :decline-message="'Avbryt'"
            :tertiary-message="'Slett'"
            @update="updateItem"
            @decline="toggleRetract"
            @special="deleteItem"
        />
      </transition>
    </div>
  </div>
</template>

<style>
.fridge-box-container {
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
}

.add-items-button {
  position: absolute;
  top: -45px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f0f0f0;
  color: black;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  font-size: 16px;
  cursor: pointer;
}

.plus-icon {
  width: 16px;
  height: 16px;
  margin-left: 8px;
}

.fridge-box {
  background-color: white;
  height: 35vh;
  width: 90%;
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
  margin-top: 15vh;
  height: 70vh;
  width: 70vw;
  z-index: 100;
}

.fridge-box.hidden {
  display: none;
}

@media screen and (max-width: 768px) {
  body .fridge-box-container {
    grid-template-columns: repeat(2, 1fr);
  margin-left: 0;
    padding: 30px;
  }

  .fridge-box {
    height: 40vw;
    width: 40vw;
  }

  body .fridge-box.expanded {
    grid-row: span 2;
    grid-column: span 2;
    height: 30vh;
    width: 80vh;
  }
}
</style>


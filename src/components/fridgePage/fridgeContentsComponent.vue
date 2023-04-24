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
const emit = defineEmits(["showFilterBar", "hideFilterBar"]);

const expandedItem = ref(null);

function toggleExpand(item) {
  if (expandedItem.value === item) {
    expandedItem.value = null;
    emit("showFilterBar");
  } else {
    expandedItem.value = item;
    emit("hideFilterBar");
  }
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
      <div class="item-info" v-if="expandedItem !== item">
        <h3>{{ item.name }}</h3>
        <p class="description">{{ item.description }}</p>
      </div>
      <transition name="details">
        <div class="details-container" v-if="expandedItem === item">
          <FridgeItemDetailsComponent
              :item="item"
              @close="toggleExpand(null)"
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

.item-info {
  font-size: 16px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

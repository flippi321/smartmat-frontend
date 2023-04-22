<script setup>
import { defineProps } from 'vue'

defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="box-container">
    <transition name="fade" mode="out-in" :duration="2000">
      <div class="success-box" v-if="showSaveSuccess">
        <span>Saved successfully!</span>
      </div>
    </transition>
    <div class="box" v-for="item in items" :key="item.id">
      <div class="item-info">
        <div class="checkbox-and-name" @click.stop="item.selected = !item.selected">
          <input type="checkbox" class="checkbox" v-model="item.selected">
          <div class="name">{{ item.name }}</div>
        </div>
        <div class="edit-icon" @click="describeItem = describeItem === item ? null : item">
          <img src="@/assets/icons/Details.png" alt="Details" class="details-icon-img">
        </div>
      </div>
      <div class="description" v-if="describeItem === item">
        <p>Amount: {{ item.amount }} {{ item.unit }}</p>
        <p>Expected shelf life: {{ item.expected_shelf_life }} days</p>
        <p>Days since purchase: {{ item.days_since_purchase }}</p>
        <p>Days until spoilage: {{ item.days_until_spoilt }}</p>
        <div class="button-container">
          <button class="save-button" @click="saveChanges">Save</button>
          <button class="cancel-button" @click="describeItem = -1">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      describeItem: null,
      showSaveSuccess: false,
    };
  },
  methods: {
    saveChanges() {
      console.log('Saved');
      this.showSaveSuccess = true;
      setTimeout(() => {
        this.showSaveSuccess = false;
      }, 3000);
    },
  },
};
</script>

<style>
.success-box {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  padding: 10px;
  background-color: green;
  color: white;
  text-align: center;
  font-weight: bold;
  border-radius: 15px;
  z-index: 999;       /* Set to a high number to be in front of everything else */
}

.box-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.box {
  width: 60%;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 75%;
  max-width: 800px;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .box {
    width: 100%;
  }
}

.item-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.edit-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.details-icon-img {
  max-width: 100%;
  max-height: 100%;
}

.checkbox-and-name {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
}

.checkbox {
  margin-right: 10px;
}

.name {
  font-size: 18px;
  font-weight: 500;
}

.description {
  font-size: 16px;
  font-weight: 400;
  color: #666;
  margin-top: 10px;
}
</style>
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
    <div class="box" v-for="item in items" :key="item.id">
      <div class="item-info">
        <div class="checkbox-and-name" @click.stop="item.selected = !item.selected">
          <input type="checkbox" class="checkbox" v-model="item.selected">
          <div class="name">{{ item.name }}</div>
        </div>
        <div class="edit-icon" @click="describeItem = describeItem === item ? null : item">
          <img src="@/assets/icons/Edit.png" alt="Edit icon" class="edit-icon-img">
        </div>
      </div>
      <div class="description" v-if="describeItem === item">
        <p>Amount: {{ item.amount }} {{ item.unit }}</p>
        <p>Expected shelf life: {{ item.expected_shelf_life }} days</p>
        <p>Days since purchase: {{ item.days_since_purchase }}</p>
        <p>Days until spoilage: {{ item.days_until_spoilt }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      describeItem: -1
    }
  }
}
</script>

<style>
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

.edit-icon-img {
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
<template>
  <div class="grocery-item">
    <div class="grocery-item-image" :style="{width: imageSize, height: imageSize}">
      <img src="@/assets/icons/Logo.png" :alt="item.name" :style="{width: imageSize, height: imageSize}" />
    </div>
    <div class="grocery-item-details">
      <h2 class="grocery-item-name">{{ item.name }}</h2>
      <p class="grocery-item-amount">Mengde: <input type="number" v-model.number="localAmount" min="0" />
        {{item.unit}}</p>
      <p class="grocery-item-expected-shelf-life">Beregnet holdbarhet: {{ item.expected_shelf_life }} dager</p>
      <p class="grocery-item-actual-shelf-life">
        Faktisk holdbarhet: <input type="number" v-model.number="localActual_shelf_life" min="0" /> dager
      </p>
      <div class="grocery-item-buttons">
        <button @click="updateGrocery">{{ acceptMessage }}</button>
        <button @click="returnToFridge">{{ declineMessage }}</button>
        <button @click="deleteGrocery" v-if="tertiaryMessage !== null">{{ tertiaryMessage }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    acceptMessage: {
      type: String,
      required: true
    },
    declineMessage: {
      type: String,
      required: true
    },
    // An optional message used by the fridge
    tertiaryMessage: {
      type: String,
      required: false
    }
  },
  data(){
    return{
      localAmount: this.item.amount,
      localActual_shelf_life: this.item.actual_shelf_life,
      updatedItem:{
        id: 0,
        name: "",
        category: 0,
        unit: "",
        expected_shelf_life: 0,
        amount: 0,
        actual_shelf_life: 0
      },
      feedbackInfo: {
        feedbackMessage: "",
        feedbackType: "",
        feedback: false
      }
    }
  },
}
</script>

<style>
.grocery-item {
  display: flex;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  width: 600px;
  font-size: 1.5em;
}

.grocery-item-image {
  width: 100px;
  height: 100px;
  margin-right: 20px;
  overflow: hidden;
}

.grocery-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.grocery-item-details {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.grocery-item-name {
  font-size: 24px;
  margin: 0;
}

button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
  transition-duration: 0.4s;
}

button:hover {
  background-color: #555555;
  color: white;
}
</style>

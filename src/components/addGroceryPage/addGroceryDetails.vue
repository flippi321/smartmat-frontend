<template>
  <div class="grocery-item">
    <div class="grocery-item-image">
      <img :src="getImageUrl()" :alt="item.name" />
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
        <button @click.stop="addGrocery">Legg Til Vare</button>
        <button @click.stop="returnToAdPage">Avbryt</button>
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
    }
  },
  data(){
    return{
      localAmount: this.item.amount,
      localActual_shelf_life: this.item.actual_shelf_life,
      feedbackInfo: {
        feedbackMessage: "",
        feedbackType: "",
        feedback: false
      }
    }
  },

  methods: {
    getImageUrl() {
      // Return the image URL
      // her skal selvfølgelig bildet hentes fra databasen
      return "src/assets/" + this.item.name + ".png";
    },

    addGrocery() {
      const updatedItem = {
        ...this.item,
        amount: this.localAmount,
        actual_shelf_life: this.localActual_shelf_life,
      };
      this.$emit("add-grocery", updatedItem);
    },
    returnToAdPage(){
      this.$emit("close");
    }
  },
};
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

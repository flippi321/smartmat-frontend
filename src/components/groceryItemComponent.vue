<script setup>
defineProps({
  id: {
    type: Number,
    required: true
  }
})
</script>

<template>
<!--  byttet this.groceryInfo.name til this.name (også de andre stedene) og da får jeg ikke feilmelding lengre-->
  <div class="grocery-item">
    <div class="grocery-item-image">
      <img :src="getImageUrl()" :alt="this.name" />
    </div>
    <div class="grocery-item-details">
      <h2 class="grocery-item-name">{{ this.name }}</h2>
      <p class="grocery-item-amount">Mengde: <input type="number" v-model.number="this.amount" min="0" />
        {{this.unit}}</p>
      <p class="grocery-item-expected-shelf-life">Beregnet holdbarhet: {{ this.expected_shelf_life }} dager</p>
      <p class="grocery-item-actual-shelf-life">
        Faktisk holdbarhet: <input type="number" v-model.number="this.actual_shelf_life" min="0" /> dager
      </p>
      <div class="grocery-item-buttons">
        <button @click="updateGrocery">Oppdater</button>
        <button @click="deleteGrocery">Fjern vare</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      query: ""
    };
  },

  methods: {
    getImageUrl() {
      // Return the image URL
     // return "../assets/" + this.groceryInfo.name + ".png";
      return "src/assets/Bananer.png";
    },
    updateGrocery() {
      // Emit an event to notify the parent component that the grocery has been updated
      this.$emit("update-grocery", this.groceryInfo);
      this.query = "update";
      const query = this.query
      this.$router.push({ path: `/fridge`, query: { query } });
    },
    deleteGrocery() {
      // Emit an event to notify the parent component that the grocery should be deleted
      this.$emit("delete-grocery", this.id);
      this.query = "delete";
      const query = this.query
      this.$router.push({ path: `/fridge`, query: { query } });
    },
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
  background-color: #4CAF50; /* legger til en grønn bakgrunnsfarge */
  border: none; /* fjerner grense */
  color: white; /* setter teksten til hvit */
  padding: 15px 32px; /* legger til padding */
  text-align: center; /* setter tekst til sentrert */
  text-decoration: none; /* fjerner understrekning */
  display: inline-block; /* endrer display til blokk */
  font-size: 16px; /* setter fontstørrelsen */
  margin: 4px 2px; /* legger til margin */
  cursor: pointer; /* legger til hover-effekt */
  border-radius: 8px; /* legger til avrundede hjørner */
  transition-duration: 0.4s; /* legger til en overgangsanimasjon */
}

button:hover {
  background-color: #555555; /* endrer bakgrunnsfarge på hover */
  color: white; /* endrer tekstfarge på hover */
}


</style>

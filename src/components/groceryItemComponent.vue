
<template>

  <div class="grocery-item">
    <div class="grocery-item-image">
      <img :src="getImageUrl()" :alt="item.name" />
    </div>
    <div class="grocery-item-details">
      <h2 class="grocery-item-name">{{ item.name }}</h2>
      <p class="grocery-item-amount">Mengde: <input type="number" v-model.number="item.amount" min="0" />
        {{item.unit}}</p>
      <p class="grocery-item-expected-shelf-life">Beregnet holdbarhet: {{ item.expected_shelf_life }} dager</p>
      <p class="grocery-item-actual-shelf-life">
        Faktisk holdbarhet: <input type="number" v-model.number="item.actual_shelf_life" min="0" /> dager
      </p>
      <div class="grocery-item-buttons">
        <button @click="updateGrocery">Oppdater</button>
        <button @click="deleteGrocery">Fjern vare</button>
        <button @click="returnToFridge">Returner til kjøleskap</button>
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

  methods: {
    getImageUrl() {
      // Return the image URL
      // her skal selvfølgelig bildet hentes fra databasen
      return "src/assets/" + this.item.name + ".png";
    },
    updateGrocery() {
      // Emit an event to notify the parent component that the grocery has been updated
      this.updatedItem.id = this.item.id
      this.updatedItem.name = this.item.name
      this.updatedItem.category = this.item.category
      this.updatedItem.unit = this.item.unit
      this.updatedItem.expected_shelf_life = this.item.unit
      this.updatedItem.amount = this.item.amount
      this.updatedItem.actual_shelf_life = this.item.actual_shelf_life

      this.$emit("update-grocery1", this.updatedItem);

      this.feedbackInfo.feedbackMessage = "Varen ble oppdatert";
      this.feedbackInfo.feedbackType = "success";
      this.feedbackInfo.feedback = true;
      this.$emit("give-feedback1", this.feedbackInfo)

    },
    deleteGrocery() {
      // Emit an event to notify the parent component that the grocery should be deleted
      console.log("svære")
      this.$emit("delete-grocery1", this.item);
      this.$emit("close", this.item);

      this.feedbackInfo.feedbackMessage = "Varen ble slettet";
      this.feedbackInfo.feedbackType = "success";
      this.feedbackInfo.feedback = true;
      this.$emit("give-feedback1", this.feedbackInfo)
    },
    returnToFridge(){
      this.$emit("close", this.item);

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

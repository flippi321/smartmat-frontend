<template>
  <div class="grocery-item">
    <div class="grocery-item-content">
      <div class="grocery-item-image">
        <img :src="item.imageLink" :alt="item.name">
      </div>
      <div class="grocery-item-details">
        <h1 class="grocery-item-name">{{ item.name }}</h1>
        <p class="grocery-item-amount">Mengde: <input type="number" v-model.number="this.amount" min="0.25" step="0.25"/>
          {{item.category.unit}}</p>
        <p class="grocery-item-expected-shelf-life">Beregnet holdbarhet: {{ item.expectedShelfLife }} dager</p>
        <p class="grocery-item-actual-shelf-life">
          Faktisk holdbarhet: <input type="number" v-model.number="actualShelfLife" /> dager
        </p>
        <div class="grocery-item-buttons">
          <button @click.stop="update(item)">{{ acceptMessage }}</button>
          <button @click.stop="decline">{{ declineMessage }}</button>
          <button @click.stop="special(item)" v-if="tertiaryMessage">{{ tertiaryMessage }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      amount: 1,
      actualShelfLife: 0,
    }
  },

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

  methods: {
    update(item){
      item.actualShelfLife = this.actualShelfLife;
      item.amount = this.amount;
      console.log(item)
      this.$emit("update", item)
    },

    decline(){
      this.$emit("decline")
    },

    special(item){
      this.$emit("special", item)
    }
  },

  created() {
    console.log(this.item);
    if(this.item.amount){
      this.amount = this.item.amount;
    }
    if(this.item.actualShelfLife){
      this.actualShelfLife = this.item.actualShelfLife;
    } else {
      this.actualShelfLife = this.item.expectedShelfLife;
    }
  }
}
</script>

<style scoped>
.grocery-item {
  top: 0;
  display: flex;
  flex-direction: column;
  border: 10px;
  border-radius: 4px;
  padding: 30px;
  width: 100%;
  min-height: 80vh;
}

.grocery-item-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.grocery-item-image {
  flex-grow: 1;
  min-width: 30px;
  min-height: 30px;
  max-width: 50%;
  max-height: 60vh;
  padding: 10px;
}

.grocery-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.grocery-item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-width: 50%;
  max-width: 100%;
  padding: 10px;
}

.grocery-item-name {
  font-size: 48px;
  margin: 0 0 10px;
}

.grocery-item-amount {
  font-size: 28px;
  line-height: 1.5;
  margin-bottom: 8px;
}

input[type="number"] {
  padding: 5px;
  font-size: 28px;
  width: 100px;
}

.grocery-item-expected-shelf-life {
  font-size: 28px;
  line-height: 1.5;
  margin-bottom: 8px;
}

.grocery-item-actual-shelf-life {
  font-size: 28px;
  line-height: 1.5;
  margin-bottom: 8px;
}

button:hover {
  background-color: #555555;
  color: white;
}

@media (max-width: 768px) {
  .grocery-item-content {
    flex-direction: column;
    align-items: center;
  }

  .grocery-item-image {
    max-width: 60vw;
    max-height: 30vh;
  }

  .grocery-item-details {
    align-items: center;
  }

  .grocery-item-name {
    font-size: 24px;
  }

  .grocery-item-amount {
    font-size: 16px;
  }

  input[type="number"] {
    font-size: 14px;
  }

  .grocery-item-expected-shelf-life {
    font-size: 14px;
  }

  .grocery-item-actual-shelf-life {
    font-size: 16px;
  }
}

</style>
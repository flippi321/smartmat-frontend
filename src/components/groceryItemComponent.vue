<template>
  <div class="grocery-item">
    <div class="grocery-item-content">
      <div class="grocery-item-image">
        <img src="@/assets/icons/Logo.png" :alt="item.name">
      </div>
      <div class="grocery-item-details">
        <h1 class="grocery-item-name">{{ item.name }}</h1>
        <p class="grocery-item-amount">Mengde: <input type="number" v-model.number="amount" min="0" />
          {{item.unit}}</p>
        <p class="grocery-item-expected-shelf-life">Beregnet holdbarhet: {{ item.expected_shelf_life }} dager</p>
        <p class="grocery-item-actual-shelf-life">
          Faktisk holdbarhet: <input type="number" v-model.number="actual_shelf_life" min="0" /> dager
        </p>
        <div class="grocery-item-buttons">
          <button @click.stop="update(item)">{{ acceptMessage }}</button>
          <button @click.stop="decline">{{ declineMessage }}</button>
          <button @click.stop="special" v-if="tertiaryMessage">{{ tertiaryMessage }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      amount: 0,
      actual_shelf_life: 0,
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
      this.$emit("update", item)
    },

    decline(){
      this.$emit("decline")
    },

    special(information){
      this.$emit("special", information)
    }
  },

  created() {
    this.actual_shelf_life = this.item.expected_shelf_life;
    this.amount = this.item.amount;
  }
}
</script>

<style scoped>
.grocery-item {
  display: flex;
  flex-direction: column;
  border: 10px;
  border-radius: 4px;
  padding: 30px;
  width: 100%;
  height: 100%;
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
  width: 50px;
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
    max-width: 70%;
    max-height: 70%;
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
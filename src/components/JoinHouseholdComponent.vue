<template>
  <div class="container">
    <h1>Join or Create a Household</h1>
    <div class="choices">
      <form @submit.prevent="joinHousehold" class="choice">
        <h2>Bli med i en Husholdning</h2>
        <div class="input">
          <label for="household-code">Husholdningskode:</label>
          <input
              class="form-control"
              type="text"
              name="household-code"
              placeholder="123456"
              v-model="householdCode"
          />
        </div>
        <button type="submit" class="btn">Bli medlem!</button>
      </form>
      <div class="choice create">
        <h2>Eller lag in egen</h2>
        <p>Lag en ny Husholdning:</p>
        <button @click="createHousehold" class="btn">Nå!</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "joinHouseholdComponent",
  data() {
    return {
      householdCode: "",
    };
  },
  methods: {
    joinHousehold() {
      if (this.householdCode.length !== 6) {
        alert("Vennligst bruk en valid husholdningskode på 6 siffer");
        return;
      }
      this.$emit("joinHousehold", this.householdCode)
    },
    createHousehold() {
      this.$emit("createHousehold")
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  overflow-x: hidden;
}

.choices {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.choice {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 330px;
  min-height: 200px;
  padding: 10px;
  border: 2px solid black;
  border-radius: 5px;
  background-color: #f5f5f5;
  text-align: center;
}

@media (min-width: 768px) {
  .choice {
    width: calc(50% - 10px);
    min-height: 250px;
  }
}

.input {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.input > label {
  text-align: start;
}

.input > input {
  margin-top: 6px;
  height: 38px !important;
}

.btn {
  position: relative;
  left: 50%;
  padding: 1em 2.5em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 700;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  transform: translateX(-50%);
}

.btn:hover {
  background-color: #49a078;
  box-shadow: 0 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translate(-50%, -3px);
}

.btn:active {
  transform: translate(-50%, -1px);
}

.create {
  margin-top: 20px;
  text-align: center;
}

.create > p {
  margin-bottom: 10px;
}
</style>


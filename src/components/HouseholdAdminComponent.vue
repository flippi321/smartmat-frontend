<template>
  <div class="container">
    <div class="left">
      <div class="members-list">
          <h1 v-if="houseHold">{{houseHold.name}}</h1>
        <h3>Husholdningens medlemmer:</h3>
        <ul>
            <li v-for="(member, index) in members" :key="index" :value="member">{{ member.firstname }} {{ member.lastname }}</li>
        </ul>
        <h3>Kjøleskap:</h3>
        <ul>
            <li v-if="houseHold && houseHold.fridge">{{ houseHold.fridge.name }}</li>
        </ul>
        <h3>Handleliste:</h3>
        <ul>
            <li v-if="houseHold && houseHold.shoppinglist">{{ houseHold.shoppinglist.name }}</li>
        </ul>
          <p v-if="houseHold">Invitasjonskode: {{houseHold.invitationNr}}</p>
      </div>
    </div>
    <div class="right">
        <div class="update-info">
            <h3>Oppdater informasjon:</h3>
            <div>
                <label for="household-name">Husholdning navn:</label>
                <input type="text" id="household-name" v-model="updateHouseholdName" />
            </div>
            <div>
                <label for="fridge-name">Kjøleskap navn:</label>
                <input type="text" id="fridge-name" v-model="updateFridgeName" />
            </div>
            <div>
                <label for="shoppinglist-name">Handleliste navn:</label>
                <input type="text" id="shoppinglist-name" v-model="updateShoppingListName" />
            </div>
            <button @click="updateInformation">Oppdater</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HouseholdAdminComponent",
  props: {
    id: {
      type: Number,
      required: true,
    },
    members: {
      type: Array,
      required: true,
    },
    houseHold: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
        updateHouseholdName: "",
        updateFridgeName: "",
        updateShoppingListName: "",
    };
  },

    watch: {
        houseHold: {
            immediate: true,
            handler(newHouseHold) {
                if (newHouseHold) {
                    this.updateHouseholdName = newHouseHold.name;
                    if (newHouseHold.fridge) {
                        this.updateFridgeName = newHouseHold.fridge.name;
                    }
                    if (newHouseHold.shoppinglist) {
                        this.updateShoppingListName = newHouseHold.shoppinglist.name;
                    }
                }
            },
        },
    },

  methods: {
    updateInformation() {
        if (this.updateHouseholdName.trim() || this.updateFridgeName.trim() || this.updateShoppingListName.trim()) {
            this.$emit("updateInformation", {
              householdName: this.updateHouseholdName.trim(),
              fridgeName: this.updateFridgeName.trim(),
              shoppingListName: this.updateShoppingListName.trim(),
            });
        }
    },
  },
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    width: 80%;
    margin: 0 auto;
    gap: 2rem;
}

.left,
.right {
    flex: 1;
    background-color: #f0f0f0;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.members-list,
.update-info {
    width: 100%;
}

.members-list ul,
.update-info ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

.members-list li,
.update-info li {
    margin-bottom: 0.5rem;
}

.update-info div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.update-info label {
    font-weight: bold;
}

input,
select,
button {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
}

button {
    cursor: pointer;
    background-color: #4caf50;
    color: white;
    border: none;
    font-weight: bold;
}

button:hover {
    background-color: #45a049;
}

@media (max-width: 768px) {
    .container {
        flex-direction: column;
        gap: 1rem;
    }
}
</style>

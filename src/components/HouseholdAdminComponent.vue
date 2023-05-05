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
            <h3>Update Information:</h3>
            <div>
                <label for="household-name">Household Name:</label>
                <input type="text" id="household-name" v-model="updateHouseholdName" />
            </div>
            <div>
                <label for="fridge-name">Fridge Name:</label>
                <input type="text" id="fridge-name" v-model="updateFridgeName" />
            </div>
            <div>
                <label for="shoppinglist-name">Shopping List Name:</label>
                <input type="text" id="shoppinglist-name" v-model="updateShoppingListName" />
            </div>
            <button @click="updateInformation">Update</button>
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

    addMember() {
      if (this.newMemberEmail.trim()) {
        this.$emit("addMember", this.newMemberEmail.trim());
        this.updateMembers();
      }
    },
    removeMember() {
      if (this.selectedMember !== null) {
        this.$emit("removeMember", this.selectedMember.id);
        this.updateMembers();
      }
    },
    updateMembers() {
      console.log("Updating Page...");
      this.$emit("getMembers");
    },
      getHousehold() {
        this.$emit("getHousehold");
      },
  },
};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: stretch;
  width: 80%;
  height: 80%;
  margin: 0 auto;
}

.left,
.right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  max-width: 50%;
}

.members-list {
  background-color: #f0f0f0;
  padding: 1rem;
  height: 100%;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-member,
.remove-member {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.members-list ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.members-list li {
  margin-bottom: 0.5rem;
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
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    height: auto;
  }

  .left,
  .right {
    flex: 1;
    height: auto;
    margin-bottom: 1rem;
    max-width: 100%;
  }
}
</style>

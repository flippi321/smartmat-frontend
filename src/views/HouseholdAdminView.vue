<template>
  <HouseholdAdminComponent
      ref="householdAdminComponent"
      :id="this.householdId"
      :members="this.members"
      :houseHold="this.household"
      @getMembers="getAllMembers"
      @removeMember="removeMember"
      @addMember="addMember"
      @getHousehold="getHousehold"
      @updateInformation="updateInformation"
  />
</template>

<script>
import HouseholdAdminComponent from "@/components/HouseholdAdminComponent.vue"
import householdService from "@/services/householdService";
import pinia, {useAuthStore} from "@/stores";
const store = useAuthStore(pinia);

export default {
  name: "HouseholdAdminView",

  components:{
    HouseholdAdminComponent
  },

  props: {
    householdId: {
      type: Number,
      required: true,
    },
  },

  data(){
    return {
      members: [],
      household: null,
    }
  },

  created() {
    this.getAllMembers()
    this.getHousehold()
  },

  methods: {
      updateInformation({ householdName, fridgeName, shoppingListName }) {
          const updatedHouseholdInfo = {
              name: householdName || this.household.name,
              fridge: {
                  name: fridgeName || (this.household.fridge && this.household.fridge.name) || "",
              },
              shoppinglist: {
                  name: shoppingListName || (this.household.shoppinglist && this.household.shoppinglist.name) || "",
              },
          };

          console.log(updatedHouseholdInfo)

          householdService.updateHouseHold(store.householdId, updatedHouseholdInfo)
              .then(response => {
                  this.$emit("feedback", response.status);
                  this.getHousehold();
              })
              .catch(error => {
                  console.error("Error updating household information:", error);
                  alert("Error updating household information:" + error)
              });
      },


      getAllMembers(){
      householdService.getAllUsersFromHousehold(store.householdId).then(response => {
        this.members = response.data;
        console.log(response.data);
      })
    },

    getHousehold(){
    householdService.getHouseholdById(store.householdId).then(response => {
      this.household = response.data;
      this.$emit("feedback", response.status);
      console.log(response.data);
    })
  }
  },
}
</script>
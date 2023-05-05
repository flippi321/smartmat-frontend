<template>
  <HouseholdAdminComponent
      ref="householdAdminComponent"
      :id="this.householdId"
      :members="this.members"
      :houseHold="this.household"
      @getMembers.stop="getAllMembers"
      @removeMember.stop="removeMember"
      @addMember.stop="addMember"
      @getHousehold.stop="getHousehold"
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

    getAllMembers(){
      householdService.getAllUsersFromHousehold(store.householdId).then(response => {
        this.members = response.data;
        console.log(response.data);
      })
    },

    removeMember(userId){
      householdService.removeUserFromHousehold(userId, this.householdId).then(response => {
        this.$emit("feedback", response.status);
        this.getAllMembers();
      })
    },

    addMember(userId){
      householdService.addUserToHousehold(userId, this.householdId).then(response => {
        this.$emit("feedback", response.status);
        this.getAllMembers();
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
<template>
  <HouseholdAdminComponent
      ref="householdAdminComponent"
      :id="this.householdId"
      :members="this.members"
      @getMembers.stop="getAllMembers"
      @removeMember.stop="removeMember"
      @addMember.stop="addMember"
  />
</template>

<script>
import HouseholdAdminComponent from "@/components/HouseholdAdminComponent.vue"
import householdService from "@/services/householdService";

export default {
  name: "HouseholdAdminView",

  components:{
    HouseholdAdminComponent
  },

  props: {
    householdId: {
      type: Number,
      required: true,
    }
  },

  data(){
    return {
      members: [],
    }
  },

  created() {
    this.getAllMembers()
  },

  methods: {
    updateAdminPage() {
      this.$refs.householdAdminComponent.members = this.members;
      this.$refs.householdAdminComponent.id = this.householdId;
    },

    getAllMembers(){
      householdService.getAllUsersFromHousehold(this.householdId).then(response => {
        this.members = response.data.groceryItems;
        console.log(response.data);
        this.updateAdminPage();
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
    }
  },
}
</script>
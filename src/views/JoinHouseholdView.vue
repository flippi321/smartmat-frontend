<template>
  <joinHouseholdComponent
      @createHousehold="createHouseHold"
      @joinHouseHold="joinHousehold"
  />
</template>

<script>
import joinHouseholdComponent from "@/components/joinHouseholdComponent.vue"
import householdService from "@/services/householdService";

export default {
  name: "JoinHouseholdView",

  components:{
    joinHouseholdComponent,
  },

  methods: {
    createHouseHold(userId){
      householdService.createHousehold(userId).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },

    joinHousehold(userId, invitationNumber){
      householdService.createHousehold(userId, invitationNumber).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

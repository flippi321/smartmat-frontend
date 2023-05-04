<template>
  <joinHouseholdComponent />
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
    createAHouseHold(userId){
      householdService.createHousehold(userId).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

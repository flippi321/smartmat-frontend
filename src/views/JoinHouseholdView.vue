<template>
  <joinHouseholdComponent
      @createHousehold="createHouseHold"
      @joinHousehold="joinHousehold"
  />
</template>

<script>
import joinHouseholdComponent from "@/components/JoinHouseholdComponent.vue"
import householdService from "@/services/householdService";
import {useAuthStore} from "@/stores";
import router from "@/router";

export default {
  name: "JoinHouseholdView",

  data(){
    return{
      store: useAuthStore(),
    }
  },

  components:{
    joinHouseholdComponent,
  },

  methods: {
    createHouseHold(){
      householdService.createHousehold(this.store.getUserId).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },

    joinHousehold(invitationNumber){
      householdService.createHousehold(this.store.getUserId, invitationNumber).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    }
  },

  created() {
    if(this.store.getHousehold === 0){
      router.push({ path: '/household', query: { id: this.store.getHousehold } });
    } else {
      console.log(this.store.getHousehold)
    }
  }
}
</script>

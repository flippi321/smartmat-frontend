<template>
  <joinHouseholdComponent
      @createHousehold="createHouseHold"
      @joinHousehold="joinHousehold"
  />
</template>

<script>
import JoinHouseholdComponent from "@/components/JoinHouseholdComponent.vue"
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
    JoinHouseholdComponent,
  },

  methods: {
    createHouseHold(householdInfo){
      householdService.createHousehold(this.store.getUserId, householdInfo).then(response => {
        this.store.setHousehold(response.data.householdId);
        router.push({path: "/household", query: {id: response.data.householdId}});
      }).catch(error => {
        console.log(error)
      })
    },

    joinHousehold(invitationNumber){
      householdService.joinHousehold(this.store.getUserId, invitationNumber).then(() => {
        this.sendToHouseholdIfExists();
      }).catch(error => {
        console.log(error)
      })
    },

    sendToHouseholdIfExists(){
      householdService.getUsersHousehold(this.store.userId).then(response => {
        this.store.setHousehold(response.data.householdId)

        //If we get a response, we send the user to the household
        if(this.store.getHousehold !== -1){
          router.push({ path: '/household', query: { id: this.store.getHousehold } });
        }
      }).catch(error => {
        console.log(error)
      })
    },
  },

  created() {
    this.sendToHouseholdIfExists();
  }
}
</script>

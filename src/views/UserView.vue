<script setup>
import UserPageComponent from "@/components/UserComponent.vue";
</script>

<template>
  <div>
    <UserPageComponent
        :id="this.store.getUserId"
        :user="this.user"
        @updateUser="updateUser"
    />
  </div>
</template>

<script>
import userService from "@/services/userService"
import {useAuthStore} from "@/stores";
const authStore = useAuthStore();

export default {
  data(){
    return{
      store: authStore,
      user: null,
    }
  },

  methods:{
    updateUser(userInfo){
      userService.updateUserInformation(userInfo, this.store.getEmail).then(response => {
        //Update the store
        this.store.setFirstName(response.data.firstName);
        this.store.setLastName(response.data.lastName);
        this.store.setEmail(response.data.email);

        //Update the values so the user sees the changes
        this.getUser();
      }).catch(error => {
        console.log(error)
      })
    },

    getUser(){
      userService.getUserInformation(authStore.getUserId).then(response => {
        console.log(response)
        this.user = response.data
      }).catch(error => {
        console.log(error)
      })
    },
  },

  created() {
    this.getUser();
  }
}
</script>
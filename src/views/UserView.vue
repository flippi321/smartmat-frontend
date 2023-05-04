<script setup>
import UserPageComponent from "@/components/UserComponent.vue";
</script>

<template>
  <div>
    <UserPageComponent
        :id="this.store.getUserId"
        :first-name="this.store.getFirstName"
        :last-name="this.store.getLastName"
        :email="this.store.getEmail"
        @update="updateUser"
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
    }
  },

  methods:{
    updateUser(userInfo){
      userService.updateUserInformation(userInfo).then(response => {
        let newInfo = response.data;
        this.store.setFirstName(newInfo.firstName);
        this.store.setLastName(newInfo.lastName);
        this.store.setEmail(newInfo.email);
      })
    }
  }
}
</script>
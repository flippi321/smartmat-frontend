<script setup>
import UserPageComponent from "@/components/UserComponent.vue";
import { useAuthStore } from "@/stores";

const authStore = useAuthStore();
</script>

<template>
  <div>
    <UserPageComponent
        :id="authStore.getUserId"
        :first-name="authStore.getFirstName"
        :last-name="authStore.getLastName"
        :email="authStore.getEmail"/>
  </div>
</template>
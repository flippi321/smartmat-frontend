<script setup>
import UserPageComponent from "@/components/UserPageComponent.vue";
import { useAuthStore } from "@/stores";

const authStore = useAuthStore();
</script>

<template>
  <div>
    <UserPageComponent
        :id="authStore.getFirstName"
        :first-name="authStore.getLastName"
        :last-name="authStore.getEmail"
        :email="authStore.getUserId"/>
  </div>
</template>
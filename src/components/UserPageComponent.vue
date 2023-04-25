<script setup>
defineProps({
  user: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div>
    <h1>User Information</h1>
    <p><strong>User ID:</strong> {{ user.data.userId }}</p>
    <p><strong>First Name:</strong> {{ user.data.firstName }}</p>
    <p><strong>Last Name:</strong> {{ user.data.lastName }}</p>
    <p><strong>Email:</strong> {{ user.data.email }}</p>
  </div>
</template>

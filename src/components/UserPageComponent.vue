<script setup>
defineProps({
  id: {
    type: Number,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
})
</script>

<template>
  <div>
    <h1>User Information</h1>
    <p><strong>User ID:</strong> {{ id }}</p>
    <p><strong>First Name:</strong> {{ firstName }}</p>
    <p><strong>Last Name:</strong> {{ lastName }}</p>
    <p><strong>Email:</strong> {{ email }}</p>
  </div>
</template>

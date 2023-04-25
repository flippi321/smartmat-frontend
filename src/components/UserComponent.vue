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
    <img src="@/assets/icons/Logo.png" alt="User image">
    <p><strong>User ID:</strong> {{ id }}</p>
    <p><strong>First Name:</strong> {{ firstName }}</p>
    <p><strong>Last Name:</strong> {{ lastName }}</p>
    <p><strong>Email:</strong> {{ email }}</p>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
  margin: 50px auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

h1 {
  color: #333;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

img {
  width: 100px;
  height: auto;
  margin-bottom: 20px;
}

p {
  color: #666;
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 10px;
}

strong {
  color: #333;
}
</style>

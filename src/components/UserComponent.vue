<template>
  <div>
    <h1>User Information</h1>
    <img src="@/assets/icons/Logo.png" alt="User image">
    <p>
      <span><strong>User ID:</strong></span>
      <span>
        <input type="text" :value="id" :disabled="!editId" @input="updateId($event.target.value)" style="margin-left: 10px;">
        <img src="@/assets/icons/Edit.png" alt="Edit" v-if="!editId" @click="editId = true" class="edit-img">
      </span>
    </p>
    <p>
      <span><strong>First Name:</strong></span>
      <span>
        <input type="text" :value="firstName" :disabled="!editFirstName" @input="updateFirstName($event.target.value)" style="margin-left: 10px;">
        <img src="@/assets/icons/Edit.png" alt="Edit" v-if="!editFirstName" @click="editFirstName = true" class="edit-img">
      </span>
    </p>
    <p>
      <span><strong>Last Name:</strong></span>
      <span>
        <input type="text" :value="lastName" :disabled="!editLastName" @input="updateLastName($event.target.value)" style="margin-left: 10px;">
        <img src="@/assets/icons/Edit.png" alt="Edit" v-if="!editLastName" @click="editLastName = true" class="edit-img">
      </span>
    </p>
    <p>
      <span><strong>Email:</strong></span>
      <span>
        <input type="text" :value="email" :disabled="!editEmail" @input="updateEmail($event.target.value)" style="margin-left: 10px;">
        <img src="@/assets/icons/Edit.png" alt="Edit" v-if="!editEmail" @click="editEmail = true" class="edit-img">
      </span>
    </p>
    <button v-if="editId || editEmail || editFirstName || editLastName " @click="saveChanges" style="align-self: flex-end;">Lagre Endringer</button>
  </div>
</template>

<script setup>
import {ref} from "vue";

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

let editId = ref(false);
let editFirstName = ref(false);
let editLastName = ref(false);
let editEmail = ref(false);

function saveChanges() {
  // Handle saving changes to the server or local storage
  editId.value = false;
  editFirstName.value = false;
  editLastName.value = false;
  editEmail.value = false;
}
</script>

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
  width: 200px;
  height: auto;
  margin-bottom: 20px;
}

.edit-img {
  height: 1.5rem;
  width: auto;
  margin-bottom: 0;
}

p {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #666;
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 10px;
}

strong {
  color: #333;
}

input {
  font-size: 18px;
  padding: 5px;
  border: none;
  border-bottom: 1px solid #333;
  margin-left: 10px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
}

button:hover {
  background-color: #555;
}
</style>

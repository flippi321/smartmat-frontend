<script setup>
import { ref } from 'vue'

defineProps({
  id: {
    type: Number,
    required: true
  },
  members: {
    type: Array,
    required: true,
  }
})

const newMemberEmail = ref('')
const selectedMember = ref(null)

const addMember = () => {
  if (newMemberEmail.value.trim()) {
    members.value.push(newMemberEmail.value.trim())
    newMemberEmail.value = ''
  }
}

const removeMember = () => {
  const index = members.value.findIndex(member => member === selectedMember.value)
  if (index !== -1) {
    members.value.splice(index, 1)
  }
}
</script>

<template>
  <div class="container">
    <div class="left">
      <div class="members-list">
        <ul>
          <li v-for="(member, index) in members" :key="index">{{ member }}</li>
        </ul>
      </div>
    </div>
    <div class="right">
      <div class="add-member">
        <input type="email" v-model="newMemberEmail" placeholder="Enter email" />
        <button @click="addMember">Add Member</button>
      </div>
      <div class="remove-member">
        <select v-model="selectedMember">
          <option value="" disabled>Select a member</option>
          <option v-for="(member, index) in members" :key="index" :value="member">{{ member }}</option>
        </select>
        <button @click="removeMember">Remove Member</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HouseholdAdminComponent"
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: stretch;
  width: 80%;
  height: 80%;
  margin: 0 auto;
}

.left,
.right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.members-list {
  background-color: #f0f0f0;
  padding: 1rem;
  height: 100%;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-member,
.remove-member {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.members-list ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.members-list li {
  margin-bottom: 0.5rem;
}

input,
select,
button {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

button {
  cursor: pointer;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    height: auto;
  }

  .left,
  .right {
    flex: 1;
    height: auto;
    margin-bottom: 1rem;
  }
}
</style>

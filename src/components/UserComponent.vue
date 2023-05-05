<template>
  <div>
    <h1>User Information</h1>
    <img src="@/assets/icons/Logo.png" alt="User image">
    <p>
      <span><strong>User ID:</strong></span>
      <span :style="{marginLeft: '10px'}">{{this.id}}</span>
    </p>
    <p>
      <span><strong>First Name:</strong></span>
      <span>
        <input type="text" v-model="userInfo.firstname" :disabled="!editFirstName" style="margin-left: 10px;">
        <img src="@/assets/icons/Edit.png" alt="Edit" v-if="!editFirstName" @click="setEditableField('editFirstName', 'firstname')" class="edit-img">
      </span>
    </p>
    <p>
      <span><strong>Last Name:</strong></span>
      <span>
        <input type="text" v-model="userInfo.lastname" :disabled="!editLastName" style="margin-left: 10px;">
        <img src="@/assets/icons/Edit.png" alt="Edit" v-if="!editLastName" @click="setEditableField('editLastName', 'lastname')" class="edit-img">
      </span>
    </p>
    <p>
      <span><strong>Email:</strong></span>
      <span>
        <input type="text" v-model="userInfo.email" :disabled="!editEmail" style="margin-left: 10px;">
        <img src="@/assets/icons/Edit.png" alt="Edit" v-if="!editEmail" @click="setEditableField('editEmail', 'email')" class="edit-img">
      </span>
    </p>
    <button v-if="editEmail || editFirstName || editLastName" @click="saveChanges" style="align-self: flex-end;">Lagre Endringer</button>
  </div>
  <button id="logoutBtn" @click="logout">Logg ut</button>
</template>

<script>
import {useAuthStore} from "@/stores";
import router from "@/router";

export default {
  props: {
    id:{
      type: Number,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      userInfo: this.user,
      editFirstName: false,
      editLastName: false,
      editEmail: false,
      previousValue: '',
    }
  },
  emits: ['updateUser'],

  methods: {
    saveChanges() {
      this.editEmail = false;
      this.editFirstName = false;
      this.editLastName = false;
      this.$emit("updateUser", this.userInfo);
    },
    logout() {
      const store = useAuthStore(this.$store);
      store.logout();
      router.push("/");
    },

    setEditableField(field, property) {
      if (this.previousValue !== '') {
        this.userInfo[this.currentProperty] = this.previousValue;
      }

      this.editFirstName = false;
      this.editLastName = false;
      this.editEmail = false;

      this.previousValue = this.userInfo[property];
      this.currentProperty = property;
      this[field] = true;
    }
  },

  created() {
    console.log(this.user)
  }
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

#logoutBtn {
    margin-top: 20px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #f44336;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
}

#logoutBtn:hover {
    background-color: #d32f2f;
}

</style>

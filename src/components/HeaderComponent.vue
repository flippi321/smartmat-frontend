<script setup>
import {useAuthStore} from "@/stores";

const store = useAuthStore();

</script>

<template>
  <nav class="navbar">
      <router-link :to="store.isLoggedIn ? { path: '/household', query: { id: 1 } } : '/'" class="navbar-left">
          <img src="@/assets/icons/Logo.png" alt="[Logo]" class="navbar-icon navbar-icon--larger">
          <span class="brand-name">SmartMat</span>
      </router-link>


      <div class="navbar-right">
      <router-link to="/about" class="button-primary">
        <img src="@/assets/icons/plusSign2.png" alt="[Plus Sign]" class="header-icon">
        <span class="header-button button-primary-text">Om oss</span>
      </router-link>
      <router-link v-if="!store.getIsLoggedIn" to="/login" class="button-primary">
        <img src="@/assets/icons/padLock.png" alt="[Padlock]" class="header-icon">
        <span class="header-button button-primary-text">Logg In</span>
      </router-link>
      <router-link v-if="store.getIsLoggedIn" :to="{ path: `/user`, query: { id: store.getUserId } }" class="button-primary">
        <img src="@/assets/icons/padLock.png" alt="[Padlock]" class="header-icon">
        <span class="header-button button-primary-text">{{store.getFirstName || store.getEmail}}</span>
      </router-link>
    </div>
  </nav>
</template>

<style>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  backdrop-filter: blur(10px) brightness(100%);
  -webkit-backdrop-filter: blur(10px) brightness(80%);
  box-shadow: none;
  z-index: 1;
}

.brand-name,
.button-primary-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: #216869;
  text-decoration: none;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.navbar-right {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.navbar-icon {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.navbar-icon--larger {
  width: 48px;
  height: 48px;
}

.brand-name {
  display: inline-block;
  vertical-align: middle;
}

.header-button {
  display: inline-flex;
  align-items: center;
  margin-left: 0.5rem;
  padding-right: 1rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  width: 5rem;
}

.button-primary:hover {
  text-decoration: underline;
}

.button-primary  {
  color: #216869;
  margin-right: 2rem;
}

.button span {
  margin-left: 0.5rem;
}

.header-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
  vertical-align: middle;
}


@media (max-width: 480px) {
  .header-button {
    display: none;
  }

  .button-primary {
    background-color: transparent;
  }
}
</style>

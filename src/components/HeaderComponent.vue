<template>
  <nav class="navbar">
    <router-link to="/" class="navbar-left">
      <img src="@/assets/icons/Logo.png" alt="[Logo]" class="navbar-icon navbar-icon--larger">
      <span class="brand-name">SmartMat</span>
    </router-link>
    <div class="navbar-right">
      <router-link to="/createAd" class="button-primary">
        <img src="@/assets/icons/plusSign.png" alt="[Plus Sign]" class="icons btn-icon--larger">
        <span class="button-text">New Ad</span>
      </router-link>
      <router-link to="/login" class="button-secondary">
        <img src="@/assets/icons/padLock.png" alt="[Padlock]" class="icons btn-icon--larger">
        <span class="button-text">Log In</span>
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


.brand-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #216869;
  text-decoration: none;
}

.navbar-left {
  display: flex;
  align-items: center;
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

.navbar-right {
  display: flex;
  align-items: center;
}

.button-text {
  color: #216869;
}

.button-primary:hover .button-text, .button-secondary:hover .button-text {
  text-decoration: underline;
}

.icons {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

@media (max-width: 480px) {
  .button-primary, .button-secondary {
    background-color: #ffffff;
  }
}
</style>
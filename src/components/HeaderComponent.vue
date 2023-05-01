<script setup>
import {useAuthStore} from "@/stores";
import { ref, onMounted, onBeforeUnmount } from 'vue';


const store = useAuthStore();

defineProps({
    id: {
        type: Number,
        required: true,
        validator: (value) => !isNaN(value),
    }
})

const mobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = () => {
    mobileMenuOpen.value = false;
    document.body.classList.remove('disable-pointer-events');
};

const onClickOutside = (event) => {
    if (
        event.target.closest('.mobile-menu-content') === null &&
        event.target.closest('.mobile-menu-icon') === null &&
        mobileMenuOpen.value
    ) {
        closeMobileMenu();
    }
};


onMounted(() => {
    window.addEventListener('click', onClickOutside);
});

onBeforeUnmount(() => {
    window.removeEventListener('click', onClickOutside);
});



</script>

<template>
    <nav class="navbar">
        <div class="navbar-backdrop"></div>
        <router-link :to="store.getIsLoggedIn ? { path: '/household', query: { id: 1 } } : '/'" class="navbar-left">
            <img src="@/assets/icons/Logo.png" alt="[Logo]" class="navbar-icon navbar-icon--larger">
            <span class="brand-name">SmartMat</span>
        </router-link>

        <div class="navbar-right">
            <router-link v-if="!store.getIsLoggedIn" to="/about" class="button-primary">
                <img src="@/assets/icons/plusSign2.png" alt="[Plus Sign]" class="header-icon">
                <span class="header-button button-primary-text">Om oss</span>
            </router-link>
            <router-link v-if="store.getIsLoggedIn" :to="{ path: `/fridge`, query: { id: this.id } }" class="button-primary">
                <span>Kjøleskap</span>
            </router-link>
            <router-link v-if="store.getIsLoggedIn" :to="{ path: `/shoppingList`, query: { id: this.id, sortBy: 1 } }" class="button-primary">
                <span>Handleliste</span>
            </router-link>
            <router-link v-if="store.getIsLoggedIn" :to="{ path: `/dinnerIdeas`, query: { id: this.id } }" class="button-primary">
                <span>Middagsideer</span>
            </router-link>
            <router-link v-if="store.getIsLoggedIn" :to="{ path: `/weekPlanner`, query: { id: this.id } }" class="button-primary">
                <span>Planlegg Uke</span>
            </router-link>
            <router-link v-if="store.getIsLoggedIn" to="/createAd" class="button-primary">
                <span>Administrer Medlemmer</span>
            </router-link>
            <router-link :to="store.getIsLoggedIn ? { path: '/user', query: { id: store.getUserId } } : '/login'" class="button-primary">
                <img src="@/assets/icons/padLock.png" alt="[Padlock]" class="header-icon">
                <span class="header-button button-primary-text">{{ store.getIsLoggedIn ? (store.getFirstName || store.getEmail) : 'Logg In' }}</span>
            </router-link>
        </div>

        <div class="mobile-menu-icon" @click="toggleMobileMenu">
            <span class="hamburger-icon">&#9776;</span>
        </div>

        <div :class="['mobile-menu', mobileMenuOpen ? 'mobile-menu-open' : '']">
            <div class="mobile-menu-overlay" @click="toggleMobileMenu"></div>
            <div class="mobile-menu-content">
                <div class="mobile-menu-content">
                    <div class="mobile-menu-close" @click="toggleMobileMenu">&times;</div>
                    <router-link v-if="!store.getIsLoggedIn" to="/about" class="button-primary" @click="closeMobileMenu">
                        <img src="@/assets/icons/plusSign2.png" alt="[Plus Sign]" class="header-icon">
                        <span class="header-button button-primary-text">Om oss</span>
                    </router-link>
                    <router-link v-if="store.getIsLoggedIn" :to="{ path: `/fridge`, query: { id: this.id } }" class="button-primary" @click="closeMobileMenu">
                        <span>Kjøleskap</span>
                    </router-link>
                    <router-link v-if="store.getIsLoggedIn" :to="{ path: `/shoppingList`, query: { id: this.id, sortBy: 1 } }" class="button-primary" @click="closeMobileMenu">
                        <span>Handleliste</span>
                    </router-link>
                    <router-link v-if="store.getIsLoggedIn" :to="{ path: `/dinnerIdeas`, query: { id: this.id } }" class="button-primary" @click="closeMobileMenu">
                        <span>Middagsideer</span>
                    </router-link>
                    <router-link v-if="store.getIsLoggedIn" :to="{ path: `/weekPlanner`, query: { id: this.id } }" class="button-primary" @click="closeMobileMenu">
                        <span>Planlegg Uke</span>
                    </router-link>
                    <router-link v-if="store.getIsLoggedIn" to="/createAd" class="button-primary" @click="closeMobileMenu">
                        <span>Administrer Medlemmer</span>
                    </router-link>
                    <router-link :to="store.getIsLoggedIn ? { path: '/user', query: { id: store.getUserId } } : '/login'" class="button-primary" @click="closeMobileMenu">
                        <img src="@/assets/icons/padLock.png" alt="[Padlock]" class="header-icon">
                        <span class="header-button button-primary-text">{{ store.getIsLoggedIn ? (store.getFirstName || store.getEmail) : 'Logg In' }}</span>
                    </router-link>
                </div>


            </div>
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
    box-shadow: none;
    z-index: 1;
}

.navbar-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px) brightness(100%);
    -webkit-backdrop-filter: blur(10px) brightness(80%);
    z-index: -1;
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

.button-primary {
    color: #216869;
    margin-right: 2rem;
    text-align: center;
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


.brand-name,
.button-primary-text {
    color: #216869;
}

.hamburger-icon {
    color: #216869;
}

.mobile-menu-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2rem;
    color: #216869;
    cursor: pointer;
    z-index: 3;
}

.mobile-menu-content a {
    font-size: 1.25rem;
    font-weight: bold;
    color: #216869;
}

.mobile-menu-content a:hover {
    text-decoration: underline;
    color: #216869;
}


/* Mobile Menu */
.mobile-menu-icon {
    display: none;
    font-size: 1.5rem;
    cursor: pointer;
}

.mobile-menu-open {
    display: flex !important;
}

.hamburger-icon {
    font-size: 24px;
    cursor: pointer;
}


.mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    display: none;
}

.mobile-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
}

.mobile-menu-content {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(156, 197, 161);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    box-sizing: border-box;
    overflow: auto;
    z-index: 10000;
    gap: 2rem;
}


@media (max-width: 768px) {
    .mobile-menu-icon {
        display: block;
    }

    .mobile-menu {
        display: none;
    }

    .navbar-right {
        display: none;
    }
}

@media (min-width: 769px) {
    .mobile-menu-icon,
    .mobile-menu {
        display: none !important;
    }

    .navbar-right {
        display: flex;
    }
}

</style>

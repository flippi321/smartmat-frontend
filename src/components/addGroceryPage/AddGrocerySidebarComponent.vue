<template>
  <div class="fridge-sidebar" :class="{ collapsed: isCollapsed }">
    <h1 v-show="!isCollapsed || isMobile">Filtrer etter kategorier:</h1>
    <img class="collapse-button" :class="{ rotate: isRotated }" src="@/assets/icons/Details.png" alt="Details" @click="toggleSideBar"/>
    <div class="fridge-sidebar-content" v-if="!isCollapsed">
      <ul v-for="category in categories" :key="category.id" @click="changeCategory(category.id)" class="category-item">
        {{ category.name }}
      </ul>
    </div>

    <div class="selected-items" v-if="!isCollapsed">
      <h2>Valgte Varer:</h2>
      <ul>
        <li v-for="item in selected" :key="item.id">{{ item.amount }} {{ item.category.unit }} {{ item.name }} med {{ item.actualShelfLife }} dagers holdbarhet</li>
      </ul>
    </div>

    <button @click="sendItems" v-show="!isCollapsed"> Legg til {{ home }} </button>
    <button @click="cancel" v-show="!isCollapsed"> Avbryt </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: false,
      isRotated: false,
      isMobile: window.innerWidth <= 768,
    };
  },
  props: {
    categories: {
      type: Array,
      required: true,
    },
    selected: {
      type: Array,
      required: true
    },
    home: {
      type: String,
      required: true
    }
  },

  created() {
    window.addEventListener('resize', this.updateIsMobile);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateIsMobile);
  },
  methods: {
    updateIsMobile() {
      this.isMobile = window.innerWidth <= 768;
    },
    changeCategory(categoryId) {
      this.$emit("changeCategoryById", categoryId);
    },
    toggleSideBar() {
      this.isCollapsed = !this.isCollapsed;
      this.isRotated = !this.isRotated;
      this.$emit('toggle-sidebar', this.isCollapsed);
    },
    sendItems(){
      this.$emit('send-items')
    },
    cancel(){
      this.$emit('cancel')
    }
  }
}
</script>

<style>
.fridge-sidebar {
  position: relative;
  height: 100%;
  min-height: 100vh;
  flex: 0 0 500px;
  background-image: linear-gradient(white, rgba(255, 255, 255, 0));
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: flex 0.3s;
  overflow-y: auto;
  overflow-x: hidden;
}

.collapse-button {
  transform: rotate(90deg);
  position: absolute;
  margin-top: 60px;
  margin-right: 20px;
  height: 50px;
  width: 50px;
  cursor: pointer;
  transition: transform 0.3s;
}

.collapse-button.rotate {
  transform: rotate(180deg);
}

.fridge-sidebar.collapsed {
  flex: 0 0 60px;
}

.fridge-sidebar-content {
  height: 100%;
  overflow-y: auto;
  padding: 0 20px;
  box-sizing: border-box;
}
.fridge-sidebar h1 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.fridge-sidebar ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.fridge-sidebar .collapse-button {
  position: absolute;
  top: -70px;
  right: -30px;
  cursor: pointer;
  transition: transform 0.3s;
}

.fridge-sidebar .category-item {
  padding: 10px;
  background-color: #ffffff;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.fridge-sidebar .category-item:hover {
  background-color: #e9ecef;
}

.fridge-sidebar .category-item:active {
  background-color: #dee2e6;
}

.selected-items {
  margin-top: 10px;
}

.selected-items h2 {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}
.selected-items ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: calc(100% - 20px);
}

.selected-items li {
  padding: 5px;
  background-color: #f8f9fa;
  border-radius: 3px;
  margin-bottom: 5px;
}

@media screen and (max-width: 768px) {
  .fridge-sidebar-content{
    height: auto;
  }

  .collapsed{
    min-height: 100px;
  }

  .collapse-button {
    transform: rotate(180deg);
  }

  .collapse-button.rotate {
    transform: rotate(0deg);
  }
}
@media screen and (min-width: 769px) {
  .collapse-button {
    transform: rotate(90deg);
  }

  .collapse-button.rotate {
    transform: rotate(270deg);
  }
}
</style>
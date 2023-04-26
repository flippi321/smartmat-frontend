  <script setup>
  defineProps({
    items: {
      type: Array,
      required: true
    }
  });
  </script>

  <template>
    <div class="fridge-box-container">
      <div
          class="fridge-box"
          v-for="(item, index) in items"
          :key="index"
          @click="toggleExpand(item)"
          :class="{ expanded: expandedItem === item, hidden: expandedItem && expandedItem !== item }"
      >
        <img class="fridge-item-image" src="@/assets/icons/Logo.png" alt="Image" v-if="expandedItem !== item" />
        <div class="fridge-item-info" v-if="expandedItem !== item">
          <h3>{{ item.name }}</h3>
          <p class="description">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </template>

  <style>
  .fridge-box-container {
    margin-left: 50px;
    position: relative;
    left: 0;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }

  .fridge-box {
    background-color: white;
    height: 35vh;
    width: 90%;
    transition: all 0.3s;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }

  .fridge-item-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .fridge-item-info {
    font-size: 16px;
    text-align: center;
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.3s;
    background-color: gray;
  }

  .fridge-box.expanded {
    position: absolute;
    left: 15vh;
    height: 70vh;
    width: 70vw;
    z-index: 100;
  }

  .fridge-box.hidden {
    display: none;
  }

  @media screen and (max-width: 768px) {
    .fridge-box-container {
      grid-template-columns: repeat(2, 1fr);
      margin-left: 0;
      padding: 20px;
    }

    .fridge-box {
      height: 40vw;
      width: 40vw;
    }

    .fridge-box.expanded {
      height: 90%;
      width: 90%;
    }
  }
  </style>

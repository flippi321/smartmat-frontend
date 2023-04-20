<script setup>
defineProps({
  items: {
    type: [],
    required: true
  }
})
</script>

<template>
  <div class="box-container">
    <div class="box" v-for="(item, index) in items" :key="index" @click="seeItemDescription(item.id)">
      <div class="item-info">
        <h3>{{ item.name }}</h3>
        <p class="description">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    seeItemDescription(id){
      this.$router.push({ path: `/groceryItem`, query: { id } });
    }
  }
}
</script>

<style>
.box-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.box {
  width: calc(33.3% - 10px);
  margin-bottom: 20px;
}

@media screen and (max-width: 768px) {
  .box {
    width: calc(50% - 10px);
  }
}

@media screen and (max-width: 480px) {
  .box {
    width: 100%;
  }
}

.item-info {
  font-size: 16px;
  text-align: center;
}
</style>
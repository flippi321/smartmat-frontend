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
    <div class="box" v-for="item in items" :key="item.id">
      <div class="item-info">
        <div class="checkbox-and-name">
          <input type="checkbox" class="checkbox">
          <div class="name">{{ item.name }}</div>
        </div>
        <div class="edit-icon" @click.stop="seeItemDescription(item.id)">
          <img src="@/assets/icons/Edit.png" alt="Edit icon" class="edit-icon-img">
        </div>
        <div class="description">{{ item.description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    seeItemDescription(id){
      this.$router.push({ path: `/shoppingListItem`, query: { id } });
    }
  }
}
</script>

<style scoped>
.box-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.box {
  width: calc(50% - 10px);
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 10px;
  display: flex;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .box {
    width: 100%;
  }
}

.item-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.edit-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: auto;
}

.edit-icon-img {
  max-width: 100%;
  max-height: 100%;
}

.checkbox-and-name {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
}

.checkbox {
  margin-right: 10px;
}

.name {
  font-size: 18px;
  font-weight: 500;
}

.description {
  font-size: 16px;
  font-weight: 400;
  color: #666;
}
</style>

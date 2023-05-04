<template>
  <div class="box-container">
    <transition name="fade" mode="out-in" :duration="2000">
      <div class="success-box" v-if="showSaveSuccess">
        <span>Saved successfully!</span>
      </div>
    </transition>
    <div class="box" v-for="item in items" :key="item.groceryItemId">
      <div class="item-info">
        <div class="checkbox-and-name" @click.stop="updateSelectedItems(item)">
          <input type="checkbox" class="checkbox" v-model="item.selected">
          <div class="name">{{ item.name }}</div>
        </div>
        <div class="details-icon" @click="describeItem = describeItem === item ? null : item">
          <img src="@/assets/icons/Details.png" alt="Details" class="details-icon-img">
        </div>
      </div>
      <div v-if="describeItem === item">
        <GroceryItemComponent
            :item="item"
            acceptMessage="Lagre"
            declineMessage="Avbryt"
            @update="saveChanges"
            @decline="describeItem = null"
        />
      </div>
    </div>
  </div>
</template>

<script>
import GroceryItemComponent from '@/components/GroceryItemComponent.vue'

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  components: {
    GroceryItemComponent,
  },
  data() {
    return {
      describeItem: null,
      showSaveSuccess: false,
      currentlySelected: [],
    };
  },
  methods: {
    saveChanges(item) {
      this.showSaveSuccess = true;
      setTimeout(() => {
        this.showSaveSuccess = false;
      }, 3000);
      this.$emit('saved-changes', item);
    },

    updateSelectedItems(item) {
      item.selected = !item.selected;
      if (item.selected) {
        this.currentlySelected.push(item);
      }
      else {
        this.currentlySelected = this.currentlySelected.filter(
            selectedItem => selectedItem.groceryItemId !== item.groceryItemId
        );
      }
    },
  },
};
</script>

<style>
.success-box {
  position: fixed;
  top: 75px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  padding: 10px;
  background-color: green;
  color: white;
  text-align: center;
  font-weight: bold;
  border-radius: 15px;
  z-index: 100;
}

.box-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.box {
  width: 80%;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
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


.details-icon {
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.details-icon-img {
    max-width: 70%;
    max-height: 70%;
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
</style>

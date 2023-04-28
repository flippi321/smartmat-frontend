
<template>
    <div class="box-container">
        <transition name="fade" mode="out-in" :duration="2000">
            <div class="success-box" v-if="showSaveSuccess">
                <span>Saved successfully!</span>
            </div>
        </transition>
        <div class="box" v-for="item in items" :key="item.groceryItemId">
            <div class="item-info">
                <div class="checkbox-and-name">
                    <input type="checkbox" class="checkbox" :checked="item.selected" @change="toggleSelection(item)">
                    <div class="name">{{ item.name }}</div>
                </div>

                <div class="details-icon" @click="describeItem = describeItem === item ? null : item">
                    <img src="@/assets/icons/Details.png" alt="Details" class="details-icon-img">
                </div>
            </div>
            <div class="description" v-if="describeItem === item">
                <p>
                    Mengde:
                    <input type="number" v-model.number="item.amount" min="0" step="1">
                    {{ item.unit }}
                </p>
                <p>Forventet varighet: {{ item.expected_shelf_life }} dager</p>
                <p>
                    Faktisk varighet:
                    <input type="number" v-model.number="item.actual_shelf_life" min="0" step="1"> dager
                </p>
                <div class="button-container">
                    <button class="save-button" @click="saveChanges(item)">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: {
        items: {
            type: Array,
            required: true,
        },
        updateSelectedItems: {
            type: Function,
            required: true,
        },
    },
    data() {
        return {
            describeItem: null,
            showSaveSuccess: false,
            currentlySelected: [],
        };
    },
    computed: {
        selectedItemIds() {
            return this.currentlySelected.map((item) => item.groceryItemId);
        },
    },
    watch: {
        items: {
            deep: true,
            handler() {
                this.currentlySelected = this.items.filter(item => item.selected);
            },
        },
    },
    methods: {
        saveChanges(item) {
            this.showSaveSuccess = true
            setTimeout(() => {
                this.showSaveSuccess = false
            }, 3000)
            this.$emit('saved-changes', [item.groceryItemId, item.amount, item.actual_shelf_life])
        },
        toggleSelection(item) {
            const index = this.currentlySelected.findIndex(
                (selectedItem) => selectedItem.groceryItemId === item.groceryItemId
            );
            if (index > -1) {
                this.currentlySelected.splice(index, 1);
            } else {
                this.currentlySelected.push(item);
            }
            item.selected = !item.selected;

            // Call the updateSelectedItems function from the parent component
            this.updateSelectedItems(this.selectedItemIds);
        },

    },
};
</script>

<style>
.success-box {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  padding: 10px;
  background-color: green;
  color: white;
  text-align: center;
  font-weight: bold;
  border-radius: 15px;
  z-index: 999;       /* Set to a high number to be in front of everything else */
}

.box-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.box {
  width: 60%;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 75%;
  max-width: 800px;
  cursor: pointer;
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

.description {
  font-size: 16px;
  font-weight: 400;
  color: #666;
  margin-top: 10px;
}
</style>
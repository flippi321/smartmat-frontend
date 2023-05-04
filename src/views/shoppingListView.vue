<script setup>
defineProps({
    id: {
        type: Number,
        required: true
    }
})
</script>

<template>
    <div class="shopping-list-page">
        <div class="sidebar" v-if="showAddGroceries === false">
            <FilterBar
                    :sortChoices="sortingChoices" :list-id="this.id"
                    @moveToFridge="sendSelectedItems"
                    @removeItems="removeSelectedItems"
                    @add-items="this.showAddGroceries = true"
                    @changeSortBy="(n) => changeSorting(n)"
            />
        </div>
        <div class="groceries-container" v-if="showAddGroceries === false">
            <Groceries :items="items" ref="groceries" @saved-changes="updateItem"/>
        </div>
        <addGroceries
                v-if="showAddGroceries === true"
                :id="id"
                :home="'Handleliste'"
                @addSelected="handleAddGrocery"
                @close="hideGroceryDetailComponent"
        />
    </div>
</template>

<script>
import shoppingListService from "@/services/shoppingListService";
import Groceries from "@/components/shoppingListPage/shoppingListContents.vue"
import FilterBar from "@/components/shoppingListPage/shoppingListSortbar.vue";
import addGroceries from "@/components/AddGroceries.vue";

export default {
    components: {
        Groceries,
        FilterBar,
        addGroceries
    },
    data() {
        return {
            id: this.id,
            sortBy: 1,
            items: [],
            sortingChoices: [],
            showAddGroceries: false,
        };
    },
    created() {
        shoppingListService.getShoppingListContents(this.id).then(response => {
            this.items = response.data;
        });

        shoppingListService.getSortingChoices().then(response => {
            this.sortingChoices = response.data;
        });
    },

    methods: {
        updateItem(itemData) {
            console.log(shoppingListService.updateShoppingListItem(itemData))
        },

        sendSelectedItems() {
          //TODO FETCH HOUSEHOLD FRIDGE ID
          const selectedItems = this.$refs.groceries.$data.currentlySelected.map(item => item);
          console.log(selectedItems);
          shoppingListService.sendItemsToFridge(selectedItems, this.id, 1).then(() => {
            this.updateShoppingList();
          }).catch(error => {
            console.error("Error removing items from the list:", error);
          });
        },

      removeSelectedItems() {
        const selectedItems = this.$refs.groceries.$data.currentlySelected.map(item => item);
        console.log(selectedItems);
        shoppingListService.removeItemsFromList(selectedItems, this.id)
            .then(response => {
              console.log(response);
              this.updateShoppingList();
            })
            .catch(error => {
              console.error("Error removing items from the list:", error);
            });
      },


      changeSorting(sortingId) {
            this.sortBy = sortingId;
            this.updateShoppingList();
        },

        updateShoppingList() {
            shoppingListService.getShoppingListContents(this.id)
                .then(response => {
                    this.items = response.data;
                })
                .catch(error => {
                    console.error("Error updating shopping list:", error);
                });
        },

        showAddGroceriesComponent() {
            this.showAddGroceries = true;
        },

        hideGroceryDetailComponent() {
            this.showAddGroceries = false;
            this.updateShoppingList();
        },

        handleAddGrocery(items){
            console.log("Adding selected to shopping List:")
            console.log(items)

          shoppingListService.addMultipleItems(this.id, items)
              .then(response => {
                this.items = response.data;
              })
              .catch(error => {
                console.error("Error updating shopping list:", error);
              });
        }
    },
};
</script>

<style>
.shopping-list-page {
  display: flex;
  flex-wrap: wrap;
}

.sidebar {
  left: 0;
  top: -40px;
}

.groceries-container {
  width: 70%;
}

@media (max-width: 767px) {
  .sidebar,
  .groceries-container {
    width: 100%;
  }
}
</style>

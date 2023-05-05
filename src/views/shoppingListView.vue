<template>
    <div class="shopping-list-page">
        <div class="sidebar" v-if="showAddGroceries === false">
            <FilterBar
                    @moveToFridge="sendSelectedItems"
                    @removeItems="removeSelectedItems"
                    @add-items="this.showAddGroceries = true"
                    @search="filterByName"
            />
        </div>
        <div class="groceries-container" v-if="showAddGroceries === false">
            <Groceries
                :items="filteredItems"
                ref="groceries"
                @saved-changes="updateItem"/>
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
import householdService from "@/services/householdService";
import {useAuthStore} from "@/stores";

export default {
    components: {
        Groceries,
        FilterBar,
        addGroceries
    },
    data() {
        return {
            id: -1,
            fridge: -1,
            store: useAuthStore(),
            currentSearchTerm: '',
            items: [],
            filteredItems: [],
            showAddGroceries: false,
        };
    },
    created() {
      this.getListAndContents()
    },

    methods: {
      getListAndContents(){
        if(this.store.getHousehold !== -1){
          householdService.getUsersHousehold(this.store.getUserId).then(response => {
            console.log(response.data)
            this.id = response.data.shoppinglist.shoppinglistID;
            this.fridge = response.data.fridge.fridgeId;

            shoppingListService.getShoppingListContents(this.id).then(response => {
              this.items = response.data;
              this.filteredItems = this.items;
            });
          })
        } else {
          this.router.push("/joinHousehold")
        }
      },

      updateItem(item) {
        console.log("Updating item:" + item);
        shoppingListService.updateShoppingListItem(this.id, item).then(() => {
          this.updateShoppingList();
        }).catch(error => {
          console.error("Error updating item:", error);
        });
      },

      sendSelectedItems() {
        const selectedItems = this.$refs.groceries.$data.currentlySelected.map(item => item);
        console.log(selectedItems);
        shoppingListService.sendItemsToFridge(selectedItems, this.id, this.fridge).then(() => {
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

      filterByName(name){
        console.log(name)
        this.currentSearchTerm = name;
        this.applyFilters();
      },

      applyFilters() {
        shoppingListService.getShoppingListContents(this.id).then((response) => {
          this.items = response.data;

          let filtered = this.items;

          if ((this.currentSearchTerm && this.currentSearchTerm.trim() !== '') && this.currentSearchTerm !== '') {
            filtered = filtered.filter(item => item.name.toLowerCase().includes(this.currentSearchTerm.toLowerCase()));
          }

          this.filteredItems = filtered;
        });
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
          shoppingListService.addMultipleItems(this.id, items)
              .then(() => {
                this.updateShoppingList()
                this.applyFilters();
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

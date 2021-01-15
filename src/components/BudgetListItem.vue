<template>
  <div>
    <div class="list-item" v-for="(item, prop) in visibleCosts" :key="prop">
      <span class="budget-comment">{{ item.comment }}</span>
      <span class="budget-value" v-bind:class="budgetValueColor(item)">
        {{ isNegativeValueOrNot(item) }}
      </span>
      <i v-bind:class="itemIcon(item)"></i>
      <ElButton type="danger" size="mini" @click="openDeleteDialog(item.id)"
        >Delete</ElButton
      >

      <ElDialog
        title="Deleting budget item"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <span class="dialog-title">Are you sure to delete this item?</span>
        <span slot="footer" class="dialog-footer">
          <ElButton @click="dialogVisible = false">Cancel</ElButton>
          <ElButton type="danger" @click="deleteItem(filterStr)"
            >Confirm</ElButton
          >
        </span>
      </ElDialog>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "BudgetListItem",
  computed: {
    ...mapGetters("costs", ["filterStr", "visibleCosts", "delItem"]),
  },
  data: () => ({
    dialogVisible: false,
  }),
  methods: {
    ...mapActions("costs", [
      "deleteCost",
      "onFilterItems",
      "deleteCurrentItemId",
    ]),
    openDeleteDialog(id) {
      this.deleteCurrentItemId(id);
      this.dialogVisible = true;
    },
    deleteItem(filter) {
      this.deleteCost(this.delItem);
      this.onFilterItems(filter);
      this.dialogVisible = false;
    },
    isNegativeValueOrNot(item) {
      if (item.type === "OUTCOME") {
        let newItemValue = "";
        const charCodeSymbol = item.value.toString()[0].charCodeAt();
        if (charCodeSymbol === 45) {
          newItemValue = item.value.toString().slice(1);
        } else {
          newItemValue = item.value;
        }
        return `-${newItemValue}`;
      } else {
        return item.value;
      }
    },
    handleClose(done) {
      this.$confirm("Are you sure to close this dialog?")
        // eslint-disable-next-line no-unused-vars
        .then((_) => {
          done();
        })
        // eslint-disable-next-line no-unused-vars
        .catch((_) => {});
    },
    itemIcon(item) {
      return {
        "el-icon-top": item.type === "OUTCOME",
        "el-icon-bottom": item.type === "INCOME",
      };
    },
    budgetValueColor(item) {
      return {
        "text-red": item.type === "OUTCOME",
        "text-green": item.type === "INCOME",
      };
    },
  },
};
</script>

<style scoped>
.list-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
}

.budget-value {
  font-weight: bold;
  margin-left: auto;
  margin-right: 20px;
}

.dialog-title {
  font-size: 28px;
  font-weight: bold;
}

.el-button {
  margin-left: 12px;
}

.text-red {
  color: tomato;
}

.text-green {
  color: green;
}
</style>

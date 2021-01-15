<template>
  <div class="budget-list-wrap">
    <div class="sort-buttons">
      <ElButton
        class="sort-button"
        type="primary"
        size="medium"
        @click="incomesSortHandler"
        >Incomes</ElButton
      >
      <ElButton
        class="sort-button"
        type="primary"
        size="medium"
        @click="outcomesSortHandler"
        >Outcomes</ElButton
      >
      <ElButton
        class="sort-button"
        type="primary"
        size="medium"
        @click="showAll"
        >All</ElButton
      >
    </div>
    <ElCard :header="header">
      <template v-if="!isEmpty">
        <BudgetListItem />
      </template>
      <ElAlert v-else type="info" :title="emptyTitle" :closable="false" />
    </ElCard>
  </div>
</template>

<script>
import BudgetListItem from "@/components/BudgetListItem";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "BudgetList",
  components: {
    BudgetListItem,
  },
  data: () => ({
    header: "Budget List",
    emptyTitle: "Empty List",
  }),
  computed: {
    ...mapGetters("costs", ["visibleCosts", "filterStr"]),
    isEmpty() {
      return !Object.keys(this.visibleCosts).length;
    },
  },
  methods: {
    ...mapActions("costs", ["showAllCosts", "onFilterItems"]),
    incomesSortHandler() {
      this.onFilterItems("INCOME");
    },
    outcomesSortHandler() {
      this.onFilterItems("OUTCOME");
    },
    showAll() {
      this.showAllCosts();
    },
  },
};
</script>

<style scoped>
.budget-list-wrap {
  max-width: 500px;
  margin: auto;
}

.sort-buttons {
  padding: 20px;
}

.sort-button {
  text-transform: uppercase;
}
</style>

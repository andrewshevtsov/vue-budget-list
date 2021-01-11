<template>
  <div class="budget-list-wrap">
    <div class="sort-buttons">
      <ElButton
        class="sort-button"
        type="primary"
        size="medium"
        @click="incomesSortHandler"
        >Incomes</ElButton>
      <ElButton
        class="sort-button"
        type="primary"
        size="medium"
        @click="outcomesSortHandler"
        >Outcomes</ElButton>
      <ElButton
        class="sort-button"
        type="primary"
        size="medium"
        @click="showAll">All</ElButton>
    </div>
    <ElCard :header="header">
      <template v-if="!isEmpty">
        <BudgetListItem
          :visibleItems="visibleItems"
          :filter="filter"
          @deleteItem="onDeleteItem" />
      </template>
      <ElAlert v-else type="info" :title="emptyTitle" :closable="false" />
    </ElCard>
  </div>
</template>

<script>
import BudgetListItem from '@/components/BudgetListItem';

export default {
  name: 'BudgetList',
  components: {
    BudgetListItem,
  },
  props: {
    visibleItems: {
      type: Object,
      default: () => ({}),
    },
    filter: {
      type: String,
    },
  },
  data: () => ({
    header: 'Budget List',
    emptyTitle: 'Empty List',
  }),
  computed: {
    isEmpty() {
      return !Object.keys(this.visibleItems).length
    }
  },
  methods: {
    onDeleteItem(id, filter) {
      this.$emit('onDeleteItem', id, filter);
    },
    incomesSortHandler() {
      this.$emit('sortByIncome', 'incomes');
    },
    outcomesSortHandler() {
      this.$emit('sortByOutcome', 'outcomes');
    },
    showAll() {
      this.$emit('showAll', 'all');
    }
  },
}
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
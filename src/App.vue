<template>
  <div id="app">
    <Form @submitForm="onFormSubmit" />
    <TotalBalance :total="totalBalance" />
    <BudgetList
      :visibleItems="visibleItems"
      :filter="filter"
      @sortByIncome="onSortByIncome"
      @sortByOutcome="onSortByOutcome"
      @showAll="onShowAllItems"
      @onDeleteItem="onDeleteItem" />
  </div>
</template>

<script>
import BudgetList from '@/components/BudgetList';
import TotalBalance from '@/components/TotalBalance';
import Form from '@/components/Form';

export default {
  name: 'App',
  components: {
    BudgetList,
    TotalBalance,
    Form,
  },
  data: () => {
    return {
      list: {
        1: {
          type: 'INCOME',
          value: 100,
          comment: 'Some income comment',
          id: 1
        },
        2: {
          type: 'OUTCOME',
          value: -50,
          comment: 'Some outcome comment',
          id: 2
        },
        3: {
          type: 'INCOME',
          value: 200,
          comment: 'Some outcome comment',
          id: 3
        },
        4: {
          type: 'OUTCOME',
          value: 50,
          comment: 'Some outcome comment',
          id: 4
        },
        5: {
          type: 'INCOME',
          value: 500,
          comment: 'Some income comment',
          id: 5
        },
        6: {
          type: 'OUTCOME',
          value: 200,
          comment: 'Some outcome comment',
          id: 6
        },
      },
      visibleItems: {},
      filter: 'all',
    }
  },
  mounted: function() {
    this.filterItem(this.filter);
  },
  methods: {
    onFormSubmit(data) {
      const newObj = {
        ...data,
        id: String(Math.random()),
      };
      this.$set(this.list, newObj.id, newObj);
      this.filterItem('all');
    },
    onSortByIncome(filter) {
      this.filter = filter;
      this.filterItem(filter);
    },
    onSortByOutcome(filter) {
      this.filter = filter;
      this.filterItem(filter);
    },
    onShowAllItems(filter) {
      this.filter = filter;
      this.filterItem(filter);
    },
    filterItem(filter) {
      let moneyItems = Object.values(this.list);
      switch (filter) {
        case 'all':
          this.visibleItems = { ...moneyItems };
          break;

        case 'incomes':
          this.visibleItems = { ...moneyItems.filter(item => item.type !== 'OUTCOME') };
          break;

        case 'outcomes':
          this.visibleItems = { ...moneyItems.filter(item => item.type !== 'INCOME') };
          break;
      
        default:
          this.visibleItems = { ...moneyItems };
      }
    },
    onDeleteItem(id, filter) {
      this.$delete(this.list, id);
      this.filterItem(filter);
    },
  },
  computed: {
    totalBalance() {
      return Object.values(this.visibleItems).reduce((acc, item) => {
        if ((item.type === 'OUTCOME') && !(item.value.toString().trim().startsWith('-'))) {
          return acc + -Math.abs(item.value);
        } else {
          return acc + item.value;
        }
      }, 0)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

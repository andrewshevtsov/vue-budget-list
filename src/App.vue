<template>
  <div id="app">
    <Form @submitForm="onFormSubmit" />
    <TotalBalance :total="totalBalance" />
    <BudgetList :visibleItems="visibleCosts" />
  </div>
</template>

<script>
import BudgetList from "@/components/BudgetList";
import TotalBalance from "@/components/TotalBalance";
import Form from "@/components/Form";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    BudgetList,
    TotalBalance,
    Form,
  },
  mounted: function() {
    this.showAllCosts();
  },
  computed: {
    ...mapGetters("costs", ["visibleCosts", "filterStr"]),
    totalBalance() {
      return Object.values(this.visibleCosts).reduce((acc, item) => {
        if (
          item.type === "OUTCOME" &&
          !item.value
            .toString()
            .trim()
            .startsWith("-")
        ) {
          return acc + -Math.abs(item.value);
        } else {
          return acc + item.value;
        }
      }, 0);
    },
  },
  methods: {
    ...mapActions("costs", ["addNewCost", "showAllCosts", "onFilterItems"]),
    onFormSubmit(data) {
      const newCost = {
        ...data,
      };
      this.addNewCost(newCost);
      this.onFilterItems(this.filterStr);
    },
  },
};
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

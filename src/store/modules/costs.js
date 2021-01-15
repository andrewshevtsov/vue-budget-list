import Vue from "vue";

const costsStore = {
  namespaced: true,
  // STATE
  state: {
    list: {
      1: {
        type: "INCOME",
        value: 100,
        comment: "+100",
        id: 1,
      },
      2: {
        type: "OUTCOME",
        value: -50,
        comment: "-50",
        id: 2,
      },
      3: {
        type: "INCOME",
        value: 200,
        comment: "+200",
        id: 3,
      },
      4: {
        type: "OUTCOME",
        value: 50,
        comment: "-50",
        id: 4,
      },
      5: {
        type: "INCOME",
        value: 500,
        comment: "+500",
        id: 5,
      },
      6: {
        type: "OUTCOME",
        value: 200,
        comment: "-200",
        id: 6,
      },
      7: {
        type: "INCOME",
        value: 5000,
        comment: "+5000",
        id: 7,
      },
      8: {
        type: "OUTCOME",
        value: 600,
        comment: "-600",
        id: 8,
      },
    },
    visibleItems: {},
    filter: "ALL",
    currentDeleteItemId: "",
  },
  // GETTERS
  getters: {
    costsList: ({ list }) => list,
    visibleCosts: ({ visibleItems }) => visibleItems,
    filterStr: ({ filter }) => filter,
    delItem: ({ currentDeleteItemId }) => currentDeleteItemId,
  },
  // MUTATIONS
  mutations: {
    ADD_NEW_COST(state, newCost) {
      Vue.set(state.list, newCost.id, newCost);
      state.visibleItems = state.list;
    },
    DELETE_COST(state, id) {
      Vue.delete(state.list, id);
    },
    SORT_BY_INCOME(state, data) {
      state.filter = data.filter;
      state.visibleItems = { ...data.incomesItems };
    },
    SORT_BY_OUTCOME(state, data) {
      state.filter = data.filter;
      state.visibleItems = { ...data.outcomesItems };
    },
    SHOW_ALL_COSTS(state, allItems) {
      state.visibleItems = { ...allItems };
      state.filter = "ALL";
    },
    ON_FILTER_ITEMS(state, data) {
      state.filter = data.filter;
      state.visibleItems = { ...data.filteredVisibleItems };
    },
    DELETE_CURRENT_ITEM_ID(state, id) {
      state.currentDeleteItemId = id;
    },
  },
  // ACTIONS
  actions: {
    addNewCost({ commit }, newCost) {
      const addedCost = {
        ...newCost,
        id: String(Math.random()),
      };
      commit("ADD_NEW_COST", addedCost);
    },
    deleteCost({ commit }, id) {
      commit("DELETE_COST", id);
    },
    deleteCurrentItemId({ commit }, id) {
      commit("DELETE_CURRENT_ITEM_ID", id);
    },
    showAllCosts({ commit, state }) {
      const allItems = Object.values(state.list);
      commit("SHOW_ALL_COSTS", allItems);
    },
    onFilterItems({ commit, state }, filter) {
      let filteredVisibleItems = [];
      switch (filter) {
        case "INCOME":
          filteredVisibleItems = Object.values(state.list).filter(
            (item) => item.type !== "OUTCOME"
          );
          break;
        case "OUTCOME":
          filteredVisibleItems = Object.values(state.list).filter(
            (item) => item.type !== "INCOME"
          );
          break;
        case "ALL":
          filteredVisibleItems = state.list;
          break;

        default:
          filteredVisibleItems = state.list;
          break;
      }
      commit("ON_FILTER_ITEMS", { filter, filteredVisibleItems });
    },
  },
};

export default costsStore;

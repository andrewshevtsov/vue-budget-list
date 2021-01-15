import Vue from "vue";
import Vuex from "vuex";
import costs from "./modules/costs";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    costs,
  },
});

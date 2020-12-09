import { createStore } from "vuex";

export default createStore({
  state () {
    return {
      count: 0,
    };
  },
  getters: {
    count (state) {
      return state.count
    }
  },
  mutations: {
    increment (state) {
      state.count++;
    },
  },
  actions: {
    increment (context) {
      context.commit("increment");
    },
  },
});
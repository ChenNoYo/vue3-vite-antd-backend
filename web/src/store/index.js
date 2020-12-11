/*
 * @Descripttion: 
 * @Author: NoYo
 * @Date: 2020-12-09 14:56:59
 * @LastEditTime: 2020-12-11 15:40:58
 */
import { createStore } from "vuex";

export default createStore({
  state () {
    return {
      user: {},
    };
  },
  getters: {
  },
  mutations: {
    setUser: (state, user) => {
      delete user.password
      state.user = user
      window.localStorage.setItem('userName', user.userName)
    },
  },
  actions: {
  },
});
/*
 * @Descripttion: 
 * @Author: NoYo
 * @Date: 2020-12-29 15:54:42
 * @LastEditTime: 2021-01-29 09:50:22
 */
export default {
  namespaced: true,//使用命名空间，这样只在局部使用
  state () {
    return {
      user: {},
    };
  },
  getters: {
    user (state) {
      return state.user
    },
  },
  mutations: {
    // 保存用户信息
    setUser: (state, user) => {
      state.user = user
      window.localStorage.setItem('userName', user.userName)
    },
  },
  actions: {
  },
}
import api from '/@/api'
const state = {
  configs: {},
  menuTree: []
}
const getters = {
  configs: (state) => {
    return state.configs
  },
  menuTree: (state) => {
    return state.menuTree
  }
}
const mutations = {
  setConfigs: (state, configs) => {
    state.configs = configs
  },
  setMenuTree: (state, menuTree) => {
    state.menuTree = menuTree
  }
}

const actions = {
  async getConfigs ({ commit, state }) {
    if (!state.configs.length) {
      try {
        const res = await api.common.getConfigs()
        commit('setConfigs', res)
        return Promise.resolve(res)
      } catch (e) {
        return Promise.reject(e)
      }
    }
  },
  async getMenuTree ({ commit }) {
    try {
      const res = await api.sys.menu.tree()
      commit('setMenuTree', res)
      return Promise.resolve(res)
    } catch (e) {
      return Promise.reject(e)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

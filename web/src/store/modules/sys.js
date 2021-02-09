import api from '/@/api'
const state = {
  configs: {},
  menuTree: []
}
const getters = {
  configs: (state) => {
    return state.configs
  }
}
const mutations = {
  setConfigs: (state, configs) => {
    state.configs = configs
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

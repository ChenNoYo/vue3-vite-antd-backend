import { setToken, removeToken } from '/@/config/auth'
import api from '/@/api'
import router from '/@/router'
const state = {
	userInfo: {}
}
const getters = {
	userInfo: (state) => {
		return state.userInfo
	}
}
const mutations = {
	SET_USERINFO: (state, userInfo) => {
		state.userInfo = userInfo
	},
	RESET_USERINFO: (state, userInfo) => {
		state.userInfo = {}
	}
}

const actions = {
	async login ({ commit }, userInfo) {
		try {
			const res = await api.login(userInfo)
			if (res.status === 200) {
				setToken()
				return
			}
		} catch (e) {
			return e
		}
	},
	async getUserInfo ({ commit }) {
		try {
			const res = await api.getUserInfo()
			let { user } = res
			commit('SET_USERINFO', user)
			return Promise.resolve(res)
		} catch (e) {
			return Promise.reject()
		}
	},
	async logout ({ commit }) {
		try {
			const res = await api.logout()
			commit('RESET_USERINFO')
			removeToken()
			return Promise.resolve()
		} catch (e) {
			return Promise.reject()
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

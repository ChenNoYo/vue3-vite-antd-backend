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
	setUserInfo: (state, userInfo) => {
		state.userInfo = userInfo
	},
	resetUserInfo: (state, userInfo) => {
		state.userInfo = {}
	}
}

const actions = {
	async login ({ commit }, userInfo) {
		try {
			await api.common.login(userInfo)
			setToken()
			return Promise.resolve()
		} catch (e) {
			console.log(e)
			return Promise.reject(e)
		}
	},
	async getUserInfo ({ commit }) {
		try {
			const res = await api.common.getUserInfo()
			let { user } = res
			commit('setUserInfo', user)
			return Promise.resolve(res)
		} catch (e) {
			console.log(e)
			return Promise.reject(e)
		}
	},
	async logout ({ commit }) {
		try {
			await api.common.logout()
			commit('resetUserInfo')
			removeToken()
			return Promise.resolve()
		} catch (e) {
			console.log(e)
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

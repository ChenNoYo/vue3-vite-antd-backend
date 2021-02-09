import { setToken, removeToken } from '/@/config/auth'
import api from '/@/api'
import router from '/@/router'
const state = {
	userInfo: {},
	permission: [],
	menuTree: []
}
const getters = {
	userInfo: (state) => {
		return state.userInfo
	},
	permission: (state) => {
		return state.permission
	},
	menuTree: (state) => {
		return state.menuTree
	}
}
const mutations = {
	setUserInfo: (state, userInfo) => {
		state.userInfo = userInfo
	},
	resetUserInfo: (state, userInfo) => {
		state.userInfo = {}
	},
	setPermission: (state, permission) => {
		state.permission = permission
	},
	setMenuTree: (state, menuTree) => {
		state.menuTree = menuTree
	},
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
			let { user, permission, menuTree } = res
			commit('setUserInfo', user)
			commit('setPermission', permission)
			commit('setMenuTree', menuTree)
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

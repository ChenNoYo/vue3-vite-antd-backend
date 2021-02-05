import router from './router'
import { getToken } from '/@/config/auth'
import store from './store'
import asyncRoutes from './router/asyncRoutes'

const whiteList = ['/login', '404']

router.beforeEach(async (to, from, next) => {
	const token = getToken()
	const userInfo = store.state.user.userInfo
	document.title = to.meta.title || 'vite-app'
	if (to.path === '/login') {
		if (token) {
			next('/main')
		} else {
			next()
		}
	} else {
		if (whiteList.indexOf(to.path) !== -1) {
			next()
		} else {
			if (token) {
				if (JSON.stringify(userInfo) == '{}') {
					const res = await store.dispatch('user/getUserInfo').then(res => { })
					asyncRoutes.forEach((item) => {
						router.addRoute(item)
					})
					next(to.path)
				} else {
					next()
				}
			} else {
				next('/login')
			}
		}
	}
})

function filterRoutes (asRoutes, usRoutes) {
	//filter your Routes
	console.log(asRoutes, usRoutes)
	return asRoutes
}

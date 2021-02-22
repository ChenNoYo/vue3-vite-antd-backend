import router from './router'
import { getToken, } from '/@/config/auth'
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
					const { menuTreeMap, permission } = await store.dispatch('user/getUserInfo')
					filterRoutes(asyncRoutes, menuTreeMap, permission).forEach((item) => {
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

function filterRoutes (asRoutes, menuTreeMap, permission) {
	//filter your Routes
	let addRoutes = asRoutes.filter(asR => {
		return hasPermission(permission, asR)
	})
	addRoutes.forEach(route => {
		route.meta.title = menuTreeMap[route.name]
		if (route.children && route.children.length) {
			route.children = filterRoutes(route.children, menuTreeMap, permission)
		}
	})
	return addRoutes
}
function hasPermission (permission, route) {
	return route.name == '404' || route.name == 'Redirect' || permission.indexOf(route.name) !== -1 && route.meta.menu
}
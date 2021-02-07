import AppLayout from '/@/views/layout'

const asyncRoutes = [
	{
		path: '/main',
		name: 'main',
		redirect: '/home',
		component: AppLayout,
		meta: { title: '菜单' },
		children: [
			{
				path: '/home',
				name: 'home',
				meta: { title: '首页' },
				component: () => import('/@/views/home')
			}
		]
	},
	{
		name: 'sys',
		redirect: '/menu',
		meta: { title: '系统设置' },
		component: AppLayout,
		children: [
			{
				path: '/menu',
				name: 'menu',
				meta: { title: '菜单' },
				component: () => import('/@/views/sys/menu')
			},
			{
				path: '/role',
				name: 'role',
				meta: { title: '角色' },
				component: () => import('/@/views/sys/role')
			},
			{
				path: '/permission',
				name: 'permission',
				meta: { title: '权限' },
				component: () => import('/@/views/sys/permission')
			},
			{
				path: '/:pathMatch(.*)*',
				name: '404',
				meta: { title: '404' },
				component: () => import('/@/views/404/')
			}
		]
	}
]

export default asyncRoutes

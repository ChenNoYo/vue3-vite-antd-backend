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
				meta: { title: '菜单设置' },
				component: () => import('/@/views/sys/menu')
			},
			{
				path: '/role',
				name: 'role',
				meta: { title: '角色设置' },
				component: () => import('/@/views/sys/role')
			}
		]
	}
]

export default asyncRoutes

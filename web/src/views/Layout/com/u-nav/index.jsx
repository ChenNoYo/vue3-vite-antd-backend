import {
	onMounted,
	onUnmounted,
	reactive,
	toRefs,
	watch,
	watchEffect,
	computed,
	getCurrentInstance,
	defineComponent
} from 'vue'

import { useRoute, useRouter } from 'vue-router'
import { AppstoreOutlined, MenuOutlined } from '@ant-design/icons-vue'

export default defineComponent(() => {
	let { $api, $message, $store } = getCurrentInstance().appContext.config.globalProperties
	const router = useRouter()
	const route = useRoute()
	const state = reactive({
		title: '后台管理系统',
		collapsed: false,
		openKeys: computed(() => {
			return route.matched.map((item) => {
				return item.name
			})
		}),
		selectedKeys: computed(() => {
			return [route.name]
		}),
		menuTree: [
			{
				menuName: '首页',
				name: 'home'
			},
			{
				menuName: '系統設置',
				name: 'sys',
				children: [
					{ menuName: '菜单设置', name: 'menu' },
					{ menuName: '角色设置', name: 'role' }
				]
			}
		]
	})
	watchEffect(() => {
		console.log(route)
	})
	const renderMenuItem = (item) => {
		return (
			<a-menu-item
				key={item.name}
				onClick={() => {
					linkTo(item)
				}}>
				<AppstoreOutlined />
				<span>{item.menuName}</span>
			</a-menu-item>
		)
	}
	const renderSubMenu = (subMemu) => {
		const slots = {
			title: () => (
				<span>
					<MenuOutlined />
					<span>{subMemu.menuName}</span>
				</span>
			)
		}
		return (
			<a-sub-menu key={subMemu.name} v-slots={slots}>
				{subMemu.children.map((menuItem) => {
					return renderMenuItem(menuItem)
				})}
			</a-sub-menu>
		)
	}
	const linkTo = (item) => {
		console.log('item: ', item)
		router.push({ name: item.name })
	}
	const changeCollapse = (e) => {
		state.collapsed = e
	}
	return () => (
		<a-layout-sider
			class="u-nav"
			v-model={state.collapsed}
			collapsible
			onCollapse={changeCollapse}>
			<div class="logo" v-show={!state.collapsed}>
				{state.title}
			</div>
			<a-menu
				theme="dark"
				defaultOpenKeys={state.openKeys}
				selectedKeys={state.selectedKeys}
				mode="inline">
				{state.menuTree.map((item) => {
					if (item.children && item.children.length) {
						return renderSubMenu(item)
					} else {
						return renderMenuItem(item)
					}
				})}
			</a-menu>
		</a-layout-sider>
	)
})
import './style.less'

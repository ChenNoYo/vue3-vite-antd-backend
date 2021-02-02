import {
	onMounted,
	onUnmounted,
	reactive,
	toRefs,
	watch,
	watchEffect,
	computed,
	getCurrentInstance,
	defineComponent,
} from 'vue'

import { useRoute, useRouter } from 'vue-router'

import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'

export default defineComponent(() => {
	const {
		$api,
		$store,
		$confirm,
		$destroyAll,
		$message,
		$router,
	} = getCurrentInstance().appContext.config.globalProperties
	const state = reactive({})
	const user = $store.getters['user/user']
	const tags = $store.getters['tag/tags']
	function handleChange() {}
	function logout() {
		$confirm({
			okText: '确定',
			cancelText: '取消',
			content: '确定退出账号吗',
			onOk() {
				$api.logout().then(() => {
					$message.success('退出成功', 1).then(() => {
						$router.push({ path: '/login' })
					})
				})
			},
			onCancel() {
				$destroyAll()
			},
		})
	}
	function tagClick(tag) {
		$store.commit('tag/setActiveTag', tag)
	}
	function closeTag(tag) {
		$store.commit('tag/closeTag', tag)
	}
	const slots = {
		overlay: () => (
			<a-menu>
				<a-menu-item>
					<span onClick={logout}>退出账号</span>
				</a-menu-item>
				<a-menu-item>
					<span>修改密码</span>
				</a-menu-item>
			</a-menu>
		),
	}
	return () => (
		<header class="u-header">
			<a-dropdown v-slots={slots}>
				<a>
					{user.userName}
					<DownOutlined />
				</a>
			</a-dropdown>
		</header>
	)
})
import './style.less'

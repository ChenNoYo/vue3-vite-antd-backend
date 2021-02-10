import {
	getCurrentInstance,
	defineComponent,
	reactive
} from 'vue'
import { RuleRequire } from '/@/config/rules.js'
import useForm from '/@/mixins/useForm'
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'

export default defineComponent(() => {
	const {
		$api,
		$store,
		$confirm,
		$destroyAll,
		$message,
		$router
	} = getCurrentInstance().appContext.config.globalProperties
	const userInfo = $store.getters['user/userInfo']
	function logout () {
		$confirm({
			okText: '确定',
			cancelText: '取消',
			content: '确定退出账号吗',
			onOk () {
				$store.dispatch('user/logout').then(() => {
					$router.push({ path: '/login' })
				})
			}
		})
	}
	const state = reactive({
		visible: false
	})
	const form = reactive({
		oldP: '',
		newP: ''
	})
	const rules = reactive({
		oldP: [RuleRequire('旧密码')],
		newP: [RuleRequire('新密码')]
	})
	const { onSubmit, validateInfos } = useForm(form, rules, state, null, confirm)
	function confirm (formData) {
		$api.common.updatePassword(formData).then(res => {
			$message.success({ content: '修改成功', key: 'message' })
			state.visible = false
		})
	}
	function renderModol () {
		const slots = {
			footer: () => (
				<div class="model-footer">
					<a-button onClick={onSubmit} type="primary">
						提交
					</a-button>
				</div>
			)
		}
		return (
			<a-modal
				centered
				vModel={[state.visible, 'visible']}
				title="修改密码"
				v-slots={slots}>
				<a-form model={form} label-col={{ span: 6 }} wrapper-col={{ span: 18 }}>
					<a-form-item label="旧密码" {...validateInfos.oldP}>
						<a-input
							type="password"
							vModel={[form.oldP, 'value']}
							placeholder="请输入旧密码"></a-input>
					</a-form-item>
					<a-form-item label="新密码"  {...validateInfos.newP}>
						<a-input
							type="password"
							vModel={[form.newP, 'value']}
							placeholder="请输入新密码"></a-input>
					</a-form-item>
				</a-form>
			</a-modal>
		)
	}
	const slots = {
		overlay: () => (
			<a-menu>
				<a-menu-item>
					<span onClick={logout}>退出账号</span>
				</a-menu-item>
				<a-menu-item>
					<span onClick={e => { state.visible = true }}>修改密码</span>
				</a-menu-item>
			</a-menu>
		)
	}
	return () => (
		<header class="u-header">
			<a-dropdown v-slots={slots}>
				<a>
					{userInfo.userName}
					<DownOutlined />
				</a>
			</a-dropdown>
			{	renderModol()}
		</header>
	)
})
import './style.less'

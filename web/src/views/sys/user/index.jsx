import { defineComponent, reactive, getCurrentInstance, onMounted, ref, toRaw, watch, watchEffect, computed } from 'vue'
import useForm from '/@/mixins/useForm'
import hasPermission from '/@/mixins/hasPermission'
import UTable from '/@/components/u-table/index.jsx'
import Configs from '/@/mixins/configs.js'
import { RuleRequire } from '/@/config/rules.js'
export default defineComponent({
	setup () {
		const {
			$api,
			$store,
			$message,
		} = getCurrentInstance().appContext.config.globalProperties
		const state = reactive({
			visible: false
		})
		const filterForm = reactive({
			userStatu: null
		})
		// 表格
		const columns = [
			{
				title: '用户账号',
				dataIndex: 'userName',
				align: 'center'
			},
			{
				title: '用户密码',
				dataIndex: 'password',
				align: 'center'
			},
			{
				title: '用户角色',
				dataIndex: 'role',
				align: 'center'
			},
			{
				title: '用户状态',
				dataIndex: 'userStatu',
				align: 'center'
			}
		]
		let tableRef = null
		function getTable (param) {
			return $api.sys.user.page(param)
		}
		function showEdit (data) {
			if (data._id) {
				form._id = data._id
			} else {
				form._id && (delete form._id)
			}
			getRoleList()
			state.visible = true
		}
		function del (ids) {
			$api.sys.user.del({ ids }).then(() => {
				$message.success({ content: '删除成功', key: 'message' })
				closeModel()
			})
		}
		function renderTable () {
			let slots = {
				filterForm: () => (
					<a-form model={filterForm} layout="inline">
						<a-form-item label="用户状态"  >
							<a-radio-group vModel={[filterForm.userStatu, 'value']} options={Configs.value.userStatu}>
							</a-radio-group>
						</a-form-item>
					</a-form >
				)
			}
			return (
				<UTable
					v-slots={slots}
					onLoad={(ref) => { tableRef = ref }}
					ref="table"
					tableConfig={{
						canEdit: hasPermission('userEdit'),
						getTable,
						columns,
						filterForm
					}}
					onShowEdit={showEdit}
					onDel={del} />
			)
		}
		// 弹窗
		const form = reactive({
			userName: '',
			password: '',
			role: '',
			userStatu: ''
		})
		const roleList = reactive({
			options: [],
			handleChange: (value) => {
				// console.log(`selected ${value}`)
			}
		})
		function getRoleList () {
			if (!roleList.options.length) {
				$api.sys.role.page({ pageSize: 999 }).then(res => {
					roleList.options = res.page.map(item => {
						return {
							label: item.roleName + ' / ' + item.roleDes,
							value: item.roleCode
						}
					})
				})
			}
		}
		function getDetail (_id) {
			$api.sys.user.detail({ _id }).then(res => {
				form.userName = res.userName
				form.password = res.password
				form.role = res.role
				form.userStatu = res.userStatu
			})
		}
		const rules = reactive({
			userName: [RuleRequire('用户账号')],
			password: [RuleRequire('用户密码')],
			role: [RuleRequire('用户用户')],
			userStatu: [RuleRequire('用户状态')]
		})
		const { onSubmit, validateInfos } = useForm(form, rules, state, getDetail, confirm)
		function confirm (formData) {
			if (formData._id) {
				// 编辑
				$api.sys.user.update(formData).then((res) => {
					$message.success({ content: '编辑成功', key: 'message' })
					closeModel()
				}).catch(err => {
					console.log(err)
				})
			} else {
				// 新增
				$api.sys.user.create(formData).then((res) => {
					$message.success({ content: '新增成功', key: 'message' })
					closeModel()
				}).catch(err => {
					console.log(err)
				})
			}
		}
		function closeModel () {
			state.visible = false
			tableRef.reLoad()
		}
		function renderModel () {
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
					title={'用户' + (form._id ? '编辑' : '新增')}
					v-slots={slots}>
					<a-form model={form} label-col={{ span: 6 }} wrapper-col={{ span: 18 }}>
						<a-form-item label="用户账号" {...validateInfos.userName}>
							<a-input
								vModel={[form.userName, 'value']}
								placeholder="请输入用户账号"
							></a-input>
						</a-form-item>
						<a-form-item label="用户密码"  {...validateInfos.password}>
							<a-input
								vModel={[form.password, 'value']}
								placeholder="请输入用户密码"
							></a-input>
						</a-form-item>
						<a-form-item label="用户角色"  {...validateInfos.role} >
							<a-radio-group vModel={[form.role, 'value']} options={roleList.options}>
								{/* {
									roleList.options.map(role => {
										return <a-radio style={{ display: 'block' }} value={role.value}>{role.label}</a-radio>
									})
								} */}
							</a-radio-group>
						</a-form-item>
						<a-form-item label="用户状态"  {...validateInfos.userStatu} >
							<a-radio-group vModel={[form.userStatu, 'value']} options={Configs.value.userStatu}>
							</a-radio-group>
						</a-form-item>
					</a-form>
				</a-modal >
			)
		}
		return () => (
			<div class="page">
				{renderTable()}
				{renderModel()}
			</div>
		)
	}
})

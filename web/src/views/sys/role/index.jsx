import { defineComponent, reactive, getCurrentInstance, onMounted, ref, toRaw, watch, watchEffect, computed } from 'vue'
import useForm from '/@/mixins/useForm'
import hasPermission from '/@/mixins/hasPermission'
import UTable from '/@/components/u-table/index.jsx'
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
		// 表格
		const columns = [
			{
				title: '角色名称',
				dataIndex: 'roleName',
				align: 'center'
			},
			{
				title: '角色编号',
				dataIndex: 'roleCode',
				align: 'center'
			},
			{
				title: '角色描述',
				dataIndex: 'roleDes',
				align: 'left'
			},
		]
		let tableRef = null
		function getTable (param) {
			return $api.sys.role.page(param)
		}
		function showEdit (data) {
			if (data._id) {
				form._id = data._id
			} else {
				form._id && (delete form._id)
			}
			state.visible = true
			getPermissionList()
		}
		function del (ids) {
			$api.sys.role.del({ ids }).then(() => {
				$message.success({ content: '删除成功', key: 'message' })
				closeModel()
			})
		}
		function renderTable () {
			return (
				<UTable
					onLoad={(ref) => { tableRef = ref }}
					ref="table"
					tableConfig={{
						canEdit: hasPermission('roleEdit'),
						getTable,
						columns,
					}}
					onShowEdit={showEdit}
					onDel={del} />
			)
		}
		// 弹窗
		const form = reactive({
			roleName: '',
			roleCode: '',
			roleDes: '',
			permission: []
		})
		const permissionList = reactive({
			options: [],
			indeterminate: false,
			checkAll: false,
			onCheckAllChange: (e) => {
				if (e.target.checked) {
					form.permission = permissionList.options.map(option => option.value)
				} else {
					form.permission = []
				}
			}
		})
		// 权限全选状态
		watch(
			[() => form.permission, () => permissionList.options],
			() => {
				checkPermission()
			}
		)
		function checkPermission () {
			let length = form.permission.length
			permissionList.indeterminate = !!length && length < permissionList.options.length
			if (permissionList.options.length) {
				permissionList.checkAll = length === permissionList.options.length
			}
		}
		function getPermissionList () {
			if (!permissionList.options.length) {
				$api.sys.permission.page({ pageSize: 999 }).then(res => {
					permissionList.options = res.page.map(item => {
						return {
							label: item.permissionType + '/' + item.permissionName + ':' + item.permissionDes,
							value: item.permissionCode
						}
					})
				})
			}
		}
		function getDetail (_id) {
			$api.sys.role.detail({ _id }).then(res => {
				form.roleName = res.roleName
				form.roleCode = res.roleCode
				form.roleDes = res.roleDes
				form.permission = res.permission
			})
		}
		const rules = reactive({
			roleName: [RuleRequire('角色名称')],
			roleCode: [RuleRequire('角色编号')],
			roleDes: [RuleRequire('角色描述')],
			permission: [RuleRequire('权限列表', 'array')]
		})
		const { onSubmit, validateInfos } = useForm(form, rules, state, getDetail, confirm)
		function confirm (formData) {
			if (formData._id) {
				// 编辑
				$api.sys.role.update(formData).then((res) => {
					$message.success({ content: '编辑成功', key: 'message' })
					closeModel()
				}).catch(err => {
					console.log(err)
				})
			} else {
				// 新增
				$api.sys.role.create(formData).then((res) => {
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
					title={'角色' + (form._id ? '编辑' : '新增')}
					width="800px"
					v-slots={slots}>
					<a-form model={form} label-col={{ span: 6 }} wrapper-col={{ span: 18 }}>
						<a-form-item label="角色名称" {...validateInfos.roleName}>
							<a-input
								vModel={[form.roleName, 'value']}
								placeholder="请输入角色名称"></a-input>
						</a-form-item>
						<a-form-item label="角色编号"  {...validateInfos.roleCode}>
							<a-input
								vModel={[form.roleCode, 'value']}
								disabled={form._id ? true : false}
								placeholder="请输入角色编号"></a-input>
						</a-form-item>
						<a-form-item label="角色描述"  {...validateInfos.roleDes}>
							<a-input
								vModel={[form.roleDes, 'value']}
								placeholder="请输入角色描述"></a-input>
						</a-form-item>
						<a-form-item label="权限列表" {...validateInfos.permission}>
							<div style={{ borderBottom: '1px solid #E9E9E9' }}>
								<a-checkbox
									vModel={[permissionList.checkAll, 'checked']}
									indeterminate={permissionList.indeterminate}
									onChange={permissionList.onCheckAllChange}>
									全选
    								</a-checkbox>
							</div>
							<a-checkbox-group class="vertical"
								vModel={[form.permission, 'value']}
								options={permissionList.options} />
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

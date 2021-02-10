import { defineComponent, reactive, getCurrentInstance, onMounted, ref, toRaw, watch, watchEffect, computed } from 'vue'
import { RuleRequire } from '/@/config/rules.js'
import useForm from '/@/mixins/useForm'
import hasPermission from '/@/mixins/hasPermission'
import UTable from '/@/components/u-table/index.jsx'
export default defineComponent({
	setup () {
		const {
			$api,
			$store,
			$message,
		} = getCurrentInstance().appContext.config.globalProperties
		const state = reactive({
			parentCode: '0',
			visible: false,
			menuTree: []
		})
		// 菜单
		onMounted(() => {
			getMenuTree()
		})
		function getMenuTree () {
			$api.sys.menu.tree().then(res => {
				state.menuTree = res
			})
		}
		function onSelect (selectedKeys, info) {
			state.parentCode = selectedKeys[0] || '0'
			tableRef.reLoad()
		}
		function renderTree () {
			return <a-tree
				replaceFields={
					{ title: 'menuName', key: 'menuCode' }
				}
				onSelect={onSelect}
				treeData={state.menuTree} />
		}

		// 表格
		const columns = [
			{
				title: '菜单名称',
				dataIndex: 'menuName',
				align: 'center'
			},
			{
				title: '菜单编号',
				dataIndex: 'menuCode',
				align: 'center'
			},
			{
				title: '排序',
				dataIndex: 'ranking',
				align: 'center'
			}
		]
		let tableRef = null
		function getTable (param) {
			param.parentCode = state.parentCode
			return $api.sys.menu.page(param)
		}
		function showEdit (data) {
			if (data._id) {
				form._id = data._id
			} else {
				form._id && (delete form._id)
				form.parentCode = state.parentCode
			}
			getPermissionList()
			state.visible = true
		}
		function del (ids) {
			$api.sys.menu.del({ ids }).then(() => {
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
						canEdit: hasPermission('menuEdit'),
						getTable,
						columns,
					}}
					onShowEdit={showEdit}
					onDel={del} />
			)
		}
		// 弹窗
		const form = reactive({
			menuName: '',
			menuCode: '',
			ranking: 9999,
			permissionCode: null,
			show: true,
			parentCode: ''
		})
		function getDetail (_id) {
			$api.sys.menu.detail({ _id }).then(res => {
				form.menuName = res.menuName
				form.menuCode = res.menuCode
				form.ranking = res.ranking
				form.parentCode = res.parentCode
				form.permissionCode = res.permissionCode
				form.show = res.show
			})
		}
		const permissionList = reactive({
			options: [],
			handleChange: (value) => {
				// console.log(`selected ${value}`)
			}
		})
		function getPermissionList () {
			if (!permissionList.options.length) {
				$api.sys.permission.page({ pageSize: 999 }).then(res => {
					permissionList.options = res.page.map(item => {
						return {
							label: item.permissionType + ' / ' + item.permissionName + ' / ' + item.permissionCode + ' / ' + item.permissionDes,
							value: item.permissionCode
						}
					})
				})
			}
		}
		const rules = reactive({
			menuName: [RuleRequire('菜单名称')],
			menuCode: [RuleRequire('菜单编号')],
			permissionCode: [RuleRequire('权限编号')]
		})
		const { onSubmit, validateInfos } = useForm(form, rules, state, getDetail, confirm)
		function confirm (formData) {
			if (formData._id) {
				// 编辑
				$api.sys.menu.update(formData).then((res) => {
					$message.success({ content: '编辑成功', key: 'message' })
					closeModel()
				}).catch(err => {
					console.log(err)
				})
			} else {
				// 新增
				$api.sys.menu.create(formData).then((res) => {
					$message.success({ content: '新增成功', key: 'message' })
					closeModel()
				}).catch(err => {
					console.log(err)
				})
			}
		}
		function closeModel () {
			state.visible = false
			getMenuTree()
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
					title={'菜单' + (form._id ? '编辑' : '新增')}
					v-slots={slots}>
					<a-form model={form} label-col={{ span: 6 }} wrapper-col={{ span: 18 }}>
						<a-form-item label="上级菜单编号">
							<a-input vModel={[form.parentCode, 'value']} disabled></a-input>
						</a-form-item>
						<a-form-item label="菜单名称" {...validateInfos.menuName}>
							<a-input
								vModel={[form.menuName, 'value']}
								placeholder="请输入菜单名称"></a-input>
						</a-form-item>
						<a-form-item label="菜单编号"  {...validateInfos.menuCode}>
							<a-input
								vModel={[form.menuCode, 'value']}
								disabled={form._id ? true : false}
								placeholder="请输入菜单编号"></a-input>
						</a-form-item>
						<a-form-item label="权限编号" {...validateInfos.permissionCode}>
							<a-select
								vModel={[form.permissionCode, 'value']}
								show-search
								placeholder="请选择权限编号"
								option-filter-prop="label"
								onChange={permissionList.handleChange}
								options={permissionList.options}
							>
							</a-select>
						</a-form-item>
						<a-form-item label="是否显示">
							<a-switch vModel={[form.show, "checked"]} />
						</a-form-item>
						<a-form-item label="菜单排序" {...validateInfos.ranking}>
							<a-input
								vModel={[form.ranking, 'value']}
								placeholder="请输入菜单排序"></a-input>
						</a-form-item>
					</a-form>
				</a-modal>
			)
		}
		return () => (
			<div class="page hasTree">
				{renderTree()}
				{renderTable()}
				{renderModel()}
			</div>
		)
	}
})

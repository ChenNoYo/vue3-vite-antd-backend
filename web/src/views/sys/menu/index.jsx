import { defineComponent, reactive, getCurrentInstance, onMounted, ref, toRaw, watch, watchEffect } from 'vue'
import { useForm } from '@ant-design-vue/use'
import UTable from '/@/components/u-table/index.jsx'
import { RuleRequire } from '/@/config/rules.js'
export default defineComponent({
	setup () {
		const {
			$api,
			$store,
			$confirm,
			$destroyAll,
			$message,
			$router
		} = getCurrentInstance().appContext.config.globalProperties
		const state = reactive({
			menuCode: '0',
			visible: false,
			menuTree: []
		})

		// 菜单
		onMounted(() => {
			getMenuTree()
		})
		function getMenuTree () {
			$api.getMenuTree().then((res) => {
				state.menuTree = res
			})
		}
		function onSelect (selectedKeys, info) {
			state.menuCode = selectedKeys[0]
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
			param.menuCode = state.menuCode
			return $api.getMenuPage(param)
		}
		function showEdit (data) {
			resetFields()
			if (data._id) {
				form._id = data._id
			} else {
				form._id && (delete form._id)
				form.parentCode = state.menuCode
			}
			state.visible = true
		}
		function del (ids) {
			$api.delMenu({ ids }).then(() => {
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
						canEdit: true,
						getTable,
						columns,
					}}
					onShowEdit={showEdit}
					onDel={del} />
			)
		}
		// 弹窗
		let form = reactive({
			menuName: '',
			menuCode: '',
			ranking: 9999,
			parentCode: '0'
		})
		function getMenuDetail (_id) {
			$api.getMenuDetail({ _id }).then(res => {
				form.menuName = res.menuName
				form.menuCode = res.menuCode
				form.ranking = res.ranking
				form.parentCode = res.parentCode
			})
		}
		const rules = reactive({
			menuName: [RuleRequire('菜单名称')],
			menuCode: [RuleRequire('菜单编号')]
		})
		const { resetFields, validate, validateInfos } = useForm(form, rules)
		watchEffect(() => {
			if (state.visible && form._id) {
				getMenuDetail(form._id)
			}
		})
		function onSubmit (e) {
			e.preventDefault()
			validate()
				.then(() => {
					let formData = toRaw(form)
					$message.loading({ content: '提交中', key: 'message' })
					if (formData._id) {
						// 编辑
						$api.updateMenu(formData).then((res) => {
							$message.success({ content: '编辑成功', key: 'message' })
							closeModel()
						}).catch(err => {
							console.log(err)
						})
					} else {
						// 新增
						$api.createMenu(formData).then((res) => {
							$message.success({ content: '新增成功', key: 'message' })
							closeModel()
						}).catch(err => {
							console.log(err)
						})
					}
				})
				.catch((err) => {
					console.log('error', err)
				})
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
					title="菜单编辑"
					v-slots={slots}>
					<a-form model={form} label-col={{ span: 6 }} wrapper-col={{ span: 18 }}>
						<a-form-item label="上级菜单编号">
							<a-input value={form.parentCode} disabled></a-input>
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

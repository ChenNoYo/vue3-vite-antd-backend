import { defineComponent, reactive, getCurrentInstance, onMounted, ref, toRaw, watch, watchEffect, computed } from 'vue'
import useForm from '/@/mixins/useForm'
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
				title: '排序',
				dataIndex: 'ranking',
				align: 'center'
			}
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
			roleName: '',
			roleCode: '',
			ranking: 9999
		})
		function getDetail (_id) {
			$api.sys.role.detail({ _id }).then(res => {
				form.roleName = res.roleName
				form.roleCode = res.roleCode
				form.ranking = res.ranking
			})
		}
		const rules = reactive({
			roleName: [RuleRequire('角色名称')],
			roleCode: [RuleRequire('角色编号')]
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
						<a-form-item label="排序" {...validateInfos.ranking}>
							<a-input
								vModel={[form.ranking, 'value']}
								placeholder="请输入排序"></a-input>
						</a-form-item>
					</a-form>
				</a-modal>
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

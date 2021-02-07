import { defineComponent, reactive, getCurrentInstance, onMounted, ref, toRaw, watch, watchEffect, computed } from 'vue'
import useForm from '/@/mixins/useForm'
import UTable from '/@/components/u-table/index.jsx'
import { RuleRequire } from '/@/config/rules.js'
import Configs from '/@/mixins/configs.js'
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
				title: '权限名称',
				dataIndex: 'permissionName',
				align: 'center'
			},
			{
				title: '权限编号',
				dataIndex: 'permissionCode',
				align: 'center'
			},
			{
				title: '权限类型',
				dataIndex: 'permissionType',
				align: 'center'
			},
			{
				title: '权限描述',
				dataIndex: 'permissionDes',
				align: 'left'
			}
		]
		let filterForm = reactive({
			permissionType: null
		})
		let tableRef = null
		function getTable (param) {
			return $api.sys.permission.page(toRaw(param))
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
			$api.sys.permission.del({ ids }).then(() => {
				$message.success({ content: '删除成功', key: 'message' })
				closeModel()
			})
		}
		function renderTable () {
			let slots = {
				filterForm: () => (
					<a-form model={filterForm} layout="inline">
						<a-form-item label="权限类型"  >
							<a-radio-group vModel={[filterForm.permissionType, 'value']} options={Configs.value.permissionType}>
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
						canEdit: true,
						getTable,
						columns,
						filterForm
					}}
					onShowEdit={showEdit}
					onDel={del} />
			)
		}
		// 弹窗
		let form = reactive({
			permissionName: '',
			permissionCode: '',
			permissionType: '',
			permissionDes: ''
		})
		function getDetail (_id) {
			$api.sys.permission.detail({ _id }).then(res => {
				form.permissionName = res.permissionName
				form.permissionCode = res.permissionCode
				form.permissionType = res.permissionType
				form.permissionDes = res.permissionDes
			})
		}
		const rules = reactive({
			permissionName: [RuleRequire('权限名称')],
			permissionCode: [RuleRequire('权限编号')],
			permissionType: [RuleRequire('权限类型')],
			permissionDes: [RuleRequire('权限描述')],
		})
		const { onSubmit, validateInfos } = useForm(form, rules, state, getDetail, confirm)
		function confirm (formData) {
			if (formData._id) {
				// 编辑
				$api.sys.permission.update(formData).then((res) => {
					$message.success({ content: '编辑成功', key: 'message' })
					closeModel()
				}).catch(err => {
					console.log(err)
				})
			} else {
				// 新增
				$api.sys.permission.create(formData).then((res) => {
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
					title={'权限' + (form._id ? '编辑' : '新增')}
					v-slots={slots}>
					<a-form model={form} label-col={{ span: 6 }} wrapper-col={{ span: 18 }}>
						<a-form-item label="权限名称" {...validateInfos.permissionName}>
							<a-input
								vModel={[form.permissionName, 'value']}
								placeholder="请输入权限名称"></a-input>
						</a-form-item>
						<a-form-item label="权限编号"  {...validateInfos.permissionCode}>
							<a-input
								vModel={[form.permissionCode, 'value']}
								disabled={form._id ? true : false}
								placeholder="请输入权限编号"></a-input>
						</a-form-item>
						<a-form-item label="权限类型"  {...validateInfos.permissionType} >
							<a-radio-group vModel={[form.permissionType, 'value']} options={Configs.value.permissionType}>
							</a-radio-group>
						</a-form-item>
						<a-form-item label="权限描述" {...validateInfos.permissionDes}>
							<a-textarea vModel={[form.permissionDes, 'value']} placeholder="请输入权权限描述" rows="3" />
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

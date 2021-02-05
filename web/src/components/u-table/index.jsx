import {
	onMounted,
	onUnmounted,
	reactive,
	toRefs,
	watch,
	watchEffect,
	getCurrentInstance,
	defineComponent
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
	props: {
		tableConfig: {
			type: Object,
			default: () => {
				return {}
			}
		},
		getTable: {
			type: Function,
			default: () => {
				new Function()
			}
		}
	},
	setup (props, { emit }) {
		const {
			$confirm,
			$message
		} = getCurrentInstance().appContext.config.globalProperties
		const state = reactive({
			tableLoading: false,
			pageSize: 10,
			pageNum: 1,
			total: 100,
			columns: [],
			tableList: [],
			selectedRowKeys: []
		})
		onMounted(() => {
			state.columns = []
			state.columns = props.tableConfig.columns
			state.columns.push({
				title: '操作',
				key: 'action',
				align: 'center',
				width: 200,
				slots: { customRender: 'action' }
			})
			reLoad()
			emit('load', { el: getCurrentInstance().ctx.$el, getTableList, reLoad })
		})
		function reLoad () {
			state.pageSize = 10
			state.pageNum = 1
			getTableList()
		}
		function getTableList () {
			state.tableLoading = true
			props.tableConfig
				.getTable({ pageSize: state.pageSize, pageNum: state.pageNum })
				.then((res) => {
					state.tableList = res.page
					state.total = res.total
					state.tableLoading = false
				})
		}
		function showEdit (row) {
			emit('showEdit', row)
		}
		function onSelectChange (selectedRowKeys) {
			state.selectedRowKeys = selectedRowKeys
		}
		function del (ids) {
			$confirm({
				okText: '确定',
				cancelText: '取消',
				content: '确定要删除数据吗',
				centered: true,
				onOk () {
					emit('del', ids)
				}
			})
		}
		function delAll () {
			if (state.selectedRowKeys.length) {
				del(state.selectedRowKeys)
			} else {
				$message.warning({ content: '列表选择不能为空', key: 'message' })
			}
		}
		const slots = {
			action: ({ record }) => (
				<div class="table-action">
					{
						props.tableConfig.canEdit && (
							<>
								<a-button type="primary" onClick={() => showEdit(record)}>编辑</a-button>
								<a-button type="danger" onClick={() => del([record._id])}>删除</a-button></>
						)
					}
				</div >
			)
		}
		return () => (
			<div class="u-table">
				{props.tableConfig.canEdit && (
					<div class="top-btns">
						<a-button type="primary" size="large" onClick={() => showEdit({})}>
							新增
						</a-button>
						<a-button type="danger" size="large" disabled={state.selectedRowKeys.length == 0} onClick={delAll}>
							删除
						</a-button>
					</div>
				)}
				<a-table
					row-selection={{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }}
					bordered
					loading={state.tableLoading}
					pagination={false}
					columns={state.columns}
					row-key={props.tableConfig.key || '_id'}
					dataSource={state.tableList}
					v-slots={slots}></a-table>
				<a-pagination
					onChange={getTableList}
					onShowSizeChange={getTableList}
					vModel={[state.pageNum, 'current']}
					vModel={[state.pageSize, 'pageSize']}
					show-size-changer
					total={state.total}
				/>
			</div >
		)
	}
})
import './style.less'

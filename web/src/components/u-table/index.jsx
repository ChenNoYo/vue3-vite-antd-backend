import {
	onMounted,
	reactive,
	getCurrentInstance,
	defineComponent,
	ref,
	toRaw
} from 'vue'
import { SearchOutlined } from '@ant-design/icons-vue';
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
	setup (props, { emit, slots }) {
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
			selectedRowKeys: [],
			keyWord: ''
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
			let param = { pageSize: state.pageSize, pageNum: state.pageNum, keyWord: state.keyWord }
			Object.keys(param).forEach(key => {
				let value = param[key]
				if (!value) {
					delete param[key]
				} else {
					param[key] = typeof param[key] === 'string' ? param[key].trim() : param[key]
				}
			})
			props.tableConfig
				.getTable(param)
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
		function userHandle (key, val) {
			state[key] = val
		}
		function renderFilterForm () {
			return (
				<div class="filter-form">
					<a-row>
						<a-col span="16">
							{slots.filterForm()}
						</a-col>
						<a-col span="8">
							<a-input-search
								vModel={[state.keyWord, 'value']}
								placeholder="请输入关键字"
								size="large"
								onSearch={getTableList}
								v-slots={{
									enterButton: () => (
										<a-button
											type="primary"
											size="large"
											loading={state.tableLoading}
											v-slots={{
												icon: () => (
													<SearchOutlined />
												)
											}}>
											搜索</a-button>
									)
								}}
							/>
						</a-col>
					</a-row>
				</div >
			)
		}
		function renderBtns () {
			return (
				<div class="top-btns">
					<a-button type="primary" size="large" onClick={() => showEdit({})}>
						新增
				</a-button>
					<a-button type="danger" size="large" disabled={state.selectedRowKeys.length == 0} onClick={delAll}>
						删除
				</a-button>
				</div>
			)
		}
		const tableSlots = {
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
				{slots.filterForm && renderFilterForm()}
				{props.tableConfig.canEdit && renderBtns()}
				<a-table
					row-selection={{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }}
					bordered
					loading={state.tableLoading}
					pagination={false}
					columns={state.columns}
					row-key={props.tableConfig.key || '_id'}
					dataSource={state.tableList}
					v-slots={tableSlots}></a-table>
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

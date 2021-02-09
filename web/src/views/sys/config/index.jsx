import { defineComponent, getCurrentInstance } from 'vue'
import UTable from '/@/components/u-table/index.jsx'
export default defineComponent({
	setup () {
		const {
			$api,
		} = getCurrentInstance().appContext.config.globalProperties
		// 表格
		const columns = [
			{
				title: '参数类别名称',
				dataIndex: 'propName',
				align: 'center'
			},
			{
				title: '参数类别编号',
				dataIndex: 'propCode',
				align: 'center'
			},
			{
				title: '参数名称',
				dataIndex: 'label',
				align: 'center'
			},
			{
				title: '参数值',
				dataIndex: 'value',
				align: 'center'
			}
		]
		function getTable (param) {
			return $api.sys.config.page(param)
		}
		function renderTable () {
			return (
				<UTable
					ref="table"
					tableConfig={{
						canEdit: false,
						noOperation: true,
						getTable,
						columns,
					}}
				/>
			)
		}
		return () => (
			<div class="page">
				{renderTable()}
			</div>
		)
	}
})

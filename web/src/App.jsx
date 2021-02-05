import { defineComponent } from 'vue'
// ant 中文化
import zhCN from 'ant-design-vue/es/locale/zh_CN'
export default defineComponent(() => {
	return () => (
		<a-config-provider locale={zhCN}>
			<router-view></router-view>
		</a-config-provider>
	)
})

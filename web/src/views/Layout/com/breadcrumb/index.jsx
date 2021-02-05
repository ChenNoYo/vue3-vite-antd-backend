import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
	setup() {
		const route = useRoute()
		return () => (
			<a-breadcrumb>
				{route.matched.map((item) => {
					return (
						<a-breadcrumb-item>
							{item.meta ? item.meta.title : item.name}
						</a-breadcrumb-item>
					)
				})}
			</a-breadcrumb>
		)
	}
})
import './style.less'

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
export default defineComponent(() => {
	return () => <div class="page" style={{ height: '3000px' }}>home</div>
})
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
import useFullScreen from '/@/mixins/useFullScreen'
import { useRoute, useRouter } from 'vue-router'
import { Tooltip } from 'ant-design-vue';
export default defineComponent(() => {
	function renderButton () {
		const { isFullScreen, toggleFullscreen } = useFullScreen()
		return (
			<a-tooltip
				vSlots={{
					title: () => (isFullScreen ? '退出全屏' : '全屏'),
					default: () => {
						return (
							<a-button onClick={toggleFullscreen}>{isFullScreen ? '退出全屏' : '全屏'}</a-button>
						)
					}
				}}>
			</a-tooltip>

		)
	}
	return () => <div class="page" style={{ height: '3000px' }}>
		{renderButton()}
	</div>
})

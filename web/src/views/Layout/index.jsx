import { defineComponent, Transition } from 'vue'

import UHeader from './com/u-header'
import UNav from './com/u-nav'

export default defineComponent(() => {
	const slots = {
		default: ({ Component }) => (
			<Transition name="fade">
				<Component />
			</Transition>
		)
	}
	return () => (
		<div class="layout">
			<UNav></UNav>
			<div class="layout-container">
				<UHeader></UHeader>
				<div class="show-container">
					<router-view v-slots={slots}></router-view>
				</div>
			</div>
		</div>
	)
})

import './style.less'

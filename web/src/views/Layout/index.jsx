import { defineComponent, Transition } from 'vue'

import UHeader from './com/u-header'
import UNav from './com/u-nav'
import Breadcrumb from './com/breadcrumb'

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
				<Breadcrumb></Breadcrumb>
				<div class="show-container">
					<div class="page-container">
						<router-view v-slots={slots}></router-view>
					</div>
				</div>
			</div>
		</div>
	)
})

import './style.less'

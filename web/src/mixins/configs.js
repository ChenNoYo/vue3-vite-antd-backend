import { reactive, computed } from 'vue'
import store from '../store/index.js'
store.dispatch('sys/getConfigs')
export default reactive(computed(() => {
  return store.getters['sys/configs']
}))



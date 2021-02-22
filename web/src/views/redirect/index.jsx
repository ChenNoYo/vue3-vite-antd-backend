import {
  defineComponent,
  onMounted,
  getCurrentInstance
} from 'vue'
export default defineComponent(() => {
  const {
    $router,
    $route
  } = getCurrentInstance().appContext.config.globalProperties
  onMounted(() => {
    $router.replace({ path: '/' + $route.params.path })
  })
  return () => { }
})
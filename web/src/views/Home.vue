<script>
import {
  h,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  ref,
  reactive,
  toRef,
  toRefs,
  watch,
  watchEffect,
} from 'vue'
import {
  useRoute,
  useRouter
} from 'vue-router'
// 从 vuex 中导入 useStore 方法
import { useStore } from 'vuex'
import UButton from '../components/u-button.vue'
import HelloWorld from '../components/HelloWorld.vue'
export default {
  components: { UButton, HelloWorld },
  render () {
    return h('div', [
      h('p', this.count),
      h('button', { onClick: this.add, vIf: false }, '增加'),
      h('p', this.state1),
      h('button', { onClick: this.add1 }, '增加'),
      h('p', this.state2),
      h('button', { onClick: this.add2 }, '增加'),
      h('button', { onClick: this.goOther }, 'Other'),
      h(UButton, {
        onClick: this.comClick,
        type: 'primary',
        name: 'comClick'
      }),
    ])
  },
  mounted () {
    // console.log("onMounted");
  },
  setup (props, ctx) {
    // 生命周期
    // onBeforeMount(() => {
    //   console.log("onBeforeMount");
    // });
    // onMounted(() => {
    //   console.log("onMounted");
    // });
    // onBeforeUpdate(() => {
    //   console.log("onBeforeUpdate");
    // });
    // onUpdated(() => {
    //   console.log("onUpdated");
    // });
    // onBeforeUnmount(() => {
    //   console.log("onBeforeUnmount");
    // });
    // onUnmounted(() => {
    //   console.log("onUnmounted");
    // });

    // ref 取值  需要加.value 模板中 不需要 多用于基本类型
    let count = ref(0);
    function add () {
      count.value++;
      count1.value += 2;
    }
    // return { count, add };

    // reactive 多用于引用类型
    let count1 = reactive({ value: 0 });
    // ref 的值改变会更新视图；toRef 的值改变不会更新视图
    // po0-                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        ref 是对传入数据的拷贝；toRef 是对传入数据的引用
    let obj = { count: 0 }
    let state1 = ref(obj.count)
    let state2 = toRef(obj, 'count')
    function add1 () {
      state1.value++
      console.log('原始值', obj)
      console.log('响应式数据对象', state1)

    }
    function add2 () {
      state2.value++
      console.log('原始值', obj)
      console.log('响应式数据对象', state2)
    }
    // 监听 1 只要改变就会运行 没法单独处理?
    // watchEffect(() => {
    //   console.log(count.value)
    //   console.log(count1.value)
    // })
    // watch([() => count, () => count1], ([newCount, newCount1], [oldCount, oldCount1]) => {
    //   console.log('newCount,newCount1: ', newCount, newCount1);
    //   console.log('oldCount,oldCount1: ', oldCount, oldCount1);
    // })
    // ref监听
    // watch(count, (newCount, oldCount) => {
    //   console.log('newCount,oldCount: ', newCount, oldCount);
    // })
    // reactive监听 
    // watch(count1, (newCount, oldCount) => {
    //   console.log('newCount.value,oldCount.value: ', newCount.value, oldCount.value);
    // })
    // 监听 2
    // const state = reactive({ count: 0, name: 'zs' })
    // watch(
    //   [() => state.count, () => state.name],
    //   ([newCount, newName], [oldvCount, oldvName]) => {
    //     console.log(oldvCount) // 旧的 count 值
    //     console.log(newCount) // 新的 count 值
    //     console.log(oldvName) // 旧的 name 值
    //     console.log(newName) // 新的 name 值
    //   }
    // )

    // setTimeout(() => {
    //   state.count++
    //   state.name = 'ls'
    // }, 1000)


    // store
    const store = useStore()
    console.log(store.getters.count)


    // 路由
    const route = useRoute()
    console.log('route.query', route.query)
    console.log('route: ', route);
    const router = useRouter()
    console.log('router: ', router);
    function goOther () {
      router.push({ path: '/Other' })
    }
    function comClick () {
      console.log('comClick')
    }
    return { count, add, state1, state2, add1, add2, goOther, comClick }
  },
}
</script>
<style>
</style>

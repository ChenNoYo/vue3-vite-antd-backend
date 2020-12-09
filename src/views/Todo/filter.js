/*
 * @Descripttion: 
 * @Author: NoYo
 * @Date: 2020-12-09 14:07:21
 * @LastEditTime: 2020-12-09 14:36:59
 */
import {
  onMounted,
  onUnmounted,
  reactive,
  toRefs,
  watch,
  watchEffect,
  computed
} from 'vue'
export default function (todoState) {
  const filters = {
    all (todos) {
      return todos
    },
    active (todos) {
      return todos.filter(todo => !todo.completed)
    },
    completed (todos) {
      return todos.filter(todo => todo.completed)
    }
  }
  const filterState = reactive({
    filterdTodos: computed(() => {
      return filters[filterState.visibility](todoState.todos)
    }),
    filters: ['all', 'completed', 'active'],
    visibility: 'all'
  })
  return {
    filterState
  }
}
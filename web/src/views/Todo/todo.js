/*
 * @Descripttion: 
 * @Author: NoYo
 * @Date: 2020-12-09 14:02:09
 * @LastEditTime: 2020-12-09 14:39:20
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
export default function () {
  const storage = {
    fetch () {
      return JSON.parse(localStorage.getItem('vue3-todos') || "[]")
    },
    save (todos) {
      localStorage.setItem('vue3-todos', JSON.stringify(todos))
    }
  }
  const todoState = reactive({
    title: '',
    todos: storage.fetch(),
    editedTodo: null,
    editTodoCache: '',
  })
  function addTodo (e) {
    todoState.todos.push({
      title: e.target.value,
      id: todoState.todos.length + 1,
      acompleted: false
    })
    todoState.title = ''
  }
  function removeTodo (todo) {
    todoState.todos.splice(todoState.todos.indexOf(todo), 1)
  }
  function editTodo (todo) {
    todoState.editTodoCache = todo.title
    todoState.editedTodo = todo
  }
  function editDone () {
    todoState.editedTodo = null
  }
  function editCancal (todo) {
    todo.title = todoState.editTodoCache
    todoState.editedTodo = null
  }
  watchEffect(() => {
    storage.save(todoState.todos)
  })
  return {
    todoState, addTodo, removeTodo, editTodo, editDone, editCancal
  }
}
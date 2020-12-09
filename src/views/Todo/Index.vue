<!--
 * @Descripttion: 
 * @Author: NoYo
 * @Date: 2020-12-09 08:42:37
 * @LastEditTime: 2020-12-09 14:39:08
-->
<template>
  <div class="">
    <input type="text"
           @keydown.enter="addTodo"
           autofocus
           placeholder="请输入代办事项"
           v-model="title">
    <ul class="todos">
      <li class="todo-item"
          v-for="todo in filterdTodos"
          :key="todo.id">
        <div class="input-edit"
             v-if="editedTodo===todo">
          <input type="text"
                 v-model="todo.title"
                 v-focus="editedTodo===todo"
                 @blur="editDone"
                 @keyup.enter="editDone"
                 @keyup.escape="editCancal(todo)">

        </div>
        <div class="view"
             v-else>
          <input type="checkbox"
                 v-model="todo.completed">
          <div class="title"
               @dblclick="editTodo(todo)">{{todo.title}}</div>
          <button class="close"
                  @click="removeTodo(todo)">X</button>
        </div>
      </li>
    </ul>
    <div class="filters">
      <span v-for="filter in filters"
            :class="{active:filter===visibility}"
            @click="visibility=filter">{{filter}}</span>
    </div>
  </div>
</template>

<script>
import {
  onMounted,
  onUnmounted,
  reactive,
  toRefs,
  watch,
  watchEffect,
  computed
} from 'vue'
import {
  useRoute,
  useRouter
} from 'vue-router'
import useTodo from './todo.js'
import useFilter from './filter.js'
export default {
  name: '',
  setup () {
    const { todoState, addTodo, removeTodo, editTodo, editDone, editCancal } = useTodo()
    const { filterState } = useFilter(todoState)
    return {
      ...toRefs(todoState),
      ...toRefs(filterState),
      addTodo, removeTodo, editTodo, editDone, editCancal
    }
  },
  directives: {
    'focus': (el, focus) => {
      if (focus.value) {
        el.focus()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.todos {
  .todo-item {
    .view {
      display: flex;
      * {
        margin: 5px;
      }
      .close {
        cursor: pointer;
      }
    }
  }
}
.filters {
  display: flex;
  span {
    margin: 5px;
    &.active {
      border: 1px solid #000;
    }
  }
}
</style>
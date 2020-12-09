/*
 * @Descripttion: 
 * @Author: NoYo
 * @Date: 2020-12-09 14:58:12
 * @LastEditTime: 2020-12-09 17:02:04
 */
/**
 * Created by lyt on 2017/6/30.
 * 全局指令
 */

let DirectiveList = []

DirectiveList.push({
  name: 'drag',
  directive: {
    bind: (el, binding) => {
      let header = el.children[0]
      header.onmousedown = function (e) {
        let originalX = e.clientX - parseFloat(el.style.left)
        let originalY = e.clientY - parseFloat(el.style.top)
        document.onmousemove = function (e) {
          let x = e.clientX - originalX
          let y = e.clientY - originalY
          el.style.left = x + 'px'
          el.style.top = y + 'px'
        }
        document.onmouseup = function () {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    }
  }
})
DirectiveList.push({
  name: 'dragimg',
  directive: {
    bind: (el, binding) => {
      el.onmousedown = function (e) {
        let originalX = e.clientX - parseFloat(el.style.left)
        let originalY = e.clientY - parseFloat(el.style.top)
        document.onmousemove = function (e) {
          let x = e.clientX - originalX
          let y = e.clientY - originalY
          el.style.left = x + 'px'
          el.style.top = y + 'px'
        }
        document.onmouseup = function () {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    }
  }
})
DirectiveList.push({
  name: 'noDblclick',
  directive: {
    bind: (el, binding) => {
      el.onclick = () => {
        el.disabled = true
        $(el).addClass('is-disabled')
        setTimeout(() => {
          el.disabled = false
          $(el).removeClass('is-disabled')
        }, 1000)
      }
    }
  }
})

export default DirectiveList

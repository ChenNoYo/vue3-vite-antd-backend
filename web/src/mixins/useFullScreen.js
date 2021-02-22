import { reactive } from 'vue'
const state = reactive({
  fullScreenState: false
})
// 监听键盘f11
window.addEventListener('keyup', (e) => {
  if (e.key == 'F11') {
    fullScreenStateChange()
  }
}, true)
const el = document.getElementById('app')
// 监听全屏事件
el.addEventListener('fullscreenchange', function (e) { fullScreenStateChange() });
el.addEventListener('webkitfullscreenchange', function (e) { fullScreenStateChange() });
el.addEventListener('mozfullscreenchange', function (e) { fullScreenStateChange() });
el.addEventListener('MSFullscreenChange', function (e) { fullScreenStateChange() });
function toggleFullscreen () {
  if (state.fullScreenState) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozExitFullScreen) {
      document.mozExitFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  } else {
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen();
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen();
    }
  }
}
function fullScreenStateChange () {
  state.fullScreenState = !state.fullScreenState
}
export default function () {
  return {
    isFullScreen: state.fullScreenState,
    toggleFullscreen
  }
}
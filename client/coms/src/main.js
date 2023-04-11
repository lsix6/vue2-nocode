
window.time_log('[coms] main.js')

const registerComponents = (Vue) => {
  window.time_log('[coms] register components')
  Vue.component('HelloWorld', () => import('./components/HelloWorld.vue'))
}

if (window.Vue) {
  // 主应用中赋值了 window.Vue
  // 注册组件
  registerComponents(window.Vue)
} else {
  console.error(`not found 'window.Vue'`)
}

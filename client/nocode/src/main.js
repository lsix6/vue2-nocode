
window.time_log('[nocode] main.js')

const registerComponents = (Vue) => {
  window.time_log('[nocode] register components', Vue)
  Vue.component('nc_component', () => import('./components/nc_component.vue'))
  Vue.component('nc_view', () => import('./nc_view.vue'))
}

if (window.Vue) {
  // 主应用中赋值了 window.Vue
  // 注册组件
  registerComponents(window.Vue)
} else {
  console.error(`not found 'window.Vue'`)
}

import './init.js'

import elementui from './elementui/index.js'

window.time_log('[coms] main.js')

const registerComponents = (Vue) => {
  window.time_log('[coms] register components')
  Vue.component('nc_children', () => import('./components/nc_children.vue'))
  Vue.component('nc_data', () => import('./components/nc_data.vue'))
  Vue.component('nc_list', () => import('./components/nc_list.vue'))
}

if (window.Vue) {
  // 主应用中赋值了 window.Vue
  //
  window.Vue.use(elementui)
  // 注册组件
  registerComponents(window.Vue)
} else {
  console.error(`not found 'window.Vue'`)
}


import elementui from './elementui/index.js'
import { DomMessage } from './elementui/messageDeduplication.js'

window.time_log('[coms] main.js')

const registerComponents = (Vue) => {
  window.time_log('[coms] register components')
  Vue.component('nc_children', () => import('./components/nc_children.vue'))
  Vue.component('nc_data', () => import('./components/nc_data.vue'))
  Vue.component('nc_list', () => import('./components/nc_list.vue'))
  Vue.component('nc_pagination', () => import('./components/nc_pagination.vue'))
  Vue.component('nc_form', () => import('./components/nc_form.vue'))
  Vue.component('nc_form_item', () => import('./components/nc_form_item.vue'))
  Vue.component('nc_input', () => import('./components/nc_input.vue'))
  //
  window.nocode.register_msg_box(new DomMessage())
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

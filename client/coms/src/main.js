
import elementui from './elementui/index.js'
import { DomMessage } from './elementui/messageDeduplication.js'

window.time_log('[coms] main.js')

const registerComponents = (Vue) => {
  window.time_log('[coms] register components')
  //
  Vue.component('nc_list', () => import('./components/nc_list.vue'))
  Vue.component('nc_pagination', () => import('./components/nc_pagination.vue'))
  Vue.component('nc_form', () => import('./components/nc_form.vue'))
  Vue.component('nc_form_item', () => import('./components/nc_form_item.vue'))
  Vue.component('nc_input', () => import('./components/nc_input.vue'))
  Vue.component('nc_enum', () => import('./components/show/nc_enum.vue'))
  Vue.component('nc_color', () => import('./components/show/nc_color.vue'))
  Vue.component('nc_select', () => import('./components/edit/nc_select.vue'))
  Vue.component('nc_radio_group', () => import('./components/edit/nc_radio_group.vue'))
}

if (window.Vue) {
  // 主应用中赋值了 window.Vue
  //
  window.Vue.use(elementui)
  // 注册组件
  registerComponents(window.Vue)
  //
  window.nocode.register_msg_box(new DomMessage())
} else {
  console.error(`not found 'window.Vue'`)
}

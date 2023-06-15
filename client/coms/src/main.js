
import elementui from './elementui/index.js'
import { DomMessage } from './elementui/messageDeduplication.js'

window.time_log('[coms] main.js')

import nc_container_schema from './components/nc_container_schema.js'

const registerComponents = (Vue) => {
  window.time_log('[coms] register components')
  //
  window.nocode.comsManager.register(
    'default', 'nc_container',
    () => import('./components/nc_container.vue'),
    nc_container_schema
  )
  Vue.component('nc_container', () => import('./components/nc_container.vue'))
  Vue.component('e_nc_container', () => import('./e_components/e_nc_container.vue'))
  Vue.component('nc_table', () => import('./components/nc_table.vue'))
  Vue.component('e_nc_table', () => import('./e_components/e_nc_table.vue'))
  Vue.component('e_nc_table_column', () => import('./e_components/e_nc_table_column.vue'))
  Vue.component('nc_pagination', () => import('./components/nc_pagination.vue'))
  Vue.component('nc_form', () => import('./components/nc_form.vue'))
  Vue.component('nc_form_item', () => import('./components/nc_form_item.vue'))
  Vue.component('nc_input', () => import('./components/nc_input.vue'))
  Vue.component('nc_enum', () => import('./components/show/nc_enum.vue'))
  Vue.component('e_nc_enum', () => import('./e_components/show/e_nc_enum.vue'))
  Vue.component('nc_enum_color', () => import('./components/show/nc_enum_color.vue'))
  Vue.component('nc_switch_in_show', () => import('./components/show/nc_switch_in_show.vue'))
  Vue.component('nc_color', () => import('./components/show/nc_color.vue'))
  Vue.component('nc_select', () => import('./components/edit/nc_select.vue'))
  Vue.component('nc_select_color', () => import('./components/edit/nc_select_color.vue'))
  Vue.component('nc_radio_group', () => import('./components/edit/nc_radio_group.vue'))
  //
  Vue.component('nc_div', () => import('./components/show/nc_div.vue'))
  Vue.component('e_nc_div', () => import('./e_components/show/e_nc_div.vue'))
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

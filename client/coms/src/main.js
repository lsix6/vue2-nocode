
import elementui from './elementui/index.js'
import { DomMessage } from './elementui/messageDeduplication.js'

window.time_log('[coms] main.js')

import nc_container_schema from './components/nc_container_schema.js'
import nc_ref_cust_com_schema from './components/nc_ref_cust_com_schema.js'
import nc_table_schema from './components/nc_table_schema.js'
import nc_enum_schema from './components/show/nc_enum_schema.js'
import nc_enum_color_schema from './components/show/nc_enum_color_schema.js'
import nc_text_schema from './components/show/nc_text_schema.js'
import nc_pagination_schema from './components/nc_pagination_schema.js'
import nc_form_schema from './components/nc_form_schema.js'
import nc_form_item_schema from './components/nc_form_item_schema.js'
import nc_select_schema from './components/edit/nc_select_schema.js'
import nc_select_color_schema from './components/edit/nc_select_color_schema.js'
import nc_radio_group_schema from './components/edit/nc_radio_group_schema.js'

import el_input_schema from './elementui/el_input_schema.js'
import el_input_number_schema from './elementui/el_input_number_schema.js'
import el_checkbox_schema from './elementui/el_checkbox_schema.js'
import el_switch_schema from './elementui/el_switch_schema.js'
import el_date_picker_schema from './elementui/el_date_picker_schema.js'
import el_rate_schema from './elementui/el_rate_schema.js'
import el_button_schema from './elementui/el_button_schema.js'
import el_popconfirm_schema from './elementui/el_popconfirm_schema.js'
import el_avatar_schema from './elementui/el_avatar_schema.js'

const registerComponents = (Vue) => {
  window.time_log('[coms] register components')
  //
  window.nocode.comsManager.register(
    () => import('./components/nc_container.vue'),
    nc_container_schema
  )
  window.nocode.comsManager.register(
    () => import('./components/nc_ref_cust_com.vue'),
    nc_ref_cust_com_schema
  )
  Vue.component('nc_table_column', () => import('./components/nc_table_column.vue'))
  window.nocode.comsManager.register(
    () => import('./components/nc_table.vue'),
    nc_table_schema
  )
  window.nocode.comsManager.register(
    () => import('./components/show/nc_enum.vue'),
    nc_enum_schema
  )
  window.nocode.comsManager.register(
    () => import('./components/show/nc_enum_color.vue'),
    nc_enum_color_schema
  )
  window.nocode.comsManager.register(
    () => import('./components/show/nc_text.vue'),
    nc_text_schema
  )
  window.nocode.comsManager.register(
    () => import('./components/nc_pagination.vue'),
    nc_pagination_schema
  )
  window.nocode.comsManager.register(
    () => import('./components/nc_form.vue'),
    nc_form_schema
  )
  window.nocode.comsManager.register(
    () => import('./components/nc_form_item.vue'),
    nc_form_item_schema
  )
  window.nocode.comsManager.register(
    () => import('./components/edit/nc_select.vue'),
    nc_select_schema
  )
  window.nocode.comsManager.register(
    () => import('./components/edit/nc_select_color.vue'),
    nc_select_color_schema
  )
  window.nocode.comsManager.register(
    () => import('./components/edit/nc_radio_group.vue'),
    nc_radio_group_schema
  )
  //
  window.nocode.comsManager.register(
    null,
    el_input_schema
  )
  window.nocode.comsManager.register(
    null,
    el_input_number_schema
  )
  window.nocode.comsManager.register(
    null,
    el_checkbox_schema
  )
  window.nocode.comsManager.register(
    null,
    el_switch_schema
  )
  window.nocode.comsManager.register(
    null,
    el_date_picker_schema
  )
  window.nocode.comsManager.register(
    null,
    el_rate_schema
  )
  window.nocode.comsManager.register(
    null,
    el_button_schema
  )
  window.nocode.comsManager.register(
    null,
    el_popconfirm_schema
  )
  window.nocode.comsManager.register(
    null,
    el_avatar_schema
  )
  Vue.component('nc_pagination', () => import('./components/nc_pagination.vue'))
  Vue.component('nc_form_item', () => import('./components/nc_form_item.vue'))
  Vue.component('nc_input', () => import('./components/nc_input.vue'))
  Vue.component('nc_enum', () => import('./components/show/nc_enum.vue'))
  Vue.component('nc_enum_color', () => import('./components/show/nc_enum_color.vue'))
  Vue.component('nc_switch_in_show', () => import('./components/show/nc_switch_in_show.vue'))
  Vue.component('nc_color', () => import('./components/show/nc_color.vue'))
  Vue.component('nc_select_color', () => import('./components/edit/nc_select_color.vue'))
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

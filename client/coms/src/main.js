
import elementui from './elementui/index.js'
import { DomMessage } from './elementui/messageDeduplication.js'

window.time_log('[coms] main.js')

import nc_data_source from './components/nc_data_source.vue'
import nc_data_source_schema from './components/nc_data_source_schema'
import nc_container from './components/nc_container.vue'
import nc_container_schema from './components/nc_container_schema.js'
import nc_ref_cust_com from './components/nc_ref_cust_com.vue'
import nc_ref_cust_com_schema from './components/nc_ref_cust_com_schema.js'
import nc_table from './components/list/nc_table.vue'
import nc_table_schema from './components/list/nc_table_schema.js'
import nc_enum from './components/show/nc_enum.vue'
import nc_enum_schema from './components/show/nc_enum_schema.js'
import nc_enum_color from './components/show/nc_enum_color.vue'
import nc_enum_color_schema from './components/show/nc_enum_color_schema.js'
import nc_text from './components/show/nc_text.vue'
import nc_text_schema from './components/show/nc_text_schema.js'
import nc_pagination from './components/list/nc_pagination.vue'
import nc_pagination_schema from './components/list/nc_pagination_schema.js'
import nc_form from './components/form/nc_form.vue'
import nc_form_schema from './components/form/nc_form_schema.js'
import nc_form_item from './components/form/nc_form_item.vue'
import nc_form_item_schema from './components/form/nc_form_item_schema.js'
import nc_select from './components/edit/nc_select.vue'
import nc_select_schema from './components/edit/nc_select_schema.js'
import nc_select_color from './components/edit/nc_select_color.vue'
import nc_select_color_schema from './components/edit/nc_select_color_schema.js'
import nc_radio_group from './components/edit/nc_radio_group.vue'
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
  const comsManager = window.nocode.comsManager
  //

  comsManager.register(
    nc_data_source,
    nc_data_source_schema
  )
  comsManager.register(
    nc_container,
    nc_container_schema
  )
  comsManager.register(
    nc_ref_cust_com,
    nc_ref_cust_com_schema
  )
  comsManager.register(
    nc_table,
    nc_table_schema
  )
  comsManager.register(
    nc_enum,
    nc_enum_schema
  )
  comsManager.register(
    nc_enum_color,
    nc_enum_color_schema
  )
  comsManager.register(
    nc_text,
    nc_text_schema
  )
  comsManager.register(
    nc_pagination,
    nc_pagination_schema
  )
  comsManager.register(
    nc_form,
    nc_form_schema
  )
  comsManager.register(
    nc_form_item,
    nc_form_item_schema
  )
  comsManager.register(
    nc_select,
    nc_select_schema
  )
  comsManager.register(
    nc_select_color,
    nc_select_color_schema
  )
  comsManager.register(
    nc_radio_group,
    nc_radio_group_schema
  )
  //
  comsManager.register(
    null,
    el_input_schema
  )
  comsManager.register(
    null,
    el_input_number_schema
  )
  comsManager.register(
    null,
    el_checkbox_schema
  )
  comsManager.register(
    null,
    el_switch_schema
  )
  comsManager.register(
    null,
    el_date_picker_schema
  )
  comsManager.register(
    null,
    el_rate_schema
  )
  comsManager.register(
    null,
    el_button_schema
  )
  comsManager.register(
    null,
    el_popconfirm_schema
  )
  comsManager.register(
    null,
    el_avatar_schema
  )
  //
  Vue.component('nc_switch_in_show', () => import('./components/show/nc_switch_in_show.vue'))
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

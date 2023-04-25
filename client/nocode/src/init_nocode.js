import Vue from 'vue'

import nc_component from './components/nc_component.vue'
Vue.use(nc_component)

import './utils/nc_msg_box.js'
import { register_page } from "./components/nc_pages"
import { request_api } from './test/service'
import { register_request_api } from './utils/nc_request'

import { createListPage } from './pages/base/list/list_page'
import { createAddPage } from './pages/base/add/add_page'
import { createEditPage } from './pages/base/edit/edit_page'
import { product_info } from './pages/product/product_info'


export const init_nocode = () => {
    register_request_api(request_api)
    //
    const product_list_page = createListPage(product_info)
    const product_add_page = createAddPage(product_info)
    const product_edit_page = createEditPage(product_info)
    register_page('product/list', product_list_page)
    register_page('product/add', product_add_page)
    register_page('product/edit', product_edit_page)
}
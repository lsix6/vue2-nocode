import Vue from 'vue'

import nc_component from './components/nc_component.vue'
Vue.use(nc_component)

import './utils/nc_msg_box.js'
import { register_page } from "./components/nc_pages"
import { request_api } from './test/service'
import { register_request_api } from './utils/nc_request'

import { product_add_page } from './pages/product/add/product_add_page'
import { product_edit_page } from './pages/product/edit/product_edit_page'
import { createListPage } from './pages/base/list/list_page'
import { product_info } from './pages/product/product_info'


export const init_nocode = () => {
    register_request_api(request_api)
    //
    const product_list_page = createListPage(product_info)
    register_page('product/list', product_list_page)
    register_page('product/add', product_add_page)
    register_page('product/edit', product_edit_page)
}
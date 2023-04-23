import Vue from 'vue'

import nc_component from './components/nc_component.vue'
Vue.use(nc_component)


import { register_page } from "./components/nc_pages"
import { product_list_page } from './pages/product/list/product_list_page'
import { request_api } from './test/service'
import { register_request_api } from './utils/nc_request'


export const init_nocode = () => {
    register_request_api(request_api)
    register_page('product/list', product_list_page)
}
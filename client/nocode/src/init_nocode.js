import Vue from 'vue'

import nc_component from './components/nc_component.vue'
Vue.use(nc_component)


import { register_page } from "./components/nc_pages"
import { product_list_page } from './pages/product/product_list_page'


export const init_nocode = () => {
    register_page('product/list', product_list_page)
}
import Vue from 'vue'

import nc_component from './components/nc_component.vue'
Vue.use(nc_component)


import { register_page } from "./components/nc_pages"
import { pageProductList } from "./pages/product/product_list"


export const init_nocode = () => {
    register_page('productList', pageProductList)
}
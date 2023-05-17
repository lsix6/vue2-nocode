import Vue from 'vue'

import nc_component from './components/core/nc_component.vue'
Vue.use(nc_component)
import nc_children from './components/base/nc_children.vue'
Vue.use(nc_children)
import nc_data from './components/base/nc_data.vue'
Vue.use(nc_data)

import './utils/nc_msg_box.js'
import { request_api } from './test/service'
import { register_request_api, request_json } from './utils/nc_request'

import { register_module } from './pages/base/pages'
import { product_info } from './pages/product/product_info'
import { get_user_info } from './pages/user/user_info'


export const init_nocode = async () => {
    register_request_api(request_api)
    //
    // console.log('***** product_info begin *****')
    // console.log(JSON.stringify(product_info))
    // console.log('***** product_info end *****')
    await request_json('/static/modules/product.json').then(product_info => {
        register_module(product_info)
    })
    // register_module(product_info)
    register_module(get_user_info())

}
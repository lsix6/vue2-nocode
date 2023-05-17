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
import { user_info } from './pages/user/user_info'


export const init_nocode = async () => {
    register_request_api(request_api)
    //
    // console.log('***** module_info begin *****')
    // console.log(JSON.stringify(user_info))
    // console.log('***** module_info end *****')
    //
    // register_module(product_info)
    // register_module(user_info)
    //
    await Promise.all([
        request_json('/static/modules/product.json'),
        request_json('/static/modules/user.json'),
    ]).then(modules => {
        modules.forEach(moduleInfo => {
            register_module(moduleInfo)
        })
    })

}
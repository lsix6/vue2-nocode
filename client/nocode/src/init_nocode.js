
import './utils/nc_msg_box.js'
import { request_json } from './utils/nc_request'

import { register_module } from './pages/base/pages'
import { product_info } from './pages/product/product_info'
import { user_info } from './pages/user/user_info'


export const init_nocode = async () => {
    //
    // console.log('***** module_info begin *****')
    // console.log(JSON.stringify(user_info))
    // console.log('***** module_info end *****')
    //
    // register_module(product_info)
    // register_module(user_info)
    //
    await Promise.all([
        request_json('/nocode/static/modules/product.json'),
        request_json('/nocode/static/modules/user.json'),
    ]).then(modules => {
        modules.forEach(moduleInfo => {
            register_module(moduleInfo)
        })
    })

}
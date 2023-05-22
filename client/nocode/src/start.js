
window.time_log('[nocode] start.js')

import importHtml from 'import-html-entry'

// 启动脚本里引入'vue',让'vue'打包在 vendor 里，避免在懒加载的js里多次打包
import Vue from 'vue'
// 把 Vue 赋值给 window.Vue，让加载的组件库入口脚本中可以使用 window.Vue 注册组件库中提供的组件
window.Vue = Vue

import { get_com_ref } from './utils/nc_refs'
import { get_params } from './utils/nc_params'
import { fetch_data, request_api } from './utils/nc_request'
import { register_msg_box, msg_box } from './utils/nc_msg_box'

import { start } from './main'

window.nocode = {
    get_com_ref,
    get_params,
    request_api,
    fetch_data,
    register_msg_box,
    msg_box,
}

window.time_log('[nocode] js loaded')

// import './prefetch.js'

const loadLib = (url) => {
    return new Promise(resolve => {
        importHtml(url).then(res => {
            // console.log('importHtml', url, res)
            res.execScripts().then(() => {
                resolve()
            })
        })
    })
}

// console.log('pathname', location.pathname)
if (location.pathname.startsWith('/nocode/')) {
    Promise.all([
        loadLib('/lib/coms/'),
    ]).then(() => {
        //
        start()
    })
}


window.time_log('[nocode] start.js')

import importHtml from 'import-html-entry'

// 启动脚本里引入'vue',让'vue'打包在 vendor 里，避免在懒加载的js里多次打包
import Vue from 'vue'
// 把 Vue 赋值给 window.Vue，让加载的组件库入口脚本中可以使用 window.Vue 注册组件库中提供的组件
if (!window.Vue) {
    window.Vue = Vue
}

import VueRouter from 'vue-router'
window.Vue.use(VueRouter)
import nc_component from './components/core/nc_component.vue'
window.Vue.use(nc_component)
import nc_children from './components/base/nc_children.vue'
window.Vue.use(nc_children)
import nc_root from './components/core/nc_root.vue'
window.Vue.use(nc_root)
import nc_view from './components/core/nc_view.vue'
window.Vue.use(nc_view)

import { ComsManager } from './utils/coms_manager'
const comsManager = new ComsManager(window.Vue)

import { CustomizedComsManager } from './utils/customized_coms_manager'
const customizedComsManager = new CustomizedComsManager()

import nc_data_source from './components/base/nc_data_source.vue'
import nc_data_source_schema from './components/base/nc_data_source_schema'
comsManager.register('default', 'nc_data_source', nc_data_source, nc_data_source_schema)

import { PagesManager } from './utils/pages_manager'
const pagesManager = new PagesManager()

import * as utils from './utils/nc_utils'
import { get_params } from './utils/nc_params'
import { fetch_data, request_api } from './utils/nc_request'
import { register_msg_box, msg_box } from './utils/nc_msg_box'
import { register_request_api } from './utils/nc_request'
import * as testService from './test/service'
register_request_api(testService.request_api)

import { start } from './main'

window.nocode = {
    VueRouter,
    utils,
    get_params,
    request_api,
    fetch_data,
    register_msg_box,
    msg_box,
    pagesManager,
    comsManager,
    customizedComsManager,
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

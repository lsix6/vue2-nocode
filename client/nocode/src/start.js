
window.time_log('[main] start.js')

// 启动脚本里引入'vue',让'vue'打包在 vendor 里，避免在懒加载的js里多次打包
import Vue from 'vue'
// 把 Vue 赋值给 window.Vue，让加载的组件库入口脚本中可以使用 window.Vue 注册组件库中提供的组件
window.Vue = Vue

// import './prefetch.js'

import importHtml from 'import-html-entry'

const loadLib = (url) => {
    return new Promise(resolve => {
        importHtml(url).then( res => {
            // console.log('importHtml', url, res)
            res.execScripts().then(() => {
                resolve()
            })
        })
    })
}


Promise.all([
    import('./main'),
    loadLib('/lib/coms/'),
]).then(results => {
    window.time_log('[main] js loaded', results)
    const [main] = results
    // window.time_log('main', main)
    //
    main.start()
})
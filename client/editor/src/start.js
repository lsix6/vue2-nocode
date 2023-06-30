
window.time_log('[editor] start.js')

import Vue from 'vue'
Vue.config.productionTip = false

window.Vue = Vue

import importHtml from 'import-html-entry'

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

loadLib('/nocode/').then(() => {
    loadLib('/lib/coms').then(() => {
        import('./main').then(main => {
            // window.time_log('main', main)
            //
            main.start()
        })
    })
})


window.time_log('[editor] start.js')

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

    Promise.all([
        import('./main'),
        loadLib('/lib/coms/'),
    ]).then(results => {
        window.time_log('[editor] js loaded', results)
        const [main] = results
        // window.time_log('main', main)
        //
        main.start()
    })

})

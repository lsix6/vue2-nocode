
export const init_vue = (Vue) => {

    console.log('init_vue', Vue)

    // 失去焦点后自动去除两边的空格
    Vue.directive('blur-trim', {
        bind: function (el, binding, vnode) {
            var s = JSON.stringify
            const str =
                'name: ' + s(binding.name) + '<br>' +
                'value: ' + s(binding.value) + '<br>' +
                'expression: ' + s(binding.expression) + '<br>' +
                'argument: ' + s(binding.arg) + '<br>' +
                'modifiers: ' + s(binding.modifiers) + '<br>' +
                'vnode keys: ' + Object.keys(vnode).join(', ')
            console.log('[blur-trim] bind', str)
        },
        inserted: el => {
            console.log('[blur-trim] inserted', el)
            function getInput(el) {
                let inputEle
                if (el.tagName !== 'INPUT') {
                    inputEle = el.querySelector('input')
                } else {
                    inputEle = el
                }
                return inputEle
            }
            function dispatchEvent(el, type) {
                let evt = document.createEvent('HTMLEvents')
                evt.initEvent(type, true, true)
                el.dispatchEvent(evt)
            }
            //
            let inputEle = getInput(el)
            const handler = function (event) {
                const newVal = event.target.value.trim()
                if (event.target.value != newVal) {
                    event.target.value = newVal
                    dispatchEvent(inputEle, 'input')
                }
            }
            //
            el.inputEle = inputEle
            el._blurHandler = handler
            inputEle.addEventListener('blur', handler)
        },
        unbind(el) {
            const { inputEle } = el
            inputEle.removeEventListener('blur', el._blurHandler)
        }
    })

}
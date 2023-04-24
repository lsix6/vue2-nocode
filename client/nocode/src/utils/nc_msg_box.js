
let _msgBox = null

export const register_msg_box = (msgBox) => {
    _msgBox = msgBox
}

export const msg_box = {

    success: (params) => {
        const {options, single} = params
        console.log('[nc_msg_box] success', options)
        _msgBox.success(options, single)
    },
    warning: (params) => {
        const {options, single} = params
        console.log('[nc_msg_box] warning', options)
        _msgBox.warning(options, single)
    },
    info: (params) => {
        const {options, single} = params
        console.log('[nc_msg_box] info', options)
        _msgBox.info(options, single)
    },
    error: (params) => {
        const {options, single} = params
        console.log('[nc_msg_box] error', options)
        _msgBox.error(options, single)
    },

}

window.nocode.register_msg_box = register_msg_box
window.nocode.msg_box = msg_box
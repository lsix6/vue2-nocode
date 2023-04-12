
const nc_com_refs = {}

export const register_com_ref = (ref_name, com) => {
    if (nc_com_refs[ref_name]) {
        console.error('[nc_refs] exist the com ref, can not register again', ref_name)
    } else {
        console.log('[nc_refs] register_com_ref', ref_name)
        nc_com_refs[ref_name] = com
    }
}

export const unregister_com_ref = (ref_name) => {
    if (nc_com_refs[ref_name]) {
        console.log('[nc_refs] unregister_com_ref', ref_name)
        delete nc_com_refs[ref_name]
    } else {
        console.error('[nc_refs] not exist the com ref, can not unregister it', ref_name)
    }
}

export const get_com_ref = (ref_name) => {
    const ref = nc_com_refs[ref_name]
    // console.log('[nc_refs] get_com_ref', ref_name, ref)
    return ref
}
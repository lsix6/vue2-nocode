
export class ComRefsManager {

    com_refs = {}

    register_com_ref(ref_name, com) {
        if (this.com_refs[ref_name]) {
            console.error('[ComRefsManager] exist the com ref, can not register again', ref_name)
        } else {
            console.log('[ComRefsManager] register_com_ref', ref_name)
            this.com_refs[ref_name] = com
        }
    }

    unregister_com_ref(ref_name) {
        if (this.com_refs[ref_name]) {
            console.log('[ComRefsManager] unregister_com_ref', ref_name)
            delete this.com_refs[ref_name]
        } else {
            console.error('[ComRefsManager] not exist the com ref, can not unregister it', ref_name)
        }
    }

    get_com_ref(ref_name) {
        const ref = this.com_refs[ref_name]
        // console.log('[ComRefsManager] get_com_ref', ref_name, ref)
        return ref
    }

}
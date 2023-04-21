import { get_com_ref } from "./nc_refs"

export const nc_vars = {

    formChanged: function () {
        let changed = {}
        //
        return {
            isChanged(formRef) {
                const ret = changed[formRef]
                console.log('[nc_vars] formChanged.isChanged, changed:', formRef, ret)
                return ret
            },
            setChanged(formRef) {
                changed[formRef] = true
                // console.log('[nc_vars] formChanged.setChanged, changed:', formRef, true)
            },
            clearChanged(formRef) {
                delete changed[formRef]
                console.log('[nc_vars] formChanged.clearChanged, changed:', formRef, false)
            },
            hasChanged() {
                const ret = (Object.keys(changed).length > 0)
                console.log('[nc_vars] formChanged.hasChanged, changed:', changed)
                return ret
            },
            clearAllChanged() {
                changed = {}
                console.log('[nc_vars] formChanged.clearAllChanged, changed:', changed)
            },
            getUnsaveWarning() {
                const forms = Object.keys(changed)
                console.log('[nc_vars] formChanged.getUnsaveWarning, forms:', forms)
                if (forms.length > 0) {
                    const formRef = get_com_ref(forms[0])
                    return formRef.unsave_warning
                }
                //
                return null
            },
        }
    }()
}
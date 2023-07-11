
export const getPropValue = (obj, propName) => {
    let ret = null
    if (propName) {
        ret = obj
        const names = propName.split('.')
        names.forEach(name => {
            if (ret) {
                ret = ret[name]
            }
        })
    }
    //
    return ret
}

export const setPropValue = (obj, propName, value, com) => {
    const names = propName.split('.')
    let ref = obj
    for (let i = 0; i < (names.length - 1); i++) {
        if (!ref[names[i]]) {
            ref[names[i]] = {}
        }
        ref = ref[names[i]]
    }
    if (com) {
        com.$set(ref, names[names.length - 1], value)
    } else {
        ref[names[names.length - 1]] = value
    }
}

export const getFinalFieldName = (fieldName) => {
    const names = fieldName.split('.')
    return names[names.length - 1]
}

const filterFields = (com, fields, binds) => {
    // console.log('[nc_utils] filterFields', com.com_name, com)
    //
    if (com.com_field && com.com_field.field_name) {
        const fieldName = getFinalFieldName(com.com_field.field_name)
        fields[fieldName] = {
            field_default: com.com_field.field_default_value,
        }
    }
    if (com.com_binds) {
        com.com_binds.forEach(bind => {
            // !!! 这里有点问题，先这样处理一下，以后再想办法
            // todo...
            const fieldName = getFinalFieldName(bind.field_name)
            if (!fields[fieldName]) {
                fields[fieldName] = {}
            }
        })
    }
    if (com.com_syncs) {
        com.com_syncs.forEach(sync => {
            // !!! 这里有点问题，先这样处理一下，以后再想办法
            // todo...
            const fieldName = getFinalFieldName(sync.field_name)
            if (!fields[fieldName]) {
                fields[fieldName] = {}
            }
        })
    }
    if (com.com_name === 'nc_ref_cust_com') {
        const refComId = com.com_props && com.com_props.ref_com_id
        if (refComId) {
            const comObjs = window.nocode.customizedComsManager.loadComObjs(refComId)
            const slots = {
                default: comObjs
            }
            filterChildrenFields(slots, fields, binds)
        }
    }
    //
    filterChildrenFields(com.com_slots, fields, binds)
}

export const filterChildrenFields = (comSlots, fields, binds) => {
    if (comSlots) {
        Object.values(comSlots).forEach(arr => {
            arr.forEach(child => {
                filterFields(child, fields, binds)
            })
        })
    }
}

export const isNil = (value) => {
    return (value === null || undefined)
}

export const parseValue = (type, value) => {
    let v = value
    if (v != '') {
        if (type === 'number') {
            v = parseFloat(value)
        } else if (type === 'int') {
            v = parseInt(value)
        }
    }
    //
    return v
}

export const arr2enum = (arr) => {
    const map = {}
    arr.forEach((item, i) => {
        map[i + 1] = item
    })
    return map
}
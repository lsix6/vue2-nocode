
export const getPropValue = (obj, propName) => {
    const names = propName.split('.')
    let ret = obj
    names.forEach(name => {
        ret = ret[name]
    })
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

export const filterFields = (com, fields, binds) => {
    if (com.com_field) {
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
    //
    if (com.com_children) {
        com.com_children.forEach(child => {
            filterFields(child, fields, binds)
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
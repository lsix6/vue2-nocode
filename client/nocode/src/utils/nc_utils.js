
export const getPropValue = (obj, propName) => {
    if (!obj || !propName) {
        return
    }
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
    if (!obj || !propName) {
        return
    }
    //
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

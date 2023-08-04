
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

export function deepFreeze(obj) {
    // 取回定义在obj上的属性名
    const propNames = Object.getOwnPropertyNames(obj);

    // 在冻结自身之前冻结属性
    propNames.forEach((name) => {
        const prop = obj[name];

        // 如果prop是个对象，冻结它
        if (typeof prop === 'object' && prop !== null) deepFreeze(prop);
    });

    // 冻结自身(no-op if already frozen)
    return Object.freeze(obj);
}

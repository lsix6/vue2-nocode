
import _ from 'lodash'
import { getPropValue, setPropValue } from './nc_utils'

const nc_params_source = {}

export const register_params_source = (params_source, func) => {
    nc_params_source[params_source] = func
}

register_params_source('com_data', (paramDef, com, cmdData) => {
    return com.com_data
})

register_params_source('com_ref', (paramDef, com, cmdData) => {
    let ret = null//
    const ref = com.com_root.refsMgr.get_com_ref(paramDef.params_com_ref)
    if (ref) {
        const method_name = paramDef.params_com_method_name || 'getData'
        ret = ref[method_name]()
    } else {
        if (_.isString(paramDef.params_default_value)) {
            try {
                ret = JSON.parse(paramDef.params_default_value)
            } catch (e) {
                console.error('[nc_params] get_params, parse params_default_value failed', e)
            }
        } else {
            ret = paramDef.params_default_value
        }
    }
    //
    return ret
})

register_params_source('route_query', (paramDef, com, cmdData) => {
    return com.$route.query
})

register_params_source('cmd_data', (paramDef, com, cmdData) => {
    return cmdData
})

export const get_params = (com, paramsDef, cmdData) => {
    // paramsDef 是个数组，可以同时指定1个或多个数据源，获取到的数据将合并到一个对象里返回
    console.log('[nc_params] get_params,', com, paramsDef, cmdData)
    let result = null
    if (paramsDef) {
        result = {}
        let set = result
        for (let obj of paramsDef) {
            let source = null
            // 选择数据源
            const func = nc_params_source[obj.params_source]
            if (func) {
                source = func(obj, com, cmdData)
            } else {
                source = obj
            }
            // console.log('[nc_params] get_params, params_source source,', obj.params_source, source)
            // 如果有设置参数的集合名，则参数都放在该集合下
            if (obj.params_set_name) {
                if (obj.params_prop_name) {
                    result[obj.params_set_name] = getPropValue(source, obj.params_prop_name)
                    source = {}
                } else {
                    set = result[obj.params_set_name] = {}
                }
            }
            if (obj.params_fields && obj.params_fields.length > 0) {
                // 如果指定了字段列表
                // 则设置各字段的值
                for (let field of obj.params_fields) {
                    if (_.isObject(field)) {
                        // 字段是对象类型
                        if (field.target_name) {
                            // 如果有目标字段名，则把字段值设置到目标字段中
                            setPropValue(set, field.target_name, getPropValue(source, field.field_name))
                        } else {
                            // 如果没有目标字段名，则直接返回字段值
                            result = getPropValue(source, field.field_name)
                            // 后面的字段忽略
                            break
                        }
                    } else {
                        // 字段是字符串类型
                        // 把字段值设置到目标字段中，字段名不变
                        set[field] = source[field]
                    }
                }
            } else {
                // 如果没有指定字段列表
                // 则使用所有字段
                Object.assign(set, source)
            }
        }
    }
    console.log('[nc_params] get_params, result:', result)
    //
    return result
}

const paramDesc2Def = (desc) => {
    const def = {}
    //
    const source = desc.param_source
    if (source === 'text') {
        def[desc.param_name] = desc.param_desc
    } else if (source === 'json') {
        try {
            const obj = JSON.parse(desc.param_desc)
            if (desc.param_name) {
                def[desc.param_name] = obj
            } else {
                Object.assign(def, obj)
            }
        } catch (err) {
            console.error('[nc_params] paramsDesc2Def, parse json error:', err)
        }
    } else if (source === 'com_ref') {
        def.params_source = source
        def.params_set_name = desc.param_name
        //
        const arr = desc.param_desc.split('.')
        if (arr.length >= 2) {
            def.params_com_ref = arr[0]
            def.params_com_method_name = arr[1].substring(0, arr[1].length - 2)
            def.params_prop_name = arr.slice(2).join('.')
        }
        if (desc.param_default_value) {
            def.params_default_value = desc.param_default_value
        }
    } else {
        def.params_source = source
        def.params_set_name = desc.param_name
        def.params_prop_name = desc.param_desc
    }
    //
    return def
}

export const params_desc_to_def = (descs) => {
    const defs = []
    //
    descs && descs.forEach(desc => {
        defs.push(paramDesc2Def(desc))
    })
    //
    return defs
}
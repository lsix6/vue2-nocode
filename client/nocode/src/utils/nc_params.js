
import _ from 'lodash'
import { getPropValue, setPropValue } from './nc_utils'

const nc_params_source = {}

export const register_params_source = (params_source, func) => {
    nc_params_source[params_source] = func
}

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
                source = func(obj)
            } else if (obj.params_source === 'com_data') {
                source = com.com_data
            } else if (obj.params_source === 'com_ref') {
                const ref = com.com_root.refsMgr.get_com_ref(obj.params_com_ref)
                if (ref) {
                    const method_name = obj.params_com_method_name || 'getData'
                    source = ref[method_name]()
                } else {
                    if (_.isString(obj.params_default_value)) {
                        try {
                            source = JSON.parse(obj.params_default_value)
                        } catch (e) {
                            console.error('[nc_params] get_params, parse params_default_value failed', e)
                        }
                    } else {
                        source = obj.params_default_value
                    }
                }
            } else if (obj.params_source === 'route_query') {
                source = com.$route.query
            } else if (obj.params_source === 'cmd_data') {
                source = cmdData
            } else {
                source = obj
            }
            // console.log('[nc_params] get_params, params_source source,', obj.params_source, source)
            // 如果有设置参数的集合名，则参数都放在该集合下
            if (obj.params_set_name) {
                set = result[obj.params_set_name] = {}
            }
            if (obj.params_fields) {
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

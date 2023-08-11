
export const get_field_ds_name = (fieldName) => {
    return `__ds.${fieldName}`
}

export const create_date_sources = (moduleInfo) => {

    const data_sources = []
    //
    moduleInfo.fields.forEach(field => {
        const fdInfo = field.field_info
        //
        if (fdInfo.enum) {
            data_sources.push({
                name: fdInfo.name,
                enum: fdInfo.enum,
            })
        } else if (fdInfo.enum_map) {
            const obj = {}
            fdInfo.enum_map.forEach(kv => {
                obj[kv.k] = kv.v
            })
            data_sources.push({
                name: fdInfo.name,
                type: 'obj',
                obj,
            })
        } else if (fdInfo.data_sources && fdInfo.data_sources.length > 0) {
            data_sources.push({
                ...fdInfo.data_sources[0],
                name: fdInfo.name,
            })
        }
    })
    //
    return data_sources
}
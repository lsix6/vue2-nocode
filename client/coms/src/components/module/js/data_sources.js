
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
        } else if (fdInfo.data_source) {
            data_sources.push({
                name: fdInfo.name,
                type: 'api',
                api: {
                    url: `${moduleInfo.name}/${fdInfo.data_source}`,
                    method: 'GET',
                },
            })
        }
    })
    //
    return data_sources
}
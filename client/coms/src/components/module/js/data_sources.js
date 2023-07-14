
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
            data_sources.push({
                name: fdInfo.name,
                enum_map: fdInfo.enum_map,
            })
        } else if (fdInfo.data_source) {
            data_sources.push({
                name: fdInfo.name,
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
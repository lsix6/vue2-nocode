
export const get_field_ds_name = (fieldName) => {
    return `__ds.${fieldName}`
}

export const create_date_sources = (moduleInfo) => {

    const data_sources = []
    //
    moduleInfo.fields.forEach(field => {
        const fdInfo = field.field_info
        //
        if (fdInfo.data_sources && fdInfo.data_sources.length > 0) {
            data_sources.push({
                ...fdInfo.data_sources[0],
                name: fdInfo.name,
            })
        }
    })
    //
    return data_sources
}
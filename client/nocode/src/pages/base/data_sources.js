
export const get_field_ds_name = (fieldName) => {
    return `__ds_${fieldName}`
}

export const create_date_sources = (moduleInfo) => {

    const data_sources = {}
    //
    moduleInfo.fields.forEach(field => {
        const fdInfo = field.field_info
        //
        if (fdInfo.enum_map) {
            data_sources[get_field_ds_name(fdInfo.name)] = {
                fetch_params: [
                    {
                        enumMap: fdInfo.enum_map,
                        params_fields: [
                            'enumMap',
                        ],
                    }
                ],
            }
        }
    })
    //
    return data_sources
}
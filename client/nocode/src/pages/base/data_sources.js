
export const get_field_ds_name = (fieldName) => {
    return `__ds.${fieldName}`
}

export const create_date_sources = (moduleInfo) => {

    const data_sources = {}
    //
    moduleInfo.fields.forEach(field => {
        const fdInfo = field.field_info
        //
        if (fdInfo.enum_map) {
            data_sources[fdInfo.name] = {
                fetch_params: [
                    {
                        enumMap: fdInfo.enum_map,
                        params_fields: [
                            'enumMap',
                        ],
                    }
                ],
            }
        } else if (fdInfo.data_source) {
            data_sources[fdInfo.name] = {
                api: {
                    url: `${moduleInfo.name}/${fdInfo.data_source}`,
                    method: 'GET',
                },
            }
        }
    })
    //
    return data_sources
}
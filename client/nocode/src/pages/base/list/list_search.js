export const createListSearch = (moduleFields) => {

    const key_fields_name = []
    moduleFields.forEach(field => {
        if (field.in_search) {
            if (field.in_search.type === 'key') {
                key_fields_name.push(field.field_info.label)
            }
        }
    })
    const keyPlaceHolder = key_fields_name.join('、')

    const inputSearch = {
        com_name: 'el-input',
        com_info: {
            attrs: {
                placeholder: keyPlaceHolder,
            },
        },
        com_field: {
            field_name: 'formData.keyWord'
        },
        com_props: {
            clearable: true,
        },
    }

    const list_formSearch = {
        com_name: 'nc_form',
        com_ref: 'formSearch',
        com_info: {
            style: {
                'min-width': '270px',
                'max-width': '570px',
                'margin-right': '20px',
            },
        },
        com_props: {
            form_children: [
                inputSearch,
            ],
        },
        com_events: [
            {
                event_name: 'change',
                commands: [
                    {
                        cmd_name: 'call_com_method',
                        cmd_params: {
                            com_ref: 'list_page_data',
                            com_method_name: 'refreshData',
                        },
                    }
                ],
            }
        ],
    }

    return list_formSearch
} 
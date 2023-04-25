export const createListSearch = (search) => {

    const inputSearch = {
        com_name: 'el-input',
        com_field: {
            field_name: 'formData.keyWord'
        },
        com_props: {
            placeholder: search.placeholder,
            clearable: true,
        },
    }

    const list_formSearch = {
        com_name: 'nc_form',
        com_ref: 'formSearch',
        com_props: {
            form_children: [
                inputSearch,
            ],
            style: {
                'min-width': '270px',
                'max-width': '570px',
                'margin-right': '20px',
            },
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
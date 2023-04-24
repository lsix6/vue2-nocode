
const inputSearch = {
    com_name: 'el-input',
    com_field: {
        field_name: 'formData.keyWord'
    },
    com_props: {
        placeholder: '产品名称、产品编号',
        clearable: true,
    },
}

export const product_list_formSearch = {
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
                        com_ref: 'product_list_page_data',
                        com_method_name: 'refreshData',
                    },
                }
            ],
        }
    ],
}

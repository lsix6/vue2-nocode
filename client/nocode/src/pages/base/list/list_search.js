import _ from 'lodash'

export const createListSearch = (moduleFields) => {

    const search_coms = []
    const pushFieldToArr = (field) => {
        const search_com = _.cloneDeep(field.in_search.search_com)
        search_coms.push(search_com)
    }
    //
    const key_fields_name = []
    moduleFields.forEach(field => {
        if (field.in_search) {
            if (field.in_search.type === 'key') {
                key_fields_name.push(field.field_info.label)
            } else {
                pushFieldToArr(field)
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
            style: {
                'margin-right': '20px',
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
                'min-width': 'fit-content',
            },
        },
        com_props: {
            form_children: [
                {
                    com_name: 'div',
                    com_info: {
                        style: {
                            display: 'flex',
                            'flex-direction': 'row',
                        },
                    },
                    com_children: [
                        inputSearch,
                        ...search_coms,
                    ],
                },
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
                            com_method_name: 'refresh',
                            com_method_params: [
                                {
                                    ds_name: '__listPageData',
                                }
                            ],
                        },
                    }
                ],
            }
        ],
    }

    return list_formSearch
} 
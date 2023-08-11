import _ from 'lodash'
import { get_field_ds_name } from '../data_sources'

const createSearchCom = (field) => {
    let com = _.cloneDeep(field.in_search.search_com)
    //
    if (!com) {
        const fdInfo = field.field_info
        if (fdInfo.enum || fdInfo.enum_map || fdInfo.data_source) {
            com = {
                com_name: 'nc_select',
                com_info: {
                    attrs: {
                        clearable: true,
                    },
                },
            }
        } else {
            com = {
                com_name: 'el-input',
            }
        }
    }
    //
    return com
}

export const createListSearch = (moduleFields) => {

    const search_coms = []
    const pushFieldToArr = (field) => {
        const fdInfo = field.field_info
        //
        const search_com = createSearchCom(field)
        //
        if (fdInfo.enum || fdInfo.enum_map || fdInfo.data_source) {
            search_com.com_props = search_com.com_props || {}
            search_com.com_props.data_source_name = get_field_ds_name(fdInfo.name)
        }
        //
        search_coms.push({
            com_name: 'div',
            com_info: {
                style: {
                    display: 'flex',
                    'flex-direction': 'row',
                    margin: '5px 10px',
                },
            },
            com_slots: {
                default: [
                    {
                        com_name: 'div',
                        com_text: field.field_info.label,
                        com_info: {
                            attrs: {
                                class: 'el-form-item__label',
                            },
                            style: {
                                'white-space': 'nowrap',
                            },
                        },
                    },
                    {
                        ...search_com,
                        com_field: {
                            field_name: `formData.${field.field_info.name}`,
                        },
                    },
                ],
            },
        })
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
                margin: '5px 10px',
                width: '200px',
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
                flex: 1,
            },
        },
        com_slots: {
            default: [
                {
                    com_name: 'div',
                    com_info: {
                        style: {
                            display: 'flex',
                            'flex-direction': 'row',
                            'flex-wrap': 'wrap',
                        },
                    },
                    com_slots: {
                        default: [
                            inputSearch,
                            ...search_coms,
                        ],
                    },
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
                            call: {
                                com_ref: 'list_page_data',
                                com_method_name: 'refresh',
                                com_method_params: [
                                    {
                                        param_name: 'ds_name',
                                        param_source: 'text',
                                        param_desc: 'listPageData'
                                    }
                                ],
                            },
                        },
                    }
                ],
            }
        ],
    }

    return list_formSearch
} 
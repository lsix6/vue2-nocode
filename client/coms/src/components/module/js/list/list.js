
import _ from 'lodash'
import { get_field_ds_name } from '../data_sources';

const createListComs = (field) => {
    let colComs = _.cloneDeep(field.in_list.column_components)
    //
    const fdInfo = field.field_info
    if (fdInfo.enum || fdInfo.enum_map || fdInfo.data_source) {
        if (!colComs[0]) {
            colComs[0] = {
                com_name: 'nc_enum',
            }
        }
        colComs[0].com_field = {
            field_name: fdInfo.name
        }
        colComs[0].com_props = colComs[0].com_props || {}
        colComs[0].com_props.data_source_name = get_field_ds_name(fdInfo.name)
    }
    //
    return colComs
}

const createFields = (fields) => {
    const arr = []
    //
    fields.forEach(field => {
        if (field.in_list) {
            const fdInfo = field.field_info
            //
            const colComs = createListComs(field)
            //
            arr.push({
                column_props: {
                    prop: fdInfo.name,
                    label: fdInfo.label,
                    ...field.in_list.column_props,
                },
                column_components: colComs,
            })
        }
    });
    console.log('createFields', arr)
    //
    return arr
}

export const createList = (moduleName, moduleFields) => {

    const btnInRow = {
        com_name: 'el-button',
        com_info: {
            style: {
                'margin-right': '10px',
                padding: 0,
            },
        },
        com_props: {
            type: 'text',
        },
    }

    const btnEdit = {
        ...btnInRow,
        com_text: '编辑',
        com_events: [
            {
                event_name: 'click',
                commands: [
                    {
                        cmd_name: 'push_route',
                        cmd_params: {
                            route: {
                                path: 'edit',
                                route_params: [
                                    {
                                        param_name: '_id',
                                        param_source: 'com_data',
                                        param_desc: '_id',
                                    }
                                ],
                            },
                        }
                    }
                ]
            }
        ],
    }

    const cmdRemove = {
        cmd_name: 'request_api',
        cmd_params: {
            api: {
                url: `${moduleName}/delete`,
                method: 'DELETE',
                request_params: [
                    {
                        param_name: '_id',
                        param_source: 'com_data',
                        param_desc: '_id',
                    }
                ],
            },
        },
        succeeded_commands: [
            {
                cmd_name: 'message',
                cmd_params: {
                    msg: {
                        type: 'success',
                        msg_params: [
                            {
                                param_name: 'options',
                                param_source: 'text',
                                param_desc: '删除成功',
                            }
                        ],
                    },
                }
            },
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
                }
            },
        ],
        failed_commands: [
            {
                cmd_name: 'message',
                cmd_params: {
                    msg: {
                        type: 'error',
                        msg_params: [
                            {
                                param_name: 'options',
                                param_source: 'cmd_data',
                                param_desc: 'message',
                            }
                        ],
                    },
                }
            },
        ],
    }

    const btnRemove = {
        com_name: 'el-popconfirm',
        com_props: {
            'popper-class': 'board-style',
            title: '确认删除',
            message: '删除后不可恢复，确认删除吗？',
        },
        com_events: [
            {
                event_name: 'confirm',
                commands: [
                    cmdRemove,
                ],
            }
        ],
        com_slots: {
            default: [
                {
                    com_slot: 'reference',
                    ...btnInRow,
                    com_text: '删除',
                },
            ]
        },
    }

    const fields = createFields(moduleFields)

    const list = {
        com_name: 'nc_table',
        com_ref: 'list',
        com_binds: [
            {
                prop_name: 'listData',
                field_name: '__ds.listPageData.listData',
            }
        ],
        com_props: {
            table_props: {
                stripe: true,
                height: '100%',
                'tooltip-effect': 'light',
            },
            fields: [
                ...fields,
                {
                    column_props: {
                        label: '操作',
                        width: '120',
                        align: 'center',
                        fixed: 'right',
                    },
                    column_components: [
                        {
                            com_name: 'div',
                            com_info: {
                                style: {
                                    'text-align': 'center',
                                    'margin-left': '10px',
                                },
                            },
                            com_slots: {
                                default: [
                                    btnEdit,
                                    btnRemove,
                                ]
                            },
                        },
                    ]
                },
            ],
        },
        com_slots: {
            default: [
                {
                    com_name: 'span',
                    com_slot: 'empty',
                    com_slots: {
                        default: [
                            {
                                com_name: 'div',
                                com_text: '暂 无 数 据',
                            },
                        ],
                    },
                }
            ],
        },
        com_events: [
            {
                event_name: 'sort-change',
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

    return list
}

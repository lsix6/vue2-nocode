
const createFields = (fields) => {
    const arr = []
    //
    fields.forEach(field => {
        arr.push({
            column_props: {
                prop: field.field_info.name,
                label: field.field_info.label,
                ...field.in_list.column_props,
            },
            column_components: field.in_list.column_components,
        })
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
                            path: 'edit',
                            route_params: [
                                {
                                    params_source: 'com_params',
                                    params_fields: [
                                        '_id',
                                    ]
                                }
                            ],
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
            },
            request_params: [
                {
                    params_source: 'com_params',
                    params_fields: [
                        '_id'
                    ],
                }
            ],
            commands: [
                {
                    cmd_name: 'message',
                    cmd_params: {
                        cmd_msg_type: 'success',
                        cmd_msg_params: {
                            options: '删除成功',
                        },
                    }
                },
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
                    }
                },
            ],
            exception_commands: [
                {
                    cmd_name: 'message',
                    cmd_params: {
                        cmd_msg_type: 'error',
                        cmd_msg_params: {
                            options_params: [
                                {
                                    params_source: 'cmd_data',
                                    params_fields: [
                                        'message'
                                    ]
                                }
                            ],
                        },
                    }
                },
            ],
        },
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
        com_children: [
            {
                com_slot: 'reference',
                ...btnInRow,
                com_text: '删除',
            },
        ]
    }

    const fields = createFields(moduleFields)

    const list = {
        com_name: 'nc_list',
        com_binds: [
            {
                prop_name: 'listData',
                field_name: '__listPageData.listData',
            }
        ],
        com_props: {
            table_props: {
                stripe: true,
                height: '100%',
                'tooltip-effect': 'light',
                border: true,
            },
            fields: [
                ...fields,
                {
                    column_props: {
                        label: '操作',
                        width: '160',
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
                            com_children: [
                                btnEdit,
                                btnRemove,
                            ]
                        },
                    ]
                },
            ],
        },
        com_children: [
            {
                com_name: 'span',
                com_slot: 'empty',
                com_children: [
                    {
                        com_name: 'div',
                        com_text: '暂 无 数 据',
                    },
                ],
            }
        ],
    }

    return list
}

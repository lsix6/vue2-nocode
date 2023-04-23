
const cmdCancel = {
    cmd_name: 'call_com_method',
    cmd_params: {
        com_ref: 'formAdd',
        com_method_name: 'cancelFormChange',
        commands: [
            {
                cmd_name: 'go_back',
            }
        ]
    },
}

const btnCancel = {
    com_name: 'el-button',
    com_text: '取消',
    com_props: {
    },
    com_events: [
        {
            event_name: 'click',
            commands: [
                cmdCancel,
            ]
        }
    ],
}

const btnSave = {
    com_name: 'el-button',
    com_text: '确定',
    com_props: {
        type: 'primary',
    },
    com_events: [
        {
            event_name: 'click',
            commands: [
                {
                    cmd_name: 'call_com_method',
                    cmd_params: {
                        com_ref: 'formAdd',
                        com_method_name: 'commitData',
                        commands: [
                            {
                                cmd_name: 'push_route',
                                cmd_params: {
                                    path: 'edit',
                                    route_params: [
                                        {
                                            params_source: 'cmd_data',
                                            params_fields: [
                                                {
                                                    field_name: 'insertResult.insertedId',
                                                    target_name: '_id',
                                                }
                                            ]
                                        }
                                    ],
                                }
                            }
                        ]
                    }
                },
            ]
        }
    ],
}

export const product_add_form_buttons = {
    com_name: 'div',
    com_props: {
        style: {
            width: '100%',
            'text-align': 'right',
            'margin-top': '40px',
        }
    },
    com_children: [
        btnCancel,
        btnSave,
    ]
}
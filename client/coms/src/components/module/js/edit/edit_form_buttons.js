
const cmdCancel = {
    cmd_name: 'call_com_method',
    cmd_params: {
        com_ref: 'formEdit',
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
        'native-type': 'submit',
    },
    com_events: [
        {
            event_name: 'click',
            commands: [
                {
                    cmd_name: 'call_com_method',
                    cmd_params: {
                        com_ref: 'formEdit',
                        com_method_name: 'commitData',
                        commands: [
                            {
                                cmd_name: 'go_back',
                                cmd_delay: 500,
                            }
                        ]
                    }
                },
            ]
        }
    ],
}

export const edit_form_buttons = {
    com_name: 'div',
    com_info: {
        style: {
            width: '100%',
            'text-align': 'right',
            'margin-top': '40px',
        }
    },
    com_slots: {
        default: [
            btnCancel,
            btnSave,
        ]
    },
}

export const list_btnAdd = {
    com_name: 'el-button',
    com_text: '添加',
    com_info: {
        style: {
            width: '100px',
            height: '40px',
            margin: '5px 10px',
        },
    },
    com_props: {
        type: 'primary',
    },
    com_events: [
        {
            event_name: 'click',
            commands: [
                {
                    cmd_name: 'push_route',
                    cmd_params: {
                        path: 'add',
                    }
                },
            ]
        }
    ],
}

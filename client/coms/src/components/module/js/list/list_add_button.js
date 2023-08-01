
export const list_btnAdd = {
    com_name: 'el-button',
    com_text: '添加',
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
                        route: {
                            path: 'add',
                        },
                    }
                },
            ]
        }
    ],
}

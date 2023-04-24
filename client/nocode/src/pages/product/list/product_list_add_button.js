
export const product_list_btnAdd = {
    com_name: 'el-button',
    com_text: '添加',
    com_props: {
        type: 'primary',
        style: {
            width: '100px',
        },
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

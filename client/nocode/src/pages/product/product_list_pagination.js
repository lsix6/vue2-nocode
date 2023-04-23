export const product_list_pagination = {
    com_name: 'nc_pagination',
    com_ref: 'pagination',
    com_props: {
        pagination_props: {
            'page-sizes': [20, 50, 100],
            layout: "total, sizes, prev, pager, next, jumper",
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

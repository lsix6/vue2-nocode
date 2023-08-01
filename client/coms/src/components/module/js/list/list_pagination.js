
export const list_pagination = {
    com_name: 'nc_pagination',
    com_ref: 'pagination',
    com_binds: [
        {
            prop_name: 'page_data',
            field_name: '__ds.listPageData.pageData',
        }
    ],
    com_props: {
        pagination_props: {
            'page-sizes': [10, 50, 100],
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

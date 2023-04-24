
export const product_edit_page = {
    com_name: "div",
    com_version: '0',
    com_props: {
        style: {
            background: '#F5F6F7',
            flex: 1,
            display: 'flex',
        },
    },
    com_children: [
        {
            com_name: 'el-container',
            com_props: {
                direction: 'vertical',
            },
            com_children: [
                {
                    com_name: 'el-header',
                    com_props: {
                        style: {
                            padding: '50px',
                            'text-align': 'center',
                        },
                    },
                    com_children: [
                        {
                            com_name: 'div',
                            com_text: '修改产品信息',
                        },
                    ],
                },
                {
                    com_name: 'el-main',
                    com_children: [
                        {
                            com_name: 'div',
                            com_props: {
                                style: {
                                    width: '800px',
                                    margin: 'auto',
                                },
                            },
                            com_children: [
                                {
                                    com_name: 'nc_data',
                                    com_props: {
                                        fetch_data: {
                                            api: {
                                                url: 'product/detail',
                                                method: 'GET',
                                            },
                                            fetch_params: [
                                                {
                                                    params_source: 'route_query',
                                                    params_fields: [
                                                        '_id',
                                                    ]
                                                }
                                            ]
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
}

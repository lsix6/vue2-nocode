import { product_list } from "./product_list";
import { formSearch } from "./product_list_search";

export const product_list_page = {
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
            com_name: 'nc_data',
            com_ref: 'product_list_page_data',
            com_props: {
                fetch_data: {
                    api: {
                        url: 'product/list',
                        method: 'GET',
                    },
                    fetch_params: [
                        {
                            params_source: 'com_ref',
                            params_com_ref: 'formSearch',
                            params_set_name: 'search',
                        },
                    ]
                },
                style: {
                    flex: 1,
                },
                data_children: [
                    {
                        com_name: 'div',
                        com_props: {
                            style: {
                                height: '100%',
                                display: 'flex',
                                'flex-direction': 'column',
                                overflow: 'hidden',
                            },
                        },
                        com_children: [
                            {
                                com_name: 'div',
                                com_props: {
                                    style: {
                                        padding: '10px 0'
                                    },
                                },
                                com_children: [
                                    formSearch,
                                ],
                            },
                            {
                                com_name: 'div',
                                com_props: {
                                    style: {
                                        background: 'green',
                                        flex: 1,
                                    },
                                },
                                com_children: [
                                    product_list,
                                ],
                            },
                            {
                                com_name: 'div',
                                com_props: {
                                    style: {
                                        background: 'blue',
                                        height: '30px',
                                    },
                                },
                                com_children: [

                                ],
                            },
                        ],
                    },
                ],
            },
        }
    ],
}

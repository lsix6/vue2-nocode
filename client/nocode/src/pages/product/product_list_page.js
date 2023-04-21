import { product_list } from "./product_list";
// import { formSearch } from "./product_list_search";

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
            com_props: {
                fetch_data: {
                    api: {
                        url: 'product/list',
                        method: 'GET',
                    },
                },
                style: {
                    flex: 1,
                },
                data_children: [
                    {
                        com_name: "div",
                        com_props: {
                            class: 'content-opration',
                            style: {
                                'min-width': 'fit-content',
                            },
                        },
                        com_children: [
                            {
                                com_name: "div",
                                com_props: {
                                    class: "opration-left",
                                    style: {
                                        "max-width": '80%',
                                        width: 'auto',
                                    },
                                },
                                com_children: [
                                    // formSearch,
                                ]
                            },
                            {
                                com_name: "div",
                                com_props: {
                                    class: "opration-right",
                                    style: {
                                        "max-width": '35%',
                                        "text-align": 'right',
                                        "z-index": 10,
                                    },
                                },
                                com_children: [
                                    // btnCreate
                                ]
                            }
                        ]
                    },
                    {
                        com_name: "div",
                        com_props: {
                            style: {
                                overflow: 'hidden',
                                flex: 1,
                            }
                        },
                        com_children: [
                            product_list,
                        ]
                    },
                    {
                        com_name: 'div',
                        com_props: {
                            class: 'pagination-block',
                            style: {
                                'min-width': 'fit-content',
                            },
                        },
                        com_children: [
                            // pagination
                        ]
                    },
                ],
            },
        }
    ],
}

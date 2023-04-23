import { product_formAdd } from "./product_add_form";

export const product_add_page = {
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
                            com_text: '添加新产品',
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
                            com_children: {
                                product_formAdd,
                            },
                        },
                    ],
                },
            ],
        },
    ],
}

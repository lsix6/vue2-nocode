import { product_list } from "./product_list";

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
                    product_list,
                ],
            },
        }
    ],
}

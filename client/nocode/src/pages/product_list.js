export const pageProductList = {
    "com_name": "div",
    "com_version": '0',
    "com_props": {
        style: {
            width: '100%',
            height: '100%',
            display: 'flex',
            background: '#F5F6F7'
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
            },
        }
    ],
}

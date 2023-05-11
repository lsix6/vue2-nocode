import { product_fields } from "./product_fields";

const moduleName = 'product'

export const product_info = {
    name: moduleName,
    data_sources: {
        __producePlaceMap: {
            api: {
                url: `${moduleName}/producePlace`,
                method: 'GET',
            },
        },
        __marketMap: {
            fetch_params: [
                {
                    enumMap: {
                        '0': '出口',
                        '1': '内销',
                    },
                    params_fields: [
                        'enumMap',
                    ],
                }
            ],
        },
        __colorMap: {
            fetch_params: [
                {
                    enumMap: {
                        0: '#ff0000',
                        1: '#00ff00',
                        2: '#0000ff',
                    },
                    params_fields: [
                        'enumMap',
                    ],
                }
            ],
        },
    },
    add_form: {
        title: '添加新产品',
    },
    edit_form: {
        title: '修改产品信息',
    },
    fields: product_fields,
}
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
        __stateMap: {
            fetch_params: [
                {
                    enumMap: {
                        true: '已上架',
                        false: '未上架',
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
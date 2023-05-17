import { getProductFields } from "./product_fields";

const moduleName = 'product'

export const product_info = {
    name: moduleName,
    add_form: {
        title: '添加新产品',
    },
    edit_form: {
        title: '修改产品信息',
    },
    fields: getProductFields(moduleName),
}
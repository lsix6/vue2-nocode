import { getFields } from "./user_fields";

const moduleName = 'user'


export const user_info = {
    name: moduleName,
    add_form: {
        title: '添加新用户',
    },
    edit_form: {
        title: '修改用户信息',
    },
    fields: getFields(moduleName),
}


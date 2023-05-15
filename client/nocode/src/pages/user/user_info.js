import { getFields } from "./user_fields";

const moduleName = 'user'

export const user_info = {
    name: moduleName,
    data_sources: {
        __hujiMap: {
            api: {
                url: `${moduleName}/huji`,
                method: 'GET',
            },
        },
        __genderMap: {
            fetch_params: [
                {
                    enumMap: {
                        1: '男',
                        2: '女',
                    },
                    params_fields: [
                        'enumMap',
                    ],
                }
            ],
        },
    },
    add_form: {
        title: '添加新用户',
    },
    edit_form: {
        title: '修改用户信息',
    },
    fields: getFields(moduleName),
}
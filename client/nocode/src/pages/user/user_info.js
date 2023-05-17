import { create_date_sources } from "../base/data_sources";
import { getFields } from "./user_fields";

const moduleName = 'user'

export const get_user_info = () => {

    const _info = {
        name: moduleName,
        add_form: {
            title: '添加新用户',
        },
        edit_form: {
            title: '修改用户信息',
        },
        fields: getFields(moduleName),
    }

    //
    const data_sources = create_date_sources(_info)
    _info.data_sources = {
        ..._info.data_sources,
        ...data_sources,
    }

    //
    return _info
}

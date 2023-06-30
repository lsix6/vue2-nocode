import { createFormItems } from "../form_items";
import { edit_form_buttons } from "./edit_form_buttons";

export const createEditForm = (moduleInfo) => {

    const form_items = createFormItems(moduleInfo.fields)

    const formEdit = {
        com_name: 'nc_form',
        com_ref: 'formEdit',
        com_binds: [
            {
                prop_name: 'init_data',
                field_name: '__ds.recordData.data',
            },
        ],
        com_props: {
            form_props: {
                "label-width": '90px',
            },
            commit_data: {
                api: {
                    url: `${moduleInfo.name}/update`,
                    method: 'POST',
                },
                success_message: '修改成功',
                error_message: '修改失败',
            },
            form_children: [
                ...form_items,
                edit_form_buttons,
            ]
        }
    }

    return formEdit
}

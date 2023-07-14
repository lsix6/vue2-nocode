import { createFormItems } from "../form_items";
import { add_form_buttons } from "./add_form_buttons";

export const createAddForm = (moduleInfo) => {

    const form_items = createFormItems(moduleInfo.fields)

    const formAdd = {
        com_name: 'nc_form',
        com_ref: 'formAdd',
        com_props: {
            form_props: {
                "label-width": '90px',
            },
            commit_data: {
                api: {
                    url: `${moduleInfo.name}/add`,
                    method: 'POST',
                },
                success_message: '添加成功',
                error_message: '添加失败',
            },
        },
        com_slots: {
            default: [
                ...form_items,
                add_form_buttons,
            ],
        },
    }

    return formAdd
}

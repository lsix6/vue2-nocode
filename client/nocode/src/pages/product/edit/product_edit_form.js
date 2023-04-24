import { product_form_items } from "../product_form_items";
import { product_edit_form_buttons } from "./product_edit_form_buttons";

export const product_formEdit = {
    com_name: 'nc_form',
    com_ref: 'formEdit',
    com_binds: [
        {
            prop_name: 'init_data',
            field_name: 'data',
        },
    ],
    com_props: {
        form_props: {
            "label-width": '90px',
        },
        commit_data: {
            api: {
                url: 'product/update',
                method: 'POST',
            },
            success_message: '修改成功',
            error_message: '修改失败',
        },
        form_children: [
            ...product_form_items,
            product_edit_form_buttons,
        ]
    }
}

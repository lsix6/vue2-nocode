import { product_form_items } from "../product_form_items";
import { product_add_form_buttons } from "./product_add_form_buttons";

export const product_formAdd = {
    com_name: 'nc_form',
    com_ref: 'formAdd',
    com_props: {
        form_props: {
            "label-width": '90px',
        },
        commit_data: {
            api: {
                url: 'product/add',
                method: 'POST',
            },
            success_message: '添加成功',
            error_message: '添加失败',
        },
        form_children: [
            ...product_form_items,
            product_add_form_buttons,
        ]
    }
}

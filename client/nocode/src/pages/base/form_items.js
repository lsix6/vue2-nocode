import _ from 'lodash'
import { get_field_ds_name } from './data_sources'

export const createFormItems = (fields) => {
    const arr = []
    //
    const pushFieldToArr = (field, i) => {
        const fdInfo = field.field_info
        //
        const edit_com = _.cloneDeep(field.in_form.edit_com)
        //
        if (fdInfo.enum || fdInfo.data_source) {
            edit_com.com_props = edit_com.com_props || {}
            edit_com.com_props.data_source_name = get_field_ds_name(fdInfo.name)
        }
        //
        if (i === 0) {
            if (!edit_com.com_info) {
                edit_com.com_info = {}
            }
            if (!edit_com.com_info.directives) {
                edit_com.com_info.directives = []
            }
            edit_com.com_info.directives.push({
                name: 'focus'
            })
        }
        //
        edit_com.com_field = {
            field_name: `formData.${field.field_info.name}`
        }
        if (!_.isNil(field.field_info.default_value)) {
            edit_com.com_field.field_default_value = field.field_info.default_value
        }
        //
        arr.push({
            com_name: 'nc_form_item',
            com_props: {
                label: field.field_info.label,
                prop: field.field_info.name,
                rules: field.in_form.rules,
            },
            com_children: [
                edit_com,
            ]
        })
    }
    //
    fields.forEach((field, i) => {
        if (field.in_form) {
            pushFieldToArr(field, i)
        }
    })
    console.log('createFormItems', arr)
    //
    return arr
}

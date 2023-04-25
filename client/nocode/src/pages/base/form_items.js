import _ from 'lodash'

export const createFormItems = (fields) => {
    const arr = []
    //
    fields.forEach((field, i) => {
        const edit_com = _.cloneDeep(field.in_form.edit_com)
        //
        if (i === 0) {
            if (!edit_com.com_props) {
                edit_com.com_props = {}
            }
            edit_com.com_props.autofocus = true
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
                form_item_props: {
                    label: field.field_info.label,
                    prop: field.field_info.name,
                    rules: field.in_form.rules,
                },
            },
            com_children: [
                edit_com,
            ]
        })
    })
    console.log('createFormItems', arr)
    //
    return arr
}

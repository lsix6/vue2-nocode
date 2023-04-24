export const product_form_items = [
    {
        com_name: 'nc_form_item',
        com_props: {
            form_item_props: {
                label: '编号',
                prop: 'no',
                rules: [
                    { required: true, message: '请输入编号', trigger: 'blur' },
                    { pattern: /^[A-Za-z0-9]+$/, message: '请输入字母或数字', trigger: ['blur', 'change'] },
                    { min: 1, max: 8, message: '长度在 1 到 8 个字母或数字', trigger: ['blur', 'change'] }
                ],
            },
        },
        com_children: [
            {
                com_name: 'nc_input',
                com_props: {
                    autofocus: true,
                    trim_after_blur: true,
                    input_props: {
                        maxlength: 8,
                        'show-word-limit': true,
                        clearable: true,
                        placeholder: '请输入编号',
                    },
                },
                com_field: {
                    field_name: 'formData.no',
                    field_default_value: '',
                },
            }
        ]
    },
    {
        com_name: 'nc_form_item',
        com_props: {
            form_item_props: {
                label: '名称',
                prop: 'name',
                rules: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: ['blur', 'change'] }
                ],
            },
        },
        com_children: [
            {
                com_name: 'nc_input',
                com_props: {
                    trim_after_blur: true,
                    input_props: {
                        maxlength: 20,
                        'show-word-limit': true,
                        clearable: true,
                        placeholder: '请输入名称',
                    },
                },
                com_field: {
                    field_name: 'formData.name',
                    field_default_value: '',
                },
            }
        ]
    },
    {
        com_name: 'nc_form_item',
        com_props: {
            form_item_props: {
                label: '价格',
                prop: 'price',
                rules: [
                    { required: true, message: '请输入价格', trigger: 'blur' },
                ],
            },
        },
        com_children: [
            {
                com_name: 'nc_input',
                com_props: {
                    trim_after_blur: true,
                    input_props: {
                        clearable: true,
                        placeholder: '请输入编号',
                    },
                },
                com_field: {
                    field_name: 'formData.price',
                    field_default_value: '10',
                },
            }
        ]
    },
]

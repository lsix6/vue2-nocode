
export const product_fields = [
    {
        field_info: {
            name: 'no',
            label: '产品编号',
        },
        in_list: {
            'min-width': '180',
        },
        in_search: {
            type: 'key',
        },
        in_form: {
            rules: [
                { required: true, message: '请输入编号', trigger: 'blur' },
                { pattern: /^[A-Za-z0-9]+$/, message: '请输入字母或数字', trigger: ['blur', 'change'] },
                { min: 1, max: 8, message: '长度在 1 到 8 个字母或数字', trigger: ['blur', 'change'] }
            ],
            edit_com: {
                com_name: 'el-input',
                com_info: {
                    attrs: {
                        placeholder: '请输入编号',
                    },
                    directives: [
                        {
                            name: 'blur-trim',
                        }
                    ],
                },
                com_props: {
                    maxlength: 8,
                    'show-word-limit': true,
                    clearable: true,
                },
            },
        },
    },
    {
        field_info: {
            name: 'name',
            label: '产品名称',
        },
        in_list: {
            'min-width': '200',
        },
        in_search: {
            type: 'key',
        },
        in_form: {
            rules: [
                { required: true, message: '请输入名称', trigger: 'blur' },
                { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: ['blur', 'change'] }
            ],
            edit_com: {
                com_name: 'el-input',
                com_info: {
                    attrs: {
                        placeholder: '请输入名称',
                    },
                    directives: [
                        {
                            name: 'blur-trim',
                        }
                    ],
                },
                com_props: {
                    maxlength: 20,
                    'show-word-limit': true,
                    clearable: true,
                },
            },
        },
    },
    {
        field_info: {
            name: 'price',
            label: '价格',
            default_value: 10,
        },
        in_list: {
            'min-width': '100',
        },
        in_form: {
            rules: [
                { required: true, message: '请输入价格', trigger: 'blur' },
            ],
            edit_com: {
                com_name: 'el-input',
                com_info: {
                    attrs: {
                        placeholder: '请输入价格',
                    },
                },
                com_props: {
                    clearable: true,
                },
            },
        },
    },
]
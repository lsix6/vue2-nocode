
export const getFields = (moduleName) => {

    const _fields = [
        {
            field_info: {
                name: 'no',
                label: '用户编号',
            },
            in_list: {
                column_props: {
                    'min-width': '180',
                },
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
                            maxlength: 8,
                        },
                        directives: [
                            {
                                name: 'blur-trim',
                            }
                        ],
                    },
                    com_props: {
                        'show-word-limit': true,
                        clearable: true,
                    },
                },
            },
        },
        {
            field_info: {
                name: 'name',
                label: '姓名',
            },
            in_list: {
                column_props: {
                    'min-width': '200',
                },
            },
            in_search: {
                type: 'key',
            },
            in_form: {
                rules: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: ['blur', 'change'] }
                ],
                edit_com: {
                    com_name: 'el-input',
                    com_info: {
                        attrs: {
                            placeholder: '请输入姓名',
                            maxlength: 20,
                        },
                        directives: [
                            {
                                name: 'blur-trim',
                            }
                        ],
                    },
                    com_props: {
                        'show-word-limit': true,
                        clearable: true,
                    },
                },
            },
        },
        {
            field_info: {
                name: 'picture',
                label: '头像',
            },
            in_list: {
                column_props: {
                    width: '80',
                    'header-align': 'center',
                },
                column_components: [
                    {
                        com_name: 'el-avatar',
                        com_info: {
                            style: {
                                display: 'block',
                                margin: 'auto',
                            },
                        },
                        com_binds: [
                            {
                                prop_name: 'src',
                                field_name: 'picture',
                            },
                        ],
                        com_props: {
                            shape: 'square',
                            size: 'small',
                        },
                    },
                ],
            },
        },
        {
            field_info: {
                name: 'gender',
                label: '性别',
                default_value: '0',
            },
            in_list: {
                column_props: {
                    'min-width': '100',
                    sortable: 'custom',
                },
                column_components: [
                    {
                        com_name: 'nc_enum',
                        com_field: {
                            field_name: 'gender',
                        },
                        com_props: {
                            data_source_name: '__genderMap',
                        },
                    }
                ],
            },
            in_search: {
                search_com: {
                    com_name: 'nc_select',
                    com_info: {
                        style: {
                            width: '90px',
                        },
                        attrs: {
                            clearable: true,
                        },
                    },
                    com_props: {
                        data_source_name: '__genderMap',
                    },
                },
            },
            in_form: {
                edit_com: {
                    com_name: 'nc_radio_group',
                    com_props: {
                        data_source_name: '__genderMap',
                    },
                }
            },
        },
        {
            field_info: {
                name: 'huji',
                label: '户籍',
            },
            in_list: {
                column_props: {
                    'min-width': '100',
                    sortable: 'custom',
                },
                column_components: [
                    {
                        com_name: 'nc_enum',
                        com_field: {
                            field_name: 'huji',
                        },
                        com_props: {
                            data_source_name: '__hujiMap',
                        },
                    }
                ],
            },
            in_search: {
                search_com: {
                    com_name: 'nc_select',
                    com_info: {
                        style: {
                            width: '120px',
                        },
                        attrs: {
                            clearable: true,
                        },
                    },
                    com_props: {
                        data_source_name: '__hujiMap',
                    },
                },
            },
            in_form: {
                edit_com: {
                    com_name: 'nc_select',
                    com_props: {
                        data_source_name: '__hujiMap',
                    },
                }
            },
        },
        {
            field_info: {
                name: 'birthday',
                label: '出生年月',
            },
            in_list: {
                column_props: {
                    'min-width': '180',
                },
            },
            in_search: {
                search_com: {
                    com_name: 'el-date-picker',
                    com_props: {
                        type: "daterange",
                        'range-separator': "至",
                        'start-placeholder': "开始日期",
                        'end-placeholder': "结束日期",
                        'value-format': 'yyyy-MM-dd HH:mm:ss',
                    },
                },
            },
            in_form: {
                edit_com: {
                    com_name: 'el-date-picker',
                    com_props: {
                        type: 'datetime',
                        placeholder: '请输入出生年月',
                        'value-format': 'yyyy-MM-dd HH:mm:ss',
                    },
                }
            },
        },
    ]

    return _fields
}

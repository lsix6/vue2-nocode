
export const product_fields = [
    {
        field_info: {
            name: 'no',
            label: '产品编号',
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
            label: '产品名称',
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
                { required: true, message: '请输入名称', trigger: 'blur' },
                { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: ['blur', 'change'] }
            ],
            edit_com: {
                com_name: 'el-input',
                com_info: {
                    attrs: {
                        placeholder: '请输入名称',
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
            label: '产品图片',
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
            name: 'price',
            label: '价格',
            default_value: 10,
        },
        in_list: {
            column_props: {
                'min-width': '100',
            },
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
    {
        field_info: {
            name: 'market',
            label: '市场',
            default_value: '0',
        },
        in_list: {
            column_props: {
                'min-width': '100',
            },
            column_components: [
                {
                    com_name: 'nc_enum',
                    com_field: {
                        field_name: 'market',
                    },
                    com_props: {
                        data_source_name: '__marketMap',
                    },
                }
            ],
        },
        in_form: {
            edit_com: {
                com_name: 'nc_radio_group',
                com_props: {
                    data_source_name: '__marketMap',
                },
            }
        },
    },
    {
        field_info: {
            name: 'producePlace',
            label: '产地',
        },
        in_list: {
            column_props: {
                'min-width': '100',
            },
            column_components: [
                {
                    com_name: 'nc_enum',
                    com_field: {
                        field_name: 'producePlace',
                    },
                    com_props: {
                        data_source_name: '__producePlaceMap',
                    },
                }
            ],
        },
        in_form: {
            edit_com: {
                com_name: 'nc_select',
                com_props: {
                    data_source_name: '__producePlaceMap',
                },
            }
        },
    },
    {
        field_info: {
            name: 'inSale',
            label: '状态',
            default_value: false,
        },
        in_list: {
            column_props: {
                'min-width': '100',
            },
            column_components: [
                {
                    com_name: 'nc_enum',
                    com_field: {
                        field_name: 'inSale',
                    },
                    com_props: {
                        data_source_name: '__stateMap',
                    },
                }
            ],
        },
        in_form: {
            edit_com: {
                com_name: 'el-checkbox',
                com_text: '已上架',
            }
        },
    },
    {
        field_info: {
            name: 'delivery',
            label: '即时配送',
            default_value: false,
        },
        in_list: {
            column_props: {
                'min-width': '100',
            },
            column_components: [
                {
                    com_name: 'el-switch',
                    com_field: {
                        field_name: 'delivery',
                    },
                }
            ],
        },
        in_form: {
            edit_com: {
                com_name: 'el-switch',
            }
        },
    },
    {
        field_info: {
            name: 'storageDate',
            label: '入库时间',
        },
        in_list: {
            column_props: {
                'min-width': '180',
            },
        },
        in_form: {
            edit_com: {
                com_name: 'el-date-picker',
                com_props: {
                    type: 'datetime',
                    placeholder: '请输入入库时间',
                    'value-format': 'yyyy-MM-dd HH:mm:ss',
                },
            }
        },
    },
    {
        field_info: {
            name: 'color',
            label: '产品颜色',
        },
        in_list: {
            column_props: {
                width: '80',
                'header-align': 'center',
            },
            column_components: [
                {
                    com_name: 'nc_color',
                    com_field: {
                        field_name: 'color',
                    },
                    com_info: {
                        style: {
                            width: '28px',
                            height: '28px',
                            margin: 'auto',
                        }
                    },
                }
            ],
        },
        in_form: {
            edit_com: {
                com_name: 'el-color-picker',
            }
        },
    },
    {
        field_info: {
            name: 'level',
            label: '等级',
            default: 0,
        },
        in_list: {
            column_props: {
                width: '150',
            },
            column_components: [
                {
                    com_name: 'el-rate',
                    com_field: {
                        field_name: 'level',
                    },
                    com_props: {
                        disabled: true,
                    },
                }
            ],
        },
        in_form: {
            edit_com: {
                com_name: 'el-rate',
            }
        },
    },
]
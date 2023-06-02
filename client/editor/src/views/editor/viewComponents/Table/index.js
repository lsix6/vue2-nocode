/**
 * Created by Liu.Jun on 2020/10/30 17:11.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: 'Table',
    type: 'object',
    required: [],
    properties: {},
    'ui:order': []
};

export default {
    viewSchema,
    propsSchema: genSchema({}, 'object'),
    comSchema: {
        com_name: 'nc_list',
        com_ref: 'list',
        com_binds: [
            {
                prop_name: 'listData',
                field_name: '__ds_listPageData.listData',
            }
        ],
        com_props: {
            table_props: {
                stripe: true,
                height: '100%',
                'tooltip-effect': 'light',
            },
            fields: [
                {
                    "column_props": {
                        "prop": "no",
                        "label": "用户编号",
                        "min-width": "180"
                    }
                },
                {
                    "column_props": {
                        "prop": "name",
                        "label": "姓名",
                        "min-width": "200"
                    }
                },
                {
                    "column_props": {
                        "prop": "avatar",
                        "label": "头像",
                        "width": "80",
                        "header-align": "center"
                    },
                    "column_components": [
                        {
                            "com_name": "el-avatar",
                            "com_info": {
                                "style": {
                                    "display": "block",
                                    "margin": "auto"
                                }
                            },
                            "com_binds": [
                                {
                                    "prop_name": "src",
                                    "field_name": "avatar"
                                }
                            ],
                            "com_props": {
                                "shape": "square",
                                "size": "small"
                            }
                        }
                    ]
                },
                {
                    "column_props": {
                        "prop": "gender",
                        "label": "性别",
                        "min-width": "100",
                        "sortable": "custom"
                    },
                    "column_components": [
                        {
                            "com_name": "nc_enum",
                            "com_field": {
                                "field_name": "gender"
                            },
                            "com_props": {
                                "data_source_name": "__ds_gender"
                            }
                        }
                    ]
                },
                {
                    "column_props": {
                        "prop": "huji",
                        "label": "户籍",
                        "min-width": "100",
                        "sortable": "custom"
                    },
                    "column_components": [
                        {
                            "com_name": "nc_enum",
                            "com_field": {
                                "field_name": "huji"
                            },
                            "com_props": {
                                "data_source_name": "__ds_huji"
                            }
                        }
                    ]
                },
                {
                    "column_props": {
                        "prop": "birthday",
                        "label": "出生年月",
                        "min-width": "180"
                    }
                },
                {
                    column_props: {
                        label: '操作',
                        width: '120',
                        align: 'center',
                        fixed: 'right',
                    },
                    column_components: [
                        {
                            com_name: 'div',
                            com_info: {
                                style: {
                                    'text-align': 'center',
                                    'margin-left': '10px',
                                },
                            },
                            com_children: [
                            ]
                        },
                    ]
                },
            ],
        },
        com_children: [
            {
                com_name: 'span',
                com_slot: 'empty',
                com_children: [
                    {
                        com_name: 'div',
                        com_text: '暂 无 数 据',
                    },
                ],
            }
        ],
        com_events: [
            {
                event_name: 'sort-change',
                commands: [
                    {
                        cmd_name: 'call_com_method',
                        cmd_params: {
                            com_ref: 'list_page_data',
                            com_method_name: 'refresh',
                            com_method_params: [
                                {
                                    ds_name: '__listPageData',
                                }
                            ],
                        },
                    }
                ],
            }
        ],
    },
};

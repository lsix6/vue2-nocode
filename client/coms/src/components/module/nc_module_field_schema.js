
const viewSchema = {
    title: 'Module Field',
    type: 'object',
};

export default {
    viewSchema,
    propsSchema: {
        com_props: {
            type: 'object',
            title: 'props',
            properties: {
                field_name: {
                    type: 'string',
                    title: 'name',
                },
                field_label: {
                    type: 'string',
                    title: 'label',
                },
                data_sources_title: {
                    title: 'Data Sources',
                    type: 'object',
                },
                data_sources: {
                    type: 'array',
                    minItems: 0,
                    maxItems: 1,
                    'ui:showIndexNumber': true,
                    items: {
                        type: 'object',
                        'ui:field': 'SetDataSource',
                        'ui:disable_name_input': true,
                        properties: {
                            name: {
                                type: 'string',
                            },
                            type: {
                                type: 'string',
                            },
                            api: {
                                type: 'object',
                                properties: {
                                    url: {
                                        type: 'string',
                                    },
                                    fetch_params: {
                                        type: 'array',
                                    },
                                },
                            },
                        },
                    }
                },
                list_title: {
                    title: 'list',
                    type: 'object',
                },
                is_in_list: {
                    type: 'boolean',
                    title: 'in list',
                    default: true,
                },
                column_props: {
                    type: 'object',
                    properties: {
                        sortable: {
                            type: 'boolean',
                            title: 'sortable',
                        },
                        width: {
                            type: 'string',
                            title: 'width',
                        },
                        'min-width': {
                            type: 'string',
                            title: 'min width',
                        },
                        'header-align': {
                            type: 'string',
                            title: 'header align',
                            enum: [
                                'left',
                                'center',
                                'right',
                            ],
                            default: 'left',
                        },
                        fixed: {
                            type: 'string',
                            title: 'fixed',
                            enum: [
                                'left',
                                'right',
                            ],
                            'ui:clearable': true,
                        },
                    },
                },
                form_title: {
                    title: 'form',
                    type: 'object',
                },
                is_in_form: {
                    type: 'boolean',
                    title: 'in form',
                    default: true,
                },
                rules: {
                    type: 'object',
                    properties: {
                        required: {
                            type: 'boolean',
                            title: 'required',
                        },
                        pattern: {
                            type: 'string',
                            title: 'pattern',
                        },
                        pattern_message: {
                            type: 'string',
                            title: 'pattern message'
                        },
                    },
                },
                search_title: {
                    title: 'search',
                    type: 'object',
                },
                is_in_search: {
                    type: 'boolean',
                    title: 'in search',
                    default: false,
                },
                is_in_keyWord: {
                    type: 'boolean',
                    title: 'in keyword',
                    default: false,
                },
            }
        },
    },
    comSchema: {
        com_name: 'nc_module_field',
        com_slots: {
            in_list: [],
            in_search: [],
            in_form: [],
        },
    },
};

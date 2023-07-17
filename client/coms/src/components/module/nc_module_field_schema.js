
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
                enum: {
                    title: 'enum',
                    type: 'array',
                    minItems: 0,
                    items: {
                        type: 'string',
                    }
                },
                column_props: {
                    type: 'object',
                    properties: {
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
                        sortable: {
                            type: 'boolean',
                            title: 'sortable',
                        },
                    },
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

/**
 * Created by Liu.Jun on 2020/10/30 17:11.
 */

const viewSchema = {
    title: 'Table',
    type: 'object',
    required: [],
    properties: {},
    'ui:order': []
};

export default {
    viewSchema,
    propsSchema: {
        com_props: {
            type: 'object',
            title: 'props',
            properties: {
                fields: {
                    title: 'fields',
                    type: 'array',
                    minItems: 0,
                    'ui:showIndexNumber': true,
                    items: {
                        type: 'object',
                        title: 'field',
                        properties: {
                            column_props: {
                                type: 'object',
                                properties: {
                                    prop: {
                                        type: 'string',
                                        title: 'prop',
                                    },
                                    label: {
                                        type: 'string',
                                        title: 'label',
                                    },
                                    sortable: {
                                        type: 'boolean',
                                        title: 'sortable',
                                    },
                                },
                            },
                            ref_com_name: {
                                type: 'string',
                                title: 'ref com',
                            },
                        },
                    }
                }
            }
        }
    },
    comSchema: {
        com_name: 'nc_table',
    },
};

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
                                    sortable: {
                                        type: 'boolean',
                                        title: 'sortable',
                                    },
                                },
                            },
                            ref_com_id: {
                                type: 'string',
                                title: 'ref com',
                                'ui:widget': 'SelectRefCom',
                            },
                        },
                    }
                }
            }
        },
        com_events: {
            type: 'array',
            title: 'events',
            minItems: 0,
            'ui:showIndexNumber': true,
            items: {
                type: 'object',
                title: 'event',
                properties: {
                    event_name: {
                        type: 'string',
                        title: 'name',
                    },
                    commands: {
                        type: 'array',
                        title: 'commands',
                        minItems: 0,
                        'ui:showIndexNumber': true,
                        items: {
                            type: 'object',
                            title: 'command',
                            properties: {
                                cmd_name: {
                                    type: 'string',
                                    title: 'name',
                                },
                                cmd_params: {
                                    type: 'object',
                                    title: 'params',
                                    properties: {
                                        com_ref: {
                                            type: 'string',
                                            title: 'ref',
                                        },
                                        com_method_name: {
                                            type: 'string',
                                            title: 'method name',
                                        },
                                        com_method_params: {
                                            type: 'array',
                                            title: 'method params',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    ds_name: {
                                                        type: 'string',
                                                        title: 'ds name',
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            }
        },
    },
    comSchema: {
        com_name: 'nc_table',
        com_slots: {
            empty: [],
        },
    },
};

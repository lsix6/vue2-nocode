
const viewSchema = {
    title: 'Pagination',
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
                pagination_props: {
                    type: 'object',
                    properties: {
                        'page-sizes': {
                            type: 'array',
                            title: 'page sizes',
                            items: {
                                type: 'number',
                            },
                        },
                        layout: {
                            type: 'string',
                            title: 'layout',
                        },
                    },
                },
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
        com_name: 'nc_pagination',
        com_support: {
            binds: true,
        },
        data_methods: {
            getData: {},
        }
    },
};

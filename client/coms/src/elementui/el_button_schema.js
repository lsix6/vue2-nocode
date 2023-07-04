/**
 * Created by Liu.Jun on 2020/10/30 17:11.
 */

const viewSchema = {
    title: 'el Button',
    type: 'object',
    required: [],
    properties: {},
    'ui:order': []
};

export default {
    viewSchema,
    propsSchema: {
        com_info: {
            type: 'object',
            properties: {
                attrs: {
                    type: 'object',
                    title: 'attrs',
                    properties: {
                    },
                },
            },
        },
        com_props: {
            type: 'object',
            title: 'props',
            properties: {
                type: {
                    type: 'string',
                    title: 'type',
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
                                        path: {
                                            type: 'string',
                                            title: 'path',
                                        },
                                        route_params: {
                                            type: 'array',
                                            title: 'route params',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    params_source: {
                                                        type: 'string',
                                                        title: 'params source',
                                                    },
                                                    params_fields: {
                                                        type: 'array',
                                                        title: 'params fields',
                                                        items: {
                                                            type: 'string'
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
                },
            }
        },
    },
    comSchema: {
        com_name: 'el-button',
    },
};

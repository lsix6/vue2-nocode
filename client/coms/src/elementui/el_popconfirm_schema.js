/**
 * Created by Liu.Jun on 2020/10/30 17:11.
 */

const viewSchema = {
    group: 'element ui',
    title: 'ElPopconfirm',
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
                title: {
                    type: 'string',
                    title: 'title',
                    default: '确认删除',
                },
                message: {
                    type: 'string',
                    title: 'message',
                    default: '删除后不可恢复，确认删除吗？',
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
                                        api: {
                                            type: 'object',
                                            title: 'api',
                                            properties: {
                                                url: {
                                                    title: 'url',
                                                    type: 'string'
                                                },
                                                method: {
                                                    type: 'string',
                                                    title: 'method',
                                                    enum: [
                                                        'GET',
                                                    ],
                                                    default: 'GET'
                                                },
                                            },
                                        },
                                        request_params: {
                                            type: 'array',
                                            title: 'params',
                                            items: {
                                                type: 'object',
                                                title: 'param',
                                                properties: {
                                                    params_source: {
                                                        type: 'string',
                                                        title: 'source',
                                                    },
                                                    params_fields: {
                                                        type: 'array',
                                                        title: 'fields',
                                                        items: {
                                                            type: 'string',
                                                        },
                                                    },
                                                    params_com_ref: {
                                                        type: 'string',
                                                        title: 'com ref',
                                                    },
                                                    params_com_method_name: {
                                                        type: 'string',
                                                        title: 'method name',
                                                    },
                                                    params_default_value: {
                                                        type: 'string',
                                                        title: 'default value',
                                                    },
                                                    params_set_name: {
                                                        type: 'string',
                                                        title: 'set name',
                                                    },
                                                },
                                            },
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
                                },
                            },
                        },
                    },
                },
            }
        },
    },
    comSchema: {
        com_name: 'ElPopconfirm',
        com_slots: {
            reference: [],
        },
    },
};

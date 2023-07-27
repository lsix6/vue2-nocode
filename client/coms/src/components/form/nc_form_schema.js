
const viewSchema = {
    title: 'Form',
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
                commit_data: {
                    type: 'object',
                    title: 'commit',
                    properties: {
                        api: {
                            type: 'object',
                            title: 'api',
                            properties: {
                                url: {
                                    type: 'string',
                                    title: 'url',
                                },
                                method: {
                                    type: 'string',
                                    title: 'method',
                                    default: 'POST',
                                },
                            },
                        },
                        success_message: {
                            type: 'string',
                            title: 'success',
                            default: '修改成功',
                        },
                        error_message: {
                            type: 'string',
                            title: 'error',
                            default: '修改失败',
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
        com_name: 'nc_form',
        com_support: {
            binds: true,
            binds_props: ['init_data'],
        },
        com_slots: {
            default: [],
        },
    },
};

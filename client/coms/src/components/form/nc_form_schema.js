
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
                        'ui:widget': 'SetCommands',
                        items: {
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
        data_methods: {
            getData: {},
        },
        com_methods: {
            submit: {},
            cancelFormChange: {},
        },
    },
};

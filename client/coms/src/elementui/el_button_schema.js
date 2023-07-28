/**
 * Created by Liu.Jun on 2020/10/30 17:11.
 */

const viewSchema = {
    group: 'element ui',
    title: 'ElButton',
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
                        'ui:widget': 'SetCommands',
                        items: {
                        },
                    },
                },
            }
        },
    },
    comSchema: {
        com_name: 'ElButton',
        com_support: {
            text: true,
        },
    },
};

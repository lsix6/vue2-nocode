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
                        'ui:widget': 'SetCommands',
                        items: {
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

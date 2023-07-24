/**
 * Created by Liu.Jun on 2020/10/30 17:11.
 */

const viewSchema = {
    title: 'Container',
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
                style: {
                    type: 'object',
                    title: 'style',
                    properties: {
                        width: {
                            type: 'string',
                            title: 'width',
                        },
                        padding: {
                            type: 'string',
                            title: 'padding',
                        },
                    },
                },
            },
        },
        com_props: {
            type: 'object',
            title: 'props',
            properties: {
                flex: {
                    type: 'boolean',
                    title: 'flex',
                },
                items_direction: {
                    type: 'string',
                    title: 'items dir',
                    enum: [
                        'row',
                        'row-reverse',
                        'column',
                        'column-reverse',
                    ],
                    default: 'column'
                },
            }
        }
    },
    comSchema: {
        com_name: 'nc_container',
        com_support: {
            field: true,
            binds: true,
        },
        com_slots: {
            default: [],
        },
    },
};

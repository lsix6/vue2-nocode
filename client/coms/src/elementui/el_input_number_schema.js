/**
 * Created by Liu.Jun on 2020/10/30 17:11.
 */

const viewSchema = {
    group: 'element ui',
    title: 'ElInputNumber',
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
                placeholder: {
                    type: 'string',
                    title: 'placeholder',
                },
                'controls-position': {
                    type: 'string',
                    title: 'controls position',
                },
            }
        }
    },
    comSchema: {
        com_name: 'ElInputNumber',
    },
};

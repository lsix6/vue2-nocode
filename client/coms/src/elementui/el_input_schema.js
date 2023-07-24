/**
 * Created by Liu.Jun on 2020/10/30 17:11.
 */

const viewSchema = {
    group: 'element ui',
    title: 'ElInput',
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
                        placeholder: {
                            type: 'string',
                            title: 'placeholder',
                        },
                        maxlength: {
                            type: 'number',
                            title: 'maxlength',
                        },
                    },
                },
            },
        },
        com_props: {
            type: 'object',
            title: 'props',
            properties: {
                'show-word-limit': {
                    type: 'boolean',
                    title: 'show word limit',
                },
                clearable: {
                    type: 'boolean',
                    title: 'clearable',
                },
            }
        }
    },
    comSchema: {
        com_name: 'ElInput',
        com_support: {
            field: true,
        },
    },
};

/**
 * Created by Liu.Jun on 2020/10/30 17:11.
 */

const viewSchema = {
    title: 'el Input',
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
                    },
                },
            },
        },
        com_props: {
            type: 'object',
            title: 'props',
            properties: {
                clearable: {
                    type: 'boolean',
                    title: 'clearable',
                },
            }
        }
    },
    comSchema: {
        com_name: 'el-input',
    },
};

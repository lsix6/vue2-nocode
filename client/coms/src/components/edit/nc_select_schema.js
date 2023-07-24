/**
 * Created by Liu.Jun on 2020/10/30 17:11.
 */

const viewSchema = {
    title: 'Select',
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
                        clearable: {
                            type: 'boolean',
                            title: 'clearable',
                        },
                    },
                },
            },
        },
        com_props: {
            type: 'object',
            title: 'props',
            properties: {
                data_source_name: {
                    type: 'string',
                    title: 'ds name',
                },
            }
        }
    },
    comSchema: {
        com_name: 'nc_select',
        com_support: {
            field: true,
        },
    },
};

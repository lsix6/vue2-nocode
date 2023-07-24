/**
 * Created by Liu.Jun on 2020/10/30 17:11.
 */

const viewSchema = {
    group: 'element ui',
    title: 'ElDatePicker',
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
                type: {
                    type: 'string',
                    title: 'type',
                },
                placeholder: {
                    type: 'string',
                    title: 'placeholder',
                },
                'value-format': {
                    type: 'string',
                    title: 'format',
                },
            }
        }
    },
    comSchema: {
        com_name: 'ElDatePicker',
        com_support: {
            field: true,
        },
    },
};

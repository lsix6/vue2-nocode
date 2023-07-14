
const viewSchema = {
    title: 'Form Item',
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
                prop: {
                    type: 'string',
                    title: 'prop',
                },
                label: {
                    type: 'string',
                    title: 'label',
                },
                required: {
                    type: 'boolean',
                    title: 'required',
                },
            }
        },
    },
    comSchema: {
        com_name: 'nc_form_item',
        com_slots: {
            default: [],
        },
    },
};

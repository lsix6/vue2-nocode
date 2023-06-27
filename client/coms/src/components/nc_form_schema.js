
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
            }
        }
    },
    comSchema: {
        com_name: 'nc_form',
    },
};

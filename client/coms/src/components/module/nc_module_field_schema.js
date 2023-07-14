
const viewSchema = {
    title: 'Module Field',
    type: 'object',
};

export default {
    viewSchema,
    propsSchema: {
        com_props: {
            type: 'object',
            title: 'props',
            properties: {
                field_name: {
                    type: 'string',
                    title: 'name',
                },
                field_label: {
                    type: 'string',
                    title: 'label',
                },
            }
        },
    },
    comSchema: {
        com_name: 'nc_module_field',
        com_slots: {
            in_list: [],
            in_search: [],
            in_form: [],
        },
    },
};

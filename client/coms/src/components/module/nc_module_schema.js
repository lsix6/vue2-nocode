
const viewSchema = {
    title: 'Module',
    type: 'object',
};

export default {
    viewSchema,
    propsSchema: {
        com_props: {
            type: 'object',
            title: 'props',
            properties: {
                module_name: {
                    type: 'string',
                    title: 'name',
                },
                module_label: {
                    type: 'string',
                    title: 'label',
                },
            }
        },
    },
    comSchema: {
        com_name: 'nc_module',
        com_slots: {
            default: [],
        },
    },
};

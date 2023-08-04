
const viewSchema = {
    title: 'Switch in show',
    type: 'object',
};

export default {
    viewSchema,
    propsSchema: {
        com_props: {
            type: 'object',
            title: 'props',
            properties: {
                submit_data: {
                    type: 'object',
                    title: 'submit',
                    properties: {
                        api: {
                            type: 'object',
                            title: 'api',
                            properties: {
                                url: {
                                    type: 'string',
                                    title: 'url',
                                },
                                method: {
                                    type: 'string',
                                    title: 'method',
                                    default: 'POST',
                                },
                            },
                        },
                    },
                },
            }
        },
    },
    comSchema: {
        com_name: 'nc_switch_in_show',
    },
};

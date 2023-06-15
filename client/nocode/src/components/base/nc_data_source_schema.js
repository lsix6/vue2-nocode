/**
 * Created by Liu.Jun on 2020/10/30 17:11.
 */

const viewSchema = {
    title: 'Data Sources',
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
                data_sources: {
                    title: 'Date Sources',
                    type: 'array',
                    minItems: 0,
                    'ui:showIndexNumber': true,
                    items: {
                        title: 'Data Source',
                        type: 'object',
                        properties: {
                            name: {
                                title: 'name',
                                type: 'string',
                            },
                            api: {
                                type: 'object',
                                title: 'api',
                                properties: {
                                    url: {
                                        title: 'url',
                                        type: 'string'
                                    },
                                    method: {
                                        type: 'string',
                                        title: 'method',
                                        enum: [
                                            'GET',
                                        ],
                                        default: 'GET'
                                    },
                                },
                            },
                            enum: {
                                title: 'enum',
                                type: 'array',
                                minItems: 0,
                                items: {
                                    type: 'string',
                                }
                            },
                            obj: {
                                title: 'object',
                                type: 'string'
                            },
                        }
                    }
                },
            }
        }
    },
    comSchema: {
        com_name: 'nc_data_source',
    },
};

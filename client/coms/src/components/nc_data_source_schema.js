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
                show_children_after_got_data: {
                    type: 'boolean',
                    title: 'after got',
                    default: true,
                },
                data_sources_title: {
                    title: 'Data Source',
                    type: 'object',
                },
                data_sources: {
                    type: 'array',
                    minItems: 0,
                    'ui:showIndexNumber': true,
                    items: {
                        type: 'object',
                        'ui:field': 'SetDataSource',
                        properties: {
                            name: {
                                type: 'string',
                            },
                            type: {
                                type: 'string',
                            },
                            api: {
                                type: 'object',
                                properties: {
                                    url: {
                                        type: 'string',
                                    },
                                    fetch_params: {
                                        type: 'array',
                                    },
                                },
                            },
                        },
                    }
                },
            }
        }
    },
    comSchema: {
        com_name: 'nc_data_source',
        com_flex: true,
        com_slots: {
            default: [],
        },
        com_methods: {
            refresh: {
                params_schema: {
                    type: 'object',
                    properties: {
                        ds_name: {
                            type: 'string',
                            title: 'ds name',
                        },
                    },
                },
            },
            refreshAll: {
            },
        },
    },
};

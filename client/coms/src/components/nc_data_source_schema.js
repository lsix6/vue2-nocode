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
                    title: 'Data Sources',
                    type: 'object',
                },
                data_sources: {
                    type: 'array',
                    minItems: 0,
                    'ui:showIndexNumber': true,
                    'ui:widget': 'SetDataSources',
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
                                    fetch_params: {
                                        type: 'array',
                                        title: 'params',
                                        items: {
                                            type: 'object',
                                            title: 'param',
                                            properties: {
                                                params_source: {
                                                    type: 'string',
                                                    title: 'source',
                                                },
                                                params_fields: {
                                                    type: 'array',
                                                    title: 'fields',
                                                    items: {
                                                        type: 'string',
                                                    },
                                                },
                                                params_com_ref: {
                                                    type: 'string',
                                                    title: 'com ref',
                                                },
                                                params_com_method_name: {
                                                    type: 'string',
                                                    title: 'method name',
                                                },
                                                params_default_value: {
                                                    type: 'string',
                                                    title: 'default value',
                                                },
                                                params_set_name: {
                                                    type: 'string',
                                                    title: 'set name',
                                                },
                                            },
                                        },
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
        com_flex: true,
        com_slots: {
            default: [],
        },
    },
};

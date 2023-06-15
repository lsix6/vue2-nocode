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
        options: {
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
                        title: 'api',
                        type: 'string'
                    },
                    enum: {
                        title: 'enum',
                        type: 'array',
                        minItems: 0,
                        items: {
                            type: 'string',
                            uniqueItems: true,
                        }
                    },
                    obj: {
                        title: 'object',
                        type: 'string'
                    },
                }
            }
        }
    },
    comSchema: {
        com_name: 'nc_data_source',
    },
};

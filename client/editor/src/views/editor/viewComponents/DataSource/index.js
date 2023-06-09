/**
 * Created by Liu.Jun on 2020/10/30 17:11.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: 'Object',
    type: 'object',
    required: [],
    properties: {},
    'ui:order': []
};

export default {
    viewSchema,
    propsSchema: genSchema({
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
                        }
                    },
                    obj: {
                        title: 'object',
                        type: 'string'
                    },
                }
            }
        }
    }, 'object'),
    comSchema: {
        com_name: 'e_nc_data_source',
    },
};

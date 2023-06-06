/**
 * Created by Liu.Jun on 2020/10/30 17:11.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: 'Enum',
    type: 'object',
    required: [],
    properties: {},
    'ui:order': []
};

export default {
    viewSchema,
    propsSchema: genSchema({
        options: {
            type: 'object',
            title: '选项',
            required: [],
            properties: {
                uiOptions: {
                    type: 'object',
                    properties: {
                        data_source_name: {
                            type: 'string',
                            title: 'data source',
                        },
                    }
                }
            }
        },

    }, 'object'),
    comSchema: {
        com_name: 'e_nc_enum',
    },
};

/**
 * Created by Liu.Jun on 2020/10/30 17:11.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: 'Table Column',
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
                        label: {
                            type: 'string',
                            title: 'label',
                        },
                        prop: {
                            type: 'string',
                            title: 'prop',
                        },
                    }
                }
            }
        },

    }, 'object'),
    comSchema: {
        com_name: 'e_nc_table_column',
    },
};

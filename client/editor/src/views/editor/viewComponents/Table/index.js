/**
 * Created by Liu.Jun on 2020/10/30 17:11.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: 'Table',
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
                        bind: {
                            type: 'string',
                            title: 'bind',
                        },
                    }
                }
            }
        },
    }, 'object'),
    comSchema: {
        com_name: 'e_nc_table',
    },
};

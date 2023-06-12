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
                        columns: {
                            title: 'columns',
                            type: 'array',
                            minItems: 0,
                            'ui:showIndexNumber': true,
                            items: {
                                title: 'column',
                                type: 'object',
                                properties: {
                                    label: {
                                        title: 'label',
                                        type: 'string',
                                    },
                                    prop: {
                                        title: 'prop',
                                        type: 'string'
                                    },
                                    com: {
                                        title: 'com',
                                        type: 'string'
                                    },
                                }
                            }
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

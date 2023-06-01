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
    propsSchema: genSchema({}, 'object'),
    comSchema: {
        com_name: 'nc_data',
        com_props: {
            data_sources: {
                _ds_aa: {
                    fetch_params: [
                        {
                            enumMap: {
                                1: 'a',
                                2: 'b',
                            },
                            params_fields: [
                                'enumMap',
                            ],
                        }
                    ],
                },
            },
        },
    },
};

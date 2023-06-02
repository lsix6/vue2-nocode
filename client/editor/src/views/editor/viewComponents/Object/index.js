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
                __ds_gender: {
                    fetch_params: [
                        {
                            enumMap: {
                                1: "男",
                                2: "女"
                            },
                            params_fields: [
                                "enumMap"
                            ]
                        }
                    ]
                },
                "__ds_huji": {
                    "api": {
                        "url": "user/huji",
                        "method": "GET"
                    }
                },
                __ds_listPageData: {
                    api: {
                        url: `user/list`,
                        method: 'GET',
                    },
                    fetch_params: [
                        {
                            params_source: 'com_ref',
                            params_com_ref: 'formSearch',
                            params_set_name: 'search',
                        },
                        {
                            params_source: 'com_ref',
                            params_com_ref: 'list',
                            params_com_method_name: 'getSort',
                            params_set_name: 'sort',
                        },
                        {
                            params_source: 'com_ref',
                            params_com_ref: 'pagination',
                            params_set_name: 'page',
                            params_default_value: {
                                pageIndex: 1,
                                pageSize: 20,
                            },
                        },
                    ]
                },
            },
        },
    },
};

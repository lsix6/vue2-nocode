/**
 * Created by Liu.Jun on 2020/12/10 15:41.
 */


import baseRadio from './index';

const viewSchema = {
    title: '单选(Select)',
    type: 'string',
    'ui:widget': 'SelectWidget'
};

export default {
    viewSchema,
    propsSchema: baseRadio.propsSchema,
    comSchema: {
        com_name: 'nc_select',
        com_props: {
            data_source_name: '__ds_gender',
        },
    },
};

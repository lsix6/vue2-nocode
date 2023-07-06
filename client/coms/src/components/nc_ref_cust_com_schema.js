/**
 * Created by Liu.Jun on 2020/10/30 17:11.
 */

const viewSchema = {
    title: 'Cust Com',
    type: 'object',
};

export default {
    viewSchema,
    propsSchema: {
        com_props: {
            type: 'object',
            title: 'props',
            properties: {
                ref_com_id: {
                    type: 'string',
                    title: 'ref com',
                    'ui:widget': 'SelectRefCom',
                },
            }
        },
    },
    comSchema: {
        com_name: 'nc_ref_cust_com',
    },
};

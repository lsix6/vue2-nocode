/**
 * Created by Liu.Jun on 2020/10/30 17:11.
 */

const viewSchema = {
    group: 'element ui',
    title: 'ElSwitch',
    type: 'object',
};

export default {
    viewSchema,
    propsSchema: {
        com_props: {
            type: 'object',
            title: 'props',
            properties: {
            }
        }
    },
    comSchema: {
        com_name: 'ElSwitch',
        com_support: {
            field: true,
        },
    },
};

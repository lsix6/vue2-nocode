/**
 * Created by Liu.Jun on 2020/10/30 17:11.
 */

const viewSchema = {
    group: 'element ui',
    title: 'ElRate',
    type: 'object',
};

export default {
    viewSchema,
    propsSchema: {
        com_props: {
            type: 'object',
            title: 'props',
            properties: {
                disabled: {
                    type: 'boolean',
                    title: 'disabled',
                },
            }
        }
    },
    comSchema: {
        com_name: 'ElRate',
        com_support: {
            field: true,
        },
    },
};

/**
 * Created by Liu.Jun on 2020/10/30 17:11.
 */

const viewSchema = {
    title: 'Text',
    type: 'object',
    required: [],
    properties: {},
    'ui:order': []
};

export default {
    viewSchema,
    propsSchema: {
        com_props: {
            type: 'object',
            title: 'props',
            properties: {
                tooltip: {
                    type: 'boolean',
                    title: 'tooltip',
                },
            }
        }
    },
    comSchema: {
        com_name: 'nc_text',
    },
};

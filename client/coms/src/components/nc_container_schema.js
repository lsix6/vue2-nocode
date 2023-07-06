/**
 * Created by Liu.Jun on 2020/10/30 17:11.
 */

const viewSchema = {
    title: 'Container',
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
                items_direction: {
                    type: 'string',
                    title: 'items dir',
                    enum: [
                        'row',
                        'row-reverse',
                        'column',
                        'column-reverse',
                    ],
                    default: 'column'
                },
            }
        }
    },
    comSchema: {
        com_name: 'nc_container',
        com_slots: {
            default: [],
        },
    },
};

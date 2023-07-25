/**
 * Created by Liu.Jun on 2020/10/30 17:11.
 */

const viewSchema = {
    title: 'Array',
    type: 'object',
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
        com_name: 'nc_array',
        com_flex: true,
        com_support: {
            field: true,
        },
        com_slots: {
            default: [],
        },
    },
};

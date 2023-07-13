/**
 * Created by Liu.Jun on 2020/10/30 17:11.
 */

const viewSchema = {
    title: 'Enum Color',
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
                data_source_name: {
                    type: 'string',
                    title: 'ds name',
                },
            }
        }
    },
    comSchema: {
        com_name: 'nc_enum_color',
    },
};

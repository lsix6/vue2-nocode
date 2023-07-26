/**
 * Created by Liu.Jun on 2020/10/30 17:11.
 */

const viewSchema = {
    title: 'Data Sources',
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
                show_children_after_got_data: {
                    type: 'boolean',
                    title: 'after got',
                    default: true,
                },
                data_sources_title: {
                    title: 'Data Sources',
                    type: 'object',
                },
                data_sources: {
                    type: 'array',
                    minItems: 0,
                    'ui:showIndexNumber': true,
                    'ui:widget': 'SetDataSources',
                    items: {
                    }
                },
            }
        }
    },
    comSchema: {
        com_name: 'nc_data_source',
        com_flex: true,
        com_slots: {
            default: [],
        },
    },
};

/**
 * Created by Liu.Jun on 2020/10/30 17:11.
 */

const viewSchema = {
    title: 'MenuNavigator',
    type: 'object',
};

export default {
    viewSchema,
    propsSchema: {
        com_props: {
            type: 'object',
            title: 'props',
            properties: {
                base_path: {
                    type: 'string',
                    title: 'base path',
                },
            }
        }
    },
    comSchema: {
        com_name: 'MenuNavigator',
        com_flex: true,
    },
};

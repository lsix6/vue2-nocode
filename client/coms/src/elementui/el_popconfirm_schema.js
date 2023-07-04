/**
 * Created by Liu.Jun on 2020/10/30 17:11.
 */

const viewSchema = {
    title: 'el Popconfirm',
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
                title: {
                    type: 'string',
                    title: 'title',
                    default: '确认删除',
                },
                message: {
                    type: 'string',
                    title: 'message',
                    default: '删除后不可恢复，确认删除吗？',
                },
            }
        }
    },
    comSchema: {
        com_name: 'el-popconfirm',
    },
};

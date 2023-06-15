/**
 * Created by Liu.Jun on 2020/10/26 18:24.
 */

function genBaseVal() {
    return {
        title: 'base',
        type: 'object',
        properties: {
            com_field: {
                type: 'string',
                title: 'field',
            },
            com_text: {
                type: 'string',
                title: 'text',
            },
            schemaOptions: {
                type: 'object',
                properties: {
                }
            },
            uiOptions: {
                type: 'object',
                properties: {
                }
            }
        }
    };
}

export default (schema) => ({
    type: 'object',
    required: ['property'],
    properties: {
        property: {
            title: '属性名',
            type: 'string',
            'ui:placeholder': '请输入属性名',
            'err:required': '属性名必填'
        },
        baseValue: genBaseVal(),
        ...schema
    }
});

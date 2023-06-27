/**
 * Created by Liu.Jun on 2020/10/26 18:24.
 */

function genBaseVal() {
    return {
        title: 'base',
        type: 'object',
        properties: {
            com_ref: {
                type: 'string',
                title: 'ref name',
            },
            com_field: {
                type: 'object',
                properties: {
                    field_name: {
                        type: 'string',
                        title: 'field name',
                    },
                },
            },
            com_text: {
                type: 'string',
                title: 'text',
            },
            com_binds: {
                title: 'binds',
                type: 'array',
                minItems: 0,
                'ui:showIndexNumber': true,
                items: {
                    type: 'object',
                    title: 'bind',
                    properties: {
                        prop_name: {
                            type: 'string',
                            title: 'prop',
                        },
                        field_name: {
                            type: 'string',
                            title: 'field',
                        },
                    },
                },
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

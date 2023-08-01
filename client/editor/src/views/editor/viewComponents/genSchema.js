/**
 * Created by Liu.Jun on 2020/10/26 18:24.
 */

function genBaseVal(schema) {
    const ret = {
        type: 'object',
        properties: {
            com_ref: {
                type: 'string',
                title: 'ref name',
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
    const comSupport = schema?.comSchema?.com_support
    if (comSupport) {
        if (comSupport.text) {
            ret.properties.com_text = {
                type: 'string',
                title: 'text',
            }
        }
        if (comSupport.field) {
            ret.properties.com_field = {
                type: 'object',
                title: 'field',
                properties: {
                    field_name: {
                        type: 'string',
                        title: 'name',
                        'ui:widget': 'SelectField',
                    },
                    field_default_value: {
                        type: 'string',
                        title: 'default',
                    },
                },
            }
        }
        if (comSupport.binds) {
            ret.properties.com_binds_title = {
                type: 'object',
                title: 'binds',
            }
            ret.properties.com_binds = {
                type: 'array',
                title: 'items',
                minItems: 0,
                'ui:field': 'SetBinds',
                items: {
                },
            }
            if (comSupport.binds_props) {
                ret.properties.com_binds['ui:prop_names'] = comSupport.binds_props
            }
        }
    }
    //
    return ret
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
        baseValue: genBaseVal(schema),
        ...schema.propsSchema
    }
});

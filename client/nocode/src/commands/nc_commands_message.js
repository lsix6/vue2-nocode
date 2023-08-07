import { msg_box } from "../utils/nc_msg_box"
import { get_params, params_desc_to_def } from "../utils/nc_params"
import _ from 'lodash'

const message = async function (com, command, cmd_data) {
    console.log('[nc_commands_message] message, cmd_data: ', cmd_data)
    //
    const msg = command.cmd_params?.msg || {}
    const msg_params = [{
        param_name: 'options',
        ...msg.text,
    }]
    const paramsDef = params_desc_to_def(msg_params)
    const msgParams = get_params(com, paramsDef, cmd_data)
    msg_box[msg.type](msgParams)
    return true
}

const message_schema = {
    type: 'object',
    properties: {
        msg: {
            type: 'object',
            properties: {
                type: {
                    type: 'string',
                    title: 'type',
                    enum: [
                        'success',
                        'error',
                        'info',
                        'warning',
                    ],
                    default: 'success',
                },
                text: {
                    type: 'object',
                    title: 'text',
                    'ui:field': 'SetParam',
                },
            },
        },
    },
}

export default {
    message: {
        func: message,
        schema: message_schema,
    },
}

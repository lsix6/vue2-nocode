import { register_commands } from "./nc_commands_base"
import { msg_box } from "../utils/nc_msg_box"
import { get_params, params_desc_to_def } from "../utils/nc_params"
import _ from 'lodash'

const commands = {

    'message': async function (com, command, cmd_data) {
        console.log('[nc_commands_message] message, cmd_data: ', cmd_data)
        //
        const msg = command.cmd_params?.msg || {}
        const paramsDef = params_desc_to_def(msg.msg_params)
        const msgParams = get_params(com, paramsDef, cmd_data)
        msg_box[msg.type](msgParams)
        return true
    }

}

register_commands(commands)
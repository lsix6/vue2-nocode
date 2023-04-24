import { register_commands } from "./nc_commands_base"
import { msg_box } from "../utils/nc_msg_box"
import { get_params } from "../utils/nc_params"
import _ from 'lodash'

const commands = {

    'message': async function (com, command, cmd_data) {
        console.log('[nc_commands_message] message, cmd_data: ', cmd_data)
        //
        const cmd_params = command.cmd_params
        let msg_params = _.cloneDeep(cmd_params.cmd_msg_params || {})
        if (msg_params.options_params) {
            msg_params.options = get_params(com, msg_params.options_params, cmd_data)
        }
        msg_box[cmd_params.cmd_msg_type](msg_params)
        return true
    }

}

register_commands(commands)
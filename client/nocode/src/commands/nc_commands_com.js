import { get_params } from "../utils/nc_params"
import { get_com_ref } from "../utils/nc_refs"
import { register_commands } from "./nc_commands_base"

const commands = {

    'call_com_method': async function (com, command, cmd_data) {
        const ref = get_com_ref(command.cmd_params.com_ref)
        if (ref) {
            let methodParams = get_params(com, command.cmd_params.com_method_params, cmd_data)
            if (command.cmd_params && command.cmd_params.com_method_param_field) {
                methodParams = methodParams[command.cmd_params.com_method_param_field]
            }
            return ref[command.cmd_params.com_method_name](methodParams)
        } else {
            console.error('[nc_commands_com] execute_com_method, not found com ref', command.cmd_params.com_ref)
            return false
        }
    }

}

register_commands(commands)
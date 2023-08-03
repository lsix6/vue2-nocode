import _ from 'lodash'
import { get_params, params_desc_to_def } from "../utils/nc_params"
import { register_commands } from "./nc_commands_base"

const commands = {

    'call_com_method': async function (com, command, cmd_data) {
        const callParams = command.cmd_params.call
        const ref = com.com_root.refsMgr.get_com_ref(callParams.com_ref)
        if (ref) {
            let methodParams = callParams.com_method_params
            if (_.isArray(methodParams)) {
                const paramsDef = params_desc_to_def(callParams.com_method_params)
                methodParams = get_params(com, paramsDef, cmd_data)
            }
            //
            if (callParams && callParams.com_method_param_field) {
                methodParams = methodParams[callParams.com_method_param_field]
            }
            return ref[callParams.com_method_name](methodParams)
        } else {
            console.error('[nc_commands_com] execute_com_method, not found com ref', callParams.com_ref)
            return false
        }
    }

}

register_commands(commands)
import { request_api } from "../utils/nc_request"
import { get_params, params_desc_to_def } from "../utils/nc_params"
import { register_commands } from "./nc_commands_base"

const commands = {

    'request_api': async function (com, command) {
        //
        return new Promise((resolve, reject) => {
            const paramsDef = params_desc_to_def(command.cmd_params?.api?.request_params)
            const requestParams = get_params(com, paramsDef)
            request_api(command.cmd_params.api, requestParams).then(data => {
                console.log(`[nc_commands_request] request_api('${command.cmd_params.api}') return`, data)
                if (com.com_data && data) {
                    Object.assign(com.com_data, data)
                }
                //
                resolve(true)
            }).catch(err => {
                reject(err)
            })
        })
    }

}

register_commands(commands)
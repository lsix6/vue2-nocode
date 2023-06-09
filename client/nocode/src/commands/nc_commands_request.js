import { request_api } from "../utils/nc_request"
import { get_params } from "../utils/nc_params"
import { register_commands } from "./nc_commands_base"

const commands = {

    'request_api': async function (com, command) {
        //
        return new Promise((resolve, reject) => {
            const requestParams = get_params(com, command.cmd_params.request_params)
            request_api(command.cmd_params.api, requestParams).then(data => {
                console.log(`[nc_commands_request] request_api('${command.cmd_params.api}') return`, data)
                if (data) {
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
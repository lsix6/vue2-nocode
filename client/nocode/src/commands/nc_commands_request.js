import { request_api } from "../utils/nc_request"
import { get_params, params_desc_to_def } from "../utils/nc_params"

const request_api_func = async function (com, command) {
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

const request_api_schema = {
    type: 'object',
    properties: {
        api: {
            type: 'object',
            properties: {
                url: {
                    type: 'string',
                    title: 'url',
                },
                method: {
                    type: 'string',
                    title: 'method',
                    enum: [
                        'GET',
                        'POST',
                        'DELETE',
                    ],
                    default: 'GET',
                },
                request_params: {
                    type: 'array',
                    title: 'params',
                    minItems: 0,
                    'ui:widget': 'SetParams',
                    items: {},
                },
            },
        },
    },
}

export default {
    request_api: {
        func: request_api_func,
        schema: request_api_schema,
    },
}

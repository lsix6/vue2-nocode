
import { nc_command_functions } from "./nc_commands_base"

function clone(obj) {
    if (obj) {
        return JSON.parse(JSON.stringify(obj))
    }
    return obj
}

const execute_command = async (com, command, cmd_data) => {
    console.log('[nc_commands] execute_command, cmd_name, command, cmd_data, com_params:', command.cmd_name, clone(command), clone(cmd_data), clone(com.com_params))
    //
    const cmd_func = nc_command_functions[command.cmd_name]
    if (cmd_func) {
        if (command.cmd_delay !== undefined) {
            console.log('[nc_commands] execute_command, delay call:', command.cmd_name, command.cmd_delay)
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(cmd_func(com, command, cmd_data))
                }, command.cmd_delay);
            })
        } else {
            return cmd_func(com, command, cmd_data)
        }
    } else {
        console.error('[nc_commands] not found command', command.cmd_name)
    }
}

export const execute_commands = async (com, commands, cmd_data) => {
    try {
        let ret = true
        for (let i = 0; i < commands.length; i++) {
            const command = commands[i]
            const cmd_if = command.cmd_if
            if (cmd_if) {
                // 检查命令的执行条件
                // console.log('[nc_commands] cmd_if, ', cmd_if.field_value, cmd_data[cmd_if.field_name])
                if (cmd_if.field_value !== cmd_data[cmd_if.field_name]) {
                    // 不符合命令的条件跳过执行
                    continue
                }
            }
            const cmdRet = await execute_command(com, command, cmd_data).then(async result => {
                console.log('[nc_commands] execute_command.then, result', result)
                //
                if (result !== false && command.cmd_params && command.cmd_params.commands) {
                    return await execute_commands(com, command.cmd_params.commands, {...cmd_data, ...result})
                }
                return result
            }).catch(async err => {
                console.log('[nc_commands] execute_command.catch, err: ', err)
                //
                if (command.cmd_params && command.cmd_params.exception_commands) {
                    return await execute_commands(com, command.cmd_params.exception_commands, {...cmd_data, ...err})
                }
            })
            //
            if (cmdRet === false) {
                ret = false
            }
        }
        //
        return ret
    } catch (e) {
        console.error('[nc_commands] execute_commands', e)
    }
}

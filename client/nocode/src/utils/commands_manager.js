import _ from 'lodash'
import { deepFreeze } from "@/utils/nc_utils"

export class CommandsManager {

    nc_commands = {}

    register_commands(commands) {
        for (let cmdName in commands) {
            this.nc_commands[cmdName] = deepFreeze(commands[cmdName])
        }
    }

    get_commands() {
        return { ...this.nc_commands }
    }

    execute_command = async (com, command, cmd_data) => {
        console.log('[commands_manager] execute_command, cmd_name, command, cmd_data, com_data:', command.cmd_name, _.cloneDeep(command), _.cloneDeep(cmd_data), _.cloneDeep(com.com_data))
        //
        const cmd_func = this.nc_commands[command.cmd_name]?.func
        if (cmd_func) {
            if (command.cmd_delay > 0) {
                console.log('[commands_manager] execute_command, delay call:', command.cmd_name, command.cmd_delay)
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(cmd_func(com, command, cmd_data))
                    }, command.cmd_delay);
                })
            } else {
                return cmd_func(com, command, cmd_data)
            }
        } else {
            console.error('[commands_manager] not found command', command.cmd_name)
        }
    }

    execute_commands = async (com, commands, cmd_data) => {
        // console.log('[commands_manager] execute_commands', commands)
        try {
            let ret = true
            for (let i = 0; i < commands.length; i++) {
                const command = commands[i]
                const cmd_if = command.cmd_if
                if (cmd_if) {
                    // 检查命令的执行条件
                    // console.log('[commands_manager] cmd_if, ', cmd_if.field_value, cmd_data[cmd_if.field_name])
                    if (cmd_if.field_value !== cmd_data[cmd_if.field_name]) {
                        // 不符合命令的条件跳过执行
                        continue
                    }
                }
                const cmdRet = await this.execute_command(com, command, cmd_data).then(async result => {
                    console.log('[commands_manager] execute_command.then, result', result)
                    //
                    if (result !== false && command.succeeded_commands) {
                        return await this.execute_commands(com, command.succeeded_commands, { ...cmd_data, ...result })
                    }
                    return result
                }).catch(async err => {
                    console.log('[commands_manager] execute_command.catch, err: ', err)
                    //
                    if (command.failed_commands) {
                        return await this.execute_commands(com, command.failed_commands, { ...cmd_data, ...err })
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
            console.error('[commands_manager] execute_commands', e)
        }
    }

}
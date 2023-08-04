import nc_commands_request from './nc_commands_request'
import nc_commands_route from './nc_commands_route'
import nc_commands_com from './nc_commands_com'
import nc_commands_message from './nc_commands_message'

export const init_commands = () => {
    const cmdsMgr = window.nocode.commandsManager
    //
    cmdsMgr.register_commands(nc_commands_request)
    cmdsMgr.register_commands(nc_commands_route)
    cmdsMgr.register_commands(nc_commands_com)
    cmdsMgr.register_commands(nc_commands_message)
}
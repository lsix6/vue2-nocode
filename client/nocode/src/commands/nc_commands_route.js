
import { get_params } from "../utils/nc_params"
import { register_commands } from "./nc_commands_base"

const obj2QueryString = (obj) => {
    let  s = ''
    for(let k in obj) {
        if (s) {
            s += '&'
        }
        s += `${k}=${obj[k]}`
    }
    return s
}

const commands = {

    'push_route': async function (com, command, cmd_data) {
        console.log('[nc_commands_route] push_route', command, cmd_data)
        let path = command.cmd_params.path
        if (command.cmd_params.route_params) {
            const routeParams = get_params(com, command.cmd_params.route_params, cmd_data)
            path += '?' + obj2QueryString(routeParams)
        }
        com.$router.push(path)
        return true
    },
    'go_back': async function (com, command) {
        com.$router.go(-1)
        return true
    },
    'open_new_window': async function (com, command, cmd_data) {
        console.log('[nc_commands_route] open_new_window', command, cmd_data)
        let path = command.cmd_params.path
        let routeParams = null
        if (command.cmd_params.open_params) {
            routeParams = get_params(com, command.cmd_params.open_params, cmd_data)
        }
        const page = com.$router.resolve({
            path: path,
            query: routeParams,
        })
        let href = page.href
        if (command.cmd_params.root_path) {
            href = command.cmd_params.root_path
            const idx = page.href.indexOf('?')
            if (idx >= 0) {
                href += page.href.substring(idx)
            }
        }
        console.log('[nc_commands_route] open_new_window, open href:', href)
        window.open(href, command.cmd_params.open_target)
        return true
    },

}

register_commands(commands)
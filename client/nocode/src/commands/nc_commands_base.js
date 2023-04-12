export const nc_command_functions = {}

export const register_commands = (cmd_funcs) => {
    for (let k in cmd_funcs) {
        nc_command_functions[k] = cmd_funcs[k]
    }
}

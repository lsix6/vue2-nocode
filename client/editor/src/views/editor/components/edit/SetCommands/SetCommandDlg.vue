<template>
    <el-dialog title="设置命令" :visible.sync="dialogVisible" @close="onClose">
        <div v-if="dialogVisible" class="set-command-dlg-frame">
            <el-form size="small" label-width="180px" :model="cmd" onsubmit="return false">
                <el-form-item label="delay">
                    <el-input-number v-model="cmd.cmd_delay" />
                </el-form-item>
                <el-form-item label="name">
                    <el-select v-model="cmd.cmd_name" filterable allow-create clearable>
                        <el-option v-for="name in cmd_names" :key="name" :label="name" :value="name" />
                    </el-select>
                </el-form-item>
                <VueJsonFrom v-if="!!selectedCommandSchema" v-model="cmd.cmd_params" class=""
                    :schema="selectedCommandSchema" :form-props="{
                        labelPosition: 'right',
                        labelWidth: '180px',
                        size: 'small',
                    }" :form-footer="{ show: false }">
                </VueJsonFrom>
                <SetCommand_request_api v-if="cmd.cmd_name === 'request_api'" v-model="cmd.cmd_params" />
                <SetCommand_message v-else-if="cmd.cmd_name === 'message'" v-model="cmd.cmd_params" />
                <SetCommand_push_route v-else-if="cmd.cmd_name === 'push_route'" v-model="cmd.cmd_params" />
                <el-form-item label="succeeded commands">
                    <SetCommands v-model="cmd.succeeded_commands" />
                </el-form-item>
                <el-form-item label="failed commands">
                    <SetCommands v-model="cmd.failed_commands" />
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
</template>

<script>
import VueJsonFrom from '@lljj/vue-json-schema-form';

import SetCommands from './SetCommands.vue'
import SetCommand_request_api from './SetCommand_request_api.vue'
import SetCommand_message from './SetCommand_message.vue'
import SetCommand_push_route from './SetCommand_push_route.vue'
import SetCommand_call_com_method from './SetCommand_call_com_method.vue'
window.Vue.component('SetCommand_call_com_method', SetCommand_call_com_method)

export default {
    install(Vue) {
        Vue.component('SetCommand', this)
    },
    components: {
        VueJsonFrom,
        SetCommands,
        SetCommand_request_api,
        SetCommand_message,
        SetCommand_push_route,
    },
    props: {
    },
    data() {
        return {
            dialogVisible: false,
            cmd: {},
        }
    },
    computed: {
        commands() {
            return window.nocode.commandsManager.get_commands()
        },
        cmd_names() {
            return Object.keys(this.commands)
        },
        selectedCommandSchema() {
            return this.commands[this.cmd.cmd_name]?.schema
        },
    },
    mounted() {
    },
    methods: {
        open(cmd) {
            console.log('[SetCommandDlg] open', cmd)
            this.cmd = cmd
            this.dialogVisible = true
        },
        onClose() {
            console.log('[SetCommandDlg] onClose')
            //
            this.$emit('close')
        },
    },
}
</script>

<style lang="scss" scoped>
.set-command-dlg-frame {
    height: 550px;
    overflow: auto;
    display: flex;
    flex-direction: column;

    .content {
        padding: 20px;

    }
}
</style>

<template>
    <el-dialog title="设置命令" :visible.sync="dialogVisible" @close="onClose">
        <div v-if="dialogVisible" class="set-command-dlg-frame">
            <el-form size="small" label-width="180px" :model="cmd" onsubmit="return false">
                <el-form-item label="delay：">
                    <el-input-number v-model="cmd.cmd_delay" />
                </el-form-item>
                <el-form-item label="name：">
                    <el-select v-model="cmd.cmd_name" @change="onCmdChange" filterable allow-create clearable>
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
                <el-form-item label="succeeded commands：">
                    <SetCommands v-model="cmd.succeeded_commands" />
                </el-form-item>
                <el-form-item label="failed commands：">
                    <SetCommands v-model="cmd.failed_commands" />
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
</template>

<script>
// import _ from 'lodash'
import VueJsonFrom from '@lljj/vue-json-schema-form';

import SetCommands from './SetCommands.vue'
import SetCommand_call_com_method from './SetCommand_call_com_method.vue'
window.Vue.component('SetCommand_call_com_method', SetCommand_call_com_method)

export default {
    install(Vue) {
        Vue.component('SetCommand', this)
    },
    components: {
        VueJsonFrom,
        SetCommands,
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
            // console.log('selectedCommandSchema, cmd', _.cloneDeep(this.cmd))
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
        onCmdChange() {
            // console.log('[SetCommandDlg] onCmdChange')
            // 命令改变的时候清除一下命令的参数，不然参数里的数组类型的属性会自动被转成对象类型的
            this.cmd.cmd_params = {}
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

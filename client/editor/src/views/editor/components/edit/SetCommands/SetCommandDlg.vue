<template>
    <el-dialog title="设置命令" :visible.sync="dialogVisible" @close="close">
        <div v-if="dialogVisible" class="set-command-dlg-frame">
            <el-form size="small" label-width="80px" :model="cmd" onsubmit="return false">
                <el-form-item label="name">
                    <el-select v-model="cmd.cmd_name" filterable allow-create clearable>
                        <el-option v-for="name in cmd_names" :key="name" :label="name" :value="name" />
                    </el-select>
                </el-form-item>
                <SetCommand_request_api v-if="cmd.cmd_name === 'request_api'" v-model="cmd.cmd_params" />
            </el-form>
        </div>
    </el-dialog>
</template>

<script>
import SetCommand_request_api from './SetCommand_request_api.vue'

export default {
    install(Vue) {
        Vue.component('SetCommand', this)
    },
    components: {
        SetCommand_request_api,
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
        cmd_names() {
            return [
                'request_api',
                'call_com_method',
                'push_route',
                'go_back',
                'message',
            ]
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
        close() {
            console.log('[SetCommandDlg] close')
            this.dialogVisible = false
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

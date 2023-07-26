<template>
    <el-dialog title="设置数据源" :visible.sync="dialogVisible" @close="close">
        <div v-if="dialogVisible" class="set-data-source-dlg-frame">
            <el-radio-group v-model="ds.type" @input="onRadioInput">
                <el-radio label="api">api</el-radio>
                <el-radio label="obj">json</el-radio>
            </el-radio-group>
            <div class="flex-container content">
                <div v-if="ds.type === 'api'">
                    <el-form size="small" label-width="80px" :model="ds.api" onsubmit="return false">
                        <el-form-item label="url">
                            <el-input v-model="ds.api.url" />
                        </el-form-item>
                        <el-form-item label="params">
                            <SetParams />
                        </el-form-item>
                    </el-form>
                </div>
                <div v-else-if="ds.type === 'obj'" class="flex-container">
                    <vueJsonTool class="flex-container set-data-source-dlg-json-editor" v-model="ds.obj" :showBtns="false"
                        mode="code" :expandedOnStart="true" />
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import vueJsonTool from 'vue-json-tool'
import SetParams from './SetParams.vue'

export default {
    install(Vue) {
        Vue.component('SetDataSourceDlg', this)
    },
    components: {
        vueJsonTool,
        SetParams,
    },
    props: {
    },
    data() {
        return {
            dialogVisible: false,
            ds: {},
        }
    },
    mounted() {
    },
    methods: {
        open(ds) {
            console.log('[SetDataSourceDlg] open', ds)
            if (!ds.api) {
                this.$set(ds, 'api', {
                    url: '',
                    fetch_params: [],
                })
            }
            this.ds = ds
            this.dialogVisible = true
        },
        close() {
            console.log('[SetDataSourceDlg] close')
            this.dialogVisible = false
        },
        onRadioInput() {
            console.log('[SetDataSourceDlg] onRadioInput', this.ds.type)
        },
    },
}
</script>

<style lang="scss" scoped>
.set-data-source-dlg-frame {
    height: 550px;
    overflow: auto;
    display: flex;
    flex-direction: column;

    .content {
        padding: 20px;

    }
}
</style>
<style lang="scss">
.set-data-source-dlg-json-editor {

    .jsoneditor-vue {
        flex: 1;
    }
}
</style>
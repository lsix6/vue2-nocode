<template>
    <el-dialog title="设置数据源" :visible.sync="dialogVisible" @close="close">
        <div v-if="dialogVisible" class="set-data-source-dlg-frame">
            <el-radio-group v-model="ds.type" @input="onRadioInput">
                <el-radio label="api">api</el-radio>
                <el-radio label="enum_map">enum map</el-radio>
                <el-radio label="obj">json</el-radio>
            </el-radio-group>
            <div class="content">
                <div v-if="ds.type === 'api'">
                    <el-form size="small" label-width="80px" :model="ds.api" onsubmit="return false">
                        <el-form-item label="url">
                            <el-input v-model="ds.api.url" />
                        </el-form-item>
                    </el-form>
                </div>
                <div v-else-if="ds.type === 'enum_map'">
                    enum map
                </div>
                <div v-else-if="ds.type === 'obj'">
                    <vueJsonTool v-model="ds.obj" :showBtns="false" mode="code" :expandedOnStart="true" />
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import vueJsonTool from 'vue-json-tool'

export default {
    install(Vue) {
        Vue.component('SetDataSourceDlg', this)
    },
    components: {
        vueJsonTool,
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

    .content {
        padding: 20px;
    }
}
</style>
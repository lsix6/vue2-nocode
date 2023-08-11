<template>
    <el-dialog title="JSON" :visible.sync="dialogVisible">
        <div class="com-json-dlg">
            <vueJsonTool class="flex-container " :value="obj" :showBtns="false" mode="text" :expandedOnStart="true"
                @json-change="onJsonChange" />
        </div>
    </el-dialog>
</template>

<script>
import vueJsonTool from 'vue-json-tool'

export default {
    name: 'ComJsonDlg',
    components: {
        vueJsonTool,
    },
    data() {
        return {
            dialogVisible: false,
            obj: {},
        };
    },
    mounted() {
    },
    methods: {
        open(obj) {
            this.obj = obj
            //
            this.dialogVisible = true
        },
        close() {
            this.dialogVisible = false
        },
        onJsonChange(v) {
            // console.log('[ComJsonDlg] onJsonChange', v)
            //
            this.$emit('change', v)
        },
    },
}
</script>

<style lang="scss">
.com-json-dlg {
    height: 600px;
    display: flex;

    .jsoneditor-vue {
        flex: 1;
    }
}
</style>
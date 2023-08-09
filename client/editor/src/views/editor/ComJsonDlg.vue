<template>
    <el-dialog title="JSON" :visible.sync="dialogVisible">
        <div class="com-json-dlg">
            <vueJsonTool class="flex-container " :value="item" :showBtns="false" mode="text" :expandedOnStart="true" />
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
            item: {},
        };
    },
    mounted() {
    },
    methods: {
        open(item) {
            this.item = item
            //
            this.dialogVisible = true
        },
        close() {
            this.dialogVisible = false
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
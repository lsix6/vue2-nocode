<template>
    <el-dialog title="自定义组件列表" :visible.sync="dialogVisible">
        <nc_root v-if="dialogVisible" :com_list="comObjs" />
    </el-dialog>
</template>

<script>

export default {
    name: 'ComPreviewDlg',
    data() {
        return {
            dialogVisible: false,
            comObjs: [],
        };
    },
    mounted() {
    },
    methods: {
        open(comId) {
            this.comObjs = window.nocode.customizedComsManager.loadComObjs(comId)
            //
            this.dialogVisible = true
        },
        close() {
            this.dialogVisible = false
        },
    },
}
</script>
<template>
    <el-dialog title="自定义组件列表" :visible.sync="dialogVisible">
        <nc_component v-for="(com, i) in comObjs" :key="i" v-bind="com" />
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
        open(comName) {
            this.comObjs = window.nocode.customizedComsManager.loadComObjs(comName)
            //
            this.dialogVisible = true
        },
        close() {
            this.dialogVisible = false
        },
    },
}
</script>
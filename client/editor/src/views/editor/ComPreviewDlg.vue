<template>
    <el-dialog title="自定义组件列表" :visible.sync="dialogVisible">
        <nc_component v-for="(com, i) in comObjs" :key="i" v-bind="com" />
    </el-dialog>
</template>

<script>
import { loadComData } from './ComsList';

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
            const comData = loadComData(comName)
            if (comData) {
                this.comObjs = comData.comObjs
            }
            //
            this.dialogVisible = true
        },
        close() {
            this.dialogVisible = false
        },
    },
}
</script>
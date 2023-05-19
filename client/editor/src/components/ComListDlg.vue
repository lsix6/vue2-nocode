<template>
    <el-dialog title="选择组件" :visible.sync="dialogVisible">
        <el-button>
            横向容器
        </el-button>
        <el-button>
            纵向容器
        </el-button>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible: false
        };
    },
    methods: {
        show() {
            this.dialogVisible = true
        },
    },
}
</script>
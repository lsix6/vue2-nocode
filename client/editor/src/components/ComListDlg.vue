<template>
    <el-dialog title="选择组件" :visible.sync="dialogVisible">
        <el-button @click="onClickContainerRow">
            横向容器
        </el-button>
        <el-button @click="onClickContainerCol">
            纵向容器
        </el-button>
    </el-dialog>
</template>

<script>
import { ComEnum } from '@/def/ComEnum';

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
        onClickContainerRow() {
            this.$emit('select', ComEnum.container_row)
        },
        onClickContainerCol() {
            this.$emit('select', ComEnum.container_col)
        },
    },
}
</script>
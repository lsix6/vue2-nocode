<template>
    <el-dialog title="设置数据源" :visible.sync="dialogVisible" @close="close">
        <div v-if="dialogVisible" class="set-data-source-dlg-frame">
        </div>
    </el-dialog>
</template>

<script>

export default {
    install(Vue) {
        Vue.component('SetDataSourceDlg', this)
    },
    props: {
    },
    data() {
        return {
            dialogVisible: false,
        }
    },
    mounted() {
    },
    methods: {
        open() {
            console.log('[SetDataSourceDlg] open')
            this.dialogVisible = true
        },
        close() {
            console.log('[SetDataSourceDlg] close')
            this.dialogVisible = false
        },
    },
}
</script>

<style lang="scss" scoped>
.set-data-source-dlg-frame {
    height: 550px;
    overflow: auto;
}
</style>
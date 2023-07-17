<template>
    <el-dialog class="coms-list-dlg" title="自定义组件列表" :visible.sync="dialogVisible">
        <div class="frame">
            <ComsListView />
        </div>
    </el-dialog>
</template>

<script>
import ComsListView from './ComsListView.vue'

export default {
    name: 'ComsListDlg',
    components: {
        ComsListView,
    },
    data() {
        return {
            dialogVisible: false,
        };
    },
    mounted() {
    },
    methods: {
        open() {
            this.dialogVisible = true
        },
        close() {
            this.dialogVisible = false
        },
    },
}
</script>

<style lang="scss" scoped>
.coms-list-dlg {

    .frame {
        height: 600px;
        display: flex;
        overflow: hidden;
    }
}
</style>
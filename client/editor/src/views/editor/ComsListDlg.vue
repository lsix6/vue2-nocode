<template>
    <el-dialog class="coms-list-dlg" title="自定义组件列表" :visible.sync="dialogVisible">
        <div v-if="dialogVisible" class="flex-container frame">
            <el-tabs class="flex-container" v-model="activeName">
                <el-tab-pane class="flex-container" label="自定义组件" name="first">
                    <ComsListView />
                </el-tab-pane>
                <el-tab-pane label="预定义字段" name="second">

                </el-tab-pane>
            </el-tabs>
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
            activeName: 'first',
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

<style lang="scss" >
.coms-list-dlg {

    .frame {
        height: 600px;

        .el-tabs__content {
            flex: 1;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
    }
}
</style>
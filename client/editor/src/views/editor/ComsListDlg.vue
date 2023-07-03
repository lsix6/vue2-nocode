<template>
    <el-dialog title="自定义组件列表" :visible.sync="dialogVisible">
        <el-table :data="gridData">
            <el-table-column property="name" label="自定义组件名称" width="200"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" :disabled="scope.row.opened"
                        @click="handleOpen(scope.$index, scope.row)">打开</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button @click="onCreate">
            Create
        </el-button>
    </el-dialog>
</template>

<script>
import { MessageBox } from 'element-ui';
import { loadComsList, saveComsList } from './ComsList';

export default {
    name: 'ComsListDlg',
    data() {
        return {
            gridData: [],
            dialogVisible: false,
        };
    },
    mounted() {
    },
    methods: {
        open() {
            this.gridData = loadComsList()
            //
            this.dialogVisible = true
        },
        close() {
            this.dialogVisible = false
        },
        onCreate() {
            MessageBox.prompt('请输入组件名称', '新建组件').then(({ value }) => {
                this.gridData.push({
                    name: value,
                })
                //
                saveComsList(this.gridData)
            })
        },
        handleOpen(index, row) {
            console.log('[ComsListDlg] handleOpen', index, row);
            //
            this.$emit('openCom', row.name)
            //
            this.close()
        },
        handleDelete(index, row) {
            console.log('[ComsListDlg] handleDelete', index, row);
            //
            this.gridData.splice(index, 1)
            //
            saveComsList()
            //
            window.nocode.customizedComsManager.removeComData(row.name)
        }
    },
}
</script>
<template>
    <el-dialog title="自定义组件列表" :visible.sync="dialogVisible">
        <el-table :data="comsData">
            <el-table-column property="name" label="自定义组件名称" width="200"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" :disabled="scope.row.opened"
                        @click="handleOpen(scope.$index, scope.row)">打开</el-button>
                    <el-button size="mini" @click="handleRename(scope.$index, scope.row)">重命名</el-button>
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
            comsData: [],
            dialogVisible: false,
        };
    },
    mounted() {
    },
    methods: {
        open() {
            this.comsData = loadComsList()
            //
            this.dialogVisible = true
        },
        close() {
            this.dialogVisible = false
        },
        onCreate() {
            MessageBox.prompt('请输入组件名称', '新建组件').then(({ value }) => {
                this.comsData.push({
                    name: value,
                })
                //
                saveComsList(this.comsData)
            }).catch(() => {
            })
        },
        handleOpen(index, row) {
            console.log('[ComsListDlg] handleOpen', index, row);
            //
            this.$emit('openCom', row.name)
            //
            this.close()
        },
        handleRename(index, row) {
            console.log('[ComsListDlg] handleDelete', index, row);
            //
            MessageBox.prompt('请输入新名字', '重命名').then(({ value }) => {
                console.log('[ComsListDlg] new com name', value);
            }).catch(() => {
            })
        },
        handleDelete(index, row) {
            console.log('[ComsListDlg] handleDelete', index, row);
            //
            this.comsData.splice(index, 1)
            //
            saveComsList()
            //
            window.nocode.customizedComsManager.removeComData(row.name)
        }
    },
}
</script>
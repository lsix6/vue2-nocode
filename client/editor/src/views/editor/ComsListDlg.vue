<template>
    <el-dialog title="自定义组件列表" :visible.sync="dialogVisible">
        <el-table :data="comsData">
            <el-table-column property="name" label="自定义组件名称" width="200"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" :disabled="scope.row.opened"
                        @click="handleOpen(scope.$index, scope.row)">打开</el-button>
                    <el-button size="mini" @click="handleRename(scope.$index, scope.row)">重命名</el-button>
                    <el-button size="mini" @click="handleCopy(scope.$index, scope.row)">复制</el-button>
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
import _ from 'lodash'

const custComsMgr = window.nocode.customizedComsManager

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
            this.comsData = custComsMgr.loadComsList()
            //
            this.dialogVisible = true
        },
        close() {
            this.dialogVisible = false
        },
        createNewCom(comName) {
            const com = {
                name: comName,
                id: '' + Date.now(),
            }
            this.comsData.push(com)
            //
            custComsMgr.saveComsList(this.comsData)
            //
            return com
        },
        onCreate() {
            MessageBox.prompt('请输入组件名称', '新建组件').then(({ value }) => {
                if (value) {
                    this.createNewCom(value)
                }
            }).catch(() => {
            })
        },
        handleOpen(index, row) {
            console.log('[ComsListDlg] handleOpen', index, row);
            //
            this.$emit('openCom', row)
            //
            this.close()
        },
        handleRename(index, row) {
            console.log('[ComsListDlg] handleRename', index, row);
            //
            MessageBox.prompt('请输入新名字', '重命名').then(({ value }) => {
                console.log('[ComsListDlg] new com name', value);
                //
                if (value) {
                    row.name = value
                    //
                    custComsMgr.saveComsList(this.comsData)
                }
            }).catch(() => {
            })
        },
        handleCopy(index, row) {
            console.log('[ComsListDlg] handleCopy', index, row);
            //
            MessageBox.prompt('请输入新组件名字', '复制').then(({ value }) => {
                console.log('[ComsListDlg] new copy com name', value);
                //
                if (value) {
                    const newCom = this.createNewCom(value)
                    //
                    const comData = custComsMgr.loadComData(row.id)
                    custComsMgr.saveComData(newCom.id, _.cloneDeep(comData))
                    //
                    custComsMgr.saveComsList(this.comsData)
                }
            }).catch(() => {
            })
        },
        handleDelete(index, row) {
            console.log('[ComsListDlg] handleDelete', index, row);
            //
            this.comsData.splice(index, 1)
            //
            custComsMgr.saveComsList(this.comsData)
            //
            window.nocode.customizedComsManager.removeComData(row.id)
        }
    },
}
</script>
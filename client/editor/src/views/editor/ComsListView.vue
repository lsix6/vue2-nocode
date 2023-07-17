<template>
    <div class="coms-list-view">
        <div class="table">
            <el-table height="100%" :data="comsData">
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
        </div>
        <div>
            <el-button style="margin-top: 20px;" @click="onCreate">
                Create
            </el-button>
        </div>
    </div>
</template>

<script>
import { MessageBox } from 'element-ui';
import _ from 'lodash'

const custComsMgr = window.nocode.customizedComsManager

export default {
    name: 'ComsListView',
    data() {
        return {
            comsData: [],
        };
    },
    mounted() {
        this.comsData = custComsMgr.loadComsList()
        //
        console.log('[ComsListView] mounted, comsData: ', this.comsData)
    },
    methods: {
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
            console.log('[ComsListView] handleOpen', index, row);
            //
            this.$emit('openCom', row)
            //
            this.close()
        },
        handleRename(index, row) {
            console.log('[ComsListView] handleRename', index, row);
            //
            MessageBox.prompt('请输入新名字', '重命名').then(({ value }) => {
                console.log('[ComsListView] new com name', value);
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
            console.log('[ComsListView] handleCopy', index, row);
            //
            MessageBox.prompt('请输入新组件名字', '复制').then(({ value }) => {
                console.log('[ComsListView] new copy com name', value);
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
            console.log('[ComsListView] handleDelete', index, row);
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

<style lang="scss" scoped>
.coms-list-view {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .table {
        flex: 1;
        overflow: hidden;
    }
}
</style>
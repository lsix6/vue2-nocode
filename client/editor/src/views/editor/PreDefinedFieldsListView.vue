<template>
    <div class="pre-defined-fields-list-view">
        <div class="table">
            <el-table height="100%" :data="fieldsData">
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
    name: 'PreDefinedFieldsListView',
    data() {
        return {
            fieldsData: [],
        };
    },
    mounted() {
        this.fieldsData = custComsMgr.loadComsList()
        //
        console.log('[PreDefinedFieldsListView] mounted, fieldsData: ', this.fieldsData)
    },
    methods: {
        createNewCom(comName) {
            const com = {
                name: comName,
                id: '' + Date.now(),
            }
            this.fieldsData.push(com)
            //
            custComsMgr.saveComsList(this.fieldsData)
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
            console.log('[PreDefinedFieldsListView] handleOpen', index, row);
            //
            this.$emit('openCom', row)
            //
            this.close()
        },
        handleRename(index, row) {
            console.log('[PreDefinedFieldsListView] handleRename', index, row);
            //
            MessageBox.prompt('请输入新名字', '重命名').then(({ value }) => {
                console.log('[PreDefinedFieldsListView] new com name', value);
                //
                if (value) {
                    row.name = value
                    //
                    custComsMgr.saveComsList(this.fieldsData)
                }
            }).catch(() => {
            })
        },
        handleCopy(index, row) {
            console.log('[PreDefinedFieldsListView] handleCopy', index, row);
            //
            MessageBox.prompt('请输入新组件名字', '复制').then(({ value }) => {
                console.log('[PreDefinedFieldsListView] new copy com name', value);
                //
                if (value) {
                    const newCom = this.createNewCom(value)
                    //
                    const comData = custComsMgr.loadComData(row.id)
                    custComsMgr.saveComData(newCom.id, _.cloneDeep(comData))
                    //
                    custComsMgr.saveComsList(this.fieldsData)
                }
            }).catch(() => {
            })
        },
        handleDelete(index, row) {
            console.log('[PreDefinedFieldsListView] handleDelete', index, row);
            //
            this.fieldsData.splice(index, 1)
            //
            custComsMgr.saveComsList(this.fieldsData)
            //
            window.nocode.customizedComsManager.removeComData(row.id)
        }
    },
}
</script>

<style lang="scss" scoped>
.pre-defined-fields-list-view {
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
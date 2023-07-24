<template>
    <el-dialog title="选择字段" :visible.sync="dialogVisible">
        <div class="select-field-dlg-frame">
            <el-tree :data="treeData" :default-expand-all="true" :expand-on-click-node="false" @node-click="onNodeClick">
            </el-tree>
        </div>
    </el-dialog>
</template>

<script>
import _ from 'lodash'

export default {
    install(Vue) {
        Vue.component('SelectFieldDlg', this)
    },
    inject: [
        'getCurEditorItemWrapper',
    ],
    props: {
        value: {
            type: [String],
            default: ''
        },
    },
    data() {
        return {
            dialogVisible: false,
            treeData: [],
        }
    },
    mounted() {
    },
    methods: {
        open() {
            this.initTreeData()
            this.dialogVisible = true
        },
        close() {
            this.dialogVisible = false
        },
        initTreeData() {
            const wrapper = this.getCurEditorItemWrapper()
            console.log('[SelectFieldDlg] initTreeData', wrapper)
            //
            const obj2tree = (obj) => {
                const arr = []
                //
                for (let k in obj) {
                    const v = obj[k]
                    //
                    const node = {
                        label: k
                    }
                    if (_.isObject(v) && !_.isArray(v)) {
                        node.children = obj2tree(v)
                    }
                    //
                    arr.push(node)
                }
                //
                return arr
            }
            const comData = wrapper?.com_data
            if (comData) {
                this.treeData = obj2tree(comData)
            }
        },
        onNodeClick(data) {
            console.log('[SelectFieldDlg] onNodeClick', data)
        },
    },
}
</script>

<style lang="scss" scoped>
.select-field-dlg-frame {
    height: 550px;
    overflow: auto;
}
</style>
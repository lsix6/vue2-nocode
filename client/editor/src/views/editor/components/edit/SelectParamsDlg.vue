<template>
    <el-dialog title="选择参数" :visible.sync="dialogVisible" @close="close">
        <div v-if="dialogVisible" class="select-params-dlg-frame">
            <el-tree :data="treeData" @node-click="onNodeClick" :expand-on-click-node="false" default-expand-all
                highlight-current node-key="id" :current-node-key="selectedId">
            </el-tree>
        </div>
    </el-dialog>
</template>

<script>
import _ from 'lodash'

export default {
    install(Vue) {
        Vue.component('SelectParamsDlg', this)
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
            dialogVisible: true,
            treeData: [],
            selectedId: null,
            onSelect: null,
        }
    },
    mounted() {
    },
    methods: {
        open(_selectedId, _onSelect) {
            console.log('[SelectParamsDlg] open', _selectedId)
            this.initTreeData()
            this.selectedId = _selectedId
            this.onSelect = _onSelect
            this.dialogVisible = true
        },
        close() {
            console.log('[SelectParamsDlg] close')
            this.onSelect = null
            this.dialogVisible = false
        },
        initTreeData() {
            const wrapper = this.getCurEditorItemWrapper()
            console.log('[SelectParamsDlg] initTreeData', wrapper)
            //
            const obj2tree = (obj, prefix) => {
                const arr = []
                //
                for (let k in obj) {
                    const v = obj[k]
                    //
                    const node = {
                        id: prefix + k,
                        label: k,
                    }
                    if (_.isObject(v) && !_.isArray(v)) {
                        node.children = obj2tree(v, node.id + '.')
                    } else {
                        if (_.isArray(v)) {
                            node.label = k + `: [${v.length}]`
                        } else {
                            node.label = k + ': ' + v
                        }
                    }
                    //
                    arr.push(node)
                }
                //
                return arr
            }
            const comData = wrapper?.com_data
            if (comData) {
                this.treeData = obj2tree(comData, '')
            }
        },
        onNodeClick(data) {
            console.log('[SelectParamsDlg] onNodeClick', data)
            //
            if (this.onSelect) {
                this.onSelect(data.id)
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.select-params-dlg-frame {
    height: 550px;
    overflow: auto;
}
</style>
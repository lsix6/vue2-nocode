<template>
    <el-dialog title="选择参数" width="40%" top="20vh" :visible.sync="dialogVisible" @close="close">
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
        this.initTreeData()
    },
    methods: {
        open(_selectedId, _onSelect) {
            console.log('[SelectParamsDlg] open', _selectedId, _onSelect)
            this.selectedId = _selectedId
            this.onSelect = _onSelect
            this.dialogVisible = true
            this.initTreeData()
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
            //
            const obj = {
                route_query: this.$route.query,
            }
            if (wrapper) {
                const comRefs = wrapper.com_root.refsMgr.get_com_refs()
                const com_ref = {}
                for (let k in comRefs) {
                    const refCom = comRefs[k]
                    console.log('ref com', refCom)
                    const methodsData = {}
                    if (refCom && refCom.dataMethods) {
                        refCom.dataMethods.forEach(method => {
                            methodsData[method + '()'] = refCom[method]()
                        })
                    }
                    com_ref[k] = methodsData
                }
                obj.com_ref = com_ref
            }
            const comData = wrapper?.com_data
            if (comData) {
                obj.com_data = comData
            }
            //
            this.treeData = obj2tree(obj, '')
        },
        onNodeClick(data) {
            console.log('[SelectParamsDlg] onNodeClick', data)
            //
            if (this.onSelect) {
                const arr = data.id.split('.')
                if (arr[0] === 'com_ref') {
                    if (arr.length >= 3) {
                        this.onSelect(data.id)
                    }
                } else {
                    this.onSelect(data.id)
                }
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.select-params-dlg-frame {
    height: 450px;
    overflow: auto;
}
</style>
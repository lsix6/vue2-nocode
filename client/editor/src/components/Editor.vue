<template>
    <el-container class="nocode-editor">
        <el-aside class="left">
            <el-tree class="node-tree">

            </el-tree>
        </el-aside>
        <el-main class="right">
            <div class="content">
                <nc_component v-bind="nodes.root"></nc_component>
            </div>
        </el-main>
        <ComsListDlg ref="dlgComList" @select="addCom"></ComsListDlg>
    </el-container>
</template>

<script>

import ComsListDlg from './ComsListDlg.vue'

export default {

    components: {
        ComsListDlg,
    },

    data() {
        return {
            nodes: {
                root: null,
                lastId: 1,
            },
        }
    },
    mounted() {
        window.nocode.register_com_ref('dlgComList', this.$refs.dlgComList)
        this.nodes.root = this.createContainerNode()
    },
    methods: {
        onAdd(e) {
            console.log('onAdd', e)
            //
            this.$refs.dlgComList.show()
        },
        addCom(comId) {
            console.log('addCom', comId)
        },
        generateNewNode() {
            const node = {
                id: this.nodes.lastId,
            }
            //
            this.nodes.lastId++
            //
            return node
        },
        createContainerNode() {
            const base = this.generateNewNode()
            //
            const node = {
                ...base,
                com_name: 'div',
                com_info: {
                    style: {
                        flex: 1,
                        display: 'flex',
                        'flex-direction': 'row',
                    },
                },
                com_children: [
                    {
                        com_name: 'el-button',
                        com_info: {
                            class: 'btn-add',
                        },
                        com_children: [
                            {
                                com_name: 'i',
                                com_info: {
                                    class: 'el-icon-plus',
                                },
                            },
                        ],
                        com_events: [
                            {
                                event_name: 'click',
                                commands: [
                                    {
                                        cmd_name: 'call_com_method',
                                        cmd_params: {
                                            com_ref: 'dlgComList',
                                            com_method_name: 'show',
                                        },
                                    }
                                ]
                            }
                        ],
                    },
                ],
            }
            //
            return node
        },
    },
}
</script>

<style lang="scss">
.nocode-editor {
    background-color: aliceblue;

    .left {
        padding: 10px;
        display: flex;

        .node-tree {
            flex: 1;
        }
    }

    .right {
        display: flex;
        padding: 10px;

        .content {
            flex: 1;
            display: flex;
            background-color: white;

            .btn-add {
                margin: auto;
            }
        }
    }
}
</style>
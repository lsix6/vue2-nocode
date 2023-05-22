<template>
    <el-container class="nocode-editor">
        <el-aside class="left">
            <el-tree class="node-tree">

            </el-tree>
        </el-aside>
        <el-main class="right">
            <div class="content">
                <el-button class="btn-add" @click="onAdd">
                    <i class="el-icon-plus" />
                </el-button>
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
                root: {
                    id: 0,
                    children: [],
                },
                listId: 1,
            },
        }
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
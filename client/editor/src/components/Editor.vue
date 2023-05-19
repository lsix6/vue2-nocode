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
        <ComListDlg ref="dlgComList"></ComListDlg>
    </el-container>
</template>

<script>

import ComListDlg from './ComListDlg.vue'

export default {

    components: {
        ComListDlg,
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
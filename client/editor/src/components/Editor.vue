<template>
    <el-container class="nocode-editor">
        <el-aside class="left">
            <el-tree class="node-tree">

            </el-tree>
        </el-aside>
        <el-main class="right">
            <div class="content">

            </div>
        </el-main>
    </el-container>
</template>

<script>
export default {
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
            background-color: white;
        }
    }
}
</style>
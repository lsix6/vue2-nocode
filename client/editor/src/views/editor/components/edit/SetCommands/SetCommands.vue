<template>
    <div>
        <div class="command-item" v-for="(item, i) in value" :key="i">
            <el-button size="mini" class="btn-open" @click="onOpenDlg(item)">...</el-button>
            <el-input size="mini" v-model="item.cmd_name" disabled />
            <el-button size="mini" class="btn-remove" @click="onRemove(i)">-</el-button>
        </div>
        <el-button size="mini" @click="onAdd">+</el-button>
    </div>
</template>

<script>

export default {
    install(Vue) {
        Vue.component('SetCommands', this)
    },
    inject: [
        'getEditorRefs',
    ],
    props: {
        value: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
        }
    },
    mounted() {
        console.log('[SetCommands] mounted', this.value)
        //
    },
    methods: {
        onAdd() {
            this.value.push({ cmd_name: '' })
        },
        onOpenDlg(cmd) {
            this.getEditorRefs().setCommandDlg.open(cmd)
        },
        onRemove(i) {
            console.log('[SetCommands] onRemove', i)
            this.value.splice(i, 1)
        },
    },
}
</script>

<style lang="scss" scoped>
.command-item {
    display: flex;
    flex-direction: row;
    line-height: 28px;

    .btn-open {
        padding: 0;
        width: 50px;
    }

    .btn-remove {
        padding: 0;
        width: 50px;
    }
}
</style>
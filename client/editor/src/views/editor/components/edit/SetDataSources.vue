<template>
    <div>
        <div class="data-source-item" v-for="(item, i) in value" :key="i">
            <el-button size="mini" class="btn-open" @click="onOpenDlg(i)">...</el-button>
            <el-input size="mini" v-model="item.name" @input="onInput" />
            <el-button size="mini" class="btn-remove" @click="onRemove(i)">-</el-button>
        </div>
        <el-button size="mini" @click="onAdd">+</el-button>
    </div>
</template>

<script>

export default {
    install(Vue) {
        Vue.component('SetDataSources', this)
    },
    inject: [
        'openSetDataSourceDlg',
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
        console.log('[SetDataSources] mounted', this.value)
        //
    },
    methods: {
        onAdd() {
            this.value.push({ name: '' })
        },
        onOpenDlg(i) {
            this.openSetDataSourceDlg(this.value[i])
        },
        onRemove(i) {
            console.log('[SetDataSources] onRemove', i)
            this.value.splice(i, 1)
        },
        onInput() {
            console.log('[SetDataSources] onInput', this.value)
        },
    },
}
</script>

<style lang="scss" scoped>
.data-source-item {
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